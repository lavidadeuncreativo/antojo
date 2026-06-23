"use client";

import { useState } from "react";
import { Users, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function CommercialPage() {
  const [activeTab, setActiveTab] = useState("b2b");

  return (
    <div className="max-w-7xl mx-auto space-y-12 select-none text-left">
      {/* Header */}
      <div className="py-6 border-b border-[var(--color-border)] flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black uppercase">
            ÁREA <span className="font-light italic text-[var(--color-text-secondary)]">comercial.</span>
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-semibold uppercase tracking-wider">
            Gestión B2B, Clientes Corporativos y Eventos
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-[var(--color-border)] pb-2">
        <button
          onClick={() => setActiveTab("b2b")}
          className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
            activeTab === "b2b" ? "border-black text-black" : "border-transparent text-black/50 hover:text-black"
          }`}
        >
          Canal B2B
        </button>
        <button
          onClick={() => setActiveTab("clientes")}
          className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
            activeTab === "clientes" ? "border-black text-black" : "border-transparent text-black/50 hover:text-black"
          }`}
        >
          Directorio de Clientes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-[var(--color-border)] p-6 bg-white relative">
          <div className="absolute top-0 right-0 p-4 text-[var(--color-text-muted)]">
            <Users size={24} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] block mb-1">
            Clientes Activos (B2B)
          </span>
          <div className="text-3xl font-black text-black tracking-tighter mb-4">
            0
          </div>
          
          <div className="py-12 text-center text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">
            No hay clientes B2B registrados
          </div>
        </div>

        <div className="border border-black p-6 bg-black text-white relative">
          <div className="absolute top-0 right-0 p-4 text-white/50">
            <Target size={24} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 block mb-1">
            Pipeline B2B
          </span>
          <div className="text-3xl font-black text-white tracking-tighter mb-6">
            {formatCurrency(0)} <span className="text-sm font-normal text-white/70 tracking-normal">en negociación</span>
          </div>
          
          <div className="py-12 text-center text-xs font-bold text-white/50 uppercase tracking-widest">
            Pipeline vacío
          </div>
        </div>
      </div>
    </div>
  );
}
