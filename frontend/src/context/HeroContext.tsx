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
}

const HeroContext = createContext<HeroContextProps | undefined>(undefined);

export const HeroProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const heroService = new HeroService();

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const handleNext = () => setPage(page + 1);
  const handlePrevious = () => setPage(page - 1);


  const { data, isLoading, error } = useFetch<HeroResponse>(
    () => heroService.getAllHeroes(page, search), 
    { heroes: [], totalHeroes: 0, totalPages: 0, currentPage: 1 },
    [page, search]
  );
  const { heroes, totalHeroes, totalPages, currentPage } = data;

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
      }}
    >
      {children}
    </HeroContext.Provider>
  );
};

export type { HeroContextProps };
export { HeroContext };
