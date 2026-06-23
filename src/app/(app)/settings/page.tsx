"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left pt-6">
      <div className="border-b border-[#E5E5E5] pb-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase" style={{ letterSpacing: "-0.04em" }}>
          CONFIGURACIÓN
        </h1>
        <p className="text-sm text-black/60 mt-4 uppercase tracking-widest font-medium">
          Ajustes del Sistema y Cuenta
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/4 space-y-4">
          <button onClick={() => setActiveTab('general')} className={`block text-sm w-full text-left font-bold ${activeTab === 'general' ? 'text-black' : 'text-[#999999] hover:text-black'}`}>General</button>
          <button onClick={() => setActiveTab('usuarios')} className={`block text-sm w-full text-left font-bold ${activeTab === 'usuarios' ? 'text-black' : 'text-[#999999] hover:text-black'}`}>Usuarios y Permisos</button>
          <button onClick={() => setActiveTab('facturacion')} className={`block text-sm w-full text-left font-bold ${activeTab === 'facturacion' ? 'text-black' : 'text-[#999999] hover:text-black'}`}>Facturación y Pagos</button>
          <button onClick={() => setActiveTab('notificaciones')} className={`block text-sm w-full text-left font-bold ${activeTab === 'notificaciones' ? 'text-black' : 'text-[#999999] hover:text-black'}`}>Notificaciones</button>
          <button onClick={() => setActiveTab('integraciones')} className={`block text-sm w-full text-left font-bold ${activeTab === 'integraciones' ? 'text-black' : 'text-[#999999] hover:text-black'}`}>Integraciones</button>
        </div>

        <div className="w-full md:w-3/4">
          {activeTab === 'general' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-black border-b border-[#E5E5E5] pb-4">Ajustes Generales</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-[#999999] uppercase tracking-widest block mb-2">Nombre de la Empresa</label>
                  <input type="text" defaultValue="Antojo Beverages" className="w-full border-b border-[#E5E5E5] py-2 text-base font-bold text-black focus:outline-none focus:border-black transition-colors" />
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-[#999999] uppercase tracking-widest block mb-2">Moneda Principal</label>
                  <select className="w-full border-b border-[#E5E5E5] py-2 text-base font-bold text-black focus:outline-none focus:border-black transition-colors bg-transparent">
                    <option>MXN - Peso Mexicano</option>
                    <option>USD - Dólar Estadounidense</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#999999] uppercase tracking-widest block mb-2">Zona Horaria</label>
                  <select className="w-full border-b border-[#E5E5E5] py-2 text-base font-bold text-black focus:outline-none focus:border-black transition-colors bg-transparent">
                    <option>America/Mexico_City (GMT-6)</option>
                    <option>America/Monterrey (GMT-6)</option>
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button className="bg-black text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors">
                  Guardar Cambios
                </button>
              </div>
            </div>
          )}
          
          {activeTab !== 'general' && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-4xl font-black text-[#E5E5E5] mb-4 tracking-tighter">PRÓXIMAMENTE</div>
              <p className="text-sm font-bold text-[#999999]">Esta sección de configuración estará disponible en la versión 1.2.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
