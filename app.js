const APP_CONFIG = {
  appsScriptUrl: localStorage.getItem("appsScriptUrl") || "",
  userId: localStorage.getItem("userId") || "U001",
};

const thaiDate = new Intl.DateTimeFormat("th-TH", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date());

let appData = {
  users: [],
  courses: [],
  prompts: [],
  activities: [],
  badges: [],
  community: [],
  tools: [],
};

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

const statusDone = "เรียนจบแล้ว";
const statusLearning = "กำลังเรียน";

function currentUser() {
  return appData.users.find((user) => user.userId === APP_CONFIG.userId) || {
    userId: APP_CONFIG.userId,
    name: "ผู้เรียนใหม่",
    position: "บุคลากรสายสนับสนุน",
    progress: 0,
    score: 0,
  };
}

function numberValue(value) {
  const parsed = Number(String(value || "0").replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function userCourses() {
  return appData.courses.filter((course) => course.userId === APP_CONFIG.userId || !course.userId);
}

function stats() {
  const courses = userCourses();
  const learning = courses.filter((course) => course.status === statusLearning);
  const completed = courses.filter((course) => course.status === statusDone);
  const hours = completed.reduce((sum, course) => sum + numberValue(course.hours), 0);
  const score = numberValue(currentUser().score);
  const progress = courses.length ? Math.round((completed.length / courses.length) * 100) : 0;
  const earnedBadges = appData.badges.filter((badge) => badge.earnedDate || badge.status === "ได้รับแล้ว");

  return {
    totalCourses: courses.length,
    learningCourses: learning.length,
    completedCourses: completed.length,
    notStartedCourses: courses.filter((course) => !course.status || course.status === "ยังไม่เริ่ม").length,
    hours,
    progress,
    score,
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

async function hydrateData() {
  const data = await loadSheetData("all");
  if (!data) return;
  appData = {
    users: data.users || [],
    courses: data.courses || [],
    prompts: data.prompts || [],
    activities: data.activities || [],
    badges: data.badges || [],
    community: data.community || [],
    tools: data.tools || [],
  };
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

function courseCard(course) {
  const title = course.title || "ไม่มีชื่อคอร์ส";
  const status = course.status || "ยังไม่เริ่ม";
  const progress = numberValue(course.progress);
  const tone = status === statusDone ? "green" : status === statusLearning ? "blue" : "amber";
  return `<div class="card course-card"><div class="row-main"><div class="thumb">📘</div><div><h4>${title}</h4><span class="pill ${tone}">${status}</span></div></div>${progressBar(progress)}<div class="row"><span class="muted small">${course.category || "ยังไม่ระบุหมวดหมู่"}</span><strong>${progress}%</strong></div></div>`;
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

function courseGrid(courses, emptyTitle, emptyText) {
  if (!courses.length) return emptyState(emptyTitle, emptyText);
  return `<div class="course-grid">${courses.map(courseCard).join("")}</div>`;
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

function renderDashboard() {
  const s = stats();
  const learning = userCourses().filter((course) => course.status === statusLearning);
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
        ${panel("คอร์สที่กำลังเรียน", courseGrid(learning, "ยังไม่มีคอร์สที่กำลังเรียน", "เมื่อเริ่มเรียนคอร์ส รายการจะมาแสดงตรงนี้"), { href: "mylearning.html", label: "ดูทั้งหมด" })}
        <div class="grid-2">
          ${panel("ความก้าวหน้ารายเดือน", zeroChart())}
          ${panel("Badge ล่าสุด", badgeGrid(earnedBadges, "ยังไม่ได้รับ Badge", "เมื่อเรียนสำเร็จหรือทำกิจกรรมครบเงื่อนไข Badge จะแสดงที่นี่"), { href: "badge.html", label: "ดูทั้งหมด" })}
        </div>
      </div>
      <aside class="stack">
        ${panel("ปฏิทินการเรียนรู้", listRows(appData.activities, "ยังไม่มีกิจกรรม", "เมื่อมีตารางอบรมหรือกิจกรรม ระบบจะแสดงที่นี่", (item) => `<li class="row"><span>${item.title || "กิจกรรม"}</span><span class="pill">${item.time || "รอเวลา"}</span></li>`))}
        ${panel("AI Assistant แนะนำ", `<p class="muted">พร้อมใช้งานสำหรับช่วยงานเอกสาร สรุปข้อมูล และร่าง Prompt แต่ยังไม่บันทึกประวัติการเรียนจนกว่าจะเชื่อม Google Sheet</p><a class="btn primary" href="aiasistant.html">ถาม AI Assistant</a>`)}
      </aside>
    </section>`;
}

function renderMyLearning() {
  const courses = userCourses().filter((course) => course.status);
  return `${header("mylearning.html")}
    <div class="tabs"><button class="tab active">คอร์สของฉัน</button><button class="tab">บทเรียนที่กำลังเรียน</button><button class="tab">ประวัติการเรียน</button><button class="tab">Wishlist</button></div>
    <section class="layout-main">
      ${panel("คอร์สของฉัน", courseGrid(courses, "ยังไม่ได้เริ่มเรียน", "เมื่อกดเริ่มเรียนคอร์ส รายการและความก้าวหน้าจะมาแสดงที่นี่"))}
      <aside class="stack">
        ${panel("Learning Journey", `<ul class="list"><li class="row">ก่อนเรียน <span class="pill">0%</span></li><li class="row">ระหว่างเรียน <span class="pill">0%</span></li><li class="row">หลังเรียน <span class="pill">0%</span></li></ul>`)}
        <div class="grid-2">${stat("โน้ตของฉัน", 0, "📝")}${stat("ใบประกาศ", 0, "🏆")}</div>
      </aside>
    </section>`;
}

function renderCourses() {
  const s = stats();
  return `${header("courses.html")}
    <div class="tabs"><button class="tab active">ทั้งหมด</button><button class="tab">กำลังเรียน</button><button class="tab">ยังไม่ได้เริ่ม</button><button class="tab">เรียนจบแล้ว</button></div>
    <section class="grid-4">${stat("คอร์สทั้งหมด", s.totalCourses, "📚")}${stat("กำลังเรียน", s.learningCourses, "▶")}${stat("ยังไม่เริ่ม", s.notStartedCourses, "⏳")}${stat("เรียนจบแล้ว", s.completedCourses, "✓")}</section>
    <section class="layout-main" style="margin-top:14px">
      ${panel("คอร์สทั้งหมด", courseGrid(userCourses(), "ยังไม่มีคอร์สในระบบ", "เพิ่มข้อมูลในชีต courses แล้วระบบจะแสดงคอร์สจริงที่นี่"))}
      <aside class="stack">
        ${panel("หมวดหมู่คอร์ส", listRows([], "ยังไม่มีหมวดหมู่", "หมวดหมู่จะคำนวณจากข้อมูลคอร์สจริง", () => ""))}
        ${panel("คอร์สยอดนิยม", emptyState("ยังไม่มีข้อมูลความนิยม", "เมื่อมีผู้เรียนและคะแนนรีวิว ระบบจะแสดงอันดับคอร์ส"))}
      </aside>
    </section>`;
}

function renderAiAssistant() {
  return `${header("aiasistant.html")}
    <section class="hero"><h2>SCI NU AI Assistant</h2><p>พร้อมช่วยงานเอกสาร สรุปข้อมูล ร่างข้อความ และออกแบบ Prompt สำหรับงานสนับสนุน โดยไม่บันทึกเป็นความก้าวหน้าการเรียนจนกว่าคุณจะเริ่มคอร์สจริง</p></section>
    <section class="layout-main" style="margin-top:14px">
      <div class="panel chat"><div class="bubble">สวัสดีครับ วันนี้ให้ช่วยเรื่องงานหรือการเรียนรู้อะไรดีครับ</div><div class="chat-input"><input class="input" style="flex:1" placeholder="พิมพ์คำถามหรือวางข้อความที่ต้องการให้ AI ช่วย..." /><button class="btn primary">ส่ง</button></div></div>
      <aside class="stack">${panel("เครื่องมือ AI", promptGrid(appData.prompts, "ยังไม่มี Prompt/เครื่องมือที่บันทึกไว้", "เพิ่มข้อมูลในชีต prompts เพื่อแสดงเครื่องมือหรือ Prompt ที่องค์กรอนุมัติ"))}</aside>
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
    <section class="grid-4">${stat("สมาชิก", appData.users.length, "👥")}${stat("กระทู้", s.communityPosts, "💬")}${stat("การมีส่วนร่วม", "0%", "❤️")}${stat("ไฟล์เอกสาร", 0, "⬇")}</section>
    <section class="layout-main" style="margin-top:14px">
      ${panel("กระทู้ชุมชน", listRows(appData.community, "ยังไม่มีกระทู้", "เมื่อมีการตั้งคำถามหรือแบ่งปันความรู้ รายการจะแสดงที่นี่", (item) => `<li class="row"><span>${item.title || "กระทู้"}</span><span>${item.type || "ทั่วไป"}</span></li>`))}
      <aside>${panel("กิจกรรมใกล้เคียง", listRows(appData.activities, "ยังไม่มีกิจกรรม", "เพิ่มข้อมูลในชีต activities เพื่อแสดงกำหนดการจริง", (item) => `<li class="row"><span>${item.title || "กิจกรรม"}</span><span>${item.date || "-"}</span></li>`))}</aside>
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
    <section class="grid-5">${stat("ผู้ใช้งานทั้งหมด", appData.users.length, "👥")}${stat("คอร์สที่เรียนจบ", s.completedCourses, "📘")}${stat("เวลาเรียนรวม", s.hours, "⏱")}${stat("อัตราเรียนจบ", `${s.progress}%`, "✅")}${stat("คะแนนพึงพอใจ", "0 / 5", "⭐")}</section>
    <section class="layout-main" style="margin-top:14px">
      <div class="stack">${panel("แนวโน้มการใช้งานรายสัปดาห์", zeroChart())}${panel("การมีส่วนร่วมของผู้เรียน", `<ul class="list"><li class="row">Active Users <strong>0</strong></li><li class="row">อ่านบทความ <strong>0</strong></li><li class="row">ใช้ Prompt <strong>${s.promptUses}</strong></li></ul>`)}</div>
      <aside>${panel("กิจกรรมล่าสุด", emptyState("ยังไม่มีกิจกรรมล่าสุด", "ข้อมูลจะเริ่มสะสมเมื่อผู้ใช้เริ่มเรียนและทำกิจกรรม"))}</aside>
    </section>`;
}

function renderPortfolio() {
  const user = currentUser();
  const s = stats();
  return `${header("portfolio.html")}
    <section class="hero"><h2>${user.name}</h2><p>${user.position || "บุคลากรสายสนับสนุน"} | แฟ้มสะสมการเรียนรู้จะเริ่มนับจากกิจกรรมจริงเท่านั้น</p></section>
    <section class="grid-5" style="margin-top:14px">${stat("คอร์สทั้งหมด", s.totalCourses, "📚")}${stat("คอร์สที่จบแล้ว", s.completedCourses, "🎓")}${stat("เวลาเรียนสะสม", s.hours, "⏱")}${stat("ใบประกาศ", 0, "🏆")}${stat("คะแนนสะสม", s.score, "⭐")}</section>
    <section class="grid-3" style="margin-top:14px">${panel("ความคืบหน้าการเรียนรู้", courseGrid(userCourses().filter((c) => c.status), "ยังไม่มีความคืบหน้า", "เมื่อเริ่มเรียนคอร์ส ความคืบหน้าจะปรากฏที่นี่"))}${panel("ใบประกาศล่าสุด", emptyState("ยังไม่มีใบประกาศ", "เมื่อเรียนจบและผ่านเงื่อนไข ใบประกาศจะแสดงที่นี่"))}${panel("รางวัลและความสำเร็จ", badgeGrid(appData.badges.filter((b) => b.earnedDate), "ยังไม่มีรางวัล", "เริ่มเรียนและทำกิจกรรมเพื่อสะสมความสำเร็จ"))}</section>`;
}

function renderBadge() {
  const earned = appData.badges.filter((item) => item.earnedDate || item.status === "ได้รับแล้ว");
  const locked = appData.badges.filter((item) => !item.earnedDate && item.status !== "ได้รับแล้ว");
  return `${header("badge.html")}
    <section class="hero"><h2>เริ่มต้นสะสม Badge</h2><p>ตอนนี้ยังไม่มี Badge เพราะยังไม่ได้เรียนหรือทำกิจกรรมสำเร็จ ความก้าวหน้าทุกอย่างจะเริ่มจาก 0</p>${progressBar(0)}</section>
    <section class="layout-main" style="margin-top:14px">
      <div class="stack">${panel("Badge ที่ได้รับแล้ว", badgeGrid(earned, "ยังไม่ได้รับ Badge", "เมื่อทำเงื่อนไขสำเร็จ Badge จะแสดงที่นี่"))}${panel("Badge ที่ยังไม่ได้รับ", badgeGrid(locked, "ยังไม่มีรายการ Badge", "เพิ่มเงื่อนไข Badge ในชีต badges เพื่อใช้เป็นเป้าหมาย", true))}</div>
      <aside>${panel("สถานะปัจจุบัน", `${stat("ระดับปัจจุบัน", "Beginner", "⭐")}${stat("คะแนนรวม", 0, "📈")}${stat("Badge ที่ได้รับ", earned.length, "🏅")}`)}</aside>
    </section>`;
}

function renderSettings() {
  return `${header("settings.html")}
    <section class="grid-2">
      <div class="panel"><h3>เชื่อมต่อ Google Sheet</h3><p class="muted">วาง URL Web App จาก Apps Script เพื่อให้ทุกหน้าดึงข้อมูลจริงจาก Google Sheet</p><form id="settingsForm" class="settings-form"><input id="appsScriptUrl" class="input" placeholder="https://script.google.com/macros/s/.../exec" /><button class="btn primary" type="submit">บันทึกและทดสอบ</button><span id="settingsStatus" class="muted small">ยังไม่ได้ทดสอบการเชื่อมต่อ</span></form></div>
      <div class="panel"><h3>สถานะเริ่มต้นของระบบ</h3><ul class="list"><li class="row">คะแนนเริ่มต้น <strong>0</strong></li><li class="row">ชั่วโมงเรียนเริ่มต้น <strong>0</strong></li><li class="row">คอร์สที่จบแล้ว <strong>0</strong></li><li class="row">Badge ที่ได้รับ <strong>0</strong></li></ul></div>
    </section>`;
}

const renderers = {
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
}

async function renderCurrentPage() {
  await hydrateData();
  const file = window.location.pathname.split("/").pop() || "dashboard.html";
  const renderer = renderers[file] || renderDashboard;
  const content = document.querySelector(".content");
  if (content) content.innerHTML = renderer();
  document.body.classList.add("app-ready");
  bindSettingsForm();
}

document.addEventListener("DOMContentLoaded", renderCurrentPage);
