import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import Profile from './components/Profile';
import { Provider,} from 'react-redux';
import store from './redux/store';

function App() {
  
  return (
    <Provider store={store}>
      <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />}/>
        <Route path="/registration" element={<Registration />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
      </>
      </Provider>
  );
}

export default App;
