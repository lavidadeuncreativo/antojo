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
    <div className="space-y-8 text-left select-none max-w-7xl mx-auto">
      
      {/* Header section with clean flat stats */}
      <div className="pt-14 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)]">
        <div>
          <span className="label-micro block mb-3">Gestión Operativa</span>
          <h1 className="hero-title">
            REGISTRO DE <span className="italic-light">ventas.</span>
          </h1>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary self-start md:self-end"
        >
          <Plus size={14} strokeWidth={2.5} />
          Registrar Venta
        </button>
      </div>

      {/* Mini metric bar (Editorial Flat Cells) */}
      <div className="editorial-grid editorial-grid-2">
        <div className="editorial-cell">
          <span className="kpi-label">Total Transacciones</span>
          <div className="kpi-value tabular-nums">{sales.length}</div>
        </div>
        <div className="editorial-cell">
          <span className="kpi-label">Ticket Promedio</span>
          <div className="kpi-value tabular-nums">
            {formatCurrency(
              sales.length > 0
                ? sales.reduce((acc, s) => acc + s.total, 0) / sales.length
                : 0
            )}
          </div>
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
                <th className="text-right">Total</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: 0, border: 'none' }}>
                    <div className="empty-state border-0 border-b border-[var(--color-border)]">
                      <ShoppingCart size={32} className="empty-state__icon" strokeWidth={1.5} />
                      <span className="empty-state__label">Sin transacciones</span>
                      <p className="empty-state__text">No hay ventas que coincidan con la búsqueda actual.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="font-bold tracking-tight text-black">{sale.folio}</td>
                    <td>
                      <span className="font-bold text-black">{sale.customer}</span>
                    </td>
                    <td>
                      <span className="badge badge-neutral">{sale.channel}</span>
                    </td>
                    <td>
                      {sale.items.map((it, idx) => (
                        <div key={idx} className="text-sm font-bold text-black py-0.5">
                          {it.qty}x {it.name}
                        </div>
                      ))}
                    </td>
                    <td className="text-right font-black text-black tabular-nums">
                      {formatCurrency(sale.total)}
                    </td>
                    <td className="text-[var(--color-text-secondary)] font-bold text-xs">{sale.time}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Sale Modal */}
      {modalOpen && (
        <div className="modal-overlay flex items-center justify-center p-4 z-[100] animate-fade-in">
          <div className="modal-content relative text-left animate-slide-up bg-white">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] hover:text-black transition-colors"
            >
              <X size={16} strokeWidth={2} />
            </button>

            <h3 className="section-title">Registrar Nueva Venta</h3>

            {successMsg ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-slide-up">
                <div className="w-16 h-16 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center ring-8 ring-[var(--color-success-bg)]/30">
                  <Check size={28} strokeWidth={3} />
                </div>
                <p className="text-base font-bold text-black tracking-tight">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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

                <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[var(--color-text-muted)] block uppercase font-bold">
                      Total a Cobrar
                    </span>
                    <span className="text-xl font-extrabold text-black tabular-nums">
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
