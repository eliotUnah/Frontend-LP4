import React from 'react';
import Swal from 'sweetalert2';
import { useGoogleAuth, useGoogleStatus } from '../hooks/calendarHabits';
import { useSyncHabits, useTestEvent } from '../hooks/CalendarSync';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        maxWidth: 420,
        margin: '4rem auto',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        borderRadius: 24,
        background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
        boxShadow: '0 20px 40px rgba(139,92,246,.35)',
        color: '#fff',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <motion.h1
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 700 }}
      >
        Conectar con Google Calendar 🗓️
      </motion.h1>

      {loading ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.8 }}
          style={{ fontSize: '1.1rem' }}
        >
          ⏳ Verificando estado de vinculación...
        </motion.p>
      ) : isLinked ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p style={{ fontWeight: 600, marginBottom: '1.25rem' }}>
            ✅ Tu cuenta ya está vinculada con Google Calendar
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSync}
              disabled={syncing}
              style={purpleBtn}
            >
              📆 {syncing ? 'Sincronizando...' : 'Sincronizar hábitos'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTestEvent}
              disabled={creating}
              style={outlineBtn}
            >
              🎯 {creating ? 'Creando...' : 'Evento de prueba'}
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p style={{ marginBottom: '1.25rem', fontSize: '1.1rem' }}>
            Haz clic en el botón para iniciar el proceso de vinculación.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            style={purpleBtn}
          >
            🔗 Vincular con Google
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

const purpleBtn = {
  padding: '0.9rem 2rem',
  fontSize: '1.1rem',
  fontWeight: 600,
  backgroundColor: '#fff',
  color: '#7c3aed',
  border: 'none',
  borderRadius: 12,
  cursor: 'pointer',
  boxShadow: '0 4px 15px rgba(0,0,0,.15)',
};

const outlineBtn = {
  padding: '0.9rem 2rem',
  fontSize: '1.1rem',
  fontWeight: 600,
  backgroundColor: 'transparent',
  color: '#fff',
  border: '2px solid #fff',
  borderRadius: 12,
  cursor: 'pointer',
};

export default GoogleLinkPage; 