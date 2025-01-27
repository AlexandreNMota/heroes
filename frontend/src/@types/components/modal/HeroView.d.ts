import { Hero } from "../../hero";

export interface HeroViewModalProps {
  open: boolean;
  hero: Hero | null;
  onClose: () => void;
}
