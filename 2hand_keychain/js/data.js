// =========================================
// KEY2HAND — Mock Product Data
// =========================================

const PRODUCTS = [
  {
    id: 1,
    name: "Totoro Forest Spirit",
    category: "Acrylic",
    condition: "Like New",
    price: 35000,
    originalPrice: 80000,
    images: [
      "assets/images/Totoro Forest Spirit.jpg"
    ],
    description: "Adorable Totoro acrylic keychain from My Neighbor Totoro. Super kawaii design with glitter fill. Only used for display, no scratches.",
    tags: ["anime", "ghibli", "cute", "acrylic"],
    stock: 2,
    rating: 4.9,
    reviews: 18,
    dateAdded: "2025-05-20",
    featured: true
  },
  {
    id: 2,
    name: "Naruto Headband",
    category: "Anime",
    condition: "Good",
    price: 25000,
    originalPrice: 50000,
    images: [
      "assets/images/Naruto.jpg"
    ],
    description: "Authentic Naruto headband from the popular manga and anime series. Great for fans and collectors.",
    tags: ["anime", "naruto", "cosplay", "accessory"],
    stock: 5,
    rating: 4.7,
    reviews: 25,
    dateAdded: "2025-05-21",
    featured: false
  },
  {
    id: 3,
    name: "crochet flower keychain",
    condition: "Like New",
    price: 15000,
    originalPrice: 30000,
    category: "Cute",
    images: [
      "assets/images/crochet flower keychain.jpg"
    ],
    description: "Handmade crochet flower keychain. Perfect for adding a touch of charm to your keys.",
    tags: ["cute", "handmade", "crochet"],
    stock: 10,
    rating: 4.8,
    reviews: 30,
    dateAdded: "2025-05-22",
    featured: true
  },
  {
    id: 4,
    name: "Doremon Keychain",
    category: "Cute",
    condition: "Like New",
    price: 25000,
    originalPrice: 50000,
    images: [
      "assets/images/Doraemon.jpg"
    ],
    description: "Charming Doremon keychain. Perfect for fans of the classic anime series.",
    tags: ["cute", "anime", "doremon"],
    stock: 7,
    rating: 4.6,
    reviews: 20,
    dateAdded: "2025-05-23",
    featured: false
  },
  {
    id: 5,
    name: "Acrylic Keychain",
    category: "Acrylic",
    condition: "Good",
    price: 20000,
    originalPrice: 40000,
    images: [
      "assets/images/Acrylic Keychain.jpg"
    ],
    description: "Durable acrylic keychain with a sleek design. Great for everyday use.",
    tags: ["acrylic", "keychain", "accessory"],
    stock: 15,
    rating: 4.5,
    reviews: 12,
    dateAdded: "2025-05-24",
    featured: true
  }
];
// Categories derived from data
const CATEGORIES = ["All", ...new Set(PRODUCTS.map(p => p.category))];

// Helper: get product by id
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id)) || null;
}

// Helper: get featured products
function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

// Helper: get related products (same category, exclude self)
function getRelatedProducts(product, limit = 4) {
  return PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

// NOTE: formatPrice() is defined in config.js and uses CONFIG.currency settings.
// Do not redefine it here.

// Helper: render stars
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// Helper: get condition badge class
function getConditionClass(condition) {
  const map = {
    'Like New': 'badge-like-new',
    'Good': 'badge-good',
    'Fair': 'badge-fair'
  };
  return map[condition] || 'badge-good';
}

// Helper: calculate discount %
function getDiscountPercent(price, original) {
  return Math.round((1 - price / original) * 100);
}
