"use client";

import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function PurchasesPage() {
  const purchases: any[] = [];

  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left pt-6">
      <div className="pt-8 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)]">
        <div>
          <p className="text-[10px] text-[var(--color-text-secondary)] mb-2 font-bold uppercase tracking-[0.2em]">
            Abastecimiento
          </p>
          <h1 className="hero-title">
            COMPRAS <span className="font-light italic text-[var(--color-text-secondary)] tracking-normal">& órdenes.</span>
          </h1>
        </div>
        <button className="btn btn-primary w-fit md:self-end">
          Nueva Orden
        </button>
      </div>

      <div className="space-y-0">
        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-black text-xs font-bold uppercase tracking-widest text-[#999999]">
          <div className="col-span-3">Folio / Fecha</div>
          <div className="col-span-4">Proveedor</div>
          <div className="col-span-3 text-right">Monto</div>
          <div className="col-span-2 text-right">Estado</div>
        </div>

        {purchases.length === 0 ? (
          <div className="py-16 text-center border border-[var(--color-border)] border-dashed rounded-2xl bg-[var(--color-canvas)] mt-8 shadow-sm">
            <div className="flex flex-col items-center justify-center space-y-3">
              <ShoppingBag size={32} className="text-[var(--color-border)] mb-2" />
              <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Sin órdenes</span>
              <p className="text-sm font-medium text-[var(--color-text-secondary)]">No hay compras u órdenes registradas.</p>
            </div>
          </div>
        ) : (
          purchases.map((purchase) => (
            <div key={purchase.id} className="grid grid-cols-12 gap-4 py-6 border-b border-[#E5E5E5] items-center hover:bg-[#F9F9F9] transition-colors -mx-4 px-4 cursor-pointer">
              <div className="col-span-3">
                <div className="text-sm font-bold text-black">{purchase.id}</div>
                <div className="text-[10px] text-[#999999] uppercase tracking-wider mt-1">{purchase.date}</div>
              </div>
              <div className="col-span-4">
                <div className="text-base font-bold text-black">{purchase.provider}</div>
              </div>
              <div className="col-span-3 text-right font-bold text-black tabular-nums">
                {formatCurrency(purchase.amount)}
              </div>
              <div className="col-span-2 text-right">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                  purchase.status === 'Recibido' ? 'text-black' : 'text-[#999999]'
                }`}>
                  {purchase.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
