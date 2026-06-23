"use client";

import { useState } from "react";
import { useGlobalState } from "@/lib/state";
import { Check, Clock, AlertTriangle, Plus, X } from "lucide-react";

export default function ProductionPage() {
  const { production, products, addProductionBatch } = useGlobalState();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [qty, setQty] = useState(1);
  const [expirationDate, setExpirationDate] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || qty <= 0 || !expirationDate) return;

    const success = addProductionBatch({
      productName: selectedProduct,
      qty,
      status: "confirmado",
      expirationDate,
    });

    if (success) {
      setSuccessMsg("¡Lote registrado y descontado del inventario!");
      setSelectedProduct("");
      setQty(1);
      setExpirationDate("");
      setErrorMsg("");
      setTimeout(() => {
        setSuccessMsg("");
        setModalOpen(false);
      }, 1500);
    } else {
      setErrorMsg("Inventario insuficiente para este lote.");
    }
  };

  const pendingBatches = production.filter(b => b.status === "pendiente").length;
  const litrosHoy = production.reduce((acc, b) => acc + b.qty, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-12 select-none text-left pt-6">
      <div className="pt-14 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)]">
        <div>
          <span className="label-micro block mb-3">Control de Lotes y Procesos</span>
          <h1 className="hero-title">
            PRODUCCIÓN <span className="italic-light">activa.</span>
          </h1>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary self-start md:self-end">
          <Plus size={14} strokeWidth={2.5} /> Nuevo Lote
        </button>
      </div>

      <div className="editorial-grid editorial-grid-3 mb-12">
        <div className="editorial-cell">
          <span className="kpi-label">En Proceso</span>
          <span className="kpi-value">{pendingBatches}</span>
        </div>
        <div className="editorial-cell">
          <span className="kpi-label">Litros Hoy</span>
          <span className="kpi-value">{litrosHoy}</span>
        </div>
        <div className="editorial-cell editorial-cell--dark">
          <span className="kpi-label opacity-50">Alertas QC</span>
          <span className="kpi-value text-white">0</span>
        </div>
      </div>

      <div>
        <h2 className="section-title border-b border-[var(--color-border)] pb-4 mb-4">Lotes Activos</h2>
        <div className="space-y-4">
          {production.length === 0 ? (
            <div className="empty-state border-0">
              <span className="empty-state__label">No hay lotes activos en producción</span>
            </div>
          ) : (
            production.map((batch) => (
              <div key={batch.id} className="card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="label-micro block mb-1">{batch.id}</span>
                  <h3 className="display-title">{batch.productName}</h3>
                </div>
                <div className="flex gap-8 items-center">
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-[#999999] uppercase tracking-widest block mb-1">Caducidad</span>
                    <span className="text-sm font-bold text-black">{batch.expirationDate || "N/A"}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-[#999999] uppercase tracking-widest block mb-1">Volumen</span>
                    <span className="text-base font-bold text-black">{batch.qty}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-[#999999] uppercase tracking-widest block mb-1">Estado</span>
                    <span className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1 ${
                      batch.status === 'confirmado' ? 'text-green-700' : 'text-blue-700'
                    }`}>
                      {batch.status === 'confirmado' ? <Check size={12}/> : <Clock size={12}/>}
                      {batch.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay flex items-center justify-center p-4 z-[100] animate-fade-in">
          <div className="modal-content relative text-left animate-slide-up bg-white">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] hover:text-black transition-colors"
            >
              <X size={16} strokeWidth={2} />
            </button>

            <h3 className="section-title">Registrar Lote (Vida Útil)</h3>

            {successMsg ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-slide-up">
                <div className="w-16 h-16 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center ring-8 ring-[var(--color-success-bg)]/30">
                  <Check size={28} strokeWidth={3} />
                </div>
                <p className="text-base font-bold text-black tracking-tight">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wide border border-red-200">
                    {errorMsg}
                  </div>
                )}
                <div className="form-group">
                  <label className="label">Bebida a producir</label>
                  <select
                    required
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="input-base"
                  >
                    <option value="">-- Selecciona Receta --</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="label">Volumen / Cantidad</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="input-base"
                    />
                  </div>
                  <div className="form-group">
                    <label className="label">Fecha de Caducidad</label>
                    <input
                      type="date"
                      required
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                      className="input-base"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary">
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Descontar y Producir
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
