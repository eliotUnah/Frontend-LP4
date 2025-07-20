import { motion } from 'framer-motion';
import { Star, Check, Users } from 'lucide-react';
import '../styles/Benefits.css';

const Benefits = () => {
  const benefits = [
    {
      title: "Seguimiento inteligente",
      description: "Registra tus progresos automáticamente y recibe insights personalizados",
      icon: <Star className="icon" />,
      color: "from-indigo-100 to-indigo-50"
    },
    {
      title: "Recordatorios adaptativos",
      description: "El sistema aprende tus patrones y te sugiere los mejores momentos",
      icon: <Check className="icon" />,
      color: "from-purple-100 to-purple-50"
    },
    {
      title: "Comunidad motivadora",
      description: "Conéctate con otros usuarios y comparte tus logros",
      icon: <Users className="icon" />,
      color: "from-blue-100 to-blue-50"
    }
  ];

  return (
    <section id="beneficios" className="section bg-gray">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Por qué elegir HábitoPro</h2>
          <p className="section-subtitle">
            Nuestro enfoque científico te ayuda a construir hábitos que realmente perduran
          </p>
        </motion.div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="benefit-card-wrapper"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className={`benefit-card ${benefit.color}`}>
                <div className="benefit-inner">
                  <div className="benefit-icon-container">
                    {benefit.icon}
                  </div>
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;