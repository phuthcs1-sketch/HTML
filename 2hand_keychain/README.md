# Key2hand 🗝️

A demo website for **Key2hand** — a Da Nang City organization selling second-hand keychains.

This is a front-end only project with no backend or build step required. All data is mocked and stored in the browser's `localStorage`.

---

## How to Open the Website

### Option 1 — Open directly in a browser (simplest)

1. Download or clone this folder to your computer.
2. Open the `Phu_2Hand` folder.
3. Double-click `index.html`.

The site opens immediately in your default browser. No installation needed.

> **Note:** Some browsers restrict features (like `localStorage`) when opening files directly with `file://`. If anything looks broken, use Option 2 below.

---

### Option 2 — Use VS Code Live Server (recommended)

1. Open the `Phu_2Hand` folder in [Visual Studio Code](https://code.visualstudio.com/).
2. Install the **Live Server** extension (search `ritwickdey.liveserver` in the Extensions panel).
3. Right-click `index.html` → **Open with Live Server**.
4. The site opens at `http://127.0.0.1:5500`.

---

### Option 3 — Use Python's built-in server

Open a terminal in the `Phu_2Hand` folder and run:

```bash
# Python 3
python3 -m http.server 8080
```

Then visit `http://localhost:8080` in your browser.

---

### Option 4 — Use Node.js `serve`

```bash
npx serve .
```

Then visit the URL shown in the terminal (usually `http://localhost:3000`).

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, featured products, categories |
| Shop | `shop.html` | Full product grid with filters and search |
| Product | `product.html?id=1` | Product detail (change the `id` number) |
| Cart | `cart.html` | Shopping cart and checkout |
| About | `about.html` | Organization story, values, FAQ |
| Login | `login.html` | Sign in to your account |
| Register | `register.html` | Create a new account |

---

## Demo Account

A built-in test account is ready to use:

| Field | Value |
|-------|-------|
| Email | `demo@key2hand.com` |
| Password | `demo123` |

Or register a new account on the Register page — it is saved locally in your browser.

---

## Notes

- All data is **mock only** — no real products, payments, or orders are processed.
- Cart, wishlist, and user accounts are stored in `localStorage` and reset if you clear your browser data.
- Promo codes you can try at checkout: `KEY10`, `WELCOME`, `STUDENT`.
- The site is fully responsive — works on desktop, tablet, and mobile.

---

## Project Structure

```
Phu_2Hand/
├── index.html          # Home page
├── shop.html           # Shop / product listing
├── product.html        # Product detail
├── cart.html           # Shopping cart
├── about.html          # About Key2hand
├── login.html          # Login
├── register.html       # Register
├── css/
│   ├── style.css       # Global styles and variables
│   ├── components.css  # Buttons, cards, modals, toasts
│   └── animations.css  # Fade and reveal animations
└── js/
    ├── config.js       # Site-wide settings (name, currency, shipping, etc.)
    ├── data.js         # Mock product data
    ├── auth.js         # Login / logout / session helpers
    ├── cart.js         # Cart and wishlist logic
    ├── main.js         # Navbar, toasts, product card renderer
    ├── shop.js         # Shop page filters and sorting
    └── product.js      # Product detail page logic
```

---

© 2025 Key2hand — Da Nang City, Vietnam
