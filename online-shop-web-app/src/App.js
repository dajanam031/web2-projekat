import './App.css';
import { Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Verification from './components/Verification';
import Home from './components/Home';
import Profile from './components/Profile';
import { Provider,} from 'react-redux';
import store from './redux/store';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  
  return (
    <Provider store={store}>
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
      </Provider>
  );
}

export default App;
