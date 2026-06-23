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
    <div className="space-y-8 text-left select-none max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="pb-4 border-b border-[var(--color-border)]">
        <h1 className="text-3xl font-black tracking-tighter text-black uppercase">
          ESTADO <span className="font-light italic text-[var(--color-text-secondary)]">financiero.</span>
        </h1>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">
          Supervisa el flujo de caja operativo, ingresos por venta y egresos por compras.
        </p>
      </div>

      {/* Cashflow Dashboard Cards (Grid layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--color-border)] bg-[var(--color-border)] gap-[1px]">
        
        {/* Card 1: Total Income */}
        <div className="bg-white p-8 flex flex-col justify-between min-h-[140px] text-left">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                Ingresos Totales
              </span>
              <div className="w-7 h-7 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center">
                <TrendingUp size={14} />
              </div>
            </div>
            <h3 className="text-sm font-extrabold text-black mt-2">Facturación de Ventas</h3>
          </div>

          <div className="pt-3 border-t border-[var(--color-border)] mt-3">
            <span className="text-3xl font-extrabold text-black tabular-nums">
              {formatCurrency(totalSalesVal)}
            </span>
          </div>
        </div>

        {/* Card 2: Total Expenses */}
        <div className="bg-white p-8 flex flex-col justify-between min-h-[140px] text-left">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                Egresos de Caja
              </span>
              <div className="w-7 h-7 rounded-full bg-[var(--color-error-bg)] text-[var(--color-error)] flex items-center justify-center">
                <TrendingDown size={14} />
              </div>
            </div>
            <h3 className="text-sm font-extrabold text-black mt-2">Compras y Materia Prima</h3>
          </div>

          <div className="pt-3 border-t border-[var(--color-border)] mt-3">
            <span className="text-3xl font-extrabold text-black tabular-nums">
              {formatCurrency(totalExpensesVal)}
            </span>
          </div>
        </div>

        {/* Card 3: Net Balance */}
        <div className="bg-white p-8 flex flex-col justify-between min-h-[140px] text-left">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Flujo Neto
              </span>
              <div className="w-7 h-7 rounded-full flex items-center justify-center bg-black/5 text-black">
                <DollarSign size={14} />
              </div>
            </div>
            <h3 className="text-sm font-extrabold text-black mt-2">Caja Neta del Negocio</h3>
          </div>

          <div className="pt-3 border-t mt-3 border-[var(--color-border)]">
            <span className={`text-3xl font-extrabold tabular-nums ${netBalance >= 0 ? "text-green-700" : "text-red-600"}`}>
              {formatCurrency(netBalance)}
            </span>
          </div>
        </div>

      </div>

      {/* Ledger transactions list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        
        {/* Income entries */}
        <div className="space-y-4">
          <div className="pb-2 border-b border-[var(--color-border)] text-left">
            <h4 className="text-xs font-bold uppercase text-black tracking-wider">
              Flujo de Entrada (Ventas)
            </h4>
          </div>
          <div className="divide-y divide-[var(--color-border)] border border-[var(--color-border)] bg-white px-4">
            {sales.map((s) => (
              <div key={s.id} className="flex justify-between py-3 text-xs">
                <div>
                  <span className="font-extrabold text-black block">{s.customer}</span>
                  <span className="text-[9px] text-[var(--color-text-secondary)] block mt-0.5">{s.folio} • {s.channel}</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-green-700 tabular-nums">+{formatCurrency(s.total)}</span>
                  <span className="text-[9px] text-[var(--color-text-muted)] block mt-0.5 font-bold uppercase tracking-wide">{s.time}</span>
                </div>
              </div>
            ))}
            {sales.length === 0 && (
              <p className="text-xs text-[var(--color-text-muted)] py-6 text-center font-medium">No hay ingresos registrados.</p>
            )}
          </div>
        </div>

        {/* Expense entries */}
        <div className="space-y-4">
          <div className="pb-2 border-b border-[var(--color-border)] text-left">
            <h4 className="text-xs font-bold uppercase text-black tracking-wider">
              Flujo de Salida (Egresos)
            </h4>
          </div>
          <div className="divide-y divide-[var(--color-border)] border border-[var(--color-border)] bg-white px-4">
            {purchases.map((p) => (
              <div key={p.id} className="flex justify-between py-3 text-xs">
                <div>
                  <span className="font-extrabold text-black block">{p.itemName}</span>
                  <span className="text-[9px] text-[var(--color-text-secondary)] block mt-0.5">Prov: {p.provider}</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-red-600 tabular-nums">-{formatCurrency(p.cost)}</span>
                  <span className="text-[9px] text-[var(--color-text-muted)] block mt-0.5 font-bold uppercase tracking-wide">{p.date}</span>
                </div>
              </div>
            ))}
            {purchases.length === 0 && (
              <p className="text-xs text-[var(--color-text-muted)] py-6 text-center font-medium">No hay egresos registrados.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
