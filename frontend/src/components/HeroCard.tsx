import { Card, CardContent, IconButton, Tooltip, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Hero } from "../@types/hero";
import { HeroMenu } from "./HeroMenu";
import { useState } from "react";
import { HeroViewModal } from "./modal/HeroView";

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
}> = ({ hero, onClick, anchorEl, open, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  return (
  <>
    <Card sx={{...styles.card, filter:hero.is_active ? "none" : "grayscale(100%)"}}>
      <IconButton onClick={(event)=>{
        event.stopPropagation();
        onClick(event);
      }} sx={styles.iconButton}>
        <MoreVertIcon />
      </IconButton>

      <HeroMenu anchorEl={anchorEl} open={open} onClose={onClose} />

      <CardContent sx={styles.cardContent}>
      <Tooltip title={`Visualizar ${hero.nickname}`} arrow>
        <img
          src="https://i.imgur.com/558s1Wc.jpeg"
          alt={hero.name}
          style={{...styles.img, objectFit:"cover", cursor:"pointer"}}
          onClick={()=>{
            setIsModalOpen(true);
            setSelectedHero({
              ...hero, date_of_birth:hero.date_of_birth as Date
            })
          }}
        />
        </Tooltip>
        <Typography variant="h6" component="div" sx={styles.name}>
          {hero.nickname}
        </Typography>
      </CardContent>
    </Card>
    <HeroViewModal
        open={isModalOpen}
        hero={selectedHero}
        onClose={() => setIsModalOpen(false)}
    />
  </>
)};
