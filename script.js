$(document).ready(function () {
  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});
$(".menu-items a").click(function () {
  $("#checkbox").prop("checked", false);
});
function displayCart() {
    const cartItem = JSON.parse(localStorage.getItem('cart'));
    const cartItemsContainer = document.getElementById('cartItems');
    if (cartItem) {
        cartItemsContainer.innerHTML = `
            <div class="item">
                <img src="${cartItem.imageUrl}" alt="${cartItem.name}" style="width:100px;">
                <div>
                    <h3>${cartItem.name} - ₹${cartItem.price}</h3>
                    <p>Rating: ${cartItem.rating} | ${cartItem.reviews} reviews</p>
                    <button onclick="removeFromCart()" class="remove-btn">Remove from Cart</button>
                </div>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    }
}
function removeFromCart() {
    localStorage.removeItem('cart');
    displayCart(); 
}
function addToCart(name, price, imageUrl, rating, reviews) {
    const productDetails = {
        name: name,
        price: price,
        imageUrl: imageUrl,
        rating: rating,
        reviews: reviews
    };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productDetails);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
}
function navigateToSection() {
    const input = document.querySelector('.search-bar input[type="text"]');
    const selectedOption = input.value.toLowerCase(); // Convert to lowercase for case-insensitive matching
    let targetElement = null;
    if (selectedOption.startsWith('#')) {
        targetElement = document.querySelector(selectedOption);
    }
    if (!targetElement) {
        targetElement = document.querySelector(selectedOption);
    }
    if (!targetElement && selectedOption.startsWith('h')) {
        const headings = document.querySelectorAll(selectedOption);
        if (headings.length > 0) {
            targetElement = headings[0];
        }
    }
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error('Element not found');
    }
}
function toggleWishlistColor(button) {
    const productContainer = button.closest('.best-p1');
    const productName = productContainer.querySelector('.name-of-p p').innerText;
    const productPrice = productName.split(' - ')[1];
    const productImage = productContainer.querySelector('img').src;
    const productRating = productContainer.querySelector('.rating .reviews p').innerText;
    console.log('productName:', productName);
    console.log('productImage:', productImage);
    console.log('productRating:', productRating);
    const product = {
        name: productName,
        image: productImage,
        rating: productRating
    };
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isProductInWishlist = wishlist.some(item => item.name === productName);
    if (isProductInWishlist) {
        button.classList.remove('clicked');
        button.style.color = 'black';
        removeFromWishlist(product);
    } else {
        button.classList.add('clicked');
        button.style.color = 'crimson';
        addToWishlist(product);
    }
}
function addToWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
function removeFromWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item.name !== product.name);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
document.addEventListener('DOMContentLoaded', function () {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistContainer = document.querySelector('.wishlist-items');
    wishlist.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
            <div class="wishlist-item">
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h3>${product.name}</h3>
                    <p>${product.rating}</p>
                </div>
            </div>
        `;
        wishlistContainer.appendChild(productElement);
    });
});
