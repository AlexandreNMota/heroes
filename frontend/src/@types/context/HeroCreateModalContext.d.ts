import { Hero } from "../hero";

export interface HeroCreateModalContextProps {
  open: boolean;
  heroData: Partial<Hero>;
  openModal: (data?: Partial<Hero>, isEdicao?: boolean) => void;
  closeModal: () => void;
  message: string;
  alertOpen: boolean;
  severity: string;
  closeAlert: () => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Partial<Hero>
  ) => void;
  handleCreate: () => Promise<void>;
  loading: boolean;
  isEdit: boolean;
}
