import { LucideIcon } from "lucide-react";

export interface SaleByDay {
  dia: string;
  ventas: number;
  costo: number;
}

export interface SaleByChannel {
  name: string;
  value: number;
  color: string;
}

export interface TopProduct {
  name: string;
  units: number;
  revenue: number;
  margin: number;
}

export interface AlertData {
  type: "warning" | "error" | "success" | "info";
  message: string;
  link: string;
  iconName: "Package" | "AlertTriangle" | "Users" | "CheckCircle2" | "XCircle";
}

export interface UpcomingEvent {
  name: string;
  date: string;
  guests: number;
  status: "confirmed" | "prospect";
}

export interface RecentSale {
  folio: string;
  customer: string;
  total: number;
  channel: string;
  time: string;
}

export interface DashboardData {
  salesByDay: SaleByDay[];
  salesByChannel: SaleByChannel[];
  topProducts: TopProduct[];
  alerts: AlertData[];
  upcomingEvents: UpcomingEvent[];
  recentSales: RecentSale[];
  kpis: {
    totalSales: { current: number; previous: number; miniData: number[] };
    estimatedProfit: { current: number; previous: number; miniData: number[] };
    avgMargin: { current: number; previous: number; miniData: number[] };
    unitsSold: { current: number; previous: number; miniData: number[] };
    avgTicket: { current: number; previous: number };
    expenses: { current: number; previous: number };
  };
  monthlyGoal: {
    current: number;
    goal: number;
  };
}
