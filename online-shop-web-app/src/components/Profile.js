import React from 'react';
import { useEffect, useState } from 'react';
import { UserProfile } from '../services/UserService';
import { Box, Typography, TextField, Button, Alert, IconButton, 
  Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ChangeUserProfile } from '../services/UserService';
import EditIcon from '@mui/icons-material/Edit';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { UpdateUser } from '../models/UpdateUser';
import { ChangeUserPassword } from '../services/UserService';

const Profile = () => {
 // const user = useSelector((state) => state.user.user);
  const [profileData, setProfileData] = useState(new UpdateUser());
  const [confirmPass, setConfirmPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorPass, setErrorPass] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const profile = async () => {
    try {
      const resp = await UserProfile();
      setProfileData(resp);
      const dateObject = new Date(resp.birthDate);
      const formattedDate = dateObject.toISOString().split('T')[0];
      setProfileData((prevData) => ({
        ...prevData,
        birthDate: formattedDate,
      }));
    } catch (error) {
      console.log(error.message);
    }
  
};

  useEffect(() => {
    profile();
  }, []);

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    if (!validateForm(profileData)) {
        return;
      }
      try {
        const resp = await ChangeUserProfile(profileData);
        setProfileData(resp);
        const dateObject = new Date(resp.birthDate);
        const formattedDate = dateObject.toISOString().split('T')[0];
        setProfileData((prevData) => ({
        ...prevData,
        birthDate: formattedDate,
      }));
        setIsEditing(false);
  
      } catch (error) {
        console.log(error.message);
      }
  };

  const handleDecline = async(e) => {
    profile();
    setIsEditing(false);
  };

  function validateForm(user) {
    const trimmedFields = ['username', 'firstName', 'lastName', 'address'];
    const hasEmptyRequiredFields = trimmedFields.some((field) => user[field].trim() === '');

    if (hasEmptyRequiredFields) {
      setErrorMessage("Fields cannot be empty. Please try again.");
      return false;
  }
    return true;
  }

  function validatePasswords(newPass, confirmPass) {
    if(newPass !== confirmPass){
      setErrorPass("Passwords doesn't match. Try again.");
      setConfirmPass('');
      return false;
    }

    return true;
  }

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setConfirmPass('');
    setErrorPass('');
  };

  const handleCloseAlert = () => {
    setSuccessMessage('');
  };

  const handleChangingPass = async (e) => {
    e.preventDefault();
    if (!validatePasswords(newPass, confirmPass)) {
      return;
    }
    try {
      const resp = await ChangeUserPassword({'newPassword': newPass});
      setSuccessMessage(resp);

    } catch (error) {
      setErrorMessage(error.message);
    }
    handleClose();
  };

return (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >{profileData && (
          <>
    <Typography variant="h6" component="h6" gutterBottom>
      Profile Information
      <IconButton onClick={handleEdit}>
        <EditIcon />
            </IconButton>
    </Typography>
    <form onSubmit={handleSubmit}>
    <div>{errorMessage && <Alert variant="outlined" severity="error">{errorMessage}</Alert>}</div>
    <div>{successMessage && <Alert variant="outlined" severity="success">{successMessage} <IconButton size='small' onClick={handleCloseAlert}>
        <CloseRoundedIcon />
            </IconButton></Alert>}</div>
      <div>
      <TextField
        name="email"
        variant="filled"
        sx={{ width: "350px" }}
        label="Email"
        value={profileData.email}
        size='small'
        disabled
      />
      </div>
      <div>
      <TextField
        name="firstName"
        variant="filled"
        sx={{ width: "350px" }}
        label="First Name"
        value={profileData.firstName}
        onChange={(e) => setProfileData((prevUser) => ({ ...prevUser, firstName: e.target.value }))}
        size='small'
        disabled={!isEditing}
      />
      </div>
      <div>
      <TextField
        name="lastName"
        variant="filled"
        label="Last Name"
        sx={{ width: "350px" }}
        value={profileData.lastName}
        onChange={(e) => setProfileData((prevUser) => ({ ...prevUser, lastName: e.target.value }))}
        size='small'
        disabled={!isEditing}
      />
      </div>
      <div>
      <TextField
        name="username"
        variant="filled"
        label="Username"
        sx={{ width: "350px" }}
        value={profileData.username}
        onChange={(e) => setProfileData((prevUser) => ({ ...prevUser, username: e.target.value }))}
        size='small'
        disabled={!isEditing}
      />
      </div>
      <div>
      <TextField
        name="address"
        variant="filled"
        label="Address"
        sx={{ width: "350px" }}
        value={profileData.address}
        onChange={(e) => setProfileData((prevUser) => ({ ...prevUser, address: e.target.value }))}
        size='small'
        disabled={!isEditing}
      />
      </div>
      <div>
      <TextField
        variant="filled"
        name="birthDate"
        label="Date of birth"
        sx={{ width: "350px" }}
        value={profileData.birthDate}
        onChange={(e) => setProfileData((prevUser) => ({ ...prevUser, birthDate: e.target.value }))}
        size='small'
        type='date'
        disabled={!isEditing}
      />
      </div>
      <div>
      <TextField
        name="imageUri"
        variant="filled"
        sx={{ width: "350px" }}
        label="Profile picture"
        value={profileData.imageUri}
        onChange={(e) => setProfileData((prevUser) => ({ ...prevUser, imageUri: e.target.value }))}
        size='small'
        disabled={!isEditing}
      />
      </div>
      {isEditing &&
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        disabled={!isEditing}
        endIcon={<CheckRoundedIcon />}
        type="submit"
        variant="outlined"
        color="success"
      >
        Apply
      </Button>
      <Button
        disabled={!isEditing}
        endIcon={<CloseRoundedIcon />}
        onClick={handleDecline}
        variant="outlined"
        color="error"
      >
        Discard
      </Button>
      </div>}
      <div>

      <Button variant="contained" onClick={handleOpen} color="primary">
        Change password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change your password</DialogTitle>
        <DialogContent>
        {errorPass && (
            <Typography variant="body1" color="error">
              {errorPass}
            </Typography>
          )}
          <form onSubmit={handleChangingPass}>
            <TextField label="New password"
            onChange={(e) => setNewPass(e.target.value)}
            variant='filled' type='password' />
            <br/>
            <TextField label="Confirm new password"
            onChange={(e) => setConfirmPass(e.target.value)}
            variant='filled' value={confirmPass} type='password' />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChangingPass} type='submit' color="primary" variant="contained">
            Change
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </form>
          </>
      )}

            {!profileData && (
                <>
                <h1>Loading profile..</h1>
                </>
            )}
              </Box>
      );
}

export default Profile;
