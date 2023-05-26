import { React, useState } from "react";
import { RegisterUser } from "../services/UserService";
import { TextField, Button, MenuItem} from '@mui/material';
import Box from '@mui/material/Box';
import { User } from "../models/User";
import Alert from '@mui/material/Alert';
import LoginIcon from '@mui/icons-material/Login';

function Registration() {
  const [user, setUser] = useState(new User());
  const [confirmPass, setConfirmPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  function validateForm(user, confirmPass) {
    if (user.password !== confirmPass) {
      setErrorMessage('Passwords does not match. Try again!');
      setUser((prevUser) => ({ ...prevUser, password: '' }));
      setConfirmPass('');
      return false; 
    }
    const trimmedFields = ['email', 'username', 'firstName', 'lastName', 'address'];
    const hasEmptyRequiredFields = trimmedFields.some((field) => user[field].trim() === '');

    if (hasEmptyRequiredFields) {
      setErrorMessage("Please fill in all required fields.");
      return;
  }
    return true;
  }

  const handleRegistration = async (e) => {
    e.preventDefault();
    console.log(user);
    if (!validateForm(user, confirmPass)) {
      return;
    }
    try {
      const resp = await RegisterUser(user);
      console.log(resp);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const imageUri = URL.createObjectURL(file);
    setUser((prevUser) => ({ ...prevUser, imageUri }));
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
          required
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
          required
          label="Firstname"
          variant="filled"
          size="small"
          value={user.firstName}
          onChange={(e) => setUser((prevUser) => ({ ...prevUser, firstName: e.target.value }))}
        />
        <TextField
          id="lastName"
          required
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
          required
          label="Address"
          variant="filled"
          size="small"
          value={user.address}
          onChange={(e) => setUser((prevUser) => ({ ...prevUser, address: e.target.value }))}
        />
        <TextField
          id="birthDate"
          required
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
        helperText="Upload Image"
        required
        type="file"
        InputProps={{
          inputProps: {
            accept: 'image/*',
          },
          startAdornment: selectedFile && (
            <img
              src={user.imageUri}
              alt="Selected"
              style={{ width: '20px', height: '20px', objectFit: 'cover' }}
            />
          ),
        }}
        onChange={handleFileChange}
      />
        <TextField
          id="userType"
          select
          helperText="Please select your type"
          variant="filled"
          size="small"
          value={user.userType}
          onChange={(e) => setUser((prevUser) => ({ ...prevUser, userType: e.target.value }))}
        ><MenuItem value={0}>Customer</MenuItem>
        <MenuItem value={1}>Seller</MenuItem>
        </TextField>
      </div>
      <div>
      <TextField
          id="password"
          required
          label="Password"
          variant="filled"
          type="password"
          size="small"
          value={user.password}
          onChange={(e) => setUser((prevUser) => ({ ...prevUser, password: e.target.value }))}
        />
        <TextField
          id="confirmPass"
          required
          label="Confirm password"
          variant="filled"
          type="password"
          size="small"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />
      </div>
      <div>
            <Button endIcon={<LoginIcon />} variant="outlined" color="secondary" type="submit">
              Sign up
            </Button>
          </div>
    </Box>
    </Box>
    </form>
  );
}

export default Registration;