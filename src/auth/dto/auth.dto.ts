import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from "joi";

@JoiSchemaOptions({
  allowUnknown: false
})
export class AuthDto {
  @ApiProperty({ example: "this-is-a-secret" })
  @JoiSchema(Joi.string().required())
  secret?: string;
}
