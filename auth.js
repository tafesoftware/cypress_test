// Simple user storage (in a real app, use a proper backend)
let users = JSON.parse(localStorage.getItem('users')) || [];

// DOM elements
const loginForm = document.getElementById('login');
const signupForm = document.getElementById('signup');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const loginFormContainer = document.getElementById('login-form');
const signupFormContainer = document.getElementById('signup-form');
const loginMessage = document.getElementById('login-message');
const signupMessage = document.getElementById('signup-message');

// Toggle between login and signup forms
showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginFormContainer.classList.add('hidden');
    signupFormContainer.classList.remove('hidden');
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupFormContainer.classList.add('hidden');
    loginFormContainer.classList.remove('hidden');
});

// Signup form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    // Check if user already exists
    const userExists = users.some(user => user.email === email);
    
    if (userExists) {
        showMessage(signupMessage, 'User with this email already exists', 'error');
        return;
    }
    
    // Add new user
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    showMessage(signupMessage, 'Signup successful! Please login.', 'success');
    signupForm.reset();
    
    // Switch to login form
    setTimeout(() => {
        signupFormContainer.classList.add('hidden');
        loginFormContainer.classList.remove('hidden');
    }, 1500);
});

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Find user
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        showMessage(loginMessage, `Welcome back, ${user.name}!`, 'success');
        // In a real app, you would redirect or set a session here
    } else {
        showMessage(loginMessage, 'Invalid email or password', 'error');
    }
    
    loginForm.reset();
});

// Helper function to show messages
function showMessage(element, text, type) {
    element.textContent = text;
    element.className = 'message ' + type;
    setTimeout(() => {
        element.textContent = '';
        element.className = 'message';
    }, 3000);
}