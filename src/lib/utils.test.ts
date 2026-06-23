import { describe, it, expect } from "vitest";
import {
  calculateMargin,
  calculateProfit,
  calculateWeightedAvgCost,
  calculateBreakEven,
  calculateRecipeCost,
  simulatePromotion,
  percentChange,
} from "./utils";

describe("Cálculos Financieros (ANTOJO OS)", () => {
  describe("calculateMargin", () => {
    it("debe calcular el margen correctamente", () => {
      expect(calculateMargin(100, 70)).toBe(30); // (100-70)/100 * 100 = 30%
      expect(calculateMargin(50, 10)).toBe(80);
    });

    it("debe retornar 0 si el precio es 0 o negativo", () => {
      expect(calculateMargin(0, 10)).toBe(0);
      expect(calculateMargin(-50, 10)).toBe(0);
    });
  });

  describe("calculateProfit", () => {
    it("debe calcular la utilidad bruta correctamente", () => {
      expect(calculateProfit(100, 70)).toBe(30);
      expect(calculateProfit(50, 60)).toBe(-10);
    });
  });

  describe("calculateWeightedAvgCost", () => {
    it("debe calcular el costo promedio ponderado", () => {
      // 10 unidades a $10 c/u, compramos 10 más a $20 c/u
      // (100 + 200) / 20 = 15
      expect(calculateWeightedAvgCost(10, 10, 10, 20)).toBe(15);
    });

    it("debe retornar el nuevo costo si el stock actual es 0", () => {
      expect(calculateWeightedAvgCost(0, 10, 5, 20)).toBe(20);
    });
  });

  describe("calculateBreakEven", () => {
    it("debe calcular el punto de equilibrio en unidades", () => {
      // Costos fijos 1000, Precio 50, Costo variable 30
      // 1000 / (50 - 30) = 50 unidades
      expect(calculateBreakEven(1000, 50, 30)).toBe(50);
    });

    it("debe retornar Infinity si la contribución marginal es <= 0", () => {
      expect(calculateBreakEven(1000, 30, 30)).toBe(Infinity);
      expect(calculateBreakEven(1000, 20, 30)).toBe(Infinity);
    });
  });

  describe("calculateRecipeCost", () => {
    it("debe calcular el costo de la receta correctamente", () => {
      const items = [
        { quantity: 2, cost: 5 }, // 10
        { quantity: 1, cost: 20 }, // 20
      ];
      // Total 30 / 1 unidad = 30
      expect(calculateRecipeCost(items, 1)).toBe(30);
    });

    it("debe aplicar merma correctamente", () => {
      const items = [{ quantity: 1, cost: 100 }];
      // 100 con 10% merma = 110
      expect(calculateRecipeCost(items, 1, 10)).toBeCloseTo(110);
    });

    it("debe retornar 0 si las unidades de rendimiento son <= 0", () => {
      expect(calculateRecipeCost([{ quantity: 1, cost: 10 }], 0)).toBe(0);
    });
  });

  describe("percentChange", () => {
    it("debe calcular el cambio porcentual", () => {
      expect(percentChange(150, 100)).toBe(50);
      expect(percentChange(50, 100)).toBe(-50);
    });

    it("debe manejar un valor anterior de 0", () => {
      expect(percentChange(100, 0)).toBe(100);
      expect(percentChange(0, 0)).toBe(0);
    });
  });

  describe("simulatePromotion", () => {
    it("debe simular descuento porcentual", () => {
      const result = simulatePromotion({
        mechanic: "percent_discount",
        price: 100,
        cost: 40,
        discountPercent: 20,
        expectedUnits: 10,
        minMargin: 30,
      });

      expect(result.promoPrice).toBe(80);
      expect(result.unitProfit).toBe(40); // 80 - 40
      expect(result.margin).toBe(50); // 40 / 80
      expect(result.riskLevel).toBe("green");
    });

    it("debe advertir (riskLevel yellow) si el margen baja por debajo de minMargin pero más del 60%", () => {
      const result = simulatePromotion({
        mechanic: "percent_discount",
        price: 100,
        cost: 60,
        discountPercent: 15, // Precio promo = 85. Ganancia = 25. Margen = 25/85 = 29.4%
        expectedUnits: 10,
        minMargin: 35, // El 60% de 35 es 21. 29.4 está en medio.
      });

      expect(result.margin).toBeCloseTo(29.4, 1);
      expect(result.riskLevel).toBe("yellow");
    });

    it("debe alertar (riskLevel red) si el margen es menor al 60% del minMargin", () => {
      const result = simulatePromotion({
        mechanic: "fixed_discount",
        price: 100,
        cost: 80,
        discountFixed: 10, // Precio promo = 90. Ganancia = 10. Margen = 11.1%
        expectedUnits: 10,
        minMargin: 30, // 60% de 30 = 18. Margen es 11.1 < 18
      });

      expect(result.margin).toBeCloseTo(11.1, 1);
      expect(result.riskLevel).toBe("red");
    });
  });
});
