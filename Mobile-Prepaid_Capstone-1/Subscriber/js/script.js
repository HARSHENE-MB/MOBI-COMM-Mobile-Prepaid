// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem("userLoggedIn") === "true"; 
}

// Function to show Quick Recharge errors below the input field
function showQuickRechargeError(message) {
    let errorDiv = document.getElementById("quick-recharge-error");
    
    if (!errorDiv) {
        errorDiv = document.createElement("div");
        errorDiv.id = "quick-recharge-error";
        errorDiv.style.color = "#d9534f";
        errorDiv.style.fontSize = "12px";
        errorDiv.style.marginTop = "5px";
        errorDiv.style.textAlign = "center";
        document.getElementById("zen").appendChild(errorDiv);
    }

    errorDiv.textContent = message;
}

// Function to validate phone number (must be 10 digits & start with 6-9)
function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^[6-9]\d{9}$/; // Ensures it starts with 6,7,8,9 and is 10 digits long
    return phoneRegex.test(phoneNumber);
}

// Function to check if number exists in API
function isRegisteredNumber(phoneNumber, callback) {
    fetch("http://localhost:8083/api/users")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            return response.json();
        })
        .then(users => {
            const validNumbers = users.map(user => user.phoneNumber); // Extract phone numbers
            callback(validNumbers.includes(phoneNumber));
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            callback(false);
        });
}

// Quick Recharge Button Logic
document.addEventListener("DOMContentLoaded", function() {
    // Prepaid Page: Load Stored Number
    const phoneInput = document.getElementById("phone-number");
    if (phoneInput) {
        const storedPhone = localStorage.getItem("userPhone");
        if (storedPhone) {
            phoneInput.value = storedPhone; //  Auto-fill number on Prepaid page
        }
    }

    // Quick Recharge Button Logic
    const quickRechargeBtn = document.getElementById("quick-recharge-btn");
    if (quickRechargeBtn) {
        quickRechargeBtn.addEventListener("click", function (event) {
            event.preventDefault();
            
            const inputNumber = document.getElementById("quick-recharge-number").value.trim();
            
            if (!inputNumber) {
                showQuickRechargeError("Please enter a mobicomm number.");
                return;
            }

            if (!isValidPhoneNumber(inputNumber)) {
                showQuickRechargeError("Enter a valid 10-digit number.");
                return;
            }
            
            isRegisteredNumber(inputNumber, function (isRegistered) {
                if (isRegistered) {
                    console.log(" Quick Recharge number found! Redirecting to Prepaid.");
                    localStorage.setItem("userPhone", inputNumber); // Store number
                    window.location.href = "/Mobile-Prepaid_Capstone-1/Subscriber/Prepaid.html"; //  Redirect to Prepaid
                } else {
                    console.log(" Number not registered! Staying on index.");
                    showQuickRechargeError("Not a registered MobiComm number.");
                }
            });
        });
    }
});

