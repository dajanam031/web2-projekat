import {AppBar, Toolbar, Box } from '@mui/material';
import {Button} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import DensitySmallRoundedIcon from '@mui/icons-material/DensitySmallRounded';
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
      <>
        {!user && (
          <>
          <Login/>
          </>
        )}
        {user && (
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'grey' }}>
              <Toolbar>
                <Button color="inherit" component={Link} to="/profile">
                  <PersonRoundedIcon/>
                  Profile
                </Button>
                <Button color="inherit" component={Link} to="/products">
                  <CheckBoxRoundedIcon/>
                Verification
                </Button>
                <Button color="inherit" component={Link} to="/orders">
                  <DensitySmallRoundedIcon/>
                  All Orders
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                  <ExitToAppIcon />
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
        )}
        </>
    );
  }

export default Home;