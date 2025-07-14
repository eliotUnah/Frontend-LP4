import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  const links = {
    product: ['Características', 'Precios', 'FAQ'],
    company: ['Sobre nosotros', 'Blog', 'Carreras'],
    legal: ['Privacidad', 'Términos', 'Cookies']
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="footer-logo"
            >
              <Check className="icon" />
            </motion.div>
            <h3 className="footer-brand-name">HábitoPro</h3>
            <p className="footer-text">
              Transformando vidas a través de hábitos positivos desde 2023.
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="footer-links-group">
              <h4 className="footer-links-title">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h4>
              <ul className="footer-links">
                {items.map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <a href="#" className="footer-link">{item}</a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2023 HábitoPro. Todos los derechos reservados.</p>
          <div className="social-links">
            {['Twitter', 'Facebook', 'Instagram'].map((social) => (
              <motion.a
                key={social}
                href="#"
                className="social-link"
                whileHover={{ y: -3 }}
              >
                {social}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;