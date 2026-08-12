"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "./button";
import { Input } from "./input";
import { MessageCircle, Send, X, Bot, User, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed");
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (error: any) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error connecting to AI service." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button - Toggles open & close state on click */}
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 rounded-none w-12 h-12 p-0 bg-[#F05335] hover:bg-orange-600 border-2 border-white/20 shadow-[4px_4px_0px_0px_rgba(240,83,53,0.5)] z-40 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
        title={isOpen ? "Close Chat" : "Open AI Assistant"}
      >
        {isOpen ? <X className="h-5 w-5 text-white" /> : <MessageCircle className="h-5 w-5 text-white" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            data-lenis-prevent
            className="fixed bottom-20 right-6 w-[320px] md:w-[360px] max-h-[80vh] bg-[#0d0d0f] border-2 border-zinc-700 shadow-[8px_8px_0px_0px_rgba(240,83,53,0.3)] z-40 overflow-hidden flex flex-col text-white rounded-none"
          >
            {/* HEADER */}
            <div className="relative z-10 p-3.5 border-b-2 border-zinc-800 flex justify-between items-center bg-zinc-950">
              <span className="font-black uppercase tracking-wider text-[11px] flex items-center gap-2 text-white">
                <span className="w-2 h-2 bg-[#F05335] rounded-full animate-pulse" /> AI_ASSISTANT.SH
              </span>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer" onClick={() => setIsOpen(false)}>
                <X size={16} className="text-white" />
              </Button>
            </div>

            {/* MESSAGE AREA */}
            <div
              ref={chatContainerRef}
              data-lenis-prevent
              className="relative z-10 h-[340px] max-h-[60vh] overflow-y-auto p-4 space-y-4 bg-[#0d0d0f] text-white overscroll-contain scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900"
            >
              {messages.length === 0 && (
                <div className="text-center py-10 text-zinc-500 text-xs font-mono">
                  <Bot size={28} className="mx-auto mb-2 text-[#F05335] opacity-80" />
                  Ask me anything about Aman&apos;s projects, skills, or experience!
                </div>
              )}
              {messages.map((message, index) => (
                <div key={index} className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`p-1.5 border border-zinc-700 h-fit ${message.role === "user" ? "bg-white text-black" : "bg-[#F05335] text-white"}`}>
                    {message.role === "user" ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div className={`p-3 border text-xs font-medium max-w-[85%] leading-relaxed ${message.role === "user" ? "bg-zinc-900 text-white border-zinc-700" : "bg-zinc-950 text-zinc-200 border-zinc-800"}`}>
                    <div className="prose prose-invert prose-xs max-w-none">
                      <ReactMarkdown
                        components={{
                          a: ({ href, children }) => (
                            <Link
                              href={href || "#"}
                              onClick={() => setIsOpen(false)}
                              className="my-1.5 px-3 py-1.5 rounded-lg bg-[#F05335] hover:bg-[#ff5d3d] text-white font-extrabold text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5 shadow-[0_4px_12px_rgba(240,83,53,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] border border-white/20 no-underline cursor-pointer"
                            >
                              <span>{children}</span>
                              <ArrowRight size={12} className="stroke-[3]" />
                            </Link>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 items-center text-zinc-400 text-[11px] font-mono animate-pulse">
                  <Bot size={12} className="text-[#F05335]" /> Processing response...
                </div>
              )}
            </div>

            {/* INPUT FIELD */}
            <form onSubmit={handleSubmit} className="relative z-10 p-3 border-t-2 border-zinc-800 bg-zinc-950">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type message or question..."
                  className="rounded-none border border-zinc-800 h-10 text-xs bg-[#0d0d0f] text-white placeholder:text-zinc-500 focus-visible:border-[#F05335] focus-visible:ring-0"
                />
                <Button type="submit" size="icon" className="h-10 w-10 bg-[#F05335] hover:bg-orange-600 text-white rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
                  <Send size={14} className="text-white" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}