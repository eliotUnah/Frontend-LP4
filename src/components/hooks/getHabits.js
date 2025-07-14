import { useEffect, useState } from 'react';
import axios from 'axios';

const useHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJQU3RJYVlON3liVTdwcG5LeFBFajZsRFYxc0MzIiwiZW1haWwiOiJlbGlvdHVuYWgyNEBnbWFpbC5jb20iLCJpYXQiOjE3NTI1MjA0OTIsImV4cCI6MTc1MzEyNTI5Mn0.T8IbPpymuybIinX2OZTDcYF39AD0sgCQX-jaP6ScJ3g';

        const response = await axios.get('http://localhost:5000/buscar-habito', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Hábitos recibidos:', response.data); // 👈 Verifica la estructura
        setHabits(response.data); // ✅ Guarda los objetos completos
      } catch (err) {
        if (err.response?.status === 404) {
          setError('No se encontraron hábitos.');
        } else {
          setError('Error al cargar los hábitos.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  return { habits, loading, error };
};

export default useHabits;
