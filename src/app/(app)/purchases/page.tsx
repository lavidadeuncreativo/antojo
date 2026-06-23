"use client";

import { useState } from "react";
import { useGlobalState } from "@/lib/state";
import { formatCurrency } from "@/lib/utils";
import { Plus, X, Check, ShoppingBag } from "lucide-react";

export default function ComprasPage() {
  const { purchases, inventory, addPurchase } = useGlobalState();

  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [selectedItemName, setSelectedItemName] = useState("");
  const [qty, setQty] = useState(0);
  const [cost, setCost] = useState(0);
  const [provider, setProvider] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemName || qty <= 0 || cost <= 0 || !provider) return;

    addPurchase({
      itemName: selectedItemName,
      qty,
      cost,
      provider,
    });

    setSuccessMsg("¡Compra e ingreso a inventario registrados!");
    setSelectedItemName("");
    setQty(0);
    setCost(0);
    setProvider("");

    setTimeout(() => {
      setSuccessMsg("");
      setModalOpen(false);
    }, 1200);
  };

  const selectedItem = inventory.find((i) => i.name === selectedItemName);

  return (
    <div className="space-y-6 text-left select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h2 className="text-xl font-bold text-white">Registro de Compras</h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Abastece tu inventario de insumos y registra los costos operacionales del negocio.
          </p>
        </div>

        <button onClick={() => setModalOpen(true)} className="btn btn-primary self-start">
          <Plus size={16} />
          Registrar Compra
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="surface-card p-4 text-left">
          <span className="text-[9px] text-[var(--color-text-muted)] uppercase block">Órdenes de Compra</span>
          <span className="text-lg font-bold text-white tabular-nums">{purchases.length}</span>
        </div>
        <div className="surface-card p-4 text-left">
          <span className="text-[9px] text-[var(--color-text-muted)] uppercase block">Egreso Acumulado</span>
          <span className="text-lg font-bold text-white tabular-nums">
            {formatCurrency(purchases.reduce((acc, p) => acc + p.cost, 0))}
          </span>
        </div>
      </div>

      {/* Table of purchases */}
      <div className="table-container">
        <table className="antojo-table">
          <thead>
            <tr>
              <th>ID Compra</th>
              <th>Fecha</th>
              <th>Insumo Adquirido</th>
              <th>Cantidad</th>
              <th>Costo Total</th>
              <th>Proveedor</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p) => (
              <tr key={p.id}>
                <td className="font-bold text-[var(--color-accent)]">{p.id}</td>
                <td className="text-[var(--color-text-secondary)]">{p.date}</td>
                <td className="font-semibold text-white">{p.itemName}</td>
                <td className="tabular-nums font-bold">{p.qty}</td>
                <td className="font-bold text-white tabular-nums">{formatCurrency(p.cost)}</td>
                <td className="text-[var(--color-text-secondary)]">{p.provider}</td>
              </tr>
            ))}
            {purchases.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-[var(--color-text-muted)]">
                  No hay registros de compras.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Purchase Modal */}
      {modalOpen && (
        <div className="modal-overlay flex items-center justify-center p-4">
          <div className="modal-content relative text-left">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-base font-bold text-white mb-6">Registrar Nueva Compra</h3>

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
                  <label className="label">Seleccionar Insumo a Cargar</label>
                  <select
                    required
                    value={selectedItemName}
                    onChange={(e) => setSelectedItemName(e.target.value)}
                    className="input-base bg-[var(--color-canvas)]"
                  >
                    <option value="">-- Elige --</option>
                    {inventory.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name} ({item.unit})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
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

                  <div className="form-group">
                    <label className="label">Costo Total ($)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={cost || ""}
                      onChange={(e) => setCost(Number(e.target.value))}
                      className="input-base"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="label">Proveedor</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Distribuidora EcoPack"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="input-base"
                  />
                </div>

                <span className="text-[10px] text-[var(--color-text-muted)] block">
                  Nota: Registrar esta compra aumentará de forma inmediata las existencias del insumo en el módulo de Inventario y afectará el flujo de egresos en Finanzas.
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
                    Registrar Compra
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
