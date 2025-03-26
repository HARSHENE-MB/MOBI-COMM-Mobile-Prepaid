document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameError = document.getElementById("username-error");
    const passwordError = document.getElementById("password-error");

    if (!loginForm || !usernameInput || !passwordInput) {
        console.error("One or more elements not found. Check your HTML IDs.");
        return;
    }

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
            showError(usernameInput, "Username cannot be empty.", usernameError);
            isValid = false;
        } else {
            hideError(usernameInput, usernameError);
        }

        if (!password) {
            showError(passwordInput, "Password cannot be empty.", passwordError);
            isValid = false;
        } else if (!validatePassword(password)) {
            showError(passwordInput, "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.", passwordError);
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

        // Hardcoded admin login check
        if (username === "Admin" && password === "Admin@123") {
            localStorage.setItem("adminLoggedIn", "true");
            localStorage.setItem("adminName", username);
            window.location.href = "./admin-dashboard.html";
            return;
        }

        // Dynamic login via API (Replace with actual backend endpoint)
        fetch("admin-login-endpoint", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem("adminLoggedIn", "true");
                localStorage.setItem("adminName", username);
                window.location.href = "./admin-dashboard.html";
            } else {
                showError(usernameInput, "Incorrect username or password.", usernameError);
                showError(passwordInput, "Incorrect username or password.", passwordError);
            }
        })
        .catch(() => {
            showError(usernameInput, "Error connecting to server.", usernameError);
        });
    });

    usernameInput.addEventListener("input", () => hideError(usernameInput, usernameError));
    passwordInput.addEventListener("input", function () {
        if (!validatePassword(passwordInput.value.trim())) {
            showError(passwordInput, "Password must meet the criteria.", passwordError);
        } else {
            hideError(passwordInput, passwordError);
        }
    });
});
