"use client";

import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function PurchasesPage() {
  const purchases: any[] = [];

  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left pt-6">
      <div className="border-b border-[#E5E5E5] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase" style={{ letterSpacing: "-0.04em" }}>
            COMPRAS
          </h1>
          <p className="text-sm text-black/60 mt-4 uppercase tracking-widest font-medium">
            Órdenes y Proveedores
          </p>
        </div>
        <button className="bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors w-fit">
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
          <div className="py-12 text-center text-xs font-bold text-[#999999] uppercase tracking-widest">
            No hay órdenes de compra registradas
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
