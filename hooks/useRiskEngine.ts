'use client'

import { useState, useEffect, useRef } from 'react'
import useSensorTelemetry, { TelemetryData } from './useSensorTelemetry'

export type RiskTier = 'Normal' | 'Elevated' | 'High' | 'Critical'

export interface RiskState {
  tier: RiskTier
  score: number
  triggerReason: string | null
}

const getEnvironmentalRisk = (telemetry: TelemetryData) => {
  const hour = new Date().getHours()
  let score = 18

  if (hour >= 21 || hour <= 4) score += 28
  if (hour >= 18 && hour <= 20) score += 10
  if (hour >= 5 && hour <= 7) score += 8

  if (telemetry.location) {
    const { accuracy, speed } = telemetry.location.coords
    if (typeof accuracy === 'number' && accuracy > 80) score += 8
    if (typeof speed === 'number' && speed < 0.5) score += 10
  }

  if (!telemetry.isOnline) score += 12

  return Math.min(100, Math.round(score))
}

const clamp = (value: number) => Math.max(0, Math.min(100, value))

export default function useRiskEngine(isActive: boolean) {
  const { data, permissionsGranted, error, requestPermissions } = useSensorTelemetry(isActive)

  const [riskState, setRiskState] = useState<RiskState>({
    tier: 'Normal',
    score: 0,
    triggerReason: null,
  })

  const wasMovingRef = useRef(false)
  const stillnessTimerRef = useRef<number | null>(null)
  const lastLocationRef = useRef<GeolocationPosition | null>(null)
  const routeDeviationRef = useRef(false)

  useEffect(() => {
    if (!isActive || !permissionsGranted) {
      setRiskState({ tier: 'Normal', score: 0, triggerReason: null })
      return
    }

    const envRisk = getEnvironmentalRisk(data)
    const behavioralSensitivity = envRisk >= 70 ? 1.35 : envRisk >= 45 ? 1.1 : 0.8

    let score = envRisk * 0.45
    let reason: string | null = null
    let tier: RiskTier = 'Normal'

    if (!data.isOnline) {
      score += 15 * behavioralSensitivity
      reason = reason ?? 'Signal loss is reducing location confidence'
    }

    const accelerated = data.acceleration > 16
    const moderateJerk = data.acceleration > 8 && data.acceleration <= 16

    if (accelerated) {
      score += 32 * behavioralSensitivity
      reason = 'Sudden motion or impact pattern detected'
    } else if (moderateJerk) {
      score += 18 * behavioralSensitivity
    }

    if (data.audioSpike) {
      score += 25 * behavioralSensitivity
      reason = reason ?? 'Volume spike followed by silence indicates a possible distress pattern'
    }

    const moving = (data.speed ?? 0) > 1.5
    if (moving) {
      wasMovingRef.current = true
      if (stillnessTimerRef.current) {
        window.clearTimeout(stillnessTimerRef.current)
        stillnessTimerRef.current = null
      }
    } else if (wasMovingRef.current) {
      if (!stillnessTimerRef.current) {
        stillnessTimerRef.current = window.setTimeout(() => {
          score += 18 * behavioralSensitivity
          reason = reason ?? 'Movement stopped abruptly after motion'
        }, 25000)
      }
    }

    if (data.location && lastLocationRef.current) {
      const prev = lastLocationRef.current.coords
      const current = data.location.coords
      const distance = Math.hypot(
        current.latitude - prev.latitude,
        current.longitude - prev.longitude
      ) * 111000

      const headingDelta = Math.abs((current.heading ?? 0) - (lastLocationRef.current.coords.heading ?? 0))
      if ((distance > 100 && (data.speed ?? 0) < 0.8) || headingDelta > 90) {
        routeDeviationRef.current = true
        score += 18 * behavioralSensitivity
        reason = reason ?? 'Route deviation or erratic stop pattern detected'
      }
    }

    lastLocationRef.current = data.location

    const behavioralRisk = clamp(Math.round(score - envRisk * 0.45))
    const finalScore = clamp(Math.round(score + (data.signalLoss ? 8 : 0)))

    if (accelerated && data.audioSpike) {
      tier = 'Critical'
      reason = 'Strong behavioral anomaly in any zone triggered silent escalation'
    } else if (finalScore >= 82 || behavioralRisk >= 58) {
      tier = 'Critical'
      reason = reason ?? 'Critical behavioral anomaly requires response'
    } else if (finalScore >= 62 || (envRisk >= 70 && behavioralRisk >= 30)) {
      tier = 'High'
      reason = reason ?? 'Proactive safety check-in recommended'
    } else if (finalScore >= 42 || envRisk >= 55) {
      tier = 'Elevated'
      reason = reason ?? 'Isolated or low-footfall environment is under watch'
    } else {
      tier = 'Normal'
    }

    setRiskState((prev) => {
      if (prev.tier === 'Critical' && tier !== 'Critical') return prev
      if (prev.tier === 'High' && tier === 'Elevated') return prev
      return {
        tier,
        score: finalScore,
        triggerReason: reason || (tier === 'Elevated' ? 'Environment is creating elevated sensitivity' : null),
      }
    })
  }, [data, isActive, permissionsGranted])

  const resetRiskState = () => {
    lastLocationRef.current = null
    routeDeviationRef.current = false
    wasMovingRef.current = false
    if (stillnessTimerRef.current) {
      window.clearTimeout(stillnessTimerRef.current)
      stillnessTimerRef.current = null
    }

    setRiskState({
      tier: 'Normal',
      score: 0,
      triggerReason: null,
    })
  }

  const escalateToCritical = () => {
    setRiskState({
      tier: 'Critical',
      score: 100,
      triggerReason: 'User did not respond to the safety check-in',
    })
  }

  return {
    riskState,
    telemetryData: data,
    permissionsGranted,
    permissionError: error,
    requestPermissions,
    resetRiskState,
    escalateToCritical,
  }
}
