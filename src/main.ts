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
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 }
  });

  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
  console.log(`App started on: ${(await app.getUrl()).replace("[::1]", "localhost")}`);
  console.log(`See Docs: ${(await app.getUrl()).replace("[::1]", "localhost")}/api-docs`);
}
bootstrap();
