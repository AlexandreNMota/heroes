import { HeroRepository } from "../../../src/repositories/hero/hero.repository";
import { Hero } from "../../../src/models";
import { RepositoryError } from "../../../src/utils/base-repository-error";
import { FindOptions } from "sequelize";
import { HeroCreationAttributes } from "../../../src/entities/hero.entity";

jest.mock("../../../src/models", () => ({
  Hero: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
}));

let heroRepository: HeroRepository;

beforeEach(() => {
  jest.clearAllMocks();
  heroRepository = new HeroRepository();
});

describe("HeroRepository", () => {
  describe("[findAll]", () => {
    it("Should return error", async () => {
      (Hero.findAll as jest.Mock).mockRejectedValue(
        new RepositoryError("Erro ao buscar todos os registros.")
      );

      await expect(heroRepository.findAll()).rejects.toThrow(RepositoryError);
      await expect(heroRepository.findAll()).rejects.toThrow(
        "Erro ao buscar todos os registros."
      );
    });

    it("should return a list of heroes", async () => {
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
      (Hero.findAll as jest.Mock).mockResolvedValue(heroes);

      const result = await heroRepository.findAll();

      expect(result).toEqual(heroes);
      expect(Hero.findAll).toHaveBeenCalledTimes(1);
      expect(Hero.findAll).toHaveBeenCalledWith(undefined);
    });
  });

  describe("[findById]", () => {
    it("Should return error", async () => {
      (Hero.findByPk as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await expect(
        heroRepository.findById("e314636e-1ca6-4925-a0e7-da5eb5ae2403")
      ).rejects.toThrow(RepositoryError);
      await expect(
        heroRepository.findById("e314636e-1ca6-4925-a0e7-da5eb5ae2403")
      ).rejects.toThrow(
        "Erro ao buscar registro com ID: e314636e-1ca6-4925-a0e7-da5eb5ae2403"
      );
    });

    it("should return a hero when found", async () => {
      const hero = {
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
      } as unknown as Hero;
      (Hero.findByPk as jest.Mock).mockResolvedValue(hero);

      const result = await heroRepository.findById(hero.id!);

      expect(result).toEqual(hero);
      expect(Hero.findByPk).toHaveBeenCalledTimes(1);
      expect(Hero.findByPk).toHaveBeenCalledWith(hero.id, undefined);
    });

    it("should return null when hero is not found", async () => {
      (Hero.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await heroRepository.findById("non-existent-id");

      expect(result).toBeNull();
      expect(Hero.findByPk).toHaveBeenCalledTimes(1);
      expect(Hero.findByPk).toHaveBeenCalledWith("non-existent-id", undefined);
    });
  });

  describe("[findOne]", () => {
    it("Should return error", async () => {
      (Hero.findOne as jest.Mock).mockRejectedValue(
        new RepositoryError("Erro ao buscar um registro.")
      );

      await expect(heroRepository.findOne()).rejects.toThrow(RepositoryError);
      await expect(heroRepository.findOne()).rejects.toThrow(
        "Erro ao buscar um registro."
      );
    });
    it("should return a hero when found", async () => {
      const hero = {
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
      } as unknown as Hero;
      (Hero.findOne as jest.Mock).mockResolvedValue(hero);

      const options: FindOptions = { where: { nickname: "Hulk" } };
      const result = await heroRepository.findOne(options);

      expect(result).toEqual(hero);
      expect(Hero.findOne).toHaveBeenCalledTimes(1);
      expect(Hero.findOne).toHaveBeenCalledWith(options);
    });
  });

  describe("[create]", () => {
    const heroData = {
      name: "Tony Stark",
      nickname: "Iron Man",
      date_of_birth: new Date("1970-05-29 00:00:00").toISOString(),
      universe: "Marvel",
      main_power: "Genius-level intellect",
      avatar_url:
        "https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg",
    } as unknown as HeroCreationAttributes;

    it("Should return error", async () => {
      (Hero.create as jest.Mock).mockRejectedValue(
        new RepositoryError("Erro ao criar registro.")
      );

      await expect(heroRepository.create(heroData)).rejects.toThrow(
        RepositoryError
      );
      await expect(heroRepository.create(heroData)).rejects.toThrow(
        "Erro ao criar registro."
      );
    });

    it("should create a hero successfully", async () => {
      const createdHero = {
        id: "e314636e-1ca6-4925-a0e7-da5eb5ae2403",
        ...heroData,
        created_at: new Date("2024-09-18 21:41:43").toISOString(),
        updated_at: new Date("2024-09-18 21:41:43").toISOString(),
        is_active: true,
      } as unknown as Hero;

      (Hero.create as jest.Mock).mockResolvedValue(createdHero);

      const result = await heroRepository.create(heroData);

      expect(result).toEqual(createdHero);
      expect(Hero.create).toHaveBeenCalledTimes(1);
      expect(Hero.create).toHaveBeenCalledWith(heroData, undefined);
    });
  });

  describe("[update]", () => {
    it("Should return error", async () => {
      (Hero.update as jest.Mock).mockRejectedValue(
        new Error("Erro de banco de dados")
      );

      await expect(
        heroRepository.update({ name: "Novo Nome" }, { where: { id: 1 } })
      ).rejects.toThrow(RepositoryError);
    });

    it("Should update hero and return affected count", async () => {
      (Hero.update as jest.Mock).mockResolvedValue([1]);

      const affectedCount = await heroRepository.update(
        { name: "Novo Nome" },
        { where: { id: 1 } }
      );

      expect(affectedCount).toBe(1);
      expect(Hero.update).toHaveBeenCalledWith(
        { name: "Novo Nome" },
        { where: { id: 1 } }
      );
    });
  });

  describe("[count]", () => {
    it("Should return error", async () => {
      (Hero.count as jest.Mock).mockRejectedValue(
        new RepositoryError("Erro ao contar os registros.")
      );

      await expect(heroRepository.count()).rejects.toThrow(RepositoryError);
      await expect(heroRepository.count()).rejects.toThrow(
        "Erro ao contar os registros."
      );
    });

    it("Should return the count", async () => {
      const mockCountResult = 10;

      (Hero.count as jest.Mock).mockResolvedValue(mockCountResult);

      const result = await heroRepository.count();
      expect(result).toBe(mockCountResult);
    });
  });
});
