import { React, useState } from "react";
import Alert from '@mui/material/Alert';
import LoginIcon from '@mui/icons-material/Login';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { TextField, Button, Link, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import { UserLogin } from "../../models/UserLogin";
import { LoginUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from "../../redux/userSlice";
import { useEffect } from 'react';
import { RegisterUserWithGoogle } from "../../services/UserService";
import { GetUserRole, GetUserVerification } from "../../utils/CurrentUser";


function Login() {
  const [user, setLoginUser] = useState(new UserLogin());
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    /*global google*/
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    const handleCallbackResponse = async (response) => {
      try {
        const resp = await RegisterUserWithGoogle({'googleToken': response.credential});
        dispatch(setUser({ token: resp.token, role: GetUserRole(resp.token) }));
        navigate('/');
  
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    script.onload = () => {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
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
  }, [dispatch, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm(user)) {
      return;
    }
    try {
      const resp = await LoginUser(user);
      dispatch(setUser({ token: resp.token, role: GetUserRole(resp.token), isVerified: GetUserVerification(resp.token) }));
      navigate('/');

    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
      setLoginUser((prevUser) => ({ ...prevUser, email: '', password: ''}))
    }
  };

  function validateForm(user){
    if(user.email.trim() === '' || user.password.trim() === ''){
      setErrorMessage('Please fill out all required fields.');
      return false;
    }

    return true;
  }

  return (
    <form onSubmit={handleLogin}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "50%",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ mt: "10vh" }}>
            Welcome to Web Shop
          </Typography>
          <CardGiftcardIcon sx={{ fontSize: 40, mt: "2vh" }} />
        </Box>
        
        {errorMessage && (
            <Alert variant="outlined" severity="error" size="small">
              {errorMessage}
            </Alert>
          )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "50%",
            my: "1vh"
          }}
        >

          <TextField
            required
            id="email"
            label="Email"
            variant="filled"
            size="small"
            value={user.email}
            sx={{ width: "370px" }}
            onChange={(e) =>
              setLoginUser((prevUser) => ({ ...prevUser, email: e.target.value }))
            }
          />

          <TextField
            id="password"
            required
            label="Password"
            type="password"
            variant="filled"
            size="small"
            value={user.password}
            sx={{ width: "370px" }}
            onChange={(e) =>
              setLoginUser((prevUser) => ({ ...prevUser, password: e.target.value }))
            }
          />

          <Button
            endIcon={<LoginIcon />}
            variant="outlined"
            color="secondary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Log in
          </Button>

          <Box sx={{ mt: 2 }}>
            <Link href="/registration" variant="body2">
              Don't have an account? Sign up!
            </Link>
          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Or
          </Typography>

          <div id="signInDiv"></div>
        </Box>
      </Box>
    </form>
  );
          
}
export default Login;

  