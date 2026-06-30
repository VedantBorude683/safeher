'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

const toastListeners = new Set<(toast: ToastMessage) => void>()

const toastEmitter = {
  emit: (toast: ToastMessage) => {
    toastListeners.forEach((listener) => listener(toast))
  },
  subscribe: (listener: (toast: ToastMessage) => void) => {
    toastListeners.add(listener)
    return () => {
      toastListeners.delete(listener)
    }
  },
}

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
  const id = Date.now().toString()
  toastEmitter.emit({ id, message, type })
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  useEffect(() => {
    const unsubscribe = toastEmitter.subscribe((toast) => {
      setToasts((prev) => [...prev, toast])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id))
      }, 3000)
    })

    return unsubscribe
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-2">
      {toasts.map((toast) => {
        const bgColor = toast.type === 'success'
          ? 'bg-[var(--success)]'
          : toast.type === 'error'
            ? 'bg-[var(--danger)]'
            : 'bg-[var(--primary)]'
        const borderColor = toast.type === 'success'
          ? 'border-[var(--success)]'
          : toast.type === 'error'
            ? 'border-[var(--danger)]'
            : 'border-[var(--primary)]'
        
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm border ${bgColor} ${borderColor} text-white animate-in fade-in slide-in-from-right-8 duration-200`}
          >
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="ml-2 hover:opacity-75 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
