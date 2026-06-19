import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, TrendingUp, Star, Code, Smartphone, UserCheck } from 'lucide-react';
import { ScrollMoveText } from './ScrollMoveText';


export function Hero() {


  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [counters, setCounters] = useState({ clients: 0, projects: 0, satisfaction: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animateCounter = (key: 'clients' | 'projects' | 'satisfaction', target: number) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 30);
    };

    setTimeout(() => {
      animateCounter('clients', 500);
      animateCounter('projects', 2000);
      animateCounter('satisfaction', 99);
    }, 1000);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToContactPage = () => {
    window.location.assign('/contact');
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-blue-950/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
            scale: [1, 1.2, 1],
          }}
          transition={{ type: 'spring', stiffness: 50, scale: { duration: 5, repeat: Infinity } }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: -mousePosition.x * 0.03,
            y: -mousePosition.y * 0.03,
            scale: [1.2, 1, 1.2],
          }}
          transition={{ type: 'spring', stiffness: 50, scale: { duration: 7, repeat: Infinity } }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: mousePosition.x * 0.015,
            y: -mousePosition.y * 0.015,
            scale: [1, 1.3, 1],
          }}
          transition={{ type: 'spring', stiffness: 50, scale: { duration: 6, repeat: Infinity } }}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Icons */}
      {[Zap, TrendingUp, Star].map((Icon, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
            delay: index * 0.5,
          }}
          className={`absolute ${
            index === 0 ? 'top-1/4 left-1/4' :
            index === 1 ? 'top-1/3 right-1/4' :
            index === 2 ? 'bottom-1/4 left-1/3' :
            'top-2/3 right-1/3'
          }`}
        >
          <Icon className="text-blue-500/30 dark:text-blue-400/20" size={40} />
        </motion.div>
      ))}


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-6 shadow-lg"
              >
                Moving Ahead Virtually
              </motion.span>

            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <ScrollMoveText
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto]"
                fromY={26}
                toY={0}
                fromOpacity={1}
                toOpacity={1}
                direction="ltr"
              >
                Movin VA
              </ScrollMoveText>
              <br />
              <ScrollMoveText
                className="text-foreground"
                fromY={26}
                toY={0}
                fromOpacity={1}
                toOpacity={1}
                direction="rtl"
              >
                Your Growth Partner
              </ScrollMoveText>


            </motion.h1>


            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              We give smarter solutions to make things easier. From web development to digital marketing, 
              virtual assistance to app development—join hands with Movin VA because we help businesses grow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToContactPage}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
              >
                <span className="relative z-10">Get Started Today</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform relative z-10" size={20} />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToServices}
                className="px-8 py-4 bg-card border-2 border-border text-foreground rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 hover:shadow-lg transition-all"
              >
                Explore Services
              </motion.button>
            </motion.div>

            {/* Stats with Animation */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {[
                { value: counters.clients, suffix: '+', label: 'Happy Clients', color: 'blue' },
                { value: counters.projects, suffix: '+', label: 'Projects Done', color: 'purple' },
                { value: counters.satisfaction, suffix: '%', label: 'Satisfaction', color: 'pink' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="text-center p-4 bg-card/50 backdrop-blur-sm rounded-2xl shadow-lg border border-border"
                >
                  <motion.div
                    className={`text-4xl font-bold text-${stat.color}-600 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-700 bg-clip-text text-transparent`}
                  >
                    {stat.value}{stat.suffix}
                  </motion.div>
                  <div className="text-muted-foreground font-medium mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div> */}
          </div>

          {/* Right Content - Animated Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-12 lg:mt-0 h-auto lg:h-[650px] xl:h-[750px] min-h-0 lg:min-h-[500px] p-0 lg:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:block box-content"
          >
            {/* Floating Cards */}
            {[
              { Icon: Code, title: 'Web Development', desc: 'Modern & scalable websites', color: 'blue', delay: 0, category: 'web' },
              { Icon: Smartphone, title: 'App Development', desc: 'Native & cross-platform apps', color: 'purple', delay: 0.5, category: 'app' },
              { Icon: UserCheck, title: 'Virtual Assistance', desc: 'Expert administrative support', color: 'emerald', delay: 0.7, category: 'va' },
              { Icon: TrendingUp, title: 'Digital Marketing', desc: 'Grow your brand & reach', color: 'pink', delay: 1, category: 'marketing' }
            ].map((card, index) => (
              <motion.div
                key={card.title}
                animate={{
                  y: [0, -15, 0],
                  rotate: index === 0 ? [3, 5, 3] : index === 1 ? [-3, -5, -3] : index === 2 ? [2, 4, 2] : [0, 1, 0],
                }}
                transition={{
                  duration: 3 + index,
                  repeat: Infinity,
                  delay: card.delay,
                }}
                className={`relative lg:absolute w-full sm:w-auto lg:w-60 h-auto lg:h-60 bg-card rounded-2xl shadow-xl lg:shadow-2xl p-6 cursor-pointer border border-border isolate
                  ${index === 0 ? 'lg:top-8 lg:-right-4 xl:right-4' : index === 1 ? 'lg:top-16 lg:left-0 xl:left-4' : index === 2 ? 'lg:top-[292px] lg:-right-4 xl:right-4' : 'lg:top-[324px] lg:left-0 xl:left-4'}`}
                style={{
                  transformOrigin: 'center',
                  zIndex: 10 + index * 5
                }}
                whileHover={{ scale: 1.025, y: -2, rotate: 0, zIndex: 50 }}
                onClick={() => {
                  const element = document.getElementById('services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.dispatchEvent(new CustomEvent('selectServiceCategory', { detail: card.category }));
                  }
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 bg-gradient-to-br ${card.color === 'emerald' ? 'from-emerald-500 via-emerald-600 to-emerald-700' : `from-${card.color}-400 to-${card.color}-600`} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                >
                <card.Icon className="text-white drop-shadow-md" size={32} />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground">{card.desc}</p>

                {/* Decorative Elements */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  className={`absolute bottom-4 right-4 w-8 h-8 rounded-full bg-${card.color}-400/30 blur-md`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}