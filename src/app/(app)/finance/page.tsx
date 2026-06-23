"use client";

import { useGlobalState } from "@/lib/state";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function FinanzasPage() {
  const { sales, purchases } = useGlobalState();

  const totalSalesVal = sales.reduce((acc, s) => acc + s.total, 0);
  const totalExpensesVal = purchases.reduce((acc, p) => acc + p.cost, 0);
  const netBalance = totalSalesVal - totalExpensesVal;

  return (
    <div className="space-y-6 text-left select-none">
      
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <h2 className="text-xl font-bold text-white">Estado Financiero</h2>
        <p className="text-xs text-[var(--color-text-muted)] mt-1">
          Supervisa el flujo de caja operativo, ingresos por venta y egresos por compras.
        </p>
      </div>

      {/* Cashflow Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Income */}
        <div className="card p-6 flex flex-col justify-between min-h-[140px]">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                Ingresos Totales
              </span>
              <div className="w-7 h-7 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center">
                <TrendingUp size={14} />
              </div>
            </div>
            <h3 className="text-sm font-bold text-[var(--color-text-secondary)] mt-1">Facturación de Ventas</h3>
          </div>

          <div className="pt-3 border-t border-white/5 mt-3">
            <span className="text-3xl font-bold text-white tabular-nums">
              {formatCurrency(totalSalesVal)}
            </span>
          </div>
        </div>

        {/* Card 2: Total Expenses */}
        <div className="card p-6 flex flex-col justify-between min-h-[140px]">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                Egresos de Caja
              </span>
              <div className="w-7 h-7 rounded-full bg-[var(--color-error-bg)] text-[var(--color-error)] flex items-center justify-center">
                <TrendingDown size={14} />
              </div>
            </div>
            <h3 className="text-sm font-bold text-[var(--color-text-secondary)] mt-1">Compras y Materia Prima</h3>
          </div>

          <div className="pt-3 border-t border-white/5 mt-3">
            <span className="text-3xl font-bold text-white tabular-nums">
              {formatCurrency(totalExpensesVal)}
            </span>
          </div>
        </div>

        {/* Card 3: Net Balance (Ivory Card if positive, or highlight) */}
        <div className={`${netBalance >= 0 ? "surface-card-accent" : "card"} p-6 flex flex-col justify-between min-h-[140px]`}>
          <div>
            <div className="flex items-center justify-between">
              <span className={`text-[9px] font-bold uppercase tracking-wider ${netBalance >= 0 ? "text-[var(--color-ink)]/70" : "text-[var(--color-text-muted)]"}`}>
                Flujo Neto
              </span>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${netBalance >= 0 ? "bg-[var(--color-ink)]/10 text-[var(--color-ink)]" : "bg-white/5 text-white"}`}>
                <DollarSign size={14} />
              </div>
            </div>
            <h3 className={`text-sm font-bold mt-1 ${netBalance >= 0 ? "text-[var(--color-ink)]/80" : "text-[var(--color-text-secondary)]"}`}>Caja Neta del Negocio</h3>
          </div>

          <div className={`pt-3 border-t mt-3 ${netBalance >= 0 ? "border-[var(--color-ink)]/10" : "border-white/5"}`}>
            <span className={`text-3xl font-bold tabular-nums ${netBalance >= 0 ? "text-[var(--color-ink)]" : "text-white"}`}>
              {formatCurrency(netBalance)}
            </span>
          </div>
        </div>

      </div>

      {/* Ledger transactions list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Income entries */}
        <div className="card space-y-4">
          <div className="pb-2 border-b border-white/5 text-left">
            <h4 className="text-xs font-bold uppercase text-[var(--color-success)] tracking-wider">
              Flujo de Entrada (Ventas)
            </h4>
          </div>
          <div className="divide-y divide-white/5">
            {sales.map((s) => (
              <div key={s.id} className="flex justify-between py-2 text-xs">
                <div>
                  <span className="font-bold text-white">{s.customer}</span>
                  <span className="text-[9px] text-[var(--color-text-muted)] block">{s.folio} • {s.channel}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[var(--color-success)] tabular-nums">+{formatCurrency(s.total)}</span>
                  <span className="text-[9px] text-[var(--color-text-muted)] block">{s.time}</span>
                </div>
              </div>
            ))}
            {sales.length === 0 && (
              <p className="text-xs text-[var(--color-text-muted)] py-4 text-center">No hay ingresos registrados.</p>
            )}
          </div>
        </div>

        {/* Expense entries */}
        <div className="card space-y-4">
          <div className="pb-2 border-b border-white/5 text-left">
            <h4 className="text-xs font-bold uppercase text-[var(--color-error)] tracking-wider">
              Flujo de Salida (Egresos)
            </h4>
          </div>
          <div className="divide-y divide-white/5">
            {purchases.map((p) => (
              <div key={p.id} className="flex justify-between py-2 text-xs">
                <div>
                  <span className="font-bold text-white">{p.itemName}</span>
                  <span className="text-[9px] text-[var(--color-text-muted)] block">Prov: {p.provider}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[var(--color-error)] tabular-nums">-{formatCurrency(p.cost)}</span>
                  <span className="text-[9px] text-[var(--color-text-muted)] block">{p.date}</span>
                </div>
              </div>
            ))}
            {purchases.length === 0 && (
              <p className="text-xs text-[var(--color-text-muted)] py-4 text-center">No hay egresos registrados.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
