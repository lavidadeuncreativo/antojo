"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Package,
  Calendar,
  Compass,
  ArrowUpRight,
  Edit2,
  Check,
  ChevronRight,
  TrendingDown,
  Layers,
  Sparkles
} from "lucide-react";
import { formatCurrency, formatNumber, percentChange } from "@/lib/utils";
import { DashboardData } from "@/types/dashboard";
import { demoDashboardData } from "@/lib/demo-data";

interface DashboardClientProps {
  data?: DashboardData;
}

export function DashboardClient({ data = demoDashboardData }: DashboardClientProps) {
  const resolvedData = data || demoDashboardData;
  const { kpis, recentSales, topProducts } = resolvedData;

  // Local state for interactive UI controls
  const [selectedFilter, setSelectedFilter] = useState("Suscripciones");
  const [toggleInsumos, setToggleInsumos] = useState(true);
  const [toggleReserva, setToggleReserva] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("Volumen");

  // Format financial KPI data dynamically
  const totalSalesVal = kpis.totalSales.current;
  const estimatedProfitVal = kpis.estimatedProfit.current;
  const expensesVal = kpis.expenses.current;

  // Format numbers for layout
  const formattedSales = formatNumber(totalSalesVal);
  const formattedProfit = formatNumber(estimatedProfitVal);
  const formattedExpenses = formatNumber(expensesVal);

  // Math for progress ring: Goal completion
  const goalPercent = Math.round((resolvedData.monthlyGoal.current / resolvedData.monthlyGoal.goal) * 100);

  // Generate calendar days (1-31)
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="max-w-6xl mx-auto space-y-8 select-none">
      {/* ── Top Section: Title & Progress Ring & 3 Major Metrics ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-6 border-b border-white/5">
        
        {/* Left Side: Title & Circular Goal Progress (Segmented Arc Mockup) */}
        <div className="flex items-center gap-6">
          <div className="space-y-1">
            <h1 className="hero-title">Operación ANTOJO</h1>
            <p className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
              Centro de Cobros & Rendimiento Comercial
            </p>
          </div>

          {/* Segmented Progress Ring (Matches progress-ring from mockup) */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-2 rounded-2xl">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg width="56" height="56" viewBox="0 0 100 100" className="transform -rotate-[100deg]">
                {/* Underlay segment */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="11"
                  strokeDasharray="251"
                  strokeDashoffset="60"
                  strokeLinecap="round"
                />
                {/* Progress arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="11"
                  strokeDasharray="251"
                  strokeDashoffset={251 - (251 * 0.75 * (goalPercent / 100))}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-bold text-xs text-white tabular-nums">{goalPercent}%</span>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-bold uppercase text-[var(--color-text-muted)] tracking-wider leading-none">Meta Mes</span>
              <span className="text-xs font-bold text-white mt-1 tabular-nums">
                {formatCurrency(resolvedData.monthlyGoal.current, { compact: true })}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Three Large Financial Numbers (Matches metrics block from mockup) */}
        <div className="flex items-center gap-10 lg:gap-14 flex-wrap">
          {/* Metric 1 */}
          <div>
            <span className="text-[10px] font-bold uppercase text-[var(--color-text-muted)] tracking-widest block mb-1">
              Ventas del Periodo
            </span>
            <div className="metric-value font-medium text-[var(--color-text-primary)]">
              {formattedSales}
              <span className="currency">$</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div>
            <span className="text-[10px] font-bold uppercase text-[var(--color-text-muted)] tracking-widest block mb-1">
              Utilidad Estimada
            </span>
            <div className="metric-value font-medium text-[var(--color-text-primary)]">
              {formattedProfit}
              <span className="currency">$</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div>
            <span className="text-[10px] font-bold uppercase text-[var(--color-text-muted)] tracking-widest block mb-1">
              Gastos Totales
            </span>
            <div className="metric-value font-medium text-[var(--color-text-primary)]">
              {formattedExpenses}
              <span className="currency">$</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter Capsule Chips (Matches chips & filters block from mockup) ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {["Todos", "Ventas", "Gastos", "Suscripciones", "Producción", "Compras"].map((filter) => {
          const isSelected = selectedFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`chip transition-all duration-160 ${
                isSelected ? "chip--selected" : ""
              }`}
            >
              {filter}
            </button>
          );
        })}
        <button 
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-ink)] hover:bg-[var(--color-accent-hover)] active:scale-95 transition-all duration-160"
          title="Agregar Filtro"
        >
          <span className="text-lg font-bold leading-none">+</span>
        </button>
      </div>

      {/* ── Bento Grid: Main Transaction Block & Right Info Columns ── */}
      <div className="bento-grid">
        
        {/* LEFT COMPONENT: Large Operation Card (8 columns) */}
        <div className="bento-8 bento-xl-span-12 card flex flex-col justify-between space-y-8">
          
          {/* Card Header (Matches Matcha latte info header) */}
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-ink)]">
                <Compass size={18} strokeWidth={2} />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-white">Matcha Latte Cream</h3>
                <p className="text-[10px] text-[var(--color-text-muted)] font-medium">
                  Producto Estrella de Suscripción recurrente
                </p>
              </div>
            </div>

            {/* Overlapping User Avatars (Matches mockup) */}
            <div className="flex items-center -space-x-2">
              {["☕", "🥛", "🍯", "🍵", "🧊"].map((emoji, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-[2px] border-[#3C3A39] bg-[var(--color-surface-dark)] flex items-center justify-center text-xs select-none shadow-md"
                >
                  {emoji}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-[2px] border-[#3C3A39] bg-[var(--color-accent)] text-[var(--color-ink)] flex items-center justify-center text-xs font-bold shadow-md cursor-pointer">
                +
              </div>
            </div>
          </div>

          {/* Timeline Process Line (Matches timeline nodes from mockup) */}
          <div className="relative py-2 select-none">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2" />
            <div className="absolute top-1/2 left-[15%] w-2 h-2 rounded-full bg-white -translate-y-1/2" />
            <div className="absolute top-1/2 left-[50%] w-2.5 h-2.5 rounded-full bg-white -translate-y-1/2 border border-black/40" />
            <div className="absolute top-1/2 left-[85%] w-3 h-3 rounded-full bg-[var(--color-accent)] -translate-y-1/2 border border-black/20 flex items-center justify-center" />
          </div>

          {/* Grid of Subcards (Matches the 3 internal subpanels of mockup card) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Subcard 1: Delivery calendar */}
            <div className="surface-card-dark flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-[9px] font-bold uppercase text-[var(--color-text-muted)] tracking-wider block mb-2 text-left">
                  Calendario de Cobros
                </span>
                
                {/* 7x5 Day Grid */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {calendarDays.map((day) => {
                    const isActive = day === 18; // Highlights day 18 like mockup
                    return (
                      <span
                        key={day}
                        className={`text-[9px] font-medium h-4 w-4 rounded-full flex items-center justify-center leading-none ${
                          isActive
                            ? "bg-[var(--color-accent)] text-[var(--color-ink)] font-bold"
                            : "text-[var(--color-text-secondary)] hover:bg-white/5 cursor-pointer"
                        }`}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Subcard Metrics footer */}
              <div className="border-t border-white/5 pt-2 mt-2 space-y-1 text-left">
                <div className="flex justify-between text-[10px]">
                  <span className="text-[var(--color-text-muted)]">Frecuencia:</span>
                  <span className="text-white font-bold">18 / mes</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-[var(--color-text-muted)]">Confirmados:</span>
                  <span className="text-white font-bold">5</span>
                </div>
              </div>
            </div>

            {/* Subcard 2: Plan selector */}
            <div className="surface-card-dark flex flex-col justify-between min-h-[220px] text-left">
              <div>
                <span className="text-[9px] font-bold uppercase text-[var(--color-text-muted)] tracking-wider block mb-3">
                  Plan de Despacho
                </span>

                {/* Subcard Plan pills */}
                <div className="flex flex-col gap-1.5">
                  {["Individual", "Paquete", "Volumen"].map((plan) => {
                    const isSelected = selectedPlan === plan;
                    return (
                      <button
                        key={plan}
                        onClick={() => setSelectedPlan(plan)}
                        className={`text-left px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-160 ${
                          isSelected
                            ? "bg-[var(--color-accent)] text-[var(--color-ink)]"
                            : "border border-white/10 text-[var(--color-text-secondary)] hover:bg-white/5"
                        }`}
                      >
                        {plan}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-white/5 pt-2">
                <div className="metric-value font-medium text-lg leading-none">
                  75<span className="text-[10px] currency">$</span>
                  <span className="text-[9px] text-[var(--color-text-muted)] font-normal ml-1">/ lote</span>
                </div>
              </div>
            </div>

            {/* Subcard 3: Vertical bar chart */}
            <div className="surface-card-dark flex flex-col justify-between min-h-[220px] text-left">
              <div>
                <span className="text-[9px] font-bold uppercase text-[var(--color-text-muted)] tracking-wider block mb-4">
                  Canales de Venta
                </span>

                {/* Rounded vertical bars (Direct, Event, Delivery) */}
                <div className="flex items-end justify-around h-24 pb-2 relative">
                  {/* Bar 1: Direct */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-4 h-16 bg-white/10 rounded-t-lg transition-all duration-300 hover:bg-white/20 cursor-pointer" title="Directo: 60%" />
                    <span className="text-[8px] text-[var(--color-text-muted)] font-semibold">Dir</span>
                  </div>
                  {/* Bar 2: Event */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-4 h-24 bg-[var(--color-accent)] rounded-t-lg transition-all duration-300 hover:bg-[var(--color-accent-hover)] cursor-pointer" title="Eventos: 100%" />
                    <span className="text-[8px] text-[var(--color-accent)] font-bold">Eve</span>
                  </div>
                  {/* Bar 3: Delivery */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-4.5 h-12 bg-white/30 rounded-t-lg transition-all duration-300 hover:bg-white/40 cursor-pointer" title="Delivery: 45%" />
                    <span className="text-[8px] text-[var(--color-text-muted)] font-semibold">Del</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-2 text-center text-[10px] text-[var(--color-text-muted)]">
                Proporción de demanda semanal
              </div>
            </div>

          </div>

          {/* Bottom stats row (Summarizes key metrics at the foot) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/5 pt-4">
            <div className="text-left">
              <span className="text-[9px] text-[var(--color-text-muted)] uppercase block">Detalles Cobro</span>
              <span className="text-sm font-bold text-white tabular-nums">18 <span className="text-[10px] font-normal text-[var(--color-text-muted)]">/ mes</span></span>
            </div>
            <div className="text-left">
              <span className="text-[9px] text-[var(--color-text-muted)] uppercase block">Lotes Creados</span>
              <span className="text-sm font-bold text-white tabular-nums">5 🥛</span>
            </div>
            <div className="text-left">
              <span className="text-[9px] text-[var(--color-text-muted)] uppercase block">Monto Lote</span>
              <span className="text-sm font-bold text-white tabular-nums">375$</span>
            </div>
            <div className="text-left">
              <span className="text-[9px] text-[var(--color-text-muted)] uppercase block">Método Activo</span>
              <span className="text-sm font-bold text-white">Wise</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN COMPONENT: Toggles & Stats (4 columns) */}
        <div className="bento-4 bento-xl-span-12 flex flex-col gap-4">
          
          {/* Card 1: Insuficientes / Límite Insumos (Dark glass theme) */}
          <div className="surface-card flex flex-col justify-between p-6 min-h-[175px]">
            <div className="flex items-center justify-between text-left">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white">
                  <Package size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Límite Insumos</h4>
                  <p className="text-[9px] text-[var(--color-text-muted)] font-medium">Tope operativo diario</p>
                </div>
              </div>
              
              {/* Edit button */}
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-white transition-all duration-160">
                <Edit2 size={11} />
              </button>
            </div>

            <div className="flex items-end justify-between mt-4">
              <div className="metric-value font-medium text-3xl leading-none text-left">
                200<span className="text-sm currency">$</span>
              </div>

              {/* Interactive Glass Toggle Switch */}
              <button
                onClick={() => setToggleInsumos(!toggleInsumos)}
                className={`w-14 h-8 rounded-full p-1 transition-all duration-200 border ${
                  toggleInsumos
                    ? "bg-white/15 border-white/20"
                    : "bg-black/20 border-white/5"
                } flex items-center justify-between`}
              >
                <span className={`text-[8px] font-bold ml-1.5 ${toggleInsumos ? "opacity-0" : "text-white/60"}`}>x</span>
                <span
                  className={`w-6 h-6 rounded-full bg-white flex items-center justify-center text-[8px] font-bold text-black transition-all duration-200 transform ${
                    toggleInsumos ? "translate-x-5" : "translate-x-0"
                  }`}
                >
                  {toggleInsumos ? <Check size={10} strokeWidth={3} /> : ""}
                </span>
              </button>
            </div>
          </div>

          {/* Card 2: Fondo Reserva / Caja Chica (Ivory solid accent theme) */}
          <div className="surface-card-accent flex flex-col justify-between p-6 min-h-[175px]">
            <div className="flex items-center justify-between text-left">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--color-ink)]/5 flex items-center justify-center text-[var(--color-ink)]">
                  <Layers size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--color-ink)]">Fondo Reserva</h4>
                  <p className="text-[9px] text-[var(--color-ink)]/70 font-medium">Resguardo para contingencia</p>
                </div>
              </div>

              {/* Edit button */}
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-black/5 border border-black/10 hover:border-black/20 text-[var(--color-ink)] transition-all duration-160">
                <Edit2 size={11} />
              </button>
            </div>

            <div className="flex items-end justify-between mt-4">
              <div className="metric-value font-medium text-3xl leading-none text-left text-[var(--color-ink)]">
                2,999<span className="text-sm currency text-[var(--color-ink)]">$</span>
              </div>

              {/* Interactive Black Toggle Switch */}
              <button
                onClick={() => setToggleReserva(!toggleReserva)}
                className={`w-14 h-8 rounded-full p-1 transition-all duration-200 border ${
                  toggleReserva
                    ? "bg-[var(--color-ink)] border-[var(--color-ink)]"
                    : "bg-transparent border-[var(--color-ink)]/20"
                } flex items-center justify-between`}
              >
                <span className={`text-[8px] font-bold ml-1.5 ${toggleReserva ? "opacity-0" : "text-[var(--color-ink)]/60"}`}>x</span>
                <span
                  className={`w-6 h-6 rounded-full bg-white flex items-center justify-center text-[8px] font-bold text-black transition-all duration-200 transform ${
                    toggleReserva ? "translate-x-5" : "translate-x-0"
                  }`}
                >
                  {toggleReserva ? <Check size={10} strokeWidth={3} /> : ""}
                </span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ── Auxiliary Grid: Recent History & Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Transactions List */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Historial de Ventas</h3>
            <span className="text-[10px] text-[var(--color-text-muted)] font-medium">Recientes</span>
          </div>

          <div className="divide-y divide-white/5">
            {recentSales.slice(0, 4).map((sale) => (
              <div key={sale.folio} className="flex items-center justify-between py-3 gap-4">
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white">{sale.customer}</h4>
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                    {sale.folio} • <span className="editorial text-[var(--color-accent)]">{sale.channel}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-white tabular-nums">
                    {formatCurrency(sale.total)}
                  </span>
                  <p className="text-[9px] text-[var(--color-text-muted)] mt-0.5">{sale.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top selling beverage products catalog summary */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Bebidas Populares</h3>
            <span className="text-[10px] text-[var(--color-text-muted)] font-medium">Rentabilidad</span>
          </div>

          <div className="divide-y divide-white/5">
            {topProducts.slice(0, 4).map((p, i) => (
              <div key={p.name} className="flex items-center justify-between py-3 gap-4">
                <div className="flex items-center gap-3">
                  <span className="editorial text-xs text-[var(--color-accent)] font-medium">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-bold text-white">{p.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-[var(--color-text-muted)]">{p.units} uds</span>
                  <span className="text-[10px] font-bold text-[var(--color-success)] bg-[var(--color-success-bg)] px-2 py-0.5 rounded">
                    {p.margin}% marg.
                  </span>
                  <span className="text-xs font-bold text-white min-w-[50px] text-right tabular-nums">
                    {formatCurrency(p.revenue, { compact: true })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
