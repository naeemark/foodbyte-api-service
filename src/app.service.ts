import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHealth() {
    return { health: "OK" };
  }
}
