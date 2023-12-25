import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}

  async createToken(dto: AuthDto) {
    const jwtSecret = this.configService.get<string>("JWT_SECRET");
    if (dto.secret !== jwtSecret) {
      throw new UnauthorizedException();
    }
    const payload = { serviceName: this.configService.get<string>("SERVICE_NAME") };
    return {
      accessToken: await this.jwtService.signAsync(payload)
    };
  }
}
