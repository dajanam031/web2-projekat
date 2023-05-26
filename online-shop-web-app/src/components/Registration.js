import { React, useState } from "react";
import { RegisterUser } from "../services/UserService";
import { TextField, Button, MenuItem  } from '@mui/material';
import Box from '@mui/material/Box';
import { User } from "../models/User";
import Alert from '@mui/material/Alert';
import SendIcon from '@mui/icons-material/Send';

function Registration() {
  const [user, setUser] = useState(new User());
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const resp = await RegisterUser(user);
      console.log(resp);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleRegistration}>
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
          onChange={(e) => setUser((prevUser) => ({ ...prevUser, email: e.target.value }))}
        />
        <TextField
          id="username"
          label="Username"
          variant="filled"
          size="small"
          value={user.username}
          onChange={(e) => setUser((prevUser) => ({ ...prevUser, username: e.target.value }))}
        />
        </div>
        <div>
        <TextField
          id="firstName"
          label="Firstname"
          variant="filled"
          size="small"
          value={user.firstName}
          onChange={(e) => setUser((prevUser) => ({ ...prevUser, firstName: e.target.value }))}
        />
        <TextField
          id="lastName"
          label="Lastname"
          variant="filled"
          size="small"
          value={user.lastName}
          onChange={(e) => setUser((prevUser) => ({ ...prevUser, lastName: e.target.value }))}
        />
        </div>
        <div>
        <TextField
          id="address"
          label="Address"
          variant="filled"
          size="small"
          value={user.address}
          onChange={(e) => setUser((prevUser) => ({ ...prevUser, address: e.target.value }))}
        />
        <TextField
          id="birthDate"
          label="Date of birth"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="filled"
          size="small"
          value={user.birthDate}
          onChange={(e) => setUser((prevUser) => ({ ...prevUser, birthDate: e.target.value }))}
        />
        </div>
        <div>
        <TextField
          id="imageUri"
          label="Upload image"
          variant="filled"
          size="small"
          value={user.imageUri}
          onChange={(e) => setUser((prevUser) => ({ ...prevUser, imageUri: e.target.value }))}
        />
        <TextField
          id="userType"
          select
          helperText="Please select your type"
          variant="filled"
          size="small"
          value={user.userType}
          onChange={(e) => setUser((prevUser) => ({ ...prevUser, userType: e.target.value }))}
        ><MenuItem value="0">Customer</MenuItem>
        <MenuItem value="1">Seller</MenuItem>
        </TextField>
      </div>
      <div>
      <TextField
          id="password"
          label="Password"
          variant="filled"
          type="password"
          size="small"
          value={user.password}
          onChange={(e) => setUser((prevUser) => ({ ...prevUser, password: e.target.value }))}
        />
        <TextField
          id="confirm-password"
          label="Confirm password"
          variant="filled"
          type="password"
          size="small"
          // value={user.password2}
          // onChange={(e) => setUser((prevUser) => ({ ...prevUser, password2: e.target.value }))}
        />
      </div>
      <div>
            <Button endIcon={<SendIcon />} variant="outlined" color="secondary" type="submit">
              Submit
            </Button>
          </div>
    </Box>
    </Box>
    </form>
  );
}

export default Registration;