import { Request, Response } from "express";
import { Hero } from "../../models";
import { HeroService } from "../../services/hero/hero.service";

class HeroController {
    private heroService: HeroService;

    constructor() {
        this.heroService = new HeroService();
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const heroes = await this.heroService.findAll();
            return res.status(200).json(heroes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao carregar heroes", error });
        }
    };

    create = async ( req: Request, res: Response) => {
        try {
            const created_heroe = await this.heroService.create(req.body);
            return res.status(200).json(created_heroe);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar herói", error });
        }
    };
}

export const heroController = new HeroController();
