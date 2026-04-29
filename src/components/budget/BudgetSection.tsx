'use client'
import { useState } from 'react'
import { Button, Modal, FormField, Input } from '@/components/ui'
import { useToast } from '@/components/ui/Toast'
import { SectionHeader } from '@/components/days/DaysSection'
import type { BudgetItem } from '@/types'

const TOTAL_MAX = 80000

interface Props { initialBudget: BudgetItem[] }

export function BudgetSection({ initialBudget }: Props) {
  const [items, setItems] = useState(initialBudget)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<BudgetItem | null>(null)
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const total = items.reduce((s, i) => s + i.amount, 0)
  const overBudget = total > TOTAL_MAX

  const openEdit = (item: BudgetItem) => {
    setEditing(item)
    setValue(String(item.amount))
    setError('')
    setModalOpen(true)
  }

  const handleSave = async () => {
    const num = parseInt(value)
    if (isNaN(num) || num < 0) { setError('กรุณากรอกจำนวนเงินที่ถูกต้อง (≥ 0)'); return }
    if (!editing) return
    setSaving(true)
    try {
      const res = await fetch(`/api/budget/${editing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: num }),
      })
      if (!res.ok) throw new Error()
      const updated: BudgetItem = await res.json()
      setItems(its => its.map(i => i.id === editing.id ? updated : i))
      toast('✅ อัปเดตงบประมาณแล้ว')
      setModalOpen(false)
    } catch {
      toast('❌ อัปเดตไม่สำเร็จ', 'err')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section id='budget' className='mb-20'>
      <SectionHeader
        icon='💴'
        title='วางแผนงบประมาณ'
        sub={`งบรวม 2 คน ไม่เกิน 80,000 บาท — คลิก ✏️ เพื่อแก้ไขแต่ละหมวด`}
      />

      {/* Budget Cards */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4'>
        {items.map(item => {
          const pct = Math.min(100, Math.round((item.amount / TOTAL_MAX) * 100))
          return (
            <div key={item.id}
              className='bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 relative overflow-hidden hover:border-[var(--border2)] transition-colors'
            >
              {/* Top accent bar */}
              <div className='absolute top-0 left-0 right-0 h-1 opacity-60' style={{ background: item.color }} />
              <div className='text-[var(--text2)] text-xs mb-1.5 mt-1'>{item.category}</div>
              <div className='text-xl font-bold text-[var(--text)] mb-2'>
                ฿{item.amount.toLocaleString()}
              </div>
              <div className='h-1 bg-[var(--border)] rounded-full overflow-hidden mb-1.5'>
                <div className='h-full rounded-full transition-all duration-700' style={{ width: `${pct}%`, background: item.color }} />
              </div>
              <div className='text-[var(--text2)] text-xs leading-snug mb-3'>{item.note}</div>
              <Button variant='secondary' size='xs' onClick={() => openEdit(item)}>
                ✏️ แก้ไข
              </Button>
            </div>
          )
        })}

        {/* Total Card */}
        <div className='col-span-2 sm:col-span-3 lg:col-span-4 bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_12%,transparent)] to-[color-mix(in_srgb,var(--accent2)_8%,transparent)] border border-[var(--accent)] rounded-2xl p-4 relative overflow-hidden'>
          <div className='absolute top-0 left-0 right-0 h-1' style={{ background: 'linear-gradient(90deg,var(--accent),var(--accent2))' }} />
          <div className='text-[var(--text2)] text-xs mb-1.5 mt-1'>💴 รวมทั้งหมด (2 คน)</div>
          <div className='gradient-text text-3xl font-bold mb-2'>
            ฿{total.toLocaleString()}
          </div>
          <div className='h-2 bg-[var(--border)] rounded-full overflow-hidden mb-1.5'>
            <div className='h-full rounded-full transition-all duration-700'
              style={{ width: `${Math.min(100, Math.round((total / TOTAL_MAX) * 100))}%`, background: 'linear-gradient(90deg,var(--accent),var(--accent2))' }} />
          </div>
          <p className={`text-sm font-medium ${overBudget ? 'text-[var(--red)]' : 'text-[var(--green)]'}`}>
            {overBudget
              ? `⚠️ เกินงบ ฿${(total - TOTAL_MAX).toLocaleString()} — กรุณาปรับแผน`
              : `✅ อยู่ในงบ — เหลือสำรอง ฿${(TOTAL_MAX - total).toLocaleString()}`
            }
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        open={modalOpen}
        title={`✏️ แก้ไขงบ: ${editing?.category}`}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <Button variant='secondary' onClick={() => setModalOpen(false)}>ยกเลิก</Button>
            <Button variant='primary' onClick={handleSave} disabled={saving}>
              {saving ? '⏳...' : '💾 บันทึก'}
            </Button>
          </>
        }
      >
        <FormField label='จำนวนเงิน (บาท)' required error={error}>
          <Input
            type='number' min={0} value={value}
            onChange={e => { setValue(e.target.value); setError('') }}
            placeholder='เช่น 28000'
            error={!!error}
          />
        </FormField>
        <p className='text-xs text-[var(--text2)]'>
          หมายเหตุ: งบรวมทั้งหมดควรไม่เกิน ฿80,000
        </p>
      </Modal>
    </section>
  )
}
