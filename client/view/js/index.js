
    document.getElementById('hamburger').addEventListener('click', () => {
        const navbarNav = document.getElementById('navbarNav');
        navbarNav.classList.toggle('show');
    });

    // Language Toggle
    document.getElementById('toggleLanguage').addEventListener('click', (e) => {
        const btn = e.target;
        btn.textContent = btn.textContent === 'EN' ? 'FR' : 'EN';
    });

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
                
            });

            // Close the cart panel
            closeCart.addEventListener("click", () => {
                cartPanel.classList.remove("active");
            });
            exitCart.addEventListener("click", () => {
                cartPanel.classList.remove("active");
            });
        });
