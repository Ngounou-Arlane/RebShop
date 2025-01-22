document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const navbarNav = document.getElementById('navbarNav');
            if (navbarNav) {
                navbarNav.classList.toggle('show');
            }
        });
    }
});

    // Language Toggle
    document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('toggleLanguage').addEventListener('click', (e) => {
        const btn = e.target;
        btn.textContent = btn.textContent === 'EN' ? 'FR' : 'EN';
    });
})
    // Cart Modal Hover Effect
    document.getElementById('cart-icon').addEventListener('mouseover', () => {
        document.getElementById('cart-modal').classList.add('show');
    });

    document.getElementById('cart-icon').addEventListener('mouseout', () => {
        document.getElementById('cart-modal').classList.remove('show');
    });

    // Camera Icon for Search
    document.getElementById('cameraSearch').addEventListener('click', () => {
        alert("Camera search coming soon! Jusqu'a tu teste aussi que si xa donne tu vas faire comment?");
    });

    const priceRange = document.getElementById('priceRange');
    const rangeValue = document.getElementById('rangeValue');

    // Update the displayed value when the range input changes
    priceRange.addEventListener('input', function() {
        rangeValue.textContent = 'Current Price: ' + priceRange.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' XAF';
    });

        document.addEventListener("DOMContentLoaded", () => {
            const cartPanel = document.getElementById("shopping-cart-panel");
            const cartIcon = document.getElementById("cart-icon");
            const closeCart = document.getElementById("close-cart");
            const exitCart = document.getElementById("exit");

            // Open the cart panel
            cartIcon.addEventListener("click", () => {
                cartPanel.classList.add("active");
                fetchcart();
            });

            // Close the cart panel
            closeCart.addEventListener("click", () => {
                cartPanel.classList.remove("active");
            });
            exitCart.addEventListener("click", () => {
                cartPanel.classList.remove("active");
            });
        });

// AJAX Implementation

document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault(); 
        document.getElementById('searchButton').addEventListener('click', function() {
            const query = document.getElementById('searchInput').value;
            // const category = document.getElementById('categorySelect').value;
            // const color = document.getElementById('colorSelect').value;
            // const type = document.getElementById('typeSelect').value;
       
            var xhr = new XMLHttpRequest();
            xhr.open("GET", `index.php?action=search&query=${query}`, true);
          
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) { 
                    if (xhr.status === 200) { 
                        var products = JSON.parse(xhr.responseText);
                        updateProductUI(products);
                     
                    } else {
                        console.error("Error: " + xhr.statusText);
                    }
                }
            };
            
            xhr.send();
            
        });

    });


    

    document.getElementById('applyFilters').addEventListener('click', function() {
        const priceRange = document.getElementById('rangeValue').innerHTML;
        const category = document.getElementById('category').value;
        const type = document.getElementById('type').value;
        const color = document.getElementById('color').value;

        // Fetch products with filters
        fetchFilteredProducts(priceRange, category, type, color);
    });
    
    function fetchFilteredProducts(priceRange, category, type, color) {
        const xhr = new XMLHttpRequest();
        const url = `index.php?action=search&query=${encodeURIComponent('')}&priceRange=${encodeURIComponent(priceRange)}&category=${encodeURIComponent(category)}&type=${encodeURIComponent(type)}&color=${encodeURIComponent(color)}`;

        xhr.open('GET', url, true);
    
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { 
                if (xhr.status === 200) { 
                    var products = JSON.parse(xhr.responseText);
                    updateProductUI(products);
                 
                } else {
                    console.error("Error: " + xhr.statusText);
                }
            }
        };

        xhr.send();
    }
    
        
    function fetchcart() {
        const xhr = new XMLHttpRequest();
        const userId = localStorage.getItem('user_id');
        const url = `index.php?action=viewCart&user_id=${encodeURIComponent(userId)}`;

        xhr.open('GET', url, true);
    
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { 
                if (xhr.status === 200) { 
                    var result = JSON.parse(xhr.responseText);
                    updateCartUI(result);
                 
                } else {
                    console.error("Error: " + xhr.statusText);
                }
            }
        };

        xhr.send();
    }
    
    

        function updateProductUI(products) {
         
            const container = document.getElementById('productContainer');
            container.innerHTML = ''; 
    
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'col-sm-6 col-md-4 mb-4'; 
                productDiv.innerHTML = `
                    <div class="card product-card">
                        <img src="assets/products/${product.image}" class="card-img-top" alt="Product Image">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">Type: ${product.type}</p>
                            <p class="card-text">Category: ${product.category}</p>
                            <p class="card-text">Price: <strong>${product.price} XAF</strong></p>
                            <p class="card-text">
                                Rating: 
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star-half-alt text-warning"></i>
                                <i class="far fa-star"></i>
                            </p>
                            <button class="btn btn-primary w-100" onclick="addToCart(${product.id}, 1)">Add to Cart</button>
                        </div>
                    </div>
                `;
                container.appendChild(productDiv);
            });


        }
        

        function updateCartUI(cartItems) {
            const container = document.getElementById('cartContainer');
            container.innerHTML = ''; 
        
            if (cartItems.length === 0) {
                container.innerHTML = '<p>Your cart is empty.</p>';
                return;
            }
        
            const table = document.createElement('table');
            table.className = 'table table-hover align-middle mb-0';
            
            const thead = document.createElement('thead');
            thead.className = 'table-light';
            thead.innerHTML = `
                <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            `;
            table.appendChild(thead);
        
            const tbody = document.createElement('tbody');
            
            let totalQuantity = 0; // Initialisation de la quantité totale
            let totalPrice = 0;    // Initialisation du prix total
        
            cartItems.forEach(item => {
                const row = document.createElement('tr');
        
                const itemTotal = item.quantity * item.price; // Calcul du total pour l'article
                totalQuantity += item.quantity; // Ajout à la quantité totale
                totalPrice += itemTotal;         // Ajout au prix total
        
                row.innerHTML = `
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="assets/products/${item.image}" alt="Product" class="img-thumbnail me-3">
                        </div>
                    </td>
                    <td>${item.name}</td>
                    <td>${item.price} XAF</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-sm btn-outline-secondary px-2" onclick="updateQuantity(${item.id},${item.quantity} -1)">-</button>
                            <input type="number" class="form-control form-control-sm text-center mx-2" value="${item.quantity}" min="1" style="width: 60px;" onchange="updateQuantity(${item.id}, this.value)">
                            <button class="btn btn-sm btn-outline-secondary px-2" onclick="updateQuantity(${item.id},${item.quantity} + 1)">+</button>
                        </div>
                    </td>
                    <td>${itemTotal} XAF</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                `;
                
                tbody.appendChild(row);
            });
        
            table.appendChild(tbody);
            container.appendChild(table);
        
            // Mise à jour du résumé du panier
            const summary = `
                <div class="col-12 mt-4">
                    <div class="card shadow-sm">
                        <div class="card-header text-white" style="background-color: #e9e752;">
                            <h5 class="mb-0">Order Summary</h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>Subtotal</span>
                                    <span>${totalPrice} XAF</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>Qty</span>
                                    <span>${totalQuantity}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between fw-bold">
                                    <span>Total</span>
                                    <span>${totalPrice} XAF</span>
                                </li>
                            </ul>
                            <button class="btn btn-primary w-100 mt-3">Proceed to Checkout</button>
                            <button class="btn btn-outline-secondary w-100 mt-2" id="exit">Continue Shopping</button>
                        </div>
                    </div>
                </div>
            `;
        
            container.innerHTML += summary; // Ajout du résumé du panier
        }
        
        function updateQuantity(productId, change) {
            
            const xhr = new XMLHttpRequest();
            xhr.open('GET' , `index.php?action=updateQuantity&productId=${productId}&value=${change}` , true)
           
            xhr.onreadystatechange = function (){
                if(xhr.status >= 200 && xhr.status < 300){
                    fetchcart();
                    console.log('Item updated successfully');
                }else{
                    console.error('Error updating item from cart:', xhr.statusText);
                }
            }
            xhr.send()

            console.log(`Updating quantity for product ID ${productId} by ${change}`);
        }
        
        function removeFromCart(productId) {
            
         const xhr = new XMLHttpRequest();
            xhr.open('GET' , `index.php?action=removeFromCart&productId=${productId}` , true)
            console.log(`Removing product ID ${productId} from the cart`);
            xhr.onreadystatechange = function (){
                if(xhr.status >= 200 && xhr.status < 300){
                    fetchcart();
                    console.log('Item Deleted successfully');
                }else{
                    console.error('Error removing item from cart:', xhr.statusText);
                }
            }
            xhr.send()
        }
        

        if (!localStorage.getItem('user_id')) {
            
            const randomValue = Math.floor(Math.random() * 109) + 1; 
         
                console.log(randomValue)
            localStorage.setItem('user_id', randomValue);
        }
        
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
            
                const userId = localStorage.getItem('user_id');
            
                const productId = this.getAttribute('data-product-id');
                const quantity = this.getAttribute('data-product-quantity');
        
                const xhr = new XMLHttpRequest();
                xhr.open('GET', `index.php?action=addToCart&user_id=${userId}&product_id=${productId}&quantity=${quantity}`, true);
                
                xhr.onload = function() {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        fetchcart();
                    } else {
                        console.error('Error adding to cart:', xhr.statusText);
                    }
                };
        
                xhr.send();
            });
        });
        
        
