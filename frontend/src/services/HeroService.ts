import { Hero } from "../@types/hero";
import { HeroResponse } from "../@types/hooks/useFetch";
import { AxiosService } from "./AxiosService";

export class HeroService extends AxiosService {
  constructor() {
    super("http://127.0.0.1:3000/heroes");
  }

  public async getAllHeroes(
    page?: number,
    search?: string
  ): Promise<HeroResponse> {
    const params = new URLSearchParams();

    if (page !== undefined) {
      params.append("page", page.toString());
    }
    if (search) {
      params.append("search", search);
    }
    const url = params.toString() ? `/?${params.toString()}` : "/";
    return this.get(url);
  }

  public async getHeroById(id: string): Promise<Hero> {
    return this.get(`/${id}`);
  }

  public async createHero(data: Hero): Promise<Hero> {
    return this.post("/", data);
  }

  public async updateHero(id: string, data: Partial<Hero>): Promise<Hero> {
    return this.put(`/${id}`, data);
  }

  public async deleteHero(id: string): Promise<void> {
    return this.delete(`/${id}`);
  }
}
