import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from "joi";

@JoiSchemaOptions({
  allowUnknown: false
})
export class UserDto {
  @ApiProperty({ example: "John Doe" })
  @JoiSchema(Joi.string().required())
  name?: string;

  @ApiProperty({ default: "male", enum: ["male", "female"] })
  @JoiSchema(
    Joi.string()
      .lowercase()
      .valid(...["male", "female"])
  )
  gender?: string;
}
