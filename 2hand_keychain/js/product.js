// =========================================
// KEY2HAND — Product Detail Page
// =========================================

let currentProduct = null;
let currentQty = 1;

function renderProductPage(product) {
  currentProduct = product;
  const discount = getDiscountPercent(product.price, product.originalPrice);
  const condClass = getConditionClass(product.condition);

  document.title = `${product.name} – Key2hand`;

  document.getElementById('product-container').innerHTML = `
    <div class="breadcrumb" style="margin-bottom:24px">
      <a href="index.html">Home</a>
      <span class="sep">/</span>
      <a href="shop.html">Shop</a>
      <span class="sep">/</span>
      <a href="shop.html?cat=${product.category}">${product.category}</a>
      <span class="sep">/</span>
      <span style="color:var(--text)">${product.name}</span>
    </div>

    <div class="product-layout">
      <!-- Gallery -->
      <div>
        <div class="gallery-main">
          <img id="main-img" src="${product.images[0]}" alt="${product.name}"
            onerror="this.src='https://picsum.photos/seed/key${product.id}/600/600'">
        </div>
        ${product.images.length > 1 ? `
        <div class="gallery-thumbs">
          ${product.images.map((img, i) => `
            <div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="switchImage('${img}', this)">
              <img src="${img}" alt="View ${i+1}"
                onerror="this.src='https://picsum.photos/seed/key${product.id}v${i}/300/300'">
            </div>
          `).join('')}
        </div>` : ''}
      </div>

      <!-- Info -->
      <div>
        <div class="product-category">${product.category}</div>
        <h1 class="product-title">${product.name}</h1>

        <div class="product-rating-row">
          <span class="stars">${'★'.repeat(Math.round(product.rating))}</span>
          <span style="font-weight:600">${product.rating}</span>
          <span style="color:var(--text-muted)">(${product.reviews} reviews)</span>
        </div>

        <div class="product-price-row">
          <span class="product-price-main">${formatPrice(product.price)}</span>
          <span class="product-price-orig">${formatPrice(product.originalPrice)}</span>
          <span class="product-save">Save ${discount}%</span>
        </div>

        <div class="product-meta">
          <span class="badge ${condClass}">${product.condition}</span>
          ${product.stock <= 2 ? `<span class="badge badge-fair">Only ${product.stock} left</span>` : ''}
        </div>

        <p class="product-desc">${product.description}</p>

        <div class="product-stock ${product.stock <= 2 ? 'low' : ''}">
          ${product.stock <= 2
            ? `⚠️ Only ${product.stock} in stock — order soon!`
            : `✅ In stock (${product.stock} available)`}
        </div>

        <div class="add-row">
          <div class="qty-stepper">
            <button class="qty-btn" id="qty-minus" onclick="changeQty(-1)">−</button>
            <span class="qty-value" id="qty-display">1</span>
            <button class="qty-btn" id="qty-plus" onclick="changeQty(1)">+</button>
          </div>
          <button class="btn btn-primary" onclick="handleAddToCart()">🛒 Add to Cart</button>
          <button class="btn btn-secondary" id="wishlist-btn" onclick="handleWishlistToggle()" style="padding:10px 14px">
            ${isWishlisted(product.id) ? '♥' : '♡'}
          </button>
        </div>

        <div class="tags-wrap" style="margin-bottom:20px">
          ${product.tags.map(t => `<span class="tag-chip">#${t}</span>`).join('')}
        </div>

        <div class="divider"></div>

        <div class="product-info-list">
          <div class="product-info-item"><span>📦</span> Ships within 1–2 business days. Bubble-wrapped.</div>
          <div class="product-info-item"><span>↩️</span> Contact within 3 days if item doesn't match description.</div>
          <div class="product-info-item"><span>💬</span> Questions? Message on Zalo or Instagram.</div>
        </div>
      </div>
    </div>
  `;

  // Related products
  const related = getRelatedProducts(product, 4);
  const relSection = document.getElementById('related-section');
  if (related.length > 0) {
    relSection.style.display = 'block';
    document.getElementById('related-grid').innerHTML = related.map(renderProductCard).join('');
    setTimeout(initScrollReveal, 50);
  }

  updateQtyButtons();
}

function switchImage(src, thumbEl) {
  const mainImg = document.getElementById('main-img');
  mainImg.style.opacity = '0';
  setTimeout(() => { mainImg.src = src; mainImg.style.opacity = '1'; }, 150);
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
}

function changeQty(delta) {
  if (!currentProduct) return;
  currentQty = Math.max(1, Math.min(currentQty + delta, currentProduct.stock));
  document.getElementById('qty-display').textContent = currentQty;
  updateQtyButtons();
}

function updateQtyButtons() {
  if (!currentProduct) return;
  document.getElementById('qty-minus').disabled = currentQty <= 1;
  document.getElementById('qty-plus').disabled = currentQty >= currentProduct.stock;
}

function handleAddToCart() {
  if (currentProduct) addToCart(currentProduct.id, currentQty);
}

function handleWishlistToggle() {
  if (!currentProduct) return;
  const added = toggleWishlist(currentProduct.id);
  document.getElementById('wishlist-btn').textContent = added ? '♥' : '♡';
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get('id'));

  if (!product) {
    document.getElementById('product-container').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">😢</div>
        <h3>Product Not Found</h3>
        <p>This item may have been sold or removed.</p>
        <a href="shop.html" class="btn btn-primary" style="margin-top:16px">Browse Shop</a>
      </div>
    `;
    return;
  }

  renderProductPage(product);
});
