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
    if (action === "dashboard") return ok(getDashboard(params.userId || "U001"));
    if (action === "courses") return ok(readObjects(SHEETS.courses));
    if (action === "prompts") return ok(readObjects(SHEETS.prompts));
    if (action === "activities") return ok(readObjects(SHEETS.activities));
    if (action === "badges") return ok(readObjects(SHEETS.badges));
    if (action === "community") return ok(readObjects(SHEETS.community));
    if (action === "tools") return ok(readObjects(SHEETS.tools));
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
  const learning = courses.filter((item) => item.status === "กำลังเรียน");
  const completed = courses.filter((item) => item.status === "เรียนจบแล้ว");

  return {
    user,
    stats: {
      learningCourses: learning.length,
      completedCourses: completed.length,
      hours: sum(courses, "hours"),
      progress: user.progress || average(courses, "progress"),
      score: user.score || 0,
      badges: badges.length,
    },
    learning,
    recommended: courses.slice(0, 8),
    badges: badges.slice(0, 8),
    activities: activities.slice(0, 8),
  };
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
