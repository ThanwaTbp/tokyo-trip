'use client'
import { useState, useCallback } from 'react'
import { MapPin, Plus, Pencil, Trash2, ChevronDown } from 'lucide-react'
import { Button, Modal, FormField, Input, Textarea, Select } from '@/components/ui'
import { useToast } from '@/components/ui/Toast'
import type { TripDay, Place, PlaceType } from '@/types'
import Image from 'next/image'

const TYPE_LABELS: Record<PlaceType, string> = {
  sight: '📷 สถานที่ท่องเที่ยว',
  food:  '🍴 อาหาร / ร้านอาหาร',
  exp:   '✨ ประสบการณ์',
  shop:  '🛍️ ช้อปปิ้ง',
  stay:  '🏨 ที่พัก',
}
const TYPE_STYLE: Record<PlaceType, string> = {
  sight: 'text-[var(--accent2)] border-[var(--accent2)] bg-[color-mix(in_srgb,var(--accent2)_8%,transparent)]',
  food:  'text-[var(--accent3)] border-[var(--accent3)] bg-[color-mix(in_srgb,var(--accent3)_8%,transparent)]',
  exp:   'text-[var(--accent)]  border-[var(--accent)]  bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]',
  shop:  'text-[var(--green)]   border-[var(--green)]   bg-[color-mix(in_srgb,var(--green)_8%,transparent)]',
  stay:  'text-[var(--accent3)] border-[var(--accent3)] bg-[color-mix(in_srgb,var(--accent3)_8%,transparent)]',
}

interface PlaceFormState {
  name: string; desc: string; type: PlaceType
  emoji: string; mapUrl: string; imgUrl: string
}
const EMPTY_FORM: PlaceFormState = { name: '', desc: '', type: 'sight', emoji: '📍', mapUrl: 'https://maps.google.com/?q=', imgUrl: '' }

interface Props { initialDays: TripDay[] }

export function DaysSection({ initialDays }: Props) {
  const [days, setDays] = useState(initialDays)
  const [open, setOpen] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<{ dayId: string; placeId?: string } | null>(null)
  const [form, setForm] = useState<PlaceFormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof PlaceFormState, string>>>({})
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const toggleDay = (id: string) => setOpen(prev => prev === id ? null : id)

  const validate = () => {
    const e: typeof errors = {}
    if (!form.name.trim())  e.name   = 'กรุณากรอกชื่อสถานที่'
    if (!form.desc.trim())  e.desc   = 'กรุณากรอกคำอธิบาย'
    if (!form.mapUrl.startsWith('http')) e.mapUrl = 'URL ต้องขึ้นต้นด้วย https://'
    if (form.imgUrl && !form.imgUrl.startsWith('http')) e.imgUrl = 'URL รูปภาพไม่ถูกต้อง'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const openAdd = (dayId: string) => {
    setEditTarget({ dayId })
    setForm(EMPTY_FORM)
    setErrors({})
    setModalOpen(true)
  }

  const openEdit = (dayId: string, place: Place) => {
    setEditTarget({ dayId, placeId: place.id })
    setForm({ name: place.name, desc: place.desc, type: place.type, emoji: place.emoji, mapUrl: place.mapUrl, imgUrl: place.imgUrl || '' })
    setErrors({})
    setModalOpen(true)
  }

  const handleSave = useCallback(async () => {
    if (!validate() || !editTarget) return
    setSaving(true)
    try {
      if (editTarget.placeId) {
        // PATCH
        const res = await fetch(`/api/days/${editTarget.placeId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error()
        const updated: Place = await res.json()
        setDays(ds => ds.map(d => d.id === editTarget.dayId
          ? { ...d, places: d.places.map(p => p.id === editTarget.placeId ? updated : p) }
          : d))
        toast('✅ แก้ไขสถานที่เรียบร้อย')
      } else {
        // POST
        const res = await fetch('/api/days', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, dayId: editTarget.dayId }),
        })
        if (!res.ok) throw new Error()
        const newPlace: Place = await res.json()
        setDays(ds => ds.map(d => d.id === editTarget.dayId
          ? { ...d, places: [...d.places, newPlace] }
          : d))
        toast('✅ เพิ่มสถานที่เรียบร้อย')
      }
      setModalOpen(false)
    } catch {
      toast('❌ เกิดข้อผิดพลาด กรุณาลองใหม่', 'err')
    } finally {
      setSaving(false)
    }
  }, [form, editTarget, toast])

  const handleDelete = async (dayId: string, placeId: string) => {
    if (!confirm('ต้องการลบสถานที่นี้?')) return
    try {
      const res = await fetch(`/api/days/${placeId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setDays(ds => ds.map(d => d.id === dayId
        ? { ...d, places: d.places.filter(p => p.id !== placeId) }
        : d))
      toast('🗑️ ลบสถานที่แล้ว')
    } catch {
      toast('❌ ลบไม่สำเร็จ', 'err')
    }
  }

  const f = (k: keyof PlaceFormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [k]: e.target.value }))
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: undefined }))
  }

  return (
    <section id='itinerary' className='mb-20'>
      <SectionHeader icon='🗓️' title='แผน 6 วัน' sub='คลิกที่วันเพื่อดูรายละเอียด — เพิ่ม / แก้ไข / ลบสถานที่ได้' />

      <div className='flex flex-col gap-4'>
        {days.map(day => (
          <div key={day.id} className='bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-md hover:border-[var(--border2)] transition-colors'>
            {/* Header */}
            <button
              className='w-full flex items-center justify-between gap-3 p-4 sm:p-5 bg-[var(--bg2)] border-b border-[var(--border)] text-left hover:bg-[var(--bg3)] transition-colors'
              onClick={() => toggleDay(day.id)}
            >
              <div className='flex items-center gap-3 min-w-0'>
                <span className='shrink-0 bg-[var(--accent)] text-[#1a0010] font-bold text-xs px-3 py-1 rounded-full'>
                  วันที่ {day.dayNumber}
                </span>
                <div className='min-w-0'>
                  <div className='font-semibold text-[var(--text)] text-sm sm:text-base truncate'>{day.title}</div>
                  <div className='text-[var(--text2)] text-xs mt-0.5'>📅 {day.date} · {day.places.length} สถานที่</div>
                </div>
              </div>
              <ChevronDown
                size={18}
                className={`text-[var(--text2)] shrink-0 transition-transform duration-200 ${open === day.id ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Body */}
            {open === day.id && (
              <div className='p-4 sm:p-5 animate-fade-in'>
                {/* Travel note */}
                <div className='flex gap-3 bg-[color-mix(in_srgb,var(--accent2)_7%,transparent)] border border-[color-mix(in_srgb,var(--accent2)_25%,transparent)] border-l-4 border-l-[var(--accent2)] rounded-r-xl p-3.5 mb-4 text-sm'>
                  <span className='text-xl shrink-0 mt-0.5'>{day.travelMode}</span>
                  <div>
                    <strong className='text-[var(--accent2)] block text-sm mb-0.5'>🚌 การเดินทาง: {day.travelTitle}</strong>
                    <span className='text-[var(--text2)] text-xs'>{day.travelDesc}</span>
                    <br />
                    <a href={day.travelMapUrl} target='_blank' rel='noreferrer'
                      className='inline-flex items-center gap-1 text-xs text-[var(--accent2)] mt-1.5 hover:opacity-70 transition-opacity'>
                      <MapPin size={11} />📍 Google Maps ↗
                    </a>
                  </div>
                </div>

                {/* Places */}
                <div className='flex flex-col gap-3'>
                  {day.places.map(p => (
                    <PlaceCard key={p.id} place={p} onEdit={() => openEdit(day.id, p)} onDelete={() => handleDelete(day.id, p.id)} />
                  ))}
                </div>

                {/* Add place button */}
                <button
                  onClick={() => openAdd(day.id)}
                  className='mt-3 w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-[var(--border)] rounded-xl text-sm text-[var(--text2)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_4%,transparent)] transition-all'
                >
                  <Plus size={15} /> เพิ่มสถานที่
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        open={modalOpen}
        title={editTarget?.placeId ? '✏️ แก้ไขสถานที่' : '➕ เพิ่มสถานที่'}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <Button variant='secondary' onClick={() => setModalOpen(false)}>ยกเลิก</Button>
            <Button variant='primary' onClick={handleSave} disabled={saving}>
              {saving ? '⏳ กำลังบันทึก...' : '💾 บันทึก'}
            </Button>
          </>
        }
      >
        <FormField label='ชื่อสถานที่' required error={errors.name}>
          <Input value={form.name} onChange={f('name')} placeholder='เช่น Senso-ji Temple' error={!!errors.name} />
        </FormField>
        <FormField label='คำอธิบาย' required error={errors.desc}>
          <Textarea value={form.desc} onChange={f('desc')} placeholder='รายละเอียดสถานที่...' error={!!errors.desc} />
        </FormField>
        <FormField label='ประเภท'>
          <Select value={form.type} onChange={f('type')}>
            {(Object.entries(TYPE_LABELS) as [PlaceType, string][]).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </Select>
        </FormField>
        <FormField label='Emoji ไอคอน'>
          <Input value={form.emoji} onChange={f('emoji')} placeholder='เช่น 🗻 🍜 🎮' maxLength={4} />
        </FormField>
        <FormField label='ลิงค์ Google Maps' required error={errors.mapUrl}>
          <Input value={form.mapUrl} onChange={f('mapUrl')} placeholder='https://maps.google.com/?q=...' error={!!errors.mapUrl} />
        </FormField>
        <FormField label='URL รูปภาพ (ไม่บังคับ)' error={errors.imgUrl}>
          <Input value={form.imgUrl} onChange={f('imgUrl')} placeholder='https://images.unsplash.com/...' error={!!errors.imgUrl} />
        </FormField>
      </Modal>
    </section>
  )
}

/* ── PlaceCard ── */
function PlaceCard({ place, onEdit, onDelete }: { place: Place; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className='grid bg-[var(--bg2)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--border2)] transition-colors'
      style={{ gridTemplateColumns: '80px 1fr auto' }}>
      {/* Thumbnail */}
      {place.imgUrl ? (
        <div className='relative w-20 h-20 shrink-0'>
          <Image src={place.imgUrl} alt={place.name} fill className='object-cover' sizes='80px' />
        </div>
      ) : (
        <div className='w-20 h-20 bg-[var(--bg3)] flex items-center justify-center text-3xl shrink-0'>
          {place.emoji}
        </div>
      )}

      {/* Info */}
      <div className='p-2.5 sm:p-3 min-w-0 flex flex-col justify-center'>
        <div className='font-semibold text-[var(--text)] text-sm mb-0.5 truncate'>{place.name}</div>
        <div className='text-[var(--text2)] text-xs leading-relaxed line-clamp-2 mb-1.5'>{place.desc}</div>
        <div className='flex items-center gap-2 flex-wrap'>
          <span className={`text-xs px-2 py-0.5 rounded-full border ${TYPE_STYLE[place.type]}`}>
            {TYPE_LABELS[place.type]}
          </span>
          <a href={place.mapUrl} target='_blank' rel='noreferrer'
            className='inline-flex items-center gap-1 text-xs text-[var(--accent2)] hover:opacity-70 transition-opacity'>
            <MapPin size={10} /> แผนที่ ↗
          </a>
        </div>
      </div>

      {/* Actions */}
      <div className='flex flex-col gap-1.5 p-2 items-end justify-center shrink-0'>
        <Button variant='secondary' size='xs' onClick={onEdit}>
          <Pencil size={11} /> แก้ไข
        </Button>
        <Button variant='danger' size='xs' onClick={onDelete}>
          <Trash2 size={11} /> ลบ
        </Button>
      </div>
    </div>
  )
}

/* ── SectionHeader helper ── */
export function SectionHeader({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    <div className='mb-6'>
      <div className='flex items-center gap-2.5 text-2xl sm:text-3xl font-bold text-[var(--text)] mb-1.5'>
        <span>{icon}</span>{title}
      </div>
      <p className='text-[var(--text2)] text-sm'>{sub}</p>
      <div className='mt-4 h-px bg-gradient-to-r from-[var(--accent)] via-[var(--accent2)] to-transparent opacity-30' />
    </div>
  )
}
