export interface HeroContextProps {
  heroes: Hero[];
  isLoading: boolean;
  error: string | null;
  page: number;
  search: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  totalPages: number;
  totalHeroes: number;
  currentPage: number;
  inputSearch: string;
  handleSearch: () => void;
  setInputSearch: (inputSearch: string) => void;
  handleCreateHero: (heroData: Hero) => Promise<void>;
  handleUpdateHero: (heroData: Hero) => Promise<void>;
  selectedHero: Hero | null;
  setSelectedHero: (hero: Hero | null) => void;
  handleHeroDelete: () => Promise<void>;
  handleHeroReativate: () => Promise<void>;
  message: string;
  alertOpen: boolean;
  severity: string;
  closeAlert: () => void;
}
