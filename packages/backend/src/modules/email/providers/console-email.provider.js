"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ConsoleEmailProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleEmailProvider = void 0;
const common_1 = require("@nestjs/common");
let ConsoleEmailProvider = ConsoleEmailProvider_1 = class ConsoleEmailProvider {
    constructor() {
        this.logger = new common_1.Logger(ConsoleEmailProvider_1.name);
    }
    async send(to, subject, html) {
        this.logger.log('='.repeat(80));
        this.logger.log('📧 EMAIL SENT (Console Provider)');
        this.logger.log('='.repeat(80));
        this.logger.log(`To: ${to}`);
        this.logger.log(`Subject: ${subject}`);
        this.logger.log('-'.repeat(80));
        this.logger.log(html);
        this.logger.log('='.repeat(80));
    }
};
exports.ConsoleEmailProvider = ConsoleEmailProvider;
exports.ConsoleEmailProvider = ConsoleEmailProvider = ConsoleEmailProvider_1 = __decorate([
    (0, common_1.Injectable)()
], ConsoleEmailProvider);
//# sourceMappingURL=console-email.provider.js.map