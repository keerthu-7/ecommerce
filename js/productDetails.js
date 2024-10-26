
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (!productId) {
  alert("No product selected. Please select a product.");
  window.location.href = 'products.html'; 
}

async function fetchProductDetails() {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await response.json();

   
    document.getElementById('ProductImg').src = product.image;
    document.querySelector('.col-2 h1').innerText = product.title;
    document.querySelector('#product-price').innerText = `$${product.price}`;
    document.getElementById('product-description').innerText = product.description;

    const smallImages = document.querySelectorAll('.small-img');
    if (smallImages.length > 0) {
      smallImages[0].src = product.image; 
     
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}


fetchProductDetails();

function addProductToCart() {
  const product = {
    id: productId, 
    image: document.getElementById('ProductImg').src,
    title: document.querySelector('.col-2 h1').innerText,
    price: parseFloat(document.querySelector('#product-price').innerText.replace('$', '')),
    quantity: parseInt(document.getElementById('product-quantity').value) || 1,
  };

  
  console.log('Adding product to cart:', product); 
  addToCart(product);
  alert("Product added to cart!");
}

document.getElementById('add-to-cart-btn').addEventListener('click', addProductToCart);



