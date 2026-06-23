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
      <div className="py-6 border-b border-[var(--color-border)] flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black uppercase">
            ESTADOS <span className="font-light italic text-[var(--color-text-secondary)]">financieros.</span>
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-semibold uppercase tracking-wider">
            Control de Caja y Utilidad
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary flex items-center gap-2">
            <Download size={14} /> Exportar
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-[var(--color-border)] pb-2">
        <button
          onClick={() => setActiveTab("resumen")}
          className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
            activeTab === "resumen" ? "border-black text-black" : "border-transparent text-black/50 hover:text-black"
          }`}
        >
          Resumen Anual
        </button>
        <button
          onClick={() => setActiveTab("flujo")}
          className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
            activeTab === "flujo" ? "border-black text-black" : "border-transparent text-black/50 hover:text-black"
          }`}
        >
          Flujo de Caja
        </button>
      </div>

      {/* Content */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-[var(--color-border)] bg-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-[var(--color-text-muted)] group-hover:text-black transition-colors">
              <DollarSign size={24} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] block mb-1">
              Ingresos Totales (YTD)
            </span>
            <div className="text-3xl font-black text-black tracking-tighter">
              {formatCurrency(340000)}
            </div>
            <span className="text-[10px] text-green-700 font-bold mt-2 flex items-center gap-1">
              <ArrowUpRight size={12} /> +12% vs año anterior
            </span>
          </div>

          <div className="p-6 border border-[var(--color-border)] bg-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-[var(--color-text-muted)] group-hover:text-black transition-colors">
              <ArrowDownRight size={24} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] block mb-1">
              Egresos Totales (YTD)
            </span>
            <div className="text-3xl font-black text-black tracking-tighter">
              {formatCurrency(193000)}
            </div>
            <span className="text-[10px] text-red-600 font-bold mt-2 flex items-center gap-1">
              <ArrowDownRight size={12} /> +5% vs año anterior
            </span>
          </div>

          <div className="p-6 border border-black bg-black relative overflow-hidden">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 block mb-1">
              Utilidad Bruta
            </span>
            <div className="text-3xl font-black text-white tracking-tighter">
              {formatCurrency(147000)}
            </div>
            <span className="text-[10px] text-white/90 font-bold mt-2 flex items-center gap-1">
              <ArrowUpRight size={12} /> 43.2% Margen
            </span>
          </div>
        </div>

        <div className="border border-[var(--color-border)] p-6 bg-white">
          <h3 className="text-[10px] font-extrabold tracking-widest text-[var(--color-text-secondary)] uppercase block mb-6">
            Evolución de Ingresos vs Egresos
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis 
                  dataKey="mes" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "var(--color-text-secondary)", fontWeight: "bold" }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "var(--color-text-secondary)", fontWeight: "bold" }}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  cursor={{fill: 'var(--color-surface)'}}
                  contentStyle={{ borderRadius: '0', border: '1px solid var(--color-border)', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="ingresos" fill="#000000" radius={[2, 2, 0, 0]} barSize={30} />
                <Bar dataKey="egresos" fill="#999999" radius={[2, 2, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
