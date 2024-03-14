import React from 'react';
import { AppBar, Toolbar, Typography, Button , Box } from '@mui/material';

const Navbar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">SNIPPET</Typography>
          <Box ml="auto">
          <Button color="inherit">Dashboard</Button>
          <Button color="inherit">Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
