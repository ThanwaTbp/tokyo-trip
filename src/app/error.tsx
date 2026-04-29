'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center'>
      <div className='text-6xl'>😵</div>
      <h2 className='text-2xl font-bold text-[var(--text)]'>เกิดข้อผิดพลาด</h2>
      <p className='text-[var(--text2)] max-w-sm'>
        {error.message || 'ไม่สามารถโหลดข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่อฐานข้อมูล'}
      </p>
      <button
        onClick={reset}
        className='px-6 py-2.5 bg-[var(--accent)] text-[#1a0010] font-bold rounded-full hover:brightness-110 transition-all'
      >
        ลองใหม่อีกครั้ง
      </button>
    </div>
  )
}
