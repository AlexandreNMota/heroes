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
import { formatDate } from "../../utils/date";
import { HeroViewModalProps } from "../../@types/components/modal/HeroView";

const styles = {
  dialog: {
    "& .MuiPaper-root": {
      borderRadius: "25px",
    },
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px",
  },
  dialogContent: {
    padding: "25px",
  },
  imgContainer: {
    textAlign: "center",
  },
  dialogActions: {
    padding: "30px",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtn: {
    borderColor: "rgba(0, 0, 0, 0.12)",
  },
};

export const HeroViewModal: React.FC<HeroViewModalProps> = ({
  open,
  hero,
  onClose,
}) => {
  if (!hero) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={styles.dialog}
    >
      <DialogTitle sx={styles.dialogTitle}>
        <Typography variant="h6" fontWeight="bold">
          {hero.nickname}
        </Typography>
        <IconButton onClick={onClose} edge="end" aria-label="close">
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={styles.dialogContent}>
        <Grid container spacing={4}>
          <Grid item xs={12} sx={styles.imgContainer}>
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
      <DialogActions sx={styles.dialogActions}>
        <Button
          onClick={onClose}
          color="gray"
          variant="outlined"
          sx={styles.closeBtn}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
