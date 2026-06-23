"use client";

import { FileText, Plus, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function QuotesPage() {
  const quotes = [
    { id: "COT-042", client: "Agencia Azul", date: "10 Jul 2026", amount: 15400, status: "Aprobada" },
    { id: "COT-043", client: "Boda M&J", date: "12 Jul 2026", amount: 32000, status: "Enviada" },
    { id: "COT-044", client: "Corporativo B", date: "15 Jul 2026", amount: 8900, status: "Borrador" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left pt-6">
      <div className="border-b border-[#E5E5E5] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase" style={{ letterSpacing: "-0.04em" }}>
            COTIZACIONES
          </h1>
          <p className="text-sm text-black/60 mt-4 uppercase tracking-widest font-medium">
            Propuestas Comerciales
          </p>
        </div>
        <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors w-fit">
          <Plus size={16} /> Nueva
        </button>
      </div>

      <div className="space-y-0">
        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-black text-xs font-bold uppercase tracking-widest text-[#999999]">
          <div className="col-span-2">Folio</div>
          <div className="col-span-4">Cliente</div>
          <div className="col-span-3 text-right">Monto</div>
          <div className="col-span-3 text-right">Estado</div>
        </div>

        {quotes.map((quote) => (
          <div key={quote.id} className="grid grid-cols-12 gap-4 py-6 border-b border-[#E5E5E5] items-center hover:bg-[#F9F9F9] transition-colors -mx-4 px-4 cursor-pointer">
            <div className="col-span-2 text-sm font-bold text-black">{quote.id}</div>
            <div className="col-span-4">
              <div className="text-base font-bold text-black">{quote.client}</div>
              <div className="text-xs text-[#999999] mt-1">{quote.date}</div>
            </div>
            <div className="col-span-3 text-right font-bold text-black tabular-nums">
              {formatCurrency(quote.amount)}
            </div>
            <div className="col-span-3 flex justify-end items-center gap-4">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm
                ${quote.status === 'Aprobada' ? 'bg-[#E5F2E5] text-green-800' : 
                  quote.status === 'Enviada' ? 'bg-[#E5F0FF] text-blue-800' : 
                  'bg-[#F5F5F5] text-[#666666]'}`}
              >
                {quote.status}
              </span>
              <button className="text-[#999999] hover:text-black transition-colors">
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
