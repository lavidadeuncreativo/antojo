"use client";

import { useState } from "react";
import { useGlobalState } from "@/lib/state";
import { Settings, RefreshCw, Check, AlertTriangle } from "lucide-react";

export default function ConfigurarPage() {
  const { resetAllData } = useGlobalState();
  const [successMsg, setSuccessMsg] = useState("");

  const handleReset = () => {
    if (confirm("¿Estás seguro de que deseas restablecer todos los datos operativos? Esto borrará el historial de ventas, compras, lotes y restablecerá el inventario inicial.")) {
      resetAllData();
      setSuccessMsg("¡Datos restablecidos correctamente!");
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
    }
  };

  return (
    <div className="space-y-6 text-left select-none max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <h2 className="text-xl font-bold text-white">Configuración del Sistema</h2>
        <p className="text-xs text-[var(--color-text-muted)] mt-1">
          Ajusta los parámetros operativos de ANTOJO OS y gestiona el almacenamiento local.
        </p>
      </div>

      {successMsg && (
        <div className="flex items-center gap-3 p-4 bg-[var(--color-success-bg)] border border-[var(--color-success)]/20 rounded-2xl text-[var(--color-success)] text-xs">
          <Check size={16} className="flex-shrink-0" />
          <span className="font-bold">{successMsg}</span>
        </div>
      )}

      {/* Main Settings Card */}
      <div className="card p-6 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-white mb-2">Base de Datos & Integración</h3>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            Actualmente, la plataforma está operando en **Modo de Resiliencia Local (Demo Mode)**. 
            Todos los movimientos de inventario, recetas, producción y ventas se procesan en tiempo real 
            y se guardan en el almacenamiento local de tu navegador (`localStorage`).
          </p>
        </div>

        <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-xs text-[var(--color-text-secondary)] flex items-start gap-3">
          <AlertTriangle size={16} className="text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-1">Conexión con Supabase</span>
            Si configuras las claves `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` en tus variables de entorno, la plataforma sincronizará automáticamente las tablas en la nube en lugar del caché local del navegador.
          </div>
        </div>

        {/* Action Button: Reset Demo Data */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="font-bold text-white text-xs block mb-1">Restablecer Base de Datos</span>
            <span className="text-[10px] text-[var(--color-text-muted)] block">
              Borra el caché local y recarga los insumos y recetas por defecto.
            </span>
          </div>
          
          <button
            onClick={handleReset}
            className="btn btn-destructive btn-sm flex items-center gap-1.5"
          >
            <RefreshCw size={12} />
            Restablecer Datos
          </button>
        </div>
      </div>

      {/* Other Mock settings for completeness */}
      <div className="card p-6 space-y-4">
        <h3 className="text-sm font-bold text-white mb-2">Preferencias Generales</h3>
        
        <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
          <div>
            <span className="font-semibold text-white block">Divisa Predeterminada</span>
            <span className="text-[10px] text-[var(--color-text-muted)]">Utilizar para reportes y facturas</span>
          </div>
          <span className="font-bold text-white">MXN ($)</span>
        </div>

        <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
          <div>
            <span className="font-semibold text-white block">Impresión de Tickets</span>
            <span className="text-[10px] text-[var(--color-text-muted)]">Generar formato simplificado</span>
          </div>
          <span className="badge badge-neutral">Activado</span>
        </div>

        <div className="flex items-center justify-between text-xs py-2">
          <div>
            <span className="font-semibold text-white block">Alertas de Stock</span>
            <span className="text-[10px] text-[var(--color-text-muted)]">Notificar insumos por debajo del stock mínimo</span>
          </div>
          <span className="badge badge-neutral">Crítico</span>
        </div>
      </div>

    </div>
  );
}
