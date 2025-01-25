import express from "express";
import { Hero } from "./models";

const app = express();


app.get('/', async (req, res) => {
  const heroes = await Hero.findAll();
  res.json(heroes);
  });
export default app;