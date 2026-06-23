"use client";

import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function PurchasesPage() {
  const purchases: any[] = [];

  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left pt-6">
      <div className="pt-14 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)]">
        <div>
          <span className="label-micro block mb-3">Abastecimiento</span>
          <h1 className="hero-title">
            COMPRAS <span className="italic-light">& órdenes.</span>
          </h1>
        </div>
        <button className="btn btn-primary w-fit md:self-end">
          Nueva Orden
        </button>
      </div>

      <div className="table-container">
        <table className="antojo-table">
          <thead>
            <tr>
              <th>Folio / Fecha</th>
              <th>Proveedor</th>
              <th className="text-right">Monto</th>
              <th className="text-right">Estado</th>
            </tr>
          </thead>
          <tbody>
            {purchases.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: 0, border: 'none' }}>
                  <div className="empty-state border-0 border-b border-[var(--color-border)]">
                    <ShoppingBag size={32} className="empty-state__icon" strokeWidth={1.5} />
                    <span className="empty-state__label">Sin órdenes</span>
                    <p className="empty-state__text">No hay compras u órdenes registradas.</p>
                  </div>
                </td>
              </tr>
            ) : (
              purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td>
                    <div className="font-bold text-black">{purchase.id}</div>
                    <div className="text-[10px] text-[#999999] uppercase tracking-wider mt-1">{purchase.date}</div>
                  </td>
                  <td>
                    <div className="font-bold text-black">{purchase.provider}</div>
                  </td>
                  <td className="text-right font-bold text-black tabular-nums">
                    {formatCurrency(purchase.amount)}
                  </td>
                  <td className="text-right">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      purchase.status === 'Recibido' ? 'text-black' : 'text-[#999999]'
                    }`}>
                      {purchase.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
