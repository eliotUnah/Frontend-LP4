import React from 'react';
import { useState, useRef, useEffect } from 'react';
import useHabits from '../hooks/getHabits.js';
import { useDeleteHabit } from '../hooks/deleteHabits.js';
import useCreateCheckin  from '../hooks/checkinHabits.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../contexts/AuthContext';

import '../styles/Dashboard.css';
   
const HabitsPage = () => {
  const { habits, loading, error } = useHabits();
  //  crear check-ins
  const { logout } = useAuth();//ES NECESARIO PARA CERRAR LA SESION Y LIMPIAR COKIEE
const { createCheckin, loading: checkinLoading, error: checkinError, success: checkinSuccess } = useCreateCheckin();
const handleCheckinHabit = async (habitId) => {
  const resultado = await createCheckin(habitId);

  if (resultado) {
    Swal.fire({
      title: '✅ Check-in hecho',
      text: `Racha actual: ${resultado.streakCurrent}, Mejor racha: ${resultado.streakBest}`,
      icon: 'success',
      confirmButtonColor: '#00b894',
    });
  } else if (checkinError) {
    Swal.fire({
      title: '❌',
      text: checkinError,
      icon: 'error',
      confirmButtonColor: '#d63031',
    });
  }
};
  // Borrar el hábito
 const { deleteHabit, loading: deleting, error: deleteError, success } = useDeleteHabit();
 //Navegador de componentes
const navigate = useNavigate();
 // Cantidad de hábitos por página (slide)
 const habitsPerPage = 4;
 // Cálculo del número total de páginas deslizable
  const totalSlides =2;
  // Porcentaje de desplazamiento por cada slide (ej. 50% del contenedor)
  const slideWidth = 50; 
  // Referencia al DOM del contenedor del slider para aplicar transformaciones
  const sliderRef = useRef(null);
// Estado para controlar qué slide está activo actualmente
const [currentIdx, setCurrentIdx] = useState(0);
// Efecto que actualiza la posición del slider cuando cambia el índice
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIdx * slideWidth}%)`;
    }
  }, [currentIdx]);

const handleNext = () => {
  setCurrentIdx((prev) => (prev + 1) % totalSlides);
};

const handlePrev = () => {
  setCurrentIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
};

  // Confirmación y eliminación
  const handleDeleteHabit = async (habitId) => {
  const resultado = await Swal.fire({
    title: '¿Eliminar hábito?',
    text: '⚠️ Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d63031',
    cancelButtonColor: '#00b894',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (!resultado.isConfirmed) return;

  try {
    await deleteHabit(habitId);
    console.log('✅ Hábito eliminado');

    Swal.fire({
      title: '✅ Eliminado',
      text: 'El hábito ha sido eliminado correctamente.',
      icon: 'success',
      confirmButtonColor: '#00b894'
    });
  } catch (e) {
    console.error('❌ Error al eliminar:', e);

    Swal.fire({
      title: '❌ Error',
      text: 'Ocurrió un problema al intentar eliminar el hábito.',
      icon: 'error',
      confirmButtonColor: '#d63031'
    });
  }
};

  // Para mostrar solo los hábitos visibles por slide
  const startIndex = currentIdx * habitsPerPage;
  const endIndex = startIndex + habitsPerPage;
 // Lógica corregida: slice + relleno
 let visibleHabits = habits.slice(startIndex, endIndex);

// Rellenar con tarjetas vacías si hay menos de 4 hábitos
while (visibleHabits.length < habitsPerPage) {
 visibleHabits.push(null);
}

  if (loading) return <p>Cargando hábitos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
  <div className="dashboard__container">
    {/* 🧱 Sidebar del Dashboard con perfil de usuario y menú de navegación */}
    <div className="dashboard__sidebar">
      <div className="dashboard__profile">
        <div className="dashboard__profile-img">E</div>
        <div className="dashboard__profile-name">Eliot</div>
        <div className="dashboard__profile-text">Usuario Premium</div>
      </div>
      <div className="dashboard__menu-items">
        <div className="dashboard__menu-item" onClick={() => navigate('/crear-habito')}
        style={{ cursor: 'pointer' }}>
          <div className="dashboard__menu-icon">🆕</div>
          <div className="dashboard__menu-text">Crear nuevo hábito</div>
        </div>
        <div className="dashboard__menu-item" onClick={() => navigate('/buscar-habito')}
          style={{ cursor: 'pointer' }}>
          <div className="dashboard__menu-icon">🔍</div>
          <div className="dashboard__menu-text">Buscar hábito</div>
        </div>
        <div className="dashboard__menu-item" onClick={() => navigate('/recordatorios')}
          style={{ cursor: 'pointer' }}>
          <div className="dashboard__menu-icon">⏰</div>
          <div className="dashboard__menu-text">Crear recordatorio</div>
        </div>
        <div className="dashboard__menu-item">
          <div className="dashboard__menu-icon">🏅</div>
          <div className="dashboard__menu-text">Ver medallas</div>
        </div>
        <div className="dashboard__menu-item">
          <div className="dashboard__menu-icon">🛡️</div>
          <div className="dashboard__menu-text">Insignias</div>
        </div>
        <div className="dashboard__menu-item">
          <div className="dashboard__menu-icon">📅</div>
          <div className="dashboard__menu-text">Calendario</div>
        </div>
        <div
  className="dashboard__menu-item"
  onClick={() => navigate('/progreso')}
  style={{ cursor: 'pointer' }}>
          <div className="dashboard__menu-icon">📊</div>
          <div className="dashboard__menu-text">Mi progreso</div>
        </div>
      <div
    className="dashboard__menu-item"
    style={{ cursor: 'pointer' }}
    onClick={async () => {
      try {
        await logout();
        navigate('/login');
      } catch (error) {
        console.error('❌ Error al cerrar sesión:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al cerrar sesión.',
          icon: 'error',
          confirmButtonColor: '#d63031',
        });
      }
    }}
  >
          <div className="dashboard__menu-icon">🚪</div>
          <div className="dashboard__menu-text">Cerrar Sesión</div>
        </div>
      </div>
    </div>
    </div>
<div className="dashboard__main-content">
  <div className="dashboard__header">
    <h1 className="dashboard__title">Bienvenido, tu mejor versión empieza aquí.
</h1>
    <p className="dashboard__subtitle">El cambio empieza aquí, uno por uno</p>
  </div>
{/* Mostrar los contenedores con habitos  */}
  <div className="dashboard__slider-container">
   <h2 className="dashboard__slider-title slider-title__fade-in">Tus Hábitos</h2>
    <div className="dashboard__slider" ref={sliderRef}>
      {visibleHabits.map((habit, index) => (
  habit ? (
    <div
      className="dashboard__slider-card habitsPage__fade-in-card"
      key={habit._id}
    >
      <div className="dashboard__card">
        <div className="dashboard__card-content">
          <h3 className="dashboard__habit_title">{habit.title}</h3>
        </div>
        <div className="dashboard__card-buttons">
          <button className="dashboard__checkin-button"  onClick={() => handleCheckinHabit(habit._id)}
           disabled={checkinLoading}>
            <svg className="dashboard__checkin-svgIcon" viewBox="0 0 512 512">
              <path d="M504.5 75.5l-297 297c-8.5 8.5-22.4 8.5-30.9 0l-168-168c-8.5-8.5-8.5-22.4 0-30.9s22.4-8.5 30.9 0L192 320.6 473.6 39c8.5-8.5 22.4-8.5 30.9 0s8.5 22.4 0 30.9z" />
            </svg>
          </button>
          <button
            className="dashboard__delete-button"
            onClick={() => handleDeleteHabit(habit._id)}
            disabled={deleting}
          >
            <svg className="dashboard__delete-svgIcon" viewBox="0 0 448 512">
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </button>
          <button
            className="dashboard__edit-button"
            onClick={() => navigate(`/editar-habito/${habit._id}`)}
          >
            <svg className="dashboard__edit-svgIcon" viewBox="0 0 512 512">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="dashboard__slider-card habitsPage__fade-in-card dashboard__card--empty"
      key={`placeholder-${index}`}
    >
      <div className="dashboard__card dashboard__card-content dashboard__card-content--placeholder">
        <span className="dashboard__placeholder-text">💡 Espacio disponible</span>
      </div>
    </div>
  )
))}
    </div>
  </div>
</div> 
{/* 🎯 Botones del primer slider */}
 <button className="dashboard__prev-btn" onClick={handlePrev}>❮</button>
 <button className="dashboard__next-btn" onClick={handleNext}>❯</button>

{/* 🎯 Sección sugerida */}
<div className="dashboard__main-content2">
  <div className='dashboard__slider-container habitsPage__fade-in-card2'>
    <h2 className="dashboard__slider-title">Intenta Con Ellos</h2>

    <div className="dashboard__slider" id="dashboard__autoSlider">
      <div className="dashboard__slider-card"><div className="dashboard__card"><div className="dashboard__card-content">Beber más agua</div></div></div>
      <div className="dashboard__slider-card"><div className="dashboard__card"><div className="dashboard__card-content">Caminar 10 minutos</div></div></div>
      <div className="dashboard__slider-card"><div className="dashboard__card"><div className="dashboard__card-content">Leer 5 páginas diarias</div></div></div>
      <div className="dashboard__slider-card"><div className="dashboard__card"><div className="dashboard__card-content">Meditar 2 minutos</div></div></div>
    </div>

    <button className="dashboard__prev-btn2" id="dashboard__prevBtn2">❮</button>
    <button className="dashboard__next-btn2" id="dashboard__nextBtn2">❯</button>

    <div className="dashboard__slider-nav" id="dashboard__sliderNav2">
      <div className="dashboard__slider-dot dashboard__slider-dot--active" data-index="0"></div>
      <div className="dashboard__slider-dot" data-index="1"></div>
      <div className="dashboard__slider-dot" data-index="2"></div>
      <div className="dashboard__slider-dot" data-index="3"></div>
    </div>
  </div>
</div>
</div>
  );
  };
export default HabitsPage;
