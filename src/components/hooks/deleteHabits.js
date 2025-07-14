import { useState } from 'react';
import axios from 'axios';

export const useDeleteHabit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteHabit = async (habitId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJmQ0d2TUFicHEwYUdpaGVPakFjWjlJSjFoSjQzIiwiZW1haWwiOiJlbGlvdHVuYWhAZ21haWwuY29tIiwiaWF0IjoxNzUxOTEwNTM2LCJleHAiOjE3NTI1MTUzMzZ9.HG8dTe3t3AlTFyCMIGwkVpu0ZLbVcmsoSvAox0pAYXI';
    try {
      const response = await axios.delete('http://localhost:5000/eliminar-habito', {
        data: { habitId }, // 👈 Axios usa "data" para el cuerpo del DELETE
        headers: {
          'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // si usas autenticación
        },
      });

      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(
        err.response?.data?.message || 'No se pudo eliminar el hábito'
      );
    } finally {
      setLoading(false);
    }
  };

  return { deleteHabit, loading, error, success };
};

export default useDeleteHabit;