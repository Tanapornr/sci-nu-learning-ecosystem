# SCI NU Learning Ecosystem

โครงระบบนิเวศการเรียนรู้ดิจิทัลสำหรับบุคลากรสายสนับสนุน

## โครงสร้างไฟล์
- `code.gs`
- `index.html`
- `dashboard.html`
- `mylearning.html`
- `courses.html`
- `aiasistant.html`
- `promptlibrary.html`
- `community.html`
- `workplace.html`
- `analytics.html`
- `portfolio.html`
- `badge.html`
- `settings.html`
- `styles.css`
- `app.js`

## Google Sheet ที่ต้องมี
ระบบมีข้อมูลตั้งต้นสำหรับคลังคอร์ส Prompt เครื่องมือ กิจกรรม ชุมชน และ Badge เป้าหมาย แต่ข้อมูลการเรียนของผู้ใช้เริ่มจาก 0 ทั้งหมด

หลังวาง `code.gs` ใน Apps Script ให้รันฟังก์ชัน `setupDatabase()` หนึ่งครั้งเพื่อสร้างชีต หัวตาราง และข้อมูลตั้งต้น โดยยังไม่สร้างประวัติการเรียนของผู้ใช้:
- `users`
- `courses`
- `prompts`
- `activities`
- `badges`
- `community`
- `tools`

ตัวอย่างคอลัมน์ขั้นต่ำ:
- users: `userId,name,position,progress,score`
- courses: `courseId,userId,title,category,status,progress,hours`
- prompts: `promptId,title,category,uses`
- activities: `activityId,title,type,date,time`
- badges: `badgeId,name,description,status,earnedDate`
- community: `postId,title,type,author,createdAt`
- tools: `toolId,title,category,uses,url`

## Deploy Apps Script
1. เปิด Google Sheet > Extensions > Apps Script
2. วางโค้ดจาก `code.gs`
3. Deploy > New deployment > Web app
4. ตั้งค่า: Execute as `Me`, Who has access: `Anyone`
5. คัดลอก URL Web App

## ตั้งค่าในเว็บ
1. เปิด `settings.html`
2. วาง Apps Script URL แล้วกดบันทึก
3. URL จะถูกเก็บใน `localStorage`

## การใช้งานของผู้เรียน
- เข้าเว็บจะเริ่มที่ `login.html`
- กรอกชื่อและตำแหน่งเพื่อเข้าสู่ระบบ
- ไปหน้า `Courses` แล้วกด `เริ่มเรียน`
- ระบบจะพาไปหน้า `learn.html` เพื่อดูวิดีโอและบทเรียน
- กด `เรียนจบบทเรียนนี้` เพื่อเพิ่มความก้าวหน้า
- หน้า `My Learning`, `Dashboard`, `Portfolio` จะอัปเดตจากความก้าวหน้าจริง
- หน้า `AI Assistant` พิมพ์ถามและกดส่งเพื่อให้ระบบตอบกลับได้ทันที

ถ้ายังไม่ได้ใส่ Apps Script URL ระบบจะบันทึกข้อมูลการเรียนไว้ใน `localStorage` ของเครื่องผู้ใช้ก่อน เมื่อใส่ Apps Script URL แล้วการเริ่มเรียนและอัปเดตความก้าวหน้าจะส่งไปยัง Google Sheet ด้วย

## Deploy Vercel
1. Push โค้ดไป GitHub repository
2. เข้า Vercel > Add New Project > Import จาก GitHub
3. Framework: `Other`
4. Build command: เว้นว่าง
5. Output directory: `.`
6. Deploy

## รันในเครื่อง
```bash
npm install
npm run dev
```
