import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";

@Controller({ version: "1", path: "users" })
@ApiTags("Users")
@ApiResponse({ status: 400, description: "Bad Request: validation error!" })
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 201, description: "Created", type: User })
  async create(@Body() dto: UserDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "List all users" })
  @ApiResponse({ status: 200, description: "List of users", type: [User] })
  async findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user by id" })
  @ApiResponse({ status: 200, description: "User found", type: User })
  @ApiResponse({ status: 404, description: "User not found" })
  async findOne(@Param("id") id: string) {
    try {
      return await this.service.findOne(+id);
    } catch (err) {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update user" })
  @ApiResponse({ status: 200, description: "Updated the user", type: User })
  async update(@Param("id") id: string, @Body() dto: UserDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({ status: 200, description: "Deleted the user", type: User })
  async remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
