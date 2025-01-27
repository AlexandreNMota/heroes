import { Grid } from "@mui/material";
import { useCallback, useState } from "react";
import { HeroCard } from "./HeroCard";
import { useHeroContext } from "../hooks/useHeroContext";
import { Pagination } from "./Pagination";
import { AnimatePresence, motion } from "framer-motion";
export const HeroList: React.FC = () => {
  const { heroes, page, handleNext, handlePrevious, setPage, totalPages } =
    useHeroContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  if (!heroes || heroes.length <= 0) return <p>Sem heróis cadastrados</p>;

  return (
    <>
      <Grid container spacing={6} justifyContent="center">
        <AnimatePresence mode="wait">
          {heroes.map((hero, index) => (
            <Grid item xs={2.4} key={hero.id || index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{ width: "100%", minWidth: "100%" }}
              >
                <HeroCard
                  hero={hero}
                  onClick={handleClick}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                />
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
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
