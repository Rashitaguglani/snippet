import { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword } from 'firebase/auth';


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
      console.log('User logged in  successfully!');
    } catch (error) {
      console.error('Error logged in:', error.message);
    }
  };

  return (
    <div>
      <Typography variant="h4">Home</Typography>
      <TextField
        value={form.email}
        name="email"
        onChange={handleChange}
        label="Email"
      />
      <TextField
        type="password"
        value={form.password}
        name="password"
        onChange={handleChange}
        label="Password"
      />
      <Button onClick={handleSignup} variant="contained" color="primary">
        Sign Up
      </Button>
      <Button onClick={handleLogin} variant="contained" color="primary">
        Log In
      </Button>
    
    </div>
  );
};

export default Home;
