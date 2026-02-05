import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuditModule } from '@modules/audit';
import { EmailModule } from '@modules/email';
import { UsersModule } from '@modules/users';
import { WorkspaceModule } from '@modules/workspace';
import { DatabaseModule } from '@database/database.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ApiKeyStrategy } from './strategies/api-key.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    WorkspaceModule,
    EmailModule,
    DatabaseModule,
    AuditModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '15m'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, ApiKeyStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
