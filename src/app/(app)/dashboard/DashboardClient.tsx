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
      style={{ display: "flex", flexDirection: "column", gap: 12, minHeight: 110 }}
    >
      <div className="kpi-label">{label}</div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
        <div>
          <div className="kpi-value tabular-nums">{formattedValue}</div>
          <div style={{ marginTop: 6 }}>
            <span className={isPositive ? "kpi-change-positive" : "kpi-change-negative"}>
              {isPositive ? "▲" : "▼"} {Math.abs(change).toFixed(1)}%
            </span>
            <span style={{ fontSize: 11, color: "var(--color-text-muted)", marginLeft: 6 }}>
              vs periodo anterior
            </span>
          </div>
        </div>
        {chartData.length > 0 && (
          <div style={{ width: 64, height: 36, flexShrink: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={isPositive ? "var(--color-wine)" : "var(--color-error)"}
                  fill={isPositive ? "var(--color-wine-bg)" : "var(--color-error-bg)"}
                  strokeWidth={1.5}
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
  const Icon = iconMap[alert.iconName];
  const colors = {
    warning: { bg: "var(--color-warning-bg)", color: "var(--color-warning)", border: "rgba(178,124,50,0.2)" },
    error: { bg: "var(--color-error-bg)", color: "var(--color-error)", border: "rgba(168,66,66,0.2)" },
    success: { bg: "var(--color-success-bg)", color: "var(--color-success)", border: "rgba(71,120,90,0.2)" },
    info: { bg: "var(--color-wine-bg)", color: "var(--color-wine)", border: "rgba(112,31,45,0.2)" },
  };
  const c = colors[alert.type as keyof typeof colors];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + index * 0.07 }}
    >
      <Link
        href={alert.link}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          background: c.bg,
          border: `1px solid ${c.border}`,
          borderRadius: "var(--radius-md)",
          textDecoration: "none",
          color: c.color,
          fontSize: 13,
          fontWeight: 500,
          transition: "all 0.15s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateX(2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
        }}
      >
        <Icon size={15} style={{ flexShrink: 0 }} />
        <span style={{ flex: 1 }}>{alert.message}</span>
        <ChevronRight size={13} style={{ opacity: 0.5, flexShrink: 0 }} />
      </Link>
    </motion.div>
  );
}

// ── Dashboard Principal ───────────────────────────────────────

const periods = ["Hoy", "Ayer", "Esta semana", "Este mes", "Este año"];

export function DashboardClient({ data }: { data: DashboardData }) {
  const [selectedPeriod, setSelectedPeriod] = useState("Esta semana");

  const {
    salesByDay,
    salesByChannel,
    topProducts,
    alerts,
    upcomingEvents,
    recentSales,
    kpis,
    monthlyGoal,
  } = data;

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 28,
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "var(--color-text)",
              letterSpacing: "-0.02em",
              marginBottom: 4,
            }}
          >
            Buenos días ☀️
          </h1>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>
            Aquí está el resumen de ANTOJO. para{" "}
            <span style={{ fontWeight: 500, color: "var(--color-text)" }}>
              {selectedPeriod.toLowerCase()}
            </span>
            .
          </p>
        </div>

        {/* Selector de periodo */}
        <div
          style={{
            display: "flex",
            gap: 4,
            background: "var(--color-surface)",
            padding: 4,
            borderRadius: "var(--radius-md)",
            flexWrap: "wrap",
          }}
        >
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPeriod(p)}
              className="btn btn-sm"
              style={{
                background: selectedPeriod === p ? "var(--color-white)" : "transparent",
                color: selectedPeriod === p ? "var(--color-text)" : "var(--color-text-secondary)",
                boxShadow: selectedPeriod === p ? "var(--shadow-card)" : "none",
                padding: "6px 12px",
              }}
            >
              {p}
            </button>
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
            <h2 style={{ fontSize: 15, fontWeight: 600 }}>Ventas por día</h2>
            <span className="badge badge-wine">
              <TrendingUp size={11} /> +19.5%
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
                tick={{ fontSize: 12, fill: "var(--color-text-muted)" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "var(--color-text-muted)" }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-white)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-card-hover)",
                  fontSize: 13,
                }}
                formatter={(value, name) => [
                  formatCurrency(Number(value)),
                  String(name) === "ventas" ? "Ventas" : "Costo",
                ]}
                cursor={{ fill: "var(--color-surface)" }}
              />
              <Bar dataKey="ventas" fill="var(--color-wine)" radius={[4, 4, 0, 0]} maxBarSize={32} />
              <Bar dataKey="costo" fill="var(--color-border)" radius={[4, 4, 0, 0]} maxBarSize={32} />
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
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Por canal</h2>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={salesByChannel}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={66}
                paddingAngle={3}
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
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontSize: 13,
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
            <h2 style={{ fontSize: 15, fontWeight: 600 }}>Productos más vendidos</h2>
            <Link href="/products" className="btn btn-ghost btn-sm" style={{ gap: 4 }}>
              Ver todo <ArrowRight size={13} />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {topProducts.map((p, i) => (
              <div
                key={p.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 8px",
                  borderRadius: "var(--radius-md)",
                  transition: "background 0.1s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--color-surface)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: i === 0 ? "var(--color-wine-bg)" : "var(--color-surface)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: i === 0 ? "var(--color-wine)" : "var(--color-text-muted)",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{p.name}</span>
                <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
                  {p.units} uds
                </span>
                <span
                  className="badge badge-success"
                  style={{ flexShrink: 0 }}
                >
                  {p.margin}%
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--color-text)",
                    minWidth: 72,
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

        {/* Alertas — 3 cols */}
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
            <h2 style={{ fontSize: 15, fontWeight: 600 }}>Necesita atención</h2>
            <span className="badge badge-warning">{alerts.length}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
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
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Meta del mes</h2>
          <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 20 }}>
            Ventas en junio 2025
          </p>
          {/* Progress ring */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <svg width={120} height={120} viewBox="0 0 120 120">
              <circle cx={60} cy={60} r={50} fill="none" stroke="var(--color-surface)" strokeWidth={10} />
              <circle
                cx={60}
                cy={60}
                r={50}
                fill="none"
                stroke="var(--color-wine)"
                strokeWidth={10}
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - (monthlyGoal.current / monthlyGoal.goal))}`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
              <text x={60} y={56} textAnchor="middle" style={{ fontSize: 20, fontWeight: 700, fill: "var(--color-text)" }}>{Math.round((monthlyGoal.current / monthlyGoal.goal) * 100)}%</text>
              <text x={60} y={72} textAnchor="middle" style={{ fontSize: 10, fill: "var(--color-text-muted)" }}>completado</text>
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
            <div>
              <div style={{ color: "var(--color-text-muted)", fontSize: 11, marginBottom: 2 }}>Actual</div>
              <div style={{ fontWeight: 700, color: "var(--color-text)" }}>
                {formatCurrency(monthlyGoal.current, { compact: true })}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "var(--color-text-muted)", fontSize: 11, marginBottom: 2 }}>Meta</div>
              <div style={{ fontWeight: 700, color: "var(--color-text)" }}>
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
            <h2 style={{ fontSize: 15, fontWeight: 600 }}>Ventas recientes</h2>
            <Link href="/sales" className="btn btn-ghost btn-sm" style={{ gap: 4 }}>
              Ver todo <ArrowRight size={13} />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {recentSales.map((sale) => (
              <div
                key={sale.folio}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 8px",
                  borderRadius: "var(--radius-md)",
                  transition: "background 0.1s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--color-surface)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius-md)",
                    background: "var(--color-wine-bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ShoppingCart size={15} color="var(--color-wine)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {sale.customer}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--color-text-muted)", display: "flex", gap: 8, marginTop: 1 }}>
                    <span>{sale.folio}</span>
                    <span>·</span>
                    <span>{sale.channel}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                    {formatCurrency(sale.total)}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 1, display: "flex", alignItems: "center", gap: 3, justifyContent: "flex-end" }}>
                    <Clock size={10} />
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
            <h2 style={{ fontSize: 15, fontWeight: 600 }}>Próximos eventos</h2>
            <Link href="/events" className="btn btn-ghost btn-sm" style={{ gap: 4 }}>
              Ver todo <ArrowRight size={13} />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {upcomingEvents.map((event, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 8px",
                  borderRadius: "var(--radius-md)",
                  transition: "background 0.1s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--color-surface)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <div
                  style={{
                    background:
                      event.status === "confirmed"
                        ? "var(--color-success-bg)"
                        : "var(--color-surface)",
                    color:
                      event.status === "confirmed"
                        ? "var(--color-success)"
                        : "var(--color-text-muted)",
                    borderRadius: "var(--radius-sm)",
                    padding: "6px 8px",
                    fontSize: 11,
                    fontWeight: 700,
                    textAlign: "center",
                    minWidth: 44,
                    lineHeight: 1.2,
                    flexShrink: 0,
                  }}
                >
                  {event.date}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {event.name}
                  </div>
                  {event.guests > 0 && (
                    <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 1 }}>
                      {event.guests} invitados
                    </div>
                  )}
                </div>
                <span
                  className={
                    event.status === "confirmed" ? "badge badge-success" : "badge badge-neutral"
                  }
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
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Acciones rápidas</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { label: "Registrar venta", icon: ShoppingCart, href: "/sales/new", primary: true },
              { label: "Crear lote", icon: FlaskConical, href: "/production/new" },
              { label: "Registrar compra", icon: Package, href: "/purchases/new" },
              { label: "Registrar gasto", icon: Wallet, href: "/finance/expenses/new" },
              { label: "Crear cotización", icon: Users, href: "/quotes/new" },
              { label: "Crear contenido", icon: Megaphone, href: "/marketing/content/new" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`btn ${action.primary ? "btn-primary" : "btn-secondary"}`}
                  style={{ justifyContent: "flex-start", width: "100%" }}
                >
                  <Icon size={15} />
                  {action.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
