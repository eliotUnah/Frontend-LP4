import React, { useState,useEffect } from 'react';
import useHabitForm from '../hooks/createHabits.js';
import '../styles/CrearHabito.css';
import Swal from 'sweetalert2';
import { useNavigate,useLocation } from 'react-router-dom';


function CrearHabito() {
  const navigate = useNavigate();
  const [charCount, setCharCount] = useState(0);
  const location = useLocation();
  const suggestion = location.state?.suggestion;
  const {
    register,
    handleSubmit,
    onSubmit: hookSubmit,
    reset,
    errors,
    watch
  } = useHabitForm();
useEffect(() => {
  if (suggestion?.title) {
    reset({
      title: suggestion.title,
      category: suggestion.category,
      reason: suggestion.reason,
      frequency: suggestion.frequency,
      level: suggestion.level
    });
    setCharCount(suggestion.title.length);
  }
}, [suggestion]);
  const frequency = watch("frequency"); // Para mostrar días según frecuencia

  const onSubmit = async (data) => {
    const result = await hookSubmit(data);

    Swal.fire({
      icon: result.success ? 'success' : 'error',
      title: result.success ? '¡Hábito creado!' : 'Oops...',
      text: result.message,
      confirmButtonColor: result.success ? '#14b8a6' : '#ef4444',
      customClass: {
        popup: 'rounded-xl',
        title: 'font-bold text-teal-700',
        content: 'text-gray-700'
      }
    }).then(() => {
      if (result.success) {
        navigate('/dasboard-habitos');
      }
    });
  };

  return (
   <div className="crear-habito centrado-flex bg-gradient-to-br from-teal-50 to-mint-50 font-sans">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 via-mint-500 to-teal-400 p-6">
            <h1 className="text-3xl font-display font-bold text-white">Crea tu nuevo hábito</h1>
            <p className="text-teal-100 mt-1">Pequeños pasos, grandes cambios</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
            {/* Título */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                ¿Qué hábito quieres desarrollar?*
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  maxLength="50"
                  {...register('title', {
                    required: 'El título es obligatorio',
                    maxLength: { value: 50, message: 'Máximo 50 caracteres' },
                    validate: value => value.trim() !== '' || 'No puede estar vacío'
                  })}
                  onChange={(e) => setCharCount(e.target.value.length)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-teal-500"
                  placeholder="Ej: Beber 2 litros de agua al día"
                />
                <div className="absolute right-3 top-3 text-xs text-gray-400 bg-white px-1">
                  {charCount}/50
                </div>
              </div>
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            {/* Categoría */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Categoría</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {['Salud', 'Productividad', 'Bienestar', 'Otros'].map((cat, i) => (
                  <label key={i} className="radio-card cursor-pointer">
                    <input
                      type="radio"
                      value={cat}
                      {...register('category')}
                      defaultChecked={cat === 'Otros'}
                      className="sr-only"
                    />
                    <div className="p-2 border-2 border-gray-100 rounded-lg flex flex-col items-center hover:border-teal-300">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-sm font-bold text-teal-600">{cat.slice(0, 1)}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{cat}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Frecuencia */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Frecuencia*</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Diario', value: '7' },
                  { label: 'Semanal', value: '5' },
                  { label: 'Mensual', value: '30' }
                ].map((freq, i) => (
                  <label key={i} className="radio-card cursor-pointer">
                    <input
                      type="radio"
                      value={freq.label}
                      {...register('frequency', { required: 'Selecciona una frecuencia' })}
                      className="sr-only"
                    />
                    <div className="p-3 border-2 border-gray-100 rounded-lg flex flex-col items-center hover:border-teal-300">
                      <span className="text-teal-600 font-bold text-lg">{freq.value}</span>
                      <span className="text-sm font-medium text-gray-700 mt-1">{freq.label}</span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.frequency && <p className="text-red-500 text-sm">{errors.frequency.message}</p>}
            </div>

            {/* Días de la semana — solo si frecuencia = Semanal */}
            {frequency === "Semanal" && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">¿Qué días lo harás?</h3>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                  {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((day) => (
                    <label key={day} className="flex items-center space-x-2 text-gray-700">
                      <input
                        type="checkbox"
                        value={day}
                        {...register("daysOfWeek")}
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
             <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
              Hora de inicio del hábito*
            </label>
          <div className="relative">
            <input
            type="datetime-local"
            id="startTime"
        {...register("startTime", { required: "La hora de inicio es obligatoria" })}
      className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 transition duration-200"/>
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500">
      🕒
    </div>
  </div>
  {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime.message}</p>}
</div> 
            {/* Duración */}
            <div className="space-y-2">
              <label htmlFor="durationMinutes" className="block text-sm font-medium text-gray-700">Duración (min)*</label>
              <input
                type="number"
                id="durationMinutes"
                {...register("durationMinutes", {
                  required: "Duración obligatoria",
                  min: { value: 1, message: "Debe durar al menos 1 minuto" }
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-teal-500"
              />
              {errors.durationMinutes && <p className="text-red-500 text-sm">{errors.durationMinutes.message}</p>}
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => reset()}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-teal-400 hover:from-teal-700 hover:to-teal-600"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-teal-400 hover:from-teal-700 hover:to-teal-600"
              >
                Crear Hábito
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearHabito;