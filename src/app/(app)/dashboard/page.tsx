import type { Metadata } from "next";
import { DashboardClient } from "./DashboardClient";

export const metadata: Metadata = {
  title: "Resumen",
  description: "Vista general de ANTOJO — ventas, inventario, producción y métricas del negocio",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
