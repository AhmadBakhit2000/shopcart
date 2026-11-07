# Shopcart – React + Tailwind e-commerce UI
Matches the reference video: Home → Product details → Checkout → Order accepted.

## Install
```
npm install
npm run dev      # http://localhost:5173
npm run build
```
## Structure
- `src/context/AppContext.jsx` – language (RTL/LTR), dark mode, cart, coupon, tiny state router
- `src/data/` – `i18n.js` (EN/AR strings), `products.js` (catalogue, weekly products, specs)
- `src/components/` – Navbar (green bar, categories panel, live search), ProductCard, Stars, Price, Footer
- `src/pages/` – Home, Product, Checkout (+ success modal)
- `public/img/` – images cropped from the reference video (hero, banner, categories, products, services)

## Features
Hero, top categories, promo banner, filter chips (type/price/review/color/material/offer) + sort, paginated grid (8 per page), weekly popular, services cards, product page with colour-swapping gallery (AirPods Max), quantity, delivery check, spec tables, similar items, cart, coupon `SAVE10`, 10% tax, free shipping over $100, delivery + card forms, "Pay $X" button, cash-back banner, success modal. EN/AR + dark mode.

## Notes
- Images are cropped from the video, so they are low/medium resolution; replace the files in `public/img/` with originals (same names) for sharper results.
- Green/Blue/White AirPods variants are recoloured from the pink photo.
- Category tile labels are baked into the images (English only).
