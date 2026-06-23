"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Warehouse,
  FlaskConical,
  ShoppingBag,
  Wallet,
  Users,
  CalendarDays,
  Megaphone,
  Calendar,
  TrendingUp,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Ticket,
  PartyPopper,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  group?: string;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Resumen", icon: LayoutDashboard, group: "principal" },
  { href: "/sales", label: "Ventas", icon: ShoppingCart, group: "operaciones" },
  { href: "/products", label: "Productos y recetas", icon: Package, group: "operaciones" },
  { href: "/inventory", label: "Inventario", icon: Warehouse, group: "operaciones" },
  { href: "/production", label: "Producción", icon: FlaskConical, group: "operaciones" },
  { href: "/purchases", label: "Compras", icon: ShoppingBag, group: "operaciones" },
  { href: "/finance", label: "Finanzas", icon: Wallet, group: "negocios" },
  { href: "/commercial", label: "Comercial", icon: Users, group: "negocios" },
  { href: "/events", label: "Eventos", icon: PartyPopper, group: "negocios" },
  { href: "/quotes", label: "Cotizaciones", icon: Ticket, group: "negocios" },
  { href: "/marketing", label: "Marketing", icon: Megaphone, group: "estrategia" },
  { href: "/calendar", label: "Calendario", icon: Calendar, group: "estrategia" },
  { href: "/growth", label: "Crecimiento", icon: TrendingUp, group: "estrategia" },
  { href: "/reports", label: "Reportes", icon: BarChart3, group: "estrategia" },
  { href: "/settings", label: "Configuración", icon: Settings, group: "sistema" },
];

const groupLabels: Record<string, string> = {
  principal: "Principal",
  operaciones: "Operaciones",
  negocios: "Negocios",
  estrategia: "Estrategia",
  sistema: "Sistema",
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const groups = navItems.reduce<Record<string, NavItem[]>>((acc, item) => {
    const g = item.group ?? "otros";
    if (!acc[g]) acc[g] = [];
    acc[g].push(item);
    return acc;
  }, {});

  return (
    <aside
      className="app-sidebar"
      style={{ width: collapsed ? "var(--sidebar-collapsed-width)" : "var(--sidebar-width)" }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "20px 16px",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 64,
        }}
      >
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div
              style={{
                fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: "var(--color-text)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              ANTOJO<span style={{ color: "var(--color-wine)" }}>.</span>
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "var(--color-text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: 3,
              }}
            >
              OS
            </div>
          </motion.div>
        )}
        {collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: "var(--color-wine)",
              margin: "0 auto",
            }}
          >
            A.
          </motion.div>
        )}
        {!collapsed && (
          <button
            onClick={onToggle}
            className="btn btn-ghost btn-icon"
            style={{ marginLeft: "auto" }}
            aria-label="Colapsar sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Navegación */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "8px 8px",
        }}
      >
        {Object.entries(groups).map(([group, items]) => (
          <div key={group}>
            {!collapsed && (
              <div className="nav-group-label">{groupLabels[group] ?? group}</div>
            )}
            {items.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item ${isActive ? "active" : ""}`}
                  title={collapsed ? item.label : undefined}
                  style={{
                    justifyContent: collapsed ? "center" : "flex-start",
                    padding: collapsed ? "9px" : "9px 12px",
                  }}
                >
                  <Icon className="nav-icon" />
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Toggle expandir (cuando colapsado) */}
      {collapsed && (
        <div style={{ padding: 8 }}>
          <button
            onClick={onToggle}
            className="btn btn-ghost btn-icon"
            style={{ width: "100%", justifyContent: "center" }}
            aria-label="Expandir sidebar"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </aside>
  );
}

// ── Bottom Navigation (Mobile) ────────────────────────────────

const mobileNavItems = [
  { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
  { href: "/sales", label: "Ventas", icon: ShoppingCart },
  { href: "/production", label: "Producción", icon: FlaskConical },
  { href: "/calendar", label: "Calendario", icon: CalendarDays },
];

export function MobileBottomNav({ onMenuOpen }: { onMenuOpen: () => void }) {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        height: 64,
        zIndex: 50,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "10px 0",
              color: isActive ? "var(--color-wine)" : "var(--color-text-muted)",
              textDecoration: "none",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.02em",
              transition: "color 0.15s ease",
            }}
          >
            <Icon size={22} />
            {item.label}
          </Link>
        );
      })}
      {/* Botón Más */}
      <button
        onClick={onMenuOpen}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          padding: "10px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--color-text-muted)",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.02em",
        }}
      >
        <Menu size={22} />
        Más
      </button>
    </nav>
  );
}

// ── Mobile Full Menu Drawer ────────────────────────────────────

export function MobileMenuDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(25,23,21,0.4)",
              backdropFilter: "blur(4px)",
              zIndex: 60,
            }}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              background: "var(--color-white)",
              borderRadius: "20px 20px 0 0",
              zIndex: 70,
              padding: "12px 0 calc(24px + env(safe-area-inset-bottom))",
              maxHeight: "80dvh",
              overflowY: "auto",
            }}
          >
            {/* Handle */}
            <div
              style={{
                width: 40,
                height: 4,
                background: "var(--color-border)",
                borderRadius: 2,
                margin: "0 auto 20px",
              }}
            />
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 20px 16px",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "var(--color-text)",
                }}
              >
                ANTOJO<span style={{ color: "var(--color-wine)" }}>.</span>
              </div>
              <button onClick={onClose} className="btn btn-ghost btn-icon">
                <X size={18} />
              </button>
            </div>
            {/* Nav items */}
            <div style={{ padding: "12px 12px 0" }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`nav-item ${isActive ? "active" : ""}`}
                    style={{ minHeight: 48 }}
                  >
                    <Icon className="nav-icon" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
