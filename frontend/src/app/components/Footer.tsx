import { motion } from 'motion/react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:bg-blue-600', label: 'Facebook' },
    { icon: Twitter, href: '#', color: 'hover:bg-blue-400', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/movin-va/', color: 'hover:bg-blue-700', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/movin_va/', color: 'hover:bg-pink-600', label: 'Instagram' },
  ];

  const footerLinks = {
    services: [
      { name: 'Web Development', category: 'web' },
      { name: 'App Development', category: 'app' },
      { name: 'Virtual Assistance', category: 'va' },
      { name: 'Digital Marketing', category: 'marketing' }
    ],
    company: [
      { name: 'About Us', id: 'about' },
      { name: 'Testimonials', id: 'testimonials' },
      { name: 'Contact', id: 'contact' }
    ],
    resources: [
      { name: 'FAQs', id: 'faqs' },
      { name: 'Support', id: 'contact' }
    ],
  };

  const handleServiceClick = (e: React.MouseEvent<HTMLAnchorElement>, category: string) => {
    e.preventDefault();
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('selectServiceCategory', { detail: category }));
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <img
                    src={new URL('../../assets/Movinva_logo.png', import.meta.url).toString()}
                    alt="Movin-và logo"
                    className="w-10 h-10 object-contain drop-shadow"
                  />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Movin-và
                </h3>
              </motion.div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Moving ahead virtually with smarter solutions. We help businesses grow globally through
                expert web development, app development, virtual assistance, and digital marketing services.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {[
                  { icon: Mail, text: 'hello@movinva.com' },
                  //{ icon: Phone, text: '+91 123456789' },
                  { icon: MapPin, text: 'Delaware, USA' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Icon size={16} />
                      <span className="text-sm">{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((service, index) => (
                  <motion.li
                    key={service.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a 
                      href="#services" 
                      onClick={(e) => handleServiceClick(e, service.category)}
                      className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                    >
                      {service.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a 
                      href={`#${link.id}`} 
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a 
                      href={`#${link.id}`} 
                      onClick={(e) => {
                        e.preventDefault();
                        if (link.id) {
                          document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4 mb-8"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className={`w-12 h-12 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg`}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-gray-700 pt-8 text-center"
          >
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2 flex-wrap">
              <span>© {currentYear} Movin-và. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart size={14} className="text-red-500 animate-pulse" /> by Movin-và Team
              </span>
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Moving ahead virtually • Delaware, USA
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}