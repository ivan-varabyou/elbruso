import { Kysely } from 'kysely';
import type { DB as Database } from './types';
export declare function createDatabase(config?: {
    host?: string;
    port?: number;
    database?: string;
    user?: string;
    password?: string;
}): Kysely<Database>;
export declare function getDatabase(): Kysely<Database>;
export declare function closeDatabase(): Promise<void>;
export type { Database };
