import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { writeFileSync } from "fs";
import { join } from "path";

import { AppModule } from "../apps/api-gateway/src/app.module";

async function generateSwagger() {
  const app = await NestFactory.create(AppModule, { logger: false });

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Elbruso API")
    .setDescription("BI System REST API Documentation")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth",
    )
    .addApiKey(
      {
        type: "apiKey",
        name: "X-API-Key",
        in: "header",
        description: "API Key for agent authentication",
      },
      "API-Key",
    )
    .addTag("Authentication", "Authentication and session management")
    .addTag("Users", "User profile and account management")
    .addTag("Workspaces", "Workspace organization and permissions")
    .addTag("Workspace Groups", "Logical grouping of items within workspaces")
    .addTag("Pages", "Dashboard and report pages")
    .addTag("Blocks", "Content blocks within pages")
    .addTag("Dynamic Tables", "Spreadsheet-like dynamic tables with formulas")
    .addTag("Sports", "Catalog of sports and disciplines")
    .addTag("Seasons", "Athletic seasons and time periods")
    .addTag("Regions", "Geographic regions and districts")
    .addTag("Organizations", "Sports organizations and federations")
    .addTag("Events", "Catalog of sports events and competitions")
    .addTag("Indicator Groups", "Groups of performance indicators")
    .addTag("Indicators", "Performance indicator catalog")
    .addTag("Charts", "Data visualization and charting")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  const outputPath = join(__dirname, "../swagger.json");
  writeFileSync(outputPath, JSON.stringify(document, null, 2));

  console.log(`✅ Swagger.json generated at: ${outputPath}`);

  await app.close();
}

generateSwagger().catch(console.error);
