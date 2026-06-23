"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Settings, Bell, Search } from "lucide-react";

interface TopbarProps {
  onMenuToggle?: () => void;
}

interface CapsuleItem {
  href: string;
  label: string;
}

export function Topbar({ onMenuToggle }: TopbarProps) {
  const pathname = usePathname();

  // Determine subpages navigation list based on path groups
  let navItems: CapsuleItem[] = [];
  
  if (pathname === "/dashboard") {
    navItems = [
      { href: "/dashboard", label: "resumen" },
      { href: "/sales", label: "ventas" },
      { href: "/products", label: "productos" },
      { href: "/inventory", label: "inventario" },
      { href: "/finance", label: "finanzas" },
      { href: "/calendar", label: "calendario" },
    ];
  } else if (
    pathname.startsWith("/sales") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/inventory") ||
    pathname.startsWith("/production") ||
    pathname.startsWith("/purchases")
  ) {
    navItems = [
      { href: "/sales", label: "ventas" },
      { href: "/products", label: "productos" },
      { href: "/inventory", label: "inventario" },
      { href: "/production", label: "producción" },
      { href: "/purchases", label: "compras" },
    ];
  } else if (
    pathname.startsWith("/finance") ||
    pathname.startsWith("/commercial") ||
    pathname.startsWith("/events") ||
    pathname.startsWith("/quotes")
  ) {
    navItems = [
      { href: "/finance", label: "finanzas" },
      { href: "/commercial", label: "comercial" },
      { href: "/events", label: "eventos" },
      { href: "/quotes", label: "cotizaciones" },
    ];
  } else {
    navItems = [
      { href: "/marketing", label: "marketing" },
      { href: "/calendar", label: "calendario" },
      { href: "/growth", label: "crecimiento" },
      { href: "/reports", label: "reportes" },
      { href: "/settings", label: "configuración" },
    ];
  }

  return (
    <header className="app-topbar select-none">
      {/* Brand logo & mobile trigger */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="visible-mobile p-1 text-black hover:bg-black/5 rounded"
          aria-label="Menú principal"
        >
          <Menu size={18} />
        </button>

        <Link href="/dashboard" className="flex items-col text-left group decoration-none">
          <span className="font-bold text-lg leading-tight tracking-tight text-black flex flex-col">
            <span className="font-extrabold uppercase text-xs tracking-widest text-[var(--color-text-secondary)]">Antojo</span>
            <span className="font-black text-lg tracking-tighter -mt-1 select-none">OS.</span>
          </span>
        </Link>
      </div>

      {/* Navigation (Swiss Minimalist Text Links) */}
      <nav className="hidden-mobile flex items-center gap-6 mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs font-bold transition-all uppercase tracking-wider ${
                isActive
                  ? "text-black border-b-[2px] border-black pb-0.5"
                  : "text-[var(--color-text-secondary)] hover:text-black"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right elements: search, notifications, settings */}
      <div className="flex items-center gap-3">
        <button
          className="p-1.5 text-[var(--color-text-secondary)] hover:text-black transition-all"
          title="Buscar"
        >
          <Search size={15} />
        </button>

        <button
          className="p-1.5 relative text-[var(--color-text-secondary)] hover:text-black transition-all"
          title="Notificaciones"
        >
          <Bell size={15} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-black" />
        </button>

        <Link
          href="/settings"
          className="p-1.5 text-[var(--color-text-secondary)] hover:text-black transition-all"
          title="Configuración"
        >
          <Settings size={15} />
        </Link>

        {/* User initials badge */}
        <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center font-bold text-xs bg-[var(--color-surface)] text-black select-none">
          A
        </div>
      </div>
    </header>
  );
}
