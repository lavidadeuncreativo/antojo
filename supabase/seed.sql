-- ============================================================
-- ANTOJO OS — Datos de Demostración
-- ============================================================
-- Ejecutar DESPUÉS de 001_initial_schema.sql
-- Asegúrate de crear primero un usuario en Supabase Auth
-- y reemplazar 'TU-USER-ID-AQUI' con el UUID real del usuario

-- ── 1. Workspace ──────────────────────────────────────────
INSERT INTO workspaces (id, name, slug, settings) VALUES
(
  'a0000000-0000-0000-0000-000000000001',
  'ANTOJO.',
  'antojo',
  '{"currency": "MXN", "locale": "es-MX", "timezone": "America/Mexico_City"}'
);

-- ── 2. Categorías de producto ─────────────────────────────
INSERT INTO product_categories (id, workspace_id, name, color, icon) VALUES
('c0000001-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Bebidas frías', '#701F2D', 'cup'),
('c0000001-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Café frío', '#4B121C', 'coffee'),
('c0000001-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Cócteles sin alcohol', '#A7606B', 'cocktail'),
('c0000001-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Cócteles con alcohol', '#B27C32', 'wine');

-- ── 3. Proveedores ────────────────────────────────────────
INSERT INTO suppliers (id, workspace_id, name, contact_name, phone, email, payment_terms, lead_days, rating) VALUES
('s0000001-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Distribuidora La Fortaleza', 'Carlos Mendoza', '+52 55 1234 5678', 'carlos@fortaleza.mx', 'Contado', 2, 4.5),
('s0000001-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Latas y Envases del Centro', 'María González', '+52 55 9876 5432', 'ventas@latascentro.mx', '15 días', 5, 4.0),
('s0000001-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Café Veracruz Premium', 'Roberto Cruz', '+52 229 111 2222', NULL, 'Contado', 3, 4.8),
('s0000001-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Cítricos del Bajío', 'Ana Flores', '+52 477 333 4444', NULL, 'Contado', 1, 4.2);

-- ── 4. Ingredientes ───────────────────────────────────────
INSERT INTO ingredients (id, workspace_id, name, category, unit, cost, supplier_id) VALUES
-- Café
('i0000001-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Café espresso', 'café', 'ml', 0.28, 's0000001-0000-0000-0000-000000000003'),
('i0000001-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Leche entera', 'lácteo', 'ml', 0.018, 's0000001-0000-0000-0000-000000000001'),
('i0000001-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Leche condensada', 'lácteo', 'ml', 0.045, 's0000001-0000-0000-0000-000000000001'),
('i0000001-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Canela en raja', 'especias', 'g', 0.12, 's0000001-0000-0000-0000-000000000001'),
-- Frutas y flores
('i0000001-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'Limón mexicano', 'cítrico', 'ml', 0.035, 's0000001-0000-0000-0000-000000000004'),
('i0000001-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', 'Té de mariposa', 'flores', 'g', 1.80, 's0000001-0000-0000-0000-000000000001'),
('i0000001-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000001', 'Agua mineral', 'agua', 'ml', 0.008, 's0000001-0000-0000-0000-000000000001'),
-- Cócteles
('i0000001-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000001', 'Mezcal joven', 'alcohol', 'ml', 0.38, 's0000001-0000-0000-0000-000000000001'),
('i0000001-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000001', 'Hierbabuena', 'hierba', 'g', 0.25, 's0000001-0000-0000-0000-000000000004'),
('i0000001-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000001', 'Azúcar', 'endulzante', 'g', 0.008, 's0000001-0000-0000-0000-000000000001'),
('i0000001-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000001', 'Hielo', 'insumo', 'g', 0.003, NULL),
-- Empaque
('i0000001-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000001', 'Lata transparente 330ml', 'empaque', 'pza', 8.50, 's0000001-0000-0000-0000-000000000002'),
('i0000001-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000001', 'Tapa de lata', 'empaque', 'pza', 1.20, 's0000001-0000-0000-0000-000000000002'),
('i0000001-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000001', 'Etiqueta impresa', 'empaque', 'pza', 2.80, NULL),
('i0000001-0000-0000-0000-000000000015', 'a0000000-0000-0000-0000-000000000001', 'Mango Ataulfo', 'fruta', 'g', 0.022, 's0000001-0000-0000-0000-000000000004');

-- ── 5. Productos ──────────────────────────────────────────
INSERT INTO products (id, workspace_id, category_id, name, commercial_name, description, price, wholesale_price, min_price, volume_ml, min_stock, status, internal_code) VALUES
(
  'p0000001-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  'c0000001-0000-0000-0000-000000000001',
  'PÓCIMA',
  'PÓCIMA — Té de mariposa',
  'Bebida refrescante de té de mariposa y limón mexicano. Cambia de color al contacto con el ácido. 330 ml en lata transparente.',
  65.00, 50.00, 45.00, 330, 20, 'active', 'ANT-001'
),
(
  'p0000001-0000-0000-0000-000000000002',
  'a0000000-0000-0000-0000-000000000001',
  'c0000001-0000-0000-0000-000000000002',
  'El Mañanero',
  'El Mañanero — Café frío',
  'Bebida fría de café espresso, leche y un toque de canela. Energía para comenzar el día. 330 ml en lata.',
  60.00, 48.00, 42.00, 330, 15, 'active', 'ANT-002'
),
(
  'p0000001-0000-0000-0000-000000000003',
  'a0000000-0000-0000-0000-000000000001',
  'c0000001-0000-0000-0000-000000000001',
  'AURA',
  'AURA — Bebida frutal',
  'Bebida frutal de mango ataulfo con toque de limón y agua mineral. Ligera y tropical. 330 ml.',
  60.00, 46.00, 40.00, 330, 15, 'active', 'ANT-003'
),
(
  'p0000001-0000-0000-0000-000000000004',
  'a0000000-0000-0000-0000-000000000001',
  'c0000001-0000-0000-0000-000000000004',
  'Mojito con Mezcal',
  'Mojito con Mezcal de Oaxaca',
  'Mojito clásico con mezcal joven de Oaxaca, hierbabuena fresca y limón. 330 ml en lata.',
  75.00, 60.00, 55.00, 330, 10, 'active', 'ANT-004'
),
(
  'p0000001-0000-0000-0000-000000000005',
  'a0000000-0000-0000-0000-000000000001',
  'c0000001-0000-0000-0000-000000000003',
  'Limonada Mineral',
  'Limonada Mineral Natural',
  'Limonada fresca con agua mineral, limón mexicano y azúcar de caña. Sin gas artificial. 330 ml.',
  50.00, 38.00, 32.00, 330, 20, 'active', 'ANT-005'
);

-- ── 6. Recetas ────────────────────────────────────────────
-- PÓCIMA v1
INSERT INTO recipes (id, workspace_id, product_id, version, status, yield_units, yield_unit, waste_percent, prep_time_minutes, flavor_notes, instructions) VALUES
(
  'r0000001-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  'p0000001-0000-0000-0000-000000000001',
  1, 'approved', 1, 'lata', 5.0, 8,
  'Floral, cítrico, refrescante. El color cambia de morado a rosa al agregar el limón.',
  '1. Preparar el té de mariposa concentrado (5g por 200ml). 2. Enfriar completamente. 3. Agregar limón y azúcar. 4. Envasar en lata fría. 5. Sellar y etiquetar.'
);

INSERT INTO recipe_items (recipe_id, ingredient_id, quantity, unit, is_packaging) VALUES
('r0000001-0000-0000-0000-000000000001', 'i0000001-0000-0000-0000-000000000006', 5.0, 'g', FALSE),
('r0000001-0000-0000-0000-000000000001', 'i0000001-0000-0000-0000-000000000005', 30.0, 'ml', FALSE),
('r0000001-0000-0000-0000-000000000001', 'i0000001-0000-0000-0000-000000000010', 15.0, 'g', FALSE),
('r0000001-0000-0000-0000-000000000001', 'i0000001-0000-0000-0000-000000000007', 280.0, 'ml', FALSE),
('r0000001-0000-0000-0000-000000000001', 'i0000001-0000-0000-0000-000000000011', 100.0, 'g', FALSE),
('r0000001-0000-0000-0000-000000000001', 'i0000001-0000-0000-0000-000000000012', 1.0, 'pza', TRUE),
('r0000001-0000-0000-0000-000000000001', 'i0000001-0000-0000-0000-000000000013', 1.0, 'pza', TRUE),
('r0000001-0000-0000-0000-000000000001', 'i0000001-0000-0000-0000-000000000014', 1.0, 'pza', TRUE);

-- El Mañanero v1
INSERT INTO recipes (id, workspace_id, product_id, version, status, yield_units, yield_unit, waste_percent, prep_time_minutes, flavor_notes) VALUES
(
  'r0000001-0000-0000-0000-000000000002',
  'a0000000-0000-0000-0000-000000000001',
  'p0000001-0000-0000-0000-000000000002',
  1, 'approved', 1, 'lata', 4.0, 6,
  'Intenso, cremoso, con notas de canela. Dulzor equilibrado por la leche condensada.'
);

INSERT INTO recipe_items (recipe_id, ingredient_id, quantity, unit, is_packaging) VALUES
('r0000001-0000-0000-0000-000000000002', 'i0000001-0000-0000-0000-000000000001', 60.0, 'ml', FALSE),
('r0000001-0000-0000-0000-000000000002', 'i0000001-0000-0000-0000-000000000002', 180.0, 'ml', FALSE),
('r0000001-0000-0000-0000-000000000002', 'i0000001-0000-0000-0000-000000000003', 40.0, 'ml', FALSE),
('r0000001-0000-0000-0000-000000000002', 'i0000001-0000-0000-0000-000000000004', 2.0, 'g', FALSE),
('r0000001-0000-0000-0000-000000000002', 'i0000001-0000-0000-0000-000000000011', 80.0, 'g', FALSE),
('r0000001-0000-0000-0000-000000000002', 'i0000001-0000-0000-0000-000000000012', 1.0, 'pza', TRUE),
('r0000001-0000-0000-0000-000000000002', 'i0000001-0000-0000-0000-000000000013', 1.0, 'pza', TRUE),
('r0000001-0000-0000-0000-000000000002', 'i0000001-0000-0000-0000-000000000014', 1.0, 'pza', TRUE);

-- Actualizar active_recipe_id
UPDATE products SET active_recipe_id = 'r0000001-0000-0000-0000-000000000001', unit_cost = 22.35, margin = 65.6 WHERE id = 'p0000001-0000-0000-0000-000000000001';
UPDATE products SET active_recipe_id = 'r0000001-0000-0000-0000-000000000002', unit_cost = 22.84, margin = 61.9 WHERE id = 'p0000001-0000-0000-0000-000000000002';

-- ── 7. Clientes ───────────────────────────────────────────
INSERT INTO customers (id, workspace_id, type, name, contact_name, phone, email, source, total_purchases) VALUES
('cu000001-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'frequent', 'Sofía Ramírez', NULL, '+52 55 8765 4321', 'sofia@ejemplo.mx', 'instagram', 2600.00),
('cu000001-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'company', 'Café Delicias CDMX', 'Jorge Herrera', '+52 55 2222 3333', 'compras@cafedelicias.mx', 'referido', 18000.00),
('cu000001-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'wedding_planner', 'Eventos & Bodas Valentina', 'Valentina Ríos', '+52 55 4444 5555', 'valentina@eventosrios.mx', 'instagram', 45000.00),
('cu000001-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'event_organizer', 'CDMX Bazares', 'Luis Morales', '+52 55 6666 7777', NULL, 'whatsapp', 8500.00);

-- ── 8. Ventas de ejemplo ──────────────────────────────────
INSERT INTO sales (id, workspace_id, folio, customer_id, channel, sale_date, status, subtotal, discount, total, cost, profit, margin, payment_method) VALUES
('sa000001-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'VTA-00087', 'cu000001-0000-0000-0000-000000000002', 'wholesale', NOW() - INTERVAL '2 hours', 'delivered', 2400.00, 0, 2400.00, 1096.32, 1303.68, 54.3, 'transfer'),
('sa000001-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'VTA-00088', NULL, 'street', NOW() - INTERVAL '38 minutes', 'paid', 390.00, 0, 390.00, 156.00, 234.00, 60.0, 'cash'),
('sa000001-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'VTA-00089', 'cu000001-0000-0000-0000-000000000001', 'instagram', NOW() - INTERVAL '12 minutes', 'paid', 650.00, 0, 650.00, 244.40, 405.60, 62.4, 'transfer');

INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, unit_cost, discount, subtotal, profit, margin) VALUES
('sa000001-0000-0000-0000-000000000001', 'p0000001-0000-0000-0000-000000000001', 24, 50.00, 22.35, 0, 1200.00, 661.60, 55.1),
('sa000001-0000-0000-0000-000000000001', 'p0000001-0000-0000-0000-000000000002', 20, 48.00, 22.84, 0, 960.00, 501.20, 52.2),
('sa000001-0000-0000-0000-000000000002', 'p0000001-0000-0000-0000-000000000002', 6, 60.00, 22.84, 0, 360.00, 222.96, 61.9),
('sa000001-0000-0000-0000-000000000002', 'p0000001-0000-0000-0000-000000000005', 1, 50.00, 18.00, 0, 50.00, 32.00, 64.0),
('sa000001-0000-0000-0000-000000000003', 'p0000001-0000-0000-0000-000000000001', 6, 65.00, 22.35, 0, 390.00, 256.10, 65.7),
('sa000001-0000-0000-0000-000000000003', 'p0000001-0000-0000-0000-000000000003', 4, 60.00, 21.00, 0, 240.00, 156.00, 65.0),
('sa000001-0000-0000-0000-000000000003', 'p0000001-0000-0000-0000-000000000005', 1, 50.00, 18.00, 0, 50.00, 32.00, 64.0);

-- ── 9. Inventario inicial ────────────────────────────────
INSERT INTO inventory_items (workspace_id, entity_type, entity_id, quantity, reserved, unit, avg_cost, min_stock) VALUES
('a0000000-0000-0000-0000-000000000001', 'ingredient', 'i0000001-0000-0000-0000-000000000006', 250.0, 0, 'g', 1.80, 100),
('a0000000-0000-0000-0000-000000000001', 'ingredient', 'i0000001-0000-0000-0000-000000000001', 3000.0, 0, 'ml', 0.28, 500),
('a0000000-0000-0000-0000-000000000001', 'ingredient', 'i0000001-0000-0000-0000-000000000002', 10000.0, 0, 'ml', 0.018, 2000),
('a0000000-0000-0000-0000-000000000001', 'ingredient', 'i0000001-0000-0000-0000-000000000012', 14.0, 0, 'pza', 8.50, 50),
('a0000000-0000-0000-0000-000000000001', 'ingredient', 'i0000001-0000-0000-0000-000000000013', 14.0, 0, 'pza', 1.20, 50),
('a0000000-0000-0000-0000-000000000001', 'product', 'p0000001-0000-0000-0000-000000000001', 48.0, 0, 'pza', 22.35, 20),
('a0000000-0000-0000-0000-000000000001', 'product', 'p0000001-0000-0000-0000-000000000002', 32.0, 0, 'pza', 22.84, 15),
('a0000000-0000-0000-0000-000000000001', 'product', 'p0000001-0000-0000-0000-000000000003', 24.0, 0, 'pza', 21.00, 15),
('a0000000-0000-0000-0000-000000000001', 'product', 'p0000001-0000-0000-0000-000000000004', 18.0, 0, 'pza', 28.50, 10),
('a0000000-0000-0000-0000-000000000001', 'product', 'p0000001-0000-0000-0000-000000000005', 38.0, 0, 'pza', 18.00, 20);

-- ── 10. Eventos próximos ──────────────────────────────────
INSERT INTO events (workspace_id, name, type, event_date, start_time, end_time, venue, guests, status, total_price, total_cost, advance_paid, balance_due, customer_id) VALUES
('a0000000-0000-0000-0000-000000000001', 'Boda García — Barra completa', 'bar', CURRENT_DATE + INTERVAL '5 days', '18:00', '23:00', 'Hacienda San Ángel, Coyoacán', 120, 'confirmed', 28000.00, 12400.00, 14000.00, 14000.00, 'cu000001-0000-0000-0000-000000000003'),
('a0000000-0000-0000-0000-000000000001', 'Activación Reforma', 'activation', CURRENT_DATE + INTERVAL '9 days', '11:00', '18:00', 'Paseo de la Reforma, CDMX', 0, 'prospect', 8500.00, 3200.00, 0, 8500.00, NULL),
('a0000000-0000-0000-0000-000000000001', 'Cumple corporativo Grupo Herdez', 'bar', CURRENT_DATE + INTERVAL '12 days', '14:00', '18:00', 'Torre Reforma, Piso 28', 80, 'confirmed', 18000.00, 7800.00, 9000.00, 9000.00, 'cu000001-0000-0000-0000-000000000002');

-- ── 11. Meta mensual ─────────────────────────────────────
INSERT INTO business_goals (workspace_id, period_type, period_value, metric, target, current_value) VALUES
('a0000000-0000-0000-0000-000000000001', 'monthly', '2025-06', 'sales', 75000.00, 54800.00),
('a0000000-0000-0000-0000-000000000001', 'monthly', '2025-06', 'units', 900, 654),
('a0000000-0000-0000-0000-000000000001', 'monthly', '2025-06', 'profit', 44000.00, 32600.00);

-- ── 12. Contenido de ejemplo ──────────────────────────────
INSERT INTO content_items (workspace_id, product_id, title, platform, format, pillar, objective, hook, status, publish_date) VALUES
('a0000000-0000-0000-0000-000000000001', 'p0000001-0000-0000-0000-000000000001', 'PÓCIMA — El efecto mariposa en tu bebida', 'instagram', 'reel', 'Antojos visuales', 'Alcance', '¿Sabías que tu bebida puede cambiar de color? 🦋', 'published', CURRENT_DATE - INTERVAL '2 days'),
('a0000000-0000-0000-0000-000000000001', 'p0000001-0000-0000-0000-000000000002', 'El Mañanero — Así comienza el día', 'tiktok', 'video', 'Producto', 'Ventas', 'El café frío que te despierta de verdad ☕', 'scheduled', CURRENT_DATE + INTERVAL '1 day'),
('a0000000-0000-0000-0000-000000000001', NULL, 'Detrás de ANTOJO — Cómo hacemos las latas', 'instagram', 'reel', 'Detrás del negocio', 'Confianza', 'Así se hace cada lata que llevas a casa 🏭', 'editing', NULL),
('a0000000-0000-0000-0000-000000000001', 'p0000001-0000-0000-0000-000000000003', 'AURA — Tropical en cada sorbo', 'instagram', 'carrusel', 'Antojos visuales', 'Alcance', 'Mango, limón y burbujas = AURA 🥭', 'idea', NULL);

-- ── 13. Tareas pendientes ─────────────────────────────────
INSERT INTO tasks (workspace_id, title, description, type, due_date, priority, status) VALUES
('a0000000-0000-0000-0000-000000000001', 'Pedir latas y tapas al proveedor', 'Stock crítico — quedan solo 14 latas', 'compra', CURRENT_DATE, 'urgent', 'todo'),
('a0000000-0000-0000-0000-000000000001', 'Enviar cotización actualizada a Eventos & Bodas', NULL, 'comercial', CURRENT_DATE + INTERVAL '1 day', 'high', 'todo'),
('a0000000-0000-0000-0000-000000000001', 'Grabar reel del proceso de producción', NULL, 'marketing', CURRENT_DATE + INTERVAL '3 days', 'medium', 'todo'),
('a0000000-0000-0000-0000-000000000001', 'Prueba receta v2 de PÓCIMA (menos azúcar)', 'Probar con 10g en lugar de 15g', 'producción', CURRENT_DATE + INTERVAL '5 days', 'medium', 'todo');

-- ── 14. Experimento de crecimiento ────────────────────────
INSERT INTO growth_experiments (workspace_id, name, hypothesis, audience, channel, max_investment, start_date, end_date, primary_metric, goal_value, status) VALUES
('a0000000-0000-0000-0000-000000000001', 'Venta en Bazar de la Roma', 'Si vendemos en el Bazar de la Roma los sábados, venderemos 60+ unidades por jornada con un margen superior al 55%.', 'Jóvenes adultos CDMX 22-35', 'Punto de venta externo', 2500.00, CURRENT_DATE + INTERVAL '7 days', CURRENT_DATE + INTERVAL '30 days', 'Ventas totales', 9000.00, 'planning');
