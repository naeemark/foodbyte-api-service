import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";

@Controller({ version: "1", path: "auth" })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createToken(@Body() dto: Record<string, any>) {
    return this.authService.createToken(dto.secret);
  }

  @Get("verify")
  verifyToken() {
    return { valid: true };
  }
}
