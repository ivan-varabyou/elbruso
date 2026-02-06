"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabase = createDatabase;
exports.getDatabase = getDatabase;
exports.closeDatabase = closeDatabase;
const kysely_1 = require("kysely");
const pg_1 = require("pg");
let db = null;
function createDatabase(config) {
    const pool = new pg_1.Pool({
        host: config?.host || process.env.DB_HOST || 'localhost',
        port: config?.port || parseInt(process.env.DB_PORT || '7900'),
        database: config?.database || process.env.DB_NAME || 'elbruso',
        user: config?.user || process.env.DB_USER || 'postgres',
        password: config?.password || process.env.DB_PASSWORD || 'postgres',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    });
    return new kysely_1.Kysely({
        dialect: new kysely_1.PostgresDialect({ pool }),
    });
}
function getDatabase() {
    if (!db) {
        db = createDatabase();
    }
    return db;
}
async function closeDatabase() {
    if (db) {
        await db.destroy();
        db = null;
    }
}
//# sourceMappingURL=db.js.map