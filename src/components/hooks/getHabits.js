import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../../utils/axiosConfig';

const useHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHabits = async () => {
      try {
       const response = await api.get('/buscar-habito'); // ✅ Cookies incluidas automáticamente

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
