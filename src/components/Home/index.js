import { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPeFDjwtVI3BlsY-a5ncx-MHOMuPh1D3g",
  authDomain: "snippet-f41a9.firebaseapp.com",
  projectId: "snippet-f41a9",
  storageBucket: "snippet-f41a9.appspot.com",
  messagingSenderId: "574460642612",
  appId: "1:574460642612:web:6ef435b4ce0ddffc941161"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const Home = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      console.log('User signed up successfully!');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      console.log('User logged in successfully!');
    } catch (error) {
      console.error('Error logged in:', error.message);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Snippet
      </Typography>
      <Box width={300} mb={2}>
        <TextField
          fullWidth
          value={form.email}
          name="email"
          onChange={handleChange}
          label="Email"
          variant="outlined"
        />
      </Box>
      <Box width={300} mb={2}>
        <TextField
          fullWidth
          type="password"
          value={form.password}
          name="password"
          onChange={handleChange}
          label="Password"
          variant="outlined"
        />
      </Box>
      <Box width={300} mb={2}>
        <Button
          onClick={handleSignup}
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>
      </Box>
      <Box width={300}>
        <Button
          onClick={handleLogin}
          fullWidth
          variant="contained"
          color="primary"
        >
          Log In
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
