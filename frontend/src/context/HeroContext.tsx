import React, { createContext, ReactNode, useState } from "react";
import { Hero } from "../@types/hero";
import { HeroService } from "../services/HeroService";
import { HeroResponse, useFetch } from "../hooks/useFetch";

interface HeroContextProps {
  heroes: Hero[];
  isLoading: boolean;
  error: string | null;
  page: number;
  search: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  handleNext: () =>void;
  handlePrevious: () =>void;
  totalPages: number;
  totalHeroes: number;
  currentPage: number;
  inputSearch:string;
  handleSearch:()=>void;
  setInputSearch: (inputSearch: string) => void;
  handleCreateHero: (heroData: Hero)=> Promise<void>;
}

const HeroContext = createContext<HeroContextProps | undefined>(undefined);

export const HeroProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const heroService = new HeroService();

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [inputSearch, setInputSearch] = useState<string>("");
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  const handleNext = () => setPage(page + 1);
  const handlePrevious = () => setPage(page - 1);
  const handleSearch = () => {
    setSearch(inputSearch);
    setPage(1);
  };

  const { data, isLoading, error } = useFetch<HeroResponse>(
    () => heroService.getAllHeroes(page, search), 
    { heroes: [], totalHeroes: 0, totalPages: 0, currentPage: 1 },
    [page, search,refreshFlag]
  );
  const { heroes, totalHeroes, totalPages, currentPage } = data;

  const handleCreateHero = async (heroData: Hero) => {
    try {
      await heroService.createHero(heroData);
      setRefreshFlag((prev) => !prev);
    } catch (err) {
      console.error("Erro ao criar herói:", err);
    }
  };

  return (
    <HeroContext.Provider
      value={{
        heroes,
        isLoading,
        error,
        page,
        search,
        setPage,
        setSearch,
        handleNext,
        handlePrevious,
        totalPages,
        totalHeroes,
        currentPage,
        inputSearch,
        setInputSearch,
        handleSearch,
        handleCreateHero
      }}
    >
      {children}
    </HeroContext.Provider>
  );
};

export type { HeroContextProps };
export { HeroContext };
