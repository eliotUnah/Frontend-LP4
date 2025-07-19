import React, { useState, useEffect } from 'react';
import api from '../../utils/axiosConfig';

function ReminderPage() {
  const [habitId, setHabitId] = useState('');
  const [time, setTime] = useState('');
  const [timezone, setTimezone] = useState('');
  const [active, setActive] = useState(true);
  const [message, setMessage] = useState('');
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  setIsLoading(true);
  fetch('http://localhost:5000/reminders', {
    credentials: 'include', // ⬅️ Incluye cookies httpOnly automáticamente
  })
    .then(res => res.json())
    .then(data => {
      setHabits(data.habits || []);
      setIsLoading(false);
    })
    .catch(() => {
      setMessage('❌ Error al obtener hábitos');
      setIsLoading(false);
    });
}, []);

const handleSubmit = (e) => {
  e.preventDefault();
  setIsLoading(true);

  fetch('http://localhost:5000/reminders', {
    method: 'POST',
    credentials: 'include', // ⬅️ Incluye cookies httpOnly automáticamente
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      habitId,
      time,
      timezone,
      active
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        setMessage(`❌ ${data.error}`);
      } else {
        setMessage('✅ Recordatorio creado correctamente');
        setHabitId('');
        setTime('');
        setTimezone('');
        setActive(true);
      }
      setIsLoading(false);
    })
    .catch(() => {
      setMessage('❌ Error al crear el recordatorio');
      setIsLoading(false);
    });
};

  

  // Estilos
  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%)',
      padding: '48px 16px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    container: {
      maxWidth: '448px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    title: {
      fontSize: '36px',
      fontWeight: '800',
      color: '#312e81',
      marginBottom: '8px'
    },
    subtitle: {
      fontSize: '18px',
      color: '#4f46e5'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      ':hover': {
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }
    },
    cardContent: {
      padding: '32px'
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '24px'
    },
    iconCircle: {
      backgroundColor: '#e0e7ff',
      padding: '16px',
      borderRadius: '9999px'
    },
    icon: {
      height: '40px',
      width: '40px',
      color: '#4f46e5'
    },
    message: {
      marginBottom: '24px',
      padding: '12px',
      borderRadius: '8px',
      textAlign: 'center',
      fontWeight: '500',
      animation: 'fadeIn 0.3s ease-in-out'
    },
    successMessage: {
      backgroundColor: '#dcfce7',
      color: '#166534'
    },
    errorMessage: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
    },
    formGroup: {
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '12px',
      fontSize: '16px',
      transition: 'all 0.2s ease',
      ':focus': {
        outline: 'none',
        borderColor: '#818cf8',
        boxShadow: '0 0 0 2px rgba(129, 140, 248, 0.5)'
      }
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '12px',
      fontSize: '16px',
      transition: 'all 0.2s ease',
      ':focus': {
        outline: 'none',
        borderColor: '#818cf8',
        boxShadow: '0 0 0 2px rgba(129, 140, 248, 0.5)'
      }
    },
    button: {
      width: '100%',
      padding: '12px 16px',
      backgroundColor: '#4f46e5',
      color: 'white',
      fontWeight: '500',
      borderRadius: '12px',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ':hover': {
        backgroundColor: '#4338ca',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      },
      ':disabled': {
        opacity: '0.7',
        cursor: 'not-allowed'
      }
    },
    spinner: {
      animation: 'spin 1s linear infinite',
      marginRight: '12px'
    },
    footer: {
      marginTop: '32px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#6b7280'
    },
    footerLink: {
      color: '#4f46e5',
      fontWeight: '500',
      textDecoration: 'none',
      ':hover': {
        color: '#4338ca'
      }
    },
    helperText: {
      fontSize: '12px',
      color: '#6b7280',
      marginTop: '4px'
    }
  };

  
  // Función para combinar estilos dinámicos
  const combineStyles = (...styleObjects) => {
    return Object.assign({}, ...styleObjects);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Recordatorios</h1>
          <p style={styles.subtitle}>Programa recordatorios para tus hábitos</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardContent}>
            <div style={styles.iconContainer}>
              <div style={styles.iconCircle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={styles.icon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            {message && (
              <div
                style={combineStyles(
                  styles.message,
                  message.startsWith('✅') ? styles.successMessage : styles.errorMessage
                )}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Hábito</label>
                <select
                  value={habitId}
                  onChange={(e) => setHabitId(e.target.value)}
                  style={styles.select}
                  required
                  disabled={isLoading}
                >
                  <option value="">Selecciona un hábito</option>
                  {habits.map(habit => (
                    <option key={habit._id} value={habit._id}>
                      {habit.title} – {habit.category}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Hora (formato 24h HH:MM)</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  style={styles.input}
                  required
                  disabled={isLoading}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Zona Horaria</label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  placeholder="Ej. America/Mexico_City"
                  style={styles.input}
                  required
                  disabled={isLoading}
                />
                <p style={styles.helperText}>Usa formatos como "America/New_York" o "Europe/London"</p>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Estado</label>
                <select
                  value={active}
                  onChange={(e) => setActive(e.target.value === 'true')}
                  style={styles.select}
                  disabled={isLoading}
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={styles.button}
              >
                {isLoading ? (
                  <>
                    <svg
                      style={styles.spinner}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" strokeWidth="4"></circle>
                      <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : (
                  'Crear Recordatorio'
                )}
              </button>
            </form>
          </div>
        </div>

        <div style={styles.footer}>
          <p>
            ¿Necesitas ayuda?{' '}
            <a href="#" style={styles.footerLink}>
              Contacta al soporte
            </a>
          </p>
        </div>
      </div>

      {/* Estilos globales */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default ReminderPage;
