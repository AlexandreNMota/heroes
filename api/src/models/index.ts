import sequelize from "../config/database";
import { Hero } from "./hero/hero.model";

Hero.init(Hero.getAttributes(), { sequelize });

export { Hero };
