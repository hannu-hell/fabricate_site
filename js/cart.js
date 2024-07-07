// Function to add item to cart
function addToCart(id, name, price, quantity) {
    quantity = parseInt(quantity);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        // Assuming image paths follow the pattern "images/footwear/[id].jpg"
        const imagePath = `images/footwear/${id}.jpg`;
        cart.push({ id, name, price, quantity, imagePath });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart. Quantity: ${quantity}`);
}

// Function to remove item from cart
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Function to clear the cart
function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    displayCart();
}

// Function to calculate total cart amount
function calculateTotal(cart) {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
}

// Function to display cart items
function displayCart() {
    const cartContainer = document.getElementById('cart');
    const totalAmount = document.getElementById('total-amount');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalAmount.innerText = 'Total: $0.00';
    } else {
        cart.forEach(item => {
            const productDiv = document.createElement('div');
            productDiv.className = 'cart-item';
            productDiv.innerHTML = `
                <img src="${item.imagePath}" alt="${item.name}" class="cart-product-image">
                <div>
                    <h2>${item.name}</h2>
                    <p>Product ID: ${item.id}</p>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="remove-from-cart" onclick="removeFromCart('${item.id}')">Remove</button>
            `;
            cartContainer.appendChild(productDiv);
        });

        totalAmount.innerText = `Total: $${calculateTotal(cart)}`;
    }
}

// Function to send cart data by creating a mailto link with CC email address
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    const recipientEmail = "hanoon@fabricate-maldives.com"; // replace with the recipient email address
    const ccEmail = "ayaz@fabricate-maldives.com"; // replace with the CC email address
    const subject = "Order Checkout";
    const body = formatCartItems(cart);
    const mailtoLink = `mailto:${recipientEmail}?cc=${ccEmail}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the user's default email client with the pre-filled order details
    window.location.href = mailtoLink;

    // Clear the cart after sending the order
    clearCart();
}

// Function to format cart items into a string for email body
function formatCartItems(cart) {
    let formattedCart = 'Order Details:\n\n';
    cart.forEach(item => {
        formattedCart += `${item.name}\n`;
        formattedCart += `Product ID: ${item.id}\n`;
        formattedCart += `Price: $${item.price}\n`;
        formattedCart += `Quantity: ${item.quantity}\n`;
        formattedCart += `Total: $${(item.price * item.quantity).toFixed(2)}\n`;
        formattedCart += '\n';
    });
    formattedCart += `Grand Total: $${calculateTotal(cart)}`;
    return formattedCart;
}

// To display cart page if applicable
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart')) {
        displayCart();

        // Event listener for checkout button
        document.getElementById('checkout').addEventListener('click', checkout);
        
        // Event listener for clear cart button
        document.getElementById('clear-cart').addEventListener('click', clearCart);
    }
});
