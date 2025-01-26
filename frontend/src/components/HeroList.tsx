import { Grid } from "@mui/material";
import { useCallback, useState } from "react";
import { HeroCard } from "./HeroCard";
import { useHeroContext } from "../hooks/useHeroContext";
import { Pagination } from "./Pagination";

export const HeroList: React.FC = () => {
  const { heroes, isLoading, error, page, handleNext, handlePrevious,setPage,totalPages } = useHeroContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  if (isLoading) return <p>Loading heroes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Grid container spacing={6} justifyContent="center">
        {heroes.map((hero, index) => (
          <HeroCard key={index} hero={hero} onClick={handleClick} anchorEl={anchorEl} open={open} onClose={handleClose} />
        ))}
      </Grid>
      <Grid container justifyContent="end">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onPageChange={setPage}
        />
      </Grid>
    </>
  );
};
