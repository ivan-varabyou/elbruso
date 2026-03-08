import { createDatabase } from './db';

async function check() {
  const db = createDatabase();
  console.log('Checking rbac_roles...');

  try {
    const roles = await db.selectFrom('rbac_roles' as any).selectAll().execute();
    console.log('Existing roles count:', roles.length);
    if (roles.length > 0) {
      console.log('Sample role:', roles[0]);
    }
  } catch (error) {
    console.error('Failed to check roles:', error);
  } finally {
    await db.destroy();
  }
}

check();
