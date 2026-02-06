import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { DatabaseModule } from '@database/database.module';
import { GatewayModule } from './core/gateway.module';

// Backend Modules
import { AdminModule } from '@backend/modules/admin/admin.module';
import { AuditModule } from '@backend/modules/audit/audit.module';
import { AuthModule } from '@backend/modules/auth/auth.module';
import { BlocksModule } from '@backend/modules/blocks/blocks.module';

// Reference Data Modules
import { CountriesModule } from '@backend/modules/countries/countries.module';

// Infrastructure Modules
import { EmailModule } from '@backend/modules/email/email.module';
import { EventsModule } from '@backend/modules/events/events.module';
import { IndicatorsModule } from '@backend/modules/indicators/indicators.module';
import { OrganizationsModule } from '@backend/modules/organizations/organizations.module';
import { PagesModule } from '@backend/modules/pages/pages.module';
import { RegionsModule } from '@backend/modules/regions/regions.module';
import { SeasonsModule } from '@backend/modules/seasons/seasons.module';
import { SportsModule } from '@backend/modules/sports/sports.module';
import { TablesModule } from '@backend/modules/tables/tables.module';
import { UsersModule } from '@backend/modules/users/users.module';
import { WorkspaceModule } from '@backend/modules/workspace/workspace.module';

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
