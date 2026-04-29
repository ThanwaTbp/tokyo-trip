import type { Config } from 'tailwindcss'
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-ibm-plex-sans-thai)', 'sans-serif'],
        noto: ['var(--font-noto)', 'serif'],
      },
      colors: {
        sakura: { DEFAULT: '#f4a0c0', dark: '#c03060' },
        yuki:   { DEFAULT: '#80b8f0', dark: '#2060b0' },
        koyo:   { DEFAULT: '#f0c870', dark: '#a06800' },
      },
    },
  },
  plugins: [],
}
export default config
