import React from "react";
import { createTheme, Grid, ThemeProvider } from "@mui/material";
import { Title } from "./components/Title";
import { FilterArea } from "./components/FilterArea";
import { HeroList } from "./components/HeroList";
import { HeroProvider } from "./context/HeroContext";
import { HeroCreationModal } from "./components/modal/HeroCreationModal";
import { HeroCreateModalProvider } from "./context/HeroCreateModalContext";
import Alert from "./components/alert/Alert";
import AlertInative from "./components/alert/AlertInative";

const theme = createTheme({
  palette: {
    primary: {
      main: "#152d8b",
    },
    secondary: {
      main: "#d32f2f",
    },
  },
});
const styles = {
  container: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    paddingTop: "50px",
  },
  titleContainer: {
    display: "flex",
  },
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <HeroProvider>
        <HeroCreateModalProvider>
          <div style={styles.container}>
            <Grid container spacing={4}>
              <Grid item xs={1.5} />
              <Grid item xs={9}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sx={styles.titleContainer}>
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
          <HeroCreationModal />
          <Alert />
          <AlertInative />
        </HeroCreateModalProvider>
      </HeroProvider>
    </ThemeProvider>
  );
};

export default App;
