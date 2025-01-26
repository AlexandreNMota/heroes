import { useContext } from "react";
import { HeroCreateModalContext } from "../context/HeroCreateModalContext";

export const useHeroCreateModal = () => {
  const context = useContext(HeroCreateModalContext);
  if (!context) {
    throw new Error("useHeroCreateModal deve ser utilizado dentro de um HeroCreateModalProvider");
  }
  return context;
};