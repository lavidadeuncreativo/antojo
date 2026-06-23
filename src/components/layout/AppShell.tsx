"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar, MobileBottomNav, MobileMenuDrawer } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="app-layout">
      {/* Sidebar — desktop only */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Dashboard Glass Shell */}
      <main className="app-main">
        <Topbar onMenuToggle={() => setMobileMenuOpen(true)} />

        <motion.div
          className="app-content"
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 0.8, 0.2, 1] }}
        >
          {children}
        </motion.div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="block md:hidden">
        <MobileBottomNav onMenuOpen={() => setMobileMenuOpen(true)} />
        <MobileMenuDrawer
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>
    </div>
  );
}
