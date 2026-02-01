import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { bootstrap } from './bootstrap';

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await bootstrap(app);
}

main();
