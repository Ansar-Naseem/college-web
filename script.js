// Elements for modal functionality
const loginBtn = document.getElementById('loginBtn');
const closeBtn = document.getElementById('closeBtn');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const signupLink = document.getElementById('signupLink');

// Modal: Open
loginBtn.addEventListener('click', () => {
  loginModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  loginModal.setAttribute('aria-hidden', 'false');
});

// Modal: Close via X
closeBtn.addEventListener('click', () => {
  loginModal.style.display = 'none';
  document.body.style.overflow = 'auto';
  loginModal.setAttribute('aria-hidden', 'true');
});

// Modal: Close when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    loginModal.setAttribute('aria-hidden', 'true');
  }
});

// Handle login form
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }

  alert('Login successful!');
  loginModal.style.display = 'none';
  document.body.style.overflow = 'auto';
  loginForm.reset();
  loginModal.setAttribute('aria-hidden', 'true');

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json();
  alert(result.message);
});

// Product scroll (carousel)
function scrollHero(direction, button) {
  const scrollContainer = button.closest(".hero-scroll-container").querySelector(".hero-scroll");
  const cardWidth = scrollContainer.querySelector(".hero-card").offsetWidth + 24;
  scrollContainer.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}

// Product data with price
const products = [
  { id: 1, name: "Kurti Style A", image: "4.jpg", desc: "Elegant design with traditional vibes.", price: 1099 },
  { id: 2, name: "Kurti Style B", image: "34.jpg", desc: "Vibrant colors to brighten your day.", price: 1399 },
  { id: 3, name: "Cotton Kurti", image: "6.jpg", desc: "Soft cotton fabric for all-day comfort.", price: 1299 },
  { id: 4, name: "Kurti Style D", image: "25.jpg", desc: "Breathable and stylish for summers.", price: 1199 },
  { id: 5, name: "Kurti Style E", image: "27.jpg", desc: "Subtle charm with modern tailoring.", price: 1499 },
  { id: 6, name: "Kurti Style F", image: "35.jpg", desc: "Graceful look with detailed patterns.", price: 1399 },
  { id: 7, name: "Kurti Style G", image: "12.jpg", desc: "Lightweight and easy to wear daily.", price: 1199 },
  { id: 8, name: "Kurti Style G", image: "13.jpg", desc: "Chic and comfy for everyday fashion.", price: 1299 },
  { id: 9, name: "Kurti Style G", image: "14.jpg", desc: "Trendy piece to enhance your style.", price: 1499 }
];

const menProducts = [
  { id: 101, name: "Kurta Style A", image: "44.jpg", desc: "Classic cotton kurta for daily comfort.", price: 899 },
  { id: 102, name: "Kurta Style B", image: "36.jpg", desc: "Ideal for weddings and gatherings.", price: 1299 },
  { id: 103, name: "Kurta Style C", image: "40.jpg", desc: "Minimalist design with modern cuts.", price: 999 },
  { id: 104, name: "Kurta Style D", image: "41.jpg", desc: "Tradition blended with trend.", price: 1199 },
  { id: 105, name: "Kurta Style E", image: "42.jpg", desc: "Effortless style for all occasions.", price: 1099 },
  { id: 106, name: "Kurta Style F", image: "43.jpg", desc: "Lightweight and breathable fabric.", price: 849 },
  { id: 107, name: "Kurta Style G", image: "21.jpg", desc: "Sharp looks with soft texture.", price: 949 },
  { id: 108, name: "Kurta Style G", image: "22.jpg", desc: "Sharp looks with soft texture.", price: 949 },
  { id: 109, name: "Kurta Style G", image: "23.jpg", desc: "Sharp looks with soft texture.", price: 949 }
];

let cart = [];

const cartCountSpan = document.getElementById('cartCount');
const productList = document.getElementById('productList');
const productListMen = document.getElementById('productListMen');
const cartPanel = document.getElementById('cartPanel');
const cartItemsDiv = document.getElementById('cartItems');
const emptyCartMsg = document.getElementById('emptyCartMsg');
const toggleCartBtn = document.getElementById('toggleCartBtn');

// Render women's products
function renderProducts() {
  renderProductArray(products, productList);

}

// Render men's products
function renderMenProducts() {
  renderProductArray(menProducts, productListMen);
}

// Update cart count display
function updateCartCount() {
  cartCountSpan.textContent = cart.length;
}

// Render cart panel
function renderCart() {
  cartItemsDiv.innerHTML = '';
  if (cart.length === 0) {
    emptyCartMsg.style.display = 'block';
    return;
  }
  emptyCartMsg.style.display = 'none';

  cart.forEach((product, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="cart-item-info">
        <h4>${product.name}</h4>
        <p>${product.desc}</p>
        <p><strong>₹${product.price}</strong></p>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });
}

// Add to cart (shared between men & women)
function addToCart(productId) {
  const product = products.find(p => p.id === productId) || menProducts.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    updateCartCount();
    renderCart();
    alert(`${product.name} added to cart!`);
  }
}

// Remove from cart
function removeFromCart(index) {
  const removed = cart.splice(index, 1)[0];
  updateCartCount();
  renderCart();
  alert(`${removed.name} removed from cart.`);
}

// Toggle cart panel
toggleCartBtn.addEventListener('click', () => {
  cartPanel.style.display = (cartPanel.style.display === 'block') ? 'none' : 'block';
});

// Fake signup link handler
signupLink.addEventListener('click', (e) => {
  e.preventDefault();
  alert('Sign up feature coming soon!');
});

// Initialize
renderProducts();
renderMenProducts();
updateCartCount();


const searchInput = document.getElementById('searchInput');

// Filter products when typing in search box
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  filterAndRenderProducts(query);
});

// Helper to render filtered results
function filterAndRenderProducts(query) {
  productList.innerHTML = '';
  productListMen.innerHTML = '';

  const filteredWomen = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query)
  );

  const filteredMen = menProducts.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query)
  );

  if (filteredWomen.length === 0 && filteredMen.length === 0) {
    productList.innerHTML = `<p>No items found for "<strong>${query}</strong>"</p>`;
    return;
  }

  renderProductArray(filteredWomen, productList);
  renderProductArray(filteredMen, productListMen);
}

// Helper: Render any list of products into a container
function renderProductArray(arr, container) {
  arr.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('hero-card');
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">Price: ₹${product.price}</p>
      <p>${product.desc}</p>
      <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}
