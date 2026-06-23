-- ============================================================
-- ANTOJO OS — Migración Principal
-- ============================================================
-- Ejecutar en Supabase SQL Editor o via CLI
-- Orden: extensiones → tablas → índices → RLS → funciones

-- ── Extensiones ────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Para búsqueda de texto

-- ── Función updated_at automático ──────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── WORKSPACES ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  settings JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER workspaces_updated_at
  BEFORE UPDATE ON workspaces
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── PROFILES ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'viewer'
    CHECK (role IN ('owner','admin','operations','sales','marketing','viewer')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, workspace_id)
);

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── AUDIT LOGS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  diff JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── NOTIFICATIONS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── PRODUCT CATEGORIES ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── SUPPLIERS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS suppliers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  payment_terms TEXT,
  min_order NUMERIC(12,2),
  lead_days INTEGER,
  rating NUMERIC(3,1) CHECK (rating >= 0 AND rating <= 5),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TRIGGER suppliers_updated_at
  BEFORE UPDATE ON suppliers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── INGREDIENTS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT,
  unit TEXT NOT NULL,
  cost NUMERIC(12,2) NOT NULL DEFAULT 0,
  supplier_id UUID REFERENCES suppliers(id),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TRIGGER ingredients_updated_at
  BEFORE UPDATE ON ingredients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── PRODUCTS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  category_id UUID REFERENCES product_categories(id),
  name TEXT NOT NULL,
  commercial_name TEXT,
  description TEXT,
  photo_url TEXT,
  presentation TEXT,
  volume_ml INTEGER,
  price NUMERIC(12,2) NOT NULL DEFAULT 0,
  wholesale_price NUMERIC(12,2),
  min_price NUMERIC(12,2),
  shelf_life_days INTEGER,
  stock NUMERIC(12,3) NOT NULL DEFAULT 0,
  min_stock NUMERIC(12,3) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('development','testing','active','temporary','paused','discontinued')),
  tags TEXT[] NOT NULL DEFAULT '{}',
  internal_code TEXT,
  active_recipe_id UUID, -- FK agregado después para evitar circular
  unit_cost NUMERIC(12,2),
  margin NUMERIC(5,2),
  prep_time_minutes INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID,
  updated_by UUID,
  deleted_at TIMESTAMPTZ
);

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── RECIPES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  version INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','testing','approved','replaced')),
  yield_units NUMERIC(12,3) NOT NULL DEFAULT 1,
  yield_unit TEXT NOT NULL DEFAULT 'unidad',
  prep_time_minutes INTEGER,
  waste_percent NUMERIC(5,2) DEFAULT 0,
  estimated_cost NUMERIC(12,2),
  flavor_notes TEXT,
  instructions TEXT,
  responsible_id UUID,
  test_results TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID,
  deleted_at TIMESTAMPTZ,
  UNIQUE(product_id, version)
);

CREATE TRIGGER recipes_updated_at
  BEFORE UPDATE ON recipes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── RECIPE ITEMS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS recipe_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES ingredients(id),
  quantity NUMERIC(12,4) NOT NULL,
  unit TEXT NOT NULL,
  is_packaging BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT
);

-- FK circular: products → recipes (ahora que recipes existe)
ALTER TABLE products
  ADD CONSTRAINT products_active_recipe_fk
  FOREIGN KEY (active_recipe_id) REFERENCES recipes(id);

-- ── INVENTORY ITEMS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inventory_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('ingredient','product','material')),
  entity_id UUID NOT NULL,
  quantity NUMERIC(12,4) NOT NULL DEFAULT 0,
  reserved NUMERIC(12,4) NOT NULL DEFAULT 0,
  unit TEXT NOT NULL,
  avg_cost NUMERIC(12,2) NOT NULL DEFAULT 0,
  min_stock NUMERIC(12,3),
  expiry_date DATE,
  location TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(workspace_id, entity_type, entity_id)
);

-- ── INVENTORY MOVEMENTS ────────────────────────────────────
CREATE TABLE IF NOT EXISTS inventory_movements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES inventory_items(id),
  type TEXT NOT NULL CHECK (type IN (
    'purchase','reception','production','consumption',
    'sale','waste','adjustment','return','courtesy','internal','transfer'
  )),
  quantity NUMERIC(12,4) NOT NULL,
  unit TEXT NOT NULL,
  unit_cost NUMERIC(12,2),
  total_cost NUMERIC(12,2),
  batch_id UUID,
  purchase_id UUID,
  sale_id UUID,
  reason TEXT,
  responsible_id UUID,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID
);

-- ── INVENTORY COUNTS ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS inventory_counts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','completed','cancelled')),
  counted_at TIMESTAMPTZ,
  counted_by UUID,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory_count_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  count_id UUID NOT NULL REFERENCES inventory_counts(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES inventory_items(id),
  system_quantity NUMERIC(12,4) NOT NULL,
  counted_quantity NUMERIC(12,4),
  difference NUMERIC(12,4),
  unit_cost NUMERIC(12,2),
  adjustment_reason TEXT
);

-- ── PURCHASES ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  supplier_id UUID REFERENCES suppliers(id),
  folio TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','requested','confirmed','in_transit','partial','received','cancelled')),
  order_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expected_date DATE,
  received_date DATE,
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  shipping NUMERIC(12,2) NOT NULL DEFAULT 0,
  tax NUMERIC(12,2) NOT NULL DEFAULT 0,
  discount NUMERIC(12,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) NOT NULL DEFAULT 0,
  payment_method TEXT CHECK (payment_method IN ('cash','transfer','card','payment_link','other')),
  payment_status TEXT DEFAULT 'pending',
  invoice_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID
);

CREATE TRIGGER purchases_updated_at
  BEFORE UPDATE ON purchases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE IF NOT EXISTS purchase_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  purchase_id UUID NOT NULL REFERENCES purchases(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES ingredients(id),
  quantity NUMERIC(12,4) NOT NULL,
  unit TEXT NOT NULL,
  unit_cost NUMERIC(12,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) NOT NULL DEFAULT 0,
  received_quantity NUMERIC(12,4),
  notes TEXT
);

-- ── PRODUCTION BATCHES ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS production_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  product_id UUID NOT NULL REFERENCES products(id),
  recipe_id UUID NOT NULL REFERENCES recipes(id),
  planned_quantity NUMERIC(12,3) NOT NULL,
  actual_quantity NUMERIC(12,3),
  production_date DATE NOT NULL,
  expiry_date DATE,
  responsible_id UUID,
  planned_cost NUMERIC(12,2),
  actual_cost NUMERIC(12,2),
  planned_waste NUMERIC(12,3),
  actual_waste NUMERIC(12,3),
  status TEXT NOT NULL DEFAULT 'planned'
    CHECK (status IN ('planned','preparing','filling','finished','released','cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID
);

CREATE TRIGGER production_batches_updated_at
  BEFORE UPDATE ON production_batches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE IF NOT EXISTS production_batch_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id UUID NOT NULL REFERENCES production_batches(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES ingredients(id),
  planned_qty NUMERIC(12,4) NOT NULL,
  actual_qty NUMERIC(12,4),
  unit TEXT NOT NULL,
  unit_cost NUMERIC(12,2)
);

-- ── CUSTOMERS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'consumer' CHECK (type IN (
    'consumer','frequent','company','wedding_planner','agency',
    'restaurant','cafe','event_organizer','venue','distributor','reseller'
  )),
  name TEXT NOT NULL,
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  rfc TEXT,
  notes TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  source TEXT,
  total_purchases NUMERIC(12,2) NOT NULL DEFAULT 0,
  last_purchase_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TRIGGER customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── LEADS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  contact TEXT,
  phone TEXT,
  email TEXT,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new','contacted','qualified','unqualified')),
  assigned_to UUID,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── OPPORTUNITIES ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id),
  lead_id UUID REFERENCES leads(id),
  title TEXT NOT NULL,
  service_type TEXT,
  estimated_value NUMERIC(12,2),
  estimated_cost NUMERIC(12,2),
  probability INTEGER DEFAULT 50 CHECK (probability >= 0 AND probability <= 100),
  expected_close_date DATE,
  next_action TEXT,
  next_action_date DATE,
  responsible_id UUID,
  source TEXT,
  stage TEXT NOT NULL DEFAULT 'prospect' CHECK (stage IN (
    'prospect','contacted','needs_identified','quote_sent',
    'follow_up','negotiation','won','lost','repurchase'
  )),
  lost_reason TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID
);

CREATE TRIGGER opportunities_updated_at
  BEFORE UPDATE ON opportunities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE IF NOT EXISTS opportunity_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID
);

-- ── SALES ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  folio TEXT NOT NULL,
  customer_id UUID REFERENCES customers(id),
  channel TEXT NOT NULL DEFAULT 'direct' CHECK (channel IN (
    'direct','street','instagram','whatsapp','preorder',
    'event','corporate','wholesale','reseller','courtesy','internal','waste'
  )),
  pos_point TEXT,
  sale_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft','pending','paid','preparing','ready','delivered','cancelled','refunded'
  )),
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  discount NUMERIC(12,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) NOT NULL DEFAULT 0,
  cost NUMERIC(12,2) NOT NULL DEFAULT 0,
  profit NUMERIC(12,2) NOT NULL DEFAULT 0,
  margin NUMERIC(5,2) NOT NULL DEFAULT 0,
  payment_method TEXT NOT NULL DEFAULT 'cash'
    CHECK (payment_method IN ('cash','transfer','card','payment_link','other')),
  payment_fee NUMERIC(12,2) NOT NULL DEFAULT 0,
  seller_id UUID,
  campaign_id UUID,
  event_id UUID,
  promotion_id UUID,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID
);

CREATE TRIGGER sales_updated_at
  BEFORE UPDATE ON sales
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE IF NOT EXISTS sale_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sale_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity NUMERIC(12,3) NOT NULL,
  unit_price NUMERIC(12,2) NOT NULL, -- precio histórico
  unit_cost NUMERIC(12,2) NOT NULL,  -- costo histórico
  discount NUMERIC(12,2) NOT NULL DEFAULT 0,
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  profit NUMERIC(12,2) NOT NULL DEFAULT 0,
  margin NUMERIC(5,2) NOT NULL DEFAULT 0,
  snapshot_recipe_id UUID REFERENCES recipes(id),
  notes TEXT
);

-- ── PAYMENTS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  sale_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  method TEXT NOT NULL CHECK (method IN ('cash','transfer','card','payment_link','other')),
  amount NUMERIC(12,2) NOT NULL,
  fee NUMERIC(12,2) NOT NULL DEFAULT 0,
  reference TEXT,
  paid_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes TEXT
);

-- ── EXPENSE CATEGORIES ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS expense_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'variable',
  color TEXT,
  icon TEXT
);

-- ── EXPENSES ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  category_id UUID REFERENCES expense_categories(id),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  amount NUMERIC(12,2) NOT NULL,
  supplier_id UUID REFERENCES suppliers(id),
  payment_method TEXT CHECK (payment_method IN ('cash','transfer','card','payment_link','other')),
  project_ref TEXT,
  event_id UUID,
  receipt_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID
);

-- ── CASH SESSIONS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cash_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  closed_at TIMESTAMPTZ,
  opened_by UUID,
  opening_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  expected_amount NUMERIC(12,2),
  counted_amount NUMERIC(12,2),
  difference NUMERIC(12,2),
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','closed'))
);

-- ── BUSINESS GOALS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS business_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  period_type TEXT NOT NULL CHECK (period_type IN ('monthly','quarterly','annual')),
  period_value TEXT NOT NULL,
  metric TEXT NOT NULL,
  target NUMERIC(12,2) NOT NULL,
  current_value NUMERIC(12,2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── PROMOTIONS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN (
    'percent_discount','fixed_discount','two_for_one','two_for_price',
    'second_unit_discount','bundle','combo','wholesale_price',
    'free_shipping','affiliate','happy_hour','promo_code'
  )),
  product_id UUID REFERENCES products(id),
  discount_percent NUMERIC(5,2),
  discount_fixed NUMERIC(12,2),
  min_qty INTEGER,
  max_qty INTEGER,
  special_price NUMERIC(12,2),
  start_date DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'draft',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID
);

CREATE TABLE IF NOT EXISTS promotion_simulations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  mechanic TEXT NOT NULL,
  inputs JSONB NOT NULL DEFAULT '{}',
  results JSONB NOT NULL DEFAULT '{}',
  saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID
);

-- ── QUOTES ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  folio TEXT NOT NULL,
  customer_id UUID REFERENCES customers(id),
  opportunity_id UUID REFERENCES opportunities(id),
  service_type TEXT NOT NULL DEFAULT 'canned_beverages'
    CHECK (service_type IN ('canned_beverages','event_bar','activation','catering','other')),
  version INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','sent','approved','rejected','expired','converted')),
  valid_until DATE,
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  tax NUMERIC(12,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) NOT NULL DEFAULT 0,
  advance NUMERIC(12,2) NOT NULL DEFAULT 0,
  balance NUMERIC(12,2) NOT NULL DEFAULT 0,
  notes TEXT,
  terms TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID
);

CREATE TRIGGER quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE IF NOT EXISTS quote_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity NUMERIC(12,3) NOT NULL DEFAULT 1,
  unit TEXT NOT NULL DEFAULT 'pza',
  unit_price NUMERIC(12,2) NOT NULL DEFAULT 0,
  unit_cost NUMERIC(12,2) NOT NULL DEFAULT 0,
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  notes TEXT
);

-- ── EVENTS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  quote_id UUID REFERENCES quotes(id),
  customer_id UUID REFERENCES customers(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'bar',
  event_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  venue TEXT,
  guests INTEGER,
  status TEXT NOT NULL DEFAULT 'prospect'
    CHECK (status IN ('prospect','confirmed','in_progress','completed','cancelled')),
  total_price NUMERIC(12,2) NOT NULL DEFAULT 0,
  total_cost NUMERIC(12,2) NOT NULL DEFAULT 0,
  advance_paid NUMERIC(12,2) NOT NULL DEFAULT 0,
  balance_due NUMERIC(12,2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID
);

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE IF NOT EXISTS event_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  base_price NUMERIC(12,2) NOT NULL DEFAULT 0,
  min_guests INTEGER,
  max_guests INTEGER,
  includes JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── CAMPAIGNS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  objective TEXT,
  product_id UUID REFERENCES products(id),
  audience TEXT,
  channel TEXT,
  budget NUMERIC(12,2),
  start_date DATE,
  end_date DATE,
  offer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  goal_metric TEXT,
  goal_value NUMERIC(12,2),
  actual_results JSONB,
  attributed_sales NUMERIC(12,2),
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID
);

-- ── CONTENT ITEMS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS content_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id),
  product_id UUID REFERENCES products(id),
  title TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN (
    'instagram','tiktok','facebook','youtube_shorts','pinterest','whatsapp','email'
  )),
  format TEXT,
  pillar TEXT,
  objective TEXT,
  hook TEXT,
  script TEXT,
  copy TEXT,
  cta TEXT,
  file_url TEXT,
  responsible_id UUID,
  shoot_date DATE,
  publish_date DATE,
  status TEXT NOT NULL DEFAULT 'idea' CHECK (status IN (
    'idea','approved','script','to_record','recorded',
    'editing','review','scheduled','published','measured','reused'
  )),
  budget NUMERIC(12,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER content_items_updated_at
  BEFORE UPDATE ON content_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE IF NOT EXISTS content_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
  recorded_at DATE NOT NULL DEFAULT CURRENT_DATE,
  reach INTEGER,
  plays INTEGER,
  retention_pct NUMERIC(5,2),
  interactions INTEGER,
  saves INTEGER,
  shares INTEGER,
  clicks INTEGER,
  messages INTEGER,
  leads INTEGER,
  orders INTEGER,
  sales NUMERIC(12,2),
  cost_per_result NUMERIC(12,2),
  notes TEXT
);

-- ── TASKS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT,
  due_date DATE,
  priority TEXT NOT NULL DEFAULT 'medium'
    CHECK (priority IN ('low','medium','high','urgent')),
  status TEXT NOT NULL DEFAULT 'todo'
    CHECK (status IN ('todo','in_progress','done','cancelled')),
  assigned_to UUID,
  related_type TEXT,
  related_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID
);

CREATE TRIGGER tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── CALENDAR EVENTS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'task',
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  all_day BOOLEAN NOT NULL DEFAULT FALSE,
  related_type TEXT,
  related_id UUID,
  assigned_to UUID,
  color TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID
);

-- ── GROWTH EXPERIMENTS ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS growth_experiments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  hypothesis TEXT,
  audience TEXT,
  channel TEXT,
  max_investment NUMERIC(12,2),
  start_date DATE,
  end_date DATE,
  primary_metric TEXT,
  goal_value NUMERIC(12,2),
  actual_cost NUMERIC(12,2),
  actual_sales NUMERIC(12,2),
  actual_profit NUMERIC(12,2),
  leads INTEGER,
  conversion_rate NUMERIC(5,2),
  learnings TEXT,
  result TEXT,
  decision TEXT CHECK (decision IN ('scale','repeat','adjust','pause','discard')),
  status TEXT NOT NULL DEFAULT 'planning',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID
);

-- ── ATTACHMENTS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── ÍNDICES ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_profiles_user ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_workspace ON profiles(workspace_id);
CREATE INDEX IF NOT EXISTS idx_products_workspace ON products(workspace_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_ingredients_workspace ON ingredients(workspace_id);
CREATE INDEX IF NOT EXISTS idx_inventory_items_workspace ON inventory_items(workspace_id);
CREATE INDEX IF NOT EXISTS idx_inventory_items_entity ON inventory_items(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_workspace ON inventory_movements(workspace_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_item ON inventory_movements(item_id);
CREATE INDEX IF NOT EXISTS idx_sales_workspace ON sales(workspace_id);
CREATE INDEX IF NOT EXISTS idx_sales_date ON sales(sale_date DESC);
CREATE INDEX IF NOT EXISTS idx_sales_status ON sales(status);
CREATE INDEX IF NOT EXISTS idx_sale_items_sale ON sale_items(sale_id);
CREATE INDEX IF NOT EXISTS idx_expenses_workspace ON expenses(workspace_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date DESC);
CREATE INDEX IF NOT EXISTS idx_customers_workspace ON customers(workspace_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_workspace ON opportunities(workspace_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_stage ON opportunities(stage);
CREATE INDEX IF NOT EXISTS idx_production_batches_workspace ON production_batches(workspace_id);
CREATE INDEX IF NOT EXISTS idx_production_batches_status ON production_batches(status);
CREATE INDEX IF NOT EXISTS idx_content_items_workspace ON content_items(workspace_id);
CREATE INDEX IF NOT EXISTS idx_content_items_status ON content_items(status);
CREATE INDEX IF NOT EXISTS idx_content_items_publish_date ON content_items(publish_date);
CREATE INDEX IF NOT EXISTS idx_tasks_workspace ON tasks(workspace_id);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_campaigns_workspace ON campaigns(workspace_id);

-- ── ROW LEVEL SECURITY ─────────────────────────────────────
-- Habilitar RLS en todas las tablas

ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_counts ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_count_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_batch_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunity_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotion_simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;

-- ── Función helper: obtener workspace del usuario ──────────
CREATE OR REPLACE FUNCTION get_user_workspace()
RETURNS UUID AS $$
  SELECT workspace_id FROM profiles WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ── Políticas RLS: patrón por workspace ───────────────────
-- (aplica a tablas con workspace_id)

-- workspaces: solo puede ver su propio workspace
CREATE POLICY "workspace_select" ON workspaces
  FOR SELECT USING (id = get_user_workspace());

-- profiles: ver perfiles del mismo workspace
CREATE POLICY "profiles_select" ON profiles
  FOR SELECT USING (workspace_id = get_user_workspace());
CREATE POLICY "profiles_insert" ON profiles
  FOR INSERT WITH CHECK (workspace_id = get_user_workspace());
CREATE POLICY "profiles_update" ON profiles
  FOR UPDATE USING (workspace_id = get_user_workspace());

-- Política genérica para tablas con workspace_id
-- Se genera para cada tabla principal:

DO $$
DECLARE
  t TEXT;
  tables TEXT[] := ARRAY[
    'product_categories','suppliers','ingredients','products',
    'inventory_items','inventory_movements','inventory_counts',
    'purchases','production_batches','customers','leads',
    'opportunities','sales','payments','expense_categories',
    'expenses','cash_sessions','business_goals','promotions',
    'promotion_simulations','quotes','events','event_packages',
    'campaigns','content_items','tasks','calendar_events',
    'growth_experiments','attachments','audit_logs','notifications',
    'campaigns'
  ];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format('
      CREATE POLICY "%s_select" ON %s
        FOR SELECT USING (workspace_id = get_user_workspace());
      CREATE POLICY "%s_insert" ON %s
        FOR INSERT WITH CHECK (workspace_id = get_user_workspace());
      CREATE POLICY "%s_update" ON %s
        FOR UPDATE USING (workspace_id = get_user_workspace());
      CREATE POLICY "%s_delete" ON %s
        FOR DELETE USING (workspace_id = get_user_workspace());
    ', t, t, t, t, t, t, t, t);
  END LOOP;
END $$;

-- recipe_items: acceso vía recipes → workspace
CREATE POLICY "recipe_items_select" ON recipe_items
  FOR SELECT USING (
    recipe_id IN (
      SELECT id FROM recipes WHERE workspace_id = get_user_workspace()
    )
  );
CREATE POLICY "recipe_items_insert" ON recipe_items
  FOR INSERT WITH CHECK (
    recipe_id IN (
      SELECT id FROM recipes WHERE workspace_id = get_user_workspace()
    )
  );
CREATE POLICY "recipe_items_update" ON recipe_items
  FOR UPDATE USING (
    recipe_id IN (
      SELECT id FROM recipes WHERE workspace_id = get_user_workspace()
    )
  );
CREATE POLICY "recipe_items_delete" ON recipe_items
  FOR DELETE USING (
    recipe_id IN (
      SELECT id FROM recipes WHERE workspace_id = get_user_workspace()
    )
  );

-- sale_items
CREATE POLICY "sale_items_select" ON sale_items
  FOR SELECT USING (
    sale_id IN (SELECT id FROM sales WHERE workspace_id = get_user_workspace())
  );
CREATE POLICY "sale_items_insert" ON sale_items
  FOR INSERT WITH CHECK (
    sale_id IN (SELECT id FROM sales WHERE workspace_id = get_user_workspace())
  );

-- purchase_items
CREATE POLICY "purchase_items_select" ON purchase_items
  FOR SELECT USING (
    purchase_id IN (SELECT id FROM purchases WHERE workspace_id = get_user_workspace())
  );
CREATE POLICY "purchase_items_insert" ON purchase_items
  FOR INSERT WITH CHECK (
    purchase_id IN (SELECT id FROM purchases WHERE workspace_id = get_user_workspace())
  );

-- production_batch_items
CREATE POLICY "batch_items_select" ON production_batch_items
  FOR SELECT USING (
    batch_id IN (SELECT id FROM production_batches WHERE workspace_id = get_user_workspace())
  );

-- quote_items
CREATE POLICY "quote_items_select" ON quote_items
  FOR SELECT USING (
    quote_id IN (SELECT id FROM quotes WHERE workspace_id = get_user_workspace())
  );
CREATE POLICY "quote_items_insert" ON quote_items
  FOR INSERT WITH CHECK (
    quote_id IN (SELECT id FROM quotes WHERE workspace_id = get_user_workspace())
  );

-- opportunity_activities
CREATE POLICY "opp_activities_select" ON opportunity_activities
  FOR SELECT USING (
    opportunity_id IN (SELECT id FROM opportunities WHERE workspace_id = get_user_workspace())
  );

-- content_metrics
CREATE POLICY "content_metrics_select" ON content_metrics
  FOR SELECT USING (
    content_id IN (SELECT id FROM content_items WHERE workspace_id = get_user_workspace())
  );
CREATE POLICY "content_metrics_insert" ON content_metrics
  FOR INSERT WITH CHECK (
    content_id IN (SELECT id FROM content_items WHERE workspace_id = get_user_workspace())
  );

-- inventory_count_items
CREATE POLICY "count_items_select" ON inventory_count_items
  FOR SELECT USING (
    count_id IN (SELECT id FROM inventory_counts WHERE workspace_id = get_user_workspace())
  );
