import { Hero } from "../../models";
import { BaseRepository } from "../base.repository";

export class HeroRepository extends BaseRepository<Hero> {
  constructor() {
    super(Hero);
  }
}