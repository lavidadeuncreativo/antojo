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
      <div className="hidden-mobile">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main */}
      <main
        className={`app-main ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}
        style={{
          marginLeft: sidebarCollapsed
            ? "var(--sidebar-collapsed-width)"
            : "var(--sidebar-width)",
        }}
      >
        <Topbar onMenuToggle={() => setMobileMenuOpen(true)} />

        <motion.div
          className="app-content"
          key={pathname}
          initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          {children}
        </motion.div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="visible-mobile">
        <MobileBottomNav onMenuOpen={() => setMobileMenuOpen(true)} />
        <MobileMenuDrawer
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>
    </div>
  );
}
