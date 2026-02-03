"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
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
      {/* Floating Toggle Button - Lower z-index than Navbar */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-none w-12 h-12 p-0 bg-orange-500 hover:bg-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-30 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        <MessageCircle className="h-5 w-5 text-white" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            /* z-40 ensures it stays below Navbar (usually z-50 or z-100) */
            className="fixed bottom-20 right-6 w-[320px] md:w-[350px] bg-[#fffcf9] border-2 border-black shadow-[8px_8px_0px_0px_rgba(251,146,60,0.2)] z-40 overflow-hidden flex flex-col"
          >
            {/* NOISE ENGINE */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* HEADER - Compact */}
            <div className="relative z-10 p-3 border-b-2 border-black flex justify-between items-center bg-white">
              <span className="font-black uppercase tracking-tighter text-[10px] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" /> AI_ASSISTANT.SH
              </span>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-none hover:bg-orange-50" onClick={() => setIsOpen(false)}>
                <X size={14} />
              </Button>
            </div>

            {/* MESSAGE AREA - Reduced height (300px) */}
            <div
              ref={chatContainerRef}
              className="relative z-10 h-[300px] overflow-y-auto p-4 space-y-4 bg-transparent custom-scrollbar"
            >
              {messages.map((message, index) => (
                <div key={index} className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`p-1 border border-black h-fit ${message.role === "user" ? "bg-black text-white" : "bg-orange-500 text-white"}`}>
                    {message.role === "user" ? <User size={10} /> : <Bot size={10} />}
                  </div>
                  <div className={`p-3 border-2 border-black text-xs font-medium max-w-[85%] ${message.role === "user" ? "bg-white" : "bg-orange-50"}`}>
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && <div className="p-2 border border-black bg-white text-[10px] font-mono animate-pulse w-fit">Processing...</div>}
            </div>

            {/* INPUT FIELD */}
            <form onSubmit={handleSubmit} className="relative z-10 p-3 border-t-2 border-black bg-white">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type code..."
                  className="rounded-none border-2 border-black h-9 text-xs bg-[#fffcf9] focus-visible:ring-0"
                />
                <Button type="submit" size="icon" className="h-9 w-9 bg-black rounded-none shadow-[2px_2px_0px_0px_rgba(251,146,60,1)]">
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