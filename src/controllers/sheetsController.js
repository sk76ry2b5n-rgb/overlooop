const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const sheetsId = process.env.GOOGLE_SHEETS_ID;
const serviceAccountKey = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || '{}');

const getSheet = async () => {
  const doc = new GoogleSpreadsheet(sheetsId);
  
  await doc.useServiceAccountAuth({
    client_email: serviceAccountKey.client_email,
    private_key: serviceAccountKey.private_key
  });
  
  await doc.loadInfo();
  return doc;
};

const appendToSheet = async (req, res) => {
  try {
    const { sheetName, data } = req.body;

    const doc = await getSheet();
    const sheet = doc.sheetsByTitle[sheetName] || doc.sheetsByIndex[0];

    await sheet.addRow(data);

    res.json({
      success: true,
      message: 'Data appended to sheet',
      sheetName
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const readSheet = async (req, res) => {
  try {
    const { sheetName } = req.query;

    const doc = await getSheet();
    const sheet = doc.sheetsByTitle[sheetName] || doc.sheetsByIndex[0];

    const rows = await sheet.getRows();
    const data = rows.map(row => row._rawData);

    res.json({
      success: true,
      sheetName: sheet.title,
      rowCount: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSheet = async (req, res) => {
  try {
    const { sheetName, rowIndex, data } = req.body;

    const doc = await getSheet();
    const sheet = doc.sheetsByTitle[sheetName] || doc.sheetsByIndex[0];

    const rows = await sheet.getRows();
    const row = rows[rowIndex];

    if (!row) {
      return res.status(404).json({ error: 'Row not found' });
    }

    Object.keys(data).forEach(key => {
      row[key] = data[key];
    });

    await row.save();

    res.json({
      success: true,
      message: 'Row updated',
      sheetName
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  appendToSheet,
  readSheet,
  updateSheet
};
