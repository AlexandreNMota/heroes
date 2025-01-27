import { useContext } from "react";
import { HeroContext } from "../context/HeroContext";
import { HeroContextProps } from "../@types/context/HeroContext";

export const useHeroContext = (): HeroContextProps => {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error("useHeroContext deve ser utilizado dentro de HeroProvider");
  }
  return context;
};
