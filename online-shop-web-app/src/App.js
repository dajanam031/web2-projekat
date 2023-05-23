import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import FacebookSignUp from './components/FacebookSignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ovde renderujemo sve komponente
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/facebook-signup' element={<FacebookSignUp/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
