import { IconButton, Menu, MenuItem, Switch, Tooltip } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 
import { useHeroContext } from "../hooks/useHeroContext";
import { ConfirmModal } from "./modal/ConfirmModal";
import { useState } from "react";
import { useHeroCreateModal } from "../hooks/useHeroCreateModalContext";
import { formatDate } from "../utils/date";

const styles = {
    menuItem: {
      display: 'flex',
      justifyContent: 'center',
    },
    menu: {
        width: '90px',
      },
};

export const HeroMenu: React.FC<{ anchorEl: null | HTMLElement; open: boolean; onClose: () => void; }> = ({ anchorEl, open, onClose }) => {
  const { selectedHero, setSelectedHero, handleHeroDelete, handleHeroReativate} = useHeroContext();
  const {openModal} = useHeroCreateModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };
  const handleReativateClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmReativate = () => {
    setLoading(true);
    handleHeroReativate();
    setLoading(false);
    setIsModalOpen(false);
    setSelectedHero(null);
    onClose();
  }

  const handleConfirmDelete = () => {
    setLoading(true);
    handleHeroDelete();
    setLoading(false);
    setIsModalOpen(false);
    setSelectedHero(null);
    onClose();
  };
  return (
    <>
    <Menu
      id="hero-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={()=>{
        setSelectedHero(null);
        onClose();
      }}
      MenuListProps={{
        'aria-labelledby': 'hero-menu-button',
      }}
      sx={styles.menu}
    >
      <MenuItem sx={styles.menuItem}>
      {selectedHero?.is_active ? (
        <MenuItem sx={styles.menuItem}>
          <Tooltip title="Inativar herói">
            <IconButton onClick={handleDeleteClick}>
              <DeleteOutlineIcon color='error' />
            </IconButton>
          </Tooltip>
        </MenuItem>
      ) : (
        <MenuItem sx={styles.menuItem}>
          <Tooltip title="Ativar herói">
            <IconButton onClick={handleReativateClick}>
              <AddCircleOutlineIcon color='success' />
            </IconButton>
          </Tooltip>
        </MenuItem>
      )}
      </MenuItem>
      <MenuItem sx={styles.menuItem}>
        <IconButton
          disabled={!selectedHero || !selectedHero.is_active}
          onClick={()=>openModal({
            ...selectedHero, date_of_birth: formatDate(selectedHero?.date_of_birth!)
          },true)}
          sx={{
            '&.MuiButtonBase-root':{
              color: !selectedHero || !selectedHero.is_active ? 'gray' : 'inherit',
            }
          }}
         >
          <BorderColorOutlinedIcon sx={{
            color: !selectedHero || !selectedHero.is_active ? 'gray' : 'primary',
          }}/>
        </IconButton>
      </MenuItem>
      <MenuItem sx={styles.menuItem}>
        <Tooltip title={selectedHero?.is_active ? "Ativo" : "Inativo"}>
          <Switch checked={selectedHero?.is_active}  readOnly/>
        </Tooltip>
      </MenuItem>
    </Menu>
      <ConfirmModal
          loading={loading}
          open={isModalOpen}
          title={!selectedHero?.is_active ? "Confirmação de Reativação":"Confirmação de Inativação"}
          message={
            selectedHero
              ? 
              !selectedHero.is_active ? `Tem certeza que deseja reativar o herói "${selectedHero.nickname}"?` : `Tem certeza que deseja inativar o herói "${selectedHero.nickname}"?`
              : "Nenhum herói selecionado."
          }
          onConfirm={ !selectedHero?.is_active ? handleConfirmReativate : handleConfirmDelete}
          onCancel={() => setIsModalOpen(false)}
        />
    </>
  )
};