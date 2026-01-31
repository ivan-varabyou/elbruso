import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TransformInterceptor } from './gateway/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './gateway/filters/http-exception.filter';
import { HealthController } from './gateway/controllers/health.controller';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Security Headers with enhanced configuration
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          fontSrc: ["'self'", 'https:', 'data:'],
          formAction: ["'self'"],
          frameAncestors: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          objectSrc: ["'none'"],
          scriptSrc: ["'self'"],
          scriptSrcAttr: ["'none'"],
          styleSrc: ["'self'", 'https:', "'unsafe-inline'"], // Swagger requires unsafe-inline
          upgradeInsecureRequests: [],
        },
      },
      crossOriginEmbedderPolicy: false, // Disable for Swagger compatibility
      crossOriginResourcePolicy: { policy: 'same-origin' },
      crossOriginOpenerPolicy: { policy: 'same-origin' },
      referrerPolicy: { policy: 'no-referrer' },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
    }),
  );

  // Additional security headers
  app.use((req, res, next) => {
    // Permissions Policy (Feature Policy)
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
    );
    next();
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || [
      'http://localhost:7200',
      'http://localhost:7201',
    ],
    credentials: true,
  });

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Elbruso API')
    .setDescription('BI System REST API Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: 'X-API-Key',
        in: 'header',
        description: 'API Key for agent authentication',
      },
      'API-Key',
    )
    .addTag('Authentication', 'Authentication and session management')
    .addTag('Users', 'User profile and account management')
    .addTag('Workspaces', 'Workspace organization and permissions')
    .addTag('Workspace Groups', 'Logical grouping of items within workspaces')
    .addTag('Pages', 'Dashboard and report pages')
    .addTag('Blocks', 'Content blocks within pages')
    .addTag('Dynamic Tables', 'Spreadsheet-like dynamic tables with formulas')
    .addTag('Sports', 'Catalog of sports and disciplines')
    .addTag('Seasons', 'Athletic seasons and time periods')
    .addTag('Regions', 'Geographic regions and districts')
    .addTag('Organizations', 'Sports organizations and federations')
    .addTag('Events', 'Catalog of sports events and competitions')
    .addTag('Indicator Groups', 'Groups of performance indicators')
    .addTag('Indicators', 'Performance indicator catalog')
    .addTag('Charts', 'Data visualization and charting')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 7100;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
