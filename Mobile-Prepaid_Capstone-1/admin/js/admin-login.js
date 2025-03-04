document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameError = document.getElementById("username-error");
    const passwordError = document.getElementById("password-error");

    function showError(input, message, errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
        input.classList.add("is-invalid");
    }

    function hideError(input, errorElement) {
        errorElement.textContent = "";
        errorElement.style.display = "none";
        input.classList.remove("is-invalid");
    }

    function validatePassword(password) {
        return /[A-Z]/.test(password) &&
               /[a-z]/.test(password) &&
               /[0-9]/.test(password) &&
               /[!@#$%^&*(),.?":{}|<>]/.test(password) &&
               password.length >= 8;
    }

    function validateForm() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;

        if (!username) {
            showError(usernameInput, "Admin Name cannot be empty.", usernameError);
            isValid = false;
        } else {
            hideError(usernameInput, usernameError);
        }

        if (!password) {
            showError(passwordInput, "Password cannot be empty.", passwordError);
            isValid = false;
        } else if (!validatePassword(password)) {
            showError(passwordInput, "Password must have 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 8 characters.", passwordError);
            isValid = false;
        } else {
            hideError(passwordInput, passwordError);
        }

        return isValid;
    }

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!validateForm()) return;

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        let valid = true;

        if (username !== "admin") {
            showError(usernameInput, "Incorrect Admin Name!", usernameError);
            valid = false;
        }

        if (password !== "Admin@123") {
            showError(passwordInput, "Invalid Password!", passwordError);
            valid = false;
        }

        if (valid) {
            localStorage.setItem("adminLoggedIn", "true");
            localStorage.setItem("adminName", username);
            window.location.href = "./admin-dashboard.html";
        }
    });

    usernameInput.addEventListener("input", function () {
        if (usernameInput.value.trim()) {
            hideError(usernameInput, usernameError);
        }
    });

    passwordInput.addEventListener("input", function () {
        const password = passwordInput.value.trim();

        if (!password) {
            showError(passwordInput, "Password cannot be empty.", passwordError);
        } else if (!validatePassword(password)) {
            showError(passwordInput, "Password must have 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 8 characters.", passwordError);
        } else {
            hideError(passwordInput, passwordError);
        }
    });
});
