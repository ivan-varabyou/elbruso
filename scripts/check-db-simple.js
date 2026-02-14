
const { Pool } = require('pg');

async function main() {
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '7900'),
    database: process.env.DB_NAME || 'elbruso',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  });
  
  try {
    const client = await pool.connect();
    
    // List tables
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('--- DATABASE TABLES ---');
    console.log(tablesResult.rows.map(r => r.table_name).join(', '));
    
    // Check indicator_catalog
    const indicatorsResult = await client.query('SELECT count(*) FROM indicator_catalog');
    console.log('Indicators in catalog:', indicatorsResult.rows[0].count);
    
    // Check indicator_groups_catalog
    const groupsResult = await client.query('SELECT count(*) FROM indicator_groups_catalog');
    console.log('Indicator groups:', groupsResult.rows[0].count);
    
    // Check seasons
    const seasonsResult = await client.query('SELECT count(*) FROM seasons');
    console.log('Seasons:', seasonsResult.rows[0].count);

    // Check users
    const usersResult = await client.query('SELECT count(*) FROM users');
    console.log('Users:', usersResult.rows[0].count);
    
    client.release();
  } catch (error) {
    console.error('Error checking database:', error);
  } finally {
    await pool.end();
  }
}

main();
