export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { BudgetUpdateSchema } from '@/lib/validations'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const result = BudgetUpdateSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten().fieldErrors }, { status: 422 })
    }
    const item = await prisma.budgetItem.update({
      where: { id },
      data: { amount: result.data.amount },
    })
    return NextResponse.json(item)
  } catch {
    return NextResponse.json({ error: 'อัปเดตงบประมาณไม่ได้' }, { status: 500 })
  }
}
