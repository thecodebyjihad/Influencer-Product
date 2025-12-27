document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('.right ul');

    if (hamburger && navUl) {
        hamburger.addEventListener('click', () => {
            navUl.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        const navLinks = navUl.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                    const icon = hamburger.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // Cart functionality
    const cartIcon = document.querySelector('.fa-cart-shopping');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartButton = document.getElementById('close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');

    let cart = [];

    // Function to open the cart sidebar
    const openCart = () => {
        if (cartSidebar) {
            cartSidebar.classList.add('cart-open');
        }
    };

    // Function to close the cart sidebar
    const closeCart = () => {
        if (cartSidebar) {
            cartSidebar.classList.remove('cart-open');
        }
    };

    // Function to update the cart display
    const updateCart = () => {
        if (!cartItemsContainer || !cartTotalSpan) return;

        // Clear previous items
        cartItemsContainer.innerHTML = '';

        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <button class="remove-item" data-id="${item.id}">&times;</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });

        cartTotalSpan.textContent = total.toFixed(2);

        // Add event listeners to new remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                removeFromCart(id);
            });
        });
    };

    // Function to add an item to the cart
    const addToCart = (product) => {
        cart.push(product);
        updateCart();
    };

    // Function to remove an item from the cart
    const removeFromCart = (productId) => {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    };

    // Event Listeners
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }

    if (closeCartButton) {
        closeCartButton.addEventListener('click', closeCart);
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productElement = e.target;
            const id = productElement.getAttribute('data-product-id');
            const name = productElement.getAttribute('data-product-name');
            const price = parseFloat(productElement.getAttribute('data-product-price'));
            const image = productElement.getAttribute('data-product-image');
            
            if (id && name && !isNaN(price) && image) {
                const product = { id, name, price, image };
                addToCart(product);
                openCart(); // Open cart when item is added
            }
        });
    });
});