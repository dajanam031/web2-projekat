import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/Users/Registration';
import Verification from './components/Users/Verification';
import Home from './components/Users/Home';
import Profile from './components/Users/Profile';
import { useDispatch, useSelector} from 'react-redux';
import PrivateRoutes from './utils/PrivateRoutes';
import { setUser } from './redux/userSlice';
import { useEffect } from 'react';
import { GetUserRole, GetUserVerification } from './utils/CurrentUser';
import SellerArticles from './components/Item/SellerArticles';

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = {
        token,
        role: GetUserRole(token),
        isVerified: GetUserVerification(token) 
      };
      console.log(user);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
      <>
      <Routes>
        {/* rute koje zelim da zastitim */}
        <Route element={<PrivateRoutes/>}> 
            <Route path="/profile" element={<Profile />} />
            {user.role === "Administrator" ? (
              <Route path="/verification" element={<Verification />} />
            ) : (
              <Route path="/verification" element={<Navigate to="/" />} />
            )}
            {user.role === "Seller" ? (
              <Route path="/seller-articles" element={<SellerArticles />} />
            ) : (
              <Route path="/seller-articles" element={<Navigate to="/" />} />
            )}
        </Route>
        <Route path="/" element={<Home/>} />
        <Route path="/registration" element={<Registration />}/>
      </Routes>
      </>
  );
}

export default App;
