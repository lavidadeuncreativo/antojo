"use client";

import { useState } from "react";
import { useGlobalState } from "@/lib/state";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Package,
  Layers,
  Edit2,
  Check,
  Compass
} from "lucide-react";

export function DashboardClient({ data }: { data?: any }) {
  const { products, sales, purchases, monthlyGoal } = useGlobalState();

  // Local state for interactive UI controls
  const [selectedFilter, setSelectedFilter] = useState("Suscripciones");
  const [toggleInsumos, setToggleInsumos] = useState(true);
  const [toggleReserva, setToggleReserva] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("Volumen");

  // Dynamic calculations based on state
  const totalSalesVal = sales.reduce((acc, s) => acc + s.total, 0);
  const totalExpensesVal = purchases.reduce((acc, p) => acc + p.cost, 0);
  
  const estimatedProfitVal = sales.reduce((acc, s) => {
    let saleProfit = 0;
    s.items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      const cost = prod ? prod.cost : item.price * 0.4;
      saleProfit += (item.price - cost) * item.qty;
    });
    return acc + saleProfit;
  }, 0);

  const goalPercent = Math.min(100, Math.round((totalSalesVal / monthlyGoal.goal) * 100));

  // Generate calendar days (1-31)
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="max-w-5xl mx-auto space-y-10 select-none pb-6">
      
      {/* ── Seccion Superior: Titulo, Meta Segmentada y Metricas ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/5">
        
        {/* Titulo & Indicador circular de meta (Clean & Minimalist) */}
        <div className="flex items-center gap-6">
          <div className="text-left space-y-1">
            <h1 className="hero-title">Operación ANTOJO</h1>
            <p className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-widest">
              ERP de Cobros & Bebidas Frías
            </p>
          </div>

          {/* Progreso Circular Segmentado (Sin cajas externas) */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 100 100" className="transform -rotate-[100deg]">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="12"
                  strokeDasharray="251"
                  strokeDashoffset="60"
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="12"
                  strokeDasharray="251"
                  strokeDashoffset={251 - (191 * (goalPercent / 100))}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-bold text-[10px] text-white tabular-nums">{goalPercent}%</span>
              </div>
            </div>
            <div className="text-left leading-none">
              <span className="text-[8px] font-bold uppercase text-[var(--color-text-muted)] tracking-wider block">Meta del Mes</span>
              <span className="text-xs font-bold text-white mt-1 block tabular-nums">
                {formatCurrency(totalSalesVal, { compact: true })}
              </span>
            </div>
          </div>
        </div>

        {/* Cifras de Desempeño Principal (Superíndices) */}
        <div className="flex items-center gap-8 md:gap-12 flex-wrap">
          <div>
            <span className="text-[9px] font-bold uppercase text-[var(--color-text-muted)] tracking-widest block mb-0.5">
              Ventas
            </span>
            <div className="metric-value font-medium text-[var(--color-text-primary)]">
              {formatNumber(totalSalesVal)}
              <span className="currency">$</span>
            </div>
          </div>

          <div>
            <span className="text-[9px] font-bold uppercase text-[var(--color-text-muted)] tracking-widest block mb-0.5">
              Utilidad
            </span>
            <div className="metric-value font-medium text-[var(--color-text-primary)]">
              {formatNumber(estimatedProfitVal)}
              <span className="currency">$</span>
            </div>
          </div>

          <div>
            <span className="text-[9px] font-bold uppercase text-[var(--color-text-muted)] tracking-widest block mb-0.5">
              Egresos / Compras
            </span>
            <div className="metric-value font-medium text-[var(--color-text-primary)]">
              {formatNumber(totalExpensesVal)}
              <span className="currency">$</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filtros Rápidos (Chips) ── */}
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
          title="Nuevo Elemento"
        >
          <span className="text-lg font-bold leading-none">+</span>
        </button>
      </div>

      {/* ── Layout Bento Principal: Ficha Izquierda & Controles Derechos ── */}
      <div className="bento-grid">
        
        {/* COMPONENTE PRINCIPAL (8 columnas): Ficha de Producto y Procesos */}
        <div className="bento-8 card flex flex-col justify-between space-y-6">
          
          {/* Cabecera del Producto (Matcha Latte) */}
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-ink)]">
                <Compass size={16} strokeWidth={2.2} />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-white">Matcha Latte Cream</h3>
                <p className="text-[9px] text-[var(--color-text-muted)] font-semibold">
                  Receta base y cobro recurrente
                </p>
              </div>
            </div>

            {/* Ingredientes representativos (Sin sobreponerse con el texto) */}
            <div className="flex items-center gap-1">
              {["🍵 Matcha", "🥛 Leche Coco", " vasos"].map((label, i) => (
                <span key={i} className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] border border-white/5">
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Línea de Proceso Temporal (Estilo editorial plano) */}
          <div className="relative py-1">
            <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-white/10 -translate-y-1/2" />
            <div className="absolute top-1/2 left-[15%] w-2 h-2 rounded-full bg-white -translate-y-1/2" />
            <div className="absolute top-1/2 left-[50%] w-2 h-2 rounded-full bg-white -translate-y-1/2" />
            <div className="absolute top-1/2 left-[85%] w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] -translate-y-1/2" />
          </div>

          {/* Compartimentos Planos (Sin tarjetas anidadas redundantes) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Panel 1: Calendario plano */}
            <div className="flex flex-col justify-between min-h-[180px] text-left">
              <div>
                <span className="text-[9px] font-bold uppercase text-[var(--color-text-muted)] tracking-wider block mb-2">
                  Días de Entrega
                </span>
                
                <div className="grid grid-cols-7 gap-1 text-center max-w-[150px]">
                  {calendarDays.map((day) => {
                    const isActive = day === 18;
                    return (
                      <span
                        key={day}
                        className={`text-[8px] font-semibold h-3.5 w-3.5 rounded-full flex items-center justify-center leading-none ${
                          isActive
                            ? "bg-[var(--color-accent)] text-[var(--color-ink)] font-bold"
                            : "text-[var(--color-text-secondary)]"
                        }`}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-1">
                <div className="flex justify-between text-[9px]">
                  <span className="text-[var(--color-text-muted)]">Frecuencia:</span>
                  <span className="text-white font-bold">18 / mes</span>
                </div>
              </div>
            </div>

            {/* Panel 2: Selector de Plan */}
            <div className="flex flex-col justify-between min-h-[180px] text-left border-l border-white/5 pl-4">
              <div>
                <span className="text-[9px] font-bold uppercase text-[var(--color-text-muted)] tracking-wider block mb-2">
                  Esquema de Despacho
                </span>

                <div className="flex flex-col gap-1">
                  {["Individual", "Paquete", "Volumen"].map((plan) => {
                    const isSelected = selectedPlan === plan;
                    return (
                      <button
                        key={plan}
                        onClick={() => setSelectedPlan(plan)}
                        className={`text-left px-2 py-1 rounded text-[9px] font-semibold transition-all duration-160 ${
                          isSelected
                            ? "bg-[var(--color-accent)] text-[var(--color-ink)]"
                            : "text-[var(--color-text-secondary)] hover:bg-white/5"
                        }`}
                      >
                        {plan}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <span className="text-xs font-bold text-white">Plan Activo: {selectedPlan}</span>
              </div>
            </div>

            {/* Panel 3: Canal y demanda */}
            <div className="flex flex-col justify-between min-h-[180px] text-left border-l border-white/5 pl-4">
              <div>
                <span className="text-[9px] font-bold uppercase text-[var(--color-text-muted)] tracking-wider block mb-2">
                  Canales y Demanda
                </span>

                {/* Gráfico de barras minimalista sin gridlines */}
                <div className="flex items-end justify-around h-20 pb-1">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-3.5 h-12 bg-white/10 rounded-t" title="Calle: 60%" />
                    <span className="text-[7px] text-[var(--color-text-muted)] font-semibold">Calle</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-3.5 h-16 bg-[var(--color-accent)] rounded-t" title="Insta: 85%" />
                    <span className="text-[7px] text-[var(--color-accent)] font-bold">Inst</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-3.5 h-8 bg-white/20 rounded-t" title="Mayoreo: 40%" />
                    <span className="text-[7px] text-[var(--color-text-muted)] font-semibold">Mayo</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 text-[9px] text-[var(--color-text-muted)]">
                Instagram lidera el periodo
              </div>
            </div>

          </div>

          {/* Fila de metadatos al pie */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/5 pt-4">
            <div className="text-left">
              <span className="text-[9px] text-[var(--color-text-muted)] uppercase block">Lotes Mensuales</span>
              <span className="text-xs font-bold text-white tabular-nums">18 lotes</span>
            </div>
            <div className="text-left">
              <span className="text-[9px] text-[var(--color-text-muted)] uppercase block">Uds Estimadas</span>
              <span className="text-xs font-bold text-white tabular-nums">90 botellas</span>
            </div>
            <div className="text-left">
              <span className="text-[9px] text-[var(--color-text-muted)] uppercase block">Costo Lote</span>
              <span className="text-xs font-bold text-white tabular-nums">375 MXN</span>
            </div>
            <div className="text-left">
              <span className="text-[9px] text-[var(--color-text-muted)] uppercase block">Método de Pago</span>
              <span className="text-xs font-bold text-white">Wise Transfer</span>
            </div>
          </div>

        </div>

        {/* CONTROLES DERECHOS (4 columnas): Tarjetas minimalistas con toggles */}
        <div className="bento-4 flex flex-col gap-4">
          
          {/* Tarjeta 1: Límite Operativo (Dark Glass) */}
          <div className="surface-card flex flex-col justify-between p-5 min-h-[145px]">
            <div className="flex items-center justify-between text-left">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white">
                  <Package size={13} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Límite Diario</h4>
                  <p className="text-[8px] text-[var(--color-text-muted)] font-medium">Tope de insumos</p>
                </div>
              </div>
              <button className="w-6 h-6 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-white transition-all duration-160">
                <Edit2 size={10} />
              </button>
            </div>

            <div className="flex items-end justify-between mt-3">
              <div className="metric-value font-medium text-2xl leading-none text-left">
                200<span className="text-xs currency">$</span>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => setToggleInsumos(!toggleInsumos)}
                className={`w-12 h-7 rounded-full p-0.5 transition-all duration-200 border ${
                  toggleInsumos
                    ? "bg-white/15 border-white/20"
                    : "bg-black/20 border-white/5"
                } flex items-center justify-between`}
              >
                <span className={`text-[7px] font-bold ml-1 ${toggleInsumos ? "opacity-0" : "text-white/60"}`}>x</span>
                <span
                  className={`w-5.5 h-5.5 rounded-full bg-white flex items-center justify-center text-[8px] font-bold text-black transition-all duration-200 transform ${
                    toggleInsumos ? "translate-x-5" : "translate-x-0"
                  }`}
                >
                  {toggleInsumos ? <Check size={8} strokeWidth={3.5} /> : ""}
                </span>
              </button>
            </div>
          </div>

          {/* Tarjeta 2: Fondo Reserva (Ivory sólido de acento) */}
          <div className="surface-card-accent flex flex-col justify-between p-5 min-h-[145px]">
            <div className="flex items-center justify-between text-left">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[var(--color-ink)]/5 flex items-center justify-center text-[var(--color-ink)]">
                  <Layers size={13} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--color-ink)]">Caja Chica</h4>
                  <p className="text-[8px] text-[var(--color-ink)]/70 font-medium">Fondo de emergencia</p>
                </div>
              </div>
              <button className="w-6 h-6 flex items-center justify-center rounded-full bg-black/5 border border-black/10 hover:border-black/20 text-[var(--color-ink)] transition-all duration-160">
                <Edit2 size={10} />
              </button>
            </div>

            <div className="flex items-end justify-between mt-3">
              <div className="metric-value font-medium text-2xl leading-none text-left text-[var(--color-ink)]">
                2,999<span className="text-xs currency text-[var(--color-ink)]">$</span>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => setToggleReserva(!toggleReserva)}
                className={`w-12 h-7 rounded-full p-0.5 transition-all duration-200 border ${
                  toggleReserva
                    ? "bg-[var(--color-ink)] border-[var(--color-ink)]"
                    : "bg-transparent border-[var(--color-ink)]/20"
                } flex items-center justify-between`}
              >
                <span className={`text-[7px] font-bold ml-1 ${toggleReserva ? "opacity-0" : "text-[var(--color-ink)]/60"}`}>x</span>
                <span
                  className={`w-5.5 h-5.5 rounded-full bg-white flex items-center justify-center text-[8px] font-bold text-black transition-all duration-200 transform ${
                    toggleReserva ? "translate-x-5" : "translate-x-0"
                  }`}
                >
                  {toggleReserva ? <Check size={8} strokeWidth={3.5} /> : ""}
                </span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Footer Indicadores (Matches mockup bottom indicator) */}
      <div className="flex justify-center gap-1.5 pt-4">
        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <span className="w-4 h-1.5 rounded bg-white/70" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
      </div>

    </div>
  );
}
