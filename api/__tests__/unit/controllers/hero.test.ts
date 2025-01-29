import { jest } from "@jest/globals";
import { HeroController } from "../../../src/controllers/heroes/hero.controller";
import { Request, Response } from "express";
import { HeroService } from "../../../src/services/hero/hero.service";
import { Hero } from "../../../src/models";
import sequelize from "../../../src/config/database";

jest.useFakeTimers();
let controller: HeroController;
let heroService: jest.Mocked<HeroService> & { repository: jest.Mocked<any> };

let res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

afterAll(async () => {
  await sequelize.close();
});
beforeEach(() => {
  jest.clearAllMocks();
  jest.setTimeout(10000);
  heroService = {
    findAll: jest.fn(),
    findAllHeroes: jest.fn(),
    create: jest.fn(),
    updateHero: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    repository: {
      findOne: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  } as unknown as jest.Mocked<HeroService> & { repository: jest.Mocked<any> };

  controller = new HeroController();
  controller["heroService"] = heroService;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Hero Controller", () => {
  describe("[findAll]", () => {
    let req = {
      query: {
        page: 1,
        search: "Bruce",
      },
    } as unknown as Request;

    it("Should return error", async () => {
      jest
        .spyOn(heroService, "findAllHeroes")
        .mockRejectedValueOnce(new Error("Erro ao carregar heroes"));

      await controller.findAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao carregar heroes",
        error: expect.any(Error),
      });
    });

    it("Should return status 200", async () => {
      jest.spyOn(heroService, "findAllHeroes").mockResolvedValueOnce({
        heroes: [],
        totalHeroes: 0,
      });

      await controller.findAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("Should return an expected json", async () => {
      jest.spyOn(heroService, "findAllHeroes").mockResolvedValueOnce({
        heroes: [
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
        ],
        totalHeroes: 1,
      });

      await controller.findAll(req, res);

      expect(res.json).toHaveBeenCalledWith({
        heroes: [
          {
            id: "e314636e-1ca6-4925-a0e7-da5eb5ae2403",
            name: "Robert Bruce Banner",
            nickname: "Hulk",
            date_of_birth: "1962-04-10T03:00:00.000Z",
            universe: "Marvel",
            main_power: "Force",
            avatar_url:
              "https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg",
            is_active: true,
            created_at: "2024-09-19T00:41:43.000Z",
            updated_at: "2024-09-19T00:41:43.000Z",
          },
        ],
        totalHeroes: 1,
        currentPage: 1,
        totalPages: 1,
      });
    });

    it("Should return success and expected json when no query parameters are passed", async () => {
      req = {
        query: {},
      } as unknown as Request;

      jest.spyOn(heroService, "findAllHeroes").mockResolvedValueOnce({
        heroes: [
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
        ],
        totalHeroes: 1,
      });

      await controller.findAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        heroes: [
          {
            id: "e314636e-1ca6-4925-a0e7-da5eb5ae2403",
            name: "Robert Bruce Banner",
            nickname: "Hulk",
            date_of_birth: "1962-04-10T03:00:00.000Z",
            universe: "Marvel",
            main_power: "Force",
            avatar_url:
              "https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg",
            is_active: true,
            created_at: "2024-09-19T00:41:43.000Z",
            updated_at: "2024-09-19T00:41:43.000Z",
          },
        ],
        totalHeroes: 1,
        currentPage: 1,
        totalPages: 1,
      });
    });
  });

  describe("[create]", () => {
    let req = {
      body: {
        name: "teste",
        nickname: "teste",
        main_power: "FORÇA",
        universe: "DC",
        date_of_birth: "1993-11-19T02:00:00.000Z",
        avatar_url: "https://i.imgur.com/558s1Wc.jpeg",
      },
    } as unknown as Request;

    it("Should return an error", async () => {
      jest
        .spyOn(heroService, "create")
        .mockRejectedValueOnce(new Error("Erro ao criar herói"));

      await controller.create(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao criar herói",
        error: expect.any(Error),
      });
    });

    it("Should return status 201 and created hero", async () => {
      jest.spyOn(heroService, "create").mockResolvedValueOnce({
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
      } as unknown as Hero);

      await controller.create(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
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
      });
    });
  });

  describe("[update]", () => {
    let req = {
      body: {
        name: "teste",
        nickname: "teste",
        main_power: "FORÇA",
        universe: "DC",
        date_of_birth: "1993-11-19T02:00:00.000Z",
        avatar_url: "https://i.imgur.com/558s1Wc.jpeg",
        is_active: true,
      },
      params: {
        id: "f86bdec4-7047-4d73-a884-f7fce2c110c3",
      },
    } as unknown as Request;

    it("Should return an error", async () => {
      jest
        .spyOn(heroService, "updateHero")
        .mockRejectedValueOnce(new Error("Erro ao editar herói"));

      await controller.update(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao atualizar herói",
        error: expect.any(Error),
      });
    });

    it("Should return status 200 and updated hero", async () => {
      jest.spyOn(heroService, "updateHero").mockResolvedValueOnce({
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
      } as unknown as Hero);

      await controller.update(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
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
      });
    });
  });

  describe("[delete]", () => {
    let req = {
      params: {
        id: "f86bdec4-7047-4d73-a884-f7fce2c110c3",
      },
    } as unknown as Request;

    it("Should return an error", async () => {
      jest
        .spyOn(heroService, "updateHero")
        .mockRejectedValueOnce(new Error("Erro ao editar herói"));

      await controller.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao deletar herói",
        error: expect.any(Error),
      });
    });

    it("Should return status 200 and deleted hero", async () => {
      jest.spyOn(heroService, "updateHero").mockResolvedValueOnce({
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
      } as unknown as Hero);

      await controller.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
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
      });
    });
  });
});
