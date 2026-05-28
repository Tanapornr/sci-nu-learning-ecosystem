const APP_CONFIG = {
  appsScriptUrl: localStorage.getItem("appsScriptUrl") || "",
  userId: localStorage.getItem("userId") || "NU-001",
};

const AUTH_KEY = "sciNuUser";
const ENROLLMENT_KEY = "sciNuEnrollments";
const CHAT_KEY = "sciNuChat";

const thaiDate = new Intl.DateTimeFormat("th-TH", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date());

const DEFAULT_DATA = {
  users: [
    { id: "NU-001", username: "staff01", password: "", name: "นางสาวสมหญิง รักงาน", department: "งานธุรการ", role: "staff", preScore: 0, postScore: "", progress: 0, accessCount: 0, lastLogin: "", lessonProgress: "", reflection: "", reflectionUpdatedAt: "" },
  ],
  courses: [
    { courseId: "C001", title: "ทักษะดิจิทัลพื้นฐานสำหรับบุคลากรสายสนับสนุน", category: "ทักษะดิจิทัล", status: "เปิดลงทะเบียน", progress: 0, hours: 3, level: "พื้นฐาน", videoId: "aircAruvnKk", videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk" },
    { courseId: "C002", title: "การใช้ Google Workspace เพื่อการทำงานร่วมกัน", category: "เครื่องมือสำนักงาน", status: "เปิดลงทะเบียน", progress: 0, hours: 4, level: "พื้นฐาน" },
    { courseId: "C003", title: "Excel สำหรับงานธุรการและการวิเคราะห์ข้อมูลเบื้องต้น", category: "Data & Excel", status: "เปิดลงทะเบียน", progress: 0, hours: 5, level: "พื้นฐาน" },
    { courseId: "C004", title: "การจัดการเอกสารดิจิทัลและ e-Document", category: "งานเอกสาร", status: "เปิดลงทะเบียน", progress: 0, hours: 3, level: "พื้นฐาน" },
    { courseId: "C005", title: "AI Literacy: เข้าใจ AI และใช้อย่างปลอดภัย", category: "การใช้ AI", status: "เปิดลงทะเบียน", progress: 0, hours: 2, level: "พื้นฐาน", videoId: "aircAruvnKk", videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk" },
    { courseId: "C006", title: "การเขียน Prompt สำหรับงานสำนักงาน", category: "Prompt Engineering", status: "เปิดลงทะเบียน", progress: 0, hours: 3, level: "พื้นฐาน", videoId: "kCc8FmEb1nY", videoUrl: "https://www.youtube.com/watch?v=kCc8FmEb1nY" },
    { courseId: "C007", title: "AI ช่วยสรุปเอกสาร รายงาน และการประชุม", category: "การใช้ AI", status: "เปิดลงทะเบียน", progress: 0, hours: 4, level: "กลาง", videoId: "aircAruvnKk", videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk" },
    { courseId: "C008", title: "การใช้ AI ช่วยร่างหนังสือราชการและอีเมล", category: "งานเอกสาร", status: "เปิดลงทะเบียน", progress: 0, hours: 3, level: "กลาง", videoId: "kCc8FmEb1nY", videoUrl: "https://www.youtube.com/watch?v=kCc8FmEb1nY" },
    { courseId: "C009", title: "การสร้างสื่อประชาสัมพันธ์ด้วย Canva และ AI", category: "สื่อสารองค์กร", status: "เปิดลงทะเบียน", progress: 0, hours: 4, level: "พื้นฐาน" },
    { courseId: "C010", title: "Power BI เบื้องต้นสำหรับ Dashboard งานสนับสนุน", category: "Data Dashboard", status: "เปิดลงทะเบียน", progress: 0, hours: 6, level: "กลาง" },
    { courseId: "C011", title: "Cybersecurity Awareness สำหรับการทำงานประจำวัน", category: "ความปลอดภัยดิจิทัล", status: "เปิดลงทะเบียน", progress: 0, hours: 2, level: "พื้นฐาน" },
    { courseId: "C012", title: "การวางแผนงานและติดตามงานด้วยเครื่องมือดิจิทัล", category: "Productivity", status: "เปิดลงทะเบียน", progress: 0, hours: 3, level: "พื้นฐาน" },
  ],
  prompts: [
    { promptId: "P001", title: "สรุปรายงานการประชุมเป็นมติและงานติดตาม", category: "สรุปเอกสาร", uses: 0 },
    { promptId: "P002", title: "ร่างหนังสือราชการด้วยภาษาสุภาพ", category: "งานเอกสาร", uses: 0 },
    { promptId: "P003", title: "วิเคราะห์ตาราง Excel และสรุป Insight", category: "Excel & Data", uses: 0 },
    { promptId: "P004", title: "สร้างแผนงานรายสัปดาห์สำหรับทีมสนับสนุน", category: "Productivity", uses: 0 },
    { promptId: "P005", title: "ตรวจแก้ภาษาไทยในอีเมลราชการ", category: "สื่อสารองค์กร", uses: 0 },
    { promptId: "P006", title: "ออกแบบโครงสไลด์นำเสนอผลการดำเนินงาน", category: "งานนำเสนอ", uses: 0 },
  ],
  activities: [
    { activityId: "A001", title: "ปฐมนิเทศระบบ SCI NU Learning Ecosystem", type: "ออนไลน์", date: "กำหนดภายหลัง", time: "09:00 - 10:00" },
    { activityId: "A002", title: "Workshop: AI Literacy สำหรับงานสนับสนุน", type: "อบรม", date: "กำหนดภายหลัง", time: "13:30 - 15:30" },
    { activityId: "A003", title: "Clinic: ถามตอบการใช้ Google Sheet เป็นฐานข้อมูล", type: "ถามตอบ", date: "กำหนดภายหลัง", time: "10:00 - 11:00" },
  ],
  badges: [
    { badgeId: "B001", name: "Digital Starter", description: "เริ่มเรียนคอร์สทักษะดิจิทัลคอร์สแรก", status: "ยังไม่ได้รับ", earnedDate: "" },
    { badgeId: "B002", name: "AI Explorer", description: "เรียนรู้คอร์ส AI Literacy สำเร็จ", status: "ยังไม่ได้รับ", earnedDate: "" },
    { badgeId: "B003", name: "Prompt Beginner", description: "ผ่านคอร์สการเขียน Prompt สำหรับงานสำนักงาน", status: "ยังไม่ได้รับ", earnedDate: "" },
    { badgeId: "B004", name: "Data Ready", description: "เรียนคอร์ส Excel หรือ Dashboard สำเร็จ", status: "ยังไม่ได้รับ", earnedDate: "" },
    { badgeId: "B005", name: "Work Smart", description: "เรียนครบ 3 คอร์สในหมวด Productivity หรือเครื่องมือสำนักงาน", status: "ยังไม่ได้รับ", earnedDate: "" },
    { badgeId: "B006", name: "Support Innovator", description: "ส่งผลงานประยุกต์ใช้ AI กับงานจริง", status: "ยังไม่ได้รับ", earnedDate: "" },
  ],
  community: [
    { postId: "CM001", title: "เริ่มต้นใช้ AI กับงานเอกสารอย่างไรให้ปลอดภัย", type: "แนวทาง", author: "ทีมพัฒนาระบบ", createdAt: "พร้อมใช้งาน" },
    { postId: "CM002", title: "แบ่งปัน Prompt สำหรับสรุปรายงานประชุม", type: "Prompt", author: "ทีมพัฒนาระบบ", createdAt: "พร้อมใช้งาน" },
    { postId: "CM003", title: "ถามตอบการจัดข้อมูลใน Google Sheet เพื่อทำ Dashboard", type: "ถามตอบ", author: "ทีมพัฒนาระบบ", createdAt: "พร้อมใช้งาน" },
  ],
  tools: [
    { toolId: "T001", title: "Google Workspace", category: "เอกสารและการทำงานร่วมกัน", uses: 0, url: "#" },
    { toolId: "T002", title: "Microsoft 365", category: "เอกสาร ตาราง และงานนำเสนอ", uses: 0, url: "#" },
    { toolId: "T003", title: "Google Sheet Database", category: "ฐานข้อมูลเบื้องต้น", uses: 0, url: "#" },
    { toolId: "T004", title: "AI Assistant", category: "ผู้ช่วยงานเอกสารและข้อมูล", uses: 0, url: "aiasistant.html" },
    { toolId: "T005", title: "Prompt Library", category: "คลังคำสั่ง AI", uses: 0, url: "promptlibrary.html" },
    { toolId: "T006", title: "Dashboard Template", category: "ติดตามงานและรายงานผล", uses: 0, url: "#" },
  ],
};

let appData = structuredClone(DEFAULT_DATA);

const COURSE_LESSONS = {
  C001: [
    { title: "Digital Literacy คืออะไร", duration: "12 นาที", query: "ทักษะดิจิทัลพื้นฐาน สำหรับการทำงาน" },
    { title: "การจัดการไฟล์และข้อมูลอย่างเป็นระบบ", duration: "18 นาที", query: "การจัดการไฟล์ Google Drive สำหรับทำงาน" },
    { title: "แบบทดสอบหลังเรียน", duration: "5 นาที", query: "digital literacy quiz thai" },
  ],
  C002: [
    { title: "Google Drive และ Docs สำหรับทีม", duration: "20 นาที", query: "Google Workspace สอนใช้งาน ภาษาไทย" },
    { title: "Google Sheet สำหรับงานติดตาม", duration: "22 นาที", query: "สอน Google Sheets พื้นฐาน ภาษาไทย" },
  ],
  C003: [
    { title: "Excel พื้นฐานสำหรับงานธุรการ", duration: "25 นาที", query: "Excel พื้นฐาน งานธุรการ ภาษาไทย" },
    { title: "PivotTable และการสรุปข้อมูล", duration: "30 นาที", query: "สอน PivotTable Excel ภาษาไทย" },
  ],
  C004: [
    { title: "หลักการจัดเอกสารดิจิทัล", duration: "15 นาที", query: "การจัดการเอกสารดิจิทัล" },
    { title: "Workflow e-Document", duration: "18 นาที", query: "ระบบ e document การทำงานเอกสาร" },
  ],
  C005: [
    { title: "AI Literacy สำหรับผู้เริ่มต้น", duration: "20 นาที", query: "AI Literacy ภาษาไทย" },
    { title: "ข้อควรระวังและจริยธรรมการใช้ AI", duration: "18 นาที", query: "จริยธรรมการใช้ AI ภาษาไทย" },
  ],
  C006: [
    { title: "โครงสร้าง Prompt ที่ดี", duration: "18 นาที", query: "Prompt Engineering ภาษาไทย" },
    { title: "Prompt สำหรับงานสำนักงาน", duration: "20 นาที", query: "เขียน prompt สำหรับงานเอกสาร" },
  ],
};

const pageMeta = {
  "dashboard.html": ["Dashboard", "ภาพรวมการเรียนรู้ ทักษะงาน และการใช้ AI ของคุณ"],
  "mylearning.html": ["My Learning", "พื้นที่ติดตามคอร์ส บทเรียน และเส้นทางการเรียนรู้ส่วนตัว"],
  "courses.html": ["Courses", "คลังคอร์สสำหรับพัฒนาทักษะดิจิทัล การทำงาน และการใช้ AI"],
  "aiasistant.html": ["AI Assistant", "ผู้ช่วยอัจฉริยะสำหรับงานเอกสาร ข้อมูล และการเรียนรู้"],
  "promptlibrary.html": ["Prompt Library", "คลังคำสั่ง Prompt สำหรับงานสำนักงานและการเรียนรู้ด้วย AI"],
  "community.html": ["Community", "ชุมชนแลกเปลี่ยนความรู้ของบุคลากรสายสนับสนุน"],
  "workplace.html": ["Workplace Tools", "เครื่องมือและระบบสนับสนุนงานประจำวัน"],
  "analytics.html": ["Analytics", "วิเคราะห์ข้อมูลการเรียนรู้ การใช้งาน และผลลัพธ์ของระบบ"],
  "portfolio.html": ["My Portfolio", "แฟ้มสะสมการเรียนรู้ ความสำเร็จ และผลงานของคุณ"],
  "badge.html": ["Badge & Achievement", "สะสมความสำเร็จและติดตามเป้าหมายการพัฒนา"],
  "settings.html": ["Settings", "ตั้งค่าระบบและการเชื่อมต่อ Google Sheet"],
};

const statusDone = "เรียนจบแล้ว";
const statusLearning = "กำลังเรียน";

function currentUser() {
  const sessionUser = JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
  return sessionUser || appData.users.find((user) => (user.id || user.userId) === APP_CONFIG.userId) || DEFAULT_DATA.users[0];
}

function storedEnrollments() {
  return JSON.parse(localStorage.getItem(ENROLLMENT_KEY) || "[]");
}

function saveEnrollments(items) {
  localStorage.setItem(ENROLLMENT_KEY, JSON.stringify(items));
}

function numberValue(value) {
  const parsed = Number(String(value || "0").replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function catalogCourses() {
  return appData.courses.filter((course) => !course.userId);
}

function userEnrollments() {
  const remote = appData.courses.filter((course) => course.userId === APP_CONFIG.userId);
  const local = storedEnrollments();
  const byId = new Map([...remote, ...local].map((course) => [course.courseId, course]));
  return [...byId.values()];
}

function stats() {
  const enrollments = userEnrollments();
  const completed = enrollments.filter((course) => course.status === statusDone);
  const learning = enrollments.filter((course) => course.status === statusLearning);
  const earnedBadges = appData.badges.filter((badge) => badge.earnedDate || badge.status === "ได้รับแล้ว");

  return {
    totalCourses: catalogCourses().length,
    learningCourses: learning.length,
    completedCourses: completed.length,
    notStartedCourses: catalogCourses().length,
    hours: completed.reduce((sum, course) => sum + numberValue(course.hours), 0),
    progress: enrollments.length ? Math.round((completed.length / enrollments.length) * 100) : 0,
    score: numberValue(currentUser().postScore || currentUser().preScore || currentUser().score),
    badges: earnedBadges.length,
    prompts: appData.prompts.length,
    promptUses: appData.prompts.reduce((sum, item) => sum + numberValue(item.uses), 0),
    communityPosts: appData.community.length,
    activities: appData.activities.length,
  };
}

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
    const result = await jsonp(APP_CONFIG.appsScriptUrl, { action, userId: APP_CONFIG.userId });
    return result && result.success ? result.data : null;
  } catch (err) {
    console.warn(err.message);
    return null;
  }
}

function sendSheetAction(action, params = {}) {
  if (!APP_CONFIG.appsScriptUrl) return;
  jsonp(APP_CONFIG.appsScriptUrl, { action, userId: APP_CONFIG.userId, ...params }).catch((err) => {
    console.warn(err.message);
  });
}

async function setupSheetDatabase() {
  if (!APP_CONFIG.appsScriptUrl) {
    alert("กรุณาวาง Apps Script Web App URL ก่อน");
    return;
  }
  const result = await jsonp(APP_CONFIG.appsScriptUrl, { action: "setup" });
  alert(result && result.success ? "สร้างข้อมูล Google Sheet เรียบร้อยแล้ว" : "สร้างข้อมูลไม่สำเร็จ โปรดตรวจสิทธิ์ Apps Script");
  window.location.reload();
}

function withDefaults(data) {
  if (!data) return structuredClone(DEFAULT_DATA);
  return {
    users: data.users && data.users.length ? data.users : structuredClone(DEFAULT_DATA.users),
    courses: data.courses && data.courses.length ? data.courses : structuredClone(DEFAULT_DATA.courses),
    prompts: data.prompts && data.prompts.length ? data.prompts : structuredClone(DEFAULT_DATA.prompts),
    activities: data.activities && data.activities.length ? data.activities : structuredClone(DEFAULT_DATA.activities),
    badges: data.badges && data.badges.length ? data.badges : structuredClone(DEFAULT_DATA.badges),
    community: data.community && data.community.length ? data.community : structuredClone(DEFAULT_DATA.community),
    tools: data.tools && data.tools.length ? data.tools : structuredClone(DEFAULT_DATA.tools),
  };
}

async function hydrateData() {
  appData = withDefaults(await loadSheetData("all"));
}

function header(file) {
  const [title, subtitle] = pageMeta[file] || pageMeta["dashboard.html"];
  return `<div class="topbar"><div><h1 class="page-title">${title}</h1><span class="page-subtitle">${subtitle}</span></div><div class="top-actions"><input class="search" placeholder="ค้นหา..." /><span class="date-pill">📅 <span data-date>${thaiDate}</span></span></div></div>`;
}

function stat(label, value, icon) {
  return `<div class="card kpi"><div class="kpi-icon">${icon}</div><div><span class="muted small">${label}</span><strong>${value}</strong></div></div>`;
}

function emptyState(title, text) {
  return `<div class="empty-state"><strong>${title}</strong><span>${text}</span></div>`;
}

function panel(title, body, link) {
  const action = link ? `<a class="link" href="${link.href}">${link.label}</a>` : "";
  return `<div class="panel"><div class="panel-head"><h3>${title}</h3>${action}</div>${body}</div>`;
}

function progressBar(value) {
  return `<div class="progress"><span style="width:${Math.max(0, Math.min(100, numberValue(value)))}%"></span></div>`;
}

function courseCard(course, showAction = false) {
  const progress = numberValue(course.progress);
  const status = course.userId ? course.status || "ยังไม่เริ่ม" : course.status || "เปิดลงทะเบียน";
  const tone = status === statusDone ? "green" : status === statusLearning ? "blue" : "amber";
  const action = showAction
    ? `<button class="btn primary" type="button" data-start-course="${course.courseId}">เริ่มเรียน</button>`
    : `<a class="btn" href="learn.html?course=${course.courseId}">ไปเรียน</a>`;
  return `<div class="card course-card"><div class="row-main"><div class="thumb">📘</div><div><h4>${course.title || "ไม่มีชื่อคอร์ส"}</h4><span class="pill ${tone}">${status}</span></div></div>${progressBar(progress)}<div class="row"><span class="muted small">${course.category || "ทั่วไป"} | ${course.level || "พื้นฐาน"} | ${course.hours || 0} ชม.</span><strong>${progress}%</strong></div>${action}</div>`;
}

function promptCard(item) {
  return `<div class="card prompt-card"><div class="circle">✦</div><h4>${item.title || "ไม่มีชื่อ Prompt"}</h4><p class="muted small">${item.category || "ทั่วไป"}</p><div class="row"><span class="muted small">ใช้งานแล้ว</span><strong>${numberValue(item.uses)} ครั้ง</strong></div></div>`;
}

function badgeCard(item, locked = false) {
  return `<div class="card badge-card"><div class="kpi-icon">${locked ? "🔒" : "🏅"}</div><h4>${item.name || "Badge"}</h4><p class="muted small">${item.description || "ยังไม่มีรายละเอียด"}</p></div>`;
}

function listRows(items, emptyTitle, emptyText, render) {
  if (!items.length) return emptyState(emptyTitle, emptyText);
  return `<ul class="list">${items.map(render).join("")}</ul>`;
}

function courseGrid(courses, emptyTitle, emptyText, showAction = false) {
  if (!courses.length) return emptyState(emptyTitle, emptyText);
  return `<div class="course-grid">${courses.map((course) => courseCard(course, showAction)).join("")}</div>`;
}

function promptGrid(items, emptyTitle, emptyText) {
  if (!items.length) return emptyState(emptyTitle, emptyText);
  return `<div class="prompt-grid">${items.map(promptCard).join("")}</div>`;
}

function badgeGrid(items, emptyTitle, emptyText, locked = false) {
  if (!items.length) return emptyState(emptyTitle, emptyText);
  return `<div class="badge-grid">${items.map((item) => badgeCard(item, locked)).join("")}</div>`;
}

function zeroChart() {
  return `<div class="chart-box">${Array.from({ length: 8 }, () => `<div class="bar zero" style="height:0%"></div>`).join("")}</div>`;
}

function categoryRows() {
  const counts = catalogCourses().reduce((map, course) => {
    const category = course.category || "ทั่วไป";
    map[category] = (map[category] || 0) + 1;
    return map;
  }, {});
  return Object.entries(counts).map(([category, count]) => ({ category, count }));
}

function renderDashboard() {
  const s = stats();
  const learning = userEnrollments().filter((course) => course.status === statusLearning);
  const earnedBadges = appData.badges.filter((badge) => badge.earnedDate || badge.status === "ได้รับแล้ว");
  return `${header("dashboard.html")}
    <section class="grid-5">
      ${stat("คอร์สที่กำลังเรียน", s.learningCourses, "📚")}
      ${stat("ชั่วโมงเรียนสะสม", s.hours, "⏱")}
      ${stat("ความก้าวหน้า", `${s.progress}%`, "✅")}
      ${stat("Badge ที่ได้รับ", s.badges, "🏅")}
      ${stat("คะแนนรวม", s.score, "👥")}
    </section>
    <section class="layout-main" style="margin-top:14px">
      <div class="stack">
        ${panel("คอร์สที่กำลังเรียน", courseGrid(learning, "ยังไม่มีคอร์สที่กำลังเรียน", "เลือกคอร์สจากหน้า Courses เพื่อเริ่มเรียนและสะสมความก้าวหน้า"), { href: "courses.html", label: "เลือกคอร์ส" })}
        <div class="grid-2">
          ${panel("ความก้าวหน้ารายเดือน", zeroChart())}
          ${panel("Badge ล่าสุด", badgeGrid(earnedBadges, "ยังไม่ได้รับ Badge", "เมื่อเรียนสำเร็จหรือทำกิจกรรมครบเงื่อนไข Badge จะแสดงที่นี่"), { href: "badge.html", label: "ดูทั้งหมด" })}
        </div>
      </div>
      <aside class="stack">
        ${panel("ปฏิทินการเรียนรู้", listRows(appData.activities, "ยังไม่มีกิจกรรม", "เมื่อมีตารางอบรมหรือกิจกรรม ระบบจะแสดงที่นี่", (item) => `<li class="row"><span>${item.title}</span><span class="pill">${item.time}</span></li>`))}
        ${panel("คอร์สแนะนำสำหรับเริ่มต้น", courseGrid(catalogCourses().slice(0, 2), "ยังไม่มีคอร์สแนะนำ", "เพิ่มคอร์สในชีต courses เพื่อแสดงรายการ", true))}
      </aside>
    </section>`;
}

function learningFlow() {
  const steps = [
    {
      phase: "1",
      title: "ก่อนเรียน",
      items: ["Pre-test Digital Skills", "AI Readiness Check", "วิเคราะห์ Pain Point"],
      note: "สำรวจระดับเริ่มต้นและปัญหางานจริงของผู้เรียน",
    },
    {
      phase: "2",
      title: "ระหว่างเรียน",
      items: ["Workshop ใช้ AI", "Collaborative Tasks", "ทำ Project จากงานจริง"],
      note: "ฝึกใช้เครื่องมือกับงานสนับสนุนที่ทำอยู่จริง",
    },
    {
      phase: "3",
      title: "หลังเรียน",
      items: ["Reflection", "แชร์ Best Practice", "AI-assisted Feedback"],
      note: "สะท้อนผลลัพธ์และรับข้อเสนอแนะเพื่อปรับปรุงงาน",
    },
    {
      phase: "4",
      title: "การเรียนรู้นอกห้องเรียน",
      items: ["Community Line/OpenChat", "Microlearning", "Prompt Sharing"],
      note: "ต่อยอดผ่านชุมชนและการเรียนรู้สั้น ๆ ต่อเนื่อง",
    },
    {
      phase: "5",
      title: "Lifelong Learning Extension",
      items: ["AI Skill Pathway", "Learning Portfolio", "Learning Analytics Dashboard"],
      note: "เก็บหลักฐานผลงานและวางเส้นทางทักษะระยะยาว",
    },
  ];
  return `<div class="journey-flow">${steps.map((step) => `<article class="journey-step"><div class="journey-index">${step.phase}</div><div><h4>${step.title}</h4><ul class="journey-items">${step.items.map((item) => `<li>${item}</li>`).join("")}</ul><p class="muted small">${step.note}</p></div><span class="pill">0%</span></article>`).join("")}</div>`;
}

function renderMyLearning() {
  const enrollments = userEnrollments();
  return `${header("mylearning.html")}
    <div class="tabs"><button class="tab active">คอร์สของฉัน</button><button class="tab">บทเรียนที่กำลังเรียน</button><button class="tab">ประวัติการเรียน</button><button class="tab">Wishlist</button></div>
    ${panel("Learning Journey สำคัญของระบบ", learningFlow())}
    <section class="layout-main">
      ${panel("คอร์สของฉัน", courseGrid(enrollments, "ยังไม่ได้เริ่มเรียน", "เมื่อกดเริ่มเรียนคอร์ส รายการและความก้าวหน้าจะมาแสดงที่นี่"))}
      <aside class="stack">
        ${panel("สถานะ Learning Flow", `<ul class="list"><li class="row">ก่อนเรียน <span class="pill">รอเริ่ม</span></li><li class="row">ระหว่างเรียน <span class="pill">รอเริ่ม</span></li><li class="row">หลังเรียน <span class="pill">รอเริ่ม</span></li><li class="row">Lifelong Learning <span class="pill">รอเริ่ม</span></li></ul>`)}
        <div class="grid-2">${stat("โน้ตของฉัน", 0, "📝")}${stat("ใบประกาศ", 0, "🏆")}</div>
      </aside>
    </section>`;
}

function renderCourses() {
  const s = stats();
  return `${header("courses.html")}
    <div class="tabs"><button class="tab active">ทั้งหมด</button><button class="tab">ทักษะดิจิทัล</button><button class="tab">การใช้ AI</button><button class="tab">Data & Excel</button><button class="tab">งานเอกสาร</button></div>
    <section class="grid-4">${stat("คอร์สทั้งหมด", s.totalCourses, "📚")}${stat("กำลังเรียน", s.learningCourses, "▶")}${stat("ยังไม่เริ่ม", s.totalCourses, "⏳")}${stat("เรียนจบแล้ว", s.completedCourses, "✓")}</section>
    <section class="layout-main" style="margin-top:14px">
      ${panel("คอร์สทั้งหมด", courseGrid(catalogCourses(), "ยังไม่มีคอร์สในระบบ", "เพิ่มข้อมูลในชีต courses แล้วระบบจะแสดงคอร์สจริงที่นี่", true))}
      <aside class="stack">
        ${panel("หมวดหมู่คอร์ส", listRows(categoryRows(), "ยังไม่มีหมวดหมู่", "หมวดหมู่จะคำนวณจากข้อมูลคอร์สจริง", (item) => `<li class="row">${item.category}<strong>${item.count}</strong></li>`))}
        ${panel("สถานะการเรียนของคุณ", `<ul class="list"><li class="row">คอร์สที่เริ่มเรียน <strong>0</strong></li><li class="row">ชั่วโมงเรียนสะสม <strong>0</strong></li><li class="row">คอร์สที่เรียนจบ <strong>0</strong></li></ul>`)}
      </aside>
    </section>`;
}

function renderAiAssistant() {
  return `${header("aiasistant.html")}
    <section class="hero"><h2>SCI NU AI Assistant</h2><p>พร้อมช่วยงานเอกสาร สรุปข้อมูล ร่างข้อความ และออกแบบ Prompt สำหรับงานสนับสนุน โดยไม่บันทึกเป็นความก้าวหน้าการเรียนจนกว่าคุณจะเริ่มคอร์สจริง</p></section>
    <section class="layout-main" style="margin-top:14px">
      <div class="panel chat"><div id="chatMessages" class="chat-messages"></div><form id="aiChatForm" class="chat-input"><input id="aiChatInput" class="input" style="flex:1" placeholder="พิมพ์คำถามหรือวางข้อความที่ต้องการให้ AI ช่วย..." /><button class="btn primary" type="submit">ส่ง</button></form></div>
      <aside class="stack">${panel("เครื่องมือ AI และ Prompt แนะนำ", promptGrid(appData.prompts, "ยังไม่มี Prompt/เครื่องมือที่บันทึกไว้", "เพิ่มข้อมูลในชีต prompts เพื่อแสดงเครื่องมือหรือ Prompt ที่องค์กรอนุมัติ"))}</aside>
    </section>`;
}

function renderPromptLibrary() {
  const s = stats();
  return `${header("promptlibrary.html")}
    <section class="grid-4">${stat("Prompt ทั้งหมด", s.prompts, "📄")}${stat("หมวดหมู่", new Set(appData.prompts.map((p) => p.category).filter(Boolean)).size, "🗃")}${stat("ยอดใช้งานรวม", s.promptUses, "⭐")}${stat("Prompt ของฉัน", 0, "💾")}</section>
    <section class="layout-main" style="margin-top:14px">
      ${panel("Prompt Library", promptGrid(appData.prompts, "ยังไม่มี Prompt ในระบบ", "เพิ่มรายการในชีต prompts เพื่อให้ผู้ใช้เลือกนำไปใช้ได้จริง"))}
      <aside>${panel("คลังของฉัน", emptyState("ยังไม่มี Prompt ส่วนตัว", "เมื่อผู้ใช้บันทึก Prompt ส่วนตัว รายการจะแสดงที่นี่"))}</aside>
    </section>`;
}

function renderCommunity() {
  const s = stats();
  return `${header("community.html")}
    <section class="grid-4">${stat("สมาชิก", appData.users.length, "👥")}${stat("กระทู้", s.communityPosts, "💬")}${stat("การมีส่วนร่วมของคุณ", "0%", "❤️")}${stat("ไฟล์เอกสารของคุณ", 0, "⬇")}</section>
    <section class="layout-main" style="margin-top:14px">
      ${panel("กระทู้ชุมชน", listRows(appData.community, "ยังไม่มีกระทู้", "เมื่อมีการตั้งคำถามหรือแบ่งปันความรู้ รายการจะแสดงที่นี่", (item) => `<li class="row"><span>${item.title}</span><span>${item.type}</span></li>`))}
      <aside>${panel("กิจกรรมใกล้เคียง", listRows(appData.activities, "ยังไม่มีกิจกรรม", "เพิ่มข้อมูลในชีต activities เพื่อแสดงกำหนดการจริง", (item) => `<li class="row"><span>${item.title}</span><span>${item.date}</span></li>`))}</aside>
    </section>`;
}

function renderWorkplace() {
  return `${header("workplace.html")}
    <section class="layout-main">
      ${panel("เครื่องมือสำหรับการทำงาน", promptGrid(appData.tools, "ยังไม่มีเครื่องมือในระบบ", "เพิ่มรายการในชีต tools เช่น Google Workspace, e-Document, e-Meeting เพื่อให้ผู้ใช้เปิดใช้งานได้"))}
      <aside>${panel("ไฟล์ล่าสุดของคุณ", emptyState("ยังไม่มีไฟล์ล่าสุด", "เมื่อเชื่อมต่อระบบเอกสารหรือบันทึกลิงก์ไฟล์ รายการจะแสดงที่นี่"))}</aside>
    </section>`;
}

function renderAnalytics() {
  const s = stats();
  return `${header("analytics.html")}
    <section class="grid-5">${stat("ผู้ใช้งานทั้งหมด", appData.users.length, "👥")}${stat("คอร์สในระบบ", s.totalCourses, "📘")}${stat("คอร์สที่เรียนจบ", s.completedCourses, "✓")}${stat("อัตราเรียนจบ", `${s.progress}%`, "✅")}${stat("คะแนนพึงพอใจ", "0 / 5", "⭐")}</section>
    <section class="layout-main" style="margin-top:14px">
      <div class="stack">${panel("แนวโน้มการใช้งานรายสัปดาห์", zeroChart())}${panel("การมีส่วนร่วมของผู้เรียน", `<ul class="list"><li class="row">Active Users <strong>0</strong></li><li class="row">เริ่มเรียนคอร์ส <strong>0</strong></li><li class="row">ใช้ Prompt <strong>${s.promptUses}</strong></li></ul>`)}</div>
      <aside>${panel("กิจกรรมล่าสุด", listRows(appData.activities, "ยังไม่มีกิจกรรมล่าสุด", "ข้อมูลจะเริ่มสะสมเมื่อผู้ใช้เริ่มเรียนและทำกิจกรรม", (item) => `<li class="row"><span>${item.title}</span><span>${item.time}</span></li>`))}</aside>
    </section>`;
}

function renderPortfolio() {
  const user = currentUser();
  const s = stats();
  return `${header("portfolio.html")}
    <section class="hero"><h2>${user.name}</h2><p>${user.position || "บุคลากรสายสนับสนุน"} | แฟ้มสะสมการเรียนรู้จะเริ่มนับจากกิจกรรมจริงเท่านั้น</p></section>
    <section class="grid-5" style="margin-top:14px">${stat("คอร์สที่เริ่มเรียน", s.learningCourses, "📚")}${stat("คอร์สที่จบแล้ว", s.completedCourses, "🎓")}${stat("เวลาเรียนสะสม", s.hours, "⏱")}${stat("ใบประกาศ", 0, "🏆")}${stat("คะแนนสะสม", s.score, "⭐")}</section>
    <section class="grid-3" style="margin-top:14px">${panel("ความคืบหน้าการเรียนรู้", courseGrid(userEnrollments(), "ยังไม่มีความคืบหน้า", "เมื่อเริ่มเรียนคอร์ส ความคืบหน้าจะปรากฏที่นี่"))}${panel("ใบประกาศล่าสุด", emptyState("ยังไม่มีใบประกาศ", "เมื่อเรียนจบและผ่านเงื่อนไข ใบประกาศจะแสดงที่นี่"))}${panel("รางวัลและความสำเร็จ", badgeGrid(appData.badges.filter((b) => b.earnedDate), "ยังไม่มีรางวัล", "เริ่มเรียนและทำกิจกรรมเพื่อสะสมความสำเร็จ"))}</section>`;
}

function renderBadge() {
  const earned = appData.badges.filter((item) => item.earnedDate || item.status === "ได้รับแล้ว");
  const locked = appData.badges.filter((item) => !item.earnedDate && item.status !== "ได้รับแล้ว");
  return `${header("badge.html")}
    <section class="hero"><h2>เริ่มต้นสะสม Badge</h2><p>ระบบมี Badge เป้าหมายพร้อมแล้ว แต่ตอนนี้ยังไม่ได้รับ Badge เพราะยังไม่ได้เรียนหรือทำกิจกรรมสำเร็จ ความก้าวหน้าทุกอย่างเริ่มจาก 0</p>${progressBar(0)}</section>
    <section class="layout-main" style="margin-top:14px">
      <div class="stack">${panel("Badge ที่ได้รับแล้ว", badgeGrid(earned, "ยังไม่ได้รับ Badge", "เมื่อทำเงื่อนไขสำเร็จ Badge จะแสดงที่นี่"))}${panel("Badge เป้าหมาย", badgeGrid(locked, "ยังไม่มีรายการ Badge", "เพิ่มเงื่อนไข Badge ในชีต badges เพื่อใช้เป็นเป้าหมาย", true))}</div>
      <aside>${panel("สถานะปัจจุบัน", `${stat("ระดับปัจจุบัน", "Beginner", "⭐")}${stat("คะแนนรวม", 0, "📈")}${stat("Badge ที่ได้รับ", earned.length, "🏅")}`)}</aside>
    </section>`;
}

function renderSettings() {
  return `${header("settings.html")}
    <section class="grid-2">
      <div class="panel"><h3>ตั้งค่าหลังบ้าน Google Sheet สำหรับผู้ดูแลระบบ</h3><p class="muted">ส่วนนี้ทำครั้งเดียวหลัง Deploy Apps Script เพื่อให้ระบบอ่านและบันทึกข้อมูลจริง เช่น คอร์ส การเข้าสู่ระบบ การเริ่มเรียน ความก้าวหน้า และประวัติสนทนา AI ผู้เรียนทั่วไปไม่ต้องตั้งค่านี้</p><p class="muted small">ถ้า Apps Script ไม่ได้สร้างจาก Google Sheet โดยตรง ให้ใส่ Google Sheet ID ในตัวแปร SPREADSHEET_ID ของไฟล์ code.gs ก่อน Deploy</p><form id="settingsForm" class="settings-form"><input id="appsScriptUrl" class="input" placeholder="https://script.google.com/macros/s/.../exec" /><button class="btn primary" type="submit">เชื่อมต่อหลังบ้าน</button><button class="btn" type="button" id="setupSheetButton">สร้างตารางและข้อมูลตั้งต้น</button><span id="settingsStatus" class="muted small">ยังไม่ได้ทดสอบการเชื่อมต่อหลังบ้าน</span></form></div>
      <div class="panel"><h3>ข้อมูลที่เก็บใน Google Sheet</h3><ul class="list"><li class="row">รายชื่อผู้เรียนและ Login logs <strong>users</strong></li><li class="row">คลังคอร์ส วิดีโอ และบทเรียน <strong>courses</strong></li><li class="row">ความก้าวหน้าเริ่มที่ <strong>0%</strong></li><li class="row">ประวัติสนทนา AI <strong>chat_logs</strong></li><li class="row">Prompt / Community / Badge <strong>พร้อมใช้</strong></li><li class="row">จำนวนคอร์สตั้งต้น <strong>${catalogCourses().length}</strong></li></ul></div>
    </section>`;
}

function renderLogin() {
  return `<main class="login-page"><section class="login-card"><div class="brand login-brand"><span class="brand-mark">AI</span><div>SCI NU<small>Learning Ecosystem</small></div></div><h1>เข้าสู่ระบบการเรียนรู้</h1><p class="muted">เข้าสู่ระบบด้วยบัญชีบุคลากร เพื่อบันทึกความก้าวหน้าและกิจกรรมการเรียนรู้ได้ถูกคน</p><form id="loginForm" class="settings-form"><input id="loginUsername" class="input" placeholder="Username เช่น staff01" autocomplete="username" required /><input id="loginPassword" class="input" type="password" placeholder="Password เช่น 1234" autocomplete="current-password" /><button class="btn primary" type="submit">เข้าสู่ระบบ</button><span id="loginStatus" class="muted small">ตัวอย่าง: staff02-staff80 ใช้รหัสผ่าน 1234, admin01 ใช้ admin123, boss01 ใช้ boss123</span></form></section></main>`;
}

function renderLearn() {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("course");
  const enrollment = userEnrollments().find((item) => item.courseId === courseId);
  const course = enrollment || catalogCourses().find((item) => item.courseId === courseId) || catalogCourses()[0];
  const lessons = COURSE_LESSONS[course.courseId] || [
    { title: `บทนำ: ${course.title}`, duration: "15 นาที", query: `${course.title} ภาษาไทย` },
    { title: "แนวทางประยุกต์ใช้กับงานจริง", duration: "20 นาที", query: `${course.category} สำหรับการทำงาน` },
  ];
  const video = course.videoId
    ? `<div class="video-frame"><iframe title="learning video" src="https://www.youtube.com/embed/${course.videoId}?rel=0" allowfullscreen></iframe></div>`
    : `<div class="video-resource"><h3>วิดีโอเรียนรู้จาก YouTube</h3><p class="muted">คอร์สนี้ยังไม่ได้กำหนด videoId สำหรับฝังวิดีโอโดยตรง กดปุ่มด้านล่างเพื่อเปิดรายการวิดีโอที่ตรงกับเนื้อหา</p><a class="btn primary" target="_blank" rel="noopener" href="${course.videoUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(course.title)}`}">เปิดวิดีโอ YouTube</a></div>`;
  return `${header("learn.html")}
    <section class="layout-main">
      <div class="stack">
        <div class="panel"><div class="panel-head"><h3>${course.title}</h3><span class="pill">${course.progress || 0}%</span></div>${video}<p class="muted">ข้อมูลวิดีโอเก็บในคอลัมน์ videoId และ videoUrl ของ Google Sheet เพื่อให้อาจารย์ตรวจหลังบ้านได้</p></div>
        ${panel("บทเรียน", `<ul class="list">${lessons.map((lesson, index) => `<li class="row"><span>${index + 1}. ${lesson.title}</span><span class="pill">${lesson.duration}</span></li>`).join("")}</ul>`)}
      </div>
      <aside class="stack">${panel("ความก้าวหน้าคอร์สนี้", `${progressBar(course.progress || 0)}<p class="muted">กดปุ่มด้านล่างเพื่อจำลองการเรียนจบบทเรียน ระบบจะบันทึกในเครื่องผู้ใช้ทันที</p><button class="btn primary" type="button" data-complete-lesson="${course.courseId}">เรียนจบบทเรียนนี้</button>`)}${panel("เครื่องมือช่วยเรียน", `<a class="btn" href="aiasistant.html">ถาม AI Assistant</a><a class="btn" href="mylearning.html">กลับไปคอร์สของฉัน</a>`)}</aside>
    </section>`;
}

const renderers = {
  "login.html": renderLogin,
  "learn.html": renderLearn,
  "dashboard.html": renderDashboard,
  "mylearning.html": renderMyLearning,
  "courses.html": renderCourses,
  "aiasistant.html": renderAiAssistant,
  "promptlibrary.html": renderPromptLibrary,
  "community.html": renderCommunity,
  "workplace.html": renderWorkplace,
  "analytics.html": renderAnalytics,
  "portfolio.html": renderPortfolio,
  "badge.html": renderBadge,
  "settings.html": renderSettings,
};

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
    const data = await loadSheetData("all");
    status.textContent = data
      ? "เชื่อมต่อ Google Sheet สำเร็จ"
      : "บันทึกแล้ว แต่ยังเชื่อมต่อไม่ได้ โปรดตรวจ URL และสิทธิ์ Web App";
  });
  const setupButton = document.getElementById("setupSheetButton");
  if (setupButton) setupButton.addEventListener("click", setupSheetDatabase);
}

function startCourse(courseId) {
  const course = catalogCourses().find((item) => item.courseId === courseId);
  if (!course) return;
  const enrollments = storedEnrollments();
  if (!enrollments.some((item) => item.courseId === courseId)) {
    enrollments.push({ ...course, userId: APP_CONFIG.userId, status: statusLearning, progress: 0, startedAt: new Date().toISOString() });
    saveEnrollments(enrollments);
    sendSheetAction("startCourse", { courseId });
  }
  window.location.href = `learn.html?course=${encodeURIComponent(courseId)}`;
}

function completeLesson(courseId) {
  const enrollments = storedEnrollments();
  const index = enrollments.findIndex((item) => item.courseId === courseId);
  if (index === -1) {
    startCourse(courseId);
    return;
  }
  const current = numberValue(enrollments[index].progress);
  const next = Math.min(100, current + 34);
  enrollments[index].progress = next;
  enrollments[index].status = next >= 100 ? statusDone : statusLearning;
  if (next >= 100) enrollments[index].completedAt = new Date().toISOString();
  saveEnrollments(enrollments);
  sendSheetAction("updateProgress", { courseId, progress: next, status: enrollments[index].status });
  window.location.reload();
}

function bindLearningActions() {
  document.querySelectorAll("[data-start-course]").forEach((button) => {
    button.addEventListener("click", () => startCourse(button.dataset.startCourse));
  });
  document.querySelectorAll("[data-complete-lesson]").forEach((button) => {
    button.addEventListener("click", () => completeLesson(button.dataset.completeLesson));
  });
}

async function loginWithSheet(username, password) {
  if (!APP_CONFIG.appsScriptUrl) return null;
  const result = await jsonp(APP_CONFIG.appsScriptUrl, { action: "login", username, password });
  return result && result.success ? result.data : null;
}

function localLogin(username, password) {
  const user = appData.users.find((item) => String(item.username || "").toLowerCase() === username.toLowerCase());
  if (!user) return null;
  if (String(user.password || "") !== String(password || "")) return null;
  const safeUser = { ...user };
  delete safeUser.password;
  return safeUser;
}

function demoLogin(username, password) {
  if (String(username || "").trim().toLowerCase() === "admin01" && String(password || "") === "admin123") {
    return { id: "NU-998", userId: "NU-998", username: "admin01", name: "เจ้าหน้าที่ ดูแลระบบ", department: "งานพัฒนาระบบ", role: "admin", progress: 0, accessCount: 10 };
  }
  if (String(username || "").trim().toLowerCase() === "boss01" && String(password || "") === "boss123") {
    return { id: "NU-999", userId: "NU-999", username: "boss01", name: "ผู้บริหาร โครงการ", department: "งานนโยบายและแผน", role: "management", progress: 0, accessCount: 0 };
  }
  const match = String(username || "").trim().toLowerCase().match(/^staff(\d{2})$/);
  if (!match) return null;
  const number = Number(match[1]);
  const validPassword = number === 1 ? String(password || "") === "" || String(password || "") === "1234" : String(password || "") === "1234";
  if (!validPassword || number < 1 || number > 80) return null;
  const id = `NU-${String(number).padStart(3, "0")}`;
  const known = appData.users.find((item) => (item.id || item.userId) === id || String(item.username || "").toLowerCase() === username.toLowerCase());
  return known || { id, userId: id, username, name: username, department: "บุคลากรสายสนับสนุน", role: "staff", preScore: 0, postScore: "", progress: 0, accessCount: 0, lastLogin: "" };
}

function saveSessionUser(user) {
  const userId = user.id || user.userId || APP_CONFIG.userId;
  APP_CONFIG.userId = userId;
  localStorage.setItem("userId", userId);
  localStorage.setItem(AUTH_KEY, JSON.stringify({ ...user, userId, id: userId }));
}

function bindLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;
  const status = document.getElementById("loginStatus");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    status.textContent = "กำลังตรวจสอบบัญชีผู้ใช้...";
    try {
      const user = (await loginWithSheet(username, password)) || localLogin(username, password) || demoLogin(username, password);
      if (!user) {
        status.textContent = "Username หรือ Password ไม่ถูกต้อง หรือ Google Sheet ยังไม่มีแท็บ users ให้กดสร้างข้อมูลตั้งต้นก่อน";
        return;
      }
      saveSessionUser(user);
      sendSheetAction("logLogin", { timestamp: new Date().toISOString(), userId: user.id || user.userId, username: user.username, name: user.name, position: user.department || user.position });
      window.location.href = "dashboard.html";
    } catch (err) {
      const user = localLogin(username, password) || demoLogin(username, password);
      if (!user) {
        status.textContent = "เชื่อมต่อ Google Sheet ไม่ได้ และไม่พบบัญชีนี้ในข้อมูลสำรอง";
        return;
      }
      saveSessionUser(user);
      window.location.href = "dashboard.html";
    }
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

function aiReply(message) {
  const text = message.toLowerCase();
  const has = (...keywords) => keywords.some((keyword) => text.includes(keyword));
  const courseSuggestions = catalogCourses().slice(0, 4).map((course, index) => `${index + 1}. ${course.title} (${course.category})`).join("\n");

  if (has("แผนรายสัปดาห์", "รายสัปดาห์", "สัปดาห์", "weekly", "วางแผน")) {
    return `ได้ครับ นี่คือแผนรายสัปดาห์สำหรับบุคลากรสายสนับสนุนที่ต้องพัฒนาทักษะดิจิทัลและ AI โดยเริ่มจาก 0:

วันจันทร์: Pre-test Digital Skills และ AI Readiness Check เพื่อรู้ระดับเริ่มต้น
วันอังคาร: เรียนคอร์สพื้นฐานดิจิทัล 30-45 นาที และจด Pain Point จากงานจริง 1 เรื่อง
วันพุธ: Workshop ใช้ AI ช่วยงานเอกสาร เช่น สรุปรายงานประชุมหรือร่างอีเมล
วันพฤหัสบดี: ทำ Collaborative Task กับเพื่อนร่วมงาน เช่น แชร์ Prompt ที่ใช้ได้ผล
วันศุกร์: Reflection สรุปว่า AI ช่วยลดเวลา/ลดข้อผิดพลาดตรงไหน และบันทึกลง Portfolio

ผลลัพธ์ปลายสัปดาห์: มีคะแนนตั้งต้น, มี Pain Point ชัดเจน, มี Prompt ที่ใช้กับงานจริง 1 ชุด และมีหลักฐานการเรียนรู้ใน Portfolio`;
  }
  if (has("pain point", "ปัญหา", "ติดขัด", "วิเคราะห์ pain")) {
    return `ได้ครับ แบบวิเคราะห์ Pain Point สำหรับงานสนับสนุนควรเก็บ 5 ช่องนี้:

1. งานที่ทำบ่อย: เช่น ทำรายงานประชุม จัดตารางข้อมูล ตอบอีเมล
2. จุดที่เสียเวลา: เช่น คัดลอกข้อมูลซ้ำ ตรวจคำผิด รวบรวมไฟล์
3. ผลกระทบ: เช่น งานล่าช้า ข้อมูลคลาดเคลื่อน ผู้รับบริการรอนาน
4. เครื่องมือที่ช่วยได้: Google Sheet, Excel, AI Assistant, Prompt Library
5. ผลลัพธ์ที่คาดหวัง: ลดเวลา 20-30%, ลดข้อผิดพลาด, ทำรายงานได้เร็วขึ้น

ถ้าต้องการ ผมช่วยแปลง Pain Point ของหน่วยงานเป็นแผนอบรมหรือ Project งานจริงให้ต่อได้ครับ`;
  }
  if (has("pre-test", "pretest", "ทดสอบก่อนเรียน", "readiness", "ความพร้อม")) {
    return `ตัวอย่าง Pre-test และ AI Readiness Check:

Digital Skills:
1. จัดเก็บไฟล์บน Cloud ได้เป็นระบบหรือไม่
2. ใช้ Google Sheet/Excel กรองข้อมูลและสรุปผลได้หรือไม่
3. ใช้เครื่องมือประชุมออนไลน์และแชร์เอกสารร่วมกันได้หรือไม่

AI Readiness:
1. เข้าใจข้อจำกัดของ AI และไม่ส่งข้อมูลลับเข้าระบบหรือไม่
2. เขียน Prompt ระบุบทบาท งาน ข้อมูล และรูปแบบผลลัพธ์ได้หรือไม่
3. ตรวจทานคำตอบ AI ก่อนนำไปใช้จริงได้หรือไม่

คะแนนควรเริ่มที่ 0 ในระบบจนกว่าผู้เรียนจะเริ่มทำแบบทดสอบหรือเริ่มคอร์สจริง`;
  }
  if (has("reflection", "สะท้อน", "หลังเรียน")) {
    return `แบบ Reflection หลังเรียนที่ใช้ได้จริง:

1. วันนี้เรียนรู้อะไรที่นำไปใช้กับงานได้ทันที
2. งานเดิมที่เคยใช้เวลานาน ตอนนี้ AI ช่วยตรงไหนได้บ้าง
3. ต้องระวังอะไรเมื่อใช้ AI กับข้อมูลขององค์กร
4. Prompt หรือวิธีทำงานใดที่อยากแชร์ให้เพื่อนร่วมงาน
5. สัปดาห์หน้าจะทดลองปรับปรุงงานใดเป็น Project ต่อเนื่อง`;
  }
  if (has("best practice", "แชร์", "community", "ชุมชน")) {
    return `รูปแบบแชร์ Best Practice ใน Community:

หัวข้อ: งานที่ปรับปรุงด้วย AI
ปัญหาเดิม: อธิบายงานที่ใช้เวลาหรือผิดพลาดง่าย
Prompt/เครื่องมือที่ใช้: ใส่ Prompt หรือขั้นตอน
ผลลัพธ์: ก่อนใช้ใช้เวลากี่นาที หลังใช้เหลือกี่นาที
ข้อควรระวัง: ข้อมูลลับ การตรวจทาน และความถูกต้อง

โพสต์แบบนี้จะช่วยให้ชุมชนเรียนรู้ต่อกันได้ และนำไปเก็บเป็น Learning Portfolio ได้ครับ`;
  }
  if (has("feedback", "ข้อเสนอแนะ", "ประเมิน")) {
    return `AI-assisted Feedback ควรตอบกลับแบบ 3 ส่วน:

จุดแข็ง: สิ่งที่ผู้เรียนทำได้ดี เช่น Prompt ชัดเจนหรือสรุปงานครบ
จุดที่ควรปรับ: เช่น ขาดบริบท ขาดผู้รับผิดชอบ หรือยังไม่ได้ตรวจข้อมูล
ก้าวต่อไป: แนะนำคอร์ส/Prompt/Project ที่เหมาะกับ Pain Point ของผู้เรียน

ถ้าส่งผลงานหรือข้อความมา ผมช่วยจัด feedback ตามกรอบนี้ให้ได้ทันทีครับ`;
  }
  if (has("prompt")) return `ลองใช้ Prompt นี้ได้เลยครับ:

คุณคือผู้ช่วยงานสนับสนุนของมหาวิทยาลัย ช่วยฉันทำงานต่อไปนี้: [ระบุงาน]
บริบทของงานคือ: [หน่วยงาน/กลุ่มผู้รับบริการ/ข้อจำกัด]
ข้อมูลที่มีคือ: [วางข้อมูลหรือสรุปข้อมูล]
ต้องการผลลัพธ์เป็น: [ตาราง/รายการ bullet/หนังสือราชการ/แผนงาน]
เงื่อนไขสำคัญ: ใช้ภาษาไทยสุภาพ กระชับ ตรวจสอบความสมเหตุสมผล และระบุจุดที่ต้องให้มนุษย์ตรวจทาน`;
  if (has("สรุป", "ประชุม", "รายงาน")) return `ส่งข้อความหรือรายงานประชุมมาได้เลยครับ ผมจะสรุปให้เป็น 5 หัวข้อ:

1. ประเด็นสำคัญ
2. มติหรือข้อสรุป
3. งานที่ต้องติดตาม
4. ผู้รับผิดชอบ
5. กำหนดส่ง/กำหนดประชุมครั้งถัดไป

ถ้ายังไม่มีต้นฉบับ ผมช่วยทำ Template รายงานประชุมให้ก่อนได้ครับ`;
  if (has("excel", "ข้อมูล", "sheet", "ตาราง")) return `สำหรับงาน Excel/Google Sheet แนะนำลำดับทำงานนี้:

1. ตรวจหัวตารางให้ชัด เช่น วันที่ หน่วยงาน ประเภทงาน สถานะ ผู้รับผิดชอบ
2. ลบข้อมูลซ้ำและตรวจค่าว่าง
3. สรุปด้วย PivotTable หรือ Filter
4. ใช้ AI ช่วยอ่าน Insight เช่น งานประเภทไหนใช้เวลามากที่สุด
5. นำผลไปทำ Dashboard หรือรายงานผู้บริหาร

ถ้ามีชื่อตารางหรือคอลัมน์ ส่งมาได้ครับ ผมช่วยออกแบบโครงสร้างให้`;
  if (has("เรียน", "คอร์ส", "แนะนำ")) return `คอร์สที่เหมาะสำหรับเริ่มจาก 0 มีดังนี้:

${courseSuggestions}

ให้เริ่มจากหน้า Courses แล้วกด "เริ่มเรียน" ระบบจะเพิ่มเข้า My Learning โดยความก้าวหน้าจะยังเป็น 0% จนกว่าผู้เรียนกดเรียนจบบทเรียนจริง`;
  if (has("google sheet", "ชีต", "หลังบ้าน", "setting", "settings", "ตั้งค่า")) return `Google Sheet เป็นหลังบ้านของระบบครับ ไม่ใช่ขั้นตอนของผู้เรียนทั่วไป

ผู้ดูแลระบบทำครั้งเดียว:
1. Deploy Apps Script เป็น Web App
2. วาง URL ในหน้า Settings
3. กดสร้างตารางและข้อมูลตั้งต้น

หลังจากนั้นระบบจะบันทึกข้อมูล เช่น login_logs, courses, progress และ chat_logs ลง Google Sheet เพื่อให้อาจารย์ตรวจหลังบ้านได้`;
  return `ผมเข้าใจว่าต้องการให้ช่วยเรื่อง "${message}"

คำแนะนำเบื้องต้น: ให้ระบุเป้าหมายงาน ข้อมูลที่มี รูปแบบผลลัพธ์ที่ต้องการ และข้อจำกัดของงานก่อน แล้วผมจะช่วยจัดเป็นแผน งานเอกสาร Prompt หรือแนวทางเรียนรู้ให้ตรงจุดมากขึ้นครับ

ตัวอย่างที่พิมพ์ได้: "ช่วยทำแผนรายสัปดาห์", "วิเคราะห์ Pain Point งานเอกสาร", "ทำ Prompt สรุปรายงานประชุม", หรือ "แนะนำคอร์สเริ่มจาก 0"`;
}

function bindAiChat() {
  const form = document.getElementById("aiChatForm");
  const input = document.getElementById("aiChatInput");
  const messages = document.getElementById("chatMessages");
  if (!form || !input || !messages) return;

  const history = JSON.parse(localStorage.getItem(CHAT_KEY) || '[{"role":"ai","text":"สวัสดีครับ วันนี้ให้ช่วยเรื่องงานหรือการเรียนรู้อะไรดีครับ"}]');
  const render = () => {
    messages.innerHTML = history.map((item) => `<div class="bubble ${item.role === "user" ? "user" : ""}">${escapeHtml(item.text)}</div>`).join("");
    messages.scrollTop = messages.scrollHeight;
  };
  render();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    history.push({ role: "user", text });
    sendSheetAction("logChat", { timestamp: new Date().toISOString(), role: "user", message: text });
    const reply = aiReply(text);
    history.push({ role: "ai", text: reply });
    sendSheetAction("logChat", { timestamp: new Date().toISOString(), role: "ai", message: reply });
    localStorage.setItem(CHAT_KEY, JSON.stringify(history));
    input.value = "";
    render();
  });
}

function bindSessionUi() {
  const user = currentUser();
  document.querySelectorAll(".profile").forEach((node) => {
    node.innerHTML = `${user.name}<br><span class="muted">${user.department || user.position || "บุคลากรสายสนับสนุน"}</span><div style="margin-top:10px"><button class="btn" type="button" data-logout>ออกจากระบบ</button></div>`;
  });
  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem("userId");
      window.location.href = "login.html";
    });
  });
}

async function renderCurrentPage() {
  await hydrateData();
  const file = window.location.pathname.split("/").pop() || "dashboard.html";
  const isLogin = file === "login.html";
  if (!isLogin && !localStorage.getItem(AUTH_KEY)) {
    window.location.href = "login.html";
    return;
  }
  const renderer = renderers[file] || renderDashboard;
  const content = document.querySelector(".content");
  if (isLogin) {
    document.body.innerHTML = renderer();
  } else if (content) {
    content.innerHTML = renderer();
  }
  document.body.classList.add("app-ready");
  bindSettingsForm();
  bindLoginForm();
  bindLearningActions();
  bindAiChat();
  bindSessionUi();
}

document.addEventListener("DOMContentLoaded", renderCurrentPage);
