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
    category: '',
    startTime: '',
    durationMinutes: '',
    daysOfWeek: []
  });

  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const habit = habits.find(h => h._id === habitId);
    if (habit) {
      setHabitData({
        title: habit.title,
        frequency: habit.frequency,
        category: habit.category,
        startTime: habit.startTime ? habit.startTime.slice(0, 16) : '',
        durationMinutes: habit.durationMinutes || '',
        daysOfWeek: habit.daysOfWeek || []
      });
      setCharCount(habit.title.length);
    }
  }, [habits, habitId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitData(prev => ({
      ...prev,
      [name]: name === "durationMinutes" ? parseInt(value) : value
    }));
    if (name === 'title') setCharCount(value.length);
  };

  const handleDayToggle = (day) => {
    setHabitData(prev => {
      const updatedDays = prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter(d => d !== day)
        : [...prev.daysOfWeek, day];
      return { ...prev, daysOfWeek: updatedDays };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateHabit({ habitId, ...habitData });

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
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
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

        {/* Días de la semana */}
        {habitData.frequency === "Semanal" && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">¿Qué días lo harás?</h3>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((day) => (
                <label key={day} className="flex items-center space-x-2 text-gray-700">
                  <input
                    type="checkbox"
                    value={day}
                    checked={habitData.daysOfWeek.includes(day)}
                    onChange={() => handleDayToggle(day)}
                    className="accent-teal-500"
                  />
                  <span>
                    {{
                      MO: "Lunes", TU: "Martes", WE: "Miércoles",
                      TH: "Jueves", FR: "Viernes", SA: "Sábado", SU: "Domingo"
                    }[day]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Hora de inicio */}
        <div className="space-y-2">
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Hora de inicio*</label>
          <div className="relative">
            <input
              type="datetime-local"
              name="startTime"
              id="startTime"
              value={habitData.startTime}
              onChange={handleChange}
              className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500">
              🕒
            </div>
          </div>
        </div>

        {/* Duración */}
        <div className="space-y-2">
          <label htmlFor="durationMinutes" className="block text-sm font-medium text-gray-700">Duración estimada (minutos)*</label>
          <div className="relative">
            <input
              type="number"
              name="durationMinutes"
              id="durationMinutes"
              value={habitData.durationMinutes}
              onChange={handleChange}
              placeholder="Ej: 30"
              className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500">
              ⏱️
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-teal-400 hover:from-teal-700 hover:to-teal-600 focus:outline-none transition"
          >
            {loading ? 'Actualizando...' : 'Actualizar hábito'}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
 );
}
export default EditHabitos;
