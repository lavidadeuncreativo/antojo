"use client";

import { Calendar, MapPin, ArrowRight } from "lucide-react";

export default function EventsPage() {
  const events: any[] = [];

  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left pt-6">
      <div className="border-b border-[#E5E5E5] pb-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase" style={{ letterSpacing: "-0.04em" }}>
          EVENTOS
        </h1>
        <p className="text-sm text-black/60 mt-4 uppercase tracking-widest font-medium">
          Activaciones y Catering
        </p>
      </div>

      <div className="space-y-6">
        {events.length === 0 ? (
          <div className="text-center py-12 text-xs font-bold text-[#999999] uppercase tracking-widest">
            No hay eventos programados
          </div>
        ) : (
          events.map((evt, idx) => (
          <div key={idx} className="group border-b border-[#E5E5E5] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer">
            <div className="flex items-start md:items-center gap-6">
              <div className="w-16 h-16 bg-[#F5F5F5] rounded-xl flex items-center justify-center flex-col">
                <span className="text-xs text-black/50 font-bold uppercase">{evt.date.split(' ')[1]}</span>
                <span className="text-lg text-black font-black leading-none">{evt.date.split(' ')[0]}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-black">{evt.name}</h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-black/60">
                  <MapPin size={14} /> {evt.location}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
              <span className={`text-xs font-bold uppercase tracking-widest ${evt.status === 'Confirmado' ? 'text-green-700' : 'text-[#999999]'}`}>
                {evt.status}
              </span>
              <button className="w-10 h-10 rounded-full border border-[#E5E5E5] flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
}
