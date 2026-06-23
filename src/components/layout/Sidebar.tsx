"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";

interface NavItemDetails {
  href: string;
  label: string;
  group: "main" | "secondary";
}

const navItems: NavItemDetails[] = [
  { href: "/dashboard", label: "Resumen", group: "main" },
  { href: "/sales", label: "Ventas", group: "main" },
  { href: "/products", label: "Productos", group: "main" },
  { href: "/finance", label: "Finanzas", group: "main" },
  { href: "/commercial", label: "Comercial", group: "main" },
  { href: "/marketing", label: "Marketing", group: "main" },
  { href: "/production", label: "Producción", group: "main" },
  { href: "/inventory", label: "Inventario", group: "main" },
  
  { href: "/purchases", label: "Compras", group: "secondary" },
  { href: "/events", label: "Eventos", group: "secondary" },
  { href: "/quotes", label: "Cotizaciones", group: "secondary" },
  { href: "/calendar", label: "Calendario", group: "secondary" },
  { href: "/growth", label: "Crecimiento", group: "secondary" },
  { href: "/reports", label: "Reportes", group: "secondary" },
  { href: "/settings", label: "Configuración", group: "secondary" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const mainItems = navItems.filter(i => i.group === "main");
  const secondaryItems = navItems.filter(i => i.group === "secondary");

  return (
    <aside className="app-sidebar select-none h-screen sticky top-0 overflow-y-auto bg-white border-r border-[#E5E5E5] flex flex-col">
      {/* Sidebar Header Brand */}
      <div className="p-8 pb-6 flex items-center justify-between">
        <Link href="/dashboard" className="decoration-none">
          <span className="font-extrabold text-sm text-black tracking-widest uppercase block leading-none">
            ANTOJO OS
          </span>
        </Link>
      </div>

      <div className="mx-8 border-b border-[#E5E5E5]"></div>

      {/* Main Navigation */}
      <nav className="p-8 space-y-4">
        {mainItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block text-3xl md:text-4xl tracking-tight transition-all duration-300 ease-out flex items-center gap-3 group ${
                isActive ? "text-black font-semibold" : "text-black/50 hover:text-black font-normal hover:translate-x-1"
              }`}
              style={{ letterSpacing: "-0.03em" }}
            >
              <span className={`w-1 h-6 rounded-r-full transition-all duration-300 ${isActive ? 'bg-black opacity-100' : 'bg-transparent opacity-0'} -ml-8 absolute`}></span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mx-8 border-b border-[#E5E5E5]"></div>

      {/* Secondary Navigation */}
      <nav className="p-8 space-y-3 flex-1">
        <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest block mb-4">
          SISTEMA
        </span>
        {secondaryItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block text-sm transition-all duration-300 ${
                isActive ? "text-black font-semibold" : "text-[var(--color-text-secondary)] hover:text-black font-medium hover:translate-x-1"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout button */}
      <div className="p-8">
        <button
          onClick={() => {
            if (typeof window !== "undefined") window.location.href = "/";
          }}
          className="block text-sm text-black/70 hover:text-black font-normal transition-all"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}

// ── Mobile Bottom Navigation ────────────────────────────────────────

export function MobileBottomNav({ onMenuOpen }: { onMenuOpen: () => void }) {
  const pathname = usePathname();

  const shortcuts = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/sales", label: "Ventas" },
    { href: "/finance", label: "Caja" },
  ];

  return (
    <nav
      className="fixed bottom-4 left-4 right-4 h-14 z-40 flex items-center justify-around px-4 bg-white border border-[#E5E5E5]"
      style={{
        borderRadius: "999px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
      }}
    >
      {shortcuts.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
              isActive ? "bg-black text-white" : "text-black/60"
            }`}
          >
            {item.label}
          </Link>
        );
      })}

      <button
        onClick={onMenuOpen}
        className="px-4 py-2 text-xs font-semibold text-black flex items-center gap-2"
      >
        <Menu size={16} />
        Menu
      </button>
    </nav>
  );
}

// ── Mobile Menu Fullscreen ──────────────────────────────────────────

export function MobileMenuDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const mainItems = navItems.filter(i => i.group === "main");
  const secondaryItems = navItems.filter(i => i.group === "secondary");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: "10%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "10%" }}
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-white overflow-y-auto"
        >
          <div className="min-h-screen flex flex-col p-6 max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-6">
              <span className="font-semibold text-sm tracking-widest uppercase text-black">
                ANTOJO OS
              </span>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F5F5] text-black hover:bg-[#E5E5E5] transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="border-b border-[#E5E5E5] w-full"></div>

            {/* Main Links */}
            <div className="py-8 space-y-5">
              {mainItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`block text-[34px] leading-none tracking-tight ${
                      isActive ? "text-black font-medium" : "text-black font-light"
                    }`}
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="border-b border-[#E5E5E5] w-full mb-8"></div>

            {/* Secondary Links */}
            <div className="space-y-4 flex-1">
              <button onClick={() => { if (typeof window !== "undefined") window.location.href = "/"; }} className="block text-base text-black font-light mb-8">
                Cerrar Sesión
              </button>

              <span className="text-[10px] font-bold text-[#999999] uppercase tracking-widest block mb-4">
                SISTEMA
              </span>
              
              {secondaryItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`block text-[15px] ${
                      isActive ? "text-black font-medium" : "text-black font-light"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
