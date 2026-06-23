"use client";

import { useState } from "react";
import { useGlobalState } from "@/lib/state";
import { Plus, X, Check, AlertTriangle, History } from "lucide-react";

export default function InventarioPage() {
  const { inventory, movements, addInventoryMovement } = useGlobalState();

  const [activeTab, setActiveTab] = useState<"items" | "movements">("items");
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [selectedItemId, setSelectedItemId] = useState("");
  const [qty, setQty] = useState(0);
  const [type, setType] = useState<"entrada" | "salida">("salida");
  const [reason, setReason] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const selectedItem = inventory.find((i) => i.id === selectedItemId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemId || qty <= 0 || !reason) return;

    // Apply movement
    addInventoryMovement({
      itemName: selectedItem!.name,
      type,
      qty,
      reason,
    });

    // Manually mutate stock
    selectedItem!.stock =
      type === "entrada"
        ? selectedItem!.stock + qty
        : Math.max(0, selectedItem!.stock - qty);

    setSuccessMsg("¡Ajuste de inventario guardado!");
    setSelectedItemId("");
    setQty(0);
    setReason("");

    setTimeout(() => {
      setSuccessMsg("");
      setModalOpen(false);
    }, 1200);
  };

  const alertItems = inventory.filter((item) => item.stock <= item.min_stock);

  return (
    <div className="space-y-8 text-left select-none max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-black uppercase">
            ALMACÉN E <span className="font-light italic text-[var(--color-text-secondary)]">inventario.</span>
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">
            Supervisa el stock de materia prima y audita sus movimientos de entrada/salida.
          </p>
        </div>

        <button onClick={() => setModalOpen(true)} className="btn btn-primary self-start">
          <Plus size={14} />
          Ajustar Existencia
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)]">
        <button
          onClick={() => setActiveTab("items")}
          className={`px-4 py-2 text-xs font-bold border-b-2 uppercase tracking-wider transition-all ${
            activeTab === "items"
              ? "border-black text-black"
              : "border-transparent text-[var(--color-text-secondary)] hover:text-black"
          }`}
        >
          Materia Prima
        </button>
        <button
          onClick={() => setActiveTab("movements")}
          className={`px-4 py-2 text-xs font-bold border-b-2 uppercase tracking-wider transition-all flex items-center gap-1.5 ${
            activeTab === "movements"
              ? "border-black text-black"
              : "border-transparent text-[var(--color-text-secondary)] hover:text-black"
          }`}
        >
          <History size={12} />
          Historial Auditado
        </button>
      </div>

      {activeTab === "items" ? (
        <div className="space-y-6">
          {/* Alerts bar */}
          {alertItems.length > 0 && (
            <div className="flex items-center gap-3 p-4 bg-[var(--color-error-bg)] border border-[var(--color-error)] text-[var(--color-error)] text-xs font-bold uppercase tracking-wide">
              <AlertTriangle size={16} className="flex-shrink-0" />
              <div>
                Alerta de Existencias: Hay {alertItems.length} insumos por debajo del stock mínimo de seguridad.
              </div>
            </div>
          )}

          {/* Grid Bento of raw materials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {inventory.map((item) => {
              const isLow = item.stock <= item.min_stock;
              return (
                <div key={item.id} className="card p-5 text-left flex flex-col justify-between min-h-[140px] border border-[var(--color-border)] bg-white rounded-none">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                        Insumo Base
                      </span>
                      {isLow && (
                        <span className="text-[9px] font-bold text-[var(--color-error)] bg-[var(--color-error-bg)] px-2 py-0.5 border border-[var(--color-error)]">
                          Stock Bajo
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-extrabold text-black mt-2 leading-tight tracking-tight">{item.name}</h3>
                  </div>

                  <div className="flex items-baseline justify-between border-t border-[var(--color-border)] pt-3 mt-3">
                    <span className="text-2xl font-extrabold text-black tabular-nums">
                      {item.stock}{" "}
                      <span className="text-xs font-normal text-[var(--color-text-secondary)]">
                        {item.unit}
                      </span>
                    </span>
                    <span className="text-[9px] text-[var(--color-text-muted)] font-bold uppercase tracking-wide">
                      Min: {item.min_stock} {item.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Movements Audit Ledger view */
        <div className="table-container">
          <table className="antojo-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Insumo</th>
                <th>Tipo</th>
                <th className="text-right">Cantidad</th>
                <th>Motivo / Auditoría</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((mov) => (
                <tr key={mov.id}>
                  <td className="text-[var(--color-text-secondary)] font-medium">{mov.date}</td>
                  <td className="font-extrabold text-black">{mov.itemName}</td>
                  <td>
                    <span
                      className={`badge ${
                        mov.type === "entrada" ? "badge-success" : "badge-error"
                      }`}
                    >
                      {mov.type === "entrada" ? "Entrada" : "Salida"}
                    </span>
                  </td>
                  <td className="text-right font-extrabold text-black tabular-nums">{mov.qty}</td>
                  <td className="italic text-[var(--color-text-secondary)] font-medium">{mov.reason}</td>
                </tr>
              ))}
              {movements.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-[var(--color-text-muted)] font-medium">
                    No se registran movimientos en la bitácora.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Adjust Inventory modal */}
      {modalOpen && (
        <div className="modal-overlay flex items-center justify-center p-4">
          <div className="modal-content relative text-left">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-black"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-black mb-6 uppercase tracking-tight">Ajustar Existencia Manual</h3>

            {successMsg ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center">
                  <Check size={20} />
                </div>
                <p className="text-sm font-bold text-black">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                  <label className="label">Seleccionar Insumo</label>
                  <select
                    required
                    value={selectedItemId}
                    onChange={(e) => setSelectedItemId(e.target.value)}
                    className="input-base bg-[var(--color-canvas)]"
                  >
                    <option value="">-- Elige --</option>
                    {inventory.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} (Stock: {item.stock} {item.unit})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="label">Tipo de Movimiento</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as "entrada" | "salida")}
                      className="input-base bg-[var(--color-canvas)]"
                    >
                      <option value="salida">Salida (Merma / Consumo)</option>
                      <option value="entrada">Entrada (Ajuste / Carga)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="label">Cantidad ({selectedItem ? selectedItem.unit : ""})</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={qty || ""}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="input-base"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="label">Motivo (Auditoría)</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Consumo por derrame, conteo físico semanal..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="input-base"
                  />
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar Ajuste
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
