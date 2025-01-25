import { Hero } from "../../models";
import { HeroRepository } from "../../repositories/hero/hero.repository";
import { BaseService } from "../base.service";

export class HeroService extends BaseService<Hero> {
    private static heroRepositoryInstance: HeroRepository;

    constructor() {
        super(HeroService.getHeroRepository());
    }
    private static getHeroRepository(): HeroRepository {
        if (!HeroService.heroRepositoryInstance) {
            HeroService.heroRepositoryInstance = new HeroRepository();
        }
        return HeroService.heroRepositoryInstance;
    }
}