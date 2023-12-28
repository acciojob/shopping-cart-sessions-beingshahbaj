const products = [
      { id: 1, name: "Product 1", price: 10 },
      { id: 2, name: "Product 2", price: 20 },
      { id: 3, name: "Product 3", price: 30 },
      { id: 4, name: "Product 4", price: 40 },
      { id: 5, name: "Product 5", price: 50 },
    ];

    // DOM elements
    const productList = document.getElementById("product-list");
    const cartList = document.getElementById("cart-list");

    // Render product list
    function renderProducts() {
      products.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
        productList.appendChild(li);
      });
      // Add event listener to each "Add to Cart" button
      const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
      addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
          const productId = event.target.dataset.id;
          addToCart(productId);
          renderCart();
        });
      });
    }

    // Render cart list
    function renderCart() {
      // Clear the cart list before rendering
      cartList.innerHTML = "";
      // Retrieve cart data from session storage
      const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];
      // Render each item in the cart
      cartData.forEach((cartItem) => {
        const li = document.createElement("li");
        li.innerHTML = `${cartItem.name} - $${cartItem.price} <button class="remove-from-cart-btn" data-id="${cartItem.id}">Remove</button>`;
        cartList.appendChild(li);
      });
      // Add event listener to each "Remove" button in the cart
      const removeFromCartButtons = document.querySelectorAll(".remove-from-cart-btn");
      removeFromCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
          const productId = event.target.dataset.id;
          removeFromCart(productId);
          renderCart();
        });
      });
    }

    // Add item to cart
    function addToCart(productId) {
      const selectedProduct = products.find(product => product.id == productId);
      if (selectedProduct) {
        const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];
        cartData.push(selectedProduct);
        sessionStorage.setItem("cart", JSON.stringify(cartData));
      }
    }

    // Remove item from cart
    function removeFromCart(productId) {
      const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];
      const updatedCart = cartData.filter(item => item.id != productId);
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    // Clear cart
    function clearCart() {
      sessionStorage.removeItem("cart");
      renderCart();
    }

    // Initial render
    renderProducts();
    renderCart();