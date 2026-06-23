"use client";

import { Check, Clock, AlertTriangle } from "lucide-react";

export default function ProductionPage() {
  const batches: any[] = [];

  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left pt-6">
      <div className="pt-14 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)]">
        <div>
          <span className="label-micro block mb-3">Control de Lotes y Procesos</span>
          <h1 className="hero-title">
            PRODUCCIÓN <span className="italic-light">activa.</span>
          </h1>
        </div>
      </div>

      <div className="editorial-grid editorial-grid-3 mb-12">
        <div className="editorial-cell">
          <span className="kpi-label">En Proceso</span>
          <span className="kpi-value">0</span>
        </div>
        <div className="editorial-cell">
          <span className="kpi-label">Litros Hoy</span>
          <span className="kpi-value">0</span>
        </div>
        <div className="editorial-cell editorial-cell--dark">
          <span className="kpi-label opacity-50">Alertas QC</span>
          <span className="kpi-value text-white">0</span>
        </div>
      </div>

      <div>
        <h2 className="section-title border-b border-[var(--color-border)] pb-4 mb-4">Lotes Activos</h2>
        <div className="space-y-4">
          {batches.length === 0 ? (
            <div className="empty-state border-0">
              <span className="empty-state__label">No hay lotes activos en producción</span>
            </div>
          ) : (
            batches.map((batch) => (
              <div key={batch.id} className="card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="label-micro block mb-1">{batch.id}</span>
                  <h3 className="display-title">{batch.product}</h3>
                </div>
                <div className="flex gap-8 items-center">
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-[#999999] uppercase tracking-widest block mb-1">Volumen</span>
                    <span className="text-base font-bold text-black">{batch.qty}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-[#999999] uppercase tracking-widest block mb-1">Estado</span>
                    <span className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1 ${
                      batch.status === 'Completado' ? 'text-green-700' : 'text-blue-700'
                    }`}>
                      {batch.status === 'Completado' ? <Check size={12}/> : <Clock size={12}/>}
                      {batch.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
