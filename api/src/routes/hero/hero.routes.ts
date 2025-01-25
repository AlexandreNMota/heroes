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

router.put("/:id", async (req: Request, res: Response)=>{
    await heroController.update(req,res);
});

router.delete("/:id", async (req: Request, res: Response)=>{
    await heroController.delete(req,res);
});

export default router;
