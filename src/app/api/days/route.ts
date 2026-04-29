import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const days = await prisma.tripDay.findMany({
      orderBy: { dayNumber: 'asc' },
      include: { places: { orderBy: { order: 'asc' } } },
    })
    return NextResponse.json(days)
  } catch {
    return NextResponse.json({ error: 'ไม่สามารถโหลดข้อมูลได้' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { PlaceSchema } = await import('@/lib/validations')
    const result = PlaceSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten().fieldErrors }, { status: 422 })
    }
    const { dayId, ...data } = body as { dayId: string } & typeof result.data
    if (!dayId) return NextResponse.json({ error: 'dayId จำเป็น' }, { status: 400 })

    const place = await prisma.place.create({
      data: { ...result.data, imgUrl: result.data.imgUrl || null, dayId },
    })
    return NextResponse.json(place, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 })
  }
}
