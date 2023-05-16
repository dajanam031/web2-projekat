import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ovde renderujemo sve komponente
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login name='Dajana'/>}/>
        <Route path='/registration' element={<Registration/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
