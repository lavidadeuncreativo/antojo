"use client";

import { TrendingUp, Users, Target } from "lucide-react";

export default function GrowthPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left pt-6">
      <div className="border-b border-[#E5E5E5] pb-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase" style={{ letterSpacing: "-0.04em" }}>
          CRECIMIENTO
        </h1>
        <p className="text-sm text-black/60 mt-4 uppercase tracking-widest font-medium">
          Métricas de Expansión y OKRs
        </p>
      </div>

      <div className="space-y-12">
        <div className="space-y-6">
          <h2 className="text-xs font-bold text-[#999999] uppercase tracking-widest border-b border-black pb-4">Objetivos Q3 2026</h2>
          
          <div className="border border-[#E5E5E5] p-8">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-2xl font-bold text-black">Apertura Nueva Sucursal Sur</h3>
              <span className="text-4xl font-black">75%</span>
            </div>
            <div className="w-full bg-[#F5F5F5] h-2 rounded-full overflow-hidden">
              <div className="bg-black h-full w-[75%] rounded-full"></div>
            </div>
            <div className="flex justify-between mt-4 text-xs font-bold text-[#999999] uppercase tracking-widest">
              <span>Status: En tiempo</span>
              <span>Deadline: Sep 2026</span>
            </div>
          </div>

          <div className="border border-[#E5E5E5] p-8">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-2xl font-bold text-black">Lanzamiento Línea RTD (Ready To Drink)</h3>
              <span className="text-4xl font-black">40%</span>
            </div>
            <div className="w-full bg-[#F5F5F5] h-2 rounded-full overflow-hidden">
              <div className="bg-black h-full w-[40%] rounded-full"></div>
            </div>
            <div className="flex justify-between mt-4 text-xs font-bold text-[#999999] uppercase tracking-widest">
              <span>Status: Retraso Menor</span>
              <span>Deadline: Oct 2026</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 border border-[#E5E5E5] bg-[#F9F9F9]">
            <span className="text-[10px] font-bold text-[#999999] uppercase tracking-widest block mb-4">Retención de Clientes</span>
            <div className="text-6xl font-black tracking-tighter text-black">84<span className="text-3xl">%</span></div>
            <p className="text-xs text-[#999999] mt-4 font-bold">+2.4% vs trimestre anterior</p>
          </div>
          <div className="p-8 border border-black bg-black text-white">
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-4">NPS Score</span>
            <div className="text-6xl font-black tracking-tighter text-white">72</div>
            <p className="text-xs text-white/50 mt-4 font-bold">Excelente nivel de recomendación</p>
          </div>
        </div>
      </div>
    </div>
  );
}
