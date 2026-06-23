"use client";

import { useGlobalState } from "@/lib/state";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { ArrowRight, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

// ── Shared inline styles siguiendo el sistema Brivé ──────────
const HN = "\"Helvetica Neue\", Helvetica, Arial, sans-serif";

const S = {
  border: "1px solid rgba(17,17,17,0.10)",
  borderStrong: "1px solid rgba(17,17,17,0.18)",
};

export function DashboardClient({ data }: { data?: any }) {
  const { products, sales, purchases, inventory, production, monthlyGoal } = useGlobalState();

  let bestDrink = { name: "N/A", qty: 0 };
  const productSales: Record<string, number> = {};
  sales.forEach(s => s.items.forEach(i => {
    productSales[i.name] = (productSales[i.name] || 0) + i.qty;
  }));
  Object.entries(productSales).forEach(([name, qty]) => {
    if (qty > bestDrink.qty) bestDrink = { name, qty };
  });

  const nearExpiration = production.filter(b => {
    if(!b.expirationDate) return false;
    const expDate = new Date(b.expirationDate);
    const today = new Date();
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  });

  const totalSalesVal    = sales.reduce((acc, s) => acc + s.total, 0);
  const totalExpensesVal = purchases.reduce((acc, p) => acc + p.cost, 0);
  
  const estimatedProfitVal = sales.reduce((acc, s) => {
    let p = 0;
    s.items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      const cost = prod ? prod.cost : item.price * 0.4;
      p += (item.price - cost) * item.qty;
    });
    return acc + p;
  }, 0);

  const goalPercent = Math.min(100, Math.round((totalSalesVal / monthlyGoal.goal) * 100));

  const salesData = sales.length === 0 ? [] : [
    { day: "Lun", ventas: 1200 },
    { day: "Mar", ventas: 1900 },
    { day: "Mié", ventas: 1500 },
    { day: "Jue", ventas: 2100 },
    { day: "Vie", ventas: 3200 },
    { day: "Sáb", ventas: 4500 },
    { day: "Dom", ventas: 3800 },
  ];

  const categoryData = sales.length === 0 ? [] : [
    { name: "Matcha",   valor: 35 },
    { name: "Pócima",   valor: 25 },
    { name: "Cold Brew",valor: 20 },
    { name: "Mojito",   valor: 20 },
  ];

  const BeverageCan = ({ productId }: { productId: string }) => {
    let color = "#1E6B35";
    let label = "MATCHA";
    if (productId === "p2") { color = "#D66B7C"; label = "PÓCIMA"; }
    else if (productId === "p3") { color = "#D4AF37"; label = "C. BREW"; }
    else if (productId === "p4") { color = "#7B68EE"; label = "MOJITO"; }
    return (
      <svg width="48" height="88" viewBox="0 0 50 90" className="mx-auto my-3 select-none pointer-events-none">
        <ellipse cx="25" cy="6" rx="16" ry="3" fill="#CCCCCC" stroke="#999999" strokeWidth="0.5" />
        <ellipse cx="25" cy="4" rx="11" ry="1.5" fill="#E5E5E5" />
        <rect x="9" y="6" width="32" height="78" fill={color} rx="1.5" />
        <path d="M 9 84 Q 25 88 41 84 L 41 85 Q 25 89 9 85 Z" fill="#CCCCCC" />
        <rect x="9" y="30" width="32" height="30" fill="#FFFFFF" opacity="0.9" />
        <text x="25" y="47" fontSize="6" fontWeight="900" fill="#000000" textAnchor="middle" letterSpacing="0.05em">{label}</text>
        <text x="25" y="55" fontSize="4" fontWeight="700" fill="#666666" textAnchor="middle">ANTOJO</text>
        <rect x="11" y="6" width="3" height="78" fill="#FFFFFF" opacity="0.1" />
      </svg>
    );
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: HN,
        display: "flex",
        flexDirection: "column",
        gap: "0",
      }}
    >

      {/* ── HEADER — Brivé __title style ─────────────────────── */}
      <div
        style={{
          paddingTop: "58px",
          paddingBottom: "46px",
          borderBottom: S.border,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          {/* Super-label */}
          <span
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: 900,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(17,17,17,0.38)",
              marginBottom: "12px",
            }}
          >
            ERP · ANTOJO OS
          </span>
          {/* Hero title al estilo Brivé */}
          <h1
            style={{
              fontSize: "clamp(38px, 5vw, 64px)",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: "0.95",
              color: "#111111",
              textTransform: "uppercase",
            }}
          >
            OPERACIÓN{" "}
            <span style={{ fontWeight: 400, fontStyle: "italic", color: "rgba(17,17,17,0.45)", letterSpacing: "-0.02em" }}>
              diaria.
            </span>
          </h1>
        </div>

        {/* Meta badge */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            padding: "16px 24px",
            border: S.border,
            background: "#ffffff",
            minWidth: "180px",
          }}
        >
          <span style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(17,17,17,0.38)" }}>
            Meta Mensual
          </span>
          <span style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "-0.04em", color: "#111111", lineHeight: 1 }}>
            {goalPercent}%
          </span>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(17,17,17,0.50)", letterSpacing: "-0.01em" }}>
            {formatCurrency(totalSalesVal)} / {formatCurrency(monthlyGoal.goal)}
          </span>
        </div>

        {/* Bebida Estrella badge */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            padding: "16px 24px",
            border: S.border,
            background: "#ffffff",
            minWidth: "180px",
          }}
        >
          <span style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(17,17,17,0.38)" }}>
            Bebida Estrella
          </span>
          <span style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "-0.04em", color: "#111111", lineHeight: 1, textTransform: "uppercase" }}>
            {bestDrink.name.substring(0, 10)}{bestDrink.name.length > 10 ? '.' : ''}
          </span>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(17,17,17,0.50)", letterSpacing: "-0.01em" }}>
            {bestDrink.qty} uds vendidas
          </span>
        </div>
      </div>

      {/* ── METRIC GRID — Brivé __col style (1px rgba borders) ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          borderLeft: S.border,
          borderRight: S.border,
          borderBottom: S.border,
        }}
      >
        {[
          {
            label: "Ingresos de Ventas",
            value: formatCurrency(totalSalesVal),
            note: "flujo de entrada activo",
            noteColor: "rgba(22,101,52,0.85)",
            icon: <TrendingUp size={13} />,
          },
          {
            label: "Egresos de Compras",
            value: formatCurrency(totalExpensesVal),
            note: "egreso de insumos",
            noteColor: "rgba(153,27,27,0.85)",
            icon: <TrendingDown size={13} />,
          },
          {
            label: "Caja Chica / Utilidad",
            value: formatCurrency(estimatedProfitVal),
            note: "margen operativo",
            noteColor: "#111111",
            dark: true,
          },
        ].map((m, i) => (
          <div
            key={i}
            style={{
              padding: "46px 34px",
              background: m.dark ? "#111111" : "#ffffff",
              borderRight: i < 2 ? S.border : "none",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              transition: "background 0.2s ease",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: m.dark ? "rgba(255,255,255,0.45)" : "rgba(17,17,17,0.38)",
              }}
            >
              {m.label}
            </span>
            <div
              style={{
                fontSize: "36px",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: m.dark ? "#ffffff" : "#111111",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {m.value}
            </div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "-0.015em",
                color: m.dark ? "rgba(255,255,255,0.55)" : m.noteColor,
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              {m.icon}
              {m.note}
            </span>
          </div>
        ))}
      </div>

      {/* ── CHARTS — Section con título Brivé ─────────────────── */}
      <div style={{ paddingTop: "58px", paddingBottom: "0" }}>
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "16px",
            borderBottom: S.border,
            paddingBottom: "18px",
            marginBottom: "32px",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "#111111",
            }}
          >
            Métricas de{" "}
            <span style={{ fontWeight: 400, fontStyle: "italic", color: "rgba(17,17,17,0.45)" }}>
              rendimiento.
            </span>
          </h2>
          <Link
            href="/reports"
            style={{
              fontSize: "11px",
              fontWeight: 900,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(17,17,17,0.50)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#111111")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(17,17,17,0.50)")}
          >
            Ver reportes <ArrowRight size={12} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Charts grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            gap: "1px",
            border: S.border,
            background: "rgba(17,17,17,0.10)",
          }}
        >
          {/* Area chart */}
          <div style={{ background: "#ffffff", padding: "34px" }}>
            <span style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(17,17,17,0.38)", display: "block", marginBottom: "24px" }}>
              Ventas de la Semana
            </span>
            <div style={{ height: "260px" }}>
              {salesData.length === 0 ? (
                <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed rgba(17,17,17,0.12)" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "rgba(17,17,17,0.38)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Sin datos disponibles</span>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gV" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#111111" stopOpacity={0.07} />
                        <stop offset="100%" stopColor="#111111" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(17,17,17,0.07)" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(17,17,17,0.38)", fontWeight: 800, letterSpacing: "0.05em", fontFamily: HN }} dy={12} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(17,17,17,0.38)", fontWeight: 800, fontFamily: HN }} tickFormatter={(v) => `$${v}`} dx={-8} />
                    <Tooltip
                      contentStyle={{ fontFamily: HN, border: "1px solid rgba(17,17,17,0.12)", borderRadius: "4px", fontSize: "12px", fontWeight: 800, letterSpacing: "-0.02em", padding: "12px 16px", boxShadow: "0 8px 24px rgba(17,17,17,0.08)" }}
                      itemStyle={{ color: "#111111" }}
                      cursor={{ stroke: "rgba(17,17,17,0.15)", strokeWidth: 1, strokeDasharray: "4 4" }}
                    />
                    <Area type="monotone" dataKey="ventas" stroke="#111111" strokeWidth={1.5} fillOpacity={1} fill="url(#gV)" animationDuration={1200} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Bar chart */}
          <div style={{ background: "#ffffff", padding: "34px" }}>
            <span style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(17,17,17,0.38)", display: "block", marginBottom: "24px" }}>
              Dist. de Sabores
            </span>
            <div style={{ height: "260px" }}>
              {categoryData.length === 0 ? (
                <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed rgba(17,17,17,0.12)" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "rgba(17,17,17,0.38)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Sin datos</span>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="rgba(17,17,17,0.07)" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(17,17,17,0.50)", fontWeight: 800, fontFamily: HN }} width={72} />
                    <Tooltip contentStyle={{ fontFamily: HN, border: "1px solid rgba(17,17,17,0.12)", borderRadius: "4px", fontSize: "12px", fontWeight: 800, padding: "12px 16px" }} cursor={{ fill: "rgba(17,17,17,0.03)" }} />
                    <Bar dataKey="valor" fill="#111111" radius={[0, 3, 3, 0]} barSize={14} animationDuration={1200} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── PRODUCTOS ────────────────────────────────────────── */}
      <div style={{ paddingTop: "58px", paddingBottom: "0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "16px",
            borderBottom: S.border,
            paddingBottom: "18px",
            marginBottom: "32px",
          }}
        >
          <h2 style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "-0.04em", textTransform: "uppercase", color: "#111111" }}>
            Catálogo de{" "}
            <span style={{ fontWeight: 400, fontStyle: "italic", color: "rgba(17,17,17,0.45)" }}>bebidas.</span>
          </h2>
          <Link
            href="/products"
            style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(17,17,17,0.50)", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px", transition: "color 0.2s ease" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#111111")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(17,17,17,0.50)")}
          >
            Recetas y productos <ArrowRight size={12} strokeWidth={2.5} />
          </Link>
        </div>

        {products.length === 0 ? (
          <div
            style={{
              padding: "64px 32px",
              textAlign: "center",
              border: "1px dashed rgba(17,17,17,0.14)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(17,17,17,0.30)" }}>
              Catálogo Vacío
            </span>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "rgba(17,17,17,0.55)", maxWidth: "340px", lineHeight: 1.55, letterSpacing: "-0.015em" }}>
              No has registrado ningún producto. Agrega tus bebidas y recetas para comenzar a generar métricas.
            </p>
            <Link
              href="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 24px",
                background: "#111111",
                color: "#ffffff",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                textDecoration: "none",
                marginTop: "8px",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Crear mi primer producto
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", border: S.border, background: "rgba(17,17,17,0.10)" }}>
            {products.map((prod) => {
              const flavors: Record<string, { bg: string; label: string }> = {
                p1: { bg: "#e8f4e8", label: "MATCHA LATTE" },
                p2: { bg: "#fdf0f0", label: "PÓCIMA FRESA" },
                p3: { bg: "#fdfaed", label: "COLD BREW" },
                p4: { bg: "#f3f0fc", label: "MOJITO MEZCAL" },
              };
              const f = flavors[prod.id] || { bg: "#f5f5f3", label: "BEBIDA" };
              return (
                <div
                  key={prod.id}
                  style={{
                    background: f.bg,
                    padding: "28px 24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "280px",
                    transition: "filter 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.filter = "brightness(0.97)")}
                  onMouseLeave={e => (e.currentTarget.style.filter = "none")}
                >
                  <div>
                    <span style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(17,17,17,0.45)", display: "block", marginBottom: "6px" }}>
                      {f.label}
                    </span>
                    <h3 style={{ fontSize: "16px", fontWeight: 900, letterSpacing: "-0.03em", color: "#111111", lineHeight: 1.2 }}>
                      {prod.name}
                    </h3>
                    <div style={{ fontSize: "14px", fontWeight: 800, color: "rgba(17,17,17,0.70)", marginTop: "6px", letterSpacing: "-0.02em" }}>
                      {formatCurrency(prod.price)}
                    </div>
                  </div>
                  <BeverageCan productId={prod.id} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid rgba(17,17,17,0.08)" }}>
                    <span style={{ fontSize: "10px", fontWeight: 800, color: "rgba(17,17,17,0.55)", letterSpacing: "0.02em", textTransform: "uppercase" }}>
                      {prod.recipe.length} ingredientes · {formatCurrency(prod.cost)} costo
                    </span>
                    <Link
                      href={`/products?id=${prod.id}`}
                      style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#111111", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", flexShrink: 0 }}
                    >
                      <ArrowRight size={13} strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── TABLAS INFERIORES ────────────────────────────────── */}
      <div style={{ paddingTop: "58px", paddingBottom: "58px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
        
        {/* Ventas recientes */}
        <div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", borderBottom: S.border, paddingBottom: "14px", marginBottom: "0" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 900, letterSpacing: "-0.025em", textTransform: "uppercase", color: "#111111" }}>
              Flujo reciente
            </h3>
            <Link href="/sales" style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(17,17,17,0.50)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#111111")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(17,17,17,0.50)")}
            >
              Ver ventas →
            </Link>
          </div>
          <div style={{ border: S.border, borderTop: "none" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: HN }}>
              <thead>
                <tr>
                  {["Folio", "Cliente", "Total"].map(h => (
                    <th key={h} style={{ padding: "14px 20px", textAlign: h === "Total" ? "right" : "left", fontSize: "10px", fontWeight: 900, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(17,17,17,0.38)", background: "#fafafa", borderBottom: S.border }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sales.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ padding: "40px 20px", textAlign: "center", fontSize: "11px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(17,17,17,0.35)" }}>
                      Sin ventas registradas
                    </td>
                  </tr>
                ) : (
                  sales.slice(0, 5).map((sale) => (
                    <tr key={sale.id} style={{ transition: "background 0.15s ease" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: 900, letterSpacing: "-0.02em", color: "#111111", borderBottom: S.border }}>{sale.folio}</td>
                      <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: 800, letterSpacing: "-0.015em", color: "rgba(17,17,17,0.75)", borderBottom: S.border }}>{sale.customer}</td>
                      <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: 900, letterSpacing: "-0.025em", color: "rgba(22,101,52,0.90)", textAlign: "right", borderBottom: S.border, fontVariantNumeric: "tabular-nums" }}>+{formatCurrency(sale.total)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventario */}
        <div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", borderBottom: S.border, paddingBottom: "14px", marginBottom: "0" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 900, letterSpacing: "-0.025em", textTransform: "uppercase", color: "#111111" }}>
              Estado de ingredientes
            </h3>
            <Link href="/inventory" style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(17,17,17,0.50)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#111111")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(17,17,17,0.50)")}
            >
              Ver almacén →
            </Link>
          </div>
          <div style={{ border: S.border, borderTop: "none" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: HN }}>
              <thead>
                <tr>
                  {["Ingrediente", "Stock", "Estado"].map(h => (
                    <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: "10px", fontWeight: 900, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(17,17,17,0.38)", background: "#fafafa", borderBottom: S.border }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inventory.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ padding: "40px 20px", textAlign: "center", fontSize: "11px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(17,17,17,0.35)" }}>
                      Inventario vacío
                    </td>
                  </tr>
                ) : (
                  inventory.slice(0, 5).map((item) => {
                    const isLow = item.stock <= item.min_stock;
                    return (
                      <tr key={item.id}
                        onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                        style={{ transition: "background 0.15s ease" }}
                      >
                        <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: 800, letterSpacing: "-0.015em", color: "#111111", borderBottom: S.border }}>{item.name}</td>
                        <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: 900, letterSpacing: "-0.02em", color: "rgba(17,17,17,0.75)", borderBottom: S.border, fontVariantNumeric: "tabular-nums" }}>
                          {formatNumber(item.stock)} {item.unit}
                        </td>
                        <td style={{ padding: "16px 20px", borderBottom: S.border }}>
                          {isLow ? (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "10px", fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(153,27,27,0.90)", background: "#fef2f2", padding: "4px 10px", borderRadius: "9999px" }}>
                              <AlertCircle size={10} /> Bajo stock
                            </span>
                          ) : (
                            <span style={{ display: "inline-flex", fontSize: "10px", fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(22,101,52,0.90)", background: "#f0fdf4", padding: "4px 10px", borderRadius: "9999px" }}>
                              OK
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
          {nearExpiration.length > 0 && (
            <div style={{ marginTop: "16px", border: S.border, background: "#fef2f2", padding: "16px 20px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(153,27,27,0.90)", marginBottom: "8px" }}>
                <AlertCircle size={12} /> Lotes Próximos a Caducar
              </span>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                {nearExpiration.map(b => (
                  <li key={b.id} style={{ fontSize: "12px", fontWeight: 800, color: "#111111", display: "flex", justifyContent: "space-between" }}>
                    <span>{b.productName} (Lote {b.id.slice(-4)})</span>
                    <span style={{ color: "rgba(153,27,27,0.8)" }}>{b.expirationDate}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
