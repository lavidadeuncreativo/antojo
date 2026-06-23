import type { Metadata } from "next";
import { DashboardClient } from "./DashboardClient";
import { demoDashboardData } from "@/lib/demo-data";
import { DashboardData } from "@/types/dashboard";

export const metadata: Metadata = {
  title: "Resumen",
  description: "Vista general de ANTOJO — ventas, inventario, producción y métricas del negocio",
};

export default async function DashboardPage() {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  
  let data: DashboardData;

  if (isDemoMode) {
    data = demoDashboardData;
  } else {
    // Aquí irá la lógica real de Supabase cuando se implemente en las siguientes fases
    // Para no romper si accidentalmente es false sin DB, caemos al demo con un warning
    console.warn("Real database fetching is pending Phase 2/3/4 implementation. Falling back to demo data.");
    data = demoDashboardData;
  }

  return <DashboardClient data={data} />;
}
