"use client";

import { Calendar, MapPin, ArrowRight } from "lucide-react";

export default function EventsPage() {
  const events: any[] = [];

  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left">
      <div className="pt-8 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)]">
        <div>
          <p className="text-[10px] text-[var(--color-text-secondary)] mb-2 font-bold uppercase tracking-[0.2em]">
            Activaciones y Catering
          </p>
          <h1 className="hero-title">
            EVENTOS <span className="font-light italic text-[var(--color-text-secondary)] tracking-normal">& activaciones.</span>
          </h1>
        </div>
        <button className="btn btn-primary self-start md:self-end">
          <Calendar size={14} /> Nuevo Evento
        </button>
      </div>

      <div className="space-y-6">
        {events.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-[var(--color-border)] rounded-2xl bg-[var(--color-canvas)] shadow-sm">
            <div className="flex flex-col items-center justify-center space-y-3">
              <Calendar size={32} className="text-[var(--color-border)] mb-2" />
              <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Sin eventos</span>
              <p className="text-sm font-medium text-[var(--color-text-secondary)]">No hay eventos o activaciones programadas.</p>
            </div>
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
