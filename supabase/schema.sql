-- SCHEMA PARA ANTOJO (Supabase)

CREATE TABLE public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL,
  cost numeric NOT NULL,
  margin numeric NOT NULL,
  recipe jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.inventory (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  unit text NOT NULL,
  stock numeric NOT NULL DEFAULT 0,
  min_stock numeric NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.sales (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  folio text NOT NULL UNIQUE,
  customer text NOT NULL,
  total numeric NOT NULL,
  channel text NOT NULL,
  time text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.production_batches (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL,
  product_name text NOT NULL,
  qty integer NOT NULL,
  status text NOT NULL DEFAULT 'pendiente',
  expiration_date date,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.inventory_movements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL,
  item_name text NOT NULL,
  type text NOT NULL,
  qty numeric NOT NULL,
  reason text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Permisos iniciales (Bypass RLS para desarrollo inicial rápido, luego se asegura con políticas si hay auth)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all actions for all users" ON public.products FOR ALL USING (true);
CREATE POLICY "Enable all actions for all users" ON public.inventory FOR ALL USING (true);
CREATE POLICY "Enable all actions for all users" ON public.sales FOR ALL USING (true);
CREATE POLICY "Enable all actions for all users" ON public.production_batches FOR ALL USING (true);
CREATE POLICY "Enable all actions for all users" ON public.inventory_movements FOR ALL USING (true);
