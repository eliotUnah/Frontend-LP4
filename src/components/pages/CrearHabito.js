import React, { useState,useEffect } from 'react';
import useHabitForm from '../hooks/createHabits.js';
import '../styles/CrearHabito.css';
import Swal from 'sweetalert2';
import { useNavigate,useLocation} from 'react-router-dom';



function CrearHabito() {
  const navigate = useNavigate();
  const [charCount, setCharCount] = useState(0);
  const location = useLocation();
const suggestion = location.state?.suggestion;
  const {
    register,
    handleSubmit,
    onSubmit: hookSubmit, // Renombramos para que no colisione
    reset,
    errors
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
  // Envoltura con SweetAlert
  const onSubmit = async (data) => {
    const result = await hookSubmit(data); // Aquí obtenemos el resultado

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
        navigate('/dasboard-habitos'); // ✅ vuelve al dashboard
      }
    });
  };

  return (
    <div className="crear-habito centrado-flex bg-gradient-to-br from-teal-50 to-mint-50 font-sans">
        <div className="w-full max-w-xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 via-mint-500 to-teal-400 p-6">
            <h1 className="text-3xl font-display font-bold text-white">Crea tu nuevo hábito</h1>
            <p className="text-teal-100 mt-1">Pequeños pasos, grandes cambios</p>
          </div>

          {/* Formulario */}
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-gray-400 transition duration-200"
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
       <div className="p-2 border-2 border-gray-100 rounded-lg flex flex-col items-center transition transform duration-200 hover:scale-105 hover:shadow-md hover:border-teal-300">
          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mb-2">
           
            {cat === 'Salud' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 24 24" fill="currentColor">
               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
              <polyline points="8 14 10 10 12 14 14 10 16 14" />
             </svg>
            )}
            {cat === 'Productividad' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            )}
            {cat === 'Bienestar' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
            {cat === 'Otros' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )}
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
                    <div className="p-3 border-2 border-gray-100 rounded-lg flex flex-col items-center transition transform duration-200 hover:scale-105 hover:shadow-md hover:border-teal-300">
                      <span className="text-teal-600 font-bold text-lg">{freq.value}</span>
                      <span className="text-sm font-medium text-gray-700 mt-1">{freq.label}</span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.frequency && <p className="text-red-500 text-sm">{errors.frequency.message}</p>}
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => reset()}
                  className="px-6 py-2.5 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-teal-600 via-mint-500 to-teal-400 hover:from-teal-700 hover:to-mint-600 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-mint-400 transition duration-200"

              >
                Cancelar
              </button>
              <button
               type="submit"
                className="px-6 py-2.5 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-teal-600 via-mint-500 to-teal-400 hover:from-teal-700 hover:to-mint-600 focus:outline-none focus:ring-0 transition duration-200">
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
