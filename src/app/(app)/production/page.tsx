"use client";

import { Check, Clock, AlertTriangle } from "lucide-react";

export default function ProductionPage() {
  const batches = [
    { id: "LOTE-992", product: "Matcha Latte", qty: "50 L", status: "En Proceso", time: "2 hrs restantes" },
    { id: "LOTE-993", product: "Cold Brew", qty: "120 L", status: "Macerando", time: "18 hrs restantes" },
    { id: "LOTE-991", product: "Pócima Fresa", qty: "30 L", status: "Completado", time: "Hace 2 hrs" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left pt-6">
      <div className="border-b border-[#E5E5E5] pb-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase" style={{ letterSpacing: "-0.04em" }}>
          PRODUCCIÓN
        </h1>
        <p className="text-sm text-black/60 mt-4 uppercase tracking-widest font-medium">
          Control de Lotes y Procesos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border border-[#E5E5E5] flex flex-col justify-between h-32">
          <span className="text-[10px] font-bold text-[#999999] uppercase tracking-widest">En Proceso</span>
          <span className="text-4xl font-black tracking-tighter">2</span>
        </div>
        <div className="p-6 border border-[#E5E5E5] flex flex-col justify-between h-32">
          <span className="text-[10px] font-bold text-[#999999] uppercase tracking-widest">Litros Hoy</span>
          <span className="text-4xl font-black tracking-tighter">200</span>
        </div>
        <div className="p-6 border border-black bg-black text-white flex flex-col justify-between h-32">
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Alertas QC</span>
          <span className="text-4xl font-black tracking-tighter">0</span>
        </div>
      </div>

      <div>
        <h2 className="text-xs font-bold text-[#999999] uppercase tracking-widest border-b border-black pb-4 mb-4">Lotes Activos</h2>
        <div className="space-y-4">
          {batches.map((batch) => (
            <div key={batch.id} className="p-6 border border-[#E5E5E5] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-[#999999] uppercase tracking-widest block mb-1">{batch.id}</span>
                <h3 className="text-xl font-bold text-black">{batch.product}</h3>
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
          ))}
        </div>
      </div>
    </div>
  );
}
