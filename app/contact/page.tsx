"use client";

import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Send, Mail, Phone, Command, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageTransition } from "@/components/page-transition";
import { useEffect, useState, useRef } from 'react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const contactInfo = [
  { icon: <Mail className="h-6 w-6" />, title: "Email", details: "amanr3388@gmail.com", link: "mailto:amanr3388@gmail.com" },
  { icon: <Phone className="h-6 w-6" />, title: "Phone", details: "+91-7906753589", link: "tel:+91-7906753589" }
];

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  useEffect(() => {
    (async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll({
          el: containerRef.current as unknown as HTMLElement,
          smooth: true,
          multiplier: 0.8,
          lerp: 0.15
        });
        setIsLoading(false);
        return () => locomotiveScroll?.destroy();
      } catch (error) {
        console.error('Error loading LocomotiveScroll:', error);
        setIsLoading(false);
      }
    })();
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("Message sent! (Demo)");
    form.reset();
  }

  return (
    <div ref={containerRef} data-scroll-container className="relative min-h-screen bg-[#fffcf9] text-[#1a1a1a] overflow-hidden selection:bg-orange-500 selection:text-white font-sans">
      
      {/* --- OPTIMIZED NOISE LAYER --- */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none z-[100] opacity-[0.12]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"1\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.4\"/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
          mixBlendMode: 'multiply'
        }}
      />
      
      {/* BACKGROUND BLOBS */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-200/40 rounded-full blur-[120px] z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-100/50 rounded-full blur-[100px] z-0"></div>

      <PageTransition>
        <div className="relative z-10 container max-w-7xl mx-auto px-6 py-24">
          
        
          <motion.header 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-tighter mb-4">
              <Sparkles size={16} /> <span>Get In Touch</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase">
              Let&apos;s <br /> <span className="text-orange-500 italic font-serif lowercase pr-4">connect.</span>
            </h1>
          </motion.header>

          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16">
            {/* LEFT SIDE: INFO */}
            <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="space-y-12">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400 mb-6">Contact Details</h3>
                  <div className="space-y-4">
                    {contactInfo.map((item, index) => (
                      <a key={index} href={item.link} className="group flex items-center gap-6 p-6 bg-white border border-black/5 hover:border-orange-500/50 transition-all rounded-2xl shadow-sm hover:shadow-xl hover:shadow-orange-200/20">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">{item.title}</p>
                          <p className="text-xl font-bold">{item.details}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400 mb-6">Socials</h3>
                  <div className="flex gap-3">
                    {['LinkedIn', 'Twitter', 'GitHub', 'Insta'].map((social) => (
                      <Button key={social} variant="outline" className="rounded-full px-6 border-black/10 hover:bg-black hover:text-white transition-all font-bold">
                        {social}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE: FORM */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-black shadow-[20px_20px_0px_0px_rgba(251,146,60,0.1)]"
            >
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Send a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Name</FormLabel>
                        <FormControl>
                          <Input className="bg-transparent border-0 border-b-2 border-slate-200 rounded-none focus-visible:ring-0 focus-visible:border-orange-500 text-lg px-0" placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Email Address</FormLabel>
                        <FormControl>
                          <Input className="bg-transparent border-0 border-b-2 border-slate-200 rounded-none focus-visible:ring-0 focus-visible:border-orange-500 text-lg px-0" placeholder="hello@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="subject" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Subject</FormLabel>
                      <FormControl>
                        <Input className="bg-transparent border-0 border-b-2 border-slate-200 rounded-none focus-visible:ring-0 focus-visible:border-orange-500 text-lg px-0" placeholder="Project Inquiry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Message</FormLabel>
                      <FormControl>
                        <Textarea className="bg-transparent border-0 border-b-2 border-slate-200 rounded-none focus-visible:ring-0 focus-visible:border-orange-500 text-lg px-0 min-h-[120px] resize-none" placeholder="Tell me about your project..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <Button type="submit" className="w-full h-16 bg-orange-500 hover:bg-black text-white rounded-2xl text-xl font-black uppercase tracking-tighter transition-all group">
                    Send Inquiry
                    <Send className="ml-3 h-5 w-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}