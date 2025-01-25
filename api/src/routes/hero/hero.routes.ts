import { Router, Request, Response } from "express";
import { heroController } from "../../controllers/heroes/hero.controller";
import { validateRequestBody } from "../../middlewares/validate-request-body.middleware";
import { HeroSchema } from "../../schemas/hero.schema";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    await heroController.findAll(req, res);
});

router.post("/",validateRequestBody(HeroSchema), async (req: Request, res: Response)=>{
    await heroController.create(req,res);
});

export default router;
