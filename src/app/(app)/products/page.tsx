"use client";

import { useState } from "react";
import { useGlobalState } from "@/lib/state";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Package, Plus, X, Check, Edit3 } from "lucide-react";

export default function ProductosPage() {
  const { products, inventory, addProduct, updateProduct } = useGlobalState();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [cost, setCost] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState<{ [key: string]: number }>({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleEditClick = (p: typeof products[0]) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price);
    setCost(p.cost);
    
    const recipeMap: { [key: string]: number } = {};
    p.recipe.forEach((r) => {
      recipeMap[r.ingredientId] = r.qty;
    });
    setSelectedIngredients(recipeMap);
    setModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingId(null);
    setName("");
    setPrice(0);
    setCost(0);
    setSelectedIngredients({});
    setModalOpen(true);
  };

  const handleIngredientQtyChange = (ingId: string, value: string) => {
    const qty = Number(value);
    setSelectedIngredients((prev) => {
      if (qty <= 0) {
        const next = { ...prev };
        delete next[ingId];
        return next;
      }
      return { ...prev, [ingId]: qty };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price <= 0) return;

    // Format recipe from form state
    const recipe = Object.entries(selectedIngredients).map(([ingId, qty]) => ({
      ingredientId: ingId,
      qty,
    }));

    // Auto-calculate margin
    const margin = Math.round(((price - cost) / price) * 100);

    const productData = {
      name,
      price,
      cost,
      margin,
      recipe,
    };

    if (editingId) {
      updateProduct(editingId, productData);
      setSuccessMsg("¡Producto actualizado!");
    } else {
      addProduct(productData);
      setSuccessMsg("¡Producto creado con éxito!");
    }

    setTimeout(() => {
      setSuccessMsg("");
      setModalOpen(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 text-left select-none max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="pt-14 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)]">
        <div>
          <span className="label-micro block mb-3">Administración de Menú</span>
          <h1 className="hero-title">
            CATÁLOGO DE <span className="italic-light">bebidas.</span>
          </h1>
        </div>

        <button onClick={handleCreateClick} className="btn btn-primary self-start md:self-end">
          <Plus size={14} strokeWidth={2.5} />
          Crear Producto
        </button>
      </div>

      {/* Metrics (Grid style) */}
      <div className="editorial-grid editorial-grid-2">
        <div className="editorial-cell">
          <span className="kpi-label">Productos Activos</span>
          <div className="kpi-value tabular-nums">{products.length}</div>
        </div>
        <div className="editorial-cell">
          <span className="kpi-label">Margen Promedio</span>
          <div className="kpi-value tabular-nums">
            {products.length > 0
              ? Math.round(products.reduce((acc, p) => acc + p.margin, 0) / products.length)
              : 0}
            <span className="text-[0.6em] ml-1">%</span>
          </div>
        </div>
      </div>

      {/* Grid Bento of Products */}
      <div className="bento-grid">
        {products.length === 0 ? (
          <div className="bento-12 mt-4">
            <div className="empty-state">
              <Package size={32} className="empty-state__icon" strokeWidth={1.5} />
              <span className="empty-state__label">Catálogo Vacío</span>
              <p className="empty-state__text">Aún no hay productos configurados. Agrega nuevas bebidas a tu catálogo.</p>
            </div>
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bento-4 card flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="label-micro">
                    Bebida Terminado
                  </span>
                  <button
                    onClick={() => handleEditClick(product)}
                    className="btn-icon btn-ghost"
                    title="Editar Receta"
                  >
                    <Edit3 size={15} strokeWidth={2} />
                  </button>
                </div>

                <h3 className="display-title mt-2">{product.name}</h3>

                {/* Costing values */}
                <div className="flex items-center gap-4 mt-3 pb-3 border-b border-[var(--color-border)]">
                  <div className="text-left">
                    <span className="text-[10px] text-[var(--color-text-muted)] block uppercase font-extrabold tracking-widest">Precio</span>
                    <span className="text-sm font-extrabold text-black tabular-nums">{formatCurrency(product.price)}</span>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-[var(--color-text-muted)] block uppercase font-extrabold tracking-widest">Costo</span>
                    <span className="text-sm font-bold text-[var(--color-text-secondary)] tabular-nums">{formatCurrency(product.cost)}</span>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-[var(--color-text-muted)] block uppercase font-extrabold tracking-widest">Margen</span>
                    <span className="text-sm font-extrabold text-black tabular-nums">{product.margin}%</span>
                  </div>
                </div>

                {/* Recipe Ingredients list */}
                <div className="mt-4 text-left">
                  <span className="text-[9px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider block mb-2">
                    Receta / Composición
                  </span>
                  <div className="space-y-1">
                    {product.recipe.map((r, idx) => {
                      const ing = inventory.find((i) => i.id === r.ingredientId);
                      return (
                        <div key={idx} className="flex justify-between text-xs text-[var(--color-text-secondary)] font-medium">
                          <span>{ing ? ing.name : "Ingrediente"}</span>
                          <span className="font-bold text-black tabular-nums">
                            {r.qty} {ing ? ing.unit : ""}
                          </span>
                        </div>
                      );
                    })}
                    {product.recipe.length === 0 && (
                      <span className="text-xs text-[var(--color-text-muted)] italic">
                        Sin receta definida.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-[var(--color-text-muted)] text-right pt-2 border-t border-[var(--color-border)] font-bold uppercase tracking-wider">
                Vasos y empaques integrados.
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Recipe Form */}
      {modalOpen && (
        <div className="modal-overlay flex items-center justify-center p-4 z-[100] animate-fade-in">
          <div className="modal-content relative text-left max-w-lg animate-slide-up bg-white">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] hover:text-black transition-colors"
            >
              <X size={16} strokeWidth={2} />
            </button>

            <h3 className="section-title">
              {editingId ? "Editar Producto" : "Crear Nuevo Producto"}
            </h3>

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
                  <label className="label">Nombre del Producto</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Matcha Latte Frapé"
                    className="input-base"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="label">Precio de Venta ($)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="input-base"
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Costo Estimado Insumos ($)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={cost}
                      onChange={(e) => setCost(Number(e.target.value))}
                      className="input-base"
                    />
                  </div>
                </div>

                {/* Recipe builder section */}
                <div className="space-y-3">
                  <label className="label">Composición de Receta (Deducción Automática)</label>
                  <div className="max-h-[160px] overflow-y-auto border border-[var(--color-border)] p-3 space-y-2.5 bg-[var(--color-surface)] rounded-md">
                    {inventory.map((ing) => {
                      const currentQty = selectedIngredients[ing.id] || "";
                      return (
                        <div key={ing.id} className="flex items-center justify-between gap-4">
                          <span className="text-xs text-black font-semibold flex-1">{ing.name} ({ing.unit})</span>
                          <input
                            type="number"
                            placeholder="Cantidad"
                            value={currentQty}
                            onChange={(e) => handleIngredientQtyChange(ing.id, e.target.value)}
                            className="input-base py-1.5 px-3 text-xs w-28 text-right bg-white"
                            min={0}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <span className="text-[10px] text-[var(--color-text-muted)] block font-medium">
                    Define la cantidad de mililitros o gramos que consume una sola unidad de esta bebida.
                  </span>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingId ? "Actualizar" : "Crear Producto"}
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
