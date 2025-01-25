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
            const offset = (page - 1) * limit;

            const heroes = await this.heroService.findAll({
                order: [['created_at', 'DESC']],
                limit: limit,
                offset: offset
            });
            
            return res.status(200).json(heroes);
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

            const hero = await this.heroService.findById(id);


            if (!hero) {
                return res.status(404).json({ message: "Herói não encontrado." });
            }

            const options = {
                where: {
                    id: id
                }
            };
            

            const updated_records = await this.heroService.update(req.body, options);

            if (updated_records === 0) {
                return res.status(404).json({ message: "Nenhum herói encontrado ou alterações não feitas." });
            }

            const updated_hero = await this.heroService.findById(id);
            return res.status(200).json(updated_hero);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar herói", error });
        }
    }

    delete = async (req: Request, res: Response) =>{
        try {
            const { id } = req.params;
            const options = {
                where: {
                    id: id
                }
            };
            const deleted_records = await this.heroService.update(
                { is_active : false},
                options
            );

            if (deleted_records === 0) {
                return res.status(404).json({ message: "Nenhum herói encontrado ou alterações não feitas." });
            }
            return res.status(200).json("Registro inativo");

        } catch (error){
            console.error(error);
            return res.status(500).json({ message: "Erro ao deletar herói", error });
        }
    }
}

export const heroController = new HeroController();
