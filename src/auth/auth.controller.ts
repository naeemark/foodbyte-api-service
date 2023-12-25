import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthDto } from "./dto/auth.dto";

@Controller({ version: "1", path: "auth" })
@ApiTags("1 - Auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createToken(@Body() dto: AuthDto) {
    return await this.authService.createToken(dto);
  }

  @ApiBearerAuth()
  @Get("verify")
  verifyToken() {
    return { valid: true };
  }
}
