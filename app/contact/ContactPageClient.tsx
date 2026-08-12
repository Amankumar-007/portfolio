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
import { useLenis } from '@/hooks/useLenis';

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

export default function ContactPageClient() {
  const { isLoading } = useLenis();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("Message sent! (Demo)");
    form.reset();
  }

  return (
    <div data-scroll-container className="relative min-h-screen bg-[#0d0d0f] text-white selection:bg-[#F05335] selection:text-white font-sans overflow-x-hidden pt-28 pb-24">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial from-[#F05335]/15 via-transparent to-transparent pointer-events-none z-0 blur-3xl" />

      {/* --- OPTIMIZED NOISE LAYER --- */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[100] opacity-[0.15] contrast-150 mix-blend-overlay">
        <filter id="roughNoise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter>
        <rect width="100%" height="100%" filter="url(#roughNoise)" />
      </svg>

      <PageTransition>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          <motion.header 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-20 space-y-3 sm:space-y-4"
          >
            <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-[0.25em] uppercase text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F05335] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F05335]"></span>
              </span>
              <span className="font-bold text-zinc-300">Get In Touch</span>
            </div>
            <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-[0.9] uppercase text-white">
              Let&apos;s <br /> <span className="text-[#F05335] italic font-serif lowercase pr-4">connect.</span>
            </h1>
          </motion.header>

          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 sm:gap-16 items-start">
            {/* LEFT SIDE: INFO */}
            <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="space-y-8 sm:space-y-12">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 mb-4 sm:mb-6 font-bold">Contact Details</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {contactInfo.map((item, index) => (
                      <a key={index} href={item.link} className="group flex items-center gap-3.5 sm:gap-6 p-4 sm:p-6 bg-zinc-950/80 border border-zinc-800/80 hover:border-[#F05335]/60 transition-all rounded-2xl shadow-lg min-w-0">
                        <div className="p-2.5 sm:p-3 bg-zinc-900 text-[#F05335] rounded-xl group-hover:bg-[#F05335] group-hover:text-white transition-colors shrink-0">
                          {item.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-400">{item.title}</p>
                          <p className="text-sm xs:text-base sm:text-xl font-bold text-white truncate">{item.details}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 mb-4 sm:mb-6 font-bold">Socials</h3>
                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {[
                      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/amankumarweb/' },
                      { name: 'GitHub', url: 'https://github.com/Amankumar-007' },
                      { name: 'Twitter', url: 'https://twitter.com' },
                      { name: 'Instagram', url: 'https://instagram.com' }
                    ].map((social) => (
                      <a 
                        key={social.name} 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="rounded-full px-4 sm:px-6 py-2 sm:py-2.5 bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-[#F05335] hover:text-white transition-all font-bold text-xs"
                      >
                        {social.name}
                      </a>
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
              className="bg-zinc-950/90 p-5 sm:p-8 md:p-12 rounded-3xl sm:rounded-[2.5rem] border border-zinc-800/90 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-6 sm:mb-8">Send a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-widest text-[10px] text-zinc-400">Name</FormLabel>
                        <FormControl>
                          <Input className="bg-transparent border-0 border-b-2 border-zinc-800 rounded-none focus-visible:ring-0 focus-visible:border-[#F05335] text-base sm:text-lg text-white px-0 placeholder:text-zinc-600" placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-widest text-[10px] text-zinc-400">Email Address</FormLabel>
                        <FormControl>
                          <Input className="bg-transparent border-0 border-b-2 border-zinc-800 rounded-none focus-visible:ring-0 focus-visible:border-[#F05335] text-base sm:text-lg text-white px-0 placeholder:text-zinc-600" placeholder="hello@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="subject" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold uppercase tracking-widest text-[10px] text-zinc-400">Subject</FormLabel>
                      <FormControl>
                        <Input className="bg-transparent border-0 border-b-2 border-zinc-800 rounded-none focus-visible:ring-0 focus-visible:border-[#F05335] text-base sm:text-lg text-white px-0 placeholder:text-zinc-600" placeholder="Project Inquiry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold uppercase tracking-widest text-[10px] text-zinc-400">Message</FormLabel>
                      <FormControl>
                        <Textarea className="bg-transparent border-0 border-b-2 border-zinc-800 rounded-none focus-visible:ring-0 focus-visible:border-[#F05335] text-base sm:text-lg text-white px-0 min-h-[100px] sm:min-h-[120px] resize-none placeholder:text-zinc-600" placeholder="Tell me about your project..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <Button type="submit" className="w-full h-14 sm:h-16 bg-[#F05335] hover:bg-orange-600 text-white rounded-2xl text-base sm:text-xl font-black uppercase tracking-tight transition-all shadow-[0_10px_30px_rgba(240,83,53,0.3)] group cursor-pointer">
                    Send Inquiry
                    <Send className="ml-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
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