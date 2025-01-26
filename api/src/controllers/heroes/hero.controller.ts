import { Request, Response } from "express";
import { HeroService } from "../../services/hero/hero.service";

class HeroController {
    private heroService: HeroService;

    constructor() {
        this.heroService = new HeroService();
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = 10;
            const search = req.query.search as string || '';

            const { heroes, totalHeroes } = await this.heroService.findAllHeroes({ page, limit, search });
            console.log(heroes);
            return res.status(200).json({
                heroes,
                totalHeroes,
                totalPages: Math.ceil(totalHeroes / limit),
                currentPage: page
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao carregar heroes", error });
        }
    };

    create = async ( req: Request, res: Response) => {
        try {
            const created_heroe = await this.heroService.create(req.body);
            return res.status(201).json(created_heroe);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar herói", error });
        }
    };

    update = async (req : Request, res: Response) => {
        try {
            const { id } = req.params;

            const updated_hero = await this.heroService.updateHero(req.body,{ where: { id: id } }, id);
            
            return res.status(200).json(updated_hero);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar herói", error });
        }
    }

    delete = async (req: Request, res: Response) =>{
        try {
            const { id } = req.params;
            const updated_hero = await this.heroService.updateHero({"is_active":false},{ where: { id: id } }, id);
            
            return res.status(200).json(updated_hero);

        } catch (error){
            console.error(error);
            return res.status(500).json({ message: "Erro ao deletar herói", error });
        }
    }
}

export const heroController = new HeroController();
