import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.checklistItem.deleteMany()
  await prisma.checklistGroup.deleteMany()
  await prisma.budgetItem.deleteMany()
  await prisma.place.deleteMany()
  await prisma.tripDay.deleteMany()

  const daysData = [
    {
      dayNumber: 1, date: '25 ม.ค. 2570', title: '✈️ บินถึงโตเกียว + ชินจูกุ',
      travelMode: '✈️', travelTitle: "Suvarnabhumi → Narita (BKK–NRT)",
      travelDesc: 'เที่ยวบินช่วงเช้า ถึง Narita ราว 18:00 น. ต่อ Narita Express เข้าชินจูกุ ~80 นาที',
      travelMapUrl: 'https://maps.google.com/?q=Narita+International+Airport',
      places: [
        { name: "Narita Express (N'EX)", desc: 'รถไฟด่วนจากสนามบินนาริตะ ซื้อ IC Card ที่สนามบิน', type: 'sight', emoji: '🚂', mapUrl: 'https://maps.google.com/?q=Narita+Express', imgUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80', order: 1 },
        { name: 'Shinjuku Station Area', desc: 'เดินเล่นย่านชินจูกุยามค่ำ ชม Kabukicho, Golden Gai บรรยากาศหิมะโรแมนติก', type: 'sight', emoji: '🌃', mapUrl: 'https://maps.google.com/?q=Shinjuku+Station+Tokyo', imgUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80', order: 2 },
        { name: 'Ichiran Ramen ชินจูกุ', desc: 'ราเม็งโทนโกตสึสูตรต้นตำรับ นั่งคูหาเดี่ยว ¥1,200–1,500/คน เปิดตลอดคืน', type: 'food', emoji: '🍜', mapUrl: 'https://maps.google.com/?q=Ichiran+Ramen+Shinjuku', imgUrl: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80', order: 3 },
      ]
    },
    {
      dayNumber: 2, date: '26 ม.ค. 2570', title: '🗻 ฟูจิ + ลอว์สัน + ออนเซ็น',
      travelMode: '🚌', travelTitle: 'ชินจูกุ → Kawaguchiko (Fujikyu Highway Bus)',
      travelDesc: 'รถบัส Highway Bus จาก Shinjuku Bus Terminal ราว 2 ชั่วโมง ¥2,000/คน จองล่วงหน้า',
      travelMapUrl: 'https://maps.google.com/?q=Shinjuku+Highway+Bus+Terminal',
      places: [
        { name: 'ภูเขาไฟฟูจิ (Mt. Fuji)', desc: 'ชมฟูจิจาก Kawaguchiko หิมะปกคลุมสวยงาม ถ่ายรูปชั้น 5 หรือรอบทะเลสาบ', type: 'sight', emoji: '🗻', mapUrl: 'https://maps.google.com/?q=Mount+Fuji+Japan', imgUrl: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&q=80', order: 1 },
        { name: 'Lawson หน้าวิวฟูจิ', desc: 'จุดถ่ายรูปสุดฮิต! Lawson ที่มีฟูจิเป็นฉากหลัง ที่ Kawaguchiko ต้องมาถ่ายให้ได้', type: 'sight', emoji: '🏪', mapUrl: 'https://maps.google.com/?q=Lawson+Fujikawaguchiko+Fuji+View', imgUrl: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&q=80', order: 2 },
        { name: 'หมู่บ้านน้ำใส Oshino Hakkai', desc: 'หมู่บ้านน้ำพุ 8 แห่งจากหิมะละลายบนฟูจิ น้ำใสมาก เห็นปลาคาร์ป บ้านมุงจากสไตล์โบราณ', type: 'sight', emoji: '🏘️', mapUrl: 'https://maps.google.com/?q=Oshino+Hakkai+Yamanashi', imgUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80', order: 3 },
        { name: 'Ryokan + แช่ออนเซ็น', desc: 'เข้าพัก Ryokan ใส่ yukata แช่ออนเซ็นกลางหิมะ สุดโรแมนติก ราว ¥15,000–20,000/ห้อง', type: 'stay', emoji: '♨️', mapUrl: 'https://maps.google.com/?q=Ryokan+Kawaguchiko', imgUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80', order: 4 },
      ]
    },
    {
      dayNumber: 3, date: '27 ม.ค. 2570', title: '👘 ยูกาตะ + Asakusa + สกายทรี',
      travelMode: '🚃', travelTitle: 'Kawaguchiko → Asakusa',
      travelDesc: 'นั่งรถบัสกลับชินจูกุ แล้วต่อ Ginza Line เข้า Asakusa ใช้ IC Card',
      travelMapUrl: 'https://maps.google.com/?q=Asakusa+Station+Tokyo',
      places: [
        { name: 'วัด Senso-ji', desc: 'วัดที่เก่าแก่ที่สุดในโตเกียว ยามหิมะตกสวยงามเหมือนโปสการ์ด ซื้อโอมิกุจิเป็นที่ระลึก', type: 'sight', emoji: '⛩️', mapUrl: 'https://maps.google.com/?q=Senso-ji+Temple+Asakusa', imgUrl: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&q=80', order: 1 },
        { name: 'เช่าชุด Yukata / Kimono', desc: 'เช่า yukata แถว Asakusa มีร้านเยอะมาก ¥3,000–5,000/คน ถ่ายรูปกับวัดสวยมาก', type: 'exp', emoji: '👘', mapUrl: 'https://maps.google.com/?q=Kimono+Rental+Asakusa+Tokyo', imgUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80', order: 2 },
        { name: 'Tokyo Skytree', desc: 'หอสังเกตการณ์สูง 634 ม. ชมวิวโตเกียว ยามหิมะตกสวยมาก ¥2,100/คน (ชั้น 350)', type: 'sight', emoji: '🗼', mapUrl: 'https://maps.google.com/?q=Tokyo+Skytree', imgUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80', order: 3 },
      ]
    },
    {
      dayNumber: 4, date: '28 ม.ค. 2570', title: '🎮 Akihabara + Shibuya + Harajuku',
      travelMode: '🚇', travelTitle: 'Tokyo Metro Day Pass',
      travelDesc: 'ซื้อ Tokyo Subway 1-Day Pass ¥600/คน ขึ้นได้ไม่จำกัดครั้ง สะดวกมาก',
      travelMapUrl: 'https://maps.google.com/?q=Akihabara+Electric+Town+Tokyo',
      places: [
        { name: 'Akihabara Electric Town', desc: 'สวรรค์ของคนรักอิเล็กทรอนิกส์ การ์ตูน มังงะ Anime ซื้อ gadget ถูกกว่าไทยมาก', type: 'shop', emoji: '🎮', mapUrl: 'https://maps.google.com/?q=Akihabara+Electric+Town', imgUrl: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400&q=80', order: 1 },
        { name: 'Harajuku + Takeshita Street', desc: 'ถนนสายแฟชั่น crepe อร่อย ของหวานน่ารัก ร้านเสื้อผ้าสตรีท', type: 'shop', emoji: '🐑', mapUrl: 'https://maps.google.com/?q=Takeshita+Street+Harajuku+Tokyo', imgUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&q=80', order: 2 },
        { name: 'Shibuya Crossing', desc: 'แยกที่คนข้ามพร้อมกันมากที่สุดในโลก ขึ้นชม Shibuya Sky บรรยากาศยามค่ำสุดยอด', type: 'sight', emoji: '🌃', mapUrl: 'https://maps.google.com/?q=Shibuya+Crossing+Tokyo', imgUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&q=80', order: 3 },
        { name: 'Fuunji Tsukemen ชินจูกุ', desc: 'ร้าน Tsukemen อันดับต้นๆ น้ำซุปเข้มข้น เส้นหนา คิวยาวแต่คุ้มมาก', type: 'food', emoji: '🍜', mapUrl: 'https://maps.google.com/?q=Fuunji+Tsukemen+Shinjuku', imgUrl: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80', order: 4 },
      ]
    },
    {
      dayNumber: 5, date: '29 ม.ค. 2570', title: '🎨 Ueno + TeamLab + Ginza',
      travelMode: '🚇', travelTitle: 'Tokyo Metro Ueno–Ginza–Toyosu',
      travelDesc: 'ใช้ IC Card Ueno → Ginza → Toyosu ตามลำดับ',
      travelMapUrl: 'https://maps.google.com/?q=Ueno+Station+Tokyo',
      places: [
        { name: 'Ueno Park', desc: 'สวนสาธารณะขนาดใหญ่ พิพิธภัณฑ์ ยามหิมะตกสวยงามมาก เข้าฟรี', type: 'sight', emoji: '🦁', mapUrl: 'https://maps.google.com/?q=Ueno+Park+Tokyo', imgUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80', order: 1 },
        { name: 'TeamLab Planets Tokyo', desc: 'ศิลปะดิจิตัลอิมเมอร์ซีฟระดับโลก ต้องจองล่วงหน้า ¥3,200/คน ประสบการณ์ไม่มีที่ไหนเหมือน', type: 'exp', emoji: '🎨', mapUrl: 'https://maps.google.com/?q=teamLab+Planets+Tokyo', imgUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&q=80', order: 2 },
        { name: 'Tsukiji Outer Market', desc: 'ตลาดปลา Tsukiji ส่วนนอก ชิมซาชิมิสดๆ Tamagoyaki ขนมอาหารทะเลสดใหม่', type: 'food', emoji: '🍱', mapUrl: 'https://maps.google.com/?q=Tsukiji+Outer+Market+Tokyo', imgUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80', order: 3 },
      ]
    },
    {
      dayNumber: 6, date: '30 ม.ค. 2570', title: '🛍️ ช้อปสุดท้าย + บินกลับ',
      travelMode: '✈️', travelTitle: 'Tokyo → Suvarnabhumi (NRT–BKK)',
      travelDesc: 'เที่ยวบินบ่าย/เย็น เช็คเอาต์โรงแรม ฝากกระเป๋า ออกไปสนามบินก่อน 3–4 ชั่วโมง',
      travelMapUrl: 'https://maps.google.com/?q=Tokyo+Narita+International+Airport',
      places: [
        { name: 'Don Quijote ชินจูกุ', desc: 'ช้อปของฝาก ยา เครื่องสำอาง ขนม ของฝากครบในที่เดียว ราคาถูก', type: 'shop', emoji: '🛍️', mapUrl: 'https://maps.google.com/?q=Don+Quijote+Shinjuku+Tokyo', imgUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&q=80', order: 1 },
        { name: 'Genki Sushi / Sushiro', desc: 'กินซูชิสายพานมื้อสุดท้าย ¥100–150/จาน สดอร่อย คุ้มค่า', type: 'food', emoji: '🍣', mapUrl: 'https://maps.google.com/?q=Genki+Sushi+Shinjuku', imgUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80', order: 2 },
        { name: 'Narita Express กลับสนามบิน', desc: "นั่ง N'EX จากชินจูกุถึงนาริตะ ~80 นาที แนะนำออกก่อน 3–4 ชั่วโมง", type: 'sight', emoji: '🚆', mapUrl: 'https://maps.google.com/?q=Narita+Express', imgUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80', order: 3 },
      ]
    },
  ]

  for (const d of daysData) {
    const { places, ...dayFields } = d
    const day = await prisma.tripDay.create({ data: dayFields })
    for (const p of places) {
      await prisma.place.create({ data: { ...p, dayId: day.id } })
    }
  }

  const budgetData = [
    { category: '✈️ ตั๋วเครื่องบิน', amount: 28000, maxBudget: 80000, color: '#f4a0c0', note: 'ไป-กลับ 2 คน BKK-NRT', order: 1 },
    { category: '🏨 ที่พัก (5 คืน)', amount: 16000, maxBudget: 80000, color: '#80b8f0', note: 'Ryokan 1 คืน + โรงแรม 4 คืน', order: 2 },
    { category: '🚃 เดินทางภายใน', amount: 4500,  maxBudget: 80000, color: '#f0c870', note: 'IC Card, รถบัสฟูจิ, N\'EX', order: 3 },
    { category: '🍜 อาหาร (6 วัน)', amount: 9000,  maxBudget: 80000, color: '#68c898', note: 'เฉลี่ยวันละ ¥3,000–4,000/คน', order: 4 },
    { category: '🎡 ค่าเข้า/กิจกรรม', amount: 7000, maxBudget: 80000, color: '#f4a0c0', note: 'Skytree, TeamLab, ออนเซ็น, Yukata', order: 5 },
    { category: '🛍️ ช้อปปิ้ง', amount: 10000, maxBudget: 80000, color: '#f0c870', note: 'ของฝาก เสื้อผ้า ของที่ระลึก', order: 6 },
    { category: '🔁 สำรองฉุกเฉิน', amount: 5500, maxBudget: 80000, color: '#80b8f0', note: 'ค่าประกันเดินทาง + เงินสำรอง', order: 7 },
  ]
  await prisma.budgetItem.createMany({ data: budgetData })

  const checklistData = [
    { tab: 'pack', name: '👔 เสื้อผ้า / เครื่องนุ่งห่ม', order: 1, items: ['เสื้อกันหนาวหนา (0–7°C)', 'แจ็คเก็ตกันลม กันน้ำ', 'ถุงมือกันหนาว', 'หมวกไหมพรม', 'ผ้าพันคอ', 'ถุงเท้ากันหนาว 5–6 คู่', 'เสื้อ base layer', 'กางเกงกันหนาว', 'ชุดนอน'] },
    { tab: 'pack', name: '👟 รองเท้า', order: 2, items: ['รองเท้าบูทกันหิมะ กันลื่น', 'รองเท้าลำลองในร่ม'] },
    { tab: 'pack', name: '🧴 ของใช้ส่วนตัว', order: 3, items: ['ครีมกันแดด SPF 50', 'ครีมทามือ ลิปมัน', 'ยาสามัญประจำบ้าน', 'ยาแก้ไอ ยาแก้หวัด'] },
    { tab: 'pack', name: '🔌 อุปกรณ์ไฟฟ้า', order: 4, items: ['Adapter ญี่ปุ่น Type A', 'Power Bank', 'กล้องถ่ายรูป + Charger', 'สายชาร์จ + หูฟัง'] },
    { tab: 'pack', name: '📄 เอกสาร', order: 5, items: ['พาสปอร์ต (อายุเหลือ 6 เดือน)', 'สำเนาพาสปอร์ต 2 ชุด', 'ตั๋วเครื่องบิน', 'กรมธรรม์ประกัน', 'บัตรจองที่พัก'] },
    { tab: 'prep', name: '💳 การเงิน', order: 1, items: ['แลกเงินเยน ¥80,000–100,000/คน', 'เตรียมบัตรเครดิตต่างประเทศ', 'แจ้งธนาคารก่อนเดินทาง'] },
    { tab: 'prep', name: '🛂 วีซ่าและจอง', order: 2, items: ['ยื่นวีซ่าญี่ปุ่น ล่วงหน้า 3–4 สัปดาห์', 'จองตั๋วเครื่องบิน ล่วงหน้า 2–3 เดือน', 'จอง Ryokan ล่วงหน้า (เต็มเร็ว)', 'จอง TeamLab Planets ออนไลน์'] },
    { tab: 'prep', name: '🌐 อินเทอร์เน็ต', order: 3, items: ['เช่า Pocket WiFi หรือซื้อ eSIM', 'โหลด Google Translate + Offline', 'เซฟเบอร์ฉุกเฉิน 110/119'] },
    { tab: 'prep', name: '🎒 วางแผนเดินทาง', order: 4, items: ['ซื้อ Suica / Pasmo ที่สนามบิน', 'ศึกษาเส้นทาง Tokyo Metro', 'จองรถบัส Fujikyu', 'เช็คพยากรณ์อากาศ'] },
    { tab: 'app',  name: '🗺️ แอปเดินทาง', order: 1, items: ['Google Maps (โหลด Offline Map)', 'HyperDia / Japan Transit Planner', 'Navitime Japan Travel'] },
    { tab: 'app',  name: '🍽️ แอปอาหาร', order: 2, items: ['Tabelog (รีวิวร้านอาหาร)', 'Google Translate (ถ่ายรูปเมนู)', 'PayPay (กระเป๋าเงินดิจิตัล)'] },
    { tab: 'app',  name: '🎫 จองและข้อมูล', order: 3, items: ['จอง TeamLab ผ่านเว็บ', 'Booking.com / Agoda', 'Japan Official Travel App'] },
  ]

  for (const g of checklistData) {
    const { items, ...gf } = g
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const group = await prisma.checklistGroup.create({ data: gf as any })
    await prisma.checklistItem.createMany({
      data: items.map((text, i) => ({ text, groupId: group.id, order: i + 1 }))
    })
  }

  console.log('✅ Seed completed!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
