import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import CrearHabito from './components/pages/CrearHabito';
import HabitsPage from './components/pages/DashboardHabitos'; 
import EditHabitos from './components/pages/EditHabitos';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import LandingPage from './components/pages/LandingPage';
import ResetPassword from './components/pages/actualizarContra';
import { AuthProvider } from './contexts/AuthContext'; 
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/updateContra" element={<ResetPassword />} />

          {/* Rutas protegidas dentro del wrapper PrivateRoute */}
          <Route element={<PrivateRoute />}>
            <Route path="/crear-habito" element={<CrearHabito />} />
            <Route path="/dasboard-habitos" element={<HabitsPage />} />
            <Route path="/editar-habito/:habitId" element={<EditHabitos />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
