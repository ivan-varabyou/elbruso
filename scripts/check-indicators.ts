
import { sql } from 'kysely';

import { createDatabase } from '../packages/database/src/db';

async function main() {
  const db = createDatabase();
  
  try {
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `.execute(db);
    
    console.log('--- DATABASE TABLES ---');
    console.log(tables.rows.map((r: any) => r.table_name).join(', '));

    const indicatorsCount = await db
      .selectFrom('indicator_catalog' as any)
      .select((eb) => eb.fn.countAll<number>().as('count'))
      .executeTakeFirst();
      
    const groupsCount = await db
      .selectFrom('indicator_groups_catalog')
      .select((eb) => eb.fn.countAll<number>().as('count'))
      .executeTakeFirst();

    console.log('--- DATABASE STATUS ---');
    console.log('Indicators in catalog:', indicatorsCount?.count);
    console.log('Indicator groups:', groupsCount?.count);
    
    if (Number(indicatorsCount?.count) > 0) {
      const sample = await db
        .selectFrom('indicator_catalog')
        .select(['id', 'name_ru', 'is_active'])
        .limit(5)
        .execute();
      console.log('Sample indicators:', JSON.stringify(sample, null, 2));
    }
    
  } catch (error) {
    console.error('Error checking database:', error);
  } finally {
    await db.destroy();
  }
}

main();
