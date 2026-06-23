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
      <div className="pt-8 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)]">
        <div>
          <p className="text-[10px] text-[var(--color-text-secondary)] mb-2 font-bold uppercase tracking-[0.2em]">
            Control de Caja y Utilidad
          </p>
          <h1 className="hero-title">
            ESTADOS <span className="font-light italic text-[var(--color-text-secondary)] tracking-normal">financieros.</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary flex items-center gap-2">
            <Download size={14} /> Exportar
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
        {/* Metric Grid — Swiss editorial 1px dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--color-border)] bg-[var(--color-border)] gap-[1px]">
          <div className="bg-white p-8 relative overflow-hidden group transition-all duration-300 hover:bg-[var(--color-surface)]">
            <DollarSign size={20} className="absolute top-6 right-6 text-[var(--color-border)] group-hover:text-[var(--color-text-muted)] transition-colors" />
            <span className="kpi-label">Ingresos Totales (YTD)</span>
            <div className="kpi-value tabular-nums">{formatCurrency(340000)}</div>
            <span className="text-[10px] text-[var(--color-success)] font-bold mt-3 flex items-center gap-1">
              <ArrowUpRight size={12} /> +12% vs año anterior
            </span>
          </div>

          <div className="bg-white p-8 relative overflow-hidden group transition-all duration-300 hover:bg-[var(--color-surface)]">
            <ArrowDownRight size={20} className="absolute top-6 right-6 text-[var(--color-border)] group-hover:text-[var(--color-text-muted)] transition-colors" />
            <span className="kpi-label">Egresos Totales (YTD)</span>
            <div className="kpi-value tabular-nums">{formatCurrency(193000)}</div>
            <span className="text-[10px] text-[var(--color-error)] font-bold mt-3 flex items-center gap-1">
              <ArrowDownRight size={12} /> +5% vs año anterior
            </span>
          </div>

          <div className="bg-black p-8 relative overflow-hidden">
            <span className="kpi-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Utilidad Bruta</span>
            <div className="kpi-value tabular-nums" style={{ color: '#fff' }}>{formatCurrency(147000)}</div>
            <span className="text-[10px] text-white/80 font-bold mt-3 flex items-center gap-1">
              <ArrowUpRight size={12} /> 43.2% Margen
            </span>
          </div>
        </div>

        <div className="border border-[var(--color-border)] p-8 bg-white rounded-xl shadow-sm">
          <h3 className="text-[10px] font-extrabold tracking-widest text-[var(--color-text-secondary)] uppercase block mb-8">
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
