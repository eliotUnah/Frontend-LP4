import { useState } from 'react';
import axios from 'axios';

/**
 * 🧠 Hook para buscar hábitos filtrados por texto, frecuencia y categoría
 * Conecta al endpoint GET /filtrar-habitos usando query parameters
 */
const useSearchHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * 🔍 Realiza la búsqueda de hábitos según filtros enviados
   * @param {Object} filters - Puede incluir search, frequency, category
   */
  const searchHabits = async (filters = {}) => {
    setLoading(true);
    setError('');

    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJQU3RJYVlON3liVTdwcG5LeFBFajZsRFYxc0MzIiwiZW1haWwiOiJlbGlvdHVuYWgyNEBnbWFpbC5jb20iLCJpYXQiOjE3NTI1MjA0OTIsImV4cCI6MTc1MzEyNTI5Mn0.T8IbPpymuybIinX2OZTDcYF39AD0sgCQX-jaP6ScJ3g'; // 🔐 Reemplaza por lógica real

      // 🔄 Limpieza básica de los parámetros (evita + y espacios innecesarios)
      const cleanFilters = {
        search: filters.search?.replace(/\+/g, ' ').trim() || '',
        category: filters.category?.trim() || '',
        frequency: filters.frequency?.trim() || ''
      };

      const response = await axios.get('http://localhost:5000/filtrar-habitos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: cleanFilters,
      });

      setHabits(Array.isArray(response.data.habits) ? response.data.habits : []);
    } catch (err) {
      console.error('❌ Error al buscar hábitos:', err);
      setError('Ocurrió un error al buscar hábitos.');
      setHabits([]);
    } finally {
      setLoading(false);
    }
  };

  return { habits, loading, error, searchHabits };
};

export default useSearchHabits;
