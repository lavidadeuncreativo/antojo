import { DashboardData } from "@/types/dashboard";

const miniSalesData = [1240, 890, 1680, 2100, 3200, 4100, 2800];
const miniUnitsData = [34, 22, 46, 58, 88, 112, 77];
const miniMarginData = [62, 64, 61, 65, 67, 63, 66];

export const demoDashboardData: DashboardData = {
  salesByDay: [
    { dia: "Lun", ventas: 1240, costo: 580 },
    { dia: "Mar", ventas: 890, costo: 420 },
    { dia: "Mié", ventas: 1680, costo: 790 },
    { dia: "Jue", ventas: 2100, costo: 980 },
    { dia: "Vie", ventas: 3200, costo: 1480 },
    { dia: "Sáb", ventas: 4100, costo: 1890 },
    { dia: "Dom", ventas: 2800, costo: 1300 },
  ],
  salesByChannel: [
    { name: "Calle directa", value: 38, color: "#701F2D" },
    { name: "Instagram", value: 24, color: "#A7606B" },
    { name: "WhatsApp", value: 18, color: "#F2E5E8" },
    { name: "Eventos", value: 12, color: "#B27C32" },
    { name: "Mayoreo", value: 8, color: "#47785A" },
  ],
  topProducts: [
    { name: "PÓCIMA", units: 142, revenue: 9230, margin: 67 },
    { name: "El Mañanero", units: 98, revenue: 5880, margin: 62 },
    { name: "AURA", units: 74, revenue: 4440, margin: 58 },
    { name: "Mojito Mezcal", units: 45, revenue: 3375, margin: 54 },
    { name: "Limonada Mineral", units: 38, revenue: 1900, margin: 48 },
  ],
  alerts: [
    { type: "warning", message: "Quedan 14 latas transparentes", link: "/inventory/alerts", iconName: "Package" },
    { type: "warning", message: "PÓCIMA está por debajo del stock mínimo", link: "/inventory/alerts", iconName: "AlertTriangle" },
    { type: "info", message: "Hay 3 cotizaciones sin seguimiento", link: "/quotes", iconName: "Users" },
    { type: "success", message: "El Mañanero — lote #012 listo para liberar", link: "/production", iconName: "CheckCircle2" },
    { type: "error", message: "La promo 2×$100 reduce el margen al 18%", link: "/promotions/simulator", iconName: "XCircle" },
  ],
  upcomingEvents: [
    { name: "Boda García — Barra completa", date: "28 Jun", guests: 120, status: "confirmed" },
    { name: "Activación Reforma", date: "2 Jul", guests: 0, status: "prospect" },
    { name: "Cumple corporativo Grupo Herdez", date: "5 Jul", guests: 80, status: "confirmed" },
  ],
  recentSales: [
    { folio: "VTA-00089", customer: "Sofía Ramírez", total: 650, channel: "Instagram", time: "hace 12 min" },
    { folio: "VTA-00088", customer: "Cliente general", total: 390, channel: "Calle", time: "hace 38 min" },
    { folio: "VTA-00087", customer: "Café Delicias", total: 2400, channel: "Mayoreo", time: "hace 2 h" },
  ],
  kpis: {
    totalSales: { current: 16010, previous: 13400, miniData: miniSalesData },
    estimatedProfit: { current: 9526, previous: 7800, miniData: miniSalesData.map(v => v * 0.6) },
    avgMargin: { current: 59.5, previous: 58.2, miniData: miniMarginData },
    unitsSold: { current: 437, previous: 382, miniData: miniUnitsData },
    avgTicket: { current: 366, previous: 351 },
    expenses: { current: 3200, previous: 2800 },
  },
  monthlyGoal: {
    current: 54800,
    goal: 75000,
  }
};
