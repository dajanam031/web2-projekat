import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/Users/Registration';
import Verification from './components/Users/Verification';
import Home from './components/Users/Home';
import Profile from './components/Users/Profile';
import { useDispatch, useSelector} from 'react-redux';
import PrivateRoutes from './utils/PrivateRoutes';
import { setUser } from './redux/userSlice';
import { useEffect, useState } from 'react';
import { GetUserRole, GetUserVerification } from './utils/CurrentUser';
import SellerArticles from './components/Item/SellerArticles';
import AllArticles from './components/Item/AllArticles';
import Cart from './components/Orders/Cart';
import CustomerOrders from './components/Orders/CustomerOrders';

function App() {
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
            {user.role === "Seller" && user.isVerified === 'True' ? (
              <Route path="/seller-articles" element={<SellerArticles />} />
            ) : (
              <Route path="/seller-articles" element={<Navigate to="/" />} />
            )}
             {user.role === "Customer" ? (
                <>
                  <Route path="/all-articles" element={<AllArticles />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="customer-orders" element={<CustomerOrders/>}/>
                </>) : (<>
                <Route path="/all-articles" element={<Navigate to="/" />} />
                <Route path="/cart" element={<Navigate to="/" />} />
                <Route path="customer-orders" element={<Navigate to="/" />}/>
                </>
              )}
        </Route>
        <Route path="/" element={<Home/>} />
        <Route path="/registration" element={<Registration />}/>
      </Routes>
      </>
  );
}

export default App;
