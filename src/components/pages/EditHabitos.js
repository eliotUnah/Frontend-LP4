import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import useHabits from '../hooks/getHabits.js';
import useUpdateHabit from '../hooks/editHabits.js';

const EditHabitos = () => {
  const { habitId } = useParams();
  const navigate = useNavigate();
  const { habits, loading: habitsLoading, error: habitsError } = useHabits();
  const { updateHabit, loading, response, error } = useUpdateHabit();

  const [habitData, setHabitData] = useState({
    title: '',
    frequency: '',
    category: ''
  });

  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const habit = habits.find(h => h._id === habitId);
    if (habit) {
      setHabitData({
        title: habit.title,
        frequency: habit.frequency,
        category: habit.category
      });
      setCharCount(habit.title.length);
    }
  }, [habits, habitId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitData(prev => ({ ...prev, [name]: value }));
    if (name === 'title') setCharCount(value.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      habitId,
      title: habitData.title,
      frequency: habitData.frequency,
      category: habitData.category
    };

   const res = await updateHabit(payload);
    if (res?.message) {
  Swal.fire({
    title: '✅ ¡Hábito actualizado!',
    text: res.message,
    icon: 'success',
    confirmButtonColor: '#00b894'
  }).then(() => {
    navigate('/dasboard-habitos');
  });
}

    if (error) {
      Swal.fire({
        title: '❌ Error al actualizar',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d63031'
      });
    }
  };

  return (
    <div className="crear-habito centrado-flex bg-gradient-to-br from-teal-50 to-mint-50 font-sans">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 via-mint-500 to-teal-400 p-6">
            <h1 className="text-3xl font-display font-bold text-white">Editar tu hábito</h1>
            <p className="text-teal-100 mt-1">Mejorar es parte del proceso</p>
          </div>

          {habitsLoading && <p className="p-4 text-gray-500">Cargando hábito...</p>}
          {habitsError && <p className="p-4 text-red-500">{habitsError}</p>}

          {!habitsLoading && !habitsError && (
            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {/* Título */}
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-gray-700">
                  ¿Qué hábito quieres mejorar?*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={habitData.title}
                    onChange={handleChange}
                    maxLength={50}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-gray-400 transition"
                    placeholder="Ej: Caminar 20 minutos"
                  />
                  <div className="absolute right-3 top-3 text-xs text-gray-400 bg-white px-1">
                    {charCount}/50
                  </div>
                </div>
              </div>

              {/* Categoría */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">Categoría</h3>
                <select
                  name="category"
                  value={habitData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Salud">Salud</option>
                  <option value="Productividad">Productividad</option>
                  <option value="Bienestar">Bienestar</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>

              {/* Frecuencia */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">Frecuencia</h3>
                <select
                  name="frequency"
                  value={habitData.frequency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Selecciona una frecuencia</option>
                  <option value="Diario">Diario</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Mensual">Mensual</option>
                </select>
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-teal-600 via-mint-500 to-teal-400 hover:from-teal-700 hover:to-mint-600 focus:outline-none transition"
                >
                  {loading ? 'Actualizando...' : 'Actualizar hábito'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditHabitos;
