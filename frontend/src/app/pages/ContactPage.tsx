import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { ThemeProvider } from '../components/ThemeProvider';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ContactPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when contact page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Header />
        <main className="pt-20 lg:pt-24">
          {/* Back Navigation Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, x: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-all"
            >
              <ArrowLeft size={18} />
              <span>Back to Home</span>
            </motion.button>
          </motion.div>

          {/* Contact Section */}
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

