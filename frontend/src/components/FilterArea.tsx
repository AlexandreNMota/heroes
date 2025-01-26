import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useHeroContext } from '../hooks/useHeroContext';

export const FilterArea: React.FC = () => {
  const { inputSearch, setInputSearch, handleSearch,isLoading } = useHeroContext();
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={1} container justifyContent="flex-start">
        <Button 
          variant="contained" 
          sx={{ borderRadius: '50px', padding:"10px" }}
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
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
              backgroundColor:"#fff",
            },
            '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
            },
            '& .Mui-focused':{
                    border: '2px solid #152d8b',
            }
          }}
        />
      </Grid>
      <Grid item xs={1} container justifyContent='end'>
        <Button 
          variant="contained"
          onClick={handleSearch}
          loading={isLoading}
          sx={{ 
            borderRadius: '50px', 
            padding:"10px", 
            backgroundColor:"#fff", 
            borderColor:"#e9e9e9",
            color: "#0c0c0c",
          }} 
        >
          Buscar
        </Button>
      </Grid>
    </Grid>
  );
};
