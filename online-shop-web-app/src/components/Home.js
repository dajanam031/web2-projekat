import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, setUser } from '../redux/userSlice';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

function Home() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        /*global google*/
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
    
        const handleCallbackResponse = (response) => {
          var token = response.credential;
          var userObject = jwt_decode(response.credential);
          localStorage.setItem('token', token);
          dispatch(setUser(userObject));
        };
    
        script.onload = () => {
          google.accounts.id.initialize({
            client_id: '537961435311-thqj5cefqa83istba2gc2bcv9hl3iah8.apps.googleusercontent.com',
            callback: handleCallbackResponse,
          });
          google.accounts.id.renderButton(document.getElementById('signInDiv'), {
            theme: 'outline',
            size: 'large',
          });
        };
    
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, [dispatch, user]);

    const handleLogout = () => {
        dispatch(clearUser());
        localStorage.removeItem('token');
    };

    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        {!user && (
          <>
            <Button variant="outlined" component={Link} to="/login" color="primary" size="large">
              Log In
            </Button>
            <div id="signInDiv"></div>
            <Typography variant="h6" component="h6">
              Don't have an account? Sign up!
            </Typography>
            <Button variant="outlined" component={Link} to="/registration" color="primary" size="large">
              Sign Up
            </Button>
          </>
        )}
        {user && (
          <>
          <Typography variant="h6" component="h6">
            Welcome {user.email} !
          </Typography>
            <Button variant="outlined" component={Link} to="/profile" color="primary" size="large">
              Profile
            </Button>
            <Button variant="outlined" onClick={handleLogout} color="primary" size="large">
              Log Out
            </Button>
          </>
        )}
      </Box>
    );
  }

export default Home;