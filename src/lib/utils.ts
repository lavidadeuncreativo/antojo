// ============================================================
// ANTOJO OS — Utilidades de negocio
// ============================================================

import { format, formatDistanceToNow, parseISO } from "date-fns";
import { es } from "date-fns/locale";

// ── Formateo de moneda ────────────────────────────────────────

export function formatCurrency(
  value: number | string | null | undefined,
  options?: { compact?: boolean }
): string {
  const num = typeof value === "string" ? parseFloat(value) : (value ?? 0);
  if (isNaN(num)) return "$0.00";

  if (options?.compact && Math.abs(num) >= 1000) {
    const compact = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
    return compact;
  }

  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

// ── Formateo de números ────────────────────────────────────────

export function formatNumber(
  value: number | string | null | undefined,
  decimals = 0
): string {
  const num = typeof value === "string" ? parseFloat(value) : (value ?? 0);
  if (isNaN(num)) return "0";
  return new Intl.NumberFormat("es-MX", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

// ── Formateo de porcentajes ────────────────────────────────────

export function formatPercent(
  value: number | string | null | undefined,
  decimals = 1
): string {
  const num = typeof value === "string" ? parseFloat(value) : (value ?? 0);
  if (isNaN(num)) return "0%";
  return `${num.toFixed(decimals)}%`;
}

// ── Fechas ────────────────────────────────────────────────────

export function formatDate(
  date: string | Date | null | undefined,
  pattern = "d MMM yyyy"
): string {
  if (!date) return "—";
  const parsed = typeof date === "string" ? parseISO(date) : date;
  return format(parsed, pattern, { locale: es });
}

export function formatDatetime(
  date: string | Date | null | undefined
): string {
  if (!date) return "—";
  const parsed = typeof date === "string" ? parseISO(date) : date;
  return format(parsed, "d MMM yyyy, HH:mm", { locale: es });
}

export function formatRelative(date: string | Date | null | undefined): string {
  if (!date) return "—";
  const parsed = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(parsed, { addSuffix: true, locale: es });
}

// ── Cálculos de negocio ───────────────────────────────────────

/**
 * Calcula el margen de contribución
 * (precio - costo) / precio × 100
 */
export function calculateMargin(
  price: number,
  cost: number
): number {
  if (price <= 0) return 0;
  return ((price - cost) / price) * 100;
}

/**
 * Calcula la utilidad bruta
 */
export function calculateProfit(price: number, cost: number): number {
  return price - cost;
}

/**
 * Costo promedio ponderado móvil
 * (stock_actual × costo_actual + cantidad_nueva × costo_nuevo) / (stock_actual + cantidad_nueva)
 */
export function calculateWeightedAvgCost(
  currentStock: number,
  currentAvgCost: number,
  newQuantity: number,
  newUnitCost: number
): number {
  const totalStock = currentStock + newQuantity;
  if (totalStock <= 0) return newUnitCost;
  return (
    (currentStock * currentAvgCost + newQuantity * newUnitCost) / totalStock
  );
}

/**
 * Calcula el punto de equilibrio en unidades
 * costos_fijos / (precio - costo_variable)
 */
export function calculateBreakEven(
  fixedCosts: number,
  price: number,
  variableCost: number
): number {
  const contribution = price - variableCost;
  if (contribution <= 0) return Infinity;
  return Math.ceil(fixedCosts / contribution);
}

/**
 * Costo estimado de una receta por unidad
 */
export function calculateRecipeCost(
  items: Array<{ quantity: number; cost: number }>,
  yield_units: number,
  waste_percent = 0
): number {
  if (yield_units <= 0) return 0;
  const totalRawCost = items.reduce(
    (sum, item) => sum + item.quantity * item.cost,
    0
  );
  const wasteMultiplier = 1 + waste_percent / 100;
  return (totalRawCost * wasteMultiplier) / yield_units;
}

// ── Simulador de promociones ───────────────────────────────────

export type PromoMechanic =
  | "percent_discount"
  | "fixed_discount"
  | "two_for_one"
  | "two_for_price"
  | "second_unit_discount"
  | "bundle"
  | "wholesale_price";

export interface PromoSimulationInput {
  mechanic: PromoMechanic;
  price: number;
  cost: number;
  discountPercent?: number;
  discountFixed?: number;
  specialPrice?: number;
  secondUnitDiscount?: number;
  bundleQty?: number;
  bundlePrice?: number;
  expectedUnits: number;
  additionalCost?: number;
  minMargin?: number;
}

export interface PromoSimulationResult {
  promoPrice: number;
  unitRevenue: number;
  unitCost: number;
  unitProfit: number;
  margin: number;
  normalProfit: number;
  normalMargin: number;
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  profitDiff: number;
  additionalUnitsNeeded: number;
  riskLevel: "green" | "yellow" | "red";
  recommendation: string;
}

export function simulatePromotion(
  input: PromoSimulationInput
): PromoSimulationResult {
  const {
    mechanic,
    price,
    cost,
    discountPercent = 0,
    discountFixed = 0,
    specialPrice,
    secondUnitDiscount = 0,
    bundleQty = 2,
    bundlePrice = 0,
    expectedUnits,
    additionalCost = 0,
    minMargin = 20,
  } = input;

  let promoPrice = price;
  let unitRevenue = price;
  let unitCost = cost;

  switch (mechanic) {
    case "percent_discount":
      promoPrice = price * (1 - discountPercent / 100);
      unitRevenue = promoPrice;
      break;
    case "fixed_discount":
      promoPrice = price - discountFixed;
      unitRevenue = promoPrice;
      break;
    case "two_for_one":
      // 2 unidades por el precio de 1
      unitRevenue = price / 2;
      unitCost = cost;
      promoPrice = price / 2;
      break;
    case "two_for_price":
      unitRevenue = (specialPrice ?? price * 1.5) / 2;
      unitCost = cost;
      promoPrice = specialPrice ?? price * 1.5;
      break;
    case "second_unit_discount":
      unitRevenue = (price + price * (1 - secondUnitDiscount / 100)) / 2;
      promoPrice = price * (1 - secondUnitDiscount / 100);
      break;
    case "bundle":
      unitRevenue = bundlePrice / bundleQty;
      promoPrice = bundlePrice;
      break;
    case "wholesale_price":
      promoPrice = specialPrice ?? price * 0.85;
      unitRevenue = promoPrice;
      break;
  }

  unitCost = unitCost + additionalCost / Math.max(expectedUnits, 1);
  const unitProfit = unitRevenue - unitCost;
  const margin = unitRevenue > 0 ? (unitProfit / unitRevenue) * 100 : 0;

  const normalProfit = price - cost;
  const normalMargin = price > 0 ? (normalProfit / price) * 100 : 0;

  const totalRevenue = unitRevenue * expectedUnits;
  const totalCost = unitCost * expectedUnits;
  const totalProfit = unitProfit * expectedUnits;
  const profitDiff = unitProfit - normalProfit;

  // Unidades adicionales para compensar la reducción de margen
  const additionalUnitsNeeded =
    profitDiff < 0 && unitProfit > 0
      ? Math.ceil(
          (normalProfit * expectedUnits) / unitProfit - expectedUnits
        )
      : 0;

  // Semáforo
  let riskLevel: "green" | "yellow" | "red";
  let recommendation: string;

  if (margin >= minMargin) {
    riskLevel = "green";
    recommendation = `Esta promoción es viable. Genera $${formatCurrency(unitProfit)} de contribución unitaria (margen de ${margin.toFixed(1)}%). ${additionalUnitsNeeded > 0 ? `Se requiere vender ${additionalUnitsNeeded} unidades adicionales para igualar la utilidad total normal.` : ""}`;
  } else if (margin >= minMargin * 0.6 && margin < minMargin) {
    riskLevel = "yellow";
    recommendation = `Esta promoción reduce el margen a ${margin.toFixed(1)}% (mínimo permitido: ${minMargin}%). Solo es viable si vendes ${additionalUnitsNeeded > 0 ? `${additionalUnitsNeeded} unidades adicionales` : "volúmenes altos"}.`;
  } else {
    riskLevel = "red";
    recommendation = `Esta promoción reduce demasiado el margen (${margin.toFixed(1)}%). La contribución por unidad baja de $${normalProfit.toFixed(2)} a $${unitProfit.toFixed(2)}. ${additionalUnitsNeeded > 0 ? `Necesitarías vender ${additionalUnitsNeeded} unidades más para compensar.` : ""}`;
  }

  return {
    promoPrice,
    unitRevenue,
    unitCost,
    unitProfit,
    margin,
    normalProfit,
    normalMargin,
    totalRevenue,
    totalCost,
    totalProfit,
    profitDiff,
    additionalUnitsNeeded,
    riskLevel,
    recommendation,
  };
}

// ── Generadores de folios ─────────────────────────────────────

export function generateFolio(prefix: string, sequence: number): string {
  return `${prefix}-${String(sequence).padStart(5, "0")}`;
}

// ── Clases CSS ────────────────────────────────────────────────

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ── Variación porcentual ───────────────────────────────────────

export function percentChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}
