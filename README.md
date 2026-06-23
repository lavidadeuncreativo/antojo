# ANTOJO OS

**Centro operativo y estratégico de ANTOJO.** — Bebidas frías artesanales.

Una aplicación SaaS completa para gestionar ventas, inventario, producción, finanzas, marketing, eventos y crecimiento del negocio.

---

## Stack técnico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript estricto |
| Estilos | Tailwind CSS v4 + CSS Variables |
| Componentes | Radix UI Primitives |
| Base de datos | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Formularios | React Hook Form + Zod |
| Tablas | TanStack Table v8 |
| Gráficas | Recharts |
| Animaciones | Framer Motion |
| Fechas | date-fns (es-MX) |
| Íconos | Lucide React |

---

## Instalación local

### 1. Clonar y dependencias

```bash
git clone <repo>
cd antojo-os
npm install
```

### 2. Variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase (ver sección siguiente).

### 3. Configurar Supabase

#### a) Crear cuenta y proyecto

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratuita
2. Crea un nuevo proyecto (región: **South America (São Paulo)** para menor latencia desde México)
3. Espera 1-2 minutos a que el proyecto se inicialice

#### b) Obtener credenciales

En tu proyecto de Supabase:
1. Ve a **Settings → API**
2. Copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (**solo para servidor, nunca expongas esto**)

#### c) Ejecutar migraciones

En el **SQL Editor** de Supabase, ejecuta en orden:

```sql
-- 1. Schema completo
-- Pega el contenido de: supabase/migrations/001_initial_schema.sql

-- 2. Datos de demostración (opcional pero recomendado)
-- Pega el contenido de: supabase/seed.sql
```

#### d) Crear tu usuario

1. En Supabase → **Authentication → Users → Add user**
2. Ingresa tu email y contraseña
3. Copia el `UUID` del usuario creado

En el SQL Editor, crea el perfil de tu usuario:

```sql
INSERT INTO profiles (user_id, workspace_id, full_name, role)
VALUES (
  'TU-UUID-DE-USUARIO',                    -- reemplaza con tu UUID
  'a0000000-0000-0000-0000-000000000001',  -- workspace ANTOJO del seed
  'Tu Nombre',
  'owner'
);
```

### 4. Iniciar desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## Despliegue en Vercel

### 1. Conectar repositorio

1. Ve a [vercel.com](https://vercel.com) y conecta tu repositorio de GitHub
2. Selecciona el proyecto `antojo-os`

### 2. Variables de entorno en Vercel

En **Settings → Environment Variables**, agrega:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
```

### 3. Deploy

Vercel detecta automáticamente Next.js. El primer despliegue tarda ~2 minutos.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── (auth)/          # Login, registro
│   ├── (app)/           # App protegida con layout
│   │   ├── dashboard/
│   │   ├── sales/
│   │   ├── products/
│   │   ├── inventory/
│   │   ├── production/
│   │   ├── purchases/
│   │   ├── finance/
│   │   ├── commercial/
│   │   ├── events/
│   │   ├── quotes/
│   │   ├── marketing/
│   │   ├── calendar/
│   │   ├── growth/
│   │   ├── reports/
│   │   └── settings/
│   └── api/             # Route handlers
├── components/
│   ├── layout/          # AppShell, Sidebar, Topbar
│   └── ui/              # Sistema de diseño ANTOJO
├── lib/
│   ├── supabase/        # Clientes servidor y browser
│   └── utils.ts         # Calculadoras de negocio
└── types/
    └── database.ts      # Tipos TypeScript del schema
```

---

## Módulos implementados

### Fase 1 ✅ (actual)
- [x] Arquitectura y configuración completa
- [x] Base de datos con 40+ tablas y RLS
- [x] Autenticación con Supabase
- [x] Sistema visual ANTOJO (tokens, componentes, tipografía)
- [x] App Shell (Sidebar, Topbar, bottom nav mobile)
- [x] Dashboard con métricas, gráficas y bento grid
- [x] Datos de demostración realistas

### Fase 2 🔄 (en desarrollo)
- [ ] Módulo de Productos con CRUD completo
- [ ] Módulo de Ingredientes
- [ ] Sistema de Recetas con versiones
- [ ] Calculadora y simulador de costos
- [ ] Módulo de Inventario con movimientos

### Fases siguientes
- Fase 3: Producción, Compras, Proveedores
- Fase 4: Ventas, POS móvil, Finanzas
- Fase 5: Promociones, CRM, Cotizaciones, Eventos
- Fase 6: Marketing, Calendario, Crecimiento, Reportes

---

## Supuestos técnicos

Ver [docs/assumptions.md](./docs/assumptions.md)

---

## Localización

- **Idioma**: Español (es-MX)
- **Moneda**: Peso Mexicano (MXN)
- **Zona horaria**: America/Mexico_City
- **Formato de fecha**: `d MMM yyyy` (ej: `23 Jun 2025`)
- **Formato de número**: `1,234.56`

---

## Licencia

Uso privado — ANTOJO. © 2025
