/**
 * Kalite Çikolata — Foodist Istanbul 2026 lead capture + professional sheet formatting.
 *
 * Setup:
 *   1. Open your Google Sheet → Extensions → Apps Script.
 *   2. Paste this file, save.
 *   3. Run `setup()` once (creates headers + applies formatting; grant permissions).
 *      To re-apply just the styling later, run `formatSheet()`.
 *   4. Deploy → New deployment → Web app (Execute as: Me, Access: Anyone).
 *   5. Put the Web App URL into GOOGLE_SCRIPT_WEBHOOK_URL (Vercel + .env.local).
 *
 * The Next.js /api/lead route POSTs JSON here; we append one row per lead.
 */

var SHEET_NAME = 'Leads';

var COLUMNS = [
  'created_at', 'source', 'locale', 'full_name', 'company', 'country', 'phone',
  'email', 'interest_type', 'interested_brand', 'preferred_meeting_date',
  'message', 'status', 'owner', 'notes'
];

// Friendly header titles shown in row 1 (data keys stay as COLUMNS above).
var HEADERS = [
  'Created At', 'Source', 'Locale', 'Full Name', 'Company', 'Country', 'Phone / WhatsApp',
  'Email', 'Interest', 'Brand', 'Preferred Meeting', 'Message', 'Status', 'Owner', 'Notes'
];

var COLUMN_WIDTHS = [155, 115, 70, 150, 165, 115, 150, 200, 120, 130, 150, 260, 140, 120, 220];

var STATUS_OPTIONS = ['New', 'Contacted', 'Meeting Booked', 'Catalogue Sent', 'Quotation Needed', 'Closed'];
var INTEREST_OPTIONS = ['catalogue', 'meeting', 'quotation', 'samples', 'distribution'];

// Brand palette
var KALITE_RED = '#A52332';
var KALITE_BROWN = '#4A2312';
var CREAM = '#FFF7EA';

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Run once to initialize headers and styling. */
function setup() {
  getSheet_();
  formatSheet();
}

/**
 * Applies professional formatting to the existing sheet. Safe to re-run.
 */
function formatSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // Show all times in the fair's local timezone.
  try { ss.setSpreadsheetTimeZone('Europe/Istanbul'); } catch (e) {}

  var sheet = getSheet_();
  var lastRow = Math.max(sheet.getLastRow(), 2);
  var nCols = COLUMNS.length;

  // Make sure row 1 holds the friendly headers.
  sheet.getRange(1, 1, 1, nCols).setValues([HEADERS]);

  // Alternating row banding (brand brown theme). Remove any existing first.
  var fullRange = sheet.getRange(1, 1, sheet.getMaxRows(), nCols);
  var bandings = fullRange.getBandings();
  for (var b = 0; b < bandings.length; b++) bandings[b].remove();
  fullRange.applyRowBanding(SpreadsheetApp.BandingTheme.BROWN, true, false);

  // Header styling (overrides banding header).
  var header = sheet.getRange(1, 1, 1, nCols);
  header
    .setBackground(KALITE_RED)
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(11)
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('left');
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(1);

  // Column widths.
  for (var i = 0; i < COLUMN_WIDTHS.length; i++) {
    sheet.setColumnWidth(i + 1, COLUMN_WIDTHS[i]);
  }

  // Body styling: vertical align top, wrap message + notes.
  var body = sheet.getRange(2, 1, Math.max(lastRow - 1, 1), nCols);
  body.setVerticalAlignment('top').setFontSize(10);
  sheet.getRange(2, colIndex_('message'), sheet.getMaxRows() - 1, 1).setWrap(true);
  sheet.getRange(2, colIndex_('notes'), sheet.getMaxRows() - 1, 1).setWrap(true);

  // Keep phone as plain text (avoids "+90..." becoming a formula).
  sheet.getRange(2, colIndex_('phone'), sheet.getMaxRows() - 1, 1).setNumberFormat('@');

  // Clean date/time format for the created_at column.
  sheet.getRange(2, colIndex_('created_at'), sheet.getMaxRows() - 1, 1).setNumberFormat('dd mmm yyyy, hh:mm');

  // Dropdowns for Status and Interest.
  applyDropdown_(sheet, colIndex_('status'), STATUS_OPTIONS);
  applyDropdown_(sheet, colIndex_('interest_type'), INTEREST_OPTIONS);

  // Color-code the Status column.
  applyStatusColors_(sheet);

  // Filter across the header.
  var existing = sheet.getFilter();
  if (existing) existing.remove();
  sheet.getRange(1, 1, lastRow, nCols).createFilter();
}

function colIndex_(key) {
  return COLUMNS.indexOf(key) + 1;
}

function applyDropdown_(sheet, col, options) {
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(options, true)
    .setAllowInvalid(true)
    .build();
  sheet.getRange(2, col, sheet.getMaxRows() - 1, 1).setDataValidation(rule);
}

function applyStatusColors_(sheet) {
  var col = colIndex_('status');
  var range = sheet.getRange(2, col, sheet.getMaxRows() - 1, 1);
  var rules = sheet.getConditionalFormatRules().filter(function (r) {
    // Drop previous status rules targeting this column.
    var ranges = r.getRanges();
    return !(ranges.length === 1 && ranges[0].getColumn() === col);
  });

  var colors = {
    'New': ['#FDECEA', '#A52332'],
    'Contacted': ['#FFF4DE', '#8A6D1B'],
    'Meeting Booked': ['#E8F0FE', '#1A56C4'],
    'Catalogue Sent': ['#E6F4EA', '#1E7E34'],
    'Quotation Needed': ['#FCE8E6', '#B71C1C'],
    'Closed': ['#ECECEC', '#5F6368']
  };

  Object.keys(colors).forEach(function (status) {
    var rule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(status)
      .setBackground(colors[status][0])
      .setFontColor(colors[status][1])
      .setRanges([range])
      .build();
    rules.push(rule);
  });

  sheet.setConditionalFormatRules(rules);
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

    // Write as PLAIN TEXT so values like "+90..." are not parsed as formulas
    // (which produced #ERROR!) and to block formula injection (=, +, -, @).
    var targetRow = sheet.getLastRow() + 1;
    var range = sheet.getRange(targetRow, 1, 1, COLUMNS.length);
    range.setNumberFormat('@');
    range.setValues([row]);

    // Store created_at as a real, nicely formatted date/time (sortable),
    // e.g. "26 Jun 2026, 10:12" in the sheet's timezone.
    var created = data.created_at ? new Date(data.created_at) : new Date();
    var createdCell = sheet.getRange(targetRow, colIndex_('created_at'));
    createdCell.setNumberFormat('dd mmm yyyy, hh:mm');
    createdCell.setValue(created);

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
