import express from "express";
import heroRoutes from "./routes/hero/hero.routes";
import loggerMiddleware from "./middlewares/logger.middleware";


const app = express();
app.use(express.json());

app.use(loggerMiddleware);

app.use("/heroes",heroRoutes);


export default app;