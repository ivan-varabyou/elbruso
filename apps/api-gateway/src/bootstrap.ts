import { UsersService } from '@modules/users';
import { ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { config } from './config';
import { bootstrapWebsocket } from './gateway/websocket/bootstrap';

export async function bootstrap(app: NestExpressApplication): Promise<void> {
  app.setGlobalPrefix('v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: config.cors.origins,
    credentials: true,
  });

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
          styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
          upgradeInsecureRequests: [],
        },
      },
      crossOriginEmbedderPolicy: false,
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

  app.use((req, res, next) => {
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
    );
    next();
  });

  const swaggerConfig = new DocumentBuilder()
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

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 7100;
  await app.listen(port);

  console.log(`🚀 Application running on: http://localhost:${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);

  const jwtService = app.get(JwtService);
  const usersService = app.get(UsersService);
  bootstrapWebsocket(jwtService, usersService);
}
