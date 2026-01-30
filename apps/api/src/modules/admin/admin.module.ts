import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminAuthModule } from './admin-auth.module';
import { AdminUsersModule } from './users/admin-users.module';
import { AdminRolesModule } from './roles/admin-roles.module';
import { AdminSetupController } from './controllers/admin-setup.controller';
import { AdminSetupService } from './services/admin-setup.service';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'admin-jwt' }),
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
  controllers: [AdminSetupController],
  providers: [AdminSetupService],
  exports: [AdminSetupService],
})
export class AdminModule {}
