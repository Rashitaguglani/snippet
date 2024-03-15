import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { auth } from '../../firebase';

const Navbar = () => {
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        // Logout successful
        console.log('Logout successful');
      })
      .catch((error) => {
        // Handle logout error
        console.error('Error logging out:', error);
      });
  };

  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          SNIPPET
        </Typography>
        <Box>
          <Button color="inherit" sx={{ marginRight: '15px' }}>Dashboard</Button>
          <Button onClick={handleLogout} color="inherit">Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
