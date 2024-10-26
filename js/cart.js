
function getCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart;
}

function saveCartItems(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCartItems();
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  console.log('Cart after adding product:', cart); // Debugging line
  saveCartItems(cart);
}


function removeFromCart(productId) {
  console.log(`Attempting to remove product with ID: ${productId}`);
  let cart = getCartItems();
  const initialLength = cart.length;

  cart = cart.filter(item => item.id !== String(productId));

  const finalLength = cart.length;

  if (finalLength < initialLength) {
    console.log('Product removed successfully.');
  } else {
    console.warn('Product not found or removal failed.');
    console.log('Attempted Product ID:', productId);
    console.log('Product IDs in Cart:', cart.map(item => item.id));
  }

  saveCartItems(cart);
  renderCartItems();
}



function renderCartItems() {
  const cart = getCartItems();
  const cartContainer = document.querySelector('.cart-page table tbody');
  const totalPriceContainer = document.querySelector('.total-price table');

  cartContainer.innerHTML = '';
  let subtotal = 0;

  cart.forEach(product => {
    const productSubtotal = product.price * product.quantity;
    subtotal += productSubtotal;

    cartContainer.innerHTML += `
      <tr>
        <td>
          <div class="cart-info">
            <img src="${product.image}" alt="${product.title}">
            <div>
              <p>${product.title}</p>
              <small>Price: $${product.price}</small>
              <br>
              <a href="#" class="remove-link" data-id="${product.id}">Remove</a>
            </div>
          </div>
        </td>
        <td><input type="number" value="${product.quantity}" min="1" onchange="updateQuantity(${product.id}, this.value)"></td>
        <td>$${productSubtotal.toFixed(2)}</td>
      </tr>
    `;
  });


  const tax = subtotal * 0.1; 
  const total = subtotal + tax;
  totalPriceContainer.innerHTML = `
    <tr>
      <td>Subtotal</td>
      <td>$${subtotal.toFixed(2)}</td>
    </tr>
    <tr>
      <td>Tax</td>
      <td>$${tax.toFixed(2)}</td>
    </tr>
    <tr>
      <td>Total</td>
      <td>$${total.toFixed(2)}</td>
    </tr>
  `;

  attachRemoveListeners();
}

function attachRemoveListeners() {
  const removeLinks = document.querySelectorAll('.remove-link');
  removeLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const productId = parseInt(this.getAttribute('data-id'));
      removeFromCart(productId);
    });
  });
}


function updateQuantity(productId, newQuantity) {
  const cart = getCartItems();
  const product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity = parseInt(newQuantity);
    if (product.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCartItems(cart);
      renderCartItems();
    }
  }
}


window.onload = function() {
  renderCartItems();
};

const themeToggle = document.getElementById('theme-toggle');


if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.innerText = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    themeToggle.innerText = 'Light Mode';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggle.innerText = 'Dark Mode';
  }
});
