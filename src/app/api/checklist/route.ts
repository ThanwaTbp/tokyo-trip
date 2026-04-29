import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ChecklistItemCreateSchema } from '@/lib/validations'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const tab = searchParams.get('tab')
    const groups = await prisma.checklistGroup.findMany({
      where: tab ? { tab: tab as 'pack' | 'prep' | 'app' } : undefined,
      orderBy: { order: 'asc' },
      include: { items: { orderBy: { order: 'asc' } } },
    })
    return NextResponse.json(groups)
  } catch {
    return NextResponse.json({ error: 'โหลดเช็คลิสต์ไม่ได้' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = ChecklistItemCreateSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten().fieldErrors }, { status: 422 })
    }
    const item = await prisma.checklistItem.create({ data: result.data })
    return NextResponse.json(item, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'เพิ่มรายการไม่ได้' }, { status: 500 })
  }
}
