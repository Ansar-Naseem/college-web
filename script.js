// Elements for modal functionality
const loginBtn = document.getElementById('loginBtn');
const closeBtn = document.getElementById('closeBtn');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const signupLink = document.getElementById('signupLink');

// Open modal
loginBtn.addEventListener('click', () => {
  loginModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  loginModal.setAttribute('aria-hidden', 'false');
});

// Close modal via X button
closeBtn.addEventListener('click', () => {
  loginModal.style.display = 'none';
  document.body.style.overflow = 'auto';
  loginModal.setAttribute('aria-hidden', 'true');
});

// Close modal if clicked outside the modal box
window.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    loginModal.setAttribute('aria-hidden', 'true');
  }
});

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email && password) {
    alert('Login successful!');
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    loginForm.reset();
    loginModal.setAttribute('aria-hidden', 'true');
  } else {
    alert('Please fill in all fields');
  }
});

// Fake sign-up handler
signupLink.addEventListener('click', (e) => {
  e.preventDefault();
  alert('Sign up feature coming soon!');
});

// Scroll left/right in product card section
function scrollHero(direction, button) {
  const scrollContainer = button.closest(".hero-scroll-container").querySelector(".hero-scroll");
  const cardWidth = scrollContainer.querySelector(".hero-card").offsetWidth + 24; // Includes gap
  scrollContainer.scrollBy({
    left: direction * cardWidth,
    behavior: 'smooth'
  });
}

// -------------------------------------------
// 🛒 Add to Cart Feature
// -------------------------------------------

const products = [
      { id: 1, name: "Kurti Style A", image: "1.jpg", desc: "Elegant cotton kurti for everyday wear." },
      { id: 2, name: "Kurti Style B", image: "2.jpg", desc: "Perfect for festivals and special occasions." },
      { id: 3, name: "Kurti Style C", image: "3.jpg", desc: "Hand-embroidered with fine detailing." },
      { id: 4, name: "Kurti Style D", image: "4.jpg", desc: "Comfort meets style in this modern design." },
      { id: 5, name: "Kurti Style E", image: "5.jpg", desc: "Simple and sleek for casual outings." },
      { id: 6, name: "Kurti Style F", image: "6.jpg", desc: "A touch of elegance in every stitch." },
      { id: 7, name: "Kurti Style G", image: "7.jpg", desc: "Perfect for any season." }
    ];

    let cart = [];

    const cartCountSpan = document.getElementById('cartCount');
    const productList = document.getElementById('productList');
    const cartPanel = document.getElementById('cartPanel');
    const cartItemsDiv = document.getElementById('cartItems');
    const emptyCartMsg = document.getElementById('emptyCartMsg');
    const toggleCartBtn = document.getElementById('toggleCartBtn');

    // Render products on page
    function renderProducts() {
      products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('hero-card');

        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.desc}</p>
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productList.appendChild(card);
      });
    }

    // Update cart count display
    function updateCartCount() {
      cartCountSpan.textContent = cart.length;
    }

    // Render cart items in the cart panel
    function renderCart() {
      cartItemsDiv.innerHTML = '';

      if (cart.length === 0) {
        emptyCartMsg.style.display = 'block';
        return;
      } else {
        emptyCartMsg.style.display = 'none';
      }

      cart.forEach((product, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        itemDiv.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="cart-item-info">
            <h4>${product.name}</h4>
            <p>${product.desc}</p>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItemsDiv.appendChild(itemDiv);
      });
    }

    // Add product to cart by ID
    function addToCart(productId) {
      const product = products.find(p => p.id === productId);
      if (product) {
        cart.push(product);
        updateCartCount();
        renderCart();
        alert(`${product.name} added to cart!`);
      }
    }

    // Remove product from cart by index
    function removeFromCart(index) {
      if (index > -1 && index < cart.length) {
        const removed = cart.splice(index, 1)[0];
        updateCartCount();
        renderCart();
        alert(`${removed.name} removed from cart.`);
      }
    }

    // Toggle cart panel visibility
    toggleCartBtn.addEventListener('click', () => {
      if (cartPanel.style.display === 'none' || cartPanel.style.display === '') {
        cartPanel.style.display = 'block';
      } else {
        cartPanel.style.display = 'none';
      }
    });

    // Initialize
    renderProducts();
    updateCartCount();


// men's clothes script

const menProducts = [
  { id: 101, name: "Kurta Style A", image: "8.jpg", desc: "Classic cotton kurta for daily comfort." },
  { id: 102, name: "Kurta Style B", image: "9.jpg", desc: "Ideal for weddings and gatherings." },
  { id: 103, name: "Kurta Style C", image: "10.jpg", desc: "Minimalist design with modern cuts." },
  { id: 104, name: "Kurta Style D", image: "11.jpg", desc: "Tradition blended with trend." },
  { id: 105, name: "Kurta Style E", image: "12.jpg", desc: "Effortless style for all occasions." },
  { id: 106, name: "Kurta Style F", image: "13.jpg", desc: "Lightweight and breathable fabric." },
  { id: 107, name: "Kurta Style G", image: "14.jpg", desc: "Sharp looks with soft texture." }
];

// Separate cart functions not needed if sharing cart, but rendering is separate
const productListMen = document.getElementById('productListMen');

function renderMenProducts() {
  menProducts.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('hero-card');

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productListMen.appendChild(card);
  });
}

// Update addToCart to search both arrays
function addToCart(productId) {
  const product =
    products.find(p => p.id === productId) ||
    menProducts.find(p => p.id === productId);

  if (product) {
    cart.push(product);
    updateCartCount();
    renderCart();
    alert(`${product.name} added to cart!`);
  }
}

// Initialize men’s products too
renderMenProducts();

  