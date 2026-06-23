"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";

interface NavItemDetails {
  href: string;
  label: string;
  group: "principal" | "operaciones" | "negocios" | "estrategia" | "sistema";
}

const navItems: NavItemDetails[] = [
  { href: "/dashboard", label: "Resumen", group: "principal" },
  { href: "/sales", label: "Ventas", group: "operaciones" },
  { href: "/products", label: "Productos y Recetas", group: "operaciones" },
  { href: "/inventory", label: "Inventario", group: "operaciones" },
  { href: "/production", label: "Producción", group: "operaciones" },
  { href: "/purchases", label: "Compras", group: "operaciones" },
  { href: "/finance", label: "Finanzas", group: "negocios" },
  { href: "/commercial", label: "Comercial", group: "negocios" },
  { href: "/events", label: "Eventos", group: "negocios" },
  { href: "/quotes", label: "Cotizaciones", group: "negocios" },
  { href: "/marketing", label: "Marketing", group: "estrategia" },
  { href: "/calendar", label: "Calendario", group: "estrategia" },
  { href: "/growth", label: "Crecimiento", group: "estrategia" },
  { href: "/reports", label: "Reportes", group: "estrategia" },
  { href: "/settings", label: "Configuración", group: "sistema" },
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

  // Group nav items
  const groups = navItems.reduce<Record<string, NavItemDetails[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  return (
    <aside className="app-sidebar select-none h-screen sticky top-0 overflow-y-auto">
      {/* Sidebar Header Brand (Clean text logo) */}
      <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
        <Link href="/dashboard" className="decoration-none">
          <span className="font-extrabold text-2xl text-black tracking-tighter block leading-none">
            ANTOJO<span className="text-black">.</span>
          </span>
          <span className="text-[11px] font-bold text-[var(--color-text-muted)] tracking-widest uppercase block mt-1.5">
            control erp
          </span>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-4 space-y-6">
        {Object.entries(groups).map(([group, items]) => (
          <div key={group} className="space-y-2 mb-6">
            <span className="text-xs font-extrabold text-[var(--color-text-muted)] uppercase tracking-widest block px-4 mb-2">
              {groupLabels[group]}
            </span>
            <div className="space-y-0.5">
              {items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2.5 text-[15px] font-bold rounded-lg transition-all leading-tight ${
                      isActive
                        ? "bg-black text-white"
                        : "text-[var(--color-text-secondary)] hover:text-black hover:bg-black/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout button at the bottom */}
      <div className="p-4 border-t border-[var(--color-border)]">
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.href = "/";
            }
          }}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-[15px] font-bold text-[var(--color-text-secondary)] hover:text-black transition-all"
        >
          <LogOut size={16} />
          Salir del ERP
        </button>
      </div>
    </aside>
  );
}

// ── Mobile Bottom Navigation (Floating capsule) ────────────────────

export function MobileBottomNav({ onMenuOpen }: { onMenuOpen: () => void }) {
  const pathname = usePathname();

  // Simple tabs for mobile shortcuts
  const shortcuts = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/sales", label: "Ventas" },
    { href: "/inventory", label: "Almacén" },
    { href: "/finance", label: "Caja" },
  ];

  return (
    <nav
      className="fixed bottom-4 left-4 right-4 h-12 z-50 flex items-center justify-around px-2 border"
      style={{
        background: "#FFFFFF",
        borderColor: "var(--color-border)",
        borderRadius: "999px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
      }}
    >
      {shortcuts.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
              isActive
                ? "bg-black text-white"
                : "text-[var(--color-text-secondary)]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}

      <button
        onClick={onMenuOpen}
        className="px-3 py-1.5 text-xs font-bold text-[var(--color-text-secondary)] flex items-center gap-1"
      >
        <Menu size={14} />
        Más
      </button>
    </nav>
  );
}

// ── Mobile Menu Drawer ─────────────────────────────────────────────

export function MobileMenuDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  const grouped = navItems.reduce<Record<string, NavItemDetails[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--color-border)]"
            style={{
              borderRadius: "24px 24px 0 0",
              padding: "16px 20px calc(24px + env(safe-area-inset-bottom))",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 -8px 30px rgba(0,0,0,0.06)",
            }}
          >
            <div className="w-8 h-1 bg-black/10 rounded-full mx-auto mb-6" />

            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)] mb-6">
              <div>
                <h3 className="font-extrabold text-xl text-black">ANTOJO.</h3>
                <p className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                  Navegación del Negocio
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-black/10 text-black"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-6">
              {Object.entries(grouped).map(([group, items]) => (
                <div key={group}>
                  <h4 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3 px-1 text-left">
                    {groupLabels[group]}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                            isActive
                              ? "bg-black text-white"
                              : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-black/5 hover:text-black"
                          }`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
