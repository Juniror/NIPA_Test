import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import TicketList from './pages/TicketPage'
import LoginPage from './pages/LoginPage'
import './css/App.css'

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (userData) => {
    setUser(userData);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/login" element={
        user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />
      } />

      <Route path="/dashboard" element={<TicketList user={user} onLogout={handleLogout} />} />

      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
    </Routes>
  )
}

export default App
