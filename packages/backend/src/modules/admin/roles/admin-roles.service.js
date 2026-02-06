"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRolesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../../database/src/database.service");
let AdminRolesService = class AdminRolesService {
    constructor(db) {
        this.db = db;
    }
    async findAll() {
        const roles = await this.db.client
            .selectFrom('roles')
            .selectAll()
            .orderBy('id', 'asc')
            .execute();
        return roles.map((role) => this.formatRole(role));
    }
    async create(dto) {
        const existing = await this.db.client
            .selectFrom('roles')
            .select(['id'])
            .where('code', '=', dto.code)
            .executeTakeFirst();
        if (existing) {
            throw new common_1.ConflictException('Role with this code already exists');
        }
        const role = await this.db.client
            .insertInto('roles')
            .values({
            code: dto.code,
            name: dto.name,
            description: dto.description || null,
            permissions: JSON.stringify(dto.permissions),
            is_system: false,
        })
            .returningAll()
            .executeTakeFirst();
        return this.formatRole(role);
    }
    async findOne(id) {
        const role = await this.db.client
            .selectFrom('roles')
            .selectAll()
            .where('id', '=', id)
            .executeTakeFirst();
        if (!role) {
            throw new common_1.NotFoundException('Role not found');
        }
        return this.formatRole(role);
    }
    async update(id, dto) {
        await this.findOne(id);
        const updateData = {
            updated_at: new Date(),
        };
        if (dto.name !== undefined) {
            updateData.name = dto.name;
        }
        if (dto.description !== undefined) {
            updateData.description = dto.description;
        }
        if (dto.permissions !== undefined) {
            updateData.permissions = JSON.stringify(dto.permissions);
        }
        const role = await this.db.client
            .updateTable('roles')
            .set(updateData)
            .where('id', '=', id)
            .returningAll()
            .executeTakeFirst();
        return this.formatRole(role);
    }
    async remove(id) {
        const role = await this.findOne(id);
        if (role.is_system) {
            throw new common_1.ConflictException('Cannot delete system role');
        }
        await this.db.client.deleteFrom('roles').where('id', '=', id).execute();
        return { success: true, id };
    }
    async checkSystemRole(id) {
        const role = await this.db.client
            .selectFrom('roles')
            .select(['is_system'])
            .where('id', '=', id)
            .executeTakeFirst();
        return role?.is_system ?? false;
    }
    formatRole(role) {
        let permissions = [];
        try {
            permissions =
                typeof role.permissions === 'string'
                    ? JSON.parse(role.permissions)
                    : role.permissions || [];
        }
        catch {
            permissions = [];
        }
        return {
            id: role.id,
            code: role.code,
            name: role.name,
            description: role.description,
            permissions,
            is_system: Boolean(role.is_system),
            created_at: role.created_at,
            updated_at: role.updated_at,
        };
    }
};
exports.AdminRolesService = AdminRolesService;
exports.AdminRolesService = AdminRolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AdminRolesService);
//# sourceMappingURL=admin-roles.service.js.map