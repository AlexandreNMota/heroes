import { IconButton, Menu, MenuItem, Switch } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

const styles = {
    menuItem: {
      display: 'flex',
      justifyContent: 'center',
    },
    menu: {
        width: '90px',
      },
};

export const HeroMenu: React.FC<{ anchorEl: null | HTMLElement; open: boolean; onClose: () => void; }> = ({ anchorEl, open, onClose }) => (
    <Menu
      id="hero-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': 'hero-menu-button',
      }}
      sx={styles.menu}
    >
      <MenuItem sx={styles.menuItem}>
        <IconButton>
          <DeleteOutlineIcon color='error' />
        </IconButton>
      </MenuItem>
      <MenuItem sx={styles.menuItem}>
        <IconButton>
          <BorderColorOutlinedIcon color='primary' />
        </IconButton>
      </MenuItem>
      <MenuItem sx={styles.menuItem}>
        <Switch defaultChecked />
      </MenuItem>
    </Menu>
  );