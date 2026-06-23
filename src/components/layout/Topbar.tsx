"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, Search, Settings } from "lucide-react";

interface TopbarProps {
  onMenuToggle?: () => void;
}

const routeLabels: Record<string, string> = {
  "/dashboard":   "Resumen General",
  "/sales":       "Ventas",
  "/products":    "Catálogo de Bebidas",
  "/finance":     "Estados Financieros",
  "/commercial":  "Área Comercial",
  "/marketing":   "Estrategia Marketing",
  "/production":  "Producción",
  "/inventory":   "Almacén e Inventario",
  "/purchases":   "Compras & Órdenes",
  "/events":      "Eventos & Activaciones",
  "/quotes":      "Cotizaciones",
  "/calendar":    "Calendario",
  "/growth":      "Crecimiento & Metas",
  "/reports":     "Reportes",
  "/settings":    "Configuración & Sistema",
};

export function Topbar({ onMenuToggle }: TopbarProps) {
  const pathname = usePathname();

  const currentLabel =
    Object.entries(routeLabels).find(([key]) => pathname.startsWith(key))?.[1] ?? "Dashboard";

  const iconBtn: React.CSSProperties = {
    width: "34px",
    height: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    border: "1px solid rgba(17,17,17,0.10)",
    background: "transparent",
    cursor: "pointer",
    color: "rgba(17,17,17,0.50)",
    transition: "all 0.2s ease",
  };

  return (
    <header
      className="app-topbar select-none"
      style={{
        fontFamily: "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
        justifyContent: "space-between",
      }}
    >
      {/* Left: Mobile toggle + Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          className="md:hidden"
          style={{ ...iconBtn, border: "none" }}
          aria-label="Menú principal"
        >
          <Menu size={17} strokeWidth={2} />
        </button>

        {/* Breadcrumb al estilo Brivé bottom bar */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Link
            href="/dashboard"
            style={{
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "rgba(17,17,17,0.35)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#111111")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(17,17,17,0.35)")}
          >
            Antojo OS
          </Link>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "rgba(17,17,17,0.22)",
            }}
          >
            /
          </span>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 900,
              letterSpacing: "-0.015em",
              color: "#111111",
              textTransform: "uppercase",
            }}
          >
            {currentLabel}
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          style={iconBtn}
          title="Buscar"
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(17,17,17,0.04)";
            (e.currentTarget as HTMLElement).style.color = "#111111";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "rgba(17,17,17,0.50)";
          }}
        >
          <Search size={14} strokeWidth={2.5} />
        </button>

        <button
          style={{ ...iconBtn, position: "relative" }}
          title="Notificaciones"
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(17,17,17,0.04)";
            (e.currentTarget as HTMLElement).style.color = "#111111";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "rgba(17,17,17,0.50)";
          }}
        >
          <Bell size={14} strokeWidth={2.5} />
          <span
            style={{
              position: "absolute",
              top: "7px",
              right: "7px",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#111111",
              border: "1.5px solid #ffffff",
            }}
          />
        </button>

        <Link
          href="/settings"
          style={{ ...iconBtn }}
          title="Configuración"
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(17,17,17,0.04)";
            (e.currentTarget as HTMLElement).style.color = "#111111";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "rgba(17,17,17,0.50)";
          }}
        >
          <Settings size={14} strokeWidth={2} />
        </Link>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "24px",
            background: "rgba(17,17,17,0.10)",
            margin: "0 4px",
          }}
        />

        {/* User avatar — Brivé style social link */}
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            border: "1.5px solid rgba(17,17,17,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: 900,
            letterSpacing: "0.02em",
            color: "#111111",
            cursor: "pointer",
            transition: "border-color 0.2s ease",
            userSelect: "none",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "#111111")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(17,17,17,0.15)")}
        >
          A
        </div>
      </div>
    </header>
  );
}
