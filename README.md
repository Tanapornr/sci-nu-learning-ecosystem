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
ระบบเริ่มต้นจากข้อมูลว่างทั้งหมด ทุกค่าเป็น 0 จนกว่าจะมีการเพิ่มข้อมูลจริงใน Google Sheet

หลังวาง `code.gs` ใน Apps Script ให้รันฟังก์ชัน `setupDatabase()` หนึ่งครั้งเพื่อสร้างชีตและหัวตารางอัตโนมัติ โดยไม่มีข้อมูลตัวอย่าง:
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
