"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavItemDetails {
  href: string;
  label: string;
  group: "main" | "secondary";
}

const navItems: NavItemDetails[] = [
  { href: "/dashboard",   label: "Resumen",      group: "main" },
  { href: "/sales",       label: "Ventas",        group: "main" },
  { href: "/products",    label: "Productos",     group: "main" },
  { href: "/finance",     label: "Finanzas",      group: "main" },
  { href: "/commercial",  label: "Comercial",     group: "main" },
  { href: "/marketing",   label: "Marketing",     group: "main" },
  { href: "/production",  label: "Producción",    group: "main" },
  { href: "/inventory",   label: "Inventario",    group: "main" },
  
  { href: "/purchases",   label: "Compras",       group: "secondary" },
  { href: "/events",      label: "Eventos",       group: "secondary" },
  { href: "/quotes",      label: "Cotizaciones",  group: "secondary" },
  { href: "/calendar",    label: "Calendario",    group: "secondary" },
  { href: "/growth",      label: "Crecimiento",   group: "secondary" },
  { href: "/reports",     label: "Reportes",      group: "secondary" },
  { href: "/settings",    label: "Configuración", group: "secondary" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

/* ── Sidebar Desktop ───────────────────────────────────────── */
export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const mainItems = navItems.filter(i => i.group === "main");
  const secondaryItems = navItems.filter(i => i.group === "secondary");

  return (
    <aside
      className="app-sidebar select-none"
      style={{
        fontFamily: "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
      }}
    >
      {/* ── Brand ───────────────────────────────── */}
      <div
        style={{
          padding: "46px 34px 38px",
          borderBottom: "1px solid rgba(17,17,17,0.10)",
        }}
      >
        <Link href="/dashboard">
          {/* Nombre grande al estilo Brivé __title */}
          <span
            style={{
              display: "block",
              fontSize: "22px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#111111",
              textTransform: "uppercase",
            }}
          >
            ANTOJO
          </span>
          <span
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "rgba(17,17,17,0.38)",
              marginTop: "6px",
            }}
          >
            OS — PLATAFORMA
          </span>
        </Link>
      </div>

      {/* ── Main Nav ────────────────────────────── */}
      <nav
        style={{
          padding: "38px 34px",
          borderBottom: "1px solid rgba(17,17,17,0.10)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {mainItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "block",
                fontSize: "15px",
                fontWeight: isActive ? 900 : 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.35,
                color: isActive ? "#111111" : "rgba(17,17,17,0.40)",
                transition: "color 0.2s ease, opacity 0.2s ease",
                textDecoration: "none",
                borderLeft: isActive
                  ? "2px solid #111111"
                  : "2px solid transparent",
                paddingLeft: "12px",
                marginLeft: "-14px",
              }}
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = "#111111";
              }}
              onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(17,17,17,0.40)";
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* ── Secondary Nav ───────────────────────── */}
      <nav
        style={{
          padding: "34px 34px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Section label al estilo Brivé */}
        <span
          style={{
            fontSize: "10px",
            fontWeight: 900,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(17,17,17,0.30)",
            marginBottom: "8px",
          }}
        >
          Sistema
        </span>

        {secondaryItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: isActive ? 900 : 700,
                letterSpacing: "-0.015em",
                color: isActive ? "#111111" : "rgba(17,17,17,0.42)",
                transition: "color 0.2s ease",
                textDecoration: "none",
              }}
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = "#111111";
              }}
              onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(17,17,17,0.42)";
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* ── Footer: Cerrar sesión ────────────────── */}
      <div
        style={{
          padding: "28px 34px",
          borderTop: "1px solid rgba(17,17,17,0.10)",
        }}
      >
        <button
          onClick={() => { if (typeof window !== "undefined") window.location.href = "/"; }}
          style={{
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(17,17,17,0.38)",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "color 0.2s ease",
            padding: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#111111")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(17,17,17,0.38)")}
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}

/* ── Mobile Bottom Nav ────────────────────────────────────── */
export function MobileBottomNav({ onMenuOpen }: { onMenuOpen: () => void }) {
  const pathname = usePathname();

  const shortcuts = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/sales",     label: "Ventas" },
    { href: "/finance",   label: "Caja" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: "16px",
        left: "16px",
        right: "16px",
        height: "56px",
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 16px",
        background: "#ffffff",
        border: "1px solid rgba(17,17,17,0.12)",
        borderRadius: "9999px",
        boxShadow: "0 8px 24px rgba(17,17,17,0.08)",
        fontFamily: "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
      }}
    >
      {shortcuts.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              padding: "8px 16px",
              fontSize: "12px",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: isActive ? "#ffffff" : "rgba(17,17,17,0.55)",
              background: isActive ? "#111111" : "transparent",
              borderRadius: "9999px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            {item.label}
          </Link>
        );
      })}
      <button
        onClick={onMenuOpen}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 16px",
          fontSize: "12px",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          color: "#111111",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <Menu size={15} />
        Menú
      </button>
    </nav>
  );
}

/* ── Mobile Fullscreen Drawer ─────────────────────────────── */
export function MobileMenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const mainItems = navItems.filter(i => i.group === "main");
  const secondaryItems = navItems.filter(i => i.group === "secondary");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: "8%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "8%" }}
          transition={{ type: "tween", duration: 0.26, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "#ffffff",
            overflowY: "auto",
            fontFamily: "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
          }}
        >
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: "0 24px" }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "40px 0 28px",
                borderBottom: "1px solid rgba(17,17,17,0.10)",
              }}
            >
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  color: "#111111",
                  textTransform: "uppercase",
                }}
              >
                ANTOJO OS
              </span>
              <button
                onClick={onClose}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid rgba(17,17,17,0.12)",
                  background: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#111111",
                }}
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            {/* Main Links */}
            <div style={{ padding: "40px 0", display: "flex", flexDirection: "column", gap: "22px" }}>
              {mainItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    style={{
                      display: "block",
                      fontSize: "32px",
                      fontWeight: isActive ? 900 : 800,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      color: isActive ? "#111111" : "rgba(17,17,17,0.38)",
                      textDecoration: "none",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div style={{ borderTop: "1px solid rgba(17,17,17,0.10)", paddingTop: "28px", marginBottom: "24px" }}>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(17,17,17,0.30)",
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                Sistema
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {secondaryItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    style={{
                      display: "block",
                      fontSize: "15px",
                      fontWeight: 800,
                      letterSpacing: "-0.025em",
                      color: pathname === item.href ? "#111111" : "rgba(17,17,17,0.50)",
                      textDecoration: "none",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ paddingBottom: "40px", marginTop: "auto" }}>
              <button
                onClick={() => { if (typeof window !== "undefined") window.location.href = "/"; }}
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(17,17,17,0.38)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
