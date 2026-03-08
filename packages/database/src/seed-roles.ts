import { createDatabase } from './db';

async function seed() {
  const db = createDatabase();
  console.log('Seeding roles...');

  const rolesToSeed = [
    // Admin Roles
    {
      code: 'SUPER_ADMIN',
      name: 'Супер-администратор',
      description: 'Полный доступ к системе',
      type: 'admin',
      permissions: { '*': ['*'] },
      weight: 1000,
      is_system: true,
      is_editable: false
    },
    {
      code: 'ADMIN',
      name: 'Администратор',
      description: 'Управление пользователями и контентом',
      type: 'admin',
      permissions: { 'admin:users': ['*'], 'admin:roles': ['*'] },
      weight: 500,
      is_system: true,
      is_editable: true
    },
    // User Roles (WebApp)
    {
      code: 'OWNER',
      name: 'Владелец',
      description: 'Полный доступ к организации',
      type: 'webapp',
      permissions: { '*': ['*'] },
      weight: 1000,
      is_system: true,
      is_editable: false
    },
    {
      code: 'MANAGER',
      name: 'Менеджер',
      description: 'Управление проектами и данными',
      type: 'webapp',
      permissions: { 'user:indicators': ['*'], 'user:workspaces': ['*'] },
      weight: 500,
      is_system: true,
      is_editable: true
    },
    {
      code: 'VIEWER',
      name: 'Зритель',
      description: 'Только чтение данных',
      type: 'webapp',
      permissions: { '*': ['read'] },
      weight: 100,
      is_system: true,
      is_editable: true
    }
  ];

  try {
    for (const role of rolesToSeed) {
      const existing = await db.selectFrom('rbac_roles' as any)
        .select('id')
        .where('code', '=', role.code)
        .where('type', '=', role.type)
        .executeTakeFirst();

      if (!existing) {
        console.log(`Inserting role: ${role.code} (${role.type})`);
        await db.insertInto('rbac_roles' as any)
          .values({
            code: role.code,
            name: role.name,
            description: role.description,
            type: role.type,
            permissions: JSON.stringify(role.permissions),
            weight: role.weight,
            is_system: role.is_system,
            is_editable: role.is_editable
          })
          .execute();
      } else {
        console.log(`Role already exists: ${role.code} (${role.type})`);
      }
    }
    console.log('Roles seeding complete!');
  } catch (error) {
    console.error('Failed to seed roles:', error);
  } finally {
    await db.destroy();
  }
}

seed();
