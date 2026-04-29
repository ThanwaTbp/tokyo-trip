export function Hero() {
  return (
    <header className='relative min-h-svh flex flex-col items-center justify-center text-center px-4 pb-16 overflow-hidden z-10'
      style={{
        background: 'linear-gradient(180deg, #04040e 0%, #0a0818 30%, #120820 60%, #080810 100%)',
      }}
    >
      {/* Radial glows */}
      <div className='absolute inset-0 pointer-events-none'
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 25% 35%, rgba(244,160,192,.14) 0%, transparent 65%), radial-gradient(ellipse 50% 35% at 75% 55%, rgba(128,184,240,.11) 0%, transparent 65%)',
        }}
      />

      {/* Japanese subtitle */}
      <p className='font-ibm font-light tracking-[.4em] text-[var(--accent)] opacity-85 text-sm sm:text-base mb-3 relative z-10'>
        東京旅行計画 — 二人で六日間
      </p>

      {/* Main title */}
      <h1 className='gradient-text font-bold leading-tight relative z-10 mb-4'
        style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
      >
        Tokyo Trip<br />6 Day ❄️
      </h1>

      {/* Subtitle */}
      <p className='text-[var(--text2)] max-w-md mx-auto mb-8 relative z-10 text-sm sm:text-base'>
        ปลายเดือนมกราคม 2570 — ท่ามกลางหิมะ ออนเซ็น และความทรงจำที่ไม่มีวันลืม
      </p>

      {/* Pills */}
      <div className='flex flex-wrap gap-2 justify-center mb-10 relative z-10'>
        {[
          ['🗓️', '25–30 ม.ค. 2570'],
          ['👫', '2 คน'],
          ['💴', 'งบ 80,000 บาท'],
          ['❄️', 'ฤดูหิมะ'],
          ['🗾', 'โตเกียว + ฟูจิ'],
        ].map(([icon, text]) => (
          <span key={text}
            className='bg-white/5 border border-[var(--border)] rounded-full px-3.5 py-1.5 text-xs sm:text-sm text-[var(--text2)] backdrop-blur-sm'
          >
            {icon} <strong className='text-[var(--accent)]'>{text}</strong>
          </span>
        ))}
      </div>

      {/* Scroll cue */}
      <p className='animate-bob text-[var(--text2)] text-md relative z-10'>↓ เลื่อนลงดูแผนเที่ยว ↓</p>

      {/* Bottom fade */}
      <div className='absolute bottom-0 left-0 right-0 h-52 pointer-events-none'
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
      />
    </header>
  )
}
