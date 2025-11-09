import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Divider } from '@mui/material';

const funInfos = [
  { title: 'Le saviez-vous ?', desc: 'Les chats dorment en moyenne 70% de leur vie !', img: 'https://source.unsplash.com/600x400/?cat' },
  { title: 'Fun Fact', desc: 'La première souris d’ordinateur était faite en bois !', img: 'https://source.unsplash.com/600x400/?computer' },
  { title: 'Insolite', desc: 'Les abeilles peuvent reconnaître les visages humains.', img: 'https://source.unsplash.com/600x400/?bee' },
  { title: 'Culture Geek', desc: 'Mario est apparu pour la première fois en 1981 !', img: 'https://source.unsplash.com/600x400/?mario' },
];

const HomePage: React.FC = () => (
  <>
    <Typography variant="h4" gutterBottom>🎉 Bienvenue sur ta page d’accueil !</Typography>
    <Typography variant="body1" paragraph>
      Découvre ici des infos amusantes pour te détendre entre deux plannings !
    </Typography>
    <Divider sx={{ my: 3 }} />
    <Grid container spacing={3}>
      {funInfos.map((info, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardMedia component="img" height="180" image={info.img} alt={info.title} />
            <CardContent>
              <Typography variant="h6" color="primary">{info.title}</Typography>
              <Typography variant="body2">{info.desc}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </>
);

export default HomePage;
