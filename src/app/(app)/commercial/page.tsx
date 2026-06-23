"use client";

import { useState } from "react";
import { Users, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function CommercialPage() {
  const [activeTab, setActiveTab] = useState("b2b");

  return (
    <div className="max-w-7xl mx-auto space-y-12 select-none text-left">
      {/* Header */}
      <div className="pt-14 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)]">
        <div>
          <span className="label-micro block mb-3">Gestión B2B, Clientes Corporativos y Eventos</span>
          <h1 className="hero-title">
            ÁREA <span className="italic-light">comercial.</span>
          </h1>
        </div>
        <button className="btn btn-primary self-start md:self-end">
          <Users size={14} strokeWidth={2.5} /> Nuevo Cliente
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

      <div className="editorial-grid editorial-grid-2">
        <div className="editorial-cell">
          <span className="kpi-label">Clientes Activos (B2B)</span>
          <div className="kpi-value tabular-nums">0</div>

          <div className="empty-state mt-8 border-0 p-0 text-left items-start">
            <span className="empty-state__label">Sin clientes B2B registrados</span>
          </div>
        </div>

        <div className="editorial-cell editorial-cell--dark">
          <span className="kpi-label">Pipeline B2B</span>
          <div className="kpi-value tabular-nums">{formatCurrency(0)}</div>
          <span className="text-[13px] font-bold mt-2 block opacity-80 text-white">en negociación</span>

          <div className="empty-state mt-8 border-0 p-0 text-left items-start bg-transparent">
            <span className="empty-state__label opacity-50 text-white">Pipeline vacío</span>
          </div>
        </div>
      </div>
    </div>
  );
}
