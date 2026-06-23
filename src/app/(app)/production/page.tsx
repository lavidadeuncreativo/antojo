"use client";

import { useState } from "react";
import { useGlobalState } from "@/lib/state";
import { Plus, X, Check, AlertCircle } from "lucide-react";

export default function ProduccionPage() {
  const { production, products, addProductionBatch } = useGlobalState();

  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [selectedProductName, setSelectedProductName] = useState("");
  const [qty, setQty] = useState(10);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductName || qty <= 0) return;

    setErrorMsg("");
    const success = addProductionBatch({
      productName: selectedProductName,
      qty,
      status: "confirmado",
    });

    if (!success) {
      setErrorMsg(
        "Fallas en stock: No hay suficiente materia prima en inventario para cubrir la receta de este lote."
      );
    } else {
      setSuccessMsg(`¡Lote de ${qty} unidades procesado con éxito!`);
      setSelectedProductName("");
      setQty(10);
      setTimeout(() => {
        setSuccessMsg("");
        setModalOpen(false);
      }, 1200);
    }
  };

  return (
    <div className="space-y-8 text-left select-none max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-black uppercase">
            LOTES DE <span className="font-light italic text-[var(--color-text-secondary)]">producción.</span>
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">
            Registra la elaboración de bebidas frías listas para venta y descuenta insumos.
          </p>
        </div>

        <button onClick={() => setModalOpen(true)} className="btn btn-primary self-start">
          <Plus size={14} />
          Iniciar Lote
        </button>
      </div>

      {/* Metrics (Grid style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--color-border)] bg-[var(--color-border)] gap-[1px]">
        <div className="bg-white p-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] block mb-1">Total Lotes Elaborados</span>
          <span className="text-3xl font-extrabold text-black tabular-nums">{production.length}</span>
        </div>
        <div className="bg-white p-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] block mb-1">Bebidas Elaboradas</span>
          <span className="text-3xl font-extrabold text-black tabular-nums">
            {production.reduce((acc, p) => acc + p.qty, 0)} uds
          </span>
        </div>
      </div>

      {/* Batch history table */}
      <div className="table-container">
        <table className="antojo-table">
          <thead>
            <tr>
              <th>ID Lote</th>
              <th>Fecha</th>
              <th>Producto Elaborado</th>
              <th className="text-right">Cantidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {production.map((batch) => (
              <tr key={batch.id}>
                <td className="font-extrabold tracking-tight text-black">{batch.id}</td>
                <td className="text-[var(--color-text-secondary)] font-medium">{batch.date}</td>
                <td className="font-extrabold text-black">{batch.productName}</td>
                <td className="text-right font-extrabold text-black tabular-nums">{batch.qty} uds</td>
                <td>
                  <span className="badge badge-success">Confirmado</span>
                </td>
              </tr>
            ))}
            {production.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-[var(--color-text-muted)] font-medium">
                  No hay lotes de producción registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Production Lot Modal */}
      {modalOpen && (
        <div className="modal-overlay flex items-center justify-center p-4">
          <div className="modal-content relative text-left">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-black"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-black mb-6 uppercase tracking-tight">Iniciar Lote de Producción</h3>

            {successMsg ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center">
                  <Check size={20} />
                </div>
                <p className="text-sm font-bold text-black">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="flex items-center gap-2 p-3 bg-[var(--color-error-bg)] border border-[var(--color-error)] text-[var(--color-error)] text-xs font-bold uppercase tracking-wide">
                    <AlertCircle size={14} className="flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="form-group">
                  <label className="label">Bebida a Producir</label>
                  <select
                    required
                    value={selectedProductName}
                    onChange={(e) => setSelectedProductName(e.target.value)}
                    className="input-base bg-[var(--color-canvas)]"
                  >
                    <option value="">-- Elige --</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="label">Cantidad a Elaborar (Uds)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="input-base"
                  />
                </div>

                <span className="text-[10px] text-[var(--color-text-muted)] block font-medium">
                  Nota: El sistema evaluará el inventario actual de matcha, endulzante, vasos y leches antes de confirmar. Si hay desabasto, impedirá la producción.
                </span>

                <div className="pt-4 border-t border-[var(--color-border)] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Elaborar Lote
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
