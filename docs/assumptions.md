# Supuestos del sistema ANTOJO OS

## Financiero y contable
1. **Moneda única**: Todo opera en MXN. No hay conversión de divisas.
2. **IVA incluido**: Los precios de venta se registran con IVA incluido por defecto. El sistema **no genera CFDI ni contabilidad fiscal oficial**.
3. **Costo promedio ponderado móvil**: El costo de inventario se actualiza en cada compra/recepción usando la fórmula: `(stock_actual × costo_actual + nueva_cantidad × nuevo_costo) / (stock_actual + nueva_cantidad)`.
4. **Costos históricos inmutables**: Al registrar una venta, se guarda el costo unitario del momento. Cambios posteriores en recetas o costos **no afectan ventas anteriores**.
5. **Margen de contribución**: Se calcula como `(precio - costo_variable) / precio × 100`. No incluye gastos fijos en el margen unitario, pero el dashboard muestra contribución total vs gastos.
6. **Utilidad estimada**: El campo `profit` en ventas es `total - cost`. No incluye gastos operativos fijos.

## Inventario
7. **Inventario negativo**: El sistema previene inventario negativo por defecto. Solo un usuario con rol `owner` o `admin` puede autorizar un ajuste que resulte en negativo, y debe indicar el motivo.
8. **Reservas**: Al crear un lote de producción, los ingredientes se **reservan** hasta que el lote se finaliza o cancela.
9. **Movimientos obligatorios**: No existe una operación que cambie el stock directamente. Todo cambio genera un `inventory_movement`.

## Producción
10. **Versión de receta activa**: Solo una versión de receta puede tener estado `approved` por producto. Al aprobar una nueva versión, la anterior cambia a `replaced`.
11. **Lote cancelado**: Si un lote se cancela, los insumos reservados se liberan pero el costo registrado permanece en el audit log.

## Ventas y POS
12. **POS offline**: El módulo de punto de venta móvil usa IndexedDB para guardar ventas temporales durante desconexión. Al recuperar conexión, sincroniza automáticamente.
13. **Folio**: Los folios se generan con prefijo por tipo (`VTA-`, `LOT-`, `COM-`, `COT-`, `GAS-`) y un secuencial por workspace. No son globalmente únicos.

## Marketing
14. **Métricas de redes sociales**: Las métricas de contenido se registran **manualmente** en esta versión. No hay integración automática con APIs de Instagram, TikTok o Facebook en v1. La arquitectura está preparada para integrarse vía webhooks.
15. **Ventas atribuidas**: La atribución de ventas a campañas es **manual** (el vendedor indica la campaña en la venta). No hay tracking de cookies ni UTMs automáticos.

## Multi-workspace
16. **Workspace único por usuario en v1**: Aunque la arquitectura soporta múltiples workspaces, la UI v1 asume que cada usuario pertenece a un solo workspace.

## Seguridad
17. **RLS en Supabase**: Row Level Security está activo en todas las tablas. Las políticas usan `get_user_workspace()` para aislar datos por workspace.
18. **Service Role Key**: La `SERVICE_ROLE_KEY` solo se usa en el servidor (Server Actions, Route Handlers). **Nunca** se expone al cliente.
19. **Permisos de roles**: Los permisos por rol (ver, crear, editar, exportar, aprobar) se verifican **server-side** en cada Server Action. No son solo visuales.

## Técnicos
20. **PDF de cotizaciones**: Generado server-side con `@react-pdf/renderer`. Requiere renderizado en el servidor.
21. **Supabase Storage**: Las imágenes de productos, comprobantes y archivos de contenido se almacenan en buckets de Supabase Storage con políticas de acceso por workspace.
22. **Zona horaria**: Todas las fechas se almacenan en UTC en la base de datos. La UI convierte a `America/Mexico_City` usando `date-fns` con el locale `es-MX`.
23. **Números decimales**: Para dinero se usa `NUMERIC(12,2)` en PostgreSQL. En JavaScript se trabajan como strings al leer de Supabase y se convierten a `Number` solo para cálculos.

## Límites de v1 (no incluidos)
- Facturación CFDI
- Nómina
- Ecommerce público
- App nativa (iOS/Android)
- IA predictiva
- Franquicias
- Integraciones automáticas con redes sociales
