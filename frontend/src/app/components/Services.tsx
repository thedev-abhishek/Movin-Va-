import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { useRef } from 'react';
import { ScrollMoveText } from './ScrollMoveText';

import {
  Code, Smartphone, UserCheck, TrendingUp,
  Layers, Zap, Palette, Search,
  ChevronRight, CheckCircle, Globe, MessageSquare,
  Shield, BarChart3
} from 'lucide-react';
export function Services() {


  // kept for minimal changes (filter UI removed), but not used anymore.
  const [selectedCategory, setSelectedCategory] = useState('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // filter UI removed; keep event listener disabled to avoid unused selection updates.
  useEffect(() => {
    const handleCategorySelect = (_e: Event) => {
      // no-op (filter removed)
    };
    window.addEventListener('selectServiceCategory', handleCategorySelect);
    return () => window.removeEventListener('selectServiceCategory', handleCategorySelect);
  }, []);


  const services = [
    {
      category: 'web',
      icon: Code,
      title: 'Custom Web Development',
      description: 'Build modern, scalable websites tailored to your business needs with cutting-edge technologies.',
      features: ['React & Next.js', 'Responsive Design', 'E-commerce Solutions', 'CMS Integration'],
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      category: 'web',
      icon: Globe,
      title: 'Progressive Web Apps',
      description: 'Create fast, reliable, and engaging web applications that work across all devices.',
      features: ['Offline Support', 'Push Notifications', 'App-like Experience', 'Fast Performance'],
      gradient: 'from-indigo-400 to-indigo-600',
    },
    {
      category: 'web',
      icon: Layers,
      title: 'Full-Stack Development',
      description: 'End-to-end web solutions from frontend to backend with robust architecture.',
      features: ['API Development', 'Database Design', 'Cloud Deployment', 'Scalable Systems'],
      gradient: 'from-cyan-400 to-cyan-600',
    },
    {
      category: 'app',
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: ['React Native', 'Flutter', 'Native iOS/Android', 'Cross-platform'],
      gradient: 'from-purple-400 to-purple-600',
    },
    {
      category: 'app',
      icon: Zap,
      title: 'App Modernization',
      description: 'Transform legacy applications with modern technologies and improved performance.',
      features: ['Code Refactoring', 'UI/UX Redesign', 'Performance Boost', 'Feature Updates'],
      gradient: 'from-violet-400 to-violet-600',
    },
    {
      category: 'app',
      icon: Shield,
      title: 'Secure App Solutions',
      description: 'Build secure applications with robust authentication and data protection.',
      features: ['Encryption', 'Auth Systems', 'Security Audits', 'Compliance'],
      gradient: 'from-emerald-400 to-emerald-600',
    },
    {
      category: 'va',
      icon: UserCheck,
      title: 'Administrative Support',
      description: 'Professional virtual assistance for day-to-day business operations and tasks.',
      features: ['Email Management', 'Scheduling', 'Data Entry', 'Document Handling'],
      gradient: 'from-amber-400 to-amber-600',
    },
    {
      category: 'va',
      icon: MessageSquare,
      title: 'Customer Support',
      description: 'Dedicated virtual assistants to manage customer inquiries and support.',
      features: ['Live Chat Support', 'Email Support', 'CRM Management', 'US Time Zones Availability (ET/PT/CT)'],
      gradient: 'from-teal-400 to-teal-600',
    },
    {
      category: 'va',
      icon: CheckCircle,
      title: 'Project Coordination',
      description: 'Expert assistance in managing projects, timelines, and team coordination.',
      features: ['Task Management', 'Team Coordination', 'Progress Tracking', 'Reporting'],
      gradient: 'from-sky-400 to-sky-600',
    },
    {
      category: 'marketing',
      icon: TrendingUp,
      title: 'Social Media Marketing',
      description: 'Grow your brand presence with strategic social media campaigns and engagement.',
      features: ['Content Strategy', 'Social Management', 'Community Building', 'Analytics'],
      gradient: 'from-pink-400 to-pink-600',
    },
    {
      category: 'marketing',
      icon: Search,
      title: 'SEO & Content Marketing',
      description: 'Boost your organic visibility with SEO optimization and quality content.',
      features: ['Keyword Research', 'On-page SEO', 'Content Creation', 'Link Building'],
      gradient: 'from-rose-400 to-rose-600',
    },
    {
      category: 'marketing',
      icon: BarChart3,
      title: 'Digital Strategy & Analytics',
      description: 'Data-driven marketing strategies to maximize ROI and business growth.',
      features: ['Campaign Management', 'Performance Analytics', 'A/B Testing'],
      gradient: 'from-orange-400 to-orange-600',
    },
  ];

  // Category filter UI removed per content request.
  // Services are shown without grouping.
  const filteredServices = services;

  // Keep selectedCategory state to avoid large refactor of the file,
  // but categories UI will be removed below.
  const categories = [] as Array<{ id: string; name: string; icon: any }>;



  return (
    <section id="services" ref={ref} className="py-20 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4"
          >
            Our Services
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
              Comprehensive Solutions
            </ScrollMoveText>
            <br />
            {/* <ScrollMoveText
              className="text-foreground"
              fromY={26}
              toY={0}
              fromOpacity={0}
              toOpacity={1}
              direction="rtl"
            >
              For Your Business
            </ScrollMoveText> */}

          </h2>


          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From development to assistance, we provide smarter solutions to make things easier
          </p>
        </motion.div>



        {/* Services Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-16">
          {filteredServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
                whileHover={{ y: -6, scale: 1.02, zIndex: 25 + (index % 4) }}
                className="group relative rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:z-[calc(25+(index%4)*5)] transition-all cursor-pointer border-2 border-border/70 dark:border-border/70 overflow-hidden isolate hover:isolate bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0.72))] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.52),rgba(15,23,42,0.35))]"
              >
                  {/* Background Gradient Effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(700px_circle_at_var(--mouse-x,50%)_var(--mouse-y,0%),rgba(99,102,241,0.35),transparent_55%)] dark:bg-[radial-gradient(700px_circle_at_var(--mouse-x,50%)_var(--mouse-y,0%),rgba(56,189,248,0.22),transparent_55%)]" />
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,0%),rgba(59,130,246,0.18),transparent_45%)] transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                    <div className={`absolute -top-24 -left-24 w-56 h-56 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-30`} />
                    <div className={`absolute -bottom-24 -right-24 w-56 h-56 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl opacity-10 transition-opacity duration-300 group-hover:opacity-20`} />
                    <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,0%),rgba(99,102,241,0.14),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="relative z-10 h-full">
                    {/* Icon with Hover Animation */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5, type: 'spring' }}
                      className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-all`}
                    >
                      <Icon className="text-white drop-shadow-md" size={28} />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-blue-600 transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground mb-6 text-sm group-hover:text-foreground transition-colors">{service.description}</p>

                    {/* Features List - Always visible, subtle hover */}
                    <div className="overflow-hidden">
                      <div className="pt-2 border-t border-border">
                        <ul className="space-y-2">
                          {service.features.map((feature, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              whileHover={{ x: 5 }}
                              className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-all"
                            >
                              <motion.div
                                whileHover={{ scale: 1.2 }}
                              className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-400 group-hover:bg-blue-500 transition-all"
                              />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </div>
    </section>
  );
}
