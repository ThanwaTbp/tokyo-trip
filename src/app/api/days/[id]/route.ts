export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PlaceSchema } from '@/lib/validations'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const result = PlaceSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten().fieldErrors }, { status: 422 })
    }
    const place = await prisma.place.update({
      where: { id },
      data: { ...result.data, imgUrl: result.data.imgUrl || null },
    })
    return NextResponse.json(place)
  } catch {
    return NextResponse.json({ error: 'ไม่พบสถานที่หรือเกิดข้อผิดพลาด' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.place.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'ไม่พบสถานที่' }, { status: 404 })
  }
}
