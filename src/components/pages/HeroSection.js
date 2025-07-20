import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const habits = [
    "Ejercicio matutino",
    "Meditación 10 min",
    "Leer 20 páginas",
    "Beber agua"
  ];

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Transforma tus <span className="highlight">hábitos</span>, transforma tu vida
          </motion.h1>

          <motion.p
            className="hero-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            La aplicación definitiva para construir hábitos positivos que perduren.
            <br />
            <span className="font-semibold">Pequeños cambios, grandes resultados.</span>
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Comenzar ahora <ArrowRight className="icon" />
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="hero-demo"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <motion.div
            className="demo-container"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
          >
            <div className="demo-content">
              <h3 className="demo-title">Mis hábitos diarios</h3>
              <div className="habits-list">
                {habits.map((habit, index) => (
                  <motion.div
                    key={habit}
                    className="habit-item"
                    whileHover={{ x: 8 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="habit-icon">
                      <Check className="icon" />
                    </div>
                    <span className="habit-name">{habit}</span>
                  </motion.div>
                ))}
              </div>
              <div className="demo-footer">
                <span className="streak">Racha actual: 7 días 🔥</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;