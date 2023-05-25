import { React, useState } from "react";
import { RegisterUser } from "../services/UserService";
import { TextField, Button, Link  } from '@mui/material';
import Box from '@mui/material/Box';
import { User } from "../models/User";

function Registration() {
  const [user, setUser] = useState(new User());

  const handleRegistration = (e) => {
    e.preventDefault();
    const register = async() => {
      const resp = await RegisterUser(user);
      console.log(resp);
    }
    register()
  }
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
          // value={user.userType}
          // onChange={(e) => setUser((prevUser) => ({ ...prevUser, userType: e.target.value }))}
          SelectProps={{
            native: true,
          }}
        >
          <option key="customer" value="customer">
              Customer
          </option>
          <option key="seller" value="seller">
              Seller
          </option>
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
      <Button variant="contained" color="secondary" type="submit">Submit</Button>
      <Link href="/facebook-signup" underline="none">
      <Button variant="contained" color="secondary">
        Or sign up with Facebook
      </Button>
    </Link>
      </div>
    </Box>
    </Box>
    </form>
  );
}

export default Registration;