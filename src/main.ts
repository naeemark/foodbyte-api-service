import { VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix("api");
  app.enableVersioning({ type: VersioningType.URI });

  const config = new DocumentBuilder()
    .setTitle("Foodbyte API Service")
    .setDescription("REST API Specification for Foodbyte API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 }
  });

  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);

  const appUrl = await app.getUrl();
  console.log(`App started on: ${appUrl}. See Docs: ${appUrl}/api-docs`);
}
bootstrap();
