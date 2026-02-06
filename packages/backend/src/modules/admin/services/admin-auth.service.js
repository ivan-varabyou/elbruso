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
exports.AdminAuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const database_service_1 = require("../../../../../database/src/database.service");
let AdminAuthService = class AdminAuthService {
    constructor(jwtService, configService, db) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.db = db;
    }
    async validateAdmin(email, password) {
        const adminUser = await this.db.client
            .selectFrom('admin_users')
            .selectAll()
            .where('email', '=', email)
            .where('is_active', '=', true)
            .executeTakeFirst();
        if (!adminUser) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, adminUser.password_hash);
        if (!isPasswordValid) {
            return null;
        }
        const { password_hash: _, ...userWithoutPassword } = adminUser;
        return userWithoutPassword;
    }
    async login(dto) {
        const adminUser = await this.validateAdmin(dto.email, dto.password);
        if (!adminUser) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const tokens = await this.generateTokens(adminUser);
        return {
            ...tokens,
            user: {
                id: adminUser.id,
                email: adminUser.email,
                name: adminUser.name,
                role: adminUser.role,
            },
        };
    }
    async logout(refreshToken) {
        await this.db.client
            .deleteFrom('admin_sessions')
            .where('refresh_token', '=', refreshToken)
            .execute();
    }
    async refresh(refreshToken) {
        const session = await this.validateRefreshToken(refreshToken);
        if (!session) {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        await this.db.client
            .deleteFrom('admin_sessions')
            .where('id', '=', session.id)
            .execute();
        const adminUser = await this.db.client
            .selectFrom('admin_users')
            .selectAll()
            .where('id', '=', session.user_id)
            .where('is_active', '=', true)
            .executeTakeFirst();
        if (!adminUser) {
            throw new common_1.UnauthorizedException('Admin user not found');
        }
        const { password_hash: _, ...userWithoutPassword } = adminUser;
        const tokens = await this.generateTokens(userWithoutPassword);
        return {
            ...tokens,
            user: {
                id: adminUser.id,
                email: adminUser.email,
                name: adminUser.name,
                role: adminUser.role,
            },
        };
    }
    async validateRefreshToken(token) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get('ADMIN_JWT_SECRET'),
            });
            const session = await this.db.client
                .selectFrom('admin_sessions')
                .selectAll()
                .where('user_id', '=', payload.sub)
                .where('refresh_token', '=', token)
                .where('expires_at', '>', new Date())
                .executeTakeFirst();
            return session;
        }
        catch {
            return null;
        }
    }
    async getMe(adminUserId) {
        const adminUser = await this.db.client
            .selectFrom('admin_users')
            .select(['id', 'email', 'name', 'role', 'created_at', 'updated_at'])
            .where('id', '=', adminUserId)
            .where('is_active', '=', true)
            .executeTakeFirst();
        if (!adminUser) {
            throw new common_1.NotFoundException('Admin user not found');
        }
        return adminUser;
    }
    async generateTokens(adminUser) {
        const payload = {
            sub: adminUser.id,
            email: adminUser.email,
            role: adminUser.role,
        };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.get('ADMIN_JWT_REFRESH_EXPIRES_IN', '7d'),
        });
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.db.client
            .insertInto('admin_sessions')
            .values({
            user_id: adminUser.id,
            refresh_token: refreshToken,
            expires_at: expiresAt,
            created_at: new Date(),
        })
            .execute();
        return {
            accessToken,
            refreshToken,
            expiresIn: this.configService.get('ADMIN_JWT_EXPIRES_IN', '15m'),
        };
    }
};
exports.AdminAuthService = AdminAuthService;
exports.AdminAuthService = AdminAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        database_service_1.DatabaseService])
], AdminAuthService);
//# sourceMappingURL=admin-auth.service.js.map