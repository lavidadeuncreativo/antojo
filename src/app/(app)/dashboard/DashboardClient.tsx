"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Package,
  Wallet,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Clock,
  FlaskConical,
  Users,
  Megaphone,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { formatCurrency, formatNumber, formatPercent, percentChange } from "@/lib/utils";
import Link from "next/link";

import { DashboardData } from "@/types/dashboard";
import { demoDashboardData } from "@/lib/demo-data";

// Mapeo de strings a componentes de icono
const iconMap = {
  Package,
  AlertTriangle,
  Users,
  CheckCircle2,
  XCircle,
};

// ── Componentes helper ────────────────────────────────────────

function KPICard({
  label,
  value,
  previous,
  prefix = "",
  suffix = "",
  format: fmt = "currency",
  miniData,
  delay = 0,
}: {
  label: string;
  value: number;
  previous: number;
  prefix?: string;
  suffix?: string;
  format?: "currency" | "number" | "percent";
  miniData?: number[];
  delay?: number;
}) {
  const change = percentChange(value, previous);
  const isPositive = change >= 0;

  const formattedValue =
    fmt === "currency"
      ? formatCurrency(value)
      : fmt === "percent"
      ? formatPercent(value)
      : formatNumber(value);

  const chartData = miniData?.map((v, i) => ({ i, v })) ?? [];

  return (
    <motion.div
      className="card card-interactive"
      initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, delay, ease: [0.4, 0, 0.2, 1] }}
      style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 110 }}
    >
      <div className="kpi-label">{label}</div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
        <div>
          <div className="kpi-value tabular-nums">{formattedValue}</div>
          <div style={{ marginTop: 6, display: "flex", alignItems: "baseline", gap: 6 }}>
            <span className={isPositive ? "kpi-change-positive" : "kpi-change-negative"}>
              {isPositive ? "↑" : "↓"} {Math.abs(change).toFixed(1)}%
            </span>
            <span style={{ fontSize: 10, color: "var(--color-text-muted)" }}>
              vs anterior
            </span>
          </div>
        </div>
        {chartData.length > 0 && (
          <div style={{ width: 64, height: 28, flexShrink: 0, opacity: 0.8 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="var(--color-wine)"
                  fill="none"
                  strokeWidth={1.2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function AlertItem({
  alert,
  index,
}: {
  alert: DashboardData["alerts"][0];
  index: number;
}) {
  const typeLabels = {
    warning: "Atención",
    error: "Crítico",
    success: "Listo",
    info: "Info",
  };
  
  const typeColors = {
    warning: "var(--color-warning)",
    error: "var(--color-error)",
    success: "var(--color-success)",
    info: "var(--color-wine)",
  };

  const label = typeLabels[alert.type as keyof typeof typeLabels] || "Aviso";
  const textColor = typeColors[alert.type as keyof typeof typeColors] || "var(--color-text)";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 + index * 0.05 }}
      style={{
        borderBottom: "1px solid var(--color-border)",
        padding: "12px 0",
      }}
    >
      <Link
        href={alert.link}
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          textDecoration: "none",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
          <span style={{
            fontSize: 9,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: textColor,
            border: `1px solid ${textColor}`,
            padding: "2px 6px",
            lineHeight: 1,
            display: "inline-block",
          }}>
            {label}
          </span>
          <span style={{
            fontSize: 13,
            color: "var(--color-text)",
            fontFamily: "var(--font-sans)",
            fontWeight: 500
          }}>
            {alert.message}
          </span>
        </div>
        <ChevronRight size={12} style={{ color: "var(--color-text-muted)", flexShrink: 0 }} />
      </Link>
    </motion.div>
  );
}

// ── Dashboard Principal ───────────────────────────────────────

const periods = ["Hoy", "Ayer", "Esta semana", "Este mes", "Este año"];

export function DashboardClient({ data = demoDashboardData }: { data?: DashboardData }) {
  const [selectedPeriod, setSelectedPeriod] = useState("Esta semana");

  const resolvedData = data || demoDashboardData;

  const {
    salesByDay,
    salesByChannel,
    topProducts,
    alerts,
    upcomingEvents,
    recentSales,
    kpis,
    monthlyGoal,
  } = resolvedData;

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 36,
          gap: 20,
          flexWrap: "wrap",
          borderBottom: "1px solid var(--color-wine)",
          paddingBottom: 20,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 32,
              color: "var(--color-text)",
              letterSpacing: "-0.01em",
              marginBottom: 4,
            }}
          >
            Buenos días<span style={{ fontFamily: "var(--font-sans)", fontStyle: "normal", fontWeight: 700, color: "var(--color-wine)" }}>.</span>
          </h1>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
            Resumen operativo y comercial de ANTOJO. para el periodo seleccionado.
          </p>
        </div>

        {/* Selector de periodo editorial: botones separados por barra inclinada (/) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {periods.map((p, idx) => (
            <span key={p} style={{ display: "inline-flex", alignItems: "center" }}>
              {idx > 0 && (
                <span style={{ color: "var(--color-border)", margin: "0 8px", fontSize: 12 }}>/</span>
              )}
              <button
                onClick={() => setSelectedPeriod(p)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  fontSize: 10,
                  fontWeight: selectedPeriod === p ? 700 : 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: selectedPeriod === p ? "var(--color-wine)" : "var(--color-text-secondary)",
                  textDecoration: selectedPeriod === p ? "underline" : "none",
                  textUnderlineOffset: "6px",
                  transition: "color 0.15s ease",
                }}
              >
                {p}
              </button>
            </span>
          ))}
        </div>
      </motion.div>

      {/* KPI Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <KPICard
          label="Ventas totales"
          value={kpis.totalSales.current}
          previous={kpis.totalSales.previous}
          miniData={kpis.totalSales.miniData}
          delay={0}
        />
        <KPICard
          label="Utilidad estimada"
          value={kpis.estimatedProfit.current}
          previous={kpis.estimatedProfit.previous}
          miniData={kpis.estimatedProfit.miniData}
          delay={0.06}
        />
        <KPICard
          label="Margen promedio"
          value={kpis.avgMargin.current}
          previous={kpis.avgMargin.previous}
          format="percent"
          miniData={kpis.avgMargin.miniData}
          delay={0.12}
        />
        <KPICard
          label="Unidades vendidas"
          value={kpis.unitsSold.current}
          previous={kpis.unitsSold.previous}
          format="number"
          miniData={kpis.unitsSold.miniData}
          delay={0.18}
        />
        <KPICard
          label="Ticket promedio"
          value={kpis.avgTicket.current}
          previous={kpis.avgTicket.previous}
          delay={0.24}
        />
        <KPICard
          label="Gastos"
          value={kpis.expenses.current}
          previous={kpis.expenses.previous}
          delay={0.3}
        />
      </div>

      {/* Bento Grid Principal */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 12,
        }}
      >
        {/* Ventas por día — 8 cols */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ gridColumn: "span 8" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Ventas por día</h2>
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-wine)" }}>
              ↑ +19.5% <span style={{ fontWeight: 400, color: "var(--color-text-muted)" }}>vs anterior</span>
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={salesByDay}
              margin={{ top: 0, right: 0, bottom: 0, left: -20 }}
              barGap={3}
            >
              <XAxis
                dataKey="dia"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "var(--color-text-muted)" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "var(--color-text-muted)" }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-white)",
                  border: "1px solid var(--color-wine)",
                  borderRadius: 0,
                  boxShadow: "none",
                  fontSize: 12,
                }}
                formatter={(value, name) => [
                  formatCurrency(Number(value)),
                  String(name) === "ventas" ? "Ventas" : "Costo",
                ]}
                cursor={{ fill: "var(--color-surface)" }}
              />
              <Bar dataKey="ventas" fill="var(--color-wine)" radius={0} maxBarSize={24} />
              <Bar dataKey="costo" fill="var(--color-border)" radius={0} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Canal — 4 cols */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{ gridColumn: "span 4" }}
        >
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Por canal</h2>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={salesByChannel}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
                animationBegin={400}
                animationDuration={800}
              >
                {salesByChannel.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--color-white)",
                  border: "1px solid var(--color-wine)",
                  borderRadius: 0,
                  boxShadow: "none",
                  fontSize: 12,
                }}
                formatter={(v) => [`${v}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
            {salesByChannel.slice(0, 3).map((c) => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: c.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 12, color: "var(--color-text-secondary)", flex: 1 }}>
                  {c.name}
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text)" }}>
                  {c.value}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Productos más vendidos — 5 cols */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ gridColumn: "span 5" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Más vendidos</h2>
            <Link href="/products" style={{ fontSize: 11, fontFamily: "var(--font-editorial)", fontStyle: "italic", color: "var(--color-wine)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              Catálogo completo
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {topProducts.map((p, i) => (
              <div
                key={p.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontStyle: "italic",
                    fontSize: 13,
                    color: "var(--color-wine)",
                    width: 20,
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "var(--color-text)" }}>{p.name}</span>
                <span style={{ fontSize: 11, color: "var(--color-text-secondary)", marginRight: 8 }}>
                  {p.units} uds
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--color-success)",
                    border: "1px solid rgba(71,120,90,0.3)",
                    padding: "1px 5px",
                    lineHeight: 1,
                    marginRight: 10,
                  }}
                >
                  {p.margin}%
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--color-text)",
                    minWidth: 64,
                    textAlign: "right",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {formatCurrency(p.revenue, { compact: true })}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alertas — 4 cols */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ gridColumn: "span 4" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Atención requerida</h2>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-wine)" }}>({alerts.length})</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {alerts.map((a, i) => (
              <AlertItem key={i} alert={a} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Meta mensual — 3 cols */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.38 }}
          style={{ gridColumn: "span 3" }}
        >
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Meta del mes</h2>
          <p style={{ fontSize: 11, fontFamily: "var(--font-editorial)", fontStyle: "italic", color: "var(--color-text-secondary)", marginBottom: 20 }}>
            Progreso de facturación mensual
          </p>
          {/* Progress ring editorial (líneas muy delgadas y números elegantes) */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <svg width={110} height={110} viewBox="0 0 120 120">
              <circle cx={60} cy={60} r={52} fill="none" stroke="var(--color-border)" strokeWidth={1.5} />
              <circle
                cx={60}
                cy={60}
                r={52}
                fill="none"
                stroke="var(--color-wine)"
                strokeWidth={2.5}
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - (monthlyGoal.current / monthlyGoal.goal))}`}
                strokeLinecap="square"
                transform="rotate(-90 60 60)"
              />
              <text x={60} y={58} textAnchor="middle" style={{ fontSize: 24, fontFamily: "var(--font-editorial)", fontStyle: "italic", fill: "var(--color-wine)" }}>
                {Math.round((monthlyGoal.current / monthlyGoal.goal) * 100)}%
              </text>
              <text x={60} y={76} textAnchor="middle" style={{ fontSize: 8, fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, fill: "var(--color-text-muted)" }}>
                completado
              </text>
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--color-border)", paddingTop: 12 }}>
            <div>
              <div style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-sans)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Actual</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-wine)", fontVariantNumeric: "tabular-nums" }}>
                {formatCurrency(monthlyGoal.current, { compact: true })}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-sans)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Objetivo</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text)", fontVariantNumeric: "tabular-nums" }}>
                {formatCurrency(monthlyGoal.goal, { compact: true })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ventas recientes — 5 cols */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ gridColumn: "span 5" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Ventas recientes</h2>
            <Link href="/sales" style={{ fontSize: 11, fontFamily: "var(--font-editorial)", fontStyle: "italic", color: "var(--color-wine)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              Ver historial
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {recentSales.map((sale) => (
              <div
                key={sale.folio}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--color-border)",
                  gap: 12,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {sale.customer}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>
                    <span style={{ fontFamily: "monospace" }}>{sale.folio}</span>
                    <span style={{ margin: "0 6px", color: "var(--color-border)" }}>|</span>
                    <span style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic" }}>{sale.channel}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-wine)", fontVariantNumeric: "tabular-nums" }}>
                    {formatCurrency(sale.total)}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--color-text-secondary)", marginTop: 2 }}>
                    {sale.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Próximos eventos — 4 cols */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.42 }}
          style={{ gridColumn: "span 4" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Próximos eventos</h2>
            <Link href="/events" style={{ fontSize: 11, fontFamily: "var(--font-editorial)", fontStyle: "italic", color: "var(--color-wine)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              Agenda
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {upcomingEvents.map((event, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--color-border)",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--color-wine)",
                    letterSpacing: "0.05em",
                    minWidth: 48,
                    flexShrink: 0,
                  }}
                >
                  {event.date}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {event.name}
                  </div>
                  {event.guests > 0 && (
                    <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>
                      {event.guests} invitados
                    </div>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: event.status === "confirmed" ? "var(--color-success)" : "var(--color-text-muted)",
                    border: `1px solid ${event.status === "confirmed" ? "rgba(71,120,90,0.3)" : "var(--color-border)"}`,
                    padding: "2px 6px",
                    lineHeight: 1,
                  }}
                >
                  {event.status === "confirmed" ? "Confirmado" : "Prospecto"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Acciones rápidas — 3 cols */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.45 }}
          style={{ gridColumn: "span 3" }}
        >
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Acciones rápidas</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { label: "Registrar venta", href: "/sales/new", primary: true },
              { label: "Crear lote producción", href: "/production/new" },
              { label: "Registrar compra", href: "/purchases/new" },
              { label: "Registrar gasto", href: "/finance/expenses/new" },
              { label: "Crear cotización", href: "/quotes/new" },
              { label: "Crear contenido", href: "/marketing/content/new" },
            ].map((action) => {
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "11px 0",
                    borderBottom: "1px solid var(--color-border)",
                    color: action.primary ? "var(--color-wine)" : "var(--color-text)",
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 600,
                    transition: "all 0.15s ease",
                  }}
                  className="quick-action-link"
                >
                  <span>{action.label}</span>
                  <ArrowRight size={13} style={{ opacity: 0.6 }} />
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
