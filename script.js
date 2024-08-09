document.addEventListener('DOMContentLoaded', function() {
const form = document.getElementById('myForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const confirmEmailInput = document.getElementById('confirmEmail');
const thankYouMessage = document.getElementById('thankYouMessage');
const errorMessages = document.createElement('div');
errorMessages.id = 'errorMessages';
form.appendChild(errorMessages);

function showError(input, message) {
input.classList.add('error');
const errorElement = document.createElement('p');
errorElement.textContent = message;
errorElement.classList.add('error-message');
errorMessages.appendChild(errorElement);
}

function clearErrors() {
const inputs = form.querySelectorAll('input');
inputs.forEach(input => input.classList.remove('error'));
errorMessages.innerHTML = '';
}

nameInput.addEventListener('input', function(e) {
const regex = /^[a-zA-Z\s-]{2,50}$/;
if (!regex.test(e.target.value)) {
    e.target.setCustomValidity('Please enter a valid name (2-50 characters, only alphabets, spaces, and hyphens).');
} else {
    e.target.setCustomValidity('');
}
});

emailInput.addEventListener('input', function(e) {
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!regex.test(e.target.value)) {
    e.target.setCustomValidity('Please enter a valid email address.');
} else {
    e.target.setCustomValidity('');
}
});

form.addEventListener('submit', function(e) {
e.preventDefault();
clearErrors();

let isValid = true;

// Validate name
if (nameInput.value.trim() === '') {
    showError(nameInput, 'Name is required.');
    isValid = false;
} else if (!/^[a-zA-Z\s-]{2,50}$/.test(nameInput.value)) {
    showError(nameInput, 'Please enter a valid name (2-50 characters, only alphabets, spaces, and hyphens).');
    isValid = false;
}

// Validate email
if (emailInput.value.trim() === '') {
    showError(emailInput, 'Email is required.');
    isValid = false;
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    showError(emailInput, 'Please enter a valid email address.');
    isValid = false;
}

// Validate confirm email
if (confirmEmailInput.value.trim() === '') {
    showError(confirmEmailInput, 'Please confirm your email.');
    isValid = false;
} else if (emailInput.value !== confirmEmailInput.value) {
    showError(confirmEmailInput, 'Emails do not match.');
    isValid = false;
}

if (isValid) {
    // Form is valid, show thank you message and clear form
    thankYouMessage.style.display = 'block';
    form.reset();
    setTimeout(() => {
        thankYouMessage.style.display = 'none';
    }, 3000);
} else {
    // Scroll to the first error message
    const firstError = errorMessages.firstChild;
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
});
});

