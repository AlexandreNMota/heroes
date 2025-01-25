import { Op } from "sequelize";
import { Hero } from "../../models";
import { HeroRepository } from "../../repositories/hero/hero.repository";
import { BaseService } from "../base.service";

export class HeroService extends BaseService<Hero> {
    private static heroRepositoryInstance: HeroRepository;

    constructor() {
        super(HeroService.getHeroRepository());
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

    findAll = async (params: { page: number; limit: number; search: string }) => {
        const { page, limit, search } = params;
        const offset = (page - 1) * limit;
        try{        
            const whereConditions: any = {};
        
            if (search) {
                whereConditions[Op.or] = [
                    { name: { [Op.like]: `%${search.toLowerCase()}%` } },
                    { nickname: { [Op.like]: `%${search.toLowerCase()}%` } },
                ];
            }
        
            const heroes =  this.repository.findAll({
                where: whereConditions,
                order: [['created_at', 'DESC']],
                limit,
                offset,
            });

            if (!heroes) {
                throw new Error('NoHeroesFound');
            }
            return heroes;
        } catch (error){
            console.error("Erro no serviço ao buscar heróis:", error);
            throw new Error('ServiceError');
        }
    }
}