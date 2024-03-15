import React from 'react';
import { AppBar, Toolbar, Typography, Button , Box } from '@mui/material';
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
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">SNIPPET</Typography>
          <Box ml="auto">
            <Button color="inherit">Dashboard</Button>
            <Button onClick={handleLogout} color="inherit">Logout</Button> {/* Fix onclick to onClick */}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
