# Ohhi — Café & bar, Malmö

Production-ready Next.js 14 site for Ohhi, opening June 2025 at Beijerskajen 2, Malmö.

## Setup

```bash
cd ohhi
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

- `/` — Homepage (Hero, About, Gallery, Instagram, Visit, Footer)
- `/menu` — Menu (read-only). With `?table=N` becomes the scan-to-order experience.
- `/order?table=N` — Redirects to `/menu?table=N` (QR codes point here).
- `/admin` — Kitchen dashboard. PIN: `ohhi2025`.
- `/admin/qr` — Generate and print QR codes per table.

## Adding real photos

Placeholder slots live in `components/Gallery.tsx`, `components/About.tsx`, and `components/InstagramFeed.tsx`. Drop images into `public/` and replace the placeholder `<div>` elements with `<img src="/your-photo.jpg" alt="..." className="..." />` or `next/image`.

## Updating the menu

All items + prices live in `lib/menuData.ts`. Swedish translations via the optional `nameSv` field on each item. Categories are defined at the top of the same file.

## Changing the admin PIN

Edit the `PIN` constant at the top of `components/AdminDashboard.tsx`.

## Connecting a real backend

`lib/orderStore.ts` uses `localStorage` for the demo. Replace `loadOrders`, `saveOrders`, `addOrder`, and `updateOrderStatus` with Supabase or Firebase calls. Search for `// TODO: Replace with Supabase realtime` — that's the hook point. For live updates on `/admin`, swap the `setInterval` poll in `components/AdminDashboard.tsx` for a realtime subscription.

## Language

Translations live in `locales/en.json` and `locales/sv.json`. Toggle persists via `localStorage`.

## QR codes

`/admin/qr` — set number of tables (1–20) and base URL (default `https://ohhi.se/order`), then print. Each QR encodes `BASE_URL?table=N`.

## Stack

Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, qrcode.react, react-i18next.
