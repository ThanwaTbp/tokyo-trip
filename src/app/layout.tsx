import type { Metadata } from 'next'
import { IBM_Plex_Sans_Thai, Noto_Serif_JP } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans-thai',
  display: 'swap',
})

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-noto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tokyo Trip 2027 — 6 วันสองคน',
  description: 'แผนการท่องเที่ยวโตเกียว 6 วันกับแฟน ปลายเดือนมกราคม 2570 ช่วงหิมะตก',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='th' className={`${ibmPlexSansThai.variable} ${notoSerifJP.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
