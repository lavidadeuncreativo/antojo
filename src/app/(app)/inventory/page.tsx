"use client";

import { useState } from "react";
import { useGlobalState } from "@/lib/state";
import { Plus, X, Check, AlertTriangle, History } from "lucide-react";

export default function InventarioPage() {
  const { inventory, movements, addInventoryMovement, addPurchase } = useGlobalState();

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
    <div className="space-y-6 text-left select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h2 className="text-xl font-bold text-white">Gestión de Inventario</h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Supervisa el stock de materia prima y audita sus movimientos de entrada/salida.
          </p>
        </div>

        <button onClick={() => setModalOpen(true)} className="btn btn-primary self-start">
          <Plus size={16} />
          Ajustar Existencia
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5">
        <button
          onClick={() => setActiveTab("items")}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${
            activeTab === "items"
              ? "border-[var(--color-accent)] text-white"
              : "border-transparent text-[var(--color-text-secondary)] hover:text-white"
          }`}
        >
          Materia Prima
        </button>
        <button
          onClick={() => setActiveTab("movements")}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === "movements"
              ? "border-[var(--color-accent)] text-white"
              : "border-transparent text-[var(--color-text-secondary)] hover:text-white"
          }`}
        >
          <History size={13} />
          Historial Auditado
        </button>
      </div>

      {activeTab === "items" ? (
        <div className="space-y-6">
          {/* Alerts bar */}
          {alertItems.length > 0 && (
            <div className="flex items-center gap-3 p-4 bg-[var(--color-error-bg)] border border-[var(--color-error)]/20 rounded-2xl text-[var(--color-error)] text-xs">
              <AlertTriangle size={16} className="flex-shrink-0" />
              <div>
                <span className="font-bold">Alerta de Existencias:</span> Hay {alertItems.length} insumos por debajo del stock mínimo de seguridad.
              </div>
            </div>
          )}

          {/* Grid Bento of raw materials */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {inventory.map((item) => {
              const isLow = item.stock <= item.min_stock;
              return (
                <div key={item.id} className="card p-5 text-left flex flex-col justify-between min-h-[130px]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase">
                        Insumo Base
                      </span>
                      {isLow && (
                        <span className="text-[9px] font-bold text-[var(--color-error)] bg-[var(--color-error-bg)] px-2 py-0.5 rounded">
                          Stock Bajo
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1.5">{item.name}</h3>
                  </div>

                  <div className="flex items-baseline justify-between border-t border-white/5 pt-3 mt-3">
                    <span className="text-2xl font-bold text-white tabular-nums">
                      {item.stock}{" "}
                      <span className="text-xs font-normal text-[var(--color-text-muted)]">
                        {item.unit}
                      </span>
                    </span>
                    <span className="text-[9px] text-[var(--color-text-muted)] font-medium">
                      Mínimo: {item.min_stock} {item.unit}
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
                <th>Cantidad</th>
                <th>Motivo / Auditoría</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((mov) => (
                <tr key={mov.id}>
                  <td className="text-[var(--color-text-secondary)]">{mov.date}</td>
                  <td className="font-bold text-white">{mov.itemName}</td>
                  <td>
                    <span
                      className={`badge ${
                        mov.type === "entrada" ? "badge-success" : "badge-error"
                      }`}
                    >
                      {mov.type === "entrada" ? "Entrada" : "Salida"}
                    </span>
                  </td>
                  <td className="font-bold tabular-nums">{mov.qty}</td>
                  <td className="italic text-[var(--color-text-secondary)]">{mov.reason}</td>
                </tr>
              ))}
              {movements.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-[var(--color-text-muted)]">
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
              className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-base font-bold text-white mb-6">Ajustar Existencia Manual</h3>

            {successMsg ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center">
                  <Check size={24} />
                </div>
                <p className="text-sm font-semibold text-white">{successMsg}</p>
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

                <div className="pt-4 border-t border-white/5 flex justify-end gap-2">
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
