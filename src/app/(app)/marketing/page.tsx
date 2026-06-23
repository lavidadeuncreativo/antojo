"use client";

import { useState } from "react";
import { Megaphone, BarChart3, ArrowUpRight } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("campanas");

  return (
    <div className="max-w-7xl mx-auto space-y-12 select-none text-left">
      {/* Header */}
      <div className="py-6 border-b border-[var(--color-border)] flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black uppercase">
            ESTRATEGIA <span className="font-light italic text-[var(--color-text-secondary)]">marketing.</span>
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-semibold uppercase tracking-wider">
            Campañas, ROI y Fidelización
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-[var(--color-border)] pb-2">
        <button
          onClick={() => setActiveTab("campanas")}
          className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
            activeTab === "campanas" ? "border-black text-black" : "border-transparent text-black/50 hover:text-black"
          }`}
        >
          Campañas Activas
        </button>
        <button
          onClick={() => setActiveTab("metricas")}
          className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
            activeTab === "metricas" ? "border-black text-black" : "border-transparent text-black/50 hover:text-black"
          }`}
        >
          Métricas y RRSS
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-black border-b border-[var(--color-border)] pb-2">
            Campañas <span className="font-light italic text-[var(--color-text-secondary)]">en curso.</span>
          </h3>
          
          <div className="table-container border border-[var(--color-border)]">
            <table className="antojo-table">
              <thead>
                <tr>
                  <th>Campaña</th>
                  <th>Plataforma</th>
                  <th className="text-right">Presupuesto</th>
                  <th className="text-right">ROI Estimado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center py-12 text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">
                    No hay campañas activas
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-black border-b border-[var(--color-border)] pb-2">
            Métricas <span className="font-light italic text-[var(--color-text-secondary)]">clave.</span>
          </h3>

          <div className="border border-[var(--color-border)] p-6 bg-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center">
                <Megaphone size={16} className="text-black" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">Costo Adquisición (CAC)</div>
                <div className="text-xl font-black text-black">{formatCurrency(0)}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center">
                <BarChart3 size={16} className="text-black" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">Valor Vida Cliente (LTV)</div>
                <div className="text-xl font-black text-black">{formatCurrency(0)}</div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-2">Crecimiento RRSS</div>
              <div className="flex justify-between items-end">
                <span className="text-2xl font-black">0</span>
                <span className="text-[10px] text-[var(--color-text-secondary)] font-bold flex items-center gap-1">Sin datos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
