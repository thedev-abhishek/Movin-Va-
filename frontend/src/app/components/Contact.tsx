import axios from "axios";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  Zap,
  Code,
  TrendingUp,
} from "lucide-react";
import { ScrollMoveText } from "./ScrollMoveText";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // CONTACT FORM SUBMIT
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Submit clicked");

    try {
      const response = await axios.post(
        "https://movin-va.onrender.com/contact",
        {
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
        }
      );

      console.log(response.data);

      if (response.data.success) {
        setIsSubmitted(true);

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            email: "",
            service: "",
            message: "",
          });
        }, 3000);
      }
    } catch (error: any) {
      console.error(
        "Axios Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to send message"
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@movinva.com",
      color: "blue",
      href: "mailto:hello@movinva.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Delaware, USA",
      color: "pink",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-blue-950/20 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-card border-2 border-blue-200 rounded-full text-sm font-semibold mb-4">
            📧 Get In Touch
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <ScrollMoveText className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ready to Transform
            </ScrollMoveText>

            <br />

            <ScrollMoveText className="text-foreground">
              Your Business?
            </ScrollMoveText>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join hands with Movin-Và and let's grow together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT */}
          <div className="space-y-6">
            {contactInfo.map((info) => {
              const Icon = info.icon;

              return (
                <a
                  key={info.title}
                  href={info.href}
                  className="flex items-center gap-6 p-6 bg-card rounded-2xl shadow-lg border hover:border-blue-300 transition-all"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br from-${info.color}-400 to-${info.color}-600 rounded-xl flex items-center justify-center`}
                  >
                    <Icon className="text-white" size={28} />
                  </div>

                  <div>
                    <h3 className="font-bold">{info.title}</h3>
                    <p>{info.value}</p>
                  </div>
                </a>
              );
            })}

            <div className="p-6 rounded-2xl bg-card border">
              <div className="flex items-center gap-3 mb-3">
                <Clock size={24} />
                <h3 className="font-bold">Response Time</h3>
              </div>

              <p className="text-muted-foreground">
                We typically respond within 24 hours
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Zap, label: "Fast", value: "24h" },
                { icon: Code, label: "Expert", value: "500+" },
                { icon: TrendingUp, label: "Growth", value: "99%" },
              ].map((badge) => {
                const BadgeIcon = badge.icon;

                return (
                  <div
                    key={badge.label}
                    className="text-center p-3 bg-card rounded-lg border"
                  >
                    <BadgeIcon className="mx-auto mb-2" size={20} />
                    <p className="text-xs">{badge.label}</p>
                    <p className="font-bold">{badge.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FORM */}
          <div className="bg-card p-8 rounded-3xl shadow-2xl border">
            {isSubmitted ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="text-white" size={48} />
                </div>

                <h3 className="text-3xl font-bold mb-3">
                  Thank You!
                </h3>

                <p className="text-muted-foreground">
                  We've received your message.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="w-full px-5 py-3 border rounded-xl"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address"
                  className="w-full px-5 py-3 border rounded-xl"
                />

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border rounded-xl"
                >
                  <option value="">Select Service</option>
                  <option value="web">Web Development</option>
                  <option value="app">App Development</option>
                  <option value="va">Virtual Assistance</option>
                  <option value="marketing">Digital Marketing</option>
                </select>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Your Message"
                  className="w-full px-5 py-3 border rounded-xl resize-none"
                />

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold flex items-center justify-center gap-3"
                >
                  Send Message
                  <Send size={18} />
                </button>

                <p className="text-xs text-center text-muted-foreground">
                  We respect your privacy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}