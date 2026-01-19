import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import type { DB as Database } from './types';

let db: Kysely<Database> | null = null;

export function createDatabase(config?: {
  host?: string;
  port?: number;
  database?: string;
  user?: string;
  password?: string;
}): Kysely<Database> {
  const pool = new Pool({
    host: config?.host || process.env.DB_HOST || 'localhost',
    port: config?.port || parseInt(process.env.DB_PORT || '7900'),
    database: config?.database || process.env.DB_NAME || 'elbruso',
    user: config?.user || process.env.DB_USER || 'postgres',
    password: config?.password || process.env.DB_PASSWORD || 'postgres',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  return new Kysely<Database>({
    dialect: new PostgresDialect({ pool }),
  });
}

export function getDatabase(): Kysely<Database> {
  if (!db) {
    db = createDatabase();
  }
  return db;
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.destroy();
    db = null;
  }
}

// Export only the type reference, not the interface itself
export type { Database };
