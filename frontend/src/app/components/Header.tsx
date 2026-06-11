import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun } from 'lucide-react';

import { useTheme } from './ThemeProvider';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isContactPage = location.pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: 'home' },
    {
      name: 'Services',
      href: 'services',
    },

    { name: 'About', href: 'about' },
    { name: 'Testimonials', href: 'testimonials' },
    { name: 'Contact', href: 'contact' },
  ];

  const navigateToContact = () => {
    setIsMobileMenuOpen(false);
    if (isContactPage) {
      // Already on contact page, scroll to top
      window.scrollTo(0, 0);
    } else {
      // Navigate to contact page
      navigate('/contact');
    }
  };

  const scrollToSection = (id: string, category?: string) => {
    setIsMobileMenuOpen(false);
    
    if (isContactPage && id === 'contact') {
      // On contact page, scroll to top
      window.scrollTo(0, 0);
      return;
    }

    if (isContactPage) {
      // On contact page, go back to home
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          if (category) {
            window.dispatchEvent(new CustomEvent('selectServiceCategory', { detail: category }));
          } else if (id === 'services') {
            window.dispatchEvent(new CustomEvent('selectServiceCategory', { detail: 'all' }));
          }
        }
      }, 150);
      return;
    }
    
    // On home page, scroll to section
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        if (category) {
          window.dispatchEvent(new CustomEvent('selectServiceCategory', { detail: category }));
        } else if (id === 'services') {
          window.dispatchEvent(new CustomEvent('selectServiceCategory', { detail: 'all' }));
        }
      }
    }, 150);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-background/80 backdrop-blur-lg shadow-lg border-b border-border'
          : 'bg-background/90 backdrop-blur-lg shadow-sm border-b border-border lg:bg-transparent lg:backdrop-blur-none lg:shadow-none lg:border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
              <motion.div
              className="relative w-12 h-12"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.35 }}
            >
                <motion.img
                  src={new URL('../../assets/Movinva_logo.png', import.meta.url).toString()}
                  alt="Movin-và logo"
                  className="w-12 h-12 object-contain drop-shadow"
                  initial={{ opacity: 1, scale: 1, rotate: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 18,
                    ease: 'linear',
                    repeat: Infinity,
                  }}
                  style={{ transformOrigin: '50% 50%' }}
                  whileHover={{ filter: 'brightness(1.05) saturate(1.05)', scale: 1.03 }}
                />
            </motion.div>
            <div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Movin-và
              </span>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium hidden sm:block">Moving ahead virtually</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className="relative"
              >

                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => item.name === 'Contact' ? navigateToContact() : scrollToSection(item.href)}
                  className="flex items-center gap-1 text-foreground hover:text-blue-600 font-medium transition-colors relative group"

                >
                  {item.name}

                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"
                  />
                </motion.button>

              </div>

            ))}
          </nav>

          {/* Right Section - Theme Toggle & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 flex items-center justify-center shadow-lg hover:shadow-xl transition-all overflow-hidden group"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="text-blue-600" size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="text-amber-400" size={22} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(79, 70, 229, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateToContact()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Mobile Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 flex items-center justify-center"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="text-blue-600" size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="text-amber-400" size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Hamburger Menu */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground p-2"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <motion.nav className="py-4 space-y-2">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <button
                      onClick={() => item.name === 'Contact' ? navigateToContact() : scrollToSection(item.href)}

                      className="block w-full text-left py-3 px-4 text-foreground hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 hover:text-blue-600 rounded-lg font-medium transition-all"
                    >
                      {item.name}
                    </button>

                  </motion.div>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => navigateToContact()}
                  className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold"
                >

                  Get Started
                </motion.button>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}