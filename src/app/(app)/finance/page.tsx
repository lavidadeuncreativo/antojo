"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, ArrowUpRight, ArrowDownRight, Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState("resumen");

  const financialData = [
    { mes: "Ene", ingresos: 45000, egresos: 28000 },
    { mes: "Feb", ingresos: 52000, egresos: 30000 },
    { mes: "Mar", ingresos: 48000, egresos: 32000 },
    { mes: "Abr", ingresos: 61000, egresos: 34000 },
    { mes: "May", ingresos: 59000, egresos: 31000 },
    { mes: "Jun", ingresos: 75000, egresos: 38000 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 select-none text-left">
      {/* Header */}
      <div className="pt-14 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)]">
        <div>
          <span className="label-micro block mb-3">Control de Caja y Utilidad</span>
          <h1 className="hero-title">
            ESTADOS <span className="italic-light">financieros.</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary flex items-center gap-2">
            <Download size={14} strokeWidth={2.5} /> Exportar
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)]">
        <button
          onClick={() => setActiveTab("resumen")}
          className={`px-6 py-3 text-[11px] font-bold border-b-2 uppercase tracking-widest transition-all duration-300 ${
            activeTab === "resumen" ? "border-black text-black" : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
          }`}
        >
          Resumen Anual
        </button>
        <button
          onClick={() => setActiveTab("flujo")}
          className={`px-6 py-3 text-[11px] font-bold border-b-2 uppercase tracking-widest transition-all duration-300 ${
            activeTab === "flujo" ? "border-black text-black" : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
          }`}
        >
          Flujo de Caja
        </button>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Metric Grid — Swiss editorial */}
        <div className="editorial-grid editorial-grid-3">
          <div className="editorial-cell">
            <span className="kpi-label">Ingresos Totales (YTD)</span>
            <div className="kpi-value tabular-nums">{formatCurrency(340000)}</div>
            <span className="text-[12px] font-extrabold text-[var(--color-success)] mt-4 flex items-center gap-1">
              <ArrowUpRight size={14} strokeWidth={2.5} /> +12% vs año anterior
            </span>
          </div>

          <div className="editorial-cell">
            <span className="kpi-label">Egresos Totales (YTD)</span>
            <div className="kpi-value tabular-nums">{formatCurrency(193000)}</div>
            <span className="text-[12px] font-extrabold text-[var(--color-error)] mt-4 flex items-center gap-1">
              <ArrowDownRight size={14} strokeWidth={2.5} /> +5% vs año anterior
            </span>
          </div>

          <div className="editorial-cell editorial-cell--dark">
            <span className="kpi-label">Utilidad Bruta</span>
            <div className="kpi-value tabular-nums">{formatCurrency(147000)}</div>
            <span className="text-[12px] font-extrabold text-white mt-4 flex items-center gap-1 opacity-80">
              <ArrowUpRight size={14} strokeWidth={2.5} /> 43.2% Margen
            </span>
          </div>
        </div>

        <div className="card">
          <h3 className="section-title">
            Evolución de Ingresos vs Egresos
          </h3>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" strokeOpacity={0.5} />
                <XAxis 
                  dataKey="mes" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "var(--color-text-muted)", fontWeight: "600", letterSpacing: "0.05em" }} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "var(--color-text-muted)", fontWeight: "600" }}
                  tickFormatter={(value) => `$${value/1000}k`}
                  dx={-10}
                />
                <Tooltip 
                  cursor={{fill: 'var(--color-surface-hover)'}}
                  contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card-hover)', fontSize: '12px', fontWeight: 'bold', padding: '12px' }}
                />
                <Bar dataKey="ingresos" fill="#000000" radius={[4, 4, 0, 0]} barSize={24} animationDuration={1000} />
                <Bar dataKey="egresos" fill="#d4d4d4" radius={[4, 4, 0, 0]} barSize={24} animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
