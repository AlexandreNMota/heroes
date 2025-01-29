import { jest } from "@jest/globals";
import { HeroRepository } from "../../../src/repositories/hero/hero.repository";
import { HeroService } from "../../../src/services/hero/hero.service";
import sequelize from "../../../src/config/database";
import { ServiceError } from "../../../src/utils/base-service-error";
import { Hero } from "../../../src/models";
import { UpdateOptions } from "sequelize";

jest.useFakeTimers();
let service: HeroService;
let heroRepository: jest.Mocked<HeroRepository>;

afterAll(async () => {
  await sequelize.close();
});

beforeEach(() => {
  jest.clearAllMocks();
  jest.setTimeout(10000);

  heroRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  } as unknown as jest.Mocked<HeroRepository>;

  service = new HeroService(heroRepository);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Hero Service", () => {
  describe("[findAllHeroes]", () => {
    it("Should return error", async () => {
      jest
        .spyOn(heroRepository, "findAll")
        .mockRejectedValueOnce(
          new ServiceError("Erro ao buscar todos os registros.")
        );

      await expect(
        service.findAllHeroes({ page: 1, limit: 10, search: "" })
      ).rejects.toThrow(ServiceError);

      await expect(
        service.findAllHeroes({ page: 1, limit: 10, search: "" })
      ).rejects.toThrow("Erro ao buscar todos os registros.");
    });
    it("Should return an object with array of heroes and the totalHeroes count", async () => {
      const heroes = [
        {
          id: "e314636e-1ca6-4925-a0e7-da5eb5ae2403",
          name: "Robert Bruce Banner",
          nickname: "Hulk",
          date_of_birth: new Date("1962-04-10 00:00:00").toISOString(),
          universe: "Marvel",
          main_power: "Force",
          avatar_url:
            "https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg",
          is_active: true,
          created_at: new Date("2024-09-18 21:41:43").toISOString(),
          updated_at: new Date("2024-09-18 21:41:43").toISOString(),
        } as unknown as Hero,
      ];
      jest.spyOn(heroRepository, "findAll").mockResolvedValueOnce(heroes);
      jest.spyOn(heroRepository, "count").mockResolvedValueOnce(1);

      await expect(
        service.findAllHeroes({ page: 1, limit: 10, search: "" })
      ).resolves.toEqual({ heroes, totalHeroes: 1 });
    });
    it("Should return an object with array of heroes and the totalHeroes count when searched", async () => {
      const heroes = [
        {
          id: "e314636e-1ca6-4925-a0e7-da5eb5ae2403",
          name: "Robert Bruce Banner",
          nickname: "Hulk",
          date_of_birth: new Date("1962-04-10 00:00:00").toISOString(),
          universe: "Marvel",
          main_power: "Force",
          avatar_url:
            "https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg",
          is_active: true,
          created_at: new Date("2024-09-18 21:41:43").toISOString(),
          updated_at: new Date("2024-09-18 21:41:43").toISOString(),
        } as unknown as Hero,
      ];
      jest.spyOn(heroRepository, "findAll").mockResolvedValueOnce(heroes);
      jest.spyOn(heroRepository, "count").mockResolvedValueOnce(1);

      await expect(
        service.findAllHeroes({ page: 1, limit: 10, search: "Hulk" })
      ).resolves.toEqual({ heroes, totalHeroes: 1 });
    });
  });

  describe("[create]", () => {
    const payload = {
      name: "Robert Bruce Banner",
      nickname: "Hulk",
      date_of_birth: new Date("1962-04-10").toISOString(),
      universe: "Marvel",
      main_power: "Force",
      avatar_url:
        "https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg",
      is_active: true,
    };
    it("Should return error when creating hero", async () => {
      jest
        .spyOn(heroRepository, "create")
        .mockRejectedValueOnce(new ServiceError("Erro ao criar registro."));

      await expect(service.create(payload as unknown as Hero)).rejects.toThrow(
        "Erro ao criar registro."
      );
    });

    it("Should return the created Hero", async () => {
      const created_hero = {
        id: "f86bdec4-7047-4d73-a884-f7fce2c110c3",
        is_active: true,
        name: "aLEXANDRE",
        nickname: "aLEXANDRE",
        main_power: "aLEXANDRE",
        universe: "aLEXANDRE",
        date_of_birth: new Date("1993-11-19T02:00:00.000Z"),
        avatar_url: "https://i.imgur.com/558s1Wc.jpeg",
        updated_at: new Date("2025-01-28T23:15:41.129Z"),
        created_at: new Date("2025-01-28T23:15:41.129Z"),
      } as unknown as Hero;

      jest.spyOn(heroRepository, "create").mockResolvedValueOnce(created_hero);
      const result = await service.create(payload as unknown as Hero);
      expect(result).toEqual(created_hero);
    });
  });

  describe("[updateHero]", () => {
    const payload = {
      is_active: false,
    };
    const id = "f86bdec4-7047-4d73-a884-f7fce2c110c3";
    const updated_hero = {
      id: "f86bdec4-7047-4d73-a884-f7fce2c110c3",
      is_active: false,
      name: "aLEXANDRE",
      nickname: "aLEXANDRE",
      main_power: "aLEXANDRE",
      universe: "aLEXANDRE",
      date_of_birth: new Date("1993-11-19T02:00:00.000Z"),
      avatar_url: "https://i.imgur.com/558s1Wc.jpeg",
      updated_at: new Date("2025-01-28T23:15:41.129Z"),
      created_at: new Date("2025-01-28T23:15:41.129Z"),
    } as unknown as Hero;

    it("Should return error when updating hero", async () => {
      jest
        .spyOn(heroRepository, "update")
        .mockRejectedValueOnce(new ServiceError("ServiceError"));

      await expect(
        service.updateHero(
          payload as unknown as Hero,
          {} as unknown as UpdateOptions<any>,
          id
        )
      ).rejects.toThrow(ServiceError);
      await expect(
        service.updateHero(
          payload as unknown as Hero,
          {} as unknown as UpdateOptions<any>,
          id
        )
      ).rejects.toThrow("ServiceError");
    });

    it("Should return the updated hero", async () => {
      jest.spyOn(heroRepository, "update").mockResolvedValueOnce(1);

      jest.spyOn(heroRepository, "findById").mockResolvedValue(updated_hero);

      const result = await service.updateHero(
        payload as unknown as Hero,
        {} as unknown as UpdateOptions<any>,
        id
      );
      expect(result).toEqual(updated_hero);
    });
  });
});
