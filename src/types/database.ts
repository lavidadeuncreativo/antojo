// ============================================================
// ANTOJO OS — Tipos de Base de Datos
// ============================================================
// Este archivo refleja el esquema de Supabase.
// Actualizar cuando se hagan migraciones.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          settings: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["workspaces"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["workspaces"]["Insert"]>;
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          workspace_id: string;
          full_name: string;
          avatar_url: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      product_categories: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          color: string | null;
          icon: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["product_categories"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["product_categories"]["Insert"]>;
      };
      products: {
        Row: {
          id: string;
          workspace_id: string;
          category_id: string | null;
          name: string;
          commercial_name: string | null;
          description: string | null;
          photo_url: string | null;
          presentation: string | null;
          volume_ml: number | null;
          price: string; // numeric
          wholesale_price: string | null;
          min_price: string | null;
          shelf_life_days: number | null;
          stock: string;
          min_stock: string;
          status: ProductStatus;
          tags: string[];
          internal_code: string | null;
          active_recipe_id: string | null;
          unit_cost: string | null;
          margin: string | null;
          prep_time_minutes: number | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
          updated_by: string | null;
          deleted_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      recipes: {
        Row: {
          id: string;
          workspace_id: string;
          product_id: string;
          version: number;
          status: RecipeStatus;
          yield_units: string;
          yield_unit: string;
          prep_time_minutes: number | null;
          waste_percent: string | null;
          estimated_cost: string | null;
          flavor_notes: string | null;
          instructions: string | null;
          responsible_id: string | null;
          test_results: string | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
          deleted_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["recipes"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["recipes"]["Insert"]>;
      };
      recipe_items: {
        Row: {
          id: string;
          recipe_id: string;
          ingredient_id: string;
          quantity: string;
          unit: string;
          is_packaging: boolean;
          notes: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["recipe_items"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["recipe_items"]["Insert"]>;
      };
      ingredients: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          category: string | null;
          unit: string;
          cost: string;
          supplier_id: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["ingredients"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["ingredients"]["Insert"]>;
      };
      inventory_items: {
        Row: {
          id: string;
          workspace_id: string;
          entity_type: InventoryEntityType;
          entity_id: string;
          quantity: string;
          reserved: string;
          unit: string;
          avg_cost: string;
          min_stock: string | null;
          expiry_date: string | null;
          location: string | null;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["inventory_items"]["Row"], "id" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["inventory_items"]["Insert"]>;
      };
      inventory_movements: {
        Row: {
          id: string;
          workspace_id: string;
          item_id: string;
          type: MovementType;
          quantity: string;
          unit: string;
          unit_cost: string | null;
          total_cost: string | null;
          batch_id: string | null;
          purchase_id: string | null;
          sale_id: string | null;
          reason: string | null;
          responsible_id: string | null;
          notes: string | null;
          created_at: string;
          created_by: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["inventory_movements"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["inventory_movements"]["Insert"]>;
      };
      suppliers: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          contact_name: string | null;
          phone: string | null;
          email: string | null;
          address: string | null;
          payment_terms: string | null;
          min_order: string | null;
          lead_days: number | null;
          rating: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["suppliers"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["suppliers"]["Insert"]>;
      };
      purchases: {
        Row: {
          id: string;
          workspace_id: string;
          supplier_id: string | null;
          folio: string;
          status: PurchaseStatus;
          order_date: string;
          expected_date: string | null;
          received_date: string | null;
          subtotal: string;
          shipping: string;
          tax: string;
          discount: string;
          total: string;
          payment_method: PaymentMethod | null;
          payment_status: string | null;
          invoice_url: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["purchases"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["purchases"]["Insert"]>;
      };
      purchase_items: {
        Row: {
          id: string;
          purchase_id: string;
          ingredient_id: string;
          quantity: string;
          unit: string;
          unit_cost: string;
          total: string;
          received_quantity: string | null;
          notes: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["purchase_items"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["purchase_items"]["Insert"]>;
      };
      production_batches: {
        Row: {
          id: string;
          workspace_id: string;
          code: string;
          product_id: string;
          recipe_id: string;
          planned_quantity: string;
          actual_quantity: string | null;
          production_date: string;
          expiry_date: string | null;
          responsible_id: string | null;
          planned_cost: string | null;
          actual_cost: string | null;
          planned_waste: string | null;
          actual_waste: string | null;
          status: BatchStatus;
          notes: string | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["production_batches"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["production_batches"]["Insert"]>;
      };
      customers: {
        Row: {
          id: string;
          workspace_id: string;
          type: CustomerType;
          name: string;
          contact_name: string | null;
          phone: string | null;
          email: string | null;
          address: string | null;
          rfc: string | null;
          notes: string | null;
          tags: string[];
          source: string | null;
          total_purchases: string;
          last_purchase_at: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["customers"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["customers"]["Insert"]>;
      };
      sales: {
        Row: {
          id: string;
          workspace_id: string;
          folio: string;
          customer_id: string | null;
          channel: SaleChannel;
          pos_point: string | null;
          sale_date: string;
          status: SaleStatus;
          subtotal: string;
          discount: string;
          total: string;
          cost: string;
          profit: string;
          margin: string;
          payment_method: PaymentMethod;
          payment_fee: string;
          seller_id: string | null;
          campaign_id: string | null;
          event_id: string | null;
          promotion_id: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["sales"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["sales"]["Insert"]>;
      };
      sale_items: {
        Row: {
          id: string;
          sale_id: string;
          product_id: string;
          quantity: string;
          unit_price: string;
          unit_cost: string;
          discount: string;
          subtotal: string;
          profit: string;
          margin: string;
          snapshot_recipe_id: string | null;
          notes: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["sale_items"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["sale_items"]["Insert"]>;
      };
      expenses: {
        Row: {
          id: string;
          workspace_id: string;
          category_id: string | null;
          date: string;
          amount: string;
          supplier_id: string | null;
          payment_method: PaymentMethod | null;
          project_ref: string | null;
          event_id: string | null;
          receipt_url: string | null;
          notes: string | null;
          created_at: string;
          created_by: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["expenses"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["expenses"]["Insert"]>;
      };
      expense_categories: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          type: string;
          color: string | null;
          icon: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["expense_categories"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["expense_categories"]["Insert"]>;
      };
      promotions: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          type: PromotionType;
          product_id: string | null;
          discount_percent: string | null;
          discount_fixed: string | null;
          min_qty: number | null;
          special_price: string | null;
          start_date: string | null;
          end_date: string | null;
          status: string;
          notes: string | null;
          created_at: string;
          created_by: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["promotions"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["promotions"]["Insert"]>;
      };
      promotion_simulations: {
        Row: {
          id: string;
          workspace_id: string;
          product_id: string | null;
          mechanic: string;
          inputs: Json;
          results: Json;
          saved_at: string;
          created_by: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["promotion_simulations"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["promotion_simulations"]["Insert"]>;
      };
      quotes: {
        Row: {
          id: string;
          workspace_id: string;
          folio: string;
          customer_id: string | null;
          opportunity_id: string | null;
          service_type: QuoteServiceType;
          version: number;
          status: QuoteStatus;
          valid_until: string | null;
          subtotal: string;
          tax: string;
          total: string;
          advance: string;
          balance: string;
          notes: string | null;
          terms: string | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["quotes"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["quotes"]["Insert"]>;
      };
      events: {
        Row: {
          id: string;
          workspace_id: string;
          quote_id: string | null;
          customer_id: string | null;
          name: string;
          type: string;
          event_date: string;
          start_time: string | null;
          end_time: string | null;
          venue: string | null;
          guests: number | null;
          status: EventStatus;
          total_price: string;
          total_cost: string;
          advance_paid: string;
          balance_due: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["events"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
      };
      leads: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          contact: string | null;
          phone: string | null;
          email: string | null;
          source: string | null;
          status: LeadStatus;
          assigned_to: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["leads"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
      opportunities: {
        Row: {
          id: string;
          workspace_id: string;
          customer_id: string | null;
          lead_id: string | null;
          title: string;
          service_type: string | null;
          estimated_value: string | null;
          estimated_cost: string | null;
          probability: number | null;
          expected_close_date: string | null;
          next_action: string | null;
          next_action_date: string | null;
          responsible_id: string | null;
          source: string | null;
          stage: OpportunityStage;
          lost_reason: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["opportunities"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["opportunities"]["Insert"]>;
      };
      campaigns: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          objective: string | null;
          product_id: string | null;
          audience: string | null;
          channel: string | null;
          budget: string | null;
          start_date: string | null;
          end_date: string | null;
          offer: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          goal_metric: string | null;
          goal_value: string | null;
          actual_results: Json | null;
          attributed_sales: string | null;
          status: string;
          created_at: string;
          created_by: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["campaigns"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["campaigns"]["Insert"]>;
      };
      content_items: {
        Row: {
          id: string;
          workspace_id: string;
          campaign_id: string | null;
          product_id: string | null;
          title: string;
          platform: ContentPlatform;
          format: string | null;
          pillar: string | null;
          objective: string | null;
          hook: string | null;
          script: string | null;
          copy: string | null;
          cta: string | null;
          file_url: string | null;
          responsible_id: string | null;
          shoot_date: string | null;
          publish_date: string | null;
          status: ContentStatus;
          budget: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["content_items"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["content_items"]["Insert"]>;
      };
      tasks: {
        Row: {
          id: string;
          workspace_id: string;
          title: string;
          description: string | null;
          type: string | null;
          due_date: string | null;
          priority: TaskPriority;
          status: TaskStatus;
          assigned_to: string | null;
          related_type: string | null;
          related_id: string | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["tasks"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["tasks"]["Insert"]>;
      };
      growth_experiments: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          hypothesis: string | null;
          audience: string | null;
          channel: string | null;
          max_investment: string | null;
          start_date: string | null;
          end_date: string | null;
          primary_metric: string | null;
          goal_value: string | null;
          actual_cost: string | null;
          actual_sales: string | null;
          actual_profit: string | null;
          leads: number | null;
          conversion_rate: string | null;
          learnings: string | null;
          result: string | null;
          decision: ExperimentDecision | null;
          status: string;
          created_at: string;
          created_by: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["growth_experiments"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["growth_experiments"]["Insert"]>;
      };
      business_goals: {
        Row: {
          id: string;
          workspace_id: string;
          period_type: string;
          period_value: string;
          metric: string;
          target: string;
          current_value: string;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["business_goals"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["business_goals"]["Insert"]>;
      };
      notifications: {
        Row: {
          id: string;
          workspace_id: string;
          user_id: string;
          type: string;
          title: string;
          body: string | null;
          link: string | null;
          read_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["notifications"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>;
      };
      calendar_events: {
        Row: {
          id: string;
          workspace_id: string;
          title: string;
          type: string;
          start_at: string;
          end_at: string;
          all_day: boolean;
          related_type: string | null;
          related_id: string | null;
          assigned_to: string | null;
          color: string | null;
          notes: string | null;
          created_at: string;
          created_by: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["calendar_events"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["calendar_events"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

// ── Tipos de Dominio ────────────────────────────────────────

export type UserRole =
  | "owner"
  | "admin"
  | "operations"
  | "sales"
  | "marketing"
  | "viewer";

export type ProductStatus =
  | "development"
  | "testing"
  | "active"
  | "temporary"
  | "paused"
  | "discontinued";

export type RecipeStatus =
  | "draft"
  | "testing"
  | "approved"
  | "replaced";

export type InventoryEntityType = "ingredient" | "product" | "material";

export type MovementType =
  | "purchase"
  | "reception"
  | "production"
  | "consumption"
  | "sale"
  | "waste"
  | "adjustment"
  | "return"
  | "courtesy"
  | "internal"
  | "transfer";

export type PurchaseStatus =
  | "draft"
  | "requested"
  | "confirmed"
  | "in_transit"
  | "partial"
  | "received"
  | "cancelled";

export type BatchStatus =
  | "planned"
  | "preparing"
  | "filling"
  | "finished"
  | "released"
  | "cancelled";

export type SaleChannel =
  | "direct"
  | "street"
  | "instagram"
  | "whatsapp"
  | "preorder"
  | "event"
  | "corporate"
  | "wholesale"
  | "reseller"
  | "courtesy"
  | "internal"
  | "waste";

export type SaleStatus =
  | "draft"
  | "pending"
  | "paid"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentMethod =
  | "cash"
  | "transfer"
  | "card"
  | "payment_link"
  | "other";

export type CustomerType =
  | "consumer"
  | "frequent"
  | "company"
  | "wedding_planner"
  | "agency"
  | "restaurant"
  | "cafe"
  | "event_organizer"
  | "venue"
  | "distributor"
  | "reseller";

export type PromotionType =
  | "percent_discount"
  | "fixed_discount"
  | "two_for_one"
  | "two_for_price"
  | "second_unit_discount"
  | "bundle"
  | "combo"
  | "wholesale_price"
  | "free_shipping"
  | "affiliate"
  | "happy_hour"
  | "promo_code";

export type QuoteStatus =
  | "draft"
  | "sent"
  | "approved"
  | "rejected"
  | "expired"
  | "converted";

export type QuoteServiceType =
  | "canned_beverages"
  | "event_bar"
  | "activation"
  | "catering"
  | "other";

export type EventStatus =
  | "prospect"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "unqualified";

export type OpportunityStage =
  | "prospect"
  | "contacted"
  | "needs_identified"
  | "quote_sent"
  | "follow_up"
  | "negotiation"
  | "won"
  | "lost"
  | "repurchase";

export type ContentPlatform =
  | "instagram"
  | "tiktok"
  | "facebook"
  | "youtube_shorts"
  | "pinterest"
  | "whatsapp"
  | "email";

export type ContentStatus =
  | "idea"
  | "approved"
  | "script"
  | "to_record"
  | "recorded"
  | "editing"
  | "review"
  | "scheduled"
  | "published"
  | "measured"
  | "reused";

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type TaskStatus = "todo" | "in_progress" | "done" | "cancelled";

export type ExperimentDecision =
  | "scale"
  | "repeat"
  | "adjust"
  | "pause"
  | "discard";

// ── Tipos helpers ────────────────────────────────────────────

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
