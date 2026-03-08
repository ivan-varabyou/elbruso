const { Client } = require('pg');
require('dotenv').config({ path: '../../apps/api-getaway/.env' });

/**
 * Seeds demo spreadsheets for testing and demonstration
 */
async function seedDemo() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Use a default system user ID for seeding
    const userId = '00000000-0000-0000-0000-000000000001'; // Default system admin UUID pattern

    // 1. Financial Report Template
    const spreadsheetRes = await client.query(`
      INSERT INTO spreadsheets (name, description, created_by, status, metadata)
      VALUES ($1, $2, $3, 'published', $4)
      RETURNING id
    `, [
      'Годовой финансовый отчет (Демо)', 
      'Пример шаблона с формулами и расчетами', 
      userId, 
      JSON.stringify({ category: 'Finance' })
    ]);
    const spreadsheetId = spreadsheetRes.rows[0].id;

    // 2. Main Sheet
    const sheetRes = await client.query(`
      INSERT INTO spreadsheet_sheets (spreadsheet_id, name, sort_order, row_count, col_count)
      VALUES ($1, 'Данные', 0, 50, 10)
      RETURNING id
    `, [spreadsheetId]);
    const sheetId = sheetRes.rows[0].id;

    // 3. Populate Cells
    const cells = [
      // Headers
      { r: 0, c: 0, v: 'Месяц', s: { bold: true } },
      { r: 0, c: 1, v: 'Доход', s: { bold: true } },
      { r: 0, c: 2, v: 'Расход', s: { bold: true } },
      { r: 0, c: 3, v: 'Прибыль', s: { bold: true } },
      
      // Data Rows
      { r: 1, c: 0, v: 'Январь' }, { r: 1, c: 1, v: '1000' }, { r: 1, c: 2, v: '800' }, { r: 1, c: 3, v: '=B2-C2' },
      { r: 2, c: 0, v: 'Февраль' }, { r: 2, c: 1, v: '1200' }, { r: 2, c: 2, v: '900' }, { r: 2, c: 3, v: '=B3-C3' },
      { r: 3, c: 0, v: 'Март' }, { r: 3, c: 1, v: '1500' }, { r: 3, c: 2, v: '1000' }, { r: 3, c: 3, v: '=B4-C4' },
      
      // Totals
      { r: 5, c: 0, v: 'ИТОГО', s: { bold: true } },
      { r: 5, c: 3, v: '=SUM(D2:D4)', s: { bold: true, color: 'green' } },
    ];

    for (const cell of cells) {
      await client.query(`
        INSERT INTO spreadsheet_cells (sheet_id, row_index, col_index, raw_value, style)
        VALUES ($1, $2, $3, $4, $5)
      `, [sheetId, cell.r, cell.c, cell.v, JSON.stringify(cell.s || {})]);
    }

    console.log(`Successfully seeded Spreadsheet ID: ${spreadsheetId}`);

  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await client.end();
  }
}

seedDemo();
