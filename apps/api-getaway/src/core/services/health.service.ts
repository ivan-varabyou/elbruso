import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';

@Injectable()
export class HealthService {
  constructor(private readonly db: DatabaseService) {}

  async check(): Promise<{
    status: string;
    timestamp: string;
    services: Record<string, any>;
  }> {
    const services: Record<string, any> = {
      database: await this.checkDatabase(),
    };

    const allHealthy = Object.values(services).every(
      (s) => s.status === 'healthy',
    );

    return {
      status: allHealthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      services,
    };
  }

  async liveness(): Promise<{ status: string }> {
    return { status: 'alive' };
  }

  async readiness(): Promise<{ status: string; checks: Record<string, any> }> {
    const checks = {
      database: await this.checkDatabase(),
    };

    const allReady = Object.values(checks).every((c) => c.status === 'healthy');

    return {
      status: allReady ? 'ready' : 'not_ready',
      checks,
    };
  }

  private async checkDatabase(): Promise<{
    status: string;
    latency?: number;
    error?: string;
  }> {
    const start = Date.now();
    try {
      const result = await this.db.client
        .selectFrom('users')
        .select('id')
        .limit(1)
        .executeTakeFirst();
      return {
        status: 'healthy',
        latency: Date.now() - start,
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
