import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
  Switch,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import { brown } from '@mui/material/colors';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlanningPage from './pages/PlanningPage';
import AboutPage from './pages/AboutPage';

const App: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = createTheme({
    palette: {
      mode,
      primary: brown,
      secondary: {
        main: '#a1887f',
      },
      background: {
        default: mode === 'light' ? '#f8f3f0' : '#2e2723',
        paper: mode === 'light' ? '#fff' : '#3e3530',
      },
    },
  });
  
  const toggleTheme = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />

        {/* Barre de navigation */}
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Gestion d'emploi du temps
            </Typography>
            <Switch checked={mode === 'dark'} onChange={toggleTheme} />
          </Toolbar>
        </AppBar>

        {/* Menu latéral */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
            <List>
              <ListItem button component={Link} to="/">
                <HomeIcon sx={{ mr: 1 }} />
                <ListItemText primary="Accueil" />
              </ListItem>
              <ListItem button component={Link} to="/planning">
                <EventIcon sx={{ mr: 1 }} />
                <ListItemText primary="Planning" />
              </ListItem>
              <ListItem button component={Link} to="/about">
                <InfoIcon sx={{ mr: 1 }} />
                <ListItemText primary="À propos" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Contenu principal */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, mb: 6 }}>
  <Container maxWidth={false}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/planning" element={<PlanningPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  </Container>
</Box>


        {/* Footer */}
        <Box
          component="footer"
          sx={{
            p: 2,
            textAlign: 'center',
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.secondary,
            borderTop: `1px solid ${mode === 'light' ? '#ddd' : '#555'}`,
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
          }}
        >
          <Typography variant="body2">
            © 2025 Mon Emploi du Temps — Créé par BLakara2 + du café ☕
          </Typography>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
