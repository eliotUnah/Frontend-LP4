import React from 'react';
import useAchievements from '../hooks/useAchievements.js';
import '../styles/Dashboard.css';

const Medallas = () => {
  const { achievements, loading, error } = useAchievements();

  if (loading) return <p>Cargando logros...</p>;
  if (error) return <p>Error: {error}</p>;
  if (achievements.length === 0) return <p>No hay logros aún.</p>;

  // Mostrar emoji según tipo de logro
  const getMedalEmoji = (type) => {
    if (type === 'PerfectWeek' || type === 'MonthlyConsistency') {
      return '🏅'; // Trofeo
    }
    return '🏆'; // Medalla diaria u otros
  };

  // Filtrar logros con hábitos válidos
  const validAchievements = achievements.filter(
    (a) => a.habitId && a.habitId.title
  );

  return (
    <div className="dashboard__logros-container">
      <h2 className="dashboard__slider-title">🏆 Tus Logros</h2>
      <div className="dashboard__logros-grid">
        {validAchievements.map((achievement) => (
          <div key={achievement.id} className="dashboard__logro-card">
            <h3>{achievement.habitId.title}</h3>
            <span className="animated-medal-emoji">{getMedalEmoji(achievement.type)}</span>
            <p>Logro: {achievement.type}</p>
            <p>Ganado el: {new Date(achievement.earnedOn).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Medallas;