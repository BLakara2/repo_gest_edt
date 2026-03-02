import React from 'react';
import { Box, Typography, Paper, Stack, Button, Link } from '@mui/material';

const AboutPage: React.FC = () => (
  <Box sx={{ p: { xs: 2, sm: 4 } }}>
    <Typography variant="h4" gutterBottom>ℹ️ À propos</Typography>

    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="body1">
        Salut ! Je suis Lakara, passionné par le contenu créatif et l’influence digitale. 
        Ici, je partage chaque jour des moments fun et exclusifs.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2 }}>
        Cette application React + Vite + Material UI est conçue pour gérer ton emploi du temps avec style, rapidité et fluidité.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2 }}>
        Mon objectif ? Te fournir un espace simple et agréable pour organiser tes journées et suivre tes événements sans stress.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2 }}>
        PS : Peut aussi servire de gestion de EDT d'une ecole mdrrr
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" component={Link} href="" target="_blank">
          Contenu exclusif
        </Button>
        <Button variant="outlined" color="secondary" component={Link} href="https://facebook.com/BryanLakara" target="_blank">
          Suivre sur Facebook
        </Button>
      </Stack>
    </Paper>
  </Box>
);

export default AboutPage;