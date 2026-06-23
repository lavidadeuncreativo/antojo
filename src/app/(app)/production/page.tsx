"use client";

import { useState } from "react";
import { useGlobalState } from "@/lib/state";
import { Plus, X, Check, AlertCircle, FlaskConical } from "lucide-react";

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
    <div className="space-y-6 text-left select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h2 className="text-xl font-bold text-white">Lotes de Producción</h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Registra la elaboración de bebidas frías listas para venta y descuenta insumos.
          </p>
        </div>

        <button onClick={() => setModalOpen(true)} className="btn btn-primary self-start">
          <Plus size={16} />
          Iniciar Lote
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="surface-card p-4 text-left">
          <span className="text-[9px] text-[var(--color-text-muted)] uppercase block">Total Lotes Elaborados</span>
          <span className="text-lg font-bold text-white tabular-nums">{production.length}</span>
        </div>
        <div className="surface-card p-4 text-left">
          <span className="text-[9px] text-[var(--color-text-muted)] uppercase block">Bebidas Elaboradas</span>
          <span className="text-lg font-bold text-white tabular-nums">
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
              <th>Cantidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {production.map((batch) => (
              <tr key={batch.id}>
                <td className="font-bold text-[var(--color-accent)]">{batch.id}</td>
                <td className="text-[var(--color-text-secondary)]">{batch.date}</td>
                <td className="font-semibold text-white">{batch.productName}</td>
                <td className="font-bold tabular-nums">{batch.qty} uds</td>
                <td>
                  <span className="badge badge-success">Confirmado / En Stock</span>
                </td>
              </tr>
            ))}
            {production.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-[var(--color-text-muted)]">
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
              className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-base font-bold text-white mb-6">Iniciar Lote de Producción</h3>

            {successMsg ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center">
                  <Check size={24} />
                </div>
                <p className="text-sm font-semibold text-white">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="flex items-center gap-2 p-3 bg-[var(--color-error-bg)] border border-[var(--color-error)]/20 rounded-xl text-[var(--color-error)] text-xs">
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

                <span className="text-[10px] text-[var(--color-text-muted)] block">
                  Nota: El sistema evaluará el inventario actual de matcha, endulzante, vasos y leches antes de confirmar. Si hay desabasto, impedirá la producción.
                </span>

                <div className="pt-4 border-t border-white/5 flex justify-end gap-2">
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
