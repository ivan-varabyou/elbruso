const { Client } = require('pg');

async function grantPerms() {
  const client = new Client({
    connectionString: 'postgresql://postgres:postgres@localhost:7900/elbruso',
  });

  try {
    await client.connect();
    console.log('Connected to database as superuser');

    const tables = [
      'spreadsheets',
      'spreadsheet_sheets',
      'spreadsheet_cells',
      'spreadsheet_merged_regions',
      'spreadsheet_column_configs',
      'spreadsheet_data_sources'
    ];

    for (const table of tables) {
      console.log(`Granting ALL on ${table} to elbruso...`);
      await client.query(`GRANT ALL PRIVILEGES ON TABLE ${table} TO elbruso`);
      // Also grant on sequences for UUIDs if any (not needed for gen_random_uuid() usually but good practice)
      // await client.query(`GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO elbruso`);
    }

    console.log('Permissions updated successfully');
    await client.end();
  } catch (err) {
    console.error('Grant error:', err);
  }
}

grantPerms();
