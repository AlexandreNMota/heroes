import React, { createContext, ReactNode, useState } from "react";
import { Hero } from "../@types/hero";

interface HeroCreateModalContextProps {
  open: boolean;
  heroData: Partial<Hero>;
  openModal: (data?: Partial<Hero>) => void;
  closeModal: () => void;
  message: string;
  alertOpen: boolean; 
  closeAlert: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Partial<Hero>) => void;
}

const HeroCreateModalContext = createContext<HeroCreateModalContextProps | undefined>(undefined);



export const HeroCreateModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [heroData, setHeroData] = useState<Partial<Hero>>({
    name: "",
    nickname: "",
    main_power: "",
    universe: "",
    date_of_birth: null,
    avatar_url: "",
  });

  const openModal = (data: Partial<Hero> = {
    name: "",
    nickname: "",
    main_power: "",
    universe: "",
    date_of_birth: null,
    avatar_url: "",
  }) => {
    setHeroData(data);
    setOpen(true);
  };


  const closeAlert = () => {
    setAlertOpen(false);
    setMessage("");
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Partial<Hero>) => {
    const value = e.target.value;
    if (field === "date_of_birth") {
      if (value.length === 10) {
        const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const match = value.match(datePattern);

        if (match) {
          const [_, day, month, year] = match;
          const date = new Date(`${year}-${month}-${day}`);
          if (date instanceof Date && !isNaN(date.getTime())) {
            setHeroData((prevData) => ({ ...prevData, [field]: date }));
          } else {
            setMessage("Data inválida!");
            setAlertOpen(true);
          }
        } else {
          setMessage("Formato inválido. Use dd/mm/yyyy.");
          setAlertOpen(true);
        }
      } else {
        setHeroData((prevData) => ({ ...prevData, [field]: value }));
      }
    } else {
      setHeroData((prevData) => ({ ...prevData, [field]: value }));
    }
  };

  return (
    <HeroCreateModalContext.Provider value={{
       open,
      heroData,
      openModal,
      closeModal,
      handleInputChange,
      message,
      alertOpen,
      closeAlert
      }}>
      {children}
    </HeroCreateModalContext.Provider>
  );
};
export type { HeroCreateModalContextProps };
export { HeroCreateModalContext };