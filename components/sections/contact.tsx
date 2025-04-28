"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const contactInfo = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    details: "hello@amankumar.design",
    link: "mailto:hello@amankumar.design",
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Phone",
    details: "+1 (555) 123-4567",
    link: "tel:+15551234567",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Office",
    details: "123 Design Street, Creative City, 10001",
    link: "#",
  },
];

export function Contact() {
  return (
    <section className="py-24 px-4 bg-muted/30">
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
            <span className="text-sm font-medium uppercase tracking-wider">Get in Touch</span>
            <div className="w-12 h-0.5 bg-primary"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-8 mb-12">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="mt-1 text-primary">{item.icon}</div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-muted-foreground">{item.details}</p>
                  </div>
                </motion.a>
              ))}
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </Button>
              </div>
            </div>
          </motion.div>
          
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card p-6 md:p-8 rounded-xl border"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent! (This is just a demo)");
            }}
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="Subject of your message" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Your message" 
                  className="min-h-[150px]" 
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full group">
                Send Message
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}