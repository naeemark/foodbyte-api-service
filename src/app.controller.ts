import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { Public } from "./auth/decorators/public.decorator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @ApiTags("0 - Health")
  @ApiOperation({ summary: "Check Health" })
  getHealth(): object {
    return this.appService.getHealth();
  }
}
