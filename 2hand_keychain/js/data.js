// =========================================
// KEY2HAND — Mock Product Data (Crochet Only)
// =========================================

const PRODUCTS = [
  {
    id: 1,
    name: "Móc khóa Bánh mì len đáng yêu",
    category: "Custom",
    condition: "Like New",
    price: 25000,
    originalPrice: 40000,
    images: ["assets/images/Móc khóa len bánh mì.jpg"],
    description: "Móc khóa hình ổ bánh mì được móc bằng len sợi cotton mềm mịn, tạo hình siêu dễ thương.",
    tags: ["crochet", "handmade", "food", "cute"],
    stock: 12,
    rating: 4.8,
    reviews: 6,
    dateAdded: "2026-06-23",
    featured: true
  },
  {
    id: 2,
    name: "Móc khóa Quả Cà chua len mọng nước",
    category: "Fruit",
    condition: "Like New",
    price: 20000,
    originalPrice: 35000,
    images: ["assets/images/Móc khóa len cà chua.jpg"],
    description: "Móc khóa quả cà chua len đỏ rực rỡ, điểm xuyết chiếc lá xanh nhỏ nhắn, mang lại may mắn.",
    tags: ["crochet", "fruit", "handmade"],
    stock: 15,
    rating: 4.7,
    reviews: 9,
    dateAdded: "2026-06-23",
    featured: false
  },
  {
    id: 3,
    name: "Móc khóa Chú Cá len tinh nghịch",
    category: "Animal",
    condition: "Like New",
    price: 30000,
    originalPrice: 45000,
    images: ["assets/images/Móc khóa len cá.jpg"],
    description: "Móc khóa chú cá nhỏ được phối màu sắc nổi bật, đường len chắc chắn, không bị xù lông.",
    tags: ["crochet", "animal", "fish", "handmade"],
    stock: 8,
    rating: 4.9,
    reviews: 11,
    dateAdded: "2026-06-23",
    featured: true
  },
  {
    id: 4,
    name: "Móc khóa Chú Gấu len má hồng",
    category: "Animal",
    condition: "Like New",
    price: 35000,
    originalPrice: 50000,
    images: ["assets/images/Móc khóa len gấu.jpg"],
    description: "Bé gấu len Amigurumi với đôi má hồng xinh xắn, phụ kiện tuyệt vời cho balo hoặc chìa khóa xe.",
    tags: ["crochet", "animal", "bear", "cute"],
    stock: 5,
    rating: 5.0,
    reviews: 14,
    dateAdded: "2026-06-23",
    featured: true
  },
  {
    id: 5,
    name: "Móc khóa Kem ốc quế len ngọt ngào",
    category: "Custom",
    condition: "Like New",
    price: 25000,
    originalPrice: 40000,
    images: ["assets/images/Móc khoa len kem.jpg"], // Giữ nguyên tên file không dấu của bạn
    description: "Ly kem ốc quế mát lạnh bằng len, không bao giờ tan chảy, nhìn là muốn ăn ngay!",
    tags: ["crochet", "handmade", "icecream", "sweet"],
    stock: 10,
    rating: 4.6,
    reviews: 4,
    dateAdded: "2026-06-23",
    featured: false
  },
  {
    id: 6,
    name: "Móc khóa Cây Nấm len nhỏ nhắn",
    category: "Custom",
    condition: "Like New",
    price: 22000,
    originalPrice: 35000,
    images: ["assets/images/Móc khóa len nấm.jpg"],
    description: "Cây nấm len nhỏ xinh độc đáo, phù hợp làm quà tặng cặp đôi hoặc nhóm bạn thân.",
    tags: ["crochet", "mushroom", "handmade"],
    stock: 20,
    rating: 4.8,
    reviews: 7,
    dateAdded: "2026-06-13",
    featured: false
  },
  {
    id: 7,
    name: "Móc khóa Ngôi sao len may mắn",
    category: "Custom",
    condition: "Like New",
    price: 20000,
    originalPrice: 30000,
    images: ["assets/images/Móc khóa len ngôi sao.jpg"],
    description: "Ngôi sao vàng 5 cánh bằng len mềm mại, mang lại năng lượng tích cực cho mỗi ngày xuống phố.",
    tags: ["crochet", "star", "handmade", "lucky"],
    stock: 25,
    rating: 4.9,
    reviews: 15,
    dateAdded: "2026-06-15",
    featured: true
  },
  {
    id: 8,
    name: "Móc khóa Quả Táo len đỏ",
    category: "Fruit",
    condition: "Like New",
    price: 25000,
    originalPrice: 40000,
    images: ["assets/images/Móc khóa len tóa.jpg"], // Giữ đúng tên file gốc 'tóa.jpg' của bạn tránh lệch link
    description: "Quả táo len căng mọng, móc thủ công tỉ mỉ từng mũi kim.",
    tags: ["crochet", "fruit", "apple"],
    stock: 9,
    rating: 4.7,
    reviews: 8,
    dateAdded: "2026-06-16",
    featured: false
  },
  {
    id: 9,
    name: "Móc khóa Chú Vịt len ngốc nghếch",
    category: "Animal",
    condition: "Good",
    price: 32000,
    originalPrice: 48000,
    images: ["assets/images/Móc khóa len vịt.jpg"],
    description: "Chú vịt len với chiếc mỏ mập mạp siêu tấu hài, bảo đảm nhìn là bật cười.",
    tags: ["crochet", "animal", "duck", "cute"],
    stock: 7,
    rating: 5.0,
    reviews: 19,
    dateAdded: "2026-06-17",
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