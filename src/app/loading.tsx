export default function Loading() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <div className='text-5xl animate-bounce'>🗾</div>
        <p className='text-[var(--text2)] text-sm animate-pulse'>กำลังโหลดแผนเที่ยวโตเกียว...</p>
      </div>
    </div>
  )
}
