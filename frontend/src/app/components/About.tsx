import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Users, Award, Target, Clock, CheckCircle, Globe, Zap } from 'lucide-react';
import { ScrollMoveText } from './ScrollMoveText';


export function About() {


  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    // {
    //   icon: Globe,
    //   title: 'Global Reach',
    //   description: 'Serving clients worldwide with localized expertise',
    //   color: 'blue',
    //   stat: 'Worldwide',
    // },
    {
      icon: Zap,
      title: 'Smarter Solutions',
      description: 'Innovative approaches to simplify complex challenges',
      color: 'purple',
      stat: '100% Efficient',
    },
    {
      icon: Target,
      title: 'Client-Focused',
      description: 'Your success is our primary objective',
      color: 'pink',
      stat: 'Best Service',
    },
  ];



  const highlights = [
    'Smarter solutions for easier business operations',
    'Helping businesses grow faster',
    'Join hands with Movin VA for success'
  ];

  return (
    <section id="about" ref={ref} className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4"
            >
              About Movin VA
            </motion.span>


            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <ScrollMoveText
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto]"
                fromY={26}
                toY={0}
                fromOpacity={0}
                toOpacity={1}
                direction="ltr"
              >
                Moving Ahead
              </ScrollMoveText>
              <br />
              <ScrollMoveText
                className="text-foreground"
                fromY={26}
                toY={0}
                fromOpacity={0}
                toOpacity={1}
                direction="rtl"
              >
                Virtually Together
              </ScrollMoveText>

            </h2>



            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-6 leading-relaxed"
            >
              At   <ScrollMoveText
                className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                fromY={18}
                toY={0}
                fromOpacity={0}
                toOpacity={1}
              >
                Movin VA
              </ScrollMoveText>, we believe in serving our clients in the best way possible. 


              We provide comprehensive services including web development, app development, virtual assistance, 
              and digital marketing to help businesses thrive in the digital age.
            </motion.p>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 rounded-2xl border border-blue-200 dark:border-blue-800 mb-8"
            >
              <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <Target className="text-blue-600" size={24} />
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Based in Texas, USA, we deliver the bestest solutions with Movin VA. 
                We give smarter solutions to make things easier. Join hands with Movin VA 
                because we help businesses grow.
              </p>
            </motion.div>

            {/* Highlights */}
            <div className="space-y-3 mb-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-md"
                  >
                    <CheckCircle size={18} className="text-white" />
                  </motion.div>
                  <span className="text-foreground font-medium group-hover:text-blue-600 transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isHovered = hoveredFeature === index;

                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onHoverStart={() => setHoveredFeature(index)}
                    onHoverEnd={() => setHoveredFeature(null)}
                    className={`relative overflow-hidden bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 dark:from-${feature.color}-950/30 dark:to-${feature.color}-900/30 p-5 rounded-xl cursor-pointer border-2 border-${feature.color}-200 hover:border-${feature.color}-300 dark:hover:border-${feature.color}-700 transition-all shadow-md`}
                  >
                    <motion.div
                      animate={{ rotate: isHovered ? 360 : 0, scale: isHovered ? 1.1 : 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className={`text-${feature.color}-600 mb-3`} size={32} />
                    </motion.div>
                    <h3 className="font-bold text-foreground mb-1 text-base">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{feature.description}</p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      className={`text-xs font-semibold text-${feature.color}-600`}
                    >
                      {feature.stat}
                    </motion.div>

                    {/* Shine effect */}
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: isHovered ? '100%' : '-100%' }}
                      transition={{ duration: 0.6 }}
                      className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent`}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Background Decorations */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-3xl"
            />



            {/* Floating Elements */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                className="absolute w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
                style={{
                  top: `${20 + i * 30}%`,
                  right: `${-10 + i * 5}%`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}