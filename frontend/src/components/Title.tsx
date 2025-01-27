import React from "react";
import { Typography } from "@mui/material";

interface TitleProps {
  title: string;
}

export const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        color="primary"
        sx={{ fontWeight: "bold", letterSpacing: "0.25rem" }}
      >
        {title}
      </Typography>
    </div>
  );
};
