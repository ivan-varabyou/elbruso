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
exports.AuthService = void 0;
const crypto = __importStar(require("crypto"));
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const audit_service_1 = require("../../audit/services/audit.service");
const email_service_1 = require("../../email/services/email.service");
const users_service_1 = require("../../users/services/users.service");
const workspace_service_1 = require("../../workspace/services/workspace.service");
const database_service_1 = require("../../../../../database/src/database.service");
let AuthService = class AuthService {
    constructor(_usersService, _workspaceService, _jwtService, _configService, _auditService, _emailService, _db) {
        this._usersService = _usersService;
        this._workspaceService = _workspaceService;
        this._jwtService = _jwtService;
        this._configService = _configService;
        this._auditService = _auditService;
        this._emailService = _emailService;
        this._db = _db;
    }
    async register(dto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const createdUser = await this._usersService.create({
            ...dto,
            password: hashedPassword,
        });
        const userId = String(createdUser.id);
        const user = {
            id: userId,
            email: String(createdUser.email),
            name: String(createdUser.first_name),
        };
        await this._workspaceService.create(userId, {
            name: `${user.name}'s Workspace`,
            description: 'Personal workspace',
        });
        await this._auditService.log({
            userId,
            action: audit_service_1.AuditAction.REGISTER,
            entityType: 'User',
            entityId: userId,
            details: { email: user.email },
        });
        try {
            await this._emailService.sendWelcome(user, dto.lang || 'ru');
        }
        catch (error) {
            console.error('Failed to send welcome email:', error);
        }
        return this.generateTokens(userId, user.email);
    }
    async login(dto) {
        const user = await this.validateUser(dto.email, dto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const userId = String(user.id);
        await this._auditService.log({
            userId,
            action: audit_service_1.AuditAction.LOGIN,
            entityType: 'User',
            entityId: userId,
        });
        return this.generateTokens(userId, String(user.email));
    }
    async validateUser(email, password) {
        const user = await this._usersService.findByEmailWithPassword(email);
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, String(user.password));
        if (!isPasswordValid) {
            return null;
        }
        const { password: _password, ...userWithoutPassword } = user;
        return {
            id: String(userWithoutPassword.id),
            email: String(userWithoutPassword.email),
            name: String(userWithoutPassword.first_name),
        };
    }
    async validateApiKey(apiKey) {
        return this._usersService.findByApiKey(apiKey);
    }
    async refreshToken(dto) {
        try {
            const payload = this._jwtService.verify(dto.refreshToken, {
                secret: this._configService.get('JWT_SECRET'),
            });
            const isValid = await this._usersService.validateRefreshToken(payload.sub, dto.refreshToken);
            if (!isValid) {
                throw new common_1.UnauthorizedException('Invalid or expired refresh token');
            }
            await this._usersService.revokeRefreshToken(payload.sub, dto.refreshToken);
            const tokens = await this.generateTokens(payload.sub, payload.email);
            await this._auditService.log({
                userId: payload.sub,
                action: audit_service_1.AuditAction.TOKEN_REFRESH,
                entityType: 'Session',
            });
            return tokens;
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async getMe(userId) {
        const user = await this._usersService.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async generateTokens(userId, email) {
        const payload = { sub: userId, email };
        const accessToken = this._jwtService.sign(payload);
        const refreshToken = this._jwtService.sign(payload, {
            expiresIn: this._configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
        });
        await this._usersService.saveRefreshToken(userId, refreshToken);
        return {
            accessToken,
            refreshToken,
            expiresIn: this._configService.get('JWT_EXPIRES_IN', '15m'),
        };
    }
    async forgotPassword(dto) {
        const user = await this._usersService.findByEmail(dto.email);
        if (!user) {
            return { message: 'If the email exists, a reset link has been sent' };
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);
        await this._db.client
            .insertInto('password_reset_tokens')
            .values({
            user_id: String(user.id),
            token: tokenHash,
            expires_at: expiresAt,
        })
            .execute();
        const emailUser = {
            id: String(user.id),
            email: String(user.email),
            name: String(user.first_name),
        };
        await this._emailService.sendPasswordReset(emailUser, resetToken, dto.lang || 'ru');
        return { message: 'If the email exists, a reset link has been sent' };
    }
    async resetPassword(dto) {
        const tokenHash = crypto
            .createHash('sha256')
            .update(dto.token)
            .digest('hex');
        const tokenRecord = await this._db.client
            .selectFrom('password_reset_tokens')
            .selectAll()
            .where('token', '=', tokenHash)
            .where('expires_at', '>', new Date())
            .where('used_at', 'is', null)
            .executeTakeFirst();
        if (!tokenRecord) {
            throw new common_1.BadRequestException('Invalid or expired reset token');
        }
        const tokenUserId = String(tokenRecord.user_id);
        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
        await this._db.client
            .updateTable('users')
            .set({ password: hashedPassword })
            .where('id', '=', tokenUserId)
            .execute();
        await this._db.client
            .updateTable('password_reset_tokens')
            .set({ used_at: new Date() })
            .where('token', '=', tokenHash)
            .execute();
        const user = await this._usersService.findById(tokenUserId);
        if (user) {
            const emailUser = {
                id: String(user.id),
                email: String(user.email),
                name: String(user.first_name),
            };
            await this._emailService.sendPasswordChanged(emailUser, 'ru');
        }
        return { message: 'Password successfully reset' };
    }
    async verifyResetToken(dto) {
        const tokenHash = crypto
            .createHash('sha256')
            .update(dto.token)
            .digest('hex');
        const tokenRecord = await this._db.client
            .selectFrom('password_reset_tokens')
            .select(['id'])
            .where('token', '=', tokenHash)
            .where('expires_at', '>', new Date())
            .where('used_at', 'is', null)
            .executeTakeFirst();
        return { valid: !!tokenRecord };
    }
    async changePassword(userId, dto) {
        const currentUser = await this._usersService.findById(userId);
        if (!currentUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const user = await this._usersService.findByEmailWithPassword(currentUser.email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(dto.currentPassword, String(user.password));
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Incorrect current password');
        }
        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
        await this._db.client
            .updateTable('users')
            .set({ password: hashedPassword })
            .where('id', '=', userId)
            .execute();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        workspace_service_1.WorkspaceService,
        jwt_1.JwtService,
        config_1.ConfigService,
        audit_service_1.AuditService,
        email_service_1.EmailService,
        database_service_1.DatabaseService])
], AuthService);
//# sourceMappingURL=auth.service.js.map