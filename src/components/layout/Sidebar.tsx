"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Wallet,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";

interface RailItem {
  href: string;
  group: "principal" | "operaciones" | "negocios" | "estrategia";
  icon: React.ElementType;
  label: string;
  paths: string[];
}

const railItems: RailItem[] = [
  {
    href: "/dashboard",
    group: "principal",
    icon: LayoutDashboard,
    label: "Dashboard",
    paths: ["/dashboard"],
  },
  {
    href: "/sales",
    group: "operaciones",
    icon: Package,
    label: "Operaciones",
    paths: ["/sales", "/products", "/inventory", "/production", "/purchases"],
  },
  {
    href: "/finance",
    group: "negocios",
    icon: Wallet,
    label: "Negocios",
    paths: ["/finance", "/commercial", "/events", "/quotes"],
  },
  {
    href: "/marketing",
    group: "estrategia",
    icon: Settings,
    label: "Estrategia y Sistema",
    paths: ["/marketing", "/calendar", "/growth", "/reports", "/settings"],
  },
];

// Helper to check if a rail item is active based on current path
function isItemActive(item: RailItem, pathname: string): boolean {
  if (item.group === "principal") {
    return pathname === "/dashboard";
  }
  return item.paths.some(p => pathname === p || pathname.startsWith(p + "/"));
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="side-rail flex flex-col items-center justify-between py-6">
      {/* Top Logo Icon */}
      <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg select-none">
        <span className="text-[var(--color-accent)]">a</span>b
      </div>

      {/* Mid Rail Icons */}
      <div className="flex flex-col gap-3.5 my-auto">
        {railItems.map((item) => {
          const Icon = item.icon;
          const isActive = isItemActive(item, pathname);

          return (
            <Link
              key={item.group}
              href={item.href}
              className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-180 ease-premium relative ${
                isActive
                  ? "bg-[var(--color-accent)] text-[var(--color-ink)] shadow-md"
                  : "text-[var(--color-text-primary)]/80 hover:bg-white/10 hover:text-white"
              }`}
              title={item.label}
            >
              <Icon size={19} strokeWidth={1.8} />
              {isActive && (
                <motion.div
                  layoutId="activeRailIndicator"
                  className="absolute -right-[6px] w-[3px] h-3 bg-[var(--color-accent)] rounded-l-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Action Icon (Logout/System) */}
      <button
        onClick={() => {
          // Fallback simple o logout demo
          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        }}
        className="w-11 h-11 flex items-center justify-center rounded-full text-[var(--color-text-muted)] hover:bg-white/10 hover:text-white transition-all duration-180 ease-premium"
        title="Salir"
      >
        <LogOut size={18} strokeWidth={1.8} />
      </button>
    </aside>
  );
}

// ── Bottom Navigation (Mobile - Styled as floating pill) ──────────

export function MobileBottomNav({ onMenuOpen }: { onMenuOpen: () => void }) {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-4 left-4 right-4 h-14 z-50 flex items-center justify-around px-2"
      style={{
        background: "rgba(45, 43, 42, 0.88)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid var(--border-medium)",
        borderRadius: "999px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.38)",
      }}
    >
      {railItems.map((item) => {
        const Icon = item.icon;
        const isActive = isItemActive(item, pathname);

        return (
          <Link
            key={item.group}
            href={item.href}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-180 ${
              isActive
                ? "bg-[var(--color-accent)] text-[var(--color-ink)]"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
            title={item.label}
          >
            <Icon size={18} strokeWidth={1.8} />
          </Link>
        );
      })}

      {/* Plus/Menu Trigger for all subpaths */}
      <button
        onClick={onMenuOpen}
        className="w-10 h-10 flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-180"
        title="Más Opciones"
      >
        <Menu size={18} strokeWidth={1.8} />
      </button>
    </nav>
  );
}

// ── Mobile Full Menu Drawer (Styled as dark glass sheet) ──────────

interface NavItemDetails {
  href: string;
  label: string;
  group: string;
}

const allNavItems: NavItemDetails[] = [
  { href: "/dashboard", label: "Dashboard / Resumen", group: "Principal" },
  { href: "/sales", label: "Ventas", group: "Operaciones" },
  { href: "/products", label: "Productos y Recetas", group: "Operaciones" },
  { href: "/inventory", label: "Inventario", group: "Operaciones" },
  { href: "/production", label: "Producción", group: "Operaciones" },
  { href: "/purchases", label: "Compras", group: "Operaciones" },
  { href: "/finance", label: "Finanzas", group: "Negocios" },
  { href: "/commercial", label: "Comercial", group: "Negocios" },
  { href: "/events", label: "Eventos", group: "Negocios" },
  { href: "/quotes", label: "Cotizaciones", group: "Negocios" },
  { href: "/marketing", label: "Marketing", group: "Estrategia" },
  { href: "/calendar", label: "Calendario", group: "Estrategia" },
  { href: "/growth", label: "Crecimiento", group: "Estrategia" },
  { href: "/reports", label: "Reportes", group: "Estrategia" },
  { href: "/settings", label: "Configuración", group: "Sistema" },
];

export function MobileMenuDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  // Group items for the drawer layout
  const groupedItems = allNavItems.reduce<Record<string, NavItemDetails[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[6px]"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed bottom-0 left-0 right-0 z-50 overflow-y-auto"
            style={{
              background: "linear-gradient(180deg, rgba(65, 63, 62, 0.96) 0%, rgba(35, 34, 33, 0.98) 100%)",
              borderTop: "1px solid var(--border-strong)",
              borderRadius: "24px 24px 0 0",
              padding: "16px 20px calc(24px + env(safe-area-inset-bottom))",
              maxHeight: "85vh",
              boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
            }}
          >
            {/* Grab handle */}
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="font-bold text-lg text-white">ANTOJO<span className="text-[var(--color-accent)]">.</span></h3>
                <p className="text-[10px] text-[var(--color-text-muted)] tracking-widest uppercase">Navegación del Sistema</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content List */}
            <div className="space-y-6">
              {Object.entries(groupedItems).map(([group, items]) => (
                <div key={group}>
                  <h4 className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2 px-1">
                    {group}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className={`flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-180 ${
                            isActive
                              ? "bg-[var(--color-accent)] text-[var(--color-ink)]"
                              : "bg-white/5 text-[var(--color-text-secondary)] hover:bg-white/10 hover:text-white"
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
