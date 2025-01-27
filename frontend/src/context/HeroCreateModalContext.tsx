import React, { createContext, ReactNode, useContext, useState } from "react";
import { Hero } from "../@types/hero";
import { HeroContext } from "./HeroContext";

interface HeroCreateModalContextProps {
  open: boolean;
  heroData: Partial<Hero>;
  openModal: (data?: Partial<Hero>,isEdicao?:boolean) => void;
  closeModal: () => void;
  message: string;
  alertOpen: boolean; 
  severity:string;
  closeAlert: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Partial<Hero>) => void;
  handleCreate: () => Promise<void>;
  loading:boolean;
  isEdit:boolean;
}

const HeroCreateModalContext = createContext<HeroCreateModalContextProps | undefined>(undefined);



export const HeroCreateModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");
  const [isEdit, setIsEdit] = useState<boolean>(false);
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
  }, isEdicao?: boolean) => {
    setIsEdit(isEdicao ?? false);
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
      setSeverity("error");
      setAlertOpen(true);
      return;
    }

    if (!heroData.date_of_birth || !(heroData.date_of_birth instanceof Date) || isNaN(heroData.date_of_birth.getTime())) {
      setMessage("Data de nascimento inválida.");
      setSeverity("error");
      setAlertOpen(true);
      return;
    }
    try {
      setLoading(true);
      await handleCreateHero(heroData as Hero);
      setMessage(`Herói ${heroData.nickname} criado com sucesso!`);
      setSeverity("success");
      setLoading(false);
      setAlertOpen(true);
      closeModal();
    } catch (error) {
      setLoading(false);
      setMessage("Erro ao criar herói.");
      setAlertOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Partial<Hero>) => {
    const value = e.target.value;
    if (field === "date_of_birth") {
      if(value.length > 10){
        return;
      }
      if (value.length === 10) {
        const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const match = value.match(datePattern);

        if (match) {
          const [_, day, month, year] = match;
          const date = new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day)
          );
          if (date instanceof Date && !isNaN(date.getTime())) {
            setHeroData((prevData) => ({ ...prevData, [field]: date }));
          } else {
            setMessage("Data inválida!");
            setSeverity("error");
            setAlertOpen(true);
          }
        } else {
          setMessage("Formato inválido. Use dd/mm/yyyy.");
          setSeverity("error");
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
      handleCreate,
      severity,
      loading,
      isEdit
      }}>
      {children}
    </HeroCreateModalContext.Provider>
  );
};
export type { HeroCreateModalContextProps };
export { HeroCreateModalContext };