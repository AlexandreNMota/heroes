import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useHeroContext } from "../hooks/useHeroContext";
import { useHeroCreateModal } from "../hooks/useHeroCreateModalContext";

const styles = {
  createBtn: {
    borderRadius: "50px",
    padding: "10px",
  },
  searchInput: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px",
      backgroundColor: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .Mui-focused": {
      border: "2px solid #152d8b",
    },
  },
  searchBtn: {
    borderRadius: "50px",
    padding: "10px",
    backgroundColor: "#fff",
    borderColor: "#e9e9e9",
    color: "#0c0c0c",
  },
};

export const FilterArea: React.FC = () => {
  const { inputSearch, setInputSearch, handleSearch, isLoading } =
    useHeroContext();
  const { openModal } = useHeroCreateModal();
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={1} container justifyContent="flex-start">
        <Button
          variant="contained"
          sx={styles.createBtn}
          onClick={() => openModal()}
        >
          Criar
        </Button>
      </Grid>
      <Grid item xs={10}>
        <TextField
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          fullWidth
          placeholder="Digite o nome do herói"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={styles.searchInput}
        />
      </Grid>
      <Grid item xs={1} container justifyContent="end">
        <Button
          variant="contained"
          onClick={handleSearch}
          loading={isLoading}
          sx={styles.searchBtn}
        >
          Buscar
        </Button>
      </Grid>
    </Grid>
  );
};
