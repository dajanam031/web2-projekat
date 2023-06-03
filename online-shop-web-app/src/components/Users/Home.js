import {AppBar, Toolbar, Box } from '@mui/material';
import {Button} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import DensitySmallRoundedIcon from '@mui/icons-material/DensitySmallRounded';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../redux/userSlice';
import Login from './Login';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import BallotIcon from '@mui/icons-material/Ballot';
import HistoryIcon from '@mui/icons-material/History';
import ListAltIcon from '@mui/icons-material/ListAlt';

function Home() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
    };

    return (
      <>
        {user.token === null && (
          <>
          <Login/>
          </>
        )}
        {user.token !== null && (
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'grey' }}>
              <Toolbar>
                <Button color="inherit" component={Link} to="/profile">
                  <PersonRoundedIcon/>
                  Profile
                </Button>
                {user.role === 'Administrator' && (
                    <div>
                  <Button color="inherit" component={Link} to="/verification">
                    <CheckBoxRoundedIcon/>
                  Verification
                  </Button>
                  <Button color="inherit" component={Link} to="/orders">
                    <DensitySmallRoundedIcon/>
                    All Orders
                  </Button>
                    </div>
                )}
                {user.role === 'Customer' && (
                    <div>
                  <Button color="inherit" component={Link} to="/article-list">
                    <ListAltIcon/>
                  Articles 
                  </Button>
                  <Button color="inherit" component={Link} to="/customer-orders">
                    <HistoryIcon/>
                    Previous orders
                  </Button>
                    </div>
                )}
                {user.role === 'Seller' && (
                    <div>
                  <Button color="inherit" component={Link} to="/seller-articles">
                    <ListAltIcon/>
                  My articles
                  </Button>
                  <Button color="inherit" component={Link} to="/seller-orders">
                    <BallotIcon/>
                    My orders
                  </Button>
                  <Button color="inherit" component={Link} to="/new-orders">
                    <FiberNewIcon/>
                    New orders
                  </Button>
                    </div>
                )}
                
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