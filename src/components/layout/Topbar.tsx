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
          className="md:hidden p-1 text-black hover:bg-black/5 rounded"
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

      {/* Dynamic Breadcrumbs */}
      <div className="hidden md:flex items-center mx-auto flex-1 px-8">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#999999]">
          <span>Antojo OS</span>
          <span className="text-[#E5E5E5] px-1">/</span>
          <span className="text-black">{pathname.split('/')[1] || 'Dashboard'}</span>
        </div>
      </div>

      {/* Right elements: search, notifications, settings */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 text-[#999999] hover:text-black hover:bg-[#F9F9F9] rounded-full transition-all duration-300"
          title="Buscar"
        >
          <Search size={15} />
        </button>

        <button
          className="p-2 relative text-[#999999] hover:text-black hover:bg-[#F9F9F9] rounded-full transition-all duration-300"
          title="Notificaciones"
        >
          <Bell size={15} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-black ring-2 ring-white" />
        </button>

        <Link
          href="/settings"
          className="p-2 text-[#999999] hover:text-black hover:bg-[#F9F9F9] rounded-full transition-all duration-300"
          title="Configuración"
        >
          <Settings size={15} />
        </Link>

        <div className="w-px h-6 bg-[#E5E5E5] mx-2"></div>

        {/* User initials badge */}
        <div className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center font-bold text-xs bg-white text-black select-none hover:border-black cursor-pointer transition-all duration-300 shadow-sm">
          A
        </div>
      </div>
    </header>
  );
}
