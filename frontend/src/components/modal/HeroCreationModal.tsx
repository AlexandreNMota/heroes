import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { LabeledInput } from "../form-fields/TextInput";
import { useHeroCreateModal } from "../../hooks/useHeroCreateModalContext";
import { formatDate } from "../../utils/date";

const styles = {
  dialog: {
    "& .MuiPaper-root": {
      borderRadius: "25px",
    },
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "25px",
  },
  dialogContent: {
    padding: "50px 25px",
  },
  dialogActions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  cancelBtn: {
    borderColor: "rgba(0, 0, 0, 0.12)",
  },
};

export const HeroCreationModal: React.FC = () => {
  const {
    open,
    heroData,
    closeModal,
    handleInputChange,
    handleCreate,
    loading,
    isEdit,
  } = useHeroCreateModal();

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      fullWidth
      maxWidth="sm"
      sx={styles.dialog}
    >
      <DialogTitle sx={styles.dialogTitle}>
        {isEdit ? `Editar o herói: ${heroData.nickname}` : "Criar Herói"}
        <IconButton onClick={closeModal} edge="end" aria-label="close">
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={styles.dialogContent}>
        <Grid container spacing={4}>
          {isEdit && (
            <Grid item xs={12}>
              <LabeledInput
                label="Id"
                placeholder="Digite o id"
                value={heroData.id}
                disabled={true}
                onChange={(e) => handleInputChange(e, "id")}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <LabeledInput
              label="Nome completo"
              placeholder="Digite o nome completo"
              value={heroData.name}
              onChange={(e) => handleInputChange(e, "name")}
            />
          </Grid>
          <Grid item xs={12}>
            <LabeledInput
              label="Nome de guerra"
              placeholder="Digite o nome de guerra"
              value={heroData.nickname}
              onChange={(e) => handleInputChange(e, "nickname")}
            />
          </Grid>
          <Grid container item xs={12} spacing={4}>
            <Grid item xs={6}>
              <LabeledInput
                label="Data de nascimento"
                placeholder="Digite a data"
                value={
                  heroData.date_of_birth instanceof Date &&
                  !isNaN(heroData.date_of_birth.getTime())
                    ? heroData.date_of_birth.toLocaleDateString("pt-BR")
                    : heroData.date_of_birth || ""
                }
                onChange={(e) => handleInputChange(e, "date_of_birth")}
              />
            </Grid>
            <Grid item xs={6}>
              <LabeledInput
                label="Universo"
                placeholder="Digite o universo"
                value={heroData.universe}
                onChange={(e) => handleInputChange(e, "universe")}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={4}>
            <Grid item xs={6}>
              <LabeledInput
                label="Habilidade"
                placeholder="Digite a habilidade"
                value={heroData.main_power}
                onChange={(e) => handleInputChange(e, "main_power")}
              />
            </Grid>
            <Grid item xs={6}>
              <LabeledInput
                label="Avatar"
                placeholder="Digite a URL"
                value={heroData.avatar_url}
                onChange={(e) => handleInputChange(e, "avatar_url")}
              />
            </Grid>
            {isEdit && (
              <>
                <Grid item xs={6}>
                  <LabeledInput
                    label="Data de criação"
                    placeholder="Digite a data de criação"
                    disabled={true}
                    value={formatDate(heroData.createdAt!)}
                    onChange={(e) => handleInputChange(e, "created_at")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <LabeledInput
                    label="Data de edição"
                    placeholder="Digite a data de edição"
                    disabled={true}
                    value={formatDate(heroData.updatedAt!)}
                    onChange={(e) => handleInputChange(e, "updated_at")}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions sx={styles.dialogActions}>
        <Button
          onClick={closeModal}
          color="gray"
          variant="outlined"
          sx={styles.cancelBtn}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleCreate}
          variant="contained"
          color="primary"
          loading={loading}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
