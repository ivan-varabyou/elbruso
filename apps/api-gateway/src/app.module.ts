import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { GatewayModule } from './gateway/gateway.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuditModule } from './modules/audit/audit.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlocksModule } from './modules/blocks/blocks.module';

// Reference Data Modules
import { CountriesModule } from './modules/countries/countries.module';

// Infrastructure Modules
import { EmailModule } from './modules/email/email.module';
import { EventsModule } from './modules/events/events.module';
import { IndicatorsModule } from './modules/indicators/indicators.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { PagesModule } from './modules/pages/pages.module';
import { RegionsModule } from './modules/regions/regions.module';
import { SeasonsModule } from './modules/seasons/seasons.module';
import { SportsModule } from './modules/sports/sports.module';
import { TablesModule } from './modules/tables/tables.module';
import { UsersModule } from './modules/users/users.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';

// Admin Module

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    DatabaseModule,
    AuthModule,
    AdminModule,
    UsersModule,
    WorkspaceModule,
    PagesModule,
    BlocksModule,
    TablesModule,
    AuditModule,
    EmailModule,
    GatewayModule,

    // Reference Data Modules
    RegionsModule,
    SportsModule,
    IndicatorsModule,
    SeasonsModule,
    EventsModule,
    OrganizationsModule,
    CountriesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
