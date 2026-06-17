// =========================================
// KEY2HAND — Global Utilities (main.js)
// =========================================

// ---- Navbar Scroll Effect ----
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mark active link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mobile drawer
  const menuBtn = document.querySelector('.nav-menu-btn');
  const drawer = document.querySelector('.nav-drawer');
  const overlay = document.querySelector('.nav-drawer-overlay');

  if (menuBtn && drawer && overlay) {
    menuBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      overlay.classList.add('visible');
      document.body.style.overflow = 'hidden';
    });

    const closeDrawer = () => {
      drawer.classList.remove('open');
      overlay.classList.remove('visible');
      document.body.style.overflow = '';
    };

    overlay.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
  }
}

// ---- Toast Notification ----
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${type === 'success' ? '✓' : '✕'}</div>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3000);
}

// ---- Scroll Reveal ----
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

// ---- Render Product Card ----
function renderProductCard(product) {
  const discount = getDiscountPercent(product.price, product.originalPrice);
  const condClass = getConditionClass(product.condition);
  const wished = isWishlisted(product.id);

  return `
    <div class="product-card reveal" data-product-id="${product.id}">
      <div class="card-image-wrap">
        <a href="product.html?id=${product.id}">
          <img
            src="${product.images[0]}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.src='https://picsum.photos/seed/key${product.id}/400/400'"
          >
        </a>
        <div class="card-badges">
          <span class="badge ${condClass}">${product.condition}</span>
          ${product.stock === 1 ? '<span class="badge badge-sold" style="background:rgba(251,146,60,.15);color:var(--orange);border-color:rgba(251,146,60,.25)">Last 1!</span>' : ''}
        </div>
        <button
          class="card-wishlist ${wished ? 'active' : ''}"
          aria-label="Toggle wishlist"
          onclick="handleWishlist(event, ${product.id}, this)"
        >
          ${wished ? '♥' : '♡'}
        </button>
        <div class="card-quick-add">
          <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id}); event.stopPropagation();">
            🛒 Add to Cart
          </button>
        </div>
      </div>
      <div class="card-body">
        <span class="card-category">${product.category}</span>
        <a href="product.html?id=${product.id}" class="card-name">${product.name}</a>
        <div class="card-rating">
          <span class="stars">${'★'.repeat(Math.round(product.rating))}</span>
          <span style="color:var(--text); font-size:0.8rem; font-weight:600">${product.rating}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="card-price">
          <span class="price-current">${formatPrice(product.price)}</span>
          <span class="price-original">${formatPrice(product.originalPrice)}</span>
          <span class="price-discount">-${discount}%</span>
        </div>
      </div>
    </div>
  `;
}

// ---- Wishlist handler ----
function handleWishlist(event, productId, btn) {
  event.preventDefault();
  const added = toggleWishlist(productId);
  btn.classList.toggle('active', added);
  btn.textContent = added ? '♥' : '♡';
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  updateCartBadge();
});
