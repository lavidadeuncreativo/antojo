"use client";

import { useGlobalState } from "@/lib/state";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";

export function DashboardClient({ data }: { data?: any }) {
  const { products, sales, purchases, inventory, monthlyGoal } = useGlobalState();

  // Calculations
  const totalSalesVal = sales.reduce((acc, s) => acc + s.total, 0);
  const totalExpensesVal = purchases.reduce((acc, p) => acc + p.cost, 0);
  
  const estimatedProfitVal = sales.reduce((acc, s) => {
    let saleProfit = 0;
    s.items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      const cost = prod ? prod.cost : item.price * 0.4;
      saleProfit += (item.price - cost) * item.qty;
    });
    return acc + saleProfit;
  }, 0);

  const goalPercent = Math.min(100, Math.round((totalSalesVal / monthlyGoal.goal) * 100));

  // Helper component for flavor can
  const BeverageCan = ({ productId }: { productId: string }) => {
    let color = "#1E6B35"; // Matcha Green
    let label = "MATCHA";
    if (productId === "p2") { color = "#D66B7C"; label = "PÓCIMA"; } // Fresa Pink
    else if (productId === "p3") { color = "#D4AF37"; label = "C. BREW"; } // Yellow
    else if (productId === "p4") { color = "#7B68EE"; label = "MOJITO"; } // Purple/Blue

    return (
      <svg width="50" height="90" viewBox="0 0 50 90" className="mx-auto my-3 select-none pointer-events-none drop-shadow-sm">
        {/* Can lid */}
        <ellipse cx="25" cy="6" rx="16" ry="3" fill="#CCCCCC" stroke="#999999" strokeWidth="0.5" />
        <ellipse cx="25" cy="4" rx="11" ry="1.5" fill="#E5E5E5" />
        {/* Can body */}
        <rect x="9" y="6" width="32" height="78" fill={color} rx="1.5" />
        {/* Can bottom */}
        <path d="M 9 84 Q 25 88 41 84 L 41 85 Q 25 89 9 85 Z" fill="#CCCCCC" />
        {/* Label banner */}
        <rect x="9" y="30" width="32" height="30" fill="#FFFFFF" opacity="0.9" />
        <text x="25" y="47" fontSize="6" fontWeight="900" fill="#000000" textAnchor="middle" letterSpacing="0.05em">
          {label}
        </text>
        <text x="25" y="55" fontSize="4" fontWeight="700" fill="#666666" textAnchor="middle">
          ANTOJO
        </text>
        {/* Highlight sheen */}
        <rect x="11" y="6" width="3" height="78" fill="#FFFFFF" opacity="0.1" />
      </svg>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 select-none text-left">
      {/* ── Title Header ── */}
      <div className="py-6 border-b border-[var(--color-border)] flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black uppercase">
            OPERACIÓN <span className="font-light italic text-[var(--color-text-secondary)]">diaria.</span>
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-semibold uppercase tracking-wider">
            ERP de Cobros & Bebidas Frías • ANTOJO OS
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
          <span>Progreso Meta:</span>
          <span className="text-black tabular-nums">{goalPercent}% ({formatCurrency(totalSalesVal, { compact: true })} / {formatCurrency(monthlyGoal.goal, { compact: true })})</span>
        </div>
      </div>

      {/* ── Swiss Grid Metric Panels (3 metrics, 1px border grid) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-y border-[var(--color-border)] bg-[var(--color-border)] gap-[1px]">
        <div className="bg-white p-8 text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] block mb-1">Ingresos de Ventas</span>
          <div className="metric-value text-black">
            {formatNumber(totalSalesVal, 2)}
            <span className="currency">$</span>
          </div>
          <span className="text-[10px] text-green-700 font-bold mt-1 block">↑ flujo de entrada activo</span>
        </div>
        
        <div className="bg-white p-8 text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] block mb-1">Egresos de Compras</span>
          <div className="metric-value text-black">
            {formatNumber(totalExpensesVal, 2)}
            <span className="currency">$</span>
          </div>
          <span className="text-[10px] text-red-600 font-bold mt-1 block">↓ egreso de insumos</span>
        </div>

        <div className="bg-white p-8 text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] block mb-1">Caja Chica / Utilidad</span>
          <div className="metric-value text-black">
            {formatNumber(estimatedProfitVal, 2)}
            <span className="currency">$</span>
          </div>
          <span className="text-[10px] text-black font-bold mt-1 block">★ margen operativo positivo</span>
        </div>
      </div>

      {/* ── Product Catalog Section ── */}
      <div className="space-y-6">
        <div className="flex items-baseline justify-between border-b border-[var(--color-border)] pb-3">
          <h2 className="text-xl font-bold uppercase tracking-tighter text-black">
            Catálogo de <span className="font-light italic text-[var(--color-text-secondary)]">bebidas.</span>
          </h2>
          <Link href="/products" className="text-xs font-bold text-black hover:underline uppercase tracking-wider flex items-center gap-1">
            Recetas y Productos <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod) => {
            // Map backgrounds
            let bgClass = "card-original"; // default
            let flavorName = "Bebida";
            if (prod.id === "p1") {
              bgClass = "card-mint"; // Matcha Light Green
              flavorName = "MATCHA LATTE";
            } else if (prod.id === "p2") {
              bgClass = "card-hibiscus"; // Pócima Fresa Light Pink
              flavorName = "PÓCIMA FRESA";
            } else if (prod.id === "p3") {
              bgClass = "card-passion"; // Cold Brew Light Yellow
              flavorName = "COLD BREW";
            } else if (prod.id === "p4") {
              bgClass = "card-ginger"; // Mojito Light Purple/Blue (ginger/orange token in globals.css)
              flavorName = "MOJITO MEZCAL";
            }

            return (
              <div
                key={prod.id}
                className={`card-interactive relative flex flex-col justify-between p-6 overflow-hidden rounded-[28px] ${bgClass} transition-all duration-300 hover:-translate-y-1 h-[320px] border border-black/5`}
              >
                <div className="text-left">
                  <span className="text-[10px] font-extrabold tracking-widest text-black/50 uppercase block mb-1">
                    {flavorName}
                  </span>
                  <h3 className="text-[17px] font-black text-black leading-tight tracking-tight">
                    {prod.name}
                  </h3>
                  <div className="text-sm font-bold text-black/80 mt-1">
                    {formatCurrency(prod.price)}
                  </div>
                </div>

                {/* Render Can Illustration */}
                <BeverageCan productId={prod.id} />

                {/* Bottom row containing recipe summary and circular arrow link */}
                <div className="flex items-end justify-between mt-auto">
                  <div className="text-[10px] font-bold text-black/70 uppercase tracking-wider leading-tight text-left">
                    Receta: {prod.recipe.length} ingredientes <br />
                    Costo: {formatCurrency(prod.cost)}
                  </div>
                  
                  <Link
                    href={`/products?id=${prod.id}`}
                    className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-200 hover:scale-105"
                    title="Editar Receta"
                  >
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Lower Split Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        
        {/* Left Side: Recent Sales */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-[var(--color-border)] pb-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black">
              Flujo de Entrada <span className="font-light italic text-[var(--color-text-secondary)]">reciente.</span>
            </h3>
            <Link href="/sales" className="text-[10px] font-bold text-black hover:underline uppercase tracking-wider">
              Ver ventas →
            </Link>
          </div>

          <div className="table-container border border-[var(--color-border)]">
            <table className="antojo-table">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Cliente</th>
                  <th>Canal</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {sales.slice(0, 5).map((sale) => (
                  <tr key={sale.id}>
                    <td className="font-bold tracking-tight">{sale.folio}</td>
                    <td>
                      <span className="font-bold text-black">{sale.customer}</span>
                      <span className="text-[10px] text-[var(--color-text-secondary)] block mt-0.5">{sale.time}</span>
                    </td>
                    <td>
                      <span className="badge badge-neutral">{sale.channel}</span>
                    </td>
                    <td className="text-right font-bold text-green-700 tabular-nums">
                      +{formatCurrency(sale.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Inventory Alerts */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-[var(--color-border)] pb-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black">
              Estado de <span className="font-light italic text-[var(--color-text-secondary)]">ingredientes.</span>
            </h3>
            <Link href="/inventory" className="text-[10px] font-bold text-black hover:underline uppercase tracking-wider">
              Ver almacén →
            </Link>
          </div>

          <div className="table-container border border-[var(--color-border)]">
            <table className="antojo-table">
              <thead>
                <tr>
                  <th>Ingrediente</th>
                  <th className="text-right">Stock</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {inventory.slice(0, 5).map((item) => {
                  const isLow = item.stock <= item.min_stock;
                  return (
                    <tr key={item.id}>
                      <td className="font-bold">{item.name}</td>
                      <td className="text-right font-semibold tabular-nums">
                        {formatNumber(item.stock)} {item.unit}
                      </td>
                      <td>
                        {isLow ? (
                          <span className="badge badge-error flex items-center gap-1 w-fit">
                            <AlertCircle size={10} /> bajo stock
                          </span>
                        ) : (
                          <span className="badge badge-success w-fit">ok</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
