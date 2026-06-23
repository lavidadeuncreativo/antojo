"use client";

import { Download } from "lucide-react";

export default function ReportsPage() {
  const reports: any[] = [];

  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left pt-6">
      <div className="border-b border-[#E5E5E5] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase" style={{ letterSpacing: "-0.04em" }}>
            REPORTES
          </h1>
          <p className="text-sm text-black/60 mt-4 uppercase tracking-widest font-medium">
            Documentos y Cierres
          </p>
        </div>
        <button className="bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors w-fit">
          Generar Reporte
        </button>
      </div>

      <div className="space-y-0">
        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-black text-xs font-bold uppercase tracking-widest text-[#999999]">
          <div className="col-span-5">Documento</div>
          <div className="col-span-3">Categoría</div>
          <div className="col-span-3 text-right">Fecha</div>
          <div className="col-span-1 text-right"></div>
        </div>

        {reports.length === 0 ? (
          <div className="py-12 text-center text-xs font-bold text-[#999999] uppercase tracking-widest">
            Aún no hay reportes generados
          </div>
        ) : (
          reports.map((report, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-4 py-6 border-b border-[#E5E5E5] items-center hover:bg-[#F9F9F9] transition-colors -mx-4 px-4 cursor-pointer">
              <div className="col-span-5">
                <div className="text-base font-bold text-black">{report.title}</div>
                <div className="text-[10px] text-[#999999] font-bold uppercase tracking-widest mt-1">{report.size} • PDF</div>
              </div>
              <div className="col-span-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-[#F5F5F5] px-2 py-1">
                  {report.type}
                </span>
              </div>
              <div className="col-span-3 text-right font-bold text-[#999999] text-sm">
                {report.date}
              </div>
              <div className="col-span-1 flex justify-end">
                <button className="w-10 h-10 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
