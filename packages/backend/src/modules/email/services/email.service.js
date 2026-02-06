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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_service_1 = require("../../../../../database/src/database.service");
const console_email_provider_1 = require("../providers/console-email.provider");
const smtp_email_provider_1 = require("../providers/smtp-email.provider");
let EmailService = class EmailService {
    constructor(db, configService, consoleProvider, smtpProvider) {
        this.db = db;
        this.configService = configService;
        this.consoleProvider = consoleProvider;
        this.smtpProvider = smtpProvider;
        const providerType = this.configService.get('EMAIL_PROVIDER', 'console');
        this.provider =
            providerType === 'smtp' ? this.smtpProvider : this.consoleProvider;
    }
    async sendWelcome(user, lang = 'ru') {
        const template = await this.getTemplate('welcome', lang);
        if (!template)
            return;
        const html = this.replaceVariables(template.body, { name: user.name });
        await this.provider.send(user.email, template.subject, html);
    }
    async sendPasswordReset(user, token, lang = 'ru') {
        const template = await this.getTemplate('password_reset', lang);
        if (!template)
            return;
        const resetLink = `${this.configService.get('FRONTEND_URL', 'http://localhost:7200')}/reset-password?token=${token}`;
        const html = this.replaceVariables(template.body, { link: resetLink });
        await this.provider.send(user.email, template.subject, html);
    }
    async sendPasswordChanged(user, lang = 'ru') {
        const template = await this.getTemplate('password_changed', lang);
        if (!template)
            return;
        const html = this.replaceVariables(template.body, { name: user.name });
        await this.provider.send(user.email, template.subject, html);
    }
    async getTemplate(key, lang) {
        const template = await this.db.client
            .selectFrom('email_templates')
            .selectAll()
            .where('key', '=', key)
            .where('is_active', '=', true)
            .executeTakeFirst();
        if (!template)
            return null;
        return {
            subject: lang === 'en' ? template.subject_en : template.subject_ru,
            body: lang === 'en' ? template.body_en : template.body_ru,
        };
    }
    replaceVariables(template, variables) {
        let result = template;
        for (const [key, value] of Object.entries(variables)) {
            result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
        }
        return result;
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        config_1.ConfigService,
        console_email_provider_1.ConsoleEmailProvider,
        smtp_email_provider_1.SmtpEmailProvider])
], EmailService);
//# sourceMappingURL=email.service.js.map