// Menu Data
const menuData = {
    appetizers: [
        { name: 'Caesar Salad', price: '₹450', description: 'Fresh romaine lettuce with parmesan cheese and croutons' },
        { name: 'Bruschetta', price: '₹380', description: 'Toasted bread with tomatoes, garlic, and basil' },
        { name: 'Soup of the Day', price: '₹320', description: 'Chef\'s special homemade soup' },
        { name: 'Stuffed Mushrooms', price: '₹420', description: 'Mushrooms filled with herbs and cheese' }
    ],
    mains: [
        { name: 'Grilled Salmon', price: '₹1,200', description: 'Fresh salmon with herbs and lemon butter sauce' },
        { name: 'Chicken Alfredo', price: '₹850', description: 'Creamy pasta with grilled chicken' },
        { name: 'Ribeye Steak', price: '₹1,500', description: 'Premium beef steak with vegetables' },
        { name: 'Vegetable Risotto', price: '₹720', description: 'Creamy rice with seasonal vegetables' },
        { name: 'Lamb Chops', price: '₹1,350', description: 'Tender lamb with rosemary and garlic' },
        { name: 'Seafood Platter', price: '₹1,800', description: 'Mixed seafood with chef\'s special sauce' }
    ],
    desserts: [
        { name: 'Tiramisu', price: '₹380', description: 'Classic Italian coffee-flavored dessert' },
        { name: 'Chocolate Lava Cake', price: '₹420', description: 'Warm chocolate cake with molten center' },
        { name: 'Cheesecake', price: '₹360', description: 'New York style cheesecake' },
        { name: 'Crème Brûlée', price: '₹400', description: 'Vanilla custard with caramelized sugar' }
    ],
    beverages: [
        { name: 'Fresh Juice', price: '₹180', description: 'Orange, Apple, or Pineapple' },
        { name: 'Specialty Coffee', price: '₹220', description: 'Espresso, Cappuccino, or Latte' },
        { name: 'Iced Tea', price: '₹150', description: 'Refreshing lemon or peach iced tea' },
        { name: 'Smoothies', price: '₹250', description: 'Berry, Mango, or Green smoothies' }
    ]
};

// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Menu Tab Functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const menuItemsContainer = document.getElementById('menu-items');

function displayMenu(category) {
    const items = menuData[category];
    menuItemsContainer.innerHTML = '';
    
    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <div class="price">${item.price}</div>
            <p>${item.description}</p>
        `;
        menuItemsContainer.appendChild(menuItem);
    });
}

// Initialize with appetizers
displayMenu('appetizers');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Display corresponding menu
        const category = button.getAttribute('data-tab');
        displayMenu(category);
    });
});

// Reservation Form Handling
const reservationForm = document.getElementById('reservation-form');
const formMessage = document.getElementById('form-message');

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(reservationForm);
    const data = Object.fromEntries(formData);
    
    // Validate date is not in the past
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showMessage('Please select a future date', 'error');
        return;
    }
    
    // In a real application, you would send this data to a PHP backend
    // For demonstration, we'll just show a success message
    
    // Simulate API call
    setTimeout(() => {
        showMessage('Reservation submitted successfully! We will contact you soon.', 'success');
        reservationForm.reset();
    }, 1000);
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu items for animation
const animateElements = document.querySelectorAll('.menu-item, .feature, .info-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Set minimum date for reservation to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}
