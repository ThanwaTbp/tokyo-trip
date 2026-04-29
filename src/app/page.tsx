import { prisma } from '@/lib/prisma'
import { SnowCanvas } from '@/components/layout/SnowCanvas'
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/layout/Hero'
import { ToastProvider } from '@/components/ui/Toast'
import { OverviewSection, TipsSection } from '@/components/layout/Sections'
import { DaysSection } from '@/components/days/DaysSection'
import { BudgetSection } from '@/components/budget/BudgetSection'
import { ChecklistSection } from '@/components/checklist/ChecklistSection'
import type { TripDay, BudgetItem, ChecklistGroup, ChecklistTab } from '@/types'

export const dynamic = 'force-dynamic'

async function getData() {
  const [days, budget, packGroups, prepGroups, appGroups] = await Promise.all([
    prisma.tripDay.findMany({
      orderBy: { dayNumber: 'asc' },
      include: { places: { orderBy: { order: 'asc' } } },
    }),
    prisma.budgetItem.findMany({ orderBy: { order: 'asc' } }),
    prisma.checklistGroup.findMany({
      where: { tab: 'pack' },
      orderBy: { order: 'asc' },
      include: { items: { orderBy: { order: 'asc' } } },
    }),
    prisma.checklistGroup.findMany({
      where: { tab: 'prep' },
      orderBy: { order: 'asc' },
      include: { items: { orderBy: { order: 'asc' } } },
    }),
    prisma.checklistGroup.findMany({
      where: { tab: 'app' },
      orderBy: { order: 'asc' },
      include: { items: { orderBy: { order: 'asc' } } },
    }),
  ])

  return {
    days: days as TripDay[],
    budget: budget as BudgetItem[],
    checklists: {
      pack: packGroups as ChecklistGroup[],
      prep: prepGroups as ChecklistGroup[],
      app:  appGroups  as ChecklistGroup[],
    } satisfies Record<ChecklistTab, ChecklistGroup[]>,
  }
}

export default async function HomePage() {
  const { days, budget, checklists } = await getData()
  const totalPlaces = days.reduce((s, d) => s + d.places.length, 0)

  return (
    <ToastProvider>
      <SnowCanvas />
      <Hero />
      <Navbar />
      <main className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 py-12'>
        <OverviewSection totalPlaces={totalPlaces} />
        <DaysSection initialDays={days} />
        <BudgetSection initialBudget={budget} />
        <ChecklistSection initialGroups={checklists} />
        <TipsSection />
      </main>
      <footer className='relative z-10 border-t border-[var(--border)] py-8 text-center text-[var(--text2)] text-sm'>
        <p className='font-noto mb-1'>東京旅行 2027 — 二人の思い出</p>
        <p>สร้างด้วย ❤️ Next.js 15 + Prisma + PostgreSQL</p>
      </footer>
    </ToastProvider>
  )
}
