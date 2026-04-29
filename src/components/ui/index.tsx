'use client'
import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

/* ── Button ── */
type BtnVariant = 'primary' | 'secondary' | 'danger' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant
  size?: 'xs' | 'sm' | 'md'
}

const variantCls: Record<BtnVariant, string> = {
  primary:   'bg-[var(--accent)] border-[var(--accent)] text-[#1a0010] font-bold hover:brightness-110',
  secondary: 'bg-transparent border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
  danger:    'bg-transparent border-[var(--red)] text-[var(--red)] hover:bg-[color-mix(in_srgb,var(--red)_10%,transparent)]',
  ghost:     'bg-transparent border-transparent text-[var(--text2)] hover:bg-[var(--bg3)] hover:text-[var(--text)]',
}
const sizeCls = {
  xs: 'px-2.5 py-1 text-xs rounded-lg',
  sm: 'px-3.5 py-1.5 text-sm rounded-xl',
  md: 'px-5 py-2.5 text-sm rounded-full',
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 border transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantCls[variant]} ${sizeCls[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

/* ── Modal ── */
interface ModalProps {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
}

export function Modal({ open, title, onClose, children, footer }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className='fixed inset-0 z-[9000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md'
      onClick={e => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className='animate-slide-up bg-[var(--card)] border border-[var(--border)] rounded-2xl w-full max-w-lg max-h-[90svh] flex flex-col shadow-2xl'>
        {/* Header */}
        <div className='flex items-center justify-between px-5 py-4 border-b border-[var(--border)] shrink-0'>
          <h3 className='font-bold text-base text-[var(--text)]'>{title}</h3>
          <button
            onClick={onClose}
            className='text-[var(--text2)] hover:text-[var(--red)] transition-colors p-0.5'
          >
            <X size={18} />
          </button>
        </div>
        {/* Body */}
        <div className='overflow-y-auto p-5 flex-1'>{children}</div>
        {/* Footer */}
        {footer && (
          <div className='flex gap-2.5 justify-end px-5 py-3.5 border-t border-[var(--border)] shrink-0 flex-wrap'>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── FormField ── */
interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

export function FormField({ label, required, error, children }: FormFieldProps) {
  return (
    <div className='mb-4'>
      <label className='block text-xs text-[var(--text2)] mb-1.5'>
        {label}
        {required && <span className='text-[var(--red)] ml-0.5'>*</span>}
      </label>
      {children}
      {error && <p className='text-xs text-[var(--red)] mt-1'>{error}</p>}
    </div>
  )
}

/* ── Input ── */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export function Input({ error, className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-sm text-[var(--text)] font-[var(--font-mitr)] input-focus transition-all ${error ? 'input-error' : ''} ${className}`}
      {...props}
    />
  )
}

/* ── Textarea ── */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export function Textarea({ error, className = '', ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-sm text-[var(--text)] font-[var(--font-mitr)] input-focus transition-all resize-y min-h-[72px] ${error ? 'input-error' : ''} ${className}`}
      {...props}
    />
  )
}

/* ── Select ── */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

export function Select({ error, className = '', children, ...props }: SelectProps) {
  return (
    <select
      className={`w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-sm text-[var(--text)] font-[var(--font-mitr)] input-focus transition-all appearance-none ${error ? 'input-error' : ''} ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}
