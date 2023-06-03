import './App.css';
import { Routes, Route } from 'react-router-dom';
import Registration from './components/Users/Registration';
import Verification from './components/Users/Verification';
import Home from './components/Users/Home';
import Profile from './components/Users/Profile';
import { useDispatch} from 'react-redux';
import PrivateRoutes from './utils/PrivateRoutes';
import { setUser } from './redux/userSlice';
import { useEffect } from 'react';
import { GetUserRole } from './utils/CurrentUser';
import SellerArticles from './components/Item/SellerArticles';

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
           <Route path="/seller-articles" element={<SellerArticles />}/>
        </Route>
        <Route path="/" element={<Home/>} />
        <Route path="/registration" element={<Registration />}/>
      </Routes>
      </>
  );
}

export default App;
