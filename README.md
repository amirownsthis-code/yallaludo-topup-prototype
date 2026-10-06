# Yalla Ludo Top-Up UI Prototype

A React and TypeScript frontend prototype for browsing Gold Coin and Diamond packages and exploring a simulated checkout flow.

**Independent portfolio demo. This project is not affiliated with or authorized by Yalla Ludo. It does not accept payments, deliver game currency, send emails, or generate redeemable vouchers.**

## My contribution

I created the UI design direction and planned the website flow. The implementation was developed with AI assistance. This project demonstrates my work on frontend layouts, component-based interfaces, and purchase-flow prototyping.

## Features

- Gold Coins and Diamonds tabs, with 10 example packages in each category.
- Package selection, deselection, prices, and an order summary.
- Delivery email input and seven illustrative payment-method options.
- Simulated checkout forms, processing animation, generated demo voucher codes, clipboard copying, and confetti.
- Demo registration, login, logout, and profile editing, including avatar uploads.
- Searchable and filterable transaction-history UI using four hardcoded sample orders.
- A seven-day VIP reward interface with a simulated claim interaction.
- Sidebar navigation and FAQ, About, Contact, and notification modals.
- Responsive layout classes and custom CSS animations.

## Stack

React 19, TypeScript, Vite 6, Tailwind utility classes, custom CSS, Lucide React icons, and canvas-confetti.

The current UI loads Tailwind utilities through the Play CDN in `index.html`. Google Fonts also requires an internet connection. Although Tailwind 4 packages are installed, its Vite plugin is not currently enabled. A production release would need a consistent compiled Tailwind setup and visual verification.

## Run locally

Use a maintained Node.js LTS release with npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. If that port is busy, Vite may choose another port.

To build and inspect the compiled app:

```bash
npm run build
npm run preview
```

Open the preview URL printed in the terminal, usually `http://localhost:4173`.

## Image assets

Keep the existing image assets in **`public/images/`**. Source URLs such as `/images/gold-coin-1.png` then work during development and the image folder is copied into `dist` during a build.

If your original project still has an `images` folder at its root, move that folder inside `public` once. Do not rename individual assets; filename capitalization matters on Linux hosting. The banner supports `banner-1.webp` with a `banner-1.png` fallback.

On Windows, check referenced asset filenames with:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\check-assets.ps1
```

This script only reads source paths and checks whether files exist. It does not modify files or persistent execution-policy settings.

## Project layout

- `src/App.tsx`: application state and main flow.
- `src/components/`: navigation, packages, checkout, profile, history, and rewards interfaces.
- `src/data.ts`: illustrative package prices and payment-method content.
- `src/userStorage.ts`: browser-only demo accounts and session persistence.
- `src/index.css`: custom styling and animations.
- `public/images/`: local artwork and image assets.
- `index.html`: entry point and external styling/font resources.
- `package-lock.json`: locked dependency versions.
- `check-assets.ps1`: Windows asset-filename check.

`node_modules`, `dist`, local environment files, and the review/setup ZIP archives are excluded from Git.

## Demo behavior and limitations

- There is no backend, server database, payment gateway, email service, or official game API.
- Accounts and sessions are stored in this browser's `localStorage`. Demo passwords are plaintext and browser state can be modified. This is not production authentication; use fictional details and a disposable demo password.
- Checkout uses basic length checks and a timer. Payment form values are held in React state; no payment request is submitted. Generated `YL-...` codes are fictional.
- Transaction history is hardcoded. Completing checkout does not add an order to this list.
- VIP claims update component state and reset on a page reload; there is no real daily reward or game delivery.
- The Contact form only displays a confirmation message. It does not create a support ticket or send an email.
- Prices, sales counts, reviews, security badges, and wording such as "Official Store", "authorized", "verified", and "instant delivery" are illustrative prototype content, not verified service claims.
- Some decorative buttons and links are placeholders. Desktop and mobile layouts still need manual testing with the actual assets.

## Quick manual check

1. Run the asset check, start the app, and confirm the images and styling load.
2. Switch between Coins and Diamonds; select and deselect a package.
3. Enter a fictional email, select a payment method, and try the simulated checkout.
4. Register a fictional account, edit its profile, reload the page, and log out.
5. Test history search/filtering and the demo VIP claim interaction.
6. Build the app, run preview, and check images and layouts at desktop and mobile widths.

Screenshots can be added under `docs/screenshots/` after the local checks.
