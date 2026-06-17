// =========================================
// KEY2HAND — Cart Logic (localStorage)
// Shipping values come from CONFIG in config.js
// =========================================

const CART_KEY = 'key2hand_cart';
const WISHLIST_KEY = 'key2hand_wishlist';

// ---- Cart ----
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex(item => item.productId === productId);
  const product = getProductById(productId);
  if (!product) return;

  if (idx > -1) {
    cart[idx].qty = Math.min(cart[idx].qty + qty, product.stock);
  } else {
    cart.push({ productId, qty: Math.min(qty, product.stock) });
  }
  saveCart(cart);
  showToast(`🛒 "${product.name}" added to cart!`, 'success');
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.productId !== productId);
  saveCart(cart);
}

function updateCartQty(productId, delta) {
  const cart = getCart();
  const idx = cart.findIndex(item => item.productId === productId);
  if (idx === -1) return;
  const product = getProductById(productId);
  cart[idx].qty = Math.max(1, Math.min(cart[idx].qty + delta, product.stock));
  saveCart(cart);
}

function getCartItems() {
  const cart = getCart();
  return cart.map(item => ({
    ...item,
    product: getProductById(item.productId)
  })).filter(item => item.product);
}

function getCartSubtotal() {
  return getCartItems().reduce((sum, item) => sum + item.product.price * item.qty, 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

// ---- Wishlist ----
function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch { return []; }
}

function toggleWishlist(productId) {
  const list = getWishlist();
  const idx = list.indexOf(productId);
  if (idx > -1) {
    list.splice(idx, 1);
  } else {
    list.push(productId);
    const product = getProductById(productId);
    if (product) showToast(`💜 "${product.name}" saved to wishlist!`, 'success');
  }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  return idx === -1; // true if added
}

function isWishlisted(productId) {
  return getWishlist().includes(productId);
}

// ---- Badge ----
function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
  });
}
