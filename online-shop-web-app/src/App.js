import './App.css';
import { Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Verification from './components/Verification';
import Home from './components/Home';
import Profile from './components/Profile';
import { useDispatch} from 'react-redux';
import PrivateRoutes from './utils/PrivateRoutes';
import { setUser } from './redux/userSlice';
import { useEffect } from 'react';
import { GetUserRole } from './utils/CurrentUser';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = {
        token,
        role: GetUserRole(token), 
      };
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
      <>
      <Routes>
        {/* rute koje zelim da zastitim */}
        <Route element={<PrivateRoutes/>}> 
           <Route path="/profile" element={<Profile />}/>
           <Route path="/verification" element={<Verification />}/>
        </Route>
        <Route path="/" element={<Home/>} />
        <Route path="/registration" element={<Registration />}/>
      </Routes>
      </>
  );
}

export default App;
