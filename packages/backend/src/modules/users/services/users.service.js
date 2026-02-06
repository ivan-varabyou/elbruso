"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const crypto = __importStar(require("crypto"));
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../../database/src/database.service");
let UsersService = class UsersService {
    constructor(db) {
        this.db = db;
    }
    async create(dto) {
        const existing = await this.findByEmail(dto.email);
        if (existing) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        let orgId = null;
        if (dto.organizationId) {
            const parsed = parseInt(dto.organizationId, 10);
            if (!isNaN(parsed)) {
                orgId = parsed;
            }
        }
        const countryId = dto.countryId || 1;
        const user = await this.db.client
            .insertInto('users')
            .values({
            email: dto.email,
            first_name: dto.name,
            password: dto.password,
            organization_id: orgId,
            country_id: countryId,
        })
            .returningAll()
            .executeTakeFirst();
        if (!user) {
            throw new common_1.ConflictException('Failed to create user');
        }
        return this.sanitizeUser(user);
    }
    async findByEmail(email) {
        const user = await this.db.client
            .selectFrom('users')
            .selectAll()
            .where('email', '=', email)
            .where('is_active', '=', true)
            .executeTakeFirst();
        return user ? this.sanitizeUser(user) : null;
    }
    async findByEmailWithPassword(email) {
        const user = await this.db.client
            .selectFrom('users')
            .selectAll()
            .where('email', '=', email)
            .where('is_active', '=', true)
            .executeTakeFirst();
        return user || null;
    }
    async findById(id) {
        const user = await this.db.client
            .selectFrom('users')
            .selectAll()
            .where('id', '=', id)
            .where('is_active', '=', true)
            .executeTakeFirst();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.sanitizeUser(user);
    }
    async findByApiKey(apiKey) {
        const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');
        const apiKeyRecord = await this.db.client
            .selectFrom('api_keys')
            .selectAll()
            .where('key_hash', '=', keyHash)
            .where('is_active', '=', true)
            .executeTakeFirst();
        if (!apiKeyRecord) {
            return null;
        }
        await this.db.client
            .updateTable('api_keys')
            .set({ last_used_at: new Date() })
            .where('id', '=', apiKeyRecord.id)
            .execute();
        return this.findById(apiKeyRecord.user_id);
    }
    async saveRefreshToken(userId, refreshToken) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.db.client
            .insertInto('sessions')
            .values({
            user_id: userId,
            refresh_token: refreshToken,
            expires_at: expiresAt,
        })
            .execute();
    }
    async validateRefreshToken(userId, refreshToken) {
        const session = await this.db.client
            .selectFrom('sessions')
            .selectAll()
            .where('user_id', '=', userId)
            .where('refresh_token', '=', refreshToken)
            .where('expires_at', '>', new Date())
            .executeTakeFirst();
        return !!session;
    }
    async revokeRefreshToken(userId, refreshToken) {
        await this.db.client
            .deleteFrom('sessions')
            .where('user_id', '=', userId)
            .where('refresh_token', '=', refreshToken)
            .execute();
    }
    async createApiKey(userId, name, permissions) {
        const apiKey = `elk_${crypto.randomBytes(32).toString('hex')}`;
        const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');
        await this.db.client
            .insertInto('api_keys')
            .values({
            user_id: userId,
            name,
            key_hash: keyHash,
            permissions: JSON.stringify(permissions),
        })
            .execute();
        return { apiKey, name };
    }
    async updateProfile(userId, dto) {
        const user = await this.db.client
            .updateTable('users')
            .set({
            ...dto,
            updated_at: new Date(),
        })
            .where('id', '=', userId)
            .returningAll()
            .executeTakeFirst();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.sanitizeUser(user);
    }
    async findAll() {
        return this.db.client
            .selectFrom('users')
            .selectAll()
            .where('is_active', '=', true)
            .execute();
    }
    async updateUserAdmin(userId, dto) {
        const user = await this.db.client
            .updateTable('users')
            .set({
            ...dto,
            updated_at: new Date(),
        })
            .where('id', '=', userId)
            .returningAll()
            .executeTakeFirst();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.sanitizeUser(user);
    }
    sanitizeUser(user) {
        if (!user)
            return null;
        const { password: _password, ...sanitized } = user;
        return sanitized;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UsersService);
//# sourceMappingURL=users.service.js.map