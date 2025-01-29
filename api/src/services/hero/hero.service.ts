import { Op, UpdateOptions } from "sequelize";
import { Hero } from "../../models";
import { HeroRepository } from "../../repositories/hero/hero.repository";
import { BaseService } from "../base.service";
import { HeroAttributes } from "../../entities/hero.entity";
import { ServiceError } from "../../utils/base-service-error";

export class HeroService extends BaseService<Hero> {
  private heroRepository: HeroRepository;
  private static heroRepositoryInstance: HeroRepository;
  constructor(heroRepository?: HeroRepository) {
    super(heroRepository || HeroService.getHeroRepository());
    this.heroRepository = heroRepository || HeroService.getHeroRepository();
  }

  private static getHeroRepository(): HeroRepository {
    try {
      if (!HeroService.heroRepositoryInstance) {
        HeroService.heroRepositoryInstance = new HeroRepository();
      }
      return HeroService.heroRepositoryInstance;
    } catch (error) {
      console.error("Erro ao instanciar o repositório de heróis:", error);
      throw new Error("RepositoryInitializationError");
    }
  }

  findAllHeroes = async (params: {
    page: number;
    limit: number;
    search: string;
  }) => {
    const { page, limit, search } = params;
    const offset = (page - 1) * limit;
    try {
      const whereConditions: any = {};

      if (search) {
        whereConditions[Op.or] = [
          { name: { [Op.like]: `%${search.toLowerCase()}%` } },
          { nickname: { [Op.like]: `%${search.toLowerCase()}%` } },
        ];
      }

      const totalHeroes = await this.heroRepository.count({
        where: whereConditions,
      });

      const heroes = await this.heroRepository.findAll({
        where: whereConditions,
        order: [["created_at", "DESC"]],
        limit,
        offset,
      });

      if (!heroes) {
        throw new Error("NoHeroesFound");
      }
      return {
        heroes,
        totalHeroes,
      };
    } catch (error) {
      throw new ServiceError("Erro ao buscar todos os registros.");
    }
  };

  updateHero = async (
    payload: Partial<HeroAttributes>,
    options: UpdateOptions,
    id: string
  ): Promise<Hero> => {
    try {
      const hero = await this.heroRepository.findById(id);
      if (!hero) {
        throw new ServiceError("Herói não encontrado.");
      }

      const updated_records = await this.heroRepository.update(
        payload,
        options
      );
      if (updated_records === 0) {
        throw new ServiceError(
          "Nenhum herói encontrado ou alterações não feitas."
        );
      }

      const updated_hero = await this.heroRepository.findById(id);

      if (!updated_hero) {
        throw new Error(
          "Herói atualizado mas não encontrado após atualização."
        );
      }

      return updated_hero;
    } catch (error) {
      console.error(error);
      throw new ServiceError("ServiceError");
    }
  };
}
