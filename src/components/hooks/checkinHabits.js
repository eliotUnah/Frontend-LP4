// src/components/hooks/createCheckin.js
import { useState } from 'react';
import axios from 'axios';

const useCreateCheckin = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [streak, setStreak] = useState({ current: 0, best: 0 });

  const createCheckin = async (habitId) => {
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJQU3RJYVlON3liVTdwcG5LeFBFajZsRFYxc0MzIiwiZW1haWwiOiJlbGlvdHVuYWgyNEBnbWFpbC5jb20iLCJpYXQiOjE3NTI1MjA0OTIsImV4cCI6MTc1MzEyNTI5Mn0.T8IbPpymuybIinX2OZTDcYF39AD0sgCQX-jaP6ScJ3g'; // 🔐 reemplaza por tu sistema real
      const response = await axios.post(
        `http://localhost:5000/habits/${habitId}/checkins`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setStreak({
        current: response.data.streakCurrent,
        best: response.data.streakBest,
      });
        return response.data;
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Ya hiciste check-in hoy.');
      } else {
        setError('Error al registrar el check-in.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { createCheckin, loading, success, error, streak };
};

export default useCreateCheckin;
