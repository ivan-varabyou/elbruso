import { OnModuleDestroy } from '@nestjs/common';
import { Kysely } from 'kysely';
import { type Database } from '@database';
export declare class DatabaseService implements OnModuleDestroy {
    private readonly db;
    constructor();
    get client(): Kysely<Database>;
    onModuleDestroy(): Promise<void>;
}
