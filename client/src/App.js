import { BrowserRouter as Router, Route, Routes, useLocation  } from 'react-router-dom';
import './output.css';
import Dashboard from './components/Dashboard';
import Wheel from './components/Wheel';
import Login from './components/Login';
import User from './components/User';

function App() {  

  const location = useLocation();

  // Determine if we are on the Dashboard page
  const isDashboard = location.pathname === '/dashboard';

  return (
    
      <div className={`App ${isDashboard ? 'no-background' : ''}`}>
        <nav className="w-20">
          <div className='m-2 p-2 flex justify-between items-center mx-auto'>
            <img src='./Group 4.png' className='items-start max-w-96 lg:w-auto lg:h-auto 2xl:w-auto 2xl:h-96' alt="Logo" />
          </div>
        </nav>

        <Routes>
          <Route path="/" element={ <Wheel />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/user-login" element={<User/>} />
        </Routes>
      </div>
    
  );
}

export default App;
