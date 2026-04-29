export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ChecklistItemUpdateSchema } from '@/lib/validations'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const result = ChecklistItemUpdateSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten().fieldErrors }, { status: 422 })
    }
    const item = await prisma.checklistItem.update({ where: { id }, data: result.data })
    return NextResponse.json(item)
  } catch {
    return NextResponse.json({ error: 'อัปเดตไม่ได้' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.checklistItem.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'ลบไม่ได้' }, { status: 404 })
  }
}
