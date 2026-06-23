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
            18
          </div>
          
          <div className="space-y-3 mt-6">
            <div className="flex items-center justify-between p-3 border border-[var(--color-border)] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center font-bold text-xs">CS</div>
                <div>
                  <div className="text-xs font-bold text-black">Cafetería Sinergia</div>
                  <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider">Recurrente • Semanal</div>
                </div>
              </div>
              <div className="text-xs font-bold text-black">
                {formatCurrency(12500)} / mes
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-[var(--color-border)] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center font-bold text-xs">OW</div>
                <div>
                  <div className="text-xs font-bold text-black">Oficinas WeWork</div>
                  <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider">Barril Cold Brew</div>
                </div>
              </div>
              <div className="text-xs font-bold text-black">
                {formatCurrency(8400)} / mes
              </div>
            </div>
          </div>
          
          <button className="w-full mt-4 text-xs font-bold uppercase tracking-widest text-black hover:underline flex items-center justify-center gap-1">
            Ver Todos <ArrowRight size={12} />
          </button>
        </div>

        <div className="border border-black p-6 bg-black text-white relative">
          <div className="absolute top-0 right-0 p-4 text-white/50">
            <Target size={24} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 block mb-1">
            Pipeline B2B
          </span>
          <div className="text-3xl font-black text-white tracking-tighter mb-6">
            {formatCurrency(45000)} <span className="text-sm font-normal text-white/70 tracking-normal">en negociación</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-white/50" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-xs font-bold">Corporativo Santa Fe</span>
                  <span className="text-xs font-bold">{formatCurrency(18000)}</span>
                </div>
                <div className="w-full bg-white/20 h-1 mt-1.5 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-[80%] rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-white/50" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-xs font-bold">Gimnasio Fit</span>
                  <span className="text-xs font-bold">{formatCurrency(12000)}</span>
                </div>
                <div className="w-full bg-white/20 h-1 mt-1.5 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-[40%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
