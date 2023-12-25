import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}

  async createToken(secret: string) {
    const jwtSecret = this.configService.get<string>("JWT_SECRET");
    if (secret !== jwtSecret) {
      throw new UnauthorizedException();
    }
    const payload = { serviceName: this.configService.get<string>("SERVICE_NAME") };
    return {
      accessToken: await this.jwtService.signAsync(payload)
    };
  }
}
