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
exports.AdminUsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const database_service_1 = require("../../../../../database/src/database.service");
let AdminUsersService = class AdminUsersService {
    constructor(db) {
        this.db = db;
    }
    async findAll(pagination = {}) {
        const page = pagination.page || 1;
        const limit = pagination.limit || 20;
        const offset = (page - 1) * limit;
        const users = await this.db.client
            .selectFrom('admin_users')
            .select([
            'id',
            'email',
            'name',
            'role',
            'is_active',
            'created_at',
            'updated_at',
            'last_login_at',
        ])
            .orderBy('created_at', 'desc')
            .limit(limit)
            .offset(offset)
            .execute();
        const { count } = await this.db.client
            .selectFrom('admin_users')
            .select((eb) => [eb.fn.countAll().as('count')])
            .executeTakeFirst();
        return {
            data: users,
            meta: {
                total: Number(count),
                page,
                limit,
                totalPages: Math.ceil(Number(count) / limit),
            },
        };
    }
    async create(dto) {
        const existing = await this.findByEmail(dto.email);
        if (existing) {
            throw new common_1.ConflictException('Admin user with this email already exists');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = await this.db.client
            .insertInto('admin_users')
            .values({
            email: dto.email,
            name: dto.name,
            password_hash: passwordHash,
            role: dto.role,
            is_active: true,
        })
            .returningAll()
            .executeTakeFirst();
        return this.sanitizeUser(user);
    }
    async findOne(id) {
        const user = await this.db.client
            .selectFrom('admin_users')
            .select([
            'id',
            'email',
            'name',
            'role',
            'is_active',
            'created_at',
            'updated_at',
            'last_login_at',
        ])
            .where('id', '=', id)
            .executeTakeFirst();
        if (!user) {
            throw new common_1.NotFoundException('Admin user not found');
        }
        return user;
    }
    async update(id, dto) {
        await this.findOne(id);
        const user = await this.db.client
            .updateTable('admin_users')
            .set({
            ...dto,
            updated_at: new Date(),
        })
            .where('id', '=', id)
            .returningAll()
            .executeTakeFirst();
        return this.sanitizeUser(user);
    }
    async remove(id) {
        const user = await this.findOne(id);
        if (user.role === 'SUPER_ADMIN') {
            const superAdminCount = await this.countSuperAdmins();
            if (superAdminCount <= 1) {
                throw new common_1.BadRequestException('Cannot delete the last SUPER_ADMIN');
            }
        }
        await this.db.client
            .deleteFrom('admin_users')
            .where('id', '=', id)
            .execute();
        return { success: true, message: 'Admin user deleted successfully' };
    }
    async checkLastSuperAdmin(id) {
        const user = await this.findOne(id);
        if (user.role !== 'SUPER_ADMIN') {
            return false;
        }
        const count = await this.countSuperAdmins();
        return count <= 1;
    }
    async findByEmail(email) {
        const user = await this.db.client
            .selectFrom('admin_users')
            .selectAll()
            .where('email', '=', email)
            .executeTakeFirst();
        return user || null;
    }
    async countSuperAdmins() {
        const result = await this.db.client
            .selectFrom('admin_users')
            .select((eb) => [eb.fn.countAll().as('count')])
            .where('role', '=', 'SUPER_ADMIN')
            .where('is_active', '=', true)
            .executeTakeFirst();
        return Number(result?.count || 0);
    }
    sanitizeUser(user) {
        if (!user)
            return null;
        const { password_hash: _password, ...sanitized } = user;
        return sanitized;
    }
};
exports.AdminUsersService = AdminUsersService;
exports.AdminUsersService = AdminUsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AdminUsersService);
//# sourceMappingURL=admin-users.service.js.map