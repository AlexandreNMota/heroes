import { Optional } from "sequelize";
import { BaseAttributes } from "./base.entity";

export interface HeroAttributes extends BaseAttributes {
    name: string;
    nickname:string;
    date_of_birth:Date;
    universe:string;
    main_power:string;
    avatar_url:string;
    
}
  
  
export interface HeroCreationAttributes
extends Optional<HeroAttributes, "id"> {}