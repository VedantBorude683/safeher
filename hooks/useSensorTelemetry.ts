'use client'

import { useState, useEffect, useRef } from 'react'

export interface TelemetryData {
  acceleration: number
  speed: number | null
  audioSpike: boolean
  isOnline: boolean
  batteryLevel: number | null
  location: GeolocationPosition | null
  heading: number | null
  monitoringStatus: 'Monitoring active' | 'Monitoring paused (app in background)'
  signalLoss: boolean
}

const getMonitoringStatus = () =>
  typeof document !== 'undefined' && document.visibilityState === 'visible'
    ? 'Monitoring active'
    : 'Monitoring paused (app in background)'

export default function useSensorTelemetry(isActive: boolean) {
  const [data, setData] = useState<TelemetryData>({
    acceleration: 0,
    speed: null,
    audioSpike: false,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    batteryLevel: null,
    location: null,
    heading: null,
    monitoringStatus: getMonitoringStatus(),
    signalLoss: false,
  })

  const [permissionsGranted, setPermissionsGranted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const audioContextRef = useRef<AudioContext | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const watchIdRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lastAudioSpikeRef = useRef(0)

  const stopSensors = () => {
    if (watchIdRef.current !== null && typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(console.error)
      audioContextRef.current = null
    }

    analyserRef.current = null
  }

  const updateMonitoringStatus = (isForeground: boolean) => {
    setData((prev) => ({
      ...prev,
      monitoringStatus: isForeground
        ? 'Monitoring active'
        : 'Monitoring paused (app in background)',
    }))
  }

  const requestPermissions = async () => {
    try {
      if (typeof navigator === 'undefined') {
        throw new Error('Browser APIs are unavailable')
      }

      if (
        typeof DeviceMotionEvent !== 'undefined' &&
        typeof (DeviceMotionEvent as typeof DeviceMotionEvent & { requestPermission?: () => Promise<'granted' | 'denied'> }).requestPermission === 'function'
      ) {
        const permission = await (DeviceMotionEvent as typeof DeviceMotionEvent & {
          requestPermission: () => Promise<'granted' | 'denied'>
        }).requestPermission()

        if (permission !== 'granted') {
          throw new Error('Motion permission denied')
        }
      }

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        mediaStreamRef.current = stream
      } else {
        throw new Error('Microphone access is unavailable in this browser')
      }

      await new Promise<void>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          () => resolve(),
          (error) => reject(new Error(error.message || 'Location permission denied')),
          { enableHighAccuracy: true, timeout: 10000 }
        )
      })

      if ('getBattery' in navigator) {
        const batteryManager = await (navigator as Navigator & { getBattery?: () => Promise<BatteryManager> }).getBattery?.()
        if (batteryManager) {
          setData((prev) => ({
            ...prev,
            batteryLevel: Math.round((batteryManager.level ?? 0) * 100),
          }))
        }
      }

      setPermissionsGranted(true)
      setError(null)
      setData((prev) => ({ ...prev, isOnline: navigator.onLine, signalLoss: !navigator.onLine }))
      return true
    } catch (err: any) {
      console.error('Permission error:', err)
      setPermissionsGranted(false)
      setError(err.message || 'Permissions denied')
      return false
    }
  }

  useEffect(() => {
    if (typeof document === 'undefined') return

    const handleVisibility = () => {
      const isForeground = document.visibilityState === 'visible'
      updateMonitoringStatus(isForeground)
      if (!isForeground && isActive) {
        stopSensors()
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    handleVisibility()

    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [isActive])

  useEffect(() => {
    if (!isActive || !permissionsGranted || typeof document === 'undefined' || document.visibilityState !== 'visible') {
      stopSensors()
      setData((prev) => ({
        ...prev,
        monitoringStatus: getMonitoringStatus(),
        signalLoss: !navigator.onLine,
      }))
      return
    }

    let isMounted = true

    const handleMotion = (event: DeviceMotionEvent) => {
      if (!isMounted || !event.acceleration) return

      const { x = 0, y = 0, z = 0 } = event.acceleration
      const magnitude = Math.sqrt(x * x + y * y + z * z)

      setData((prev) => ({ ...prev, acceleration: magnitude }))
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('devicemotion', handleMotion)
    }

    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          if (!isMounted) return
          setData((prev) => ({
            ...prev,
            location: position,
            speed: position.coords.speed ?? prev.speed,
            heading: position.coords.heading ?? prev.heading,
            signalLoss: false,
          }))
        },
        (error) => {
          console.error('GPS watch error:', error)
          setData((prev) => ({ ...prev, signalLoss: true }))
        },
        { enableHighAccuracy: true, maximumAge: 1000, timeout: 15000 }
      )
    }

    if (mediaStreamRef.current && typeof window !== 'undefined') {
      const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext

      if (AudioCtor) {
        const audioContext = new AudioCtor()
        audioContextRef.current = audioContext
        const source = audioContext.createMediaStreamSource(mediaStreamRef.current)
        const analyser = audioContext.createAnalyser()
        analyser.fftSize = 256
        source.connect(analyser)
        analyserRef.current = analyser

        const dataArray = new Uint8Array(analyser.fftSize)

        const checkAudio = () => {
          if (!isMounted || !analyserRef.current) return

          analyser.getByteTimeDomainData(dataArray)

          let sumSquares = 0
          for (let i = 0; i < dataArray.length; i += 1) {
            const delta = dataArray[i] - 128
            sumSquares += delta * delta
          }

          const rms = Math.sqrt(sumSquares / dataArray.length) / 128
          const now = Date.now()

          if (rms > 0.32 && now - lastAudioSpikeRef.current > 2000) {
            lastAudioSpikeRef.current = now
            setData((prev) => ({ ...prev, audioSpike: true }))
            setTimeout(() => {
              setData((prev) => ({ ...prev, audioSpike: false }))
            }, 1500)
          }

          animationFrameRef.current = requestAnimationFrame(checkAudio)
        }

        checkAudio()
      }
    }

    const handleNetworkChange = () => {
      const online = navigator.onLine
      setData((prev) => ({ ...prev, isOnline: online, signalLoss: !online }))
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('online', handleNetworkChange)
      window.addEventListener('offline', handleNetworkChange)
    }

    return () => {
      isMounted = false
      stopSensors()
      if (typeof window !== 'undefined') {
        window.removeEventListener('devicemotion', handleMotion)
        window.removeEventListener('online', handleNetworkChange)
        window.removeEventListener('offline', handleNetworkChange)
      }
    }
  }, [isActive, permissionsGranted])

  useEffect(() => {
    return () => {
      stopSensors()
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return { data, permissionsGranted, error, requestPermissions }
}
