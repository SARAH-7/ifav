"use client";

import { useState } from "react";
import { Sparkles, Send, Bot, User, ArrowRight } from "lucide-react";

const PROMPT_CHIPS = [
  "Summarize our latest seed deck",
  "Compare our CAC to SaaS benchmarks",
  "Generate an intro email to Nexus Ventures",
  "Suggest 3 improvements for our 'Why Now' slide"
];

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant", content: string }[]>([
    { role: "assistant", content: "Hi! I'm your LaunchAxis AI co-pilot. I can analyze your documents, draft investor communications, or answer questions about your ecosystem. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsTyping(true);

    // Mock AI response delay
    setTimeout(() => {
      let reply = "I can certainly help with that. Based on your current profile data, I've analyzed your request and prepared a thorough breakdown for you.";
      
      if (text.includes("intro email")) {
        reply = "Subject: AcmeCorp (B2B SaaS) - Disrupting enterprise procurement\n\nHi Nexus Team,\n\nI noticed you recently led the Series A in SupplyLink. We are building the next generation of procurement automation for mid-market...\n\n(I've kept it concise as VCs prefer brief, traction-focused intros.)";
      } else if (text.includes("CAC")) {
        reply = "Your current CAC is $450, with an LTV of $3,200 (LTV:CAC ratio of 7.1x). This is extremely strong! The SaaS benchmark for Seed-stage companies is generally around 3x. Highlight this efficiency in your next investor update.";
      }

      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] md:h-[calc(100vh-theme(spacing.8))] max-w-4xl mx-auto flex flex-col p-4 md:p-6 overflow-hidden">
      
      {/* Header */}
      <div className="bg-blue-950/60 border border-white/10 rounded-t-3xl p-6 backdrop-blur-md flex items-center gap-4 shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-10 relative">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 p-0.5">
          <div className="w-full h-full bg-blue-950/50 rounded-xl flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">LaunchAxis AI</h1>
          <p className="text-xs text-blue-300">Powered by Gemini & Claude Intelligence</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-blue-950/30 border-x border-white/5 p-6 overflow-y-auto space-y-6 CustomScrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg mt-1">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            
            <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === "user" 
                ? "bg-blue-600 text-white rounded-tr-none shadow-lg" 
                : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none shadow-lg shadow-black/20"
            }`}>
              {msg.content}
            </div>

            {msg.role === "user" && (
              <div className="h-8 w-8 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0 mt-1">
                <User className="h-4 w-4 text-blue-300" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg mt-1">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 flex items-center gap-2 shadow-lg w-20">
              <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="h-2 w-2 bg-accent rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-blue-950/60 border border-white/10 rounded-b-3xl p-6 backdrop-blur-md shrink-0 z-10 relative">
        
        {/* Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {PROMPT_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-blue-300 hover:bg-primary/20 hover:text-white hover:border-primary/30 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="h-3 w-3" /> {chip}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Ask AI to analyze data, draft emails, or review documents..."
            className="flex-1 rounded-xl bg-black/20 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-blue-200/50"
          />
          <button 
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="px-6 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
          >
            Send <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
