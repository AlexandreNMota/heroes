import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
interface HeroCreationModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (heroData: { name: string; power: string; universe: string }) => void;
}

export const HeroCreationModal: React.FC<HeroCreationModalProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState<string>("");
  const [power, setPower] = useState<string>("");
  const [universe, setUniverse] = useState<string>("");

  const handleCreate = () => {
    if (name && power && universe) {
      onCreate({ name, power, universe });
      setName("");
      setPower("");
      setUniverse("");
      onClose();
    } else {
      alert("Todos os campos são obrigatórios!");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        Criar Herói
        <IconButton onClick={onClose} edge="end" aria-label="close">
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome do Herói"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Poder"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Universo"
              value={universe}
              onChange={(e) => setUniverse(e.target.value)}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleCreate} variant="contained" color="primary">
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
