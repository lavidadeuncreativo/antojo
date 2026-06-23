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
    <div className="space-y-6 text-left select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h2 className="text-xl font-bold text-white">Catálogo de Bebidas</h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Define las bebidas de ANTOJO, sus recetas operativas, costos y rentabilidad.
          </p>
        </div>

        <button onClick={handleCreateClick} className="btn btn-primary self-start">
          <Plus size={16} />
          Crear Producto
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="surface-card p-4 text-left">
          <span className="text-[9px] text-[var(--color-text-muted)] uppercase block">Productos Activos</span>
          <span className="text-lg font-bold text-white tabular-nums">{products.length}</span>
        </div>
        <div className="surface-card p-4 text-left">
          <span className="text-[9px] text-[var(--color-text-muted)] uppercase block">Margen Promedio</span>
          <span className="text-lg font-bold text-white tabular-nums">
            {products.length > 0
              ? Math.round(products.reduce((acc, p) => acc + p.margin, 0) / products.length)
              : 0}
            %
          </span>
        </div>
      </div>

      {/* Grid Bento of Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-[var(--color-accent)] tracking-wider">
                  Bebida Terminado
                </span>
                <button
                  onClick={() => handleEditClick(product)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-white transition-all"
                  title="Editar Receta"
                >
                  <Edit3 size={11} />
                </button>
              </div>

              <h3 className="text-base font-bold text-white mt-2">{product.name}</h3>

              {/* Costing values */}
              <div className="flex items-center gap-4 mt-3 pb-3 border-b border-white/5">
                <div className="text-left">
                  <span className="text-[8px] text-[var(--color-text-muted)] block uppercase">Precio</span>
                  <span className="text-sm font-bold text-white tabular-nums">{formatCurrency(product.price)}</span>
                </div>
                <div className="text-left">
                  <span className="text-[8px] text-[var(--color-text-muted)] block uppercase">Costo Receta</span>
                  <span className="text-sm font-bold text-[var(--color-text-secondary)] tabular-nums">{formatCurrency(product.cost)}</span>
                </div>
                <div className="text-left">
                  <span className="text-[8px] text-[var(--color-text-muted)] block uppercase">Margen</span>
                  <span className="text-sm font-bold text-[var(--color-success)] tabular-nums">{product.margin}%</span>
                </div>
              </div>

              {/* Recipe Ingredients list */}
              <div className="mt-4 text-left">
                <span className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block mb-2">
                  Receta / Composición
                </span>
                <div className="space-y-1">
                  {product.recipe.map((r, idx) => {
                    const ing = inventory.find((i) => i.id === r.ingredientId);
                    return (
                      <div key={idx} className="flex justify-between text-xs text-[var(--color-text-secondary)]">
                        <span>{ing ? ing.name : "Ingrediente"}</span>
                        <span className="font-bold tabular-nums">
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

            <div className="text-xs text-[var(--color-text-muted)] text-right pt-2 border-t border-white/5">
              Costo de empaque y vasos incluidos.
            </div>
          </div>
        ))}
      </div>

      {/* Modal Recipe Form */}
      {modalOpen && (
        <div className="modal-overlay flex items-center justify-center p-4">
          <div className="modal-content relative text-left max-w-lg">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-base font-bold text-white mb-6">
              {editingId ? "Editar Producto" : "Crear Nuevo Producto"}
            </h3>

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
                  <div className="max-h-[160px] overflow-y-auto border border-white/5 rounded-lg p-3 space-y-2.5 bg-black/10">
                    {inventory.map((ing) => {
                      const currentQty = selectedIngredients[ing.id] || "";
                      return (
                        <div key={ing.id} className="flex items-center justify-between gap-4">
                          <span className="text-xs text-white flex-1">{ing.name} ({ing.unit})</span>
                          <input
                            type="number"
                            placeholder="Cantidad"
                            value={currentQty}
                            onChange={(e) => handleIngredientQtyChange(ing.id, e.target.value)}
                            className="input-base py-1 px-2 text-xs w-24 text-right"
                            min={0}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <span className="text-[10px] text-[var(--color-text-muted)] block">
                    Define la cantidad de mililitros o gramos que consume una sola unidad de esta bebida.
                  </span>
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
