import { useContext } from "react";
import { HeroCreateModalContext } from "../context/HeroCreateModalContext";
import { HeroCreateModalContextProps } from "../@types/context/HeroCreateModalContext";

export const useHeroCreateModal = (): HeroCreateModalContextProps => {
  const context = useContext(HeroCreateModalContext);
  if (!context) {
    throw new Error(
      "useHeroCreateModal deve ser utilizado dentro de um HeroCreateModalProvider"
    );
  }
  return context;
};
