import React, { createContext, ReactNode, useContext, useState } from "react";
import { Hero } from "../@types/hero";
import { HeroContext } from "./HeroContext";
import { HeroCreateModalContextProps } from "../@types/context/HeroCreateModalContext";

const HeroCreateModalContext = createContext<
  HeroCreateModalContextProps | undefined
>(undefined);

export const HeroCreateModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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

  const { handleCreateHero, handleUpdateHero } = useContext(HeroContext);

  const openModal = (
    data: Partial<Hero> = {
      name: "",
      nickname: "",
      main_power: "",
      universe: "",
      date_of_birth: null,
      avatar_url: "",
    },
    isEdicao?: boolean
  ) => {
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
    if (
      !heroData.name ||
      !heroData.nickname ||
      !heroData.main_power ||
      !heroData.universe ||
      !heroData.avatar_url
    ) {
      setMessage("Todos os campos devem ser preenchidos.");
      setSeverity("error");
      setAlertOpen(true);
      return;
    }
    if (heroData.date_of_birth && typeof heroData.date_of_birth === "string") {
      const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const match = heroData.date_of_birth.match(datePattern);

      if (match) {
        const [_, day, month, year] = match;
        const formattedDate = `${year}-${month}-${day}`;
        heroData.date_of_birth = new Date(formattedDate);
      } else {
        setMessage("Formato inválido. Use dd/mm/yyyy.");
        setSeverity("error");
        setAlertOpen(true);
      }
    }
    if (
      !heroData.date_of_birth ||
      !(heroData.date_of_birth instanceof Date) ||
      isNaN(heroData.date_of_birth.getTime())
    ) {
      setMessage("Data de nascimento inválida.");
      setSeverity("error");
      setAlertOpen(true);
      return;
    }
    try {
      setLoading(true);
      if (isEdit) {
        await handleUpdateHero(heroData);
      } else {
        await handleCreateHero(heroData as Hero);
      }
      setMessage(
        isEdit
          ? `Herói ${heroData.nickname} editado com sucesso!`
          : `Herói ${heroData.nickname} criado com sucesso!`
      );
      setSeverity("success");
      setLoading(false);
      setAlertOpen(true);
      closeModal();
    } catch (error) {
      setLoading(false);
      setMessage(isEdit ? "Erro ao editar herói." : "Erro ao criar herói.");
      setAlertOpen(true);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Partial<Hero>
  ) => {
    const value = e.target.value;
    if (field === "date_of_birth") {
      if (value.length > 10) {
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
    <HeroCreateModalContext.Provider
      value={{
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
        isEdit,
      }}
    >
      {children}
    </HeroCreateModalContext.Provider>
  );
};

export { HeroCreateModalContext };
