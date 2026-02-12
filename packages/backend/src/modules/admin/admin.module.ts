import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@database/database.module';
import { AdminAuthModule } from './admin-auth.module';
import { AdminSetupController } from './controllers/admin-setup.controller';
import { AdminRolesModule } from './roles/admin-roles.module';
import { AdminSetupService } from './services/admin-setup.service';
import { AdminUsersModule } from './users/admin-users.module';

import { AdminMeController } from './controllers/admin-me.controller';
import { AdminWorkspaceTemplateController } from './controllers/admin-workspace-template.controller';
import { AdminWorkspaceController } from './controllers/admin-workspace.controller';
import { WorkspaceModule } from '../workspace/workspace.module';

@Module({
  imports: [
    DatabaseModule,
    WorkspaceModule,
    // PassportModule is exported by AdminAuthModule
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('ADMIN_JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('ADMIN_JWT_EXPIRES_IN') || '1h',
        },
      }),
      inject: [ConfigService],
    }),
    AdminAuthModule,
    AdminUsersModule,
    AdminRolesModule,
  ],
  controllers: [
    AdminSetupController, 
    AdminWorkspaceController, 
    AdminWorkspaceTemplateController,
    AdminMeController,
  ],
  providers: [AdminSetupService],
  exports: [AdminSetupService],
})
export class AdminModule {}
