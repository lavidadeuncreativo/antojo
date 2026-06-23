"use client";

import { Search, Bell, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TopbarProps {
  onMenuToggle?: () => void;
}

const quickActions = [
  { label: "Registrar venta", href: "/sales/new", shortcut: "V" },
  { label: "Crear lote", href: "/production/new", shortcut: "L" },
  { label: "Registrar compra", href: "/purchases/new", shortcut: "C" },
  { label: "Registrar gasto", href: "/finance/expenses/new", shortcut: "G" },
  { label: "Crear cotización", href: "/quotes/new", shortcut: "Q" },
  { label: "Agendar tarea", href: "/calendar?new=task", shortcut: "T" },
];

export function Topbar({ onMenuToggle }: TopbarProps) {
  const [quickOpen, setQuickOpen] = useState(false);

  return (
    <header className="app-topbar">
      {/* Búsqueda global */}
      <div
        style={{
          flex: 1,
          maxWidth: 420,
          position: "relative",
        }}
      >
        <Search
          size={15}
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--color-text-muted)",
          }}
        />
        <input
          type="search"
          placeholder="Buscar productos, ventas, clientes… ⌘K"
          className="input-base"
          style={{
            paddingLeft: 36,
            fontSize: 13,
            height: 36,
            background: "var(--color-surface)",
            border: "1px solid transparent",
          }}
          onFocus={(e) => {
            e.currentTarget.style.background = "var(--color-white)";
            e.currentTarget.style.borderColor = "var(--color-border)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.background = "var(--color-surface)";
            e.currentTarget.style.borderColor = "transparent";
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
        {/* Acción rápida */}
        <div style={{ position: "relative" }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setQuickOpen(!quickOpen)}
            style={{ gap: 6 }}
          >
            <Plus size={14} />
            Crear
            <ChevronDown size={12} style={{ opacity: 0.7 }} />
          </button>

          <AnimatePresence>
            {quickOpen && (
              <>
                <div
                  style={{ position: "fixed", inset: 0, zIndex: 40 }}
                  onClick={() => setQuickOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    background: "var(--color-white)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-menu)",
                    padding: 6,
                    minWidth: 220,
                    zIndex: 50,
                  }}
                >
                  {quickActions.map((action) => (
                    <a
                      key={action.href}
                      href={action.href}
                      onClick={() => setQuickOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "9px 12px",
                        borderRadius: "var(--radius-md)",
                        fontSize: 14,
                        color: "var(--color-text)",
                        textDecoration: "none",
                        transition: "background 0.1s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "var(--color-surface)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                      }}
                    >
                      <span>{action.label}</span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "var(--color-text-muted)",
                          background: "var(--color-surface)",
                          padding: "2px 6px",
                          borderRadius: 4,
                          fontWeight: 500,
                        }}
                      >
                        {action.shortcut}
                      </span>
                    </a>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Notificaciones */}
        <button
          className="btn btn-ghost btn-icon"
          aria-label="Notificaciones"
          style={{ position: "relative" }}
        >
          <Bell size={18} />
          {/* Badge de notificación */}
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 7,
              height: 7,
              background: "var(--color-wine)",
              borderRadius: "50%",
              border: "2px solid var(--color-cream)",
            }}
          />
        </button>

        {/* Avatar */}
        <button
          className="btn btn-ghost"
          style={{ gap: 8, padding: "5px 8px", borderRadius: "var(--radius-md)" }}
          aria-label="Perfil"
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "var(--color-wine-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--color-wine)",
            }}
          >
            A
          </div>
        </button>
      </div>
    </header>
  );
}
