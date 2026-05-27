/**
 * SCI NU Learning Ecosystem backend
 * Google Apps Script Web App connected to Google Sheet.
 *
 * Required sheet tabs:
 * users, courses, prompts, activities, badges, community, tools
 */
const SHEETS = {
  users: "users",
  courses: "courses",
  prompts: "prompts",
  activities: "activities",
  badges: "badges",
  community: "community",
  tools: "tools",
};

const HEADERS = {
  users: ["userId", "name", "position", "progress", "score"],
  courses: ["courseId", "userId", "title", "category", "status", "progress", "hours", "level", "videoId", "videoUrl"],
  prompts: ["promptId", "title", "category", "uses"],
  activities: ["activityId", "title", "type", "date", "time"],
  badges: ["badgeId", "name", "description", "status", "earnedDate"],
  community: ["postId", "title", "type", "author", "createdAt"],
  tools: ["toolId", "title", "category", "uses", "url"],
  login_logs: ["timestamp", "userId", "name", "position"],
  chat_logs: ["timestamp", "userId", "role", "message"],
};

const SEED_DATA = {
  users: [
    ["U001", "ผู้เรียนใหม่", "บุคลากรสายสนับสนุน", 0, 0],
  ],
  courses: [
    ["C001", "", "ทักษะดิจิทัลพื้นฐานสำหรับบุคลากรสายสนับสนุน", "ทักษะดิจิทัล", "เปิดลงทะเบียน", 0, 3, "พื้นฐาน", "aircAruvnKk", "https://www.youtube.com/watch?v=aircAruvnKk"],
    ["C002", "", "การใช้ Google Workspace เพื่อการทำงานร่วมกัน", "เครื่องมือสำนักงาน", "เปิดลงทะเบียน", 0, 4, "พื้นฐาน", "", "https://www.youtube.com/results?search_query=Google+Workspace+%E0%B8%AA%E0%B8%AD%E0%B8%99%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99+%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B2%E0%B9%84%E0%B8%97%E0%B8%A2"],
    ["C003", "", "Excel สำหรับงานธุรการและการวิเคราะห์ข้อมูลเบื้องต้น", "Data & Excel", "เปิดลงทะเบียน", 0, 5, "พื้นฐาน", "", "https://www.youtube.com/results?search_query=Excel+PivotTable+%E0%B8%9E%E0%B8%B7%E0%B9%89%E0%B8%99%E0%B8%90%E0%B8%B2%E0%B8%99+%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B2%E0%B9%84%E0%B8%97%E0%B8%A2"],
    ["C004", "", "การจัดการเอกสารดิจิทัลและ e-Document", "งานเอกสาร", "เปิดลงทะเบียน", 0, 3, "พื้นฐาน", "", "https://www.youtube.com/results?search_query=%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%88%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B4%E0%B8%88%E0%B8%B4%E0%B8%97%E0%B8%B1%E0%B8%A5"],
    ["C005", "", "AI Literacy: เข้าใจ AI และใช้อย่างปลอดภัย", "การใช้ AI", "เปิดลงทะเบียน", 0, 2, "พื้นฐาน", "aircAruvnKk", "https://www.youtube.com/watch?v=aircAruvnKk"],
    ["C006", "", "การเขียน Prompt สำหรับงานสำนักงาน", "Prompt Engineering", "เปิดลงทะเบียน", 0, 3, "พื้นฐาน", "kCc8FmEb1nY", "https://www.youtube.com/watch?v=kCc8FmEb1nY"],
    ["C007", "", "AI ช่วยสรุปเอกสาร รายงาน และการประชุม", "การใช้ AI", "เปิดลงทะเบียน", 0, 4, "กลาง", "aircAruvnKk", "https://www.youtube.com/watch?v=aircAruvnKk"],
    ["C008", "", "การใช้ AI ช่วยร่างหนังสือราชการและอีเมล", "งานเอกสาร", "เปิดลงทะเบียน", 0, 3, "กลาง", "kCc8FmEb1nY", "https://www.youtube.com/watch?v=kCc8FmEb1nY"],
    ["C009", "", "การสร้างสื่อประชาสัมพันธ์ด้วย Canva และ AI", "สื่อสารองค์กร", "เปิดลงทะเบียน", 0, 4, "พื้นฐาน", "", "https://www.youtube.com/results?search_query=Canva+AI+%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B2%E0%B9%84%E0%B8%97%E0%B8%A2"],
    ["C010", "", "Power BI เบื้องต้นสำหรับ Dashboard งานสนับสนุน", "Data Dashboard", "เปิดลงทะเบียน", 0, 6, "กลาง", "", "https://www.youtube.com/results?search_query=Power+BI+%E0%B9%80%E0%B8%9A%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%95%E0%B9%89%E0%B8%99+%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B2%E0%B9%84%E0%B8%97%E0%B8%A2"],
    ["C011", "", "Cybersecurity Awareness สำหรับการทำงานประจำวัน", "ความปลอดภัยดิจิทัล", "เปิดลงทะเบียน", 0, 2, "พื้นฐาน", "", "https://www.youtube.com/results?search_query=Cybersecurity+Awareness+%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B2%E0%B9%84%E0%B8%97%E0%B8%A2"],
    ["C012", "", "การวางแผนงานและติดตามงานด้วยเครื่องมือดิจิทัล", "Productivity", "เปิดลงทะเบียน", 0, 3, "พื้นฐาน", "", "https://www.youtube.com/results?search_query=%E0%B8%A7%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B8%87%E0%B8%B2%E0%B8%99+digital+tools"],
  ],
  prompts: [
    ["P001", "สรุปรายงานการประชุมเป็นมติและงานติดตาม", "สรุปเอกสาร", 0],
    ["P002", "ร่างหนังสือราชการด้วยภาษาสุภาพ", "งานเอกสาร", 0],
    ["P003", "วิเคราะห์ตาราง Excel และสรุป Insight", "Excel & Data", 0],
    ["P004", "สร้างแผนงานรายสัปดาห์สำหรับทีมสนับสนุน", "Productivity", 0],
    ["P005", "ตรวจแก้ภาษาไทยในอีเมลราชการ", "สื่อสารองค์กร", 0],
    ["P006", "ออกแบบโครงสไลด์นำเสนอผลการดำเนินงาน", "งานนำเสนอ", 0],
  ],
  activities: [
    ["A001", "ปฐมนิเทศระบบ SCI NU Learning Ecosystem", "ออนไลน์", "กำหนดภายหลัง", "09:00 - 10:00"],
    ["A002", "Workshop: AI Literacy สำหรับงานสนับสนุน", "อบรม", "กำหนดภายหลัง", "13:30 - 15:30"],
    ["A003", "Clinic: ถามตอบการใช้ Google Sheet เป็นฐานข้อมูล", "ถามตอบ", "กำหนดภายหลัง", "10:00 - 11:00"],
  ],
  badges: [
    ["B001", "Digital Starter", "เริ่มเรียนคอร์สทักษะดิจิทัลคอร์สแรก", "ยังไม่ได้รับ", ""],
    ["B002", "AI Explorer", "เรียนรู้คอร์ส AI Literacy สำเร็จ", "ยังไม่ได้รับ", ""],
    ["B003", "Prompt Beginner", "ผ่านคอร์สการเขียน Prompt สำหรับงานสำนักงาน", "ยังไม่ได้รับ", ""],
    ["B004", "Data Ready", "เรียนคอร์ส Excel หรือ Dashboard สำเร็จ", "ยังไม่ได้รับ", ""],
    ["B005", "Work Smart", "เรียนครบ 3 คอร์สในหมวด Productivity หรือเครื่องมือสำนักงาน", "ยังไม่ได้รับ", ""],
    ["B006", "Support Innovator", "ส่งผลงานประยุกต์ใช้ AI กับงานจริง", "ยังไม่ได้รับ", ""],
  ],
  community: [
    ["CM001", "เริ่มต้นใช้ AI กับงานเอกสารอย่างไรให้ปลอดภัย", "แนวทาง", "ทีมพัฒนาระบบ", "พร้อมใช้งาน"],
    ["CM002", "แบ่งปัน Prompt สำหรับสรุปรายงานประชุม", "Prompt", "ทีมพัฒนาระบบ", "พร้อมใช้งาน"],
    ["CM003", "ถามตอบการจัดข้อมูลใน Google Sheet เพื่อทำ Dashboard", "ถามตอบ", "ทีมพัฒนาระบบ", "พร้อมใช้งาน"],
  ],
  tools: [
    ["T001", "Google Workspace", "เอกสารและการทำงานร่วมกัน", 0, "#"],
    ["T002", "Microsoft 365", "เอกสาร ตาราง และงานนำเสนอ", 0, "#"],
    ["T003", "Google Sheet Database", "ฐานข้อมูลเบื้องต้น", 0, "#"],
    ["T004", "AI Assistant", "ผู้ช่วยงานเอกสารและข้อมูล", 0, "aiasistant.html"],
    ["T005", "Prompt Library", "คลังคำสั่ง AI", 0, "promptlibrary.html"],
    ["T006", "Dashboard Template", "ติดตามงานและรายงานผล", 0, "#"],
  ],
  login_logs: [],
  chat_logs: [],
};

function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(HEADERS).forEach((sheetName) => {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) sheet = ss.insertSheet(sheetName);
    sheet.clear();
    sheet.getRange(1, 1, 1, HEADERS[sheetName].length).setValues([HEADERS[sheetName]]);
    if (SEED_DATA[sheetName] && SEED_DATA[sheetName].length) {
      sheet.getRange(2, 1, SEED_DATA[sheetName].length, HEADERS[sheetName].length).setValues(SEED_DATA[sheetName]);
    }
    sheet.setFrozenRows(1);
  });
  return "SCI NU Learning Ecosystem database is ready with catalog data. Learner progress remains zero.";
}

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const action = String(params.action || "all").toLowerCase();
  const response = route(action, params);
  return output(response, params.callback);
}

function doPost(e) {
  const body = JSON.parse((e.postData && e.postData.contents) || "{}");
  const action = String(body.action || "createActivity").toLowerCase();
  const response = route(action, body);
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function route(action, params) {
  try {
    if (action === "all") return ok(getAllData());
    if (action === "setup") return ok(setupDatabase());
    if (action === "dashboard") return ok(getDashboard(params.userId || "U001"));
    if (action === "courses") return ok(readObjects(SHEETS.courses));
    if (action === "prompts") return ok(readObjects(SHEETS.prompts));
    if (action === "activities") return ok(readObjects(SHEETS.activities));
    if (action === "badges") return ok(readObjects(SHEETS.badges));
    if (action === "community") return ok(readObjects(SHEETS.community));
    if (action === "tools") return ok(readObjects(SHEETS.tools));
    if (action === "startcourse") return ok(startCourse(params.userId || "U001", params.courseId));
    if (action === "updateprogress") return ok(updateProgress(params.userId || "U001", params.courseId, params.progress, params.status));
    if (action === "loglogin") return ok(appendObject("login_logs", params));
    if (action === "logchat") return ok(appendObject("chat_logs", params));
    if (action === "createactivity") return ok(appendObject(SHEETS.activities, params));
    if (action === "createcommunitypost") return ok(appendObject(SHEETS.community, params));
    return fail("Unknown action: " + action);
  } catch (err) {
    return fail(err.message);
  }
}

function getAllData() {
  return {
    users: readObjects(SHEETS.users),
    courses: readObjects(SHEETS.courses),
    prompts: readObjects(SHEETS.prompts),
    activities: readObjects(SHEETS.activities),
    badges: readObjects(SHEETS.badges),
    community: readObjects(SHEETS.community),
    tools: readObjects(SHEETS.tools),
  };
}

function getDashboard(userId) {
  const users = readObjects(SHEETS.users);
  const courses = readObjects(SHEETS.courses);
  const badges = readObjects(SHEETS.badges);
  const activities = readObjects(SHEETS.activities);
  const user = users.find((item) => item.userId === userId) || users[0] || {};
  const enrollments = courses.filter((item) => item.userId === userId);
  const learning = enrollments.filter((item) => item.status === "กำลังเรียน");
  const completed = enrollments.filter((item) => item.status === "เรียนจบแล้ว");
  const earnedBadges = badges.filter((item) => item.status === "ได้รับแล้ว" || item.earnedDate);

  return {
    user,
    stats: {
      learningCourses: learning.length,
      completedCourses: completed.length,
      totalCourses: courses.filter((item) => !item.userId).length,
      hours: sum(completed, "hours"),
      progress: enrollments.length ? Math.round((completed.length / enrollments.length) * 100) : 0,
      score: user.score || 0,
      badges: earnedBadges.length,
    },
    learning,
    recommended: courses.filter((item) => !item.userId).slice(0, 8),
    badges,
    activities: activities.slice(0, 8),
  };
}

function startCourse(userId, courseId) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS.courses);
  if (!sheet) throw new Error("Missing sheet: courses");
  const courses = readObjects(SHEETS.courses);
  const catalog = courses.find((item) => item.courseId === courseId && !item.userId);
  if (!catalog) throw new Error("Course not found: " + courseId);
  const existing = courses.find((item) => item.courseId === courseId && item.userId === userId);
  if (existing) return { enrolled: true, existing: true };
  sheet.appendRow([
    catalog.courseId,
    userId,
    catalog.title,
    catalog.category,
    "กำลังเรียน",
    0,
    catalog.hours,
    catalog.level,
  ]);
  return { enrolled: true };
}

function updateProgress(userId, courseId, progress, status) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS.courses);
  if (!sheet) throw new Error("Missing sheet: courses");
  const values = sheet.getDataRange().getDisplayValues();
  const headers = values[0];
  const idCol = headers.indexOf("courseId");
  const userCol = headers.indexOf("userId");
  const progressCol = headers.indexOf("progress");
  const statusCol = headers.indexOf("status");
  for (let row = 1; row < values.length; row += 1) {
    if (values[row][idCol] === courseId && values[row][userCol] === userId) {
      sheet.getRange(row + 1, progressCol + 1).setValue(progress);
      sheet.getRange(row + 1, statusCol + 1).setValue(status || (Number(progress) >= 100 ? "เรียนจบแล้ว" : "กำลังเรียน"));
      return { updated: true };
    }
  }
  return { updated: false };
}

function readObjects(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) return [];
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return [];

  const headers = values[0].map((header) => String(header).trim());
  return values.slice(1).filter((row) => row.some(Boolean)).map((row) => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = row[index];
    });
    return item;
  });
}

function appendObject(sheetName, data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) throw new Error("Missing sheet: " + sheetName);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
  const row = headers.map((header) => data[header] || "");
  sheet.appendRow(row);
  return { inserted: true, row };
}

function sum(items, key) {
  return items.reduce((total, item) => total + Number(item[key] || 0), 0);
}

function average(items, key) {
  const values = items.map((item) => Number(item[key] || 0)).filter((value) => !isNaN(value));
  if (!values.length) return 0;
  return Math.round(values.reduce((total, value) => total + value, 0) / values.length);
}

function ok(data) {
  return { success: true, data };
}

function fail(error) {
  return { success: false, error };
}

function output(payload, callback) {
  const json = JSON.stringify(payload);
  if (callback) {
    return ContentService
      .createTextOutput(callback + "(" + json + ")")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}
