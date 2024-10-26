let products = []; 

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
    displayProducts(products); 
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

function displayProducts(productsToDisplay) {
  const container = document.getElementById('products-container');
  container.innerHTML = ''; 

  productsToDisplay.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
    <div class="img-container">
      <a href="product_details.html?id=${product.id}">
        <img src="${product.image}" alt="${product.title}">
      </a>
    </div>
    <h4>${product.title}</h4>
    <div class="rating">
      ${getRatingStars(product.rating.rate)}
    </div>
    <p class="price">$${product.price}</p>
    <p class="category">${product.category}</p>
  `;

  container.appendChild(productCard);
});
}

function getRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  return (
    '<i class="fa fa-star"></i>'.repeat(fullStars) +
    '<i class="fa fa-star-half-o"></i>'.repeat(halfStar) +
    '<i class="fa fa-star-o"></i>'.repeat(5 - fullStars - halfStar)
  );
}


function filterProducts() {
  const searchQuery = document.getElementById('search-bar').value.toLowerCase();
  const selectedCategory = document.getElementById('category-filter').value;
  const selectedPriceRange = document.getElementById('price-range').value;

  let filteredProducts = products;

  
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchQuery)
    );
  }

 
  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter(product =>
      product.category === selectedCategory
    );
  }

  if (selectedPriceRange !== 'all') {
    const [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);
    filteredProducts = filteredProducts.filter(product =>
      product.price >= minPrice && product.price <= maxPrice
    );
  }

  displayProducts(filteredProducts); 
}

window.onload = fetchProducts;

document.querySelector('.menu-icon').addEventListener('click', function() {
  const navMenu = document.querySelector('nav ul');
  navMenu.classList.toggle('expanded');
});

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
