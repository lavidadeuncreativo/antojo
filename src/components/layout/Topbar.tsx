"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Settings, Bell, Search, Sparkles } from "lucide-react";

interface TopbarProps {
  onMenuToggle?: () => void;
}

interface CapsuleItem {
  href: string;
  label: string;
}

export function Topbar({ onMenuToggle }: TopbarProps) {
  const pathname = usePathname();

  // Determine which sub-menu to display in the top capsule based on pathname
  let capsuleItems: CapsuleItem[] = [];
  
  if (pathname === "/dashboard") {
    capsuleItems = [
      { href: "/dashboard", label: "Resumen" },
      { href: "/sales", label: "Ventas" },
      { href: "/products", label: "Productos" },
      { href: "/inventory", label: "Inventario" },
      { href: "/finance", label: "Finanzas" },
      { href: "/calendar", label: "Calendario" },
    ];
  } else if (
    pathname.startsWith("/sales") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/inventory") ||
    pathname.startsWith("/production") ||
    pathname.startsWith("/purchases")
  ) {
    capsuleItems = [
      { href: "/sales", label: "Ventas" },
      { href: "/products", label: "Productos" },
      { href: "/inventory", label: "Inventario" },
      { href: "/production", label: "Producción" },
      { href: "/purchases", label: "Compras" },
    ];
  } else if (
    pathname.startsWith("/finance") ||
    pathname.startsWith("/commercial") ||
    pathname.startsWith("/events") ||
    pathname.startsWith("/quotes")
  ) {
    capsuleItems = [
      { href: "/finance", label: "Finanzas" },
      { href: "/commercial", label: "Comercial" },
      { href: "/events", label: "Eventos" },
      { href: "/quotes", label: "Cotizaciones" },
    ];
  } else {
    capsuleItems = [
      { href: "/marketing", label: "Marketing" },
      { href: "/calendar", label: "Calendario" },
      { href: "/growth", label: "Crecimiento" },
      { href: "/reports", label: "Reportes" },
      { href: "/settings", label: "Configuración" },
    ];
  }

  return (
    <header className="w-full flex items-center justify-between h-12 mb-6 gap-4 border-b border-white/5 pb-4 select-none">
      {/* Mobile Menu trigger & Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="visible-mobile w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white"
          aria-label="Menú principal"
        >
          <Menu size={16} />
        </button>

        {/* Brand Logo inside dashboard shell (Matches "qb" icon from mockup) */}
        <Link href="/dashboard" className="flex items-center gap-2 group decoration-none">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-sm group-hover:border-[var(--border-strong)] transition-all duration-180">
            qb
          </div>
          <span className="hidden-mobile font-semibold text-sm tracking-tight text-white group-hover:text-[var(--color-accent)] transition-all duration-180">
            ANTOJO<span className="text-[var(--color-accent)]">.</span>
          </span>
        </Link>
      </div>

      {/* Center: Capsule Navigation (Matches capsule bar from mockup) */}
      <nav className="hidden-mobile nav-container mx-auto">
        {capsuleItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right side: User card & Quick actions */}
      <div className="flex items-center gap-2">
        {/* Search button / Icon */}
        <button
          className="w-9 h-9 hidden-mobile flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[var(--color-text-secondary)] hover:text-white hover:border-white/20 transition-all duration-180"
          title="Buscar"
        >
          <Search size={15} />
        </button>

        {/* Notification indicator */}
        <button
          className="w-9 h-9 relative flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[var(--color-text-secondary)] hover:text-white hover:border-white/20 transition-all duration-180"
          title="Notificaciones"
        >
          <Bell size={15} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--color-error)]" />
        </button>

        {/* User Badge Capsule (Matches Jon Snow avatar capsule from mockup) */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full pl-2 pr-1 py-1 h-9 select-none">
          {/* Mock profile photo */}
          <div className="w-[26px] h-[26px] rounded-full bg-[var(--color-surface)] border border-white/20 flex items-center justify-center overflow-hidden font-bold text-xs text-[var(--color-ink)] select-none">
            AC
          </div>
          <div className="hidden-mobile flex flex-col text-left pr-3">
            <span className="text-[10px] font-bold leading-tight text-white">Admin ANTOJO</span>
            <span className="text-[8px] leading-tight text-[var(--color-text-muted)]">Control OS</span>
          </div>
        </div>

        {/* Small settings icon next to user (Matches mockup) */}
        <Link
          href="/settings"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[var(--color-text-secondary)] hover:text-white hover:border-white/20 transition-all duration-180"
          title="Configuración"
        >
          <Settings size={15} />
        </Link>
      </div>
    </header>
  );
}
