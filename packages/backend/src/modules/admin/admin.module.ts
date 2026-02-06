import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '@database/database.module';
import { AdminAuthModule } from './admin-auth.module';
import { AdminSetupController } from './controllers/admin-setup.controller';
import { AdminRolesModule } from './roles/admin-roles.module';
import { AdminSetupService } from './services/admin-setup.service';
import { AdminUsersModule } from './users/admin-users.module';

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
