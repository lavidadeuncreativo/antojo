"use client";

import { useState } from "react";
import { useGlobalState } from "@/lib/state";
import { formatCurrency } from "@/lib/utils";
import { ShoppingCart, Plus, Search, X, Check } from "lucide-react";

export default function VentasPage() {
  const { sales, products, addSale } = useGlobalState();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // New sale form state
  const [customer, setCustomer] = useState("");
  const [channel, setChannel] = useState("Instagram");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [qty, setQty] = useState(1);
  const [successMsg, setSuccessMsg] = useState("");

  const filteredSales = sales.filter(
    (s) =>
      s.customer.toLowerCase().includes(search.toLowerCase()) ||
      s.folio.toLowerCase().includes(search.toLowerCase()) ||
      s.channel.toLowerCase().includes(search.toLowerCase())
  );

  const activeProduct = products.find((p) => p.id === selectedProductId);
  const price = activeProduct ? activeProduct.price : 0;
  const total = price * qty;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer || !selectedProductId || qty <= 0) return;

    addSale({
      customer,
      channel,
      total,
      items: [
        {
          productId: selectedProductId,
          name: activeProduct!.name,
          qty,
          price,
        },
      ],
    });

    setCustomer("");
    setSelectedProductId("");
    setQty(1);
    setSuccessMsg("¡Venta registrada con éxito!");
    setTimeout(() => {
      setSuccessMsg("");
      setModalOpen(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 text-left select-none">
      
      {/* Header section with clean flat stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h2 className="text-xl font-bold text-white">Registro de Ventas</h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Visualiza y genera las ventas de bebidas y despachos diarios.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary self-start"
        >
          <Plus size={16} />
          Registrar Venta
        </button>
      </div>

      {/* Mini metric bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="surface-card p-4 text-left">
          <span className="text-[9px] text-[var(--color-text-muted)] uppercase block">Total Transacciones</span>
          <span className="text-lg font-bold text-white tabular-nums">{sales.length}</span>
        </div>
        <div className="surface-card p-4 text-left">
          <span className="text-[9px] text-[var(--color-text-muted)] uppercase block">Ticket Promedio</span>
          <span className="text-lg font-bold text-white tabular-nums">
            {formatCurrency(
              sales.length > 0
                ? sales.reduce((acc, s) => acc + s.total, 0) / sales.length
                : 0
            )}
          </span>
        </div>
      </div>

      {/* Filter and Table area */}
      <div className="space-y-4">
        <div className="relative max-w-sm">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
          />
          <input
            type="text"
            placeholder="Buscar por cliente, folio o canal..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-base pl-9"
          />
        </div>

        {/* Table representation */}
        <div className="table-container">
          <table className="antojo-table">
            <thead>
              <tr>
                <th>Folio</th>
                <th>Cliente</th>
                <th>Canal</th>
                <th>Artículos</th>
                <th>Total</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale.id}>
                  <td className="font-bold text-[var(--color-accent)]">{sale.folio}</td>
                  <td className="font-semibold">{sale.customer}</td>
                  <td>
                    <span className="badge badge-neutral">{sale.channel}</span>
                  </td>
                  <td>
                    {sale.items.map((it, idx) => (
                      <div key={idx} className="text-xs">
                        {it.qty}x {it.name}
                      </div>
                    ))}
                  </td>
                  <td className="font-bold text-white tabular-nums">
                    {formatCurrency(sale.total)}
                  </td>
                  <td className="text-[var(--color-text-secondary)]">{sale.time}</td>
                </tr>
              ))}
              {filteredSales.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-[var(--color-text-muted)]">
                    No se encontraron transacciones registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Sale Glass Modal */}
      {modalOpen && (
        <div className="modal-overlay flex items-center justify-center p-4">
          <div className="modal-content relative text-left">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-base font-bold text-white mb-6">Registrar Nueva Venta</h3>

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
                  <label className="label">Nombre del Cliente</label>
                  <input
                    type="text"
                    required
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    placeholder="Ej. Sofía Ramírez"
                    className="input-base"
                  />
                </div>

                <div className="form-group">
                  <label className="label">Canal de Venta</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="input-base bg-[var(--color-canvas)]"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Calle directa">Calle directa</option>
                    <option value="Eventos">Eventos</option>
                    <option value="Mayoreo">Mayoreo</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="label">Seleccionar Bebida</label>
                    <select
                      required
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="input-base bg-[var(--color-canvas)]"
                    >
                      <option value="">-- Elige --</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} (${p.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="label">Cantidad (Uds)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="input-base"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[var(--color-text-muted)] block uppercase">
                      Total a Cobrar
                    </span>
                    <span className="text-lg font-bold text-[var(--color-accent)] tabular-nums">
                      {formatCurrency(total)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="btn btn-secondary"
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Registrar Venta
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
