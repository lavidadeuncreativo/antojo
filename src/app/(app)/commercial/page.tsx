"use client";

import { useState } from "react";
import { Users, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function CommercialPage() {
  const [activeTab, setActiveTab] = useState("b2b");

  return (
    <div className="max-w-7xl mx-auto space-y-12 select-none text-left">
      {/* Header */}
      <div className="pt-8 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)]">
        <div>
          <p className="text-[10px] text-[var(--color-text-secondary)] mb-2 font-bold uppercase tracking-[0.2em]">
            Gestión B2B, Clientes Corporativos y Eventos
          </p>
          <h1 className="hero-title">
            ÁREA <span className="font-light italic text-[var(--color-text-secondary)] tracking-normal">comercial.</span>
          </h1>
        </div>
        <button className="btn btn-primary self-start md:self-end">
          <Users size={14} /> Nuevo Cliente
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)]">
        <button
          onClick={() => setActiveTab("b2b")}
          className={`px-6 py-3 text-[11px] font-bold border-b-2 uppercase tracking-widest transition-all duration-300 ${
            activeTab === "b2b" ? "border-black text-black" : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
          }`}
        >
          Canal B2B
        </button>
        <button
          onClick={() => setActiveTab("clientes")}
          className={`px-6 py-3 text-[11px] font-bold border-b-2 uppercase tracking-widest transition-all duration-300 ${
            activeTab === "clientes" ? "border-black text-black" : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
          }`}
        >
          Directorio de Clientes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--color-border)] bg-[var(--color-border)] gap-[1px]">
        <div className="bg-white p-8 relative overflow-hidden group transition-all duration-300 hover:bg-[var(--color-surface)]">
          <Users size={20} className="absolute top-6 right-6 text-[var(--color-border)] group-hover:text-[var(--color-text-muted)] transition-colors" />
          <span className="kpi-label">Clientes Activos (B2B)</span>
          <div className="kpi-value tabular-nums">0</div>

          <div className="mt-6 py-8 text-center border border-dashed border-[var(--color-border)] rounded-xl">
            <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Sin clientes B2B registrados</span>
          </div>
        </div>

        <div className="bg-black p-8 relative overflow-hidden">
          <Target size={20} className="absolute top-6 right-6 text-white/20" />
          <span className="kpi-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Pipeline B2B</span>
          <div className="kpi-value tabular-nums" style={{ color: '#fff' }}>{formatCurrency(0)}<span className="text-sm font-normal ml-2" style={{ color: 'rgba(255,255,255,0.6)' }}>en negociación</span></div>

          <div className="mt-6 py-8 text-center border border-dashed border-white/10 rounded-xl">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Pipeline vacío</span>
          </div>
        </div>
      </div>
    </div>
  );
}
