'use client'
import { createContext, useCallback, useContext, useState } from 'react'

type ToastType = 'ok' | 'err' | 'info'

interface Toast {
  id: number
  msg: string
  type: ToastType
}

interface ToastCtxType {
  toast: (msg: string, type?: ToastType) => void
}

const ToastCtx = createContext<ToastCtxType>({ toast: () => {} })

let _id = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((msg: string, type: ToastType = 'ok') => {
    const id = ++_id
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
  }, [])

  const borderColor: Record<ToastType, string> = {
    ok:   'border-[var(--green)]',
    err:  'border-[var(--red)]',
    info: 'border-[var(--accent2)]',
  }
  const icon: Record<ToastType, string> = { ok: '✅', err: '❌', info: 'ℹ️' }

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      {/* Toast Container */}
      <div className='fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none'>
        {toasts.map(t => (
          <div
            key={t.id}
            className={`animate-toast bg-[var(--card)] border ${borderColor[t.type]} rounded-xl px-4 py-3 text-sm text-[var(--text)] shadow-xl flex items-center gap-2 max-w-[280px] pointer-events-auto`}
          >
            <span>{icon[t.type]}</span>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export const useToast = () => useContext(ToastCtx)
