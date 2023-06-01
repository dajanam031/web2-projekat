import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/userSlice';
import Login from './Login';

function Home() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

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
          <Login/>
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