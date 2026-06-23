"use client";

import { TrendingUp, Users, Target } from "lucide-react";

export default function GrowthPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left">
      <div className="pt-8 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)]">
        <div>
          <p className="text-[10px] text-[var(--color-text-secondary)] mb-2 font-bold uppercase tracking-[0.2em]">
            Métricas de Expansión y OKRs
          </p>
          <h1 className="hero-title">
            CRECIMIENTO <span className="font-light italic text-[var(--color-text-secondary)] tracking-normal">& metas.</span>
          </h1>
        </div>
        <button className="btn btn-primary self-start md:self-end">
          <Target size={14} /> Nuevo OKR
        </button>
      </div>

      <div className="space-y-12">
        <div className="space-y-6">
          <h2 className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest border-b border-[var(--color-border)] pb-4">Objetivos Q3 2026</h2>
          
          <div className="border border-[var(--color-border)] p-8 transition-all duration-300 hover:shadow-sm hover:border-[var(--color-text-muted)]">
            <div className="flex justify-between items-end mb-5">
              <h3 className="text-xl font-bold text-black tracking-tight">Apertura Nueva Sucursal Sur</h3>
              <span className="kpi-value">75<span className="text-xl font-bold">%</span></span>
            </div>
            <div className="w-full bg-[var(--color-surface)] h-1.5 rounded-full overflow-hidden">
              <div className="bg-black h-full w-[75%] rounded-full transition-all duration-1000"></div>
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
              <span>Status: En tiempo</span>
              <span>Deadline: Sep 2026</span>
            </div>
          </div>

          <div className="border border-[var(--color-border)] p-8 transition-all duration-300 hover:shadow-sm hover:border-[var(--color-text-muted)]">
            <div className="flex justify-between items-end mb-5">
              <h3 className="text-xl font-bold text-black tracking-tight">Lanzamiento Línea RTD (Ready To Drink)</h3>
              <span className="kpi-value">40<span className="text-xl font-bold">%</span></span>
            </div>
            <div className="w-full bg-[var(--color-surface)] h-1.5 rounded-full overflow-hidden">
              <div className="bg-black h-full w-[40%] rounded-full transition-all duration-1000"></div>
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
              <span>Status: Retraso Menor</span>
              <span>Deadline: Oct 2026</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--color-border)] bg-[var(--color-border)] gap-[1px]">
          <div className="bg-white p-8">
            <span className="kpi-label">Retención de Clientes</span>
            <div className="kpi-value tabular-nums">84<span className="text-2xl font-bold">%</span></div>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-3 font-bold uppercase tracking-widest">+2.4% vs trimestre anterior</p>
          </div>
          <div className="bg-black p-8">
            <span className="kpi-label" style={{ color: 'rgba(255,255,255,0.5)' }}>NPS Score</span>
            <div className="kpi-value tabular-nums" style={{ color: '#fff' }}>72</div>
            <p className="text-[10px] text-white/50 mt-3 font-bold uppercase tracking-widest">Excelente nivel de recomendación</p>
          </div>
        </div>
      </div>
    </div>
  );
}
