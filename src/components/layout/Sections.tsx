import { SectionHeader } from '@/components/days/DaysSection'

const TIPS = [
  { icon: '🧥', title: 'แต่งตัวเป็นชั้น (Layering)', body: 'อุณหภูมิช่วงปลายมกราคมประมาณ 0–7°C ใส่ base layer + เสื้อกันหนาว + แจ็คเก็ตกันลม ดีกว่าใส่ชั้นเดียวหนา' },
  { icon: '💰', title: 'ร้านค้าส่วนใหญ่รับเงินสด', body: 'ญี่ปุ่นยังนิยมเงินสดมาก ATM 7-Eleven รับบัตรต่างประเทศ แนะนำพกเยนไว้เสมอ' },
  { icon: '♨️', title: 'มารยาทออนเซ็น', body: 'ต้องอาบน้ำชำระร่างกายก่อนลงออนเซ็น ห้ามนำผ้าเช็ดตัวลงน้ำ ห้ามว่ายน้ำหรือส่งเสียงดัง' },
  { icon: '🚶', title: 'เดินมาก เตรียมรองเท้าสบาย', body: 'วันหนึ่งๆ เดิน 15,000–20,000 ก้าวเป็นเรื่องปกติ! รองเท้ากันหิมะและกันลื่นสำคัญมาก' },
  { icon: '🚯', title: 'ไม่มีถังขยะ แต่ไม่ทิ้งขยะเกลื่อน', body: 'พกถุงเล็กติดตัวเพื่อเก็บขยะ เอาไปทิ้งที่ร้านสะดวกซื้อ เป็นมารยาทสำคัญมาก' },
  { icon: '📵', title: 'เงียบบนรถไฟ', body: 'ห้ามโทรศัพท์บนรถไฟ พูดเสียงเบา ไม่กินอาหาร (ยกเว้นชินคันเซ็น) เป็นมารยาทพื้นฐาน' },
  { icon: '❄️', title: 'ระวังหิมะลื่น', body: 'พื้นหิมะบางครั้งแข็งเป็นน้ำแข็ง รองเท้ากันลื่นสำคัญมาก โดยเฉพาะแถวฟูจิและทางแคบ' },
  { icon: '🎫', title: 'IC Card ใช้ได้ทุกที่', body: 'Suica หรือ Pasmo ใช้ขึ้นรถไฟ รถบัส ซื้อของในร้านสะดวกซื้อ ซื้อจากตู้ Auto ที่สนามบิน' },
]

export function TipsSection() {
  return (
    <section id='tips' className='mb-20'>
      <SectionHeader
        icon='💡'
        title='เคล็ดลับฤดูหนาวโตเกียว'
        sub='สิ่งที่ควรรู้ก่อนออกเดินทางช่วงหิมะตก'
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {TIPS.map(t => (
          <div key={t.title} className='bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 hover:border-[var(--border2)] transition-colors'>
            <div className='text-3xl mb-3'>{t.icon}</div>
            <div className='font-semibold text-sm text-[var(--text)] mb-1.5'>{t.title}</div>
            <div className='text-xs text-[var(--text2)] leading-relaxed'>{t.body}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function OverviewSection({ totalPlaces }: { totalPlaces: number }) {
  return (
    <section id='overview' className='mb-20'>
      <SectionHeader icon='📊' title='ภาพรวมทริป' sub='สรุปแผนการเดินทาง 6 วันสุดโรแมนติกในโตเกียวและฟูจิ' />
      <div className='grid grid-cols-2 sm:grid-cols-5 gap-3 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4'>
        {[
          ['6', 'วัน'],
          [String(totalPlaces), 'สถานที่'],
          ['80K', 'งบ (บาท)'],
          ['❄️', 'ฤดูหิมะ'],
          ['♨️', 'ออนเซ็น'],
        ].map(([n, l]) => (
          <div key={l} className='text-center py-2'>
            <div className='text-2xl sm:text-3xl font-bold text-[var(--accent)] mb-0.5'>{n}</div>
            <div className='text-xs text-[var(--text2)]'>{l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
