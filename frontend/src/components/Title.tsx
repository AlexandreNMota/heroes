import React from "react";
import { Typography } from "@mui/material";
import { TitleProps } from "../@types/components/Title";

const styles = {
  container: {
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    letterSpacing: "0.25rem",
  },
};

export const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div style={styles.container}>
      <Typography variant="h4" color="primary" sx={styles.title}>
        {title}
      </Typography>
    </div>
  );
};
