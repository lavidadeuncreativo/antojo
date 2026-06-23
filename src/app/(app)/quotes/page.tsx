"use client";

import { FileText, Plus, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function QuotesPage() {
  const quotes: any[] = [];

  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left pt-6">
      <div className="pt-14 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)]">
        <div>
          <span className="label-micro block mb-3">Propuestas Comerciales</span>
          <h1 className="hero-title">
            COTIZACIONES <span className="italic-light">activas.</span>
          </h1>
        </div>
        <button className="btn btn-primary w-fit md:self-end">
          <Plus size={16} strokeWidth={2.5} className="mr-1" /> Nueva
        </button>
      </div>

      <div className="table-container">
        <table className="antojo-table">
          <thead>
            <tr>
              <th>Folio</th>
              <th>Cliente</th>
              <th className="text-right">Monto</th>
              <th className="text-right">Estado</th>
            </tr>
          </thead>
          <tbody>
            {quotes.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: 0, border: 'none' }}>
                  <div className="empty-state border-0 border-b border-[var(--color-border)]">
                    <FileText size={32} className="empty-state__icon" strokeWidth={1.5} />
                    <span className="empty-state__label">Sin cotizaciones</span>
                    <p className="empty-state__text">No hay cotizaciones registradas.</p>
                  </div>
                </td>
              </tr>
            ) : (
              quotes.map((quote) => (
                <tr key={quote.id}>
                  <td className="font-bold text-black">{quote.id}</td>
                  <td>
                    <div className="font-bold text-black">{quote.client}</div>
                    <div className="text-xs text-[var(--color-text-secondary)] mt-1">{quote.date}</div>
                  </td>
                  <td className="text-right font-bold text-black tabular-nums">
                    {formatCurrency(quote.amount)}
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end items-center gap-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm
                        ${quote.status === 'Aprobada' ? 'bg-[#E5F2E5] text-green-800' : 
                          quote.status === 'Enviada' ? 'bg-[#E5F0FF] text-blue-800' : 
                          'bg-[#F5F5F5] text-[var(--color-text-secondary)]'}`}
                      >
                        {quote.status}
                      </span>
                      <button className="text-[var(--color-text-muted)] hover:text-black transition-colors">
                        <Download size={16} />
                      </button>
                    </div>
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
