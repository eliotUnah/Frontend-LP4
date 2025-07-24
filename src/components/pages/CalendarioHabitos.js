import React from 'react';
import Swal from 'sweetalert2';
import { useGoogleAuth, useGoogleStatus } from '../hooks/calendarHabits';
import { useSyncHabits, useTestEvent } from '../hooks/CalendarSync';

const GoogleLinkPage = () => {
  const { startAuth } = useGoogleAuth();
  const { isLinked, loading } = useGoogleStatus();

  const { syncHabits, syncing, result, error: syncError } = useSyncHabits();
  const { createTestEvent, creating, event, error: testError } = useTestEvent();

  const handleClick = () => {
    Swal.fire({
      title: '¿Vincular con Google Calendar?',
      text: 'Serás redirigido a Google para otorgar permisos.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        startAuth();
      }
    });
  };

  const handleSync = async () => {
    await syncHabits();
    if (syncError) {
      Swal.fire('❌ Error', syncError, 'error');
    } else {
      Swal.fire('✅ Listo', result?.message || 'Hábitos sincronizados', 'success');
    }
  };

  const handleTestEvent = async () => {
    await createTestEvent();
    if (testError) {
      Swal.fire('❌ Error', testError, 'error');
    } else {
      Swal.fire('🎯 Evento creado', event?.event?.summary || 'Evento de prueba creado', 'success');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Conectar con Google Calendar 🗓️</h1>

      {loading ? (
        <p>⏳ Verificando estado de vinculación...</p>
      ) : isLinked ? (
        <>
          <p style={{ color: 'green', fontWeight: 'bold', marginTop: '1rem' }}>
            ✅ Tu cuenta ya está vinculada con Google Calendar
          </p>
          <button onClick={handleSync} disabled={syncing} style={buttonStyle}>
            📆 Sincronizar hábitos
          </button>
          <button onClick={handleTestEvent} disabled={creating} style={{ ...buttonStyle, marginLeft: '1rem' }}>
            🎯 Crear evento de prueba
          </button>
        </>
      ) : (
        <>
          <p>Haz clic en el botón para iniciar el proceso de vinculación.</p>
          <button onClick={handleClick} style={buttonStyle}>
            🔗 Vincular con Google
          </button>
        </>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: '1rem 2rem',
  fontSize: '1.2rem',
  backgroundColor: '#4285F4',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  marginTop: '1rem',
};

export default GoogleLinkPage;