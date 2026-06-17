// =========================================
// KEY2HAND — Site Configuration
// Edit this file to update the whole site.
// =========================================

const CONFIG = {

  // ---- Site Identity ----
  site: {
    name:        "Key2hand",
    tagline:     "Second-Hand Keychains, Great Prices",
    description: "Handpicked, authentic second-hand keychains — anime, vintage, cute and custom. Each piece is carefully checked and honestly described.",
    logo:        "assets/images/logo.png",
    url:         "https://key2hand.com",        // update when you deploy
    language:    "en",
  },

  // ---- Owner / Contact ----
  contact: {
    ownerName:  "Key2hand",
    email:      "hello@key2hand.com",
    phone:      "090 xxx xxxx",
    city:       "Da Nang City",
    country:    "Vietnam",
    zalo:       "090 xxx xxxx",
    instagram:  "@key2hand",
    facebook:   "Key2hand",
    tiktok:     "@key2hand",
  },

  // ---- Currency & Locale ----
  currency: {
    locale:    "vi-VN",     // used by toLocaleString()
    suffix:    " đ",        // appended after formatted number
    // To switch to USD: locale: "en-US", prefix: "$", suffix: ""
    prefix:    "",
  },

  // ---- Shipping ----
  shipping: {
    freeThreshold: 200000,   // order subtotal above this = free shipping (VND)
    defaultFee:     30000,   // flat fee when below threshold (VND)
    estimatedDays:  "1–2",   // shown on product page ("ships within X business days")
  },

  // ---- Stats shown on homepage hero ----
  stats: {
    keychains:   "30+",
    happyBuyers: "500+",
    avgRating:   "4.8★",
  },

  // ---- Categories (order, emoji, label) ----
  categories: [
    { name: "Anime",   emoji: "⛩️" },
    { name: "Cute",    emoji: "🧸" },
    { name: "Vintage", emoji: "🕰️" },
    { name: "Metal",   emoji: "⚙️" },
    { name: "Custom",  emoji: "🎨" },
    { name: "Acrylic", emoji: "💎" },
  ],

  // ---- Promo Codes ----
  // Each code: { discount: 0–100 (%), label: string shown to user }
  promoCodes: {
    "KEY10":    { discount: 10, label: "10% off your order" },
    "WELCOME":  { discount: 15, label: "15% welcome discount" },
    "STUDENT":  { discount:  5, label: "5% student discount"  },
  },

  // ---- Shop Page ----
  shop: {
    pageSize:       9,        // products per page (Load More)
    maxPriceFilter: 160000,   // max value of the price range slider (VND)
    defaultSort:    "newest", // "newest" | "price-asc" | "price-desc" | "rating" | "discount"
  },

  // ---- Auth (mock) ----
  auth: {
    // Built-in demo account for testing — change or remove before going live
    demoEmail:    "demo@key2hand.com",
    demoPassword: "demo123",
    demoName:     "Demo User",
    minPasswordLength: 6,
  },

  // ---- SEO / Meta ----
  seo: {
    titleSuffix:  " – Key2hand",         // appended to each page title
    ogImage:      "assets/og-image.jpg", // open graph share image
    keywords:     "Key2hand, second hand keychain, used keychain, anime keychain, vintage keychain, Da Nang, Vietnam",
  },

  // ---- Footer ----
  footer: {
    copyrightYear: 2025,
    tagline:       "All items are second-hand — conditions accurately described.",
  },

  // ---- Feature Flags ----
  // Set false to hide a feature without deleting code
  features: {
    wishlist:     true,   // heart / wishlist button on product cards
    reviews:      true,   // show star ratings and review counts
    stockBadge:   true,   // "Only X left!" badge on cards
    freeShipping: true,   // free-shipping progress bar in cart
    promoCodes:   true,   // promo code input in cart
  },
};

// =========================================
// Derived helpers — do not edit below here
// =========================================

/**
 * Format a number as a price string using CONFIG.currency settings.
 * Replaces the plain formatPrice() in data.js.
 */
function formatPrice(amount) {
  const formatted = amount.toLocaleString(CONFIG.currency.locale);
  return CONFIG.currency.prefix + formatted + CONFIG.currency.suffix;
}

/**
 * Return the emoji for a given category name.
 */
function getCategoryEmoji(name) {
  const cat = CONFIG.categories.find(c => c.name === name);
  return cat ? cat.emoji : "🗝️";
}

/**
 * Validate a promo code. Returns { valid, discount, label } or { valid: false }.
 */
function validatePromoCode(code) {
  const entry = CONFIG.promoCodes[code.toUpperCase()];
  if (!entry) return { valid: false };
  return { valid: true, ...entry };
}

/**
 * Build a full page <title> string.
 * Usage: setPageTitle("Shop") → "Shop – Key2hand"
 */
function setPageTitle(pageTitle) {
  document.title = pageTitle
    ? pageTitle + CONFIG.seo.titleSuffix
    : CONFIG.site.name;
}
