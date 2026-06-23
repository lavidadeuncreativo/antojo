"use client";

import { useState } from "react";
import { Megaphone, BarChart3, ArrowUpRight } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("campanas");

  return (
    <div className="max-w-7xl mx-auto space-y-12 select-none text-left">
      {/* Header */}
      <div className="pt-14 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)]">
        <div>
          <span className="label-micro block mb-3">Campañas, ROI y Fidelización</span>
          <h1 className="hero-title">
            ESTRATEGIA <span className="italic-light">marketing.</span>
          </h1>
        </div>
        <button className="btn btn-primary self-start md:self-end">
          <Megaphone size={14} strokeWidth={2.5} /> Nueva Campaña
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)]">
        <button
          onClick={() => setActiveTab("campanas")}
          className={`px-6 py-3 text-[11px] font-bold border-b-2 uppercase tracking-widest transition-all duration-300 ${
            activeTab === "campanas" ? "border-black text-black" : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
          }`}
        >
          Campañas Activas
        </button>
        <button
          onClick={() => setActiveTab("metricas")}
          className={`px-6 py-3 text-[11px] font-bold border-b-2 uppercase tracking-widest transition-all duration-300 ${
            activeTab === "metricas" ? "border-black text-black" : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
          }`}
        >
          Métricas y RRSS
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="section-title border-b border-[var(--color-border)] pb-2">
            Campañas en curso
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
                  <td colSpan={4} style={{ padding: 0, border: 'none' }}>
                    <div className="empty-state border-0 border-b border-[var(--color-border)]">
                      <Megaphone size={32} className="empty-state__icon" strokeWidth={1.5} />
                      <span className="empty-state__label">Sin campañas</span>
                      <p className="empty-state__text">No hay campañas activas registradas.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="section-title border-b border-[var(--color-border)] pb-2">
            Métricas clave
          </h3>

          <div className="card">
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
