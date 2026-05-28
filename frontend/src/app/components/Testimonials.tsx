import { motion, AnimatePresence, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  User
} from 'lucide-react';
import { ScrollMoveText } from './ScrollMoveText';

const testimonials = [
  {
    name: 'Haley Andrews',
    role: 'Operations Manager, Delmarva Logistics',
    rating: 5,
    text: 'We needed high-level assistance to stay on top of daily operations, client communications, and database entry. Our dedicated virtual assistant is highly organized, proactive, and thrives in our fast-paced environment.'
  },
  {
    name: 'Destiney Haddox',
    role: 'Vice President, RoxxiStudios Design & Marketing',
    rating: 4.5,
    text: 'They have been incredibly responsive and constantly double-checked to make sure they executed exactly what we requested. We are very happy about our web development project and ongoing marketing. I would definitely recommend them.'
  },
  {
    name: 'Jonathan Miller',
    role: 'Director of Product, TechVantage LLC',
    rating: 5,
    text: 'Their full-stack development team maintained an incredibly structured yet flexible approach from our MVP discovery phase all the way to deployment. Their attention to technical detail gave us absolute confidence that our platform would be both sound and user-friendly. They are true professionals.'
  },
  {
    name: 'Guy Papich',
    role: 'Founder, First State Operations',
    rating: 4,
    text: 'They did an absolutely amazing job bringing our site up on Google. We received very professional, timely results at a great price. I highly recommend using this company for all of your digital advertising and SEO needs.'
  }
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px'
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);

    setCurrentIndex(prevIndex => {
      const nextIndex = prevIndex + newDirection;

      if (nextIndex < 0) {
        return testimonials.length - 1;
      }

      if (nextIndex >= testimonials.length) {
        return 0;
      }

      return nextIndex;
    });
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlaying]);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden"
    >
      {/* Background Effects */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          rotate: [90, 0, 90]
        }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4"
          >
            💬 Client Success Stories
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <ScrollMoveText
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto]"
              fromY={26}
              toY={0}
              fromOpacity={0}
              toOpacity={1}
              direction="ltr"
            >
              What Our Clients Say
            </ScrollMoveText>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join hands with Movin-và and experience excellence
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence
            initial={false}
            custom={direction}
            mode="wait"
          >
            <motion.div
              key={currentIndex}
              onMouseMove={e => {
                const el = e.currentTarget;
                const rect = el.getBoundingClientRect();

                const x =
                  ((e.clientX - rect.left) / rect.width) * 100;

                const y =
                  ((e.clientY - rect.top) / rect.height) * 100;

                el.style.setProperty('--mouse-x', `${x}%`);
                el.style.setProperty('--mouse-y', `${y}%`);
              }}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                },
                opacity: { duration: 0.2 }
              }}
              className="relative rounded-3xl p-8 md:p-12 shadow-2xl border border-border/70 overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0.95))] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.35),rgba(15,23,42,0.75))]"
            >
              <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(700px_circle_at_var(--mouse-x,50%)_var(--mouse-y,0%),rgba(99,102,241,0.16),transparent_40%),radial-gradient(500px_circle_at_10%_100%,rgba(236,72,153,0.14),transparent_45%)]" />

              {/* Quote */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6"
              >
                <Quote
                  className="text-white"
                  size={32}
                />
              </motion.div>

              {/* Stars FIXED */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }, (_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      scale: 0,
                      rotate: -180
                    }}
                    animate={{
                      scale: 1,
                      rotate: 0
                    }}
                    transition={{
                      delay: 0.3 + i * 0.1
                    }}
                  >
                    <Star
                      size={24}
                      className={
                        i <
                        Math.floor(
                          testimonials[currentIndex]
                            .rating
                        )
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  </motion.div>
                ))}
              </div>

              {/* Text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-foreground mb-8 leading-relaxed"
              >
                "{testimonials[currentIndex].text}"
              </motion.p>

              {/* Author */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 5
                  }}
                  className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-4 border-border"
                >
                  <User
                    size={32}
                    className="text-muted-foreground"
                  />
                </motion.div>

                <div>
                  <h4 className="font-bold text-foreground">
                    {testimonials[currentIndex].name}
                  </h4>

                  <p className="text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{
                scale: 1.1,
                x: -5
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white"
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => {
                    setDirection(
                      index > currentIndex
                        ? 1
                        : -1
                    );
                    setCurrentIndex(index);
                  }}
                  className={`transition-all rounded-full ${
                    index === currentIndex
                      ? 'w-12 h-3 bg-gradient-to-r from-blue-600 to-purple-600'
                      : 'w-3 h-3 bg-muted hover:bg-muted-foreground'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{
                scale: 1.1,
                x: 5
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}