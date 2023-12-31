import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JoiPipeModule } from "nestjs-joi";
import * as Joi from "joi";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true,  // to use ConfigModule globally
      envFilePath: ".env",
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        SERVICE_NAME: Joi.string().required()
      })
    }),
    JoiPipeModule,
    AuthModule,
    DatabaseModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
