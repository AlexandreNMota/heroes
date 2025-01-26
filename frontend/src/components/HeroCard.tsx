import { Card, CardContent, IconButton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Hero } from "../@types/hero";
import { HeroMenu } from "./HeroMenu";

const styles = {
  card: {
    borderRadius: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    top: '20px',
    right: '8px',
    color: 'gray',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  img: {
    borderRadius: '50%',
    height: '130px',
    width: '130px',
    marginBottom: '10px',
    marginTop: '20px',
  },
  name: {
    marginTop: '10px',
  },
};

export const HeroCard: React.FC<{ 
  hero: Hero; 
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; 
  anchorEl: null | HTMLElement; 
  open: boolean; 
  onClose: () => void; 
}> = ({ hero, onClick, anchorEl, open, onClose }) => (
    <Card sx={{...styles.card, filter:hero.is_active ? "none" : "grayscale(100%)"}}>
      <IconButton onClick={onClick} sx={styles.iconButton}>
        <MoreVertIcon />
      </IconButton>

      <HeroMenu anchorEl={anchorEl} open={open} onClose={onClose} />

      <CardContent sx={styles.cardContent}>
        <img
          src="https://i.imgur.com/558s1Wc.jpeg"
          alt={hero.name}
          style={{...styles.img, objectFit:"cover"}}
        />
        <Typography variant="h6" component="div" sx={styles.name}>
          {hero.nickname}
        </Typography>
      </CardContent>
    </Card>
);
