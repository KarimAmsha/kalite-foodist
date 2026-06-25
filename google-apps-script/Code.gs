/**
 * Kalite Çikolata — Foodist Istanbul 2026 lead capture.
 *
 * Deploy this as a Google Apps Script Web App bound to your Google Sheet:
 *   1. Open your Google Sheet → Extensions → Apps Script.
 *   2. Paste this file, save.
 *   3. Run `setup()` once to create the header row (grant permissions).
 *   4. Deploy → New deployment → type "Web app".
 *        - Execute as: Me
 *        - Who has access: Anyone
 *   5. Copy the Web App URL into GOOGLE_SCRIPT_WEBHOOK_URL in your .env.local
 *      (and in Vercel project env vars).
 *
 * The Next.js /api/lead route POSTs JSON here; we append one row per lead.
 */

var SHEET_NAME = 'Leads';

var COLUMNS = [
  'created_at',
  'source',
  'locale',
  'full_name',
  'company',
  'country',
  'phone',
  'email',
  'interest_type',
  'interested_brand',
  'preferred_meeting_date',
  'message',
  'status',
  'owner',
  'notes'
];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // Prefer a tab literally named "Leads"; otherwise use the first tab that
  // already exists (the sheet may have been created with a different tab name).
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Run once to initialize the header row. */
function setup() {
  getSheet_();
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();

    var row = COLUMNS.map(function (key) {
      if (key === 'created_at') return data.created_at || new Date().toISOString();
      if (key === 'status') return data.status || 'New';
      return data[key] || '';
    });

    // Write into the next row as PLAIN TEXT so values like "+90..." are not
    // parsed as formulas (which produced #ERROR!) and to block formula
    // injection (=, +, -, @).
    var targetRow = sheet.getLastRow() + 1;
    var range = sheet.getRange(targetRow, 1, 1, COLUMNS.length);
    range.setNumberFormat('@');
    range.setValues([row]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/** Optional health check. */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'kalite-foodist-leads' }))
    .setMimeType(ContentService.MimeType.JSON);
}
