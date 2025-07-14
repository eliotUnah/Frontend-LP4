import { useEffect, useState } from 'react';
import axios from 'axios';

const useHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJmQ0d2TUFicHEwYUdpaGVPakFjWjlJSjFoSjQzIiwiZW1haWwiOiJlbGlvdHVuYWhAZ21haWwuY29tIiwiaWF0IjoxNzUxOTEwNTM2LCJleHAiOjE3NTI1MTUzMzZ9.HG8dTe3t3AlTFyCMIGwkVpu0ZLbVcmsoSvAox0pAYXI';

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
