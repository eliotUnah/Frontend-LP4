// src/hooks/useUpdateHabit.js
import { useState } from 'react';
import axios from 'axios';

const useUpdateHabit = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const updateHabit = async (habitData) => {
    setLoading(true);
    setResponse(null);
    setError('');

    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJmQ0d2TUFicHEwYUdpaGVPakFjWjlJSjFoSjQzIiwiZW1haWwiOiJlbGlvdHVuYWhAZ21haWwuY29tIiwiaWF0IjoxNzUxOTEwNTM2LCJleHAiOjE3NTI1MTUzMzZ9.HG8dTe3t3AlTFyCMIGwkVpu0ZLbVcmsoSvAox0pAYXI';

      const res = await axios.put('http://localhost:5000/actualizar-habito', habitData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

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
