// src/hooks/useUpdateHabit.js
import { useState } from 'react';
import axios from 'axios';
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
       const res = await api.put('/actualizar-habito', habitData);

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
