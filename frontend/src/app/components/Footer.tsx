import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Heart } from 'lucide-react';

export function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:bg-blue-600', label: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/MovinVAInc', color: 'hover:bg-blue-400', label: 'Twitter' },
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
    ]
  };


  const handleServiceClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    category: string
  ) => {
    e.preventDefault();

    const element = document.getElementById('services');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });

      window.dispatchEvent(
        new CustomEvent('selectServiceCategory', {
          detail: category
        })
      );
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


        <div className="py-12">


          {/* Footer Columns */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 mb-12">


            {/* Brand */}

            <div className="lg:col-span-2">

              <motion.div
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                className="flex items-center gap-3 mb-4"
              >

                <div className="w-10 h-10 rounded-lg flex items-center justify-center">

                  <img
                    src={new URL('../../assets/Movinva_logo.png', import.meta.url).toString()}
                    alt="Movin VA logo"
                    className="w-10 h-10 object-contain drop-shadow"
                  />

                </div>


                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Movin VA
                </h3>


              </motion.div>


              <p className="text-gray-400 mb-6 leading-relaxed">
                Moving ahead virtually with smarter solutions. We help businesses grow globally through
                expert web development, app development, virtual assistance, and digital marketing services.
              </p>



              {/* Contact */}

              <div className="space-y-3">


                {[
                  {
                    icon: Mail,
                    text:'hello@movinva.com',
                    href:'mailto:hello@movinva.com'
                  },
                  {
                    icon: MapPin,
                    text:'Texas, USA',
                    href:null
                  }

                ].map((item,index)=>{


                  const Icon=item.icon;


                  return (

                    <motion.div
                      key={item.text}
                      initial={{opacity:0,x:-20}}
                      whileInView={{opacity:1,x:0}}
                      viewport={{once:true}}
                      transition={{delay:index*0.1}}
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                    >

                      <Icon size={16}/>


                      {
                        item.href ?

                        <a href={item.href} className="text-sm">
                          {item.text}
                        </a>

                        :

                        <span className="text-sm">
                          {item.text}
                        </span>

                      }


                    </motion.div>

                  )

                })}


              </div>


            </div>




            {/* Services */}

            <div>


              <h4 className="font-bold mb-4">
                Services
              </h4>


              <ul className="space-y-2">


                {
                  footerLinks.services.map((service,index)=>(


                    <motion.li
                      key={service.name}
                      initial={{opacity:0,x:-20}}
                      whileInView={{opacity:1,x:0}}
                      viewport={{once:true}}
                      transition={{delay:index*0.05}}
                    >


                      <a
                        href="#services"
                        onClick={(e)=>{

                          if(window.location.pathname === '/contact'){

                            e.preventDefault();
                            navigate('/');
                            return;

                          }


                          handleServiceClick(e,service.category);

                        }}

                        className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                      >

                        {service.name}

                      </a>


                    </motion.li>


                  ))
                }


              </ul>


            </div>






            {/* Company */}

            <div>


              <h4 className="font-bold mb-4">
                Company
              </h4>


              <ul className="space-y-2">


                {
                  footerLinks.company.map((link,index)=>(


                    <motion.li
                      key={link.name}
                      initial={{opacity:0,x:-20}}
                      whileInView={{opacity:1,x:0}}
                      viewport={{once:true}}
                      transition={{delay:index*0.05}}
                    >


                      <a
                        href={link.id==='contact'?'/contact':`#${link.id}`}

                        onClick={(e)=>{


                          if(link.id==='contact'){

                            e.preventDefault();
                            navigate('/contact');
                            return;

                          }


                          e.preventDefault();


                          if(window.location.pathname==='/contact'){

                            navigate('/');

                            setTimeout(()=>{

                              document
                              .getElementById(link.id)
                              ?.scrollIntoView({
                                behavior:'smooth'
                              });

                            },150);


                          }

                          else{

                            document
                            .getElementById(link.id)
                            ?.scrollIntoView({
                              behavior:'smooth'
                            });

                          }


                        }}


                        className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                      >

                        {link.name}

                      </a>


                    </motion.li>


                  ))
                }


              </ul>


            </div>


          </div>





          {/* Social */}

          <motion.div
            initial={{opacity:0,y:20}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true}}
            className="flex justify-center gap-4 mb-8"
          >

            {
              socialLinks.map((social,index)=>{


                const Icon=social.icon;


                return (

                  <motion.a

                    key={social.label}

                    href={social.href}

                    aria-label={social.label}

                    whileHover={{
                      scale:1.2,
                      y:-5
                    }}

                    className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"

                  >

                    <Icon size={20}/>

                  </motion.a>

                )


              })
            }


          </motion.div>





          {/* Bottom */}

          <motion.div

            initial={{opacity:0}}

            whileInView={{opacity:1}}

            viewport={{once:true}}

            className="border-t border-gray-700 pt-8 text-center"

          >


            <p className="text-gray-400 text-sm flex items-center justify-center gap-2 flex-wrap">


              <span>
                © {currentYear} Movin VA. All rights reserved.
              </span>


              <span className="hidden md:inline">
                •
              </span>


              <span className="flex items-center gap-1">

                Made with
                <Heart size={14} className="text-red-500 animate-pulse"/>
                by Movin VA Team

              </span>


            </p>



            <p className="text-gray-500 text-xs mt-2">

              Moving ahead virtually • Texas, USA

            </p>


          </motion.div>


        </div>

      </div>


    </footer>
  );
}