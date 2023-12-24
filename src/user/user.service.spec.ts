import { Test, TestingModule } from "@nestjs/testing";

import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it("should Create new user", () => {
    const dto: UserDto = { name: "Test", gender: "female" };
    const user = new User();
    user.id = 1;
    user.name = dto.name;
    user.gender = dto.gender;
    jest.spyOn(repository, "save").mockImplementation(() => Promise.resolve(user));

    service.create(dto).then((result) => {
      expect(result).toEqual(user);
    });
  });

  it("should get user list", () => {
    const user = new User();
    jest.spyOn(repository, "find").mockImplementation(() => Promise.resolve([user]));

    service.findAll().then((result) => {
      expect(result.length).toEqual([user].length);
      expect(result).toEqual([user]);
    });
  });

  it("should get user by id", () => {
    const user = new User();
    jest.spyOn(repository, "findOneOrFail").mockImplementation(() => Promise.resolve(user));
    service.findOne(1).then((result) => {
      expect(result).toEqual(user);
    });
  });

  it("should get user by id - error", () => {
    jest.spyOn(repository, "findOneOrFail").mockImplementation(() => Promise.reject(new Error()));
    service.findOne(1).catch((error) => {
      expect(error).toBeInstanceOf(Error);
    });
  });

  it("should update user", () => {
    const dto: UserDto = { name: "Test", gender: "male" };
    const user = new User();
    user.id = 1;
    user.name = dto.name;
    user.gender = dto.gender;

    jest.spyOn(repository, "update").mockImplementation(() => Promise.resolve(null));
    jest.spyOn(repository, "findOneOrFail").mockImplementation(() => Promise.resolve(user));

    service.update(1, dto).then((result) => {
      expect(result).toEqual(user);
    });
  });

  it("should delete user", () => {
    jest.spyOn(repository, "delete").mockImplementation(() => Promise.resolve(null));
    service.remove(1).then((result) => {
      expect(result).toEqual({ deleted: true });
    });
  });

  it("should delete user - error", () => {
    jest.spyOn(repository, "delete").mockImplementation(() => Promise.reject(new Error()));
    service.remove(1).catch((result) => {
      expect(result.deleted).toEqual(false);
    });
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
