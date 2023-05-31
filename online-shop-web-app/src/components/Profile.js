import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserProfile } from '../services/UserService';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { ChangeUserProfile } from '../services/UserService';

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  
  const [profileData, setProfileData] = useState(null);
  const [confirmPass, setConfirmPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const profile = async () => {
      if (user.email) {
        try {
          const resp = await UserProfile(user.email);
          console.log(resp);
          setProfileData(resp);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
  
    profile();
  }, [user.email]);

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    if (!validateForm(profileData)) {
        return;
      }
      try {
        await ChangeUserProfile(user);
  
      } catch (error) {
        console.log(error.message);
      }
    console.log(profileData);
  };

  function validateForm(user, confirmPass) {
    // if (user.password !== confirmPass) {
    //   setErrorMessage('Passwords does not match. Try again!');
    //   setProfileData((prevData) => ({ ...prevData, password: '' }));
    //   setConfirmPass('');
    //   return false; 
    // }
    const trimmedFields = ['username', 'firstName', 'lastName', 'address'];
    const hasEmptyRequiredFields = trimmedFields.some((field) => user[field].trim() === '');

    if (hasEmptyRequiredFields) {
      setErrorMessage("Required fields cannot be empty. Please try again.");
      return;
  }
    return true;
  }

return (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
            {!profileData && (
                <>
                <h1>Loading profile..</h1>
                </>
            )}
            {profileData && (
                <>
          <Typography variant="h6" component="h6" gutterBottom>
            Profile Information
          </Typography>
          <form onSubmit={handleSubmit}>
          <div>{errorMessage && <Alert variant="outlined" severity="error">{errorMessage}</Alert>}</div>
            <div>
            <TextField
              name="email"
              label="Email"
              value={profileData.email}
              onChange={(e) => setProfileData((prevUser) => ({ ...prevUser, email: e.target.value }))}
              size='small'
              margin="normal"
              disabled
            />
            <TextField
              name="firstName"
              required
              label="First Name"
              value={profileData.firstName}
              onChange={(e) => setProfileData((prevUser) => ({ ...prevUser, firstName: e.target.value }))}
              size='small'
              margin="normal"
            />
            <TextField
              name="lastName"
              required
              label="Last Name"
              value={profileData.lastName}
              onChange={(e) => setProfileData((prevUser) => ({ ...prevUser, lastName: e.target.value }))}
              size='small'
              margin="normal"
            />
            </div>
            <div>
            <TextField
              name="username"
              required
              label="Username"
              value={profileData.username}
              onChange={(e) => setProfileData((prevUser) => ({ ...prevUser, username: e.target.value }))}
              size='small'
              margin="normal"
            />
            <TextField
              name="address"
              required
              label="Address"
              value={profileData.address}
              onChange={(e) => setProfileData((prevUser) => ({ ...prevUser, address: e.target.value }))}
              size='small'
              margin="normal"
            />
            <TextField
              required
              name="birthDate"
              label="Date of birth"
              value={profileData.birthDate}
              onChange={(e) => setProfileData((prevUser) => ({ ...prevUser, birthDate: e.target.value }))}
              size='small'
              margin="normal"
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
            />
            </div>
            <div>
            <TextField
              name="imageUri"
              required
              label="Profile picture"
              value={profileData.imageUri}
              onChange={(e) => setProfileData((prevUser) => ({ ...prevUser, imageUri: e.target.value }))}
              size='small'
              margin="normal"
            />
            <TextField
              name="password"
              label="Password"
              onChange={(e) => setProfileData((prevUser) => ({ ...prevUser, password: e.target.value }))}
              size='small'
              margin="normal"
              type='password'
            />
            <TextField
              name="confirmPass"
              label="Confirm new password"
              onChange={(e) => setConfirmPass(e.target.value)}
              size='small'
              margin="normal"
              value={confirmPass}
              type='password'
            />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Save changes
            </Button>
          </form>
                </>
            )}
        </Box>
      );
}

export default Profile;
