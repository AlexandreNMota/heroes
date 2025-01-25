import { Router, Request, Response } from "express";
import { heroController } from "../../controllers/heroes/hero.controller";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    await heroController.findAll(req, res);
});

export default router;
