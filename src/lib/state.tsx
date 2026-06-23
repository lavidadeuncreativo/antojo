"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────
export interface RecipeItem {
  ingredientId: string;
  qty: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  cost: number;
  margin: number;
  recipe: RecipeItem[];
}

export interface InventoryItem {
  id: string;
  name: string;
  unit: string;
  stock: number;
  min_stock: number;
}

export interface SaleItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
}

export interface Sale {
  id: string;
  folio: string;
  customer: string;
  total: number;
  channel: string;
  time: string;
  items: SaleItem[];
}

export interface Purchase {
  id: string;
  date: string;
  itemName: string;
  qty: number;
  cost: number;
  provider: string;
}

export interface ProductionBatch {
  id: string;
  date: string;
  productName: string;
  qty: number;
  status: "confirmado" | "pendiente";
}

export interface InventoryMovement {
  id: string;
  date: string;
  itemName: string;
  type: "entrada" | "salida";
  qty: number;
  reason: string;
}

interface StateContextType {
  products: Product[];
  inventory: InventoryItem[];
  sales: Sale[];
  purchases: Purchase[];
  production: ProductionBatch[];
  movements: InventoryMovement[];
  monthlyGoal: { current: number; goal: number };
  addSale: (sale: Omit<Sale, "id" | "folio" | "time">) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updated: Omit<Product, "id">) => void;
  addPurchase: (purchase: Omit<Purchase, "id" | "date">) => void;
  addProductionBatch: (batch: Omit<ProductionBatch, "id" | "date">) => boolean;
  addInventoryMovement: (movement: Omit<InventoryMovement, "id" | "date">) => void;
  resetAllData: () => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

// ── Initial Demo Data ──────────────────────────────────────
const initialInventory: InventoryItem[] = [
  { id: "i1", name: "Matcha Orgánico", unit: "g", stock: 1500, min_stock: 500 },
  { id: "i2", name: "Leche de Coco", unit: "ml", stock: 12000, min_stock: 4000 },
  { id: "i3", name: "Concentrado de Fresa", unit: "ml", stock: 3000, min_stock: 1000 },
  { id: "i4", name: "Agua Gasificada", unit: "ml", stock: 15000, min_stock: 5000 },
  { id: "i5", name: "Vasos Biodegradables", unit: "ud", stock: 350, min_stock: 100 },
  { id: "i6", name: "Cold Brew Base", unit: "ml", stock: 8000, min_stock: 2000 },
  { id: "i7", name: "Leche de Avena", unit: "ml", stock: 10000, min_stock: 3000 },
  { id: "i8", name: "Jarabe de Vainilla", unit: "ml", stock: 2000, min_stock: 500 },
  { id: "i9", name: "Mezcal Artesanal", unit: "ml", stock: 3000, min_stock: 1000 },
  { id: "i10", name: "Menta Fresca", unit: "g", stock: 300, min_stock: 100 },
];

const initialProducts: Product[] = [
  {
    id: "p1",
    name: "Matcha Latte Cream",
    price: 75,
    cost: 32,
    margin: 57,
    recipe: [
      { ingredientId: "i1", qty: 10 },
      { ingredientId: "i2", qty: 200 },
      { ingredientId: "i5", qty: 1 },
    ],
  },
  {
    id: "p2",
    name: "PÓCIMA Fresa",
    price: 65,
    cost: 22,
    margin: 66,
    recipe: [
      { ingredientId: "i3", qty: 30 },
      { ingredientId: "i4", qty: 250 },
      { ingredientId: "i5", qty: 1 },
    ],
  },
  {
    id: "p3",
    name: "El Mañanero Cold Brew",
    price: 60,
    cost: 23,
    margin: 62,
    recipe: [
      { ingredientId: "i6", qty: 150 },
      { ingredientId: "i7", qty: 150 },
      { ingredientId: "i8", qty: 15 },
      { ingredientId: "i5", qty: 1 },
    ],
  },
  {
    id: "p4",
    name: "Mojito Mezcal",
    price: 75,
    cost: 35,
    margin: 53,
    recipe: [
      { ingredientId: "i9", qty: 45 },
      { ingredientId: "i10", qty: 5 },
      { ingredientId: "i5", qty: 1 },
    ],
  },
];

const initialSales: Sale[] = [
  {
    id: "s1",
    folio: "VTA-00089",
    customer: "Sofía Ramírez",
    total: 650,
    channel: "Instagram",
    time: "hace 12 min",
    items: [{ productId: "p1", name: "Matcha Latte Cream", qty: 8, price: 75 }],
  },
  {
    id: "s2",
    folio: "VTA-00088",
    customer: "Cliente General",
    total: 390,
    channel: "Calle directa",
    time: "hace 38 min",
    items: [{ productId: "p2", name: "PÓCIMA Fresa", qty: 6, price: 65 }],
  },
  {
    id: "s3",
    folio: "VTA-00087",
    customer: "Café Delicias",
    total: 2400,
    channel: "Mayoreo",
    time: "hace 2 horas",
    items: [
      { productId: "p1", name: "Matcha Latte Cream", qty: 20, price: 75 },
      { productId: "p3", name: "El Mañanero Cold Brew", qty: 15, price: 60 },
    ],
  },
];

const initialPurchases: Purchase[] = [
  { id: "pr1", date: "2026-06-20", itemName: "Matcha Orgánico", qty: 1000, cost: 800, provider: "Matcha House" },
  { id: "pr2", date: "2026-06-21", itemName: "Vasos Biodegradables", qty: 500, cost: 450, provider: "EcoPack" },
];

const initialProduction: ProductionBatch[] = [
  { id: "pb1", date: "2026-06-22", productName: "Matcha Latte Cream", qty: 50, status: "confirmado" },
  { id: "pb2", date: "2026-06-23", productName: "PÓCIMA Fresa", qty: 30, status: "confirmado" },
];

const initialMovements: InventoryMovement[] = [
  { id: "m1", date: "2026-06-22", itemName: "Leche de Coco", type: "salida", qty: 1000, reason: "Merma por caducidad" },
  { id: "m2", date: "2026-06-23", itemName: "Matcha Orgánico", type: "entrada", qty: 1000, reason: "Compra de insumo" },
];

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [purchases, setPurchases] = useState<Purchase[]>(initialPurchases);
  const [production, setProduction] = useState<ProductionBatch[]>(initialProduction);
  const [movements, setMovements] = useState<InventoryMovement[]>(initialMovements);
  const [monthlyGoal, setMonthlyGoal] = useState({ current: 54800, goal: 75000 });

  const [hydrated, setHydrated] = useState(false);

  // Hydrate state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem("antojo_products");
      const storedInventory = localStorage.getItem("antojo_inventory");
      const storedSales = localStorage.getItem("antojo_sales");
      const storedPurchases = localStorage.getItem("antojo_purchases");
      const storedProduction = localStorage.getItem("antojo_production");
      const storedMovements = localStorage.getItem("antojo_movements");
      const storedGoal = localStorage.getItem("antojo_goal");

      if (storedProducts) setProducts(JSON.parse(storedProducts));
      if (storedInventory) setInventory(JSON.parse(storedInventory));
      if (storedSales) setSales(JSON.parse(storedSales));
      if (storedPurchases) setPurchases(JSON.parse(storedPurchases));
      if (storedProduction) setProduction(JSON.parse(storedProduction));
      if (storedMovements) setMovements(JSON.parse(storedMovements));
      if (storedGoal) setMonthlyGoal(JSON.parse(storedGoal));
      
      setHydrated(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (hydrated && typeof window !== "undefined") {
      localStorage.setItem("antojo_products", JSON.stringify(products));
      localStorage.setItem("antojo_inventory", JSON.stringify(inventory));
      localStorage.setItem("antojo_sales", JSON.stringify(sales));
      localStorage.setItem("antojo_purchases", JSON.stringify(purchases));
      localStorage.setItem("antojo_production", JSON.stringify(production));
      localStorage.setItem("antojo_movements", JSON.stringify(movements));
      localStorage.setItem("antojo_goal", JSON.stringify(monthlyGoal));
    }
  }, [products, inventory, sales, purchases, production, movements, monthlyGoal, hydrated]);

  // ── Operations functions ───────────────────────────────────

  // Add Sale: Deduct raw materials based on recipes!
  const addSale = (saleData: Omit<Sale, "id" | "folio" | "time">) => {
    const newId = `s_${Date.now()}`;
    const newFolio = `VTA-${String(sales.length + 90).padStart(5, "0")}`;
    const newTime = "hace unos segundos";

    const newSale: Sale = {
      ...saleData,
      id: newId,
      folio: newFolio,
      time: newTime,
    };

    // Deduct raw ingredients from inventory
    setInventory((currentInventory) => {
      const updated = currentInventory.map((invItem) => {
        let deductedQty = 0;
        
        saleData.items.forEach((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (product) {
            const recipeEntry = product.recipe.find((r) => r.ingredientId === invItem.id);
            if (recipeEntry) {
              deductedQty += recipeEntry.qty * item.qty;
            }
          }
        });

        if (deductedQty > 0) {
          // Log manual ledger entry for audit
          setTimeout(() => {
            addInventoryMovement({
              itemName: invItem.name,
              type: "salida",
              qty: deductedQty,
              reason: `Consumo por venta ${newFolio}`,
            });
          }, 0);
          return { ...invItem, stock: Math.max(0, invItem.stock - deductedQty) };
        }
        return invItem;
      });
      return updated;
    });

    setSales((prev) => [newSale, ...prev]);
    setMonthlyGoal((prev) => ({ ...prev, current: prev.current + saleData.total }));
  };

  const addProduct = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      id: `p_${Date.now()}`,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updatedData: Omit<Product, "id">) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...updatedData, id } : p))
    );
  };

  // Add Purchase: Add stock to inventory
  const addPurchase = (purchaseData: Omit<Purchase, "id" | "date">) => {
    const newId = `pr_${Date.now()}`;
    const today = new Date().toISOString().split("T")[0];

    const newPurchase: Purchase = {
      ...purchaseData,
      id: newId,
      date: today,
    };

    // Increase stock in inventory
    setInventory((currentInventory) =>
      currentInventory.map((item) => {
        if (item.name.toLowerCase() === purchaseData.itemName.toLowerCase()) {
          // Log movement
          setTimeout(() => {
            addInventoryMovement({
              itemName: item.name,
              type: "entrada",
              qty: purchaseData.qty,
              reason: "Reabastecimiento por compra",
            });
          }, 0);
          return { ...item, stock: item.stock + purchaseData.qty };
        }
        return item;
      })
    );

    setPurchases((prev) => [newPurchase, ...prev]);
  };

  // Add Production: Deduct ingredients and log batch
  const addProductionBatch = (batchData: Omit<ProductionBatch, "id" | "date">): boolean => {
    const newId = `pb_${Date.now()}`;
    const today = new Date().toISOString().split("T")[0];

    // Find the product to check recipe
    const product = products.find((p) => p.name === batchData.productName);
    if (!product) return false;

    // Check if we have enough ingredients
    let hasEnough = true;
    product.recipe.forEach((r) => {
      const invItem = inventory.find((i) => i.id === r.ingredientId);
      if (!invItem || invItem.stock < r.qty * batchData.qty) {
        hasEnough = false;
      }
    });

    if (!hasEnough) return false;

    // Deduct ingredients from inventory
    setInventory((currentInventory) =>
      currentInventory.map((item) => {
        const recipeEntry = product.recipe.find((r) => r.ingredientId === item.id);
        if (recipeEntry) {
          const deduction = recipeEntry.qty * batchData.qty;
          setTimeout(() => {
            addInventoryMovement({
              itemName: item.name,
              type: "salida",
              qty: deduction,
              reason: `Consumo por lote producción ${newId}`,
            });
          }, 0);
          return { ...item, stock: Math.max(0, item.stock - deduction) };
        }
        return item;
      })
    );

    const newBatch: ProductionBatch = {
      ...batchData,
      id: newId,
      date: today,
    };

    setProduction((prev) => [newBatch, ...prev]);
    return true;
  };

  const addInventoryMovement = (movData: Omit<InventoryMovement, "id" | "date">) => {
    const newId = `m_${Date.now()}`;
    const today = new Date().toISOString().split("T")[0];
    const newMov: InventoryMovement = {
      ...movData,
      id: newId,
      date: today,
    };
    setMovements((prev) => [newMov, ...prev]);
  };

  const resetAllData = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("antojo_products");
      localStorage.removeItem("antojo_inventory");
      localStorage.removeItem("antojo_sales");
      localStorage.removeItem("antojo_purchases");
      localStorage.removeItem("antojo_production");
      localStorage.removeItem("antojo_movements");
      localStorage.removeItem("antojo_goal");
    }
    setProducts(initialProducts);
    setInventory(initialInventory);
    setSales(initialSales);
    setPurchases(initialPurchases);
    setProduction(initialProduction);
    setMovements(initialMovements);
    setMonthlyGoal({ current: 54800, goal: 75000 });
  };

  return (
    <StateContext.Provider
      value={{
        products,
        inventory,
        sales,
        purchases,
        production,
        movements,
        monthlyGoal,
        addSale,
        addProduct,
        updateProduct,
        addPurchase,
        addProductionBatch,
        addInventoryMovement,
        resetAllData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a StateProvider");
  }
  return context;
}
