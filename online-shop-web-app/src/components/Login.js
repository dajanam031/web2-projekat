import { React, useState } from "react";
import Alert from '@mui/material/Alert';
import LoginIcon from '@mui/icons-material/Login';
import { TextField, Button} from '@mui/material';
import Box from '@mui/material/Box';
import { UserLogin } from "../models/UserLogin";
import { LoginUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from "../redux/userSlice";


function Login() {
  const [user, setLoginUser] = useState(new UserLogin());
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm(user)) {
      return;
    }
    try {
      const resp = await LoginUser(user);
      localStorage.setItem('token', resp);
      dispatch(setUser(user));
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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>{errorMessage && <Alert variant="outlined" severity="error">{errorMessage}</Alert>}</div>
      <div>
        <TextField
          required
          id="email"
          label="Email"
          variant="filled"
          size="small"
          value={user.email}
          onChange={(e) => setLoginUser((prevUser) => ({ ...prevUser, email: e.target.value }))}
        />
        </div>
        <div>
        <TextField
          id="password"
          required
          label="Password"
          type="password"
          variant="filled"
          size="small"
          value={user.password}
          onChange={(e) => setLoginUser((prevUser) => ({ ...prevUser, password: e.target.value }))}
        />
        </div>
        <div>
            <Button endIcon={<LoginIcon />} variant="outlined" color="secondary" type="submit">
              Log in
            </Button>
          </div>
        </Box>
        </Box>
        </form>
  );
}

export default Login;

  