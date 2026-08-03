"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const contactInfo = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    details: "amanr3388@gmail.com",
    link: "mailto:amanr3388@gmail.com",
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Phone",
    details: "+91-7906753589",
    link: "tel:+91-7906753589",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Home",
    details: "Agra Uttar Pradesh, India",
    link: "#",
  },
];

// Magnetic Button with Touch Support fallbacks
const MagneticButton = ({ children, size = "default" }: { children: React.ReactNode; size?: "default" | "icon" }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  const sizeClasses = size === "icon" ? "w-12 h-12 p-0" : "w-fit md:w-auto px-8 py-4";

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`group relative ${sizeClasses} bg-neutral-900 rounded-full overflow-hidden shadow-xl`}
      type="submit"
    >
      <div className="absolute inset-0 bg-orange-500 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
      <div className="flex justify-center items-center relative z-10 h-full">{children}</div>
    </motion.button>
  );
};

export function Contact() {
  // Replace with your Formspree endpoint or any other service
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id";

  return (
    <section className="py-24 px-0 md:px-4 bg-muted/30">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-12 h-0.5 bg-primary"></div>
            <span className="text-sm font-medium uppercase tracking-wider">
              Get in Touch
            </span>
            <div className="w-12 h-0.5 bg-primary"></div>
          </div>
          <h2 className="text-3xl font-playfair font-bold mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-lg text-muted-foreground">
            Having a project in mind or just want to say hello? I&apos;d love to
            hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6">
              Contact Information
            </h3>

            <div className="space-y-8 mb-12">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.1,
                  }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="mt-1 text-primary">{item.icon}</div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-muted-foreground">
                      {item.details}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
              <div className="flex gap-4">
                <MagneticButton size="icon">
                  <Link
                    href="https://www.linkedin.com/in/amankumarweb/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex items-center justify-center"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </Link>
                </MagneticButton>
                <MagneticButton size="icon">
                  <Link
                    href="https://github.com/Amankumar-007"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex items-center justify-center"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </Link>
                </MagneticButton>
                <MagneticButton size="icon">
                  <Link
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="flex items-center justify-center"
                  >
                    <Twitter className="w-5 h-5 text-white" />
                  </Link>
                </MagneticButton>
                <MagneticButton size="icon">
                  <Link
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex items-center justify-center"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Contact Form using Formspree */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card p-6 md:p-8 rounded-xl border"
            action={FORMSPREE_ENDPOINT}
            method="POST"
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Subject of your message"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  className="min-h-[150px]"
                  required
                />
              </div>
              <MagneticButton>
                <span className="flex items-center gap-2 text-white font-bold tracking-wide text-sm md:text-base">
                  Send Message
                  <ArrowRight size={18} />
                </span>
              </MagneticButton>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}