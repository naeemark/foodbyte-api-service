import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  async create(dto: UserDto): Promise<User> {
    return await this.repository.save(dto);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.repository.findOneOrFail({ where: { id } });
  }

  async findOneByName(name: string): Promise<User> {
    return await this.repository.findOneOrFail({ where: { name } });
  }

  async update(id: number, dto: UserDto) {
    await this.repository.update({ id }, dto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.repository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
