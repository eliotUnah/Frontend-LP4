import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import CrearHabito from './components/pages/CrearHabito';
import HabitsPage from './components/pages/DashboardHabitos'; 
import EditHabitos from './components/pages/EditHabitos'; // ✅ nuevo componente visual con lógica


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/crear-habito" element={<CrearHabito />} /> {/* ✅ actualizado */}
        <Route path="/dasboard-habitos" element={<HabitsPage />} /> {/* ✅ actualizado */}
        <Route path="/editar-habito/:habitId" element={<EditHabitos />} />
      </Routes>
    </Router>
  );
}
export default App;
