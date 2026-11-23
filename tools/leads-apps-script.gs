/**
 * Cybersecurity Checker: schrijft elke aanvraag van de website als rij in het tabblad "Leads".
 *
 * Installeren: open de Google Sheet > Extensies > Apps Script, plak dit bestand,
 * klik Implementeren > Nieuwe implementatie > Web-app,
 * "Uitvoeren als: ik" en "Wie heeft toegang: iedereen".
 * Zet de web-app-URL (eindigt op /exec) in assets/quiz-config.js bij lead.endpoint.
 */
const SHEET_NAME = "Leads";

// Volgorde van de kolommen na "Datum". Moet overeenkomen met de koppen in rij 1.
const KEYS = [
  "naam", "email", "telefoon", "bedrijf", "toestemming",
  "score", "niveau", "prioriteiten", "verzekerbaar", "nis2",
  "P1", "P2", "P3", "P4",
  "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10",
  "pagina"
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const data = JSON.parse(e.postData.contents);
    if (!data.naam || !data.email || !data.telefoon || !data.bedrijf || data.toestemming !== "ja") {
      return reply({ ok: false, error: "Onvolledige aanvraag" });
    }
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const row = [new Date()].concat(KEYS.map(function (k) { return clean(data[k]); }));
    sheet.appendRow(row);
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

// Tekst die met = + - of @ begint zou Sheets als formule kunnen lezen. Een apostrof ervoor houdt het tekst.
function clean(value) {
  const text = String(value == null ? "" : value).slice(0, 500);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
