'use client'
import { useTheme } from './ThemeProvider'

const NAV_LINKS = [
  { href: '#overview',   label: 'ภาพรวม' },
  { href: '#itinerary',  label: 'แผน 6 วัน' },
  { href: '#budget',     label: 'งบประมาณ' },
  { href: '#checklist',  label: 'เช็คลิสต์' },
  { href: '#tips',       label: 'เคล็ดลับ' },
]

export function Navbar() {
  const { theme, toggle } = useTheme()

  return (
    <>
      {/* Theme Toggle — fixed top right */}
      <button
        onClick={toggle}
        className='fixed top-4 right-4 z-[900] flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] text-[var(--text)] text-sm rounded-full px-4 py-2 shadow-md hover:border-[var(--accent)] transition-all'
      >
        <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
        <span className='hidden sm:inline'>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
      </button>

      {/* Sticky Nav */}
      <nav className='sticky top-0 z-[800] border-b border-[var(--border)] bg-[var(--bg)]/88 backdrop-blur-xl'>
        <div className='max-w-screen-xl mx-auto px-4 py-2.5 flex gap-1.5 flex-wrap items-center justify-center'>
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className='text-[var(--text2)] text-xs sm:text-sm px-3 py-1.5 rounded-full border border-transparent hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_7%,transparent)] transition-all whitespace-nowrap'
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
