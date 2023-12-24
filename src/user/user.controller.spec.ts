import { Test, TestingModule } from "@nestjs/testing";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { HttpException, HttpStatus } from "@nestjs/common";

describe("UserController", () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockImplementation((dto: UserDto) => Promise.resolve({ id: 1, ...dto })),
            findAll: jest.fn().mockImplementation(() => Promise.resolve([new User()])),
            findOne: jest.fn().mockImplementation(() => Promise.resolve(new User())),
            update: jest.fn().mockImplementation((id: number, dto: UserDto) => Promise.resolve({ id, ...dto })),
            remove: jest.fn().mockImplementation(() => Promise.resolve({ deleted: true }))
          }
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it("should Create new user", () => {
    const dto: UserDto = { name: "Test", gender: "male" };
    const user = new User();
    user.id = 1;
    user.name = dto.name;
    user.gender = dto.gender;

    const result = controller.create(dto);
    expect(result).resolves.toEqual(user);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it("should get user list", () => {
    const user = new User();
    const result = controller.findAll();
    expect(result).resolves.toEqual([user]);
  });

  it("should get user by id", () => {
    const user = new User();
    const result = controller.findOne(String(1));
    expect(result).resolves.toEqual(user);
  });

  it("should get user by id - error", async () => {
    const exception = new HttpException("Not found", HttpStatus.NOT_FOUND);
    const spy = jest.spyOn(service, "findOne").mockRejectedValueOnce(exception);

    await expect(controller.findOne(String(1))).rejects.toThrow(exception);
    expect(spy).toBeCalledTimes(1);
  });

  it("should update user", () => {
    const dto: UserDto = { name: "Test", gender: "female" };
    const user = new User();
    user.id = 1;
    user.name = dto.name;
    user.gender = dto.gender;
    const result = controller.update(String(1), user);
    expect(result).resolves.toEqual(user);
  });

  it("should delete user", () => {
    const result = controller.remove(String(1));
    expect(result).resolves.toEqual({ deleted: true });
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
