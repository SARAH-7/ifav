"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Video, CheckCircle2, Ticket } from "lucide-react";

const EVENTS = [
  { id: 1, title: "Seed Fundraising Strategies in 2026", type: "virtual", date: "2026-04-10T10:00:00", speaker: "Jessica Livingston", status: "upcoming", registered: false },
  { id: 2, title: "SF Founders Mix & Mingle", type: "in-person", date: "2026-04-12T18:00:00", location: "LaunchBox SF", status: "upcoming", registered: false },
  { id: 3, title: "AI Pitch Deck Teardowns", type: "virtual", date: "2026-04-18T14:00:00", speaker: "LaunchAxis Team", status: "upcoming", registered: false },
  { id: 4, title: "YC Interview Prep Webinar", type: "virtual", date: "2026-03-01T10:00:00", speaker: "YC Alumni", status: "past", registered: true },
  { id: 5, title: "Q1 Ecosystem Spotlight", type: "virtual", date: "2026-02-15T09:00:00", speaker: "John Doe", status: "past", registered: false },
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [events, setEvents] = useState(EVENTS);

  const filteredEvents = events.filter(e => e.status === activeTab);

  const toggleRSVP = (id: number) => {
    setEvents(events.map(e => e.id === id ? { ...e, registered: !e.registered } : e));
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
          <Calendar className="h-8 w-8 text-fuchsia-400" />
          Ecosystem Events
        </h1>
        <p className="mt-2 text-sm text-blue-300 font-medium">
          Workshops, networking, and pitch teardowns.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            activeTab === "upcoming" 
              ? "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30" 
              : "text-blue-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            activeTab === "past" 
              ? "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30" 
              : "text-blue-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          Past Events
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map(event => {
          const dateObj = new Date(event.date);
          const month = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
          const day = dateObj.getDate();
          const time = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

          return (
            <div key={event.id} className="group flex flex-col sm:flex-row bg-blue-950/40 border border-white/5 rounded-3xl overflow-hidden hover:border-fuchsia-500/30 transition-all backdrop-blur-md">
              
              {/* Date Box */}
              <div className="bg-black/20 p-6 flex flex-col items-center justify-center min-w-[120px] sm:border-r border-white/5 group-hover:bg-fuchsia-500/5 transition-colors">
                <span className="text-fuchsia-400 font-bold text-sm tracking-widest uppercase">{month}</span>
                <span className="text-4xl font-black text-white my-1">{day}</span>
                <span className="text-xs text-blue-300 flex items-center gap-1"><Clock className="h-3 w-3" /> {time}</span>
              </div>

              {/* Content Box */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {event.type === 'virtual' ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/20">
                        <Video className="h-3 w-3" /> Virtual
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-primary/20 text-primary border border-primary/20">
                        <MapPin className="h-3 w-3" /> In-Person
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-sm text-blue-300">
                    {event.speaker ? `Hosted by ${event.speaker}` : `Location: ${event.location}`}
                  </p>
                </div>

                {activeTab === 'upcoming' && (
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={() => toggleRSVP(event.id)}
                      className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                        event.registered 
                          ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400" 
                          : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      {event.registered ? (
                        <><CheckCircle2 className="h-4 w-4" /> RSVP'd (Check Email)</>
                      ) : (
                        <><Ticket className="h-4 w-4" /> Register Now</>
                      )}
                    </button>
                  </div>
                )}
                {activeTab === 'past' && (
                  <div className="mt-6 flex justify-end">
                    <button className="px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                      <Video className="h-4 w-4" /> Watch Recording
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
