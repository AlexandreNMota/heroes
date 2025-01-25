import express from "express";
import heroRoutes from "./routes/hero/hero.routes";


const app = express();


app.use("/heroes",heroRoutes);


export default app;