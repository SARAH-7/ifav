"use client";

import { useState } from "react";
import { MessageSquare, Search, Edit, MoreVertical, Send, Image as ImageIcon, Paperclip } from "lucide-react";

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState("chat-1");

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] md:h-[calc(100vh-theme(spacing.8))] max-w-7xl mx-auto flex gap-6 p-4 md:p-6 overflow-hidden">
      
      {/* Left Pane: Inbox List */}
      <div className="w-full md:w-80 lg:w-96 bg-blue-950/40 border border-white/5 rounded-3xl backdrop-blur-md flex flex-col overflow-hidden shadow-2xl flex-shrink-0">
        
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" /> Inbox
          </h2>
          <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-blue-300 transition-colors">
            <Edit className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4 border-b border-white/5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full rounded-xl bg-black/20 border border-white/5 py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Thread 1 */}
          <div 
            onClick={() => setActiveChat("chat-1")}
            className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${activeChat === "chat-1" ? "bg-white/10" : "hover:bg-white/5"}`}
          >
            <div className="flex gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white text-sm">
                  NV
                </div>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-blue-950" />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-white truncate">Nexus Ventures</h4>
                  <span className="text-[10px] text-blue-300">10:42 AM</span>
                </div>
                <p className="text-xs text-blue-300 mt-1 truncate">We loved the updated deck. Are you free for a call on Tuesday?</p>
              </div>
            </div>
          </div>

          {/* Thread 2 */}
          <div 
            onClick={() => setActiveChat("chat-2")}
            className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${activeChat === "chat-2" ? "bg-white/10" : "hover:bg-white/5"}`}
          >
            <div className="flex gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-white text-sm">
                  JS
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-white truncate">John Smith (Angel)</h4>
                  <span className="text-[10px] text-blue-300">Yesterday</span>
                </div>
                <p className="text-xs text-blue-300 mt-1 truncate">I'll pass for now, but following your progress.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane: Thread View */}
      <div className="hidden md:flex flex-1 bg-blue-950/40 border border-white/5 rounded-3xl backdrop-blur-md flex-col overflow-hidden shadow-2xl">
        {/* Thread Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-black/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white text-sm">
              NV
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Nexus Ventures</h3>
              <p className="text-[10px] text-emerald-400 font-medium">Online</p>
            </div>
          </div>
          <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-blue-300 transition-colors">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>

        {/* Thread Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 flex flex-col">
          <div className="text-xs text-center text-blue-300 font-medium">May 15, 2026</div>
          
          <div className="flex gap-3 justify-end">
            <div className="max-w-[75%] bg-primary text-white p-3 rounded-2xl rounded-tr-none text-sm leading-relaxed shadow-lg">
              Hi Nexus Team, following our intro yesterday, I wanted to share our updated Seed deck with the new cohort metrics.
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white text-xs shrink-0 mt-1">
              NV
            </div>
            <div className="max-w-[75%] bg-white/10 text-white border border-white/5 p-3 rounded-2xl rounded-tl-none text-sm leading-relaxed">
              Thanks! We'll take a look and get back to you by end of week.
            </div>
          </div>

          <div className="text-xs text-center text-blue-300 font-medium">Today</div>

          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white text-xs shrink-0 mt-1">
              NV
            </div>
            <div className="max-w-[75%] bg-white/10 text-white border border-white/5 p-3 rounded-2xl rounded-tl-none text-sm leading-relaxed">
              We loved the updated deck. The improvement in CAC payback period is exactly what we were looking for. Are you free for a call on Tuesday at 10 AM PT to discuss next steps?
            </div>
          </div>
        </div>

        {/* Thread Input */}
        <div className="p-4 border-t border-white/5 bg-black/10">
          <div className="flex items-end gap-2 bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-primary/50 transition-colors">
            <div className="flex pb-2 px-2 gap-2 text-blue-400">
              <button className="hover:text-white transition-colors"><Paperclip className="h-5 w-5" /></button>
              <button className="hover:text-white transition-colors"><ImageIcon className="h-5 w-5" /></button>
            </div>
            <textarea
              placeholder="Write a message..."
              className="flex-1 bg-transparent border-none text-sm text-white resize-none max-h-32 min-h-10 py-2 focus:outline-none"
              rows={1}
            />
            <button className="mb-1 p-2 bg-primary hover:bg-primary/90 rounded-full text-white shadow-lg transition-transform hover:-translate-y-0.5">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
