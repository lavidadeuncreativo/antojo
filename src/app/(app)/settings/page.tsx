"use client";

import { useState } from "react";
import { useGlobalState } from "@/lib/state";
import { RefreshCw, Check, AlertTriangle } from "lucide-react";

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
    <div className="space-y-8 text-left select-none max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="pb-4 border-b border-[var(--color-border)]">
        <h1 className="text-3xl font-black tracking-tighter text-black uppercase">
          CONFIGURACIÓN DEL <span className="font-light italic text-[var(--color-text-secondary)]">sistema.</span>
        </h1>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">
          Ajusta los parámetros operativos de ANTOJO OS y gestiona el almacenamiento local.
        </p>
      </div>

      {successMsg && (
        <div className="flex items-center gap-3 p-4 bg-[var(--color-success-bg)] border border-[var(--color-success)] text-[var(--color-success)] text-xs font-bold uppercase tracking-wider">
          <Check size={16} className="flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Settings Card */}
      <div className="card p-8 space-y-6 border border-[var(--color-border)] bg-white rounded-none">
        <div>
          <h3 className="text-sm font-extrabold text-black mb-2 uppercase tracking-tight">Base de Datos & Integración</h3>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-medium">
            Actualmente, la plataforma está operando en **Modo de Resiliencia Local (Demo Mode)**. 
            Todos los movimientos de inventario, recetas, producción y ventas se procesan en tiempo real 
            y se guardan en el almacenamiento local de tu navegador (`localStorage`).
          </p>
        </div>

        <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] flex items-start gap-3">
          <AlertTriangle size={16} className="text-black flex-shrink-0 mt-0.5" />
          <div className="font-medium">
            <span className="font-extrabold text-black block mb-1 uppercase tracking-tight">Conexión con Supabase</span>
            Si configuras las claves `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` en tus variables de entorno, la plataforma sincronizará automáticamente las tablas en la nube en lugar del caché local del navegador.
          </div>
        </div>

        {/* Action Button: Reset Demo Data */}
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-extrabold text-black text-xs block mb-1 uppercase tracking-tight">Restablecer Base de Datos</span>
            <span className="text-[10px] text-[var(--color-text-muted)] block font-medium">
              Borra el caché local y recarga los insumos y recetas por defecto.
            </span>
          </div>
          
          <button
            onClick={handleReset}
            className="btn btn-destructive btn-sm flex items-center gap-1.5 self-start"
          >
            <RefreshCw size={12} />
            Restablecer Datos
          </button>
        </div>
      </div>

      {/* Other Mock settings for completeness */}
      <div className="card p-8 space-y-4 border border-[var(--color-border)] bg-white rounded-none">
        <h3 className="text-sm font-extrabold text-black mb-4 uppercase tracking-tight">Preferencias Generales</h3>
        
        <div className="flex items-center justify-between text-xs py-3 border-b border-[var(--color-border)]">
          <div>
            <span className="font-extrabold text-black block">Divisa Predeterminada</span>
            <span className="text-[10px] text-[var(--color-text-muted)] mt-0.5 block">Utilizar para reportes y facturas</span>
          </div>
          <span className="font-extrabold text-black tabular-nums">MXN ($)</span>
        </div>

        <div className="flex items-center justify-between text-xs py-3 border-b border-[var(--color-border)]">
          <div>
            <span className="font-extrabold text-black block">Impresión de Tickets</span>
            <span className="text-[10px] text-[var(--color-text-muted)] mt-0.5 block">Generar formato simplificado</span>
          </div>
          <span className="badge badge-neutral">Activado</span>
        </div>

        <div className="flex items-center justify-between text-xs py-3">
          <div>
            <span className="font-extrabold text-black block">Alertas de Stock</span>
            <span className="text-[10px] text-[var(--color-text-muted)] mt-0.5 block">Notificar insumos por debajo del stock mínimo</span>
          </div>
          <span className="badge badge-neutral">Crítico</span>
        </div>
      </div>

    </div>
  );
}
