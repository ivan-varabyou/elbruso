const { Client } = require('pg');
require('dotenv').config({ path: '../../apps/api-getaway/.env' });

async function checkPerms() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database as:', process.env.DATABASE_URL.split(':')[1].replace('//', ''));

    console.log('\n--- Table Owners ---');
    const res = await client.query(`
      SELECT tablename, tableowner 
      FROM pg_catalog.pg_tables 
      WHERE schemaname = 'public'
    `);
    console.table(res.rows);

    console.log('\n--- Current User ---');
    const userRes = await client.query('SELECT current_user, session_user');
    console.table(userRes.rows);

    await client.end();
  } catch (err) {
    console.error('Check error:', err);
  }
}

checkPerms();
