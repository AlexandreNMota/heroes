import { Hero } from "../hero";

interface FetchState<T> {
  data: T;
  error: string | null;
  isLoading: boolean;
}

interface HeroResponse {
  heroes: Hero[];
  totalHeroes: number;
  totalPages: number;
  currentPage: number;
}

export { HeroResponse, FetchState };
