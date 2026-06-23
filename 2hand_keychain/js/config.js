// =========================================
// KEY2HAND — Site Configuration
// Edit this file to update the whole site.
// =========================================

const CONFIG = {

  // ---- Site Identity ----
  site: {
    name:        "Key2hand",
    tagline:     "Handmade Crochet Keychains, Crafted with Love",
    description: "Beautiful, hand-stitched crochet keychains — amigurumi animals, flowers, cute fruits, and custom designs. Each piece is meticulously made with premium yarn.",
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
    keychains:   "50+",
    happyBuyers: "300+",
    avgRating:   "4.9★",
  },

  // ---- Categories (Updated for Crochet Shop) ----
  categories: [
    { name: "Flower",    emoji: "🌸" },
    { name: "Animal",    emoji: "🧸" },
    { name: "Fruit",     emoji: "🍓" },
    { name: "Custom",    emoji: "🎨" },
  ],

  // ---- Promo Codes ----
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
    demoEmail:    "demo@key2hand.com",
    demoPassword: "demo123",
    demoName:     "Demo User",
    minPasswordLength: 6,
  },

  // ---- SEO / Meta ----
  seo: {
    titleSuffix:  " – Key2hand Crochet", 
    ogImage:      "assets/og-image.jpg", 
    keywords:     "Key2hand, crochet keychain, handmade keychain, amigurumi, knitted keychain, moc khoa len, Da Nang, Vietnam",
  },

  // ---- Footer ----
  footer: {
    copyrightYear: 2026,
    tagline:       "All items are lovingly handmade — quality accurately described.",
  },

  // ---- Feature Flags ----
  features: {
    wishlist:     true,   
    reviews:      true,   
    stockBadge:   true,   
    freeShipping: true,   
    promoCodes:   true,   
  },
};

// =========================================
// Derived helpers — do not edit below here
// =========================================

function formatPrice(amount) {
  const formatted = amount.toLocaleString(CONFIG.currency.locale);
  return CONFIG.currency.prefix + formatted + CONFIG.currency.suffix;
}

function getCategoryEmoji(name) {
  const cat = CONFIG.categories.find(c => c.name === name);
  return cat ? cat.emoji : "🧶";
}

function validatePromoCode(code) {
  const entry = CONFIG.promoCodes[code.toUpperCase()];
  if (!entry) return { valid: false };
  return { valid: true, ...entry };
}

function setPageTitle(pageTitle) {
  document.title = pageTitle
    ? pageTitle + CONFIG.seo.titleSuffix
    : CONFIG.site.name;
}