import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Hero } from "../../@types/hero";
import { formatDate } from "../../utils/date";

interface HeroViewModalProps {
  open: boolean;
  hero: Hero | null;
  onClose: () => void;
}

export const HeroViewModal: React.FC<HeroViewModalProps> = ({ open, hero, onClose }) => {
  if (!hero) return null;

  
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "25px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "25px",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
            {hero.nickname}
        </Typography>
        <IconButton onClick={onClose} edge="end" aria-label="close">
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ padding: "25px" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <img
              src={hero.avatar_url}
              alt={hero.name}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Nome completo:
            </Typography>
            <Typography>{hero.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Data de nascimento:
            </Typography>
            <Typography>{formatDate(hero.date_of_birth)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Universo:
            </Typography>
            <Typography>{hero.universe}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Habilidade:
            </Typography>
            <Typography>{hero.main_power}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions
        sx={{
          padding: "30px",
          justifyContent: "center",
          alignItems:"center"
        }}
      >
        <Button onClick={onClose} color="gray" variant="outlined" sx={{
          borderColor:"rgba(0, 0, 0, 0.12)"
        }}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
