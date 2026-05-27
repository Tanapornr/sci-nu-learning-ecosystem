const APP_CONFIG = {
  appsScriptUrl: localStorage.getItem("appsScriptUrl") || "",
};

const thaiDate = new Intl.DateTimeFormat("th-TH", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date());

const pageMeta = {
  "dashboard.html": ["Dashboard", "ภาพรวมการเรียนรู้ ทักษะงาน และการใช้ AI ของคุณ"],
  "mylearning.html": ["My Learning", "พื้นที่ติดตามคอร์ส บทเรียน และเส้นทางการเรียนรู้ส่วนตัว"],
  "courses.html": ["Courses", "เลือกเรียนรู้ในเรื่องที่จำเป็นต่อการทำงานและการใช้ AI"],
  "aiasistant.html": ["AI Assistant", "ผู้ช่วยอัจฉริยะสำหรับงานเอกสาร ข้อมูล และการเรียนรู้"],
  "promptlibrary.html": ["Prompt Library", "คลังคำสั่ง Prompt สำหรับงานสำนักงานและการเรียนรู้ด้วย AI"],
  "community.html": ["Community", "ชุมชนแลกเปลี่ยนความรู้ของบุคลากรสายสนับสนุน"],
  "workplace.html": ["Workplace Tools", "เครื่องมือและระบบสนับสนุนงานประจำวัน"],
  "analytics.html": ["Analytics", "วิเคราะห์ข้อมูลการเรียนรู้ การใช้งาน และผลลัพธ์ของระบบ"],
  "portfolio.html": ["My Portfolio", "แฟ้มสะสมการเรียนรู้ ความสำเร็จ และผลงานของคุณ"],
  "badge.html": ["Badge & Achievement", "สะสมความสำเร็จและติดตามเป้าหมายการพัฒนา"],
  "settings.html": ["Settings", "ตั้งค่าระบบและการเชื่อมต่อ Google Sheet"],
};

function stat(label, value, icon, key) {
  const attr = key ? ` data-kpi="${key}"` : "";
  return `<div class="card kpi"><div class="kpi-icon">${icon}</div><div><span class="muted small">${label}</span><strong${attr}>${value}</strong></div></div>`;
}

function course(title, status, progress, meta, icon = "📘") {
  const tone = status === "เรียนจบแล้ว" ? "green" : status === "ยังไม่เริ่ม" ? "amber" : "blue";
  return `<div class="card course-card"><div class="row-main"><div class="thumb">${icon}</div><div><h4>${title}</h4><span class="pill ${tone}">${status}</span></div></div><div class="progress"><span style="width:${progress}%"></span></div><div class="row"><span class="muted small">${meta}</span><strong>${progress}%</strong></div></div>`;
}

function prompt(title, category, uses, icon = "🧩") {
  return `<div class="card prompt-card"><div class="circle">${icon}</div><h4>${title}</h4><p class="muted small">${category}</p><div class="row"><span class="muted small">ใช้งานแล้ว</span><strong>${uses} ครั้ง</strong></div></div>`;
}

function badge(name, text, color = "blue") {
  return `<div class="card badge-card"><div class="kpi-icon">${color === "gold" ? "🏆" : color === "green" ? "🎯" : "⭐"}</div><h4>${name}</h4><p class="muted small">${text}</p></div>`;
}

function header(file) {
  const [title, subtitle] = pageMeta[file] || pageMeta["dashboard.html"];
  return `<div class="topbar"><div><h1 class="page-title">${title}</h1><span class="page-subtitle">${subtitle}</span></div><div class="top-actions"><input class="search" placeholder="ค้นหา..." /><span class="date-pill">📅 <span data-date>${thaiDate}</span></span></div></div>`;
}

const renderers = {
  "dashboard.html": () => `${header("dashboard.html")}
    <section class="grid-5">
      ${stat("คอร์สที่กำลังเรียน", "4", "📚", "learningCourses")}
      ${stat("ชั่วโมงเรียนสะสม", "18.5", "⏱")}
      ${stat("ความก้าวหน้า", "75%", "✅", "progress")}
      ${stat("Badge ที่ได้รับ", "6", "🏅", "badges")}
      ${stat("คะแนนรวม", "870", "👥", "score")}
    </section>
    <section class="layout-main" style="margin-top:14px">
      <div class="stack">
        <div class="panel"><div class="panel-head"><h3>คอร์สที่กำลังเรียน</h3><a class="link" href="mylearning.html">ดูทั้งหมด</a></div><div class="course-grid">${course("การใช้ AI เพื่อการทำงานเอกสาร", "กำลังเรียน", 75, "4 บทเรียน | 18 ชั่วโมง", "🤖")}${course("การวิเคราะห์ข้อมูลด้วย Excel", "กำลังเรียน", 60, "5 บทเรียน | 15 ชั่วโมง", "📊")}${course("การสื่อสารและประสานงานยุคดิจิทัล", "ยังไม่เริ่ม", 0, "3 บทเรียน | 10 ชั่วโมง", "💬")}</div></div>
        <div class="grid-2"><div class="panel"><div class="panel-head"><h3>ความก้าวหน้ารายเดือน</h3><span class="pill">พ.ค. 67</span></div><div class="chart-box"><div class="bar" style="height:48%"></div><div class="bar" style="height:58%"></div><div class="bar" style="height:66%"></div><div class="bar" style="height:80%"></div><div class="bar" style="height:72%"></div><div class="bar" style="height:68%"></div><div class="bar" style="height:92%"></div><div class="bar" style="height:84%"></div></div></div><div class="panel"><div class="panel-head"><h3>Badge ล่าสุด</h3><a class="link" href="badge.html">ดูทั้งหมด</a></div><div class="grid-2">${badge("AI Explorer", "ใช้ AI Tools 10 ครั้ง")}${badge("Prompt Master", "สร้าง Prompt ใช้งานจริง", "gold")}</div></div></div>
      </div>
      <aside class="stack"><div class="panel"><div class="panel-head"><h3>ปฏิทินการเรียนรู้</h3><a class="link" href="mylearning.html">ดูปฏิทิน</a></div><ul class="list"><li class="row"><span>09:00 AI เพื่อเอกสาร</span><span class="pill">เข้าเรียน</span></li><li class="row"><span>13:30 Excel Advanced</span><span class="pill green">จองแล้ว</span></li><li class="row"><span>16:00 สื่อสารยุคดิจิทัล</span><span class="pill amber">กลุ่ม</span></li></ul></div><div class="panel"><h3>AI Assistant แนะนำ</h3><ul class="list"><li class="row">สรุปรายงานประชุม</li><li class="row">ร่างหนังสือราชการ</li><li class="row">สร้าง To-do List รายวัน</li></ul><a class="btn primary" href="aiasistant.html">ถาม AI Assistant</a></div></aside>
    </section>`,

  "mylearning.html": () => `${header("mylearning.html")}
    <div class="tabs"><button class="tab active">คอร์สของฉัน</button><button class="tab">บทเรียนที่กำลังเรียน</button><button class="tab">ประวัติการเรียน</button><button class="tab">Wishlist</button></div>
    <section class="layout-main"><div class="panel"><div class="course-grid">${course("การใช้ AI เพื่อการทำงานเอกสาร", "กำลังเรียน", 75, "ใบประกาศ | 4 บทเรียน", "🤖")}${course("การวิเคราะห์ข้อมูลด้วย Excel", "กำลังเรียน", 60, "ใบประกาศ | 5 บทเรียน", "📗")}${course("การสื่อสารและประสานงานยุคดิจิทัล", "ยังไม่เริ่ม", 0, "3 บทเรียน", "👥")}${course("การสร้างสื่อด้วย Canva AI", "เรียนจบแล้ว", 100, "ใบประกาศ | 4 บทเรียน", "🎨")}</div></div><aside class="stack"><div class="panel"><h3>Learning Journey</h3><ul class="list"><li class="row">ก่อนเรียน <span class="pill green">ผ่าน</span></li><li class="row">ระหว่างเรียน <span class="pill blue">กำลังเรียน</span></li><li class="row">หลังเรียน <span class="pill">รอประเมิน</span></li></ul></div><div class="grid-2">${stat("ค้นหาคอร์ส", "24", "🔍")}${stat("โน้ตของฉัน", "15", "📝")}</div></aside></section>`,

  "courses.html": () => `${header("courses.html")}
    <div class="tabs"><button class="tab active">ทั้งหมด</button><button class="tab">กำลังเรียน</button><button class="tab">ยังไม่ได้เริ่ม</button><button class="tab">เรียนจบแล้ว</button></div>
    <section class="grid-4">${stat("คอร์สทั้งหมด", "24", "📚")}${stat("กำลังเรียน", "4", "▶")}${stat("ยังไม่เริ่ม", "12", "⏳")}${stat("เรียนจบแล้ว", "8", "✓")}</section>
    <section class="layout-main" style="margin-top:14px"><div class="panel"><div class="panel-head"><h3>คอร์สแนะนำ</h3><select class="select"><option>เรียงตาม: ล่าสุด</option></select></div><div class="course-grid">${course("AI สำหรับการทำงานสำนักงาน", "กำลังเรียน", 75, "พื้นฐาน | 2 ชม. 30 นาที", "🤖")}${course("Excel ขั้นสูงเพื่อการทำงาน", "กำลังเรียน", 60, "พื้นฐาน | 3 ชม. 15 นาที", "📊")}${course("Google Workspace เพื่อการทำงาน", "ยังไม่เริ่ม", 0, "พื้นฐาน | 2 ชม.", "🗂")}${course("Power BI สำหรับมือใหม่", "ยังไม่เริ่ม", 0, "ระดับกลาง | 3 ชม.", "📈")}${course("การออกแบบ Infographic ด้วย Canva", "เรียนจบแล้ว", 100, "พื้นฐาน | 1 ชม. 30 นาที", "🎨")}${course("การบริหารโครงการอย่างมีประสิทธิภาพ", "ยังไม่เริ่ม", 0, "ระดับกลาง | 4 ชม.", "🗓")}</div></div><aside class="stack"><div class="panel"><h3>หมวดหมู่คอร์ส</h3><ul class="list"><li class="row">ทักษะดิจิทัล <strong>8</strong></li><li class="row">การใช้ AI <strong>6</strong></li><li class="row">การจัดการข้อมูล <strong>4</strong></li><li class="row">การสื่อสาร <strong>3</strong></li></ul></div><div class="panel"><h3>คอร์สยอดนิยม</h3><ul class="list"><li class="row">AI เพื่อเอกสาร <span>4.8</span></li><li class="row">Excel เพื่อการทำงาน <span>4.7</span></li></ul></div></aside></section>`,

  "aiasistant.html": () => `${header("aiasistant.html")}
    <section class="hero"><h2>สวัสดีครับ ผมคือ SCI NU AI Assistant</h2><p>พร้อมช่วยสรุปเอกสาร ร่างหนังสือราชการ วิเคราะห์ข้อมูล สร้างบทเรียน และแนะนำการใช้ AI สำหรับงานสนับสนุน</p></section>
    <section class="layout-main" style="margin-top:14px"><div class="panel chat"><div class="bubble">สวัสดีครับ คุณวารุณี วันนี้ให้ช่วยอะไรดีครับ</div><div class="bubble user">ช่วยสรุปรายงานการประชุมคณะกรรมการบริหาร</div><div class="bubble">ได้ครับ ผมจะสรุปเป็นประเด็นสำคัญ มติที่ประชุม ผู้รับผิดชอบ และงานติดตามให้ทันที</div><div class="chat-input"><input class="input" style="flex:1" placeholder="พิมพ์คำถามหรือวางข้อความที่ต้องการให้ AI ช่วย..." /><button class="btn primary">ส่ง</button></div></div><aside class="stack"><div class="panel"><h3>เครื่องมือ AI ยอดนิยม</h3><div class="grid-2">${prompt("สรุปเอกสาร", "PDF, DOCX, TXT", "245", "📄")}${prompt("แปลภาษา", "ไทย-อังกฤษ", "118", "🌐")}${prompt("วิเคราะห์ข้อมูล", "ตารางและกราฟ", "178", "📊")}${prompt("ตรวจเอกสาร", "ภาษาและรูปแบบ", "96", "✅")}</div></div></aside></section>`,

  "promptlibrary.html": () => `${header("promptlibrary.html")}
    <section class="hero"><h2>ใช้ Prompt ให้เป็น เหมือนมีผู้ช่วยมืออาชีพ</h2><p>คลังคำสั่งสำหรับงานเอกสาร งานข้อมูล งานนำเสนอ งานสื่อสาร และการวางแผนงาน</p></section>
    <section class="grid-4" style="margin-top:14px">${stat("Prompt ทั้งหมด", "128", "📄")}${stat("หมวดหมู่", "10", "🗃")}${stat("ยอดใช้งานรวม", "2,456", "⭐")}${stat("Prompt ของฉัน", "23", "💾")}</section>
    <section class="layout-main" style="margin-top:14px"><div class="panel"><div class="tabs"><button class="tab active">ทั้งหมด</button><button class="tab">งานเอกสาร</button><button class="tab">Excel & Data</button><button class="tab">งานนำเสนอ</button></div><div class="prompt-grid">${prompt("ร่างหนังสือราชการ", "งานเอกสาร", "245", "📃")}${prompt("สรุปรายงานการประชุม", "สรุปและวิเคราะห์", "189", "📊")}${prompt("วิเคราะห์ข้อมูลใน Excel", "Excel & Data", "178", "📗")}${prompt("สร้างสไลด์นำเสนอ", "งานนำเสนอ", "156", "🖼")}${prompt("ร่างอีเมลตอบกลับลูกค้า", "สื่อสารและอีเมล", "143", "✉")}${prompt("จัดทำ To-do List", "จัดการงาน", "98", "✅")}</div></div><aside class="stack"><div class="panel"><h3>Prompt แนะนำ</h3><ul class="list"><li class="row">ตรวจสอบและแก้ไขภาษา</li><li class="row">แปลงข้อมูลเป็นตาราง</li><li class="row">เขียนแผนงาน Timeline</li></ul></div></aside></section>`,

  "community.html": () => `${header("community.html")}
    <section class="hero"><h2>SCI NU Learning Community</h2><p>พื้นที่แลกเปลี่ยนความรู้ ประสบการณ์ และเครื่องมือที่ช่วยให้ทำงานได้ดีขึ้นร่วมกัน</p></section>
    <section class="layout-main" style="margin-top:14px"><div class="panel"><div class="tabs"><button class="tab active">ทั้งหมด</button><button class="tab">ถาม-ตอบ</button><button class="tab">ไอเดีย/แนวทาง</button><button class="tab">ประกาศ</button></div><ul class="list"><li class="row">ใครมีเทคนิคใช้ AI ช่วยสรุปรายงานประชุมบ้างคะ <span>28 ความเห็น</span></li><li class="row">แบ่งปันไฟล์ Template หนังสือราชการที่ใช้บ่อย <span>35 ถูกใจ</span></li><li class="row">แนวทางทำ Dashboard ด้วย Power BI สำหรับงานธุรการ <span>42 ถูกใจ</span></li><li class="row">Workshop การใช้ Canva AI เพื่อสื่อประชาสัมพันธ์ <span>20 ที่นั่ง</span></li></ul></div><aside class="stack"><div class="grid-2">${stat("สมาชิก", "342", "👥")}${stat("การพูดคุย", "1,245", "💬")}${stat("การมีส่วนร่วม", "86%", "❤️")}${stat("ไฟล์เอกสาร", "568", "⬇")}</div><div class="panel"><h3>กลุ่มยอดนิยม</h3><ul class="list"><li class="row">Smart Admin <span class="pill green">เข้าร่วม</span></li><li class="row">Excel & Data Analysis <span class="pill green">เข้าร่วม</span></li><li class="row">AI เพื่อการทำงาน <span class="pill">เข้าร่วม</span></li></ul></div></aside></section>`,

  "workplace.html": () => `${header("workplace.html")}
    <section class="hero"><h2>เครื่องมือที่เชื่อมต่อการทำงานของคุณ</h2><p>รวมระบบสำคัญ เอกสาร ฟอร์ม Template และ workflow ที่ช่วยลดเวลาทำงานซ้ำ</p></section>
    <section class="layout-main" style="margin-top:14px"><div class="stack"><div class="panel"><h3>เครื่องมือสำหรับการทำงาน</h3><div class="tool-grid">${prompt("Google Workspace", "เอกสาร ชีต สไลด์ ไดรฟ์", "เปิดใช้งาน", "G")}${prompt("Microsoft 365", "Word Excel PowerPoint", "เปิดใช้งาน", "M")}${prompt("e-Document", "ระบบเอกสารอิเล็กทรอนิกส์", "เข้าสู่ระบบ", "📁")}${prompt("e-Meeting", "ประชุมและติดตามมติ", "เปิดใช้งาน", "🎥")}${prompt("Data Dashboard", "ติดตามตัวชี้วัด", "ดูแดชบอร์ด", "📊")}${prompt("IT Support", "แจ้งปัญหาระบบ", "แจ้งปัญหา", "🎧")}</div></div><div class="panel"><h3>Workflows ที่ใช้บ่อย</h3><ul class="list"><li class="row">ขั้นตอนการขออนุมัติโครงการ</li><li class="row">ขั้นตอนการเบิกจ่ายงบประมาณ</li><li class="row">ขั้นตอนการจัดซื้อจัดจ้าง</li></ul></div></div><aside class="stack"><div class="panel"><h3>ไฟล์ล่าสุดของคุณ</h3><ul class="list"><li class="row">รายงานการประชุม.xlsx</li><li class="row">หนังสือเชิญประชุม.docx</li><li class="row">สรุปผลการดำเนินงาน.pptx</li></ul></div><div class="panel"><h3>ปฏิทินการทำงาน</h3><ul class="list"><li class="row">09:00 ประชุมคณะกรรมการ</li><li class="row">11:00 ติดตามโครงการ</li><li class="row">13:30 จัดทำรายงานประจำเดือน</li></ul></div></aside></section>`,

  "analytics.html": () => `${header("analytics.html")}
    <section class="grid-5">${stat("ผู้ใช้งานทั้งหมด", "1,245", "👥")}${stat("คอร์สที่เรียนจบ", "356", "📘")}${stat("เวลาเรียนรวม", "1,892", "⏱")}${stat("อัตราเรียนจบ", "78.6%", "✅")}${stat("คะแนนพึงพอใจ", "4.38", "⭐")}</section>
    <section class="layout-main" style="margin-top:14px"><div class="stack"><div class="panel"><div class="panel-head"><h3>แนวโน้มการใช้งานรายสัปดาห์</h3><span class="pill">รายสัปดาห์</span></div><div class="chart-box"><div class="bar" style="height:70%"></div><div class="bar" style="height:78%"></div><div class="bar" style="height:64%"></div><div class="bar" style="height:76%"></div><div class="bar" style="height:58%"></div><div class="bar" style="height:84%"></div><div class="bar" style="height:80%"></div><div class="bar" style="height:69%"></div></div></div><div class="grid-2"><div class="panel"><h3>สัดส่วนหมวดหมู่</h3><div class="donut"></div></div><div class="panel"><h3>การมีส่วนร่วม</h3><ul class="list"><li class="row">Active Users <strong>892</strong></li><li class="row">อ่านบทความ <strong>1,023</strong></li><li class="row">ใช้ Prompt <strong>245</strong></li></ul></div></div></div><aside class="stack"><div class="panel"><h3>คอร์สยอดนิยม</h3><ul class="list"><li class="row">AI เพื่อเอกสาร <strong>4.8</strong></li><li class="row">Excel ขั้นสูง <strong>4.7</strong></li><li class="row">Canva AI <strong>4.6</strong></li></ul></div><div class="panel"><h3>กิจกรรมล่าสุด</h3><ul class="list"><li class="row">สมชายเริ่มเรียน AI</li><li class="row">ปิยดาจบ Excel ขั้นสูง</li><li class="row">วารุณีใช้ Prompt ใหม่</li></ul></div></aside></section>`,

  "portfolio.html": () => `${header("portfolio.html")}
    <section class="hero"><h2>น.ส. วารุณี จันทร์ดี</h2><p>เจ้าหน้าที่บริหารงานทั่วไป | แฟ้มสะสมการเรียนรู้และผลงานด้านทักษะดิจิทัล</p></section>
    <section class="grid-5" style="margin-top:14px">${stat("คอร์สทั้งหมด", "56", "📚")}${stat("คอร์สที่จบแล้ว", "38", "🎓")}${stat("เวลาเรียนสะสม", "124.5", "⏱")}${stat("ใบประกาศ", "27", "🏆")}${stat("คะแนนสะสม", "2,850", "⭐")}</section>
    <section class="grid-3" style="margin-top:14px"><div class="panel"><h3>ความคืบหน้าการเรียนรู้</h3><ul class="list"><li class="row">Excel ขั้นสูง <strong>85%</strong></li><li class="row">Canva AI <strong>60%</strong></li><li class="row">AI เพื่อเอกสาร <strong>45%</strong></li></ul></div><div class="panel"><h3>ใบประกาศล่าสุด</h3><ul class="list"><li class="row">Excel ขั้นสูงเพื่อการทำงาน</li><li class="row">การใช้ AI เพื่อการทำงานเอกสาร</li><li class="row">Power BI สำหรับมือใหม่</li></ul></div><div class="panel"><h3>รางวัลและความสำเร็จ</h3><div class="grid-2">${badge("Fast Learner", "เรียนต่อเนื่อง 14 วัน")}${badge("Top Performer", "คะแนนสูงประจำเดือน", "gold")}</div></div></section>`,

  "badge.html": () => `${header("badge.html")}
    <section class="hero"><h2>ยินดีด้วย คุณอยู่ในระดับ Top Performer</h2><p>คุณอยู่ในกลุ่มผู้เรียนระดับบนขององค์กร และกำลังเข้าใกล้ระดับ Expert</p><div class="progress" style="max-width:620px;margin-top:18px"><span style="width:71%"></span></div></section>
    <section class="layout-main" style="margin-top:14px"><div class="stack"><div class="panel"><div class="panel-head"><h3>Badge ที่ได้รับแล้ว</h3><a class="link">ดูทั้งหมด</a></div><div class="badge-grid">${badge("Fast Learner", "เรียนต่อเนื่อง 14 วัน")}${badge("Top Performer", "คะแนนสะสมครบ 2,500", "gold")}${badge("Goal Achiever", "บรรลุเป้าหมาย 10 ครั้ง", "green")}${badge("Community Contributor", "ช่วยเหลือผู้อื่น 20 ครั้ง")}${badge("Knowledge Seeker", "เรียนครบ 50 คอร์ส")}${badge("AI Explorer", "ใช้ AI Tools 10 ครั้ง")}</div></div><div class="panel"><h3>Badge ที่ยังไม่ได้รับ</h3><div class="badge-grid">${badge("Next Level", "ครบ 5,000 คะแนน")}${badge("Content Creator", "สร้างสื่อ 20 รายการ")}${badge("Mentor", "เป็นพี่เลี้ยง 10 คน")}</div></div></div><aside class="stack"><div class="panel">${stat("ระดับปัจจุบัน", "Top Performer", "⭐")}${stat("คะแนนรวม", "18,450", "📈")}${stat("Badge ที่ได้รับ", "28", "🏅")}</div><div class="panel"><h3>อันดับผู้เรียนประจำเดือน</h3><ul class="list"><li class="row">พรพรรณ คำดี <strong>4,250</strong></li><li class="row">วารุณี จันทร์ดี <strong>2,850</strong></li><li class="row">ธนากร ศรีสมบัติ <strong>2,640</strong></li></ul></div></aside></section>`,

  "settings.html": () => `${header("settings.html")}
    <section class="grid-2"><div class="panel"><h3>เชื่อมต่อ Google Sheet</h3><p class="muted">วาง URL Web App จาก Apps Script เพื่อให้ทุกหน้าดึงข้อมูลจริงจาก Google Sheet</p><form id="settingsForm" class="settings-form"><input id="appsScriptUrl" class="input" placeholder="https://script.google.com/macros/s/.../exec" /><button class="btn primary" type="submit">บันทึกและทดสอบ</button><span id="settingsStatus" class="muted small">ยังไม่ได้ทดสอบการเชื่อมต่อ</span></form></div><div class="panel"><h3>โครงสร้าง Sheet ที่ระบบใช้</h3><ul class="list"><li class="row">users: userId, name, position, progress, score</li><li class="row">courses: courseId, title, status, progress, hours</li><li class="row">prompts: promptId, title, category, uses</li><li class="row">activities: activityId, title, type, date, time</li><li class="row">badges: badgeId, name, description, earnedDate</li></ul></div></section>`,
};

function setAppsScriptUrl(url) {
  APP_CONFIG.appsScriptUrl = url;
  localStorage.setItem("appsScriptUrl", url);
}

function jsonp(url, params = {}) {
  return new Promise((resolve, reject) => {
    const callback = `sciNuCallback_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const query = new URLSearchParams({ ...params, callback }).toString();
    const script = document.createElement("script");
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("ไม่สามารถเชื่อมต่อ Apps Script ได้"));
    }, 10000);

    function cleanup() {
      clearTimeout(timer);
      delete window[callback];
      script.remove();
    }

    window[callback] = (data) => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("Apps Script URL ไม่ถูกต้องหรือยังไม่ได้ Deploy"));
    };

    script.src = `${url}${url.includes("?") ? "&" : "?"}${query}`;
    document.body.appendChild(script);
  });
}

async function loadSheetData(action) {
  if (!APP_CONFIG.appsScriptUrl) return null;
  try {
    const result = await jsonp(APP_CONFIG.appsScriptUrl, { action });
    return result && result.success ? result.data : null;
  } catch (err) {
    console.warn(err.message);
    return null;
  }
}

function setDatePills() {
  document.querySelectorAll("[data-date]").forEach((node) => {
    node.textContent = thaiDate;
  });
}

function bindSettingsForm() {
  const form = document.getElementById("settingsForm");
  if (!form) return;

  const input = document.getElementById("appsScriptUrl");
  const status = document.getElementById("settingsStatus");
  input.value = APP_CONFIG.appsScriptUrl;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setAppsScriptUrl(input.value.trim());
    status.textContent = "บันทึก URL แล้ว กำลังทดสอบการเชื่อมต่อ...";
    const data = await loadSheetData("dashboard");
    status.textContent = data
      ? "เชื่อมต่อ Google Sheet สำเร็จ"
      : "บันทึกแล้ว แต่ยังเชื่อมต่อไม่ได้ โปรดตรวจ URL และสิทธิ์ Web App";
  });
}

function bindDemoHydration() {
  const dashboardKpis = document.querySelectorAll("[data-kpi]");
  if (!dashboardKpis.length) return;

  loadSheetData("dashboard").then((data) => {
    if (!data || !data.stats) return;
    const map = {
      learningCourses: data.stats.learningCourses,
      completedCourses: data.stats.completedCourses,
      progress: `${data.stats.progress || 0}%`,
      score: data.stats.score,
      badges: data.stats.badges,
    };

    dashboardKpis.forEach((node) => {
      const key = node.dataset.kpi;
      if (map[key] !== undefined) node.textContent = map[key];
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const file = window.location.pathname.split("/").pop() || "dashboard.html";
  const renderer = renderers[file];
  const content = document.querySelector(".content");
  if (renderer && content) content.innerHTML = renderer();
  setDatePills();
  bindSettingsForm();
  bindDemoHydration();
});
