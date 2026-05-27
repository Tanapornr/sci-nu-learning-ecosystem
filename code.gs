/**
 * Google Apps Script backend for SCI NU Learning Ecosystem
 * Deploy as Web App: Execute as Me, access Anyone
 */
const SHEETS = {
  users: 'users',
  courses: 'courses',
  prompts: 'prompts',
  activities: 'activities',
  badges: 'badges'
};

function doGet(e) {
  const action = (e.parameter.action || 'all').toLowerCase();
  const payload = route(action, e.parameter);
  return output(payload, e.parameter.callback);
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents || '{}');
  const action = (body.action || 'upsertActivity').toLowerCase();
  const payload = route(action, body);
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function route(action, params) {
  try {
    if (action === 'all') return ok(getAllData());
    if (action === 'dashboard') return ok(getDashboardData(params.userId || 'U001'));
    if (action === 'courses') return ok(readSheetObjects(SHEETS.courses));
    if (action === 'prompts') return ok(readSheetObjects(SHEETS.prompts));
    if (action === 'community') return ok(readSheetObjects(SHEETS.activities));
    if (action === 'badges') return ok(readSheetObjects(SHEETS.badges));
    if (action === 'upsertactivity') return ok(upsertActivity(params));
    return fail('Unknown action: ' + action);
  } catch (err) {
    return fail(err.message);
  }
}

function getAllData() {
  return {
    users: readSheetObjects(SHEETS.users),
    courses: readSheetObjects(SHEETS.courses),
    prompts: readSheetObjects(SHEETS.prompts),
    activities: readSheetObjects(SHEETS.activities),
    badges: readSheetObjects(SHEETS.badges)
  };
}

function getDashboardData(userId) {
  const users = readSheetObjects(SHEETS.users);
  const user = users.find(u => u.userId === userId) || users[0] || {};
  const courses = readSheetObjects(SHEETS.courses);
  const badges = readSheetObjects(SHEETS.badges);
  return {
    user,
    stats: {
      learningCourses: courses.filter(c => c.status === 'กำลังเรียน').length,
      completedCourses: courses.filter(c => c.status === 'เรียนจบแล้ว').length,
      progress: user.progress || 0,
      score: user.score || 0,
      badges: badges.length
    },
    courses: courses.slice(0, 8),
    badges: badges.slice(0, 8)
  };
}

function upsertActivity(data) {
  const sh = getSheet(SHEETS.activities);
  const headers = getHeaders(sh);
  const row = headers.map(h => data[h] || '');
  sh.appendRow(row);
  return { inserted: true, values: row };
}

function readSheetObjects(name) {
  const sh = getSheet(name);
  const values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0];
  return values.slice(1).map(r => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = r[i]);
    return obj;
  });
}

function getSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(name);
  if (!sh) throw new Error('Missing sheet: ' + name);
  return sh;
}

function getHeaders(sh) {
  return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
}

function ok(data) { return { success: true, data }; }
function fail(error) { return { success: false, error }; }

function output(payload, callback) {
  const text = JSON.stringify(payload);
  if (callback) {
    return ContentService.createTextOutput(`${callback}(${text})`).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.JSON);
}
