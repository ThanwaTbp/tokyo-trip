# 🗾 Tokyo Trip Planner 2027 
[DEMO](https://tokyo-trip-gamma.vercel.app/)

แผนการท่องเที่ยวโตเกียว 6 วันกับแฟน — ปลายเดือนมกราคม 2570 ช่วงหิมะตก

Built with **Next.js 15** · **Prisma** · **PostgreSQL** · **Tailwind CSS** · **TypeScript**

---

## ✨ Features

- 🗓️ **แผน 6 วัน** — ดูรายละเอียดแต่ละวัน พร้อมลิงค์ Google Maps
- ✏️ **CRUD สถานที่** — เพิ่ม / แก้ไข / ลบสถานที่ผ่าน Modal พร้อม Validation
- 💴 **งบประมาณ** — แก้ไขงบแต่ละหมวด แสดง progress bar และสถานะเกิน/ในงบ
- ✅ **Checklist** — เตรียมของ / เตรียมตัว / แอปและข้อมูล พร้อม CRUD
- 🌙 **Dark / Light Mode** — toggle ได้ จดจำ preference ใน localStorage
- ❄️ **Snow animation** — canvas snowfall สำหรับ vibe ฤดูหนาว
- 🗄️ **PostgreSQL + Prisma** — ข้อมูล persist จริง
- 🚀 **Deploy บน Vercel** พร้อม ISR

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd tokyo-trip-planner
npm install
```

### 2. ตั้งค่า Database

สร้าง PostgreSQL database (แนะนำ [Neon](https://neon.tech) — free tier):

```bash
cp .env.example .env.local
# แก้ไข DATABASE_URL ใน .env.local
```

### 3. Push Schema & Seed Data

```bash
npm run db:generate   # generate Prisma Client
npm run db:push       # push schema ไป database
npm run db:seed       # seed ข้อมูลเริ่มต้น
```

### 4. Run Dev Server

```bash
npm run dev
# เปิด http://localhost:3000
```

---

## 🗄️ Database Schema

```
TripDay     ← 6 วันเที่ยว (dayNumber, title, travelInfo)
  └── Place ← สถานที่แต่ละวัน (name, desc, type, mapUrl, imgUrl)

BudgetItem  ← งบประมาณแต่ละหมวด (category, amount, color)

ChecklistGroup ← กลุ่มเช็คลิสต์ (tab: pack|prep|app)
  └── ChecklistItem ← รายการย่อย (text, done)
```

---

## 🌐 Deploy บน Vercel

### วิธีที่ 1: Vercel Dashboard (แนะนำ)

1. Push โค้ดขึ้น GitHub
2. ไปที่ [vercel.com](https://vercel.com) → Import Project
3. เพิ่ม Environment Variable:
   - `DATABASE_URL` = connection string จาก Neon/Supabase
4. Vercel จะ run `prisma generate && next build` ให้อัตโนมัติ

### วิธีที่ 2: Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### Database Options (Free Tier)

| Provider | Free Storage | Notes |
|----------|-------------|-------|
| [Neon](https://neon.tech) | 512 MB | แนะนำ! Serverless PostgreSQL |
| [Supabase](https://supabase.com) | 500 MB | มี Dashboard สวย |
| [Railway](https://railway.app) | 1 GB | $5 credit/month |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── days/          GET (all days+places), POST (add place)
│   │   │   └── [id]/      PATCH, DELETE (place by id)
│   │   ├── budget/        GET (all items)
│   │   │   └── [id]/      PATCH (update amount)
│   │   └── checklist/     GET (by tab), POST (add item)
│   │       └── [id]/      PATCH (toggle/edit), DELETE
│   ├── page.tsx           Server Component (SSR + ISR)
│   ├── layout.tsx         Root layout + fonts
│   ├── globals.css        CSS variables + Tailwind
│   └── error.tsx / loading.tsx
│
├── components/
│   ├── layout/            Hero, Navbar, ThemeProvider, SnowCanvas, Sections
│   ├── days/              DaysSection (CRUD)
│   ├── budget/            BudgetSection (CRUD)
│   ├── checklist/         ChecklistSection (CRUD + tabs)
│   └── ui/                Button, Modal, Input, Toast
│
├── lib/
│   ├── prisma.ts          Singleton Prisma client
│   └── validations.ts     Zod schemas
│
└── types/index.ts         TypeScript interfaces

prisma/
├── schema.prisma          Database schema
└── seed.ts                Seed script (ข้อมูลเริ่มต้น 6 วัน)
```

---

## 🛠️ API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/days` | ดึงข้อมูลทุกวัน + สถานที่ |
| POST | `/api/days` | เพิ่มสถานที่ใหม่ (body: Place + dayId) |
| PATCH | `/api/days/[id]` | แก้ไขสถานที่ตาม place id |
| DELETE | `/api/days/[id]` | ลบสถานที่ |
| GET | `/api/budget` | ดึงงบประมาณทั้งหมด |
| PATCH | `/api/budget/[id]` | อัปเดตจำนวนเงิน |
| GET | `/api/checklist?tab=pack` | ดึง checklist ตาม tab |
| POST | `/api/checklist` | เพิ่ม checklist item |
| PATCH | `/api/checklist/[id]` | toggle done / แก้ text |
| DELETE | `/api/checklist/[id]` | ลบ item |

---

## 📝 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to DB (no migration)
npm run db:seed      # Seed initial data
npm run db:studio    # Open Prisma Studio (DB GUI)
npm run lint         # ESLint
```

---

**Made with ❤️ for a Tokyo trip with someone special** 🗾❄️
