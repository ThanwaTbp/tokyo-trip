import { z } from 'zod'

export const PlaceSchema = z.object({
  name:   z.string().min(1, 'กรุณากรอกชื่อสถานที่').max(100, 'ชื่อยาวเกิน 100 ตัวอักษร'),
  desc:   z.string().min(1, 'กรุณากรอกคำอธิบาย').max(500, 'คำอธิบายยาวเกิน 500 ตัวอักษร'),
  type:   z.enum(['sight', 'food', 'exp', 'shop', 'stay']),
  emoji:  z.string().max(4).default('📍'),
  mapUrl: z.string().url('URL ไม่ถูกต้อง — ต้องขึ้นต้นด้วย https://'),
  imgUrl: z.string().url('URL รูปภาพไม่ถูกต้อง').optional().or(z.literal('')),
})

export const BudgetUpdateSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'กรุณากรอกตัวเลข' })
    .min(0, 'จำนวนเงินต้องไม่ติดลบ')
    .max(9_999_999, 'จำนวนเงินเกินขีดจำกัด'),
})

export const ChecklistItemCreateSchema = z.object({
  text:    z.string().min(1, 'กรุณากรอกรายการ').max(200, 'ข้อความยาวเกิน 200 ตัวอักษร'),
  groupId: z.string().cuid('groupId ไม่ถูกต้อง'),
})

export const ChecklistItemUpdateSchema = z.object({
  text: z.string().min(1).max(200).optional(),
  done: z.boolean().optional(),
})

export type PlaceInput             = z.infer<typeof PlaceSchema>
export type BudgetUpdateInput      = z.infer<typeof BudgetUpdateSchema>
export type ChecklistItemCreateInput = z.infer<typeof ChecklistItemCreateSchema>
export type ChecklistItemUpdateInput = z.infer<typeof ChecklistItemUpdateSchema>
