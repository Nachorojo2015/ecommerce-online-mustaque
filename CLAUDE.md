# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js, Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (eslint-config-next core-web-vitals + typescript)
```

There is no test suite configured in this repo.

Database schema/seed data lives in `seed/schema.sql` — run it against the Postgres instance pointed to by `DATABASE_URL` to (re)create tables and seed sample products.

## Architecture

Next.js 16 (App Router) e-commerce site ("Mustaque") for apparel, in Spanish. Key stack: Better Auth (Google/Facebook OAuth + email-password), Postgres via raw `pg` queries (no ORM), Mercado Pago for payments, Zustand for client state, Tailwind + daisyUI for styling.

### Route groups (`app/`)

- `(site)` — public storefront: home (`page.tsx`), `[category]` product listing, `product/[slug]` detail, plus static info pages (`como-comprar`, `politica-de-cambios`, `preguntas-frecuentes`, `stores`).
- `(auth)` — `iniciar-sesion` (login) and `registro` (register), share a minimal layout.
- `checkout` — cart review and `checkout/address` for shipping details; not inside `(site)` layout.
- `orders` — order confirmation/status pages, `orders/[id]`.
- `api/auth/[...all]` — Better Auth's catch-all handler.
- `api/mercadopago/pagos` — Mercado Pago webhook receiver (see below).

### Data flow

- **Server Actions** (`actions/`) are the only way pages/components talk to Postgres — no REST/API layer for reads. Grouped by domain: `actions/products`, `actions/orders`, `actions/auth`, `actions/mercadopago`. All start with `"use server"` and query `pool` from `lib/db.ts` directly with parameterized SQL (no ORM/query builder).
- `lib/db.ts` exports a singleton `pg.Pool`, cached on `globalThis` in dev to survive HMR.
- `lib/auth.ts` configures Better Auth against the same Postgres pool; `lib/auth-client.ts` is the browser-side client (`better-auth/react`).
- Client-side cart and checkout form state persist to localStorage via Zustand (`store/cart-store.ts`, `store/checkout-store.ts`), not the database, until an order is actually placed.

### Order + payment flow

1. `actions/orders/generate-order.ts` — requires an authenticated session (`auth.api.getSession`), inserts `orders` + `order_address` + `order_items` in one transaction (`BEGIN`/`COMMIT`/`ROLLBACK` on the same client from `pool.connect()`).
2. `actions/mercadopago/create-preference.ts` — creates a Mercado Pago `Preference` for the order, embedding `orderId` in `metadata`, with `back_urls` pointing at `orders/[id]` (falls back to arbitrary external URLs if `DOMAIN_URL` is unset — check this if wiring up new redirect logic).
3. `app/api/mercadopago/pagos/route.ts` — webhook endpoint. Verifies the `x-signature` HMAC (using `MP_SECRET_KEY`) before trusting the payload, then fetches the payment by id and, if `approved`, updates `orders.status`/`payment_status` to `paid` using `metadata.order_id`.

### Database schema (`seed/schema.sql`)

Postgres enums: `category_products`, `sizes` (XS–XXL), `genres`. Core tables: `products`, `product_images` (1:N), `product_sizes` (per-size stock), plus Better Auth's own `user` table (referenced by `orders.user_id` but not defined in this file — created by Better Auth). Orders: `orders` → `order_address` (1:1) and `order_items` (1:N), all cascading on delete from `orders`.

### Auth notes

`proxy.ts` contains an *optimistic* auth redirect (checks session, redirects to `/sign-in` if absent) but its `config.matcher` is empty — it is not currently wired into any route. The file explicitly warns this pattern is not secure on its own; real auth checks must happen in each server action/page, mirroring what `generate-order.ts` already does.

### Environment variables

Required (see `.env`, not committed): `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_MP_PUBLIC_KEY`, `MP_ACCESS_TOKEN`, `MP_SECRET_KEY`, `DOMAIN_URL`.

### Path aliases

`@/*` maps to the repo root (see `tsconfig.json`), e.g. `@/lib/db`, `@/store/cart-store`.
