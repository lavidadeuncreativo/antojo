"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left">
      <div className="pt-14 pb-12 border-b border-[var(--color-border)]">
        <span className="label-micro block mb-3">Ajustes del Sistema y Cuenta</span>
        <h1 className="hero-title">
          CONFIGURACIÓN <span className="italic-light">& sistema.</span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/4 space-y-2 border-r border-[var(--color-border)] pr-8">
          {['general','usuarios','facturacion','notificaciones','integraciones'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`block text-sm w-full text-left py-2 font-semibold capitalize transition-all duration-200 ${
                activeTab === tab
                  ? 'text-black font-bold border-l-2 border-black pl-3 -ml-px'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] pl-3'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="w-full md:w-3/4">
          {activeTab === 'general' && (
            <div className="space-y-8">
              <h2 className="section-title border-b border-[var(--color-border)] pb-4">Ajustes Generales</h2>
              
              <div className="space-y-5">
                <div className="form-group">
                  <label className="label">Nombre de la Empresa</label>
                  <input type="text" defaultValue="Antojo Beverages" className="input-base" />
                </div>
                
                <div className="form-group">
                  <label className="label">Moneda Principal</label>
                  <select className="input-base">
                    <option>MXN - Peso Mexicano</option>
                    <option>USD - Dólar Estadounidense</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label">Zona Horaria</label>
                  <select className="input-base">
                    <option>America/Mexico_City (GMT-6)</option>
                    <option>America/Monterrey (GMT-6)</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--color-border)]">
                <button className="btn btn-primary">
                  Guardar Cambios
                </button>
              </div>
            </div>
          )}
          
          {activeTab !== 'general' && (
            <div className="empty-state border border-[var(--color-border)] mt-0">
              <span className="empty-state__label">PRÓXIMAMENTE</span>
              <p className="empty-state__text max-w-xs mx-auto">Esta sección de configuración estará disponible en la versión 1.2.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
