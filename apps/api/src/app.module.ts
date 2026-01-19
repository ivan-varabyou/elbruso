import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { PagesModule } from './pages/pages.module';
import { BlocksModule } from './blocks/blocks.module';
import { WorkspaceGroupsModule } from './workspace-groups/workspace-groups.module';
import { FormulaModule } from './formula/formula.module';
import { DynamicTablesModule } from './dynamic-tables/dynamic-tables.module';
import { AuditModule } from './common/audit/audit.module';

// Reference Data Modules
import { RegionsModule } from './regions/regions.module';
import { SportsModule } from './sports/sports.module';
import { IndicatorsModule } from './indicators/indicators.module';
import { SeasonsModule } from './seasons/seasons.module';
import { IndicatorGroupsModule } from './indicator-groups/indicator-groups.module';
import { EventsModule } from './events/events.module';
import { OrganizationsModule } from './organizations/organizations.module';

import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    DatabaseModule,
    AuthModule,
    UsersModule,
    WorkspacesModule,
    PagesModule,
    BlocksModule,
    WorkspaceGroupsModule,
    FormulaModule,
    DynamicTablesModule,
    AuditModule,

    // Reference Data Modules
    RegionsModule,
    SportsModule,
    IndicatorsModule,
    SeasonsModule,
    IndicatorGroupsModule,
    EventsModule,
    OrganizationsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
