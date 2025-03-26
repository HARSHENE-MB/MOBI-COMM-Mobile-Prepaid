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

    // Create an error message element if it doesn't exist
    let errorMessage = document.getElementById("error-message");
    if (!errorMessage) {
        errorMessage = document.createElement("div");
        errorMessage.id = "error-message";
        errorMessage.style.color = "red";
        errorMessage.style.marginTop = "10px";
        phoneInput.parentNode.insertBefore(errorMessage, phoneInput.nextSibling);
    }

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
            errorMessage.textContent = "Please enter a valid 10-digit phone number.";
            return;
        }

        try {
            const response = await fetch("http://localhost:8083/api/users");
            if (!response.ok) {
                throw new Error("Failed to fetch user data.");
            }

            const users = await response.json();
            const user = users.find(user => user.phoneNumber === phone);

            if (!user) {
                errorMessage.innerHTML = `
                    <div class="alert alert-danger d-flex align-items-center p-2 mt-2 shadow-sm" role="alert" 
                         style="font-size: 14px; border-radius: 5px;">
                        <i class="fas fa-exclamation-circle me-2"></i> 
                        Phone number not registered. Please enter a valid Mobi Comm Number.
                    </div>`;
                return;
            }

            // Send OTP request to backend for valid user
            const otpResponse = await fetch("http://localhost:8083/api/auth/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ phoneNumber: phone })
            });

            if (!otpResponse.ok) {
                throw new Error("Failed to send OTP.");
            }

            const result = await otpResponse.json();

            // Store phone number and user details
            localStorage.setItem("phone", phone);
            localStorage.setItem("loggedInUser", JSON.stringify(user));

            // Show toast message (OTP sent)
            showToast("OTP sent successfully to your registered email.", "success");

            // Redirect to OTP page after 3 seconds
            console.log("Redirecting to OTP page...");
            setTimeout(() => {
                window.location.href = "otp.html";
            }, 3000);
        } catch (error) {
            console.error("Error sending OTP:", error);
            showToast("An error occurred. Please try again.", "error");
        }
    });
});

function showToast(message, type) {
    let toast = document.createElement("div");
    toast.className = `toast-message ${type}`;
    toast.textContent = message;

    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "5px";
    toast.style.boxShadow = "0px 2px 5px rgba(0,0,0,0.2)";
    toast.style.zIndex = "1000";
    toast.style.color = type === "success" ? "#155724" : "#721c24";
    toast.style.backgroundColor = type === "success" ? "#d4edda" : "#f8d7da";

    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}
