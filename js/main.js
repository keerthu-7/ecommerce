
async function fetchFeaturedProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
  
     
      const popularProducts = products.filter(product => product.rating.rate >= 4.0);
  
   
      displayFeaturedProducts(popularProducts.slice(0, 4));
  
      
      $('.featured-products-slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true, 
        prevArrow: '<button class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
        nextArrow: '<button class="slick-next"><i class="fa fa-chevron-right"></i></button>',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              arrows: true 
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              arrows: true 
            }
          }
        ]
      });
  
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  

  function displayFeaturedProducts(products) {
    const productContainer = document.querySelector('.featured-products-slider');
    
    
    productContainer.innerHTML = '';
  
    products.forEach(product => {
      const truncatedTitle = product.title.length > 20 ? product.title.substring(0, 20) + '...' : product.title;
      productContainer.innerHTML += `
        <div class="col-4">
        <a href="product_details.html?id=${product.id}">
          <img src="${product.image}" alt="${product.title}">
          <div class="product-details">
            <h4>${truncatedTitle}</h4>
            <div class="rating">
              ${generateStars(product.rating.rate)}
            </div>
            <p>$${product.price}</p>
          </div>
           </a>
        </div>
      `;
    });
  }
  
  
  
  
  function generateStars(rate) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += `<i class="fa ${i <= rate ? 'fa-star' : 'fa-star-o'}"></i>`;
    }
    return stars;
  }
  
 
  window.onload = fetchFeaturedProducts;
  

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
