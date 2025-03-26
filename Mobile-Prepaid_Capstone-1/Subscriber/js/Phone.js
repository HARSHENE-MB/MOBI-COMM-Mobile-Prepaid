document.addEventListener("DOMContentLoaded", function () {
    // Reset redirect counter when reaching phone.html properly
    localStorage.setItem("redirectCount", "0");

    // Redirect to profile if already logged in
    if (localStorage.getItem("isLoggedIn") === "true") {
        window.location.href = "Profile.html";
        return;
    }

    const phoneInput = document.getElementById("phone");
    const generateOtpBtn = document.querySelector("#phoneForm button");
    const errorMessage = document.getElementById("error-message") || createErrorMessage();

    // Disable button initially
    generateOtpBtn.disabled = true;

    // Enable button only if valid phone number is entered
    phoneInput.addEventListener("input", function () {
        generateOtpBtn.disabled = !/^\d{10}$/.test(phoneInput.value);
        errorMessage.textContent = "";
    });

    document.getElementById("phoneForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        const phone = phoneInput.value;

        if (!/^\d{10}$/.test(phone)) {
            showError("Please enter a valid 10-digit phone number.");
            return;
        }

        try {
            const users = await fetchUsers();
            const user = users.find(user => user.phoneNumber === phone);

            if (!user) {
                showError("Phone number not registered. Please enter a valid Mobi Comm Number.");
                return;
            }

            // Send OTP request to backend
            const otpSuccess = await sendOtp(phone);
            if (!otpSuccess) {
                showError("Failed to send OTP. Please try again.");
                return;
            }

            // Store user details
            localStorage.setItem("phone", phone);
            localStorage.setItem("loggedInUser", JSON.stringify(user));

            // Show success toast
            showToast("OTP sent successfully to your registered email.", "success");

            // Redirect to OTP page after 3 seconds
            setTimeout(() => window.location.href = "otp.html", 3000);
        } catch (error) {
            console.error("Error:", error);
            showError("An error occurred. Please try again.");
        }
    });

    function createErrorMessage() {
        let errorDiv = document.createElement("div");
        errorDiv.id = "error-message";
        errorDiv.style.color = "red";
        errorDiv.style.marginTop = "10px";
        phoneInput.parentNode.insertBefore(errorDiv, phoneInput.nextSibling);
        return errorDiv;
    }

    async function fetchUsers() {
        const response = await fetch("http://localhost:8083/api/users");
        if (!response.ok) throw new Error("Failed to fetch user data.");
        return response.json();
    }

    async function sendOtp(phone) {
        const response = await fetch("http://localhost:8083/api/auth/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phoneNumber: phone })
        });
        return response.ok;
    }

    function showError(message) {
        errorMessage.innerHTML = `
            <div class="alert alert-danger d-flex align-items-center p-2 mt-2 shadow-sm" role="alert" 
                 style="font-size: 14px; border-radius: 5px;">
                <i class="fas fa-exclamation-circle me-2"></i> ${message}
            </div>`;
    }

    function showToast(message, type) {
        let toast = document.createElement("div");
        toast.className = `toast-message ${type}`;
        toast.textContent = message;

        Object.assign(toast.style, {
            position: "fixed",
            top: "15px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
            zIndex: "1000",
            color: type === "success" ? "#155724" : "#721c24",
            backgroundColor: type === "success" ? "#d4edda" : "#f8d7da"
        });

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
});
