const form = document.querySelector("form");
const firstNameInput = form.querySelector(".fname-field input");
const lastNameInput = form.querySelector(".lname-field input");
const emailInput = form.querySelector(".email-field input");
const phoneInput = form.querySelector(".phone-field input");
const passwordInput = form.querySelector(".create-password input");
const cPasswordInput = form.querySelector(".confirm-password input");
const eyeIcons = document.querySelectorAll(".show-hide");

// Validate and display errors on submit
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = [firstNameInput, lastNameInput, emailInput, phoneInput, passwordInput, cPasswordInput];
    let isValid = true; // Flag to track overall form validity

    inputs.forEach(input => {
        if (!input.value.trim()) {
            showErrorMessage(input, `${getFieldName(input)} is required`);
            isValid = false;
        } else {
            hideErrorMessage(input);
        }
    });

    if (!isEmailValid(emailInput.value.trim())) {
        showErrorMessage(emailInput, ' Email is required');
        isValid = false;
    }

    if (passwordInput.value !== cPasswordInput.value) {
        showErrorMessage(cPasswordInput, 'Passwords do not match');
        isValid = false;
    }

    if (isValid) {
        form.submit(); // Submit the form if all validations pass
    }
});

// Show error message and change border color
function showErrorMessage(input, message) {
    const field = input.closest(".field");
    const error = field.querySelector(".error");
    error.style.display = "flex";
    error.querySelector(".error-text").textContent = message;
    field.classList.add("invalid");
    input.style.borderColor = "red";
}

// Hide error message and reset border color
function hideErrorMessage(input) {
    const field = input.closest(".field");
    const error = field.querySelector(".error");
    error.style.display = "none";
    field.classList.remove("invalid");
    input.style.borderColor = "#d1d1d1";
}

// Get field name for error message
function getFieldName(input) {
    return input.placeholder;
}

// Toggle password visibility
eyeIcons.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        const input = eyeIcon.parentElement.querySelector("input");
        if (input.type === "password") {
            input.type = "text";
            eyeIcon.classList.replace("bx-hide", "bx-show");
        } else {
            input.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        }
    });
});


// Email validation function
function isEmailValid(email) {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return email.match(emailPattern);
}

// Listen for the blur event on input fields
const inputs = [firstNameInput, lastNameInput, emailInput, phoneInput, passwordInput, cPasswordInput];
inputs.forEach(input => {
    input.addEventListener("blur", () => {
        if (!input.value.trim()) {
            showErrorMessage(input, `${getFieldName(input)} is required`);
        } else if (input === emailInput && !isEmailValid(input.value.trim())) {
            showErrorMessage(input, 'Invalid email address');
        }
    });
});