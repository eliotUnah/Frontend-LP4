import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import CrearHabito from './components/pages/CrearHabito';
import HabitsPage from './components/pages/DashboardHabitos'; 
import EditHabitos from './components/pages/EditHabitos'; // ✅ nuevo componente visual con lógica
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import LandingPage from './components/pages/LandingPage';
import ResetPassword from './components/pages/actualizarContra';
import { AuthProvider } from './contexts/AuthContext'; 


function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/crear-habito" element={<CrearHabito />} /> {/* ✅ actualizado */}
        <Route path="/dasboard-habitos" element={<HabitsPage />} /> {/* ✅ actualizado */}
        <Route path="/editar-habito/:habitId" element={<EditHabitos />} />
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/updateContra" element={<ResetPassword />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}
export default App;