'use client'
import { useState, useCallback } from 'react'
import { Plus, Pencil, Trash2, Check } from 'lucide-react'
import { Button, Modal, FormField, Input, Select } from '@/components/ui'
import { useToast } from '@/components/ui/Toast'
import { SectionHeader } from '@/components/days/DaysSection'
import type { ChecklistGroup, ChecklistItem, ChecklistTab } from '@/types'

const TAB_LABELS: Record<ChecklistTab, string> = {
  pack: '🎒 เตรียมของ',
  prep: '📋 เตรียมตัว',
  app:  '📱 แอปและข้อมูล',
}

interface Props {
  initialGroups: Record<ChecklistTab, ChecklistGroup[]>
}

export function ChecklistSection({ initialGroups }: Props) {
  const [groups, setGroups] = useState(initialGroups)
  const [activeTab, setActiveTab] = useState<ChecklistTab>('pack')
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editingItem, setEditingItem] = useState<ChecklistItem | null>(null)
  const [addForm, setAddForm] = useState({ text: '', groupId: '' })
  const [editText, setEditText] = useState('')
  const [addErrors, setAddErrors] = useState<{ text?: string; groupId?: string }>({})
  const [editError, setEditError] = useState('')
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const allItems = groups[activeTab].flatMap(g => g.items)
  const doneCount = allItems.filter(i => i.done).length
  const totalCount = allItems.length
  const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0

  const toggleItem = useCallback(async (item: ChecklistItem) => {
    // Optimistic update
    setGroups(prev => {
      const copy = { ...prev }
      copy[activeTab] = prev[activeTab].map(g => ({
        ...g,
        items: g.items.map(i => i.id === item.id ? { ...i, done: !i.done } : i),
      }))
      return copy
    })
    try {
      await fetch(`/api/checklist/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !item.done }),
      })
    } catch {
      // Revert on failure
      setGroups(prev => {
        const copy = { ...prev }
        copy[activeTab] = prev[activeTab].map(g => ({
          ...g,
          items: g.items.map(i => i.id === item.id ? { ...i, done: item.done } : i),
        }))
        return copy
      })
      toast('❌ อัปเดตไม่สำเร็จ', 'err')
    }
  }, [activeTab, toast])

  const openAdd = () => {
    const firstGroup = groups[activeTab][0]
    setAddForm({ text: '', groupId: firstGroup?.id || '' })
    setAddErrors({})
    setAddModal(true)
  }

  const handleAdd = async () => {
    const e: typeof addErrors = {}
    if (!addForm.text.trim()) e.text = 'กรุณากรอกรายการ'
    if (!addForm.groupId) e.groupId = 'กรุณาเลือกกลุ่ม'
    setAddErrors(e)
    if (Object.keys(e).length) return
    setSaving(true)
    try {
      const res = await fetch('/api/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addForm),
      })
      if (!res.ok) throw new Error()
      const newItem: ChecklistItem = await res.json()
      setGroups(prev => {
        const copy = { ...prev }
        copy[activeTab] = prev[activeTab].map(g =>
          g.id === addForm.groupId ? { ...g, items: [...g.items, newItem] } : g
        )
        return copy
      })
      toast('✅ เพิ่มรายการแล้ว')
      setAddModal(false)
    } catch {
      toast('❌ เพิ่มไม่สำเร็จ', 'err')
    } finally {
      setSaving(false)
    }
  }

  const openEdit = (item: ChecklistItem) => {
    setEditingItem(item)
    setEditText(item.text)
    setEditError('')
    setEditModal(true)
  }

  const handleEdit = async () => {
    if (!editText.trim()) { setEditError('กรุณากรอกรายการ'); return }
    if (!editingItem) return
    setSaving(true)
    try {
      const res = await fetch(`/api/checklist/${editingItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: editText }),
      })
      if (!res.ok) throw new Error()
      setGroups(prev => {
        const copy = { ...prev }
        copy[activeTab] = prev[activeTab].map(g => ({
          ...g,
          items: g.items.map(i => i.id === editingItem.id ? { ...i, text: editText } : i),
        }))
        return copy
      })
      toast('✅ แก้ไขรายการแล้ว')
      setEditModal(false)
    } catch {
      toast('❌ แก้ไขไม่สำเร็จ', 'err')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (item: ChecklistItem) => {
    if (!confirm('ต้องการลบรายการนี้?')) return
    try {
      const res = await fetch(`/api/checklist/${item.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setGroups(prev => {
        const copy = { ...prev }
        copy[activeTab] = prev[activeTab].map(g => ({
          ...g,
          items: g.items.filter(i => i.id !== item.id),
        }))
        return copy
      })
      toast('🗑️ ลบรายการแล้ว')
    } catch {
      toast('❌ ลบไม่สำเร็จ', 'err')
    }
  }

  return (
    <section id='checklist' className='mb-20'>
      <SectionHeader icon='✅' title='เช็คลิสต์' sub='เตรียมตัวและของให้พร้อมก่อนออกเดินทาง — คลิกเพื่อติ๊ก' />

      {/* Tabs */}
      <div className='flex gap-2 flex-wrap mb-5'>
        {(Object.keys(TAB_LABELS) as ChecklistTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm border transition-all ${
              activeTab === tab
                ? 'bg-[var(--accent)] border-[var(--accent)] text-[#1a0010] font-bold'
                : 'bg-transparent border-[var(--border)] text-[var(--text2)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
            }`}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className='bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 mb-4'>
        <div className='flex justify-between text-xs text-[var(--text2)] mb-2'>
          <span>ความคืบหน้า</span>
          <span>{doneCount} / {totalCount} ({pct}%)</span>
        </div>
        <div className='h-2 bg-[var(--border)] rounded-full overflow-hidden'>
          <div className='h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] rounded-full transition-all duration-500' style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Groups */}
      <div className='flex flex-col gap-3 mb-4'>
        {groups[activeTab].map(group => {
          const groupDone = group.items.filter(i => i.done).length
          return (
            <div key={group.id} className='bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden'>
              <div className='flex justify-between items-center px-4 py-3 bg-[var(--bg2)] border-b border-[var(--border)]'>
                <span className='font-semibold text-sm text-[var(--text)]'>{group.name}</span>
                <span className='text-xs text-[var(--text2)]'>{groupDone}/{group.items.length}</span>
              </div>
              {group.items.map(item => (
                <div
                  key={item.id}
                  className='flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--bg2)] transition-colors group cursor-pointer'
                  onClick={() => toggleItem(item)}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${item.done ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-[var(--border)]'}`}>
                    {item.done && <Check size={11} className='text-[#1a0010]' strokeWidth={3} />}
                  </div>
                  <span className={`flex-1 text-sm transition-colors ${item.done ? 'line-through text-[var(--text2)]' : 'text-[var(--text)]'}`}>
                    {item.text}
                  </span>
                  <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity' onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => openEdit(item)}
                      className='p-1.5 rounded-lg text-[var(--text2)] hover:bg-[var(--bg3)] hover:text-[var(--text)] transition-all'
                    >
                      <Pencil size={12} />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className='p-1.5 rounded-lg text-[var(--text2)] hover:bg-[var(--bg3)] hover:text-[var(--red)] transition-all'
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>

      <Button variant='primary' onClick={openAdd}>
        <Plus size={15} /> เพิ่มรายการ
      </Button>

      {/* Add Modal */}
      <Modal
        open={addModal}
        title='➕ เพิ่มรายการเช็คลิสต์'
        onClose={() => setAddModal(false)}
        footer={
          <>
            <Button variant='secondary' onClick={() => setAddModal(false)}>ยกเลิก</Button>
            <Button variant='primary' onClick={handleAdd} disabled={saving}>
              {saving ? '⏳...' : '💾 เพิ่ม'}
            </Button>
          </>
        }
      >
        <FormField label='กลุ่ม' required error={addErrors.groupId}>
          <Select value={addForm.groupId} onChange={e => setAddForm(f => ({ ...f, groupId: e.target.value }))} error={!!addErrors.groupId}>
            {groups[activeTab].map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </Select>
        </FormField>
        <FormField label='รายการ' required error={addErrors.text}>
          <Input
            value={addForm.text}
            onChange={e => { setAddForm(f => ({ ...f, text: e.target.value })); setAddErrors(v => ({ ...v, text: undefined })) }}
            placeholder='เช่น ตรวจสอบวันหมดอายุพาสปอร์ต'
            error={!!addErrors.text}
          />
        </FormField>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={editModal}
        title='✏️ แก้ไขรายการ'
        onClose={() => setEditModal(false)}
        footer={
          <>
            <Button variant='secondary' onClick={() => setEditModal(false)}>ยกเลิก</Button>
            <Button variant='primary' onClick={handleEdit} disabled={saving}>
              {saving ? '⏳...' : '💾 บันทึก'}
            </Button>
          </>
        }
      >
        <FormField label='รายการ' required error={editError}>
          <Input
            value={editText}
            onChange={e => { setEditText(e.target.value); setEditError('') }}
            error={!!editError}
          />
        </FormField>
      </Modal>
    </section>
  )
}
