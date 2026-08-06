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

Checkout is intentionally anonymous — there is no login requirement to buy, and `orders` has no `user_id` column. `generate-order.ts` does not check for a session and never should; do not add one without an explicit product decision to require login for purchase.

1. `actions/orders/generate-order.ts` — takes only `{ id, size, quantity }` per cart item from the client (never a price). Inside the transaction it re-reads `price` from `products`, and atomically decrements `product_sizes.stock` with an `UPDATE ... WHERE stock >= quantity` (rejecting the order if that updates 0 rows) — this both validates and *reserves* stock for the order in the same step, race-safe under concurrent checkouts. It computes `unit_price`/`total_price`/`subtotal`/`total` itself; the client-supplied cart price is never trusted. Shipping cost is the shared constant `lib/constants.ts#SHIPPING_COST`, not a client-supplied value. Inserts `orders` + `order_address` + `order_items` in one transaction (`BEGIN`/`COMMIT`/`ROLLBACK` on the same client from `pool.connect()`). Stock reserved this way is only released back if the payment is later rejected/cancelled (see webhook below) — there is no reservation timeout, so an abandoned "pending" order holds its stock indefinitely.
2. `actions/mercadopago/create-preference.ts` — creates a Mercado Pago `Preference` for the order, storing the resulting id in `orders.preference_id`. It is idempotent: if the order already has a `preference_id` it's returned immediately (fast path, no Mercado Pago API call); the first-ever call takes a row lock (`SELECT ... FOR UPDATE` on the order) around the create-and-persist step so concurrent requests for the same order can't create two preferences, and passes `requestOptions.idempotencyKey: orderId` so a network-level retry of the same request can't create a duplicate on Mercado Pago's side either. `app/orders/[id]/page.tsx` / `hooks/use-preference.ts` skip calling this action entirely once `getOrderById` already returns a `preference_id` — the Wallet button just renders with it. Sets `external_reference` to the order id (no `metadata` — `external_reference` is the single source of truth for identifying the order, read back on the payment object in the webhook), real product titles/`currency_id: "ARS"` per item, and `back_urls` pointing at `orders/[id]`. Throws if `DOMAIN_URL` is unset rather than falling back to any placeholder URL — `DOMAIN_URL` must be set in every environment that creates preferences.
3. `app/api/mercadopago/pagos/route.ts` — webhook endpoint. Verifies the `x-signature` HMAC (using `MP_SECRET_KEY`) before trusting the payload, and ignores any notification whose `type` isn't `"payment"`. For payment notifications it fetches the payment by id and reads the order id off `data.external_reference` (not `metadata`), then, inside a transaction with a row lock on the order (`FOR UPDATE`, keyed off `payment_status` to stay idempotent across webhook retries): if `approved`, sets `orders.status`/`payment_status` to `paid`; if `rejected`/`cancelled`, sets `payment_status` to `failed`, `status` to `cancelled`, and restores the stock that was reserved at order creation. Returns HTTP 500 (not 200) when processing genuinely fails, so Mercado Pago retries instead of considering the notification delivered.

### Database schema (`seed/schema.sql`)

Postgres enums: `category_products`, `sizes` (XS–XXL), `genres`. Core tables: `products`, `product_images` (1:N), `product_sizes` (per-size stock). `orders` has no `user_id` — purchases are not tied to a Better Auth `user` account. `orders.preference_id` caches the Mercado Pago preference id (see Order + payment flow above). Orders: `orders` → `order_address` (1:1) and `order_items` (1:N), all cascading on delete from `orders`.

### Auth notes

`proxy.ts` contains an *optimistic* auth redirect (checks session, redirects to `/sign-in` if absent) but its `config.matcher` is empty — it is not currently wired into any route. Login is only used for account-related pages, not for checkout (see Order + payment flow above).

### Environment variables

Required (see `.env`, not committed): `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_MP_PUBLIC_KEY`, `MP_ACCESS_TOKEN`, `MP_SECRET_KEY`, `DOMAIN_URL`.

### Path aliases

`@/*` maps to the repo root (see `tsconfig.json`), e.g. `@/lib/db`, `@/store/cart-store`.
