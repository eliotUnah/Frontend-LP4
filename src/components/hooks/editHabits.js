import { useState } from 'react';
import api from '../../utils/axiosConfig';

const useUpdateHabit = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const updateHabit = async (habitData) => {
    setLoading(true);
    setResponse(null);
    setError('');

    try {
      // Asegura que startTime esté en formato ISO si es Date
      const payload = {
        ...habitData,
        startTime: habitData.startTime ? new Date(habitData.startTime).toISOString() : undefined,
        durationMinutes: habitData.durationMinutes ? parseInt(habitData.durationMinutes) : undefined
      };

      const res = await api.put('/actualizar-habito', payload);
      setResponse(res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Error actualizando hábito:', err);
      setError(err.response?.data?.message || 'Error desconocido al actualizar');
    } finally {
      setLoading(false);
    }
  };

  return { updateHabit, loading, response, error };
};

export default useUpdateHabit; 