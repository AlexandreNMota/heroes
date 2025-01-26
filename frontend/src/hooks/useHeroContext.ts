import { useContext } from "react";
import { HeroContext, HeroContextProps } from "../context/HeroContext";

export const useHeroContext = (): HeroContextProps => {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error("useHeroContext deve ser utilizado dentro de HeroProvider");
  }
  return context;
};
