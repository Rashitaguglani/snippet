import React, { useState, useEffect } from 'react';
import { ThemeProvider, CircularProgress, Box } from '@mui/material';
import {  Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Home from './components/Home';
import Account from './components/Account';
import theme from './theme';
import { auth } from "./firebase";
import LinkRedirect from './components/LinkRedirect';

const App = () => {
  const [user, setUser] = useState(null);
  const {pathname} = useLocation();


  const [initialLoad, setInitialLoad] =
   useState(pathname==="/" || pathname==="/account" ? true:false)
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialLoad(false);
    });
    return () => unsubscribe(); // Cleanup function to unsubscribe from the listener
  }, []);

  if(initialLoad) return(
    <Box mt={5} display="flex" justifyContent="center">
      <CircularProgress></CircularProgress>
    </Box>

  )
  return (
    <ThemeProvider theme={theme}>
      
        <Routes>
          <Route path="/" element={user? <Navigate to="/account"/>:<Home />} exact={true} />
          <Route path="/account" element={user ? <Account /> : <Navigate to="/" />} />
          <Route path="/:shortCode" element={<LinkRedirect />} /> {/* Define the route for LinkRedirect */}
        </Routes>
      
    </ThemeProvider>
  );
};

export default App;
