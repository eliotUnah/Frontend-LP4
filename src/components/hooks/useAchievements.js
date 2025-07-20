import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';


const useAchievements = () => {
  const { currentUser } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setAchievements([]);
      setLoading(false);
      return;
    }

    const fetchAchievements = async () => {
      try {
        const token = await currentUser.getIdToken(true);

        const res = await fetch("http://localhost:5000/api/achievements", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include" // si tu backend usa cookies de sesión
        });

        if (!res.ok) throw new Error("Error en la respuesta del servidor");

        const data = await res.json();
        setAchievements(data);
      } catch (err) {
        console.error("❌ Error al obtener logros:", err);
        setError(err.message || "No se pudieron cargar los logros");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [currentUser]);

  return { achievements, loading, error };
};

export default useAchievements;


