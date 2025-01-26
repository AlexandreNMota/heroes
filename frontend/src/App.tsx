import React, { useState } from 'react';
import {createTheme, Grid, ThemeProvider } from '@mui/material';
import { Title } from './components/Title';
import { FilterArea } from './components/FilterArea';
import { HeroList } from './components/HeroList';
import { HeroProvider } from './context/HeroContext';
import { HeroCreationModal } from './components/modal/HeroCreationModal';

const theme = createTheme({
  palette: {
    primary: {
      main: '#152d8b',
    },
    secondary: {
      main: '#d32f2f',
    },
  },
});

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreateHero = (heroData: { name: string; power: string; universe: string }) => {
    console.log("Novo herói criado:", heroData);
    // Aqui você pode chamar um serviço para enviar os dados do herói para a API.
  };
  return (
    <ThemeProvider theme={theme}>
      <HeroProvider>
        <div style={{ maxHeight: '100%', maxWidth: '100%', overflow: 'hidden', paddingTop: '50px' }}>
          <Grid container spacing={4}>
            <Grid item xs={1.5} />
            <Grid item xs={9}>
              <Grid container spacing={5}>
                <Grid item xs={12} sx={{ display: "flex" }}>
                  <Title title="Heróis" />
                </Grid>

                <Grid item xs={12}>
                  <FilterArea />
                </Grid>

                <Grid item xs={12}>
                  <HeroList />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1.5} />
          </Grid>
        </div>
        <HeroCreationModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onCreate={handleCreateHero}
        />
      </HeroProvider>
    </ThemeProvider>
  );
};

export default App;
