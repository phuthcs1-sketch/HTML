// =========================================
// KEY2HAND — Shop Page Logic
// Settings from CONFIG in config.js
// =========================================

const PAGE_SIZE = (typeof CONFIG !== 'undefined') ? CONFIG.shop.pageSize : 9;

let state = {
  search: '',
  categories: [],
  conditions: [],
  maxPrice: (typeof CONFIG !== 'undefined') ? CONFIG.shop.maxPriceFilter : 160000,
  sort: (typeof CONFIG !== 'undefined') ? CONFIG.shop.defaultSort : 'newest',
  activePill: 'All',
  page: 1
};

// ---- Filter & Sort products ----
function getFilteredProducts() {
  let list = [...PRODUCTS];

  // Pill category (takes priority over checkboxes if set)
  if (state.activePill !== 'All') {
    list = list.filter(p => p.category === state.activePill);
  } else if (state.categories.length > 0) {
    list = list.filter(p => state.categories.includes(p.category));
  }

  // Condition
  if (state.conditions.length > 0) {
    list = list.filter(p => state.conditions.includes(p.condition));
  }

  // Price
  list = list.filter(p => p.price <= state.maxPrice);

  // Search
  if (state.search.trim()) {
    const q = state.search.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q))
    );
  }

  // Sort
  switch (state.sort) {
    case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
    case 'discount':   list.sort((a, b) => (b.originalPrice - b.price) - (a.originalPrice - a.price)); break;
    default:           list.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  }

  return list;
}

// ---- Render ----
function render() {
  const filtered = getFilteredProducts();
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('result-count');
  const loadMoreWrap = document.getElementById('load-more-wrap');

  const visible = filtered.slice(0, state.page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  countEl.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results" style="grid-column:1/-1">
        <div class="no-results-emoji">🔍</div>
        <h3>No results found</h3>
        <p>Try adjusting your filters or search term.</p>
        <button class="btn btn-secondary" style="margin-top:16px" onclick="resetAll()">Clear Filters</button>
      </div>
    `;
    loadMoreWrap.style.display = 'none';
    return;
  }

  grid.innerHTML = visible.map(renderProductCard).join('');
  loadMoreWrap.style.display = hasMore ? 'block' : 'none';

  setTimeout(initScrollReveal, 50);
}

function resetAll() {
  state.search = '';
  state.categories = [];
  state.conditions = [];
  state.maxPrice = 160000;
  state.sort = 'newest';
  state.activePill = 'All';
  state.page = 1;

  document.getElementById('search-input').value = '';
  document.getElementById('sort-select').value = 'newest';
  document.getElementById('price-range').value = 160000;
  document.getElementById('price-range-val').textContent = '160.000 đ';
  document.getElementById('price-range').style.background = 'linear-gradient(to right, var(--primary) 0%, var(--primary) 100%, #E5E7EB 100%)';

  document.querySelectorAll('input[name="cat"], input[name="cond"]').forEach(cb => cb.checked = false);
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.toggle('active', p.dataset.cat === 'All'));

  render();
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  // Check URL params for category
  const params = new URLSearchParams(window.location.search);
  const urlCat = params.get('cat');
  if (urlCat) {
    state.activePill = urlCat;
    document.querySelectorAll('.cat-pill').forEach(p => {
      p.classList.toggle('active', p.dataset.cat === urlCat);
    });
  }

  render();

  // Search
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', () => {
    state.search = searchInput.value;
    state.page = 1;
    render();
  });

  // Sort
  document.getElementById('sort-select').addEventListener('change', (e) => {
    state.sort = e.target.value;
    state.page = 1;
    render();
  });

  // Price range
  const priceRange = document.getElementById('price-range');
  const priceVal = document.getElementById('price-range-val');
  priceRange.addEventListener('input', () => {
    state.maxPrice = parseInt(priceRange.value);
    priceVal.textContent = parseInt(priceRange.value).toLocaleString('vi-VN') + ' đ';
    // Update gradient fill
    const pct = (state.maxPrice / 160000) * 100;
    priceRange.style.background = `linear-gradient(to right, var(--primary) 0%, var(--primary) ${pct}%, #E5E7EB ${pct}%)`;
    state.page = 1;
    render();
  });

  // Category checkboxes
  document.querySelectorAll('input[name="cat"]').forEach(cb => {
    cb.addEventListener('change', () => {
      state.categories = [...document.querySelectorAll('input[name="cat"]:checked')].map(c => c.value);
      state.activePill = 'All';
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.toggle('active', p.dataset.cat === 'All'));
      state.page = 1;
      render();
    });
  });

  // Condition checkboxes
  document.querySelectorAll('input[name="cond"]').forEach(cb => {
    cb.addEventListener('change', () => {
      state.conditions = [...document.querySelectorAll('input[name="cond"]:checked')].map(c => c.value);
      state.page = 1;
      render();
    });
  });

  // Category pills
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      state.activePill = pill.dataset.cat;
      state.categories = [];
      document.querySelectorAll('input[name="cat"]').forEach(cb => cb.checked = false);
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.toggle('active', p === pill));
      state.page = 1;
      render();
    });
  });

  // Load more
  document.getElementById('load-more-btn').addEventListener('click', () => {
    state.page++;
    render();
    // Scroll to show new items
    const grid = document.getElementById('products-grid');
    const lastCard = grid.lastElementChild;
    if (lastCard) lastCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Reset filters
  document.getElementById('reset-filters-btn').addEventListener('click', resetAll);

  // Mobile filter toggle
  const filterToggle = document.getElementById('filter-toggle-btn');
  const filterSheet = document.getElementById('filter-sheet');
  const filterOverlay = document.getElementById('filter-overlay');

  if (filterToggle && filterSheet && filterOverlay) {
    filterToggle.addEventListener('click', () => {
      filterSheet.classList.add('open');
      filterOverlay.classList.add('visible');
    });

    filterOverlay.addEventListener('click', () => {
      filterSheet.classList.remove('open');
      filterOverlay.classList.remove('visible');
    });

    document.getElementById('close-filter-sheet')?.addEventListener('click', () => {
      filterSheet.classList.remove('open');
      filterOverlay.classList.remove('visible');
    });

    document.getElementById('apply-filter-btn')?.addEventListener('click', () => {
      state.categories = [...document.querySelectorAll('input[name="cat-m"]:checked')].map(c => c.value);
      state.conditions = [...document.querySelectorAll('input[name="cond-m"]:checked')].map(c => c.value);
      state.page = 1;
      filterSheet.classList.remove('open');
      filterOverlay.classList.remove('visible');
      render();
    });
  }
});
