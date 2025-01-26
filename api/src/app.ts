import express from "express";
import cors from "cors";
import heroRoutes from "./routes/hero/hero.routes";
import loggerMiddleware from "./middlewares/logger.middleware";


const app = express();
app.use(express.json());
app.use(cors());
app.use(loggerMiddleware);

app.use("/heroes",heroRoutes);


export default app;