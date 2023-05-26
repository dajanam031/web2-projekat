import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';

function App() {
  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token:' + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '537961435311-thqj5cefqa83istba2gc2bcv9hl3iah8.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Button variant="outlined" href="/registration" color="primary" size="large">
        Sign Up
      </Button>
      <div id="signInDiv"></div>
      <Typography variant="h6" component="h6">
        Already have an account? Log in
      </Typography>
      <Button variant="outlined" href="/login" color="primary" size="large">
        Log In
      </Button>
    </Box>
  );
}

export default App;
