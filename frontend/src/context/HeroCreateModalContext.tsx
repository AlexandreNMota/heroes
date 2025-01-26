import React, { createContext, ReactNode, useContext, useState } from "react";
import { Hero } from "../@types/hero";
import { HeroContext } from "./HeroContext";

interface HeroCreateModalContextProps {
  open: boolean;
  heroData: Partial<Hero>;
  openModal: (data?: Partial<Hero>) => void;
  closeModal: () => void;
  message: string;
  alertOpen: boolean; 
  closeAlert: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Partial<Hero>) => void;
  handleCreate: () => Promise<void>;
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

  const { handleCreateHero } = useContext(HeroContext);
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

  const handleCreate = async () => {
    if (!heroData.name || !heroData.nickname || !heroData.main_power || !heroData.universe || !heroData.avatar_url) {
      setMessage("Todos os campos devem ser preenchidos.");
      setAlertOpen(true);
      return;
    }

    if (!heroData.date_of_birth || !(heroData.date_of_birth instanceof Date) || isNaN(heroData.date_of_birth.getTime())) {
      setMessage("Data de nascimento inválida.");
      setAlertOpen(true);
      return;
    }
    try {
      await handleCreateHero(heroData as Hero);
      setMessage(`Herói ${heroData.name} criado com sucesso!`);
      setAlertOpen(true);
      closeModal();
    } catch (error) {
      setMessage("Erro ao criar herói.");
      setAlertOpen(true);
    }
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
      closeAlert,
      handleCreate
      }}>
      {children}
    </HeroCreateModalContext.Provider>
  );
};
export type { HeroCreateModalContextProps };
export { HeroCreateModalContext };