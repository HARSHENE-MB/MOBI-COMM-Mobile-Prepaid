// Global variables
let allPlans = []; // Will store all recharge plans
let categories = []; // Will store all categories
let selectedCategory = "all"; // Default category

// Function to initialize the page
document.addEventListener("DOMContentLoaded", function() {
    // Fetch categories and plans when the page loads
    fetchCategories();
    
    // Set up event listeners
    setupEventListeners();
    
    // Display user's phone number if available
    displayPhoneNumber();
});



// Function to setup event listeners
function setupEventListeners() {
    // Set up search functionality
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
        searchBar.addEventListener("input", searchPlans);
    }
    
    // Set up filter button click
    const filterBtn = document.getElementById("filter-btn");
    if (filterBtn) {
        filterBtn.addEventListener("click", openFilterModal);
    }
    
    // Close modals when clicking outside
    window.addEventListener("click", function(event) {
        const planModal = document.getElementById("plan-details-modal");
        if (event.target === planModal) {
            closeModal("plan-details-modal");
        }
        
        const filterModal = document.getElementById("filter-modal");
        if (event.target === filterModal) {
            closeModal("filter-modal");
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    let userDetails = JSON.parse(localStorage.getItem("userDetails")) || null;
    let profileDropdown = document.getElementById("profile-dropdown");
    let dropdownMenu = document.getElementById("dropdown-menu");

    //  Hide dropdown if not logged in
     // Hide dropdown if not logged in
     if (!isLoggedIn) {
        dropdownMenu.style.display = "none";
    } else if (userDetails && userDetails.fullName) {
        updateAuthUI(userDetails.fullName); //  Call updateAuthUI() only when logged in
    }

    let profileIcon = profileDropdown.querySelector(".nav-link");

    profileIcon.addEventListener("click", function (event) {
        event.preventDefault();

        if (isLoggedIn) {
            dropdownMenu.classList.toggle("show"); // Toggle dropdown if logged in
        } else {
            
                window.location.href = "phone.html";
        }
    });


});

function updateAuthUI(fullName) {
    const profileDropdown = document.getElementById("profile-dropdown");

    if (profileDropdown) {
        profileDropdown.innerHTML = `
            <a href="#" class="nav-link">
                <i class="bi bi-person fs-4"></i> ${fullName}
            </a>
            <div class="dropdown-menu" id="dropdown-menu">
                <a class="dropdown-item" href="./Profile.html">My Profile</a>
                <a class="dropdown-item" href="#" id="logout-btn">Logout</a>
            </div>
        `;
    }

    // Reattach logout event after updating DOM
    document.getElementById("logout-btn")?.addEventListener("click", logout);
}

// Toggle Dropdown
function toggleDropdown() {
    let dropdown = document.getElementById("dropdown-menu");
    dropdown.classList.toggle("show");

    if (dropdown.classList.contains("show")) {
        document.addEventListener("click", function closeDropdown(e) {
            if (!e.target.closest("#profile-dropdown")) {
                dropdown.classList.remove("show");
                document.removeEventListener("click", closeDropdown);
            }
        });
    }
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
} 
document.addEventListener("DOMContentLoaded", displayPhoneNumber);

// Function to display the user's phone number
function displayPhoneNumber() {
    const phoneNumber = localStorage.getItem("phoneNumber") || "Not logged in";
    const phoneNumberField = document.getElementById("phone-number");
    if (phoneNumberField) {
        phoneNumberField.value = phoneNumber;
    }

    const loginStatus = document.getElementById("login-status");
    if (loginStatus) {
        if (phoneNumber !== "Not logged in") {
            loginStatus.innerHTML = `<span class="text-success">Logged in</span>`;
        } else {
            loginStatus.innerHTML = `<span class="text-danger">Not logged in</span>`;
        }
    }

    // // Setup change number button
    // const changeNumberBtn = document.getElementById("change-number-btn");
    // if (changeNumberBtn) {
    //     changeNumberBtn.addEventListener("click", function () {
    //         window.location.href = "./phone.html";
    //     });
    // }
}



// Function to display the user's phone number
function displayPhoneNumber() {
    // Check if user is logged in first
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    // Get user details
    const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
    
    // Get phone number - prioritize the phoneNumber in userDetails if available
    const phoneNumber = isLoggedIn ? 
        (userDetails.phoneNumber || localStorage.getItem("phoneNumber") || "Not available") : 
        "Not logged in";
    
    // Update the phone number field
    const phoneNumberField = document.getElementById("phone-number");
    if (phoneNumberField) {
        phoneNumberField.value = phoneNumber;
        // Initially make the field read-only
        phoneNumberField.readOnly = true;
    }
    
    // Update login status indicator
    const loginStatus = document.getElementById("login-status");
    if (loginStatus) {
        if (isLoggedIn) {
            loginStatus.innerHTML = `<span class="text-success">Logged in</span>`;
        } else {
            loginStatus.innerHTML = `<span class="text-danger">Not logged in</span>`;
        }
    }
    
    // Setup change number button
    const changeNumberBtn = document.getElementById("change-number-btn");
    if (changeNumberBtn) {
        // Only show the button if user is logged in
        changeNumberBtn.style.display = isLoggedIn ? "block" : "none";
        changeNumberBtn.innerText = "Change Number";
        
        // Remove any existing event listeners
        changeNumberBtn.replaceWith(changeNumberBtn.cloneNode(true));
        
        // Get the freshly cloned button
        const newChangeNumberBtn = document.getElementById("change-number-btn");
        
        // Track if we're in editing mode
        let isEditing = false;
        
        newChangeNumberBtn.addEventListener("click", async function() {
            if (!isLoggedIn) {
                window.location.href = "./phone.html";
                return;
            }
            
            if (!isEditing) {
                // Enter editing mode
                isEditing = true;
                phoneNumberField.readOnly = false;
                phoneNumberField.focus();
                newChangeNumberBtn.innerText = "Save Number";
                
                // Store the original value in case we need to revert
                phoneNumberField.dataset.originalValue = phoneNumberField.value;
            } else {
                // Save mode - validate and update the number
                const newPhoneNumber = phoneNumberField.value.trim();
                const originalNumber = phoneNumberField.dataset.originalValue;
                
                // Skip if number hasn't changed
                if (newPhoneNumber === originalNumber) {
                    exitEditMode();
                    return;
                }
                
                try {
                    // Fetch available phone numbers from API
                    const response = await fetch("http://localhost:8083/api/users");
                    if (!response.ok) {
                        throw new Error("Failed to fetch users");
                    }
                    
                    const users = await response.json();
                    const validPhoneNumbers = users.map(user => user.phoneNumber);
                    
                    // Check if the entered number exists in the API
                    if (validPhoneNumbers.includes(newPhoneNumber)) {
                        // Find the user with this phone number to get their details
                        const selectedUser = users.find(user => user.phoneNumber === newPhoneNumber);
                        
                        // Update local storage with the new phone number
                        localStorage.setItem("phoneNumber", newPhoneNumber);
                        
                        // Update user details if we have the user's information
                        if (selectedUser) {
                            const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
                            userDetails.phoneNumber = newPhoneNumber;
                            if (selectedUser.fullName) {
                                userDetails.fullName = selectedUser.fullName;
                            }
                            localStorage.setItem("userDetails", JSON.stringify(userDetails));
                            
                            // Update UI if updateAuthUI function exists
                            if (typeof updateAuthUI === 'function' && selectedUser.fullName) {
                                updateAuthUI(selectedUser.fullName);
                            }
                        }
                        
                        showToast(`Phone number updated to ${newPhoneNumber}`, "success");
                        exitEditMode();
                    } else {
                        // If number is not in the API, show error and stay in edit mode
                        showToast("This phone number is not registered in our system. Please enter a valid phone number.", "error");
                    }
                } catch (error) {
                    console.error("Error verifying phone number:", error);
                    showToast("Failed to validate phone number. Please try again later.", "error");
                    exitEditMode();
                    // Reset to the original value on error
                    phoneNumberField.value = originalNumber;
                }
            }
            
            function exitEditMode() {
                isEditing = false;
                phoneNumberField.readOnly = true;
                newChangeNumberBtn.innerText = "Change Number";
            }
        });
    }
    
    console.log("Display phone number function executed. isLoggedIn:", isLoggedIn, "phoneNumber:", phoneNumber);
}

// Toast function if not already defined
function showToast(message, type = "success") {
    const toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
        // Create toast container if it doesn't exist
        const container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }
    
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = message;
    
    document.getElementById("toast-container").appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.classList.add("fade-out");
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}









// Call function after DOM loads
document.addEventListener("DOMContentLoaded", displayPhoneNumber);

// Function to fetch categories
async function fetchCategories() {
    try {
        const response = await fetch("http://localhost:8083/api/categories");
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        
        const data = await response.json();
        categories = data;
        
        // Update the category tabs
        updateCategoryTabs(categories);
        
        // Now fetch plans for default category (all)
        fetchPlans("all");
    } catch (error) {
        console.error("Error fetching categories:", error);
        showToast("Failed to load categories. Please try again later.", "error");
    }
}

// Function to update category tabs
function updateCategoryTabs(categories) {
    const tabContainer = document.getElementById("plans-list");
    if (!tabContainer) return;
    
    // Clear existing tabs
    tabContainer.innerHTML = "";
    
    // Add "All Plans" tab
    const allPlansBtn = document.createElement("button");
    allPlansBtn.id = "all-plans-btn";
    allPlansBtn.className = "list-group-item list-group-item-action active";
    allPlansBtn.textContent = "All Plans";
    allPlansBtn.addEventListener("click", function() {
        setActiveTab(this);
        fetchPlans("all");
    });
    tabContainer.appendChild(allPlansBtn);
    
    // Add category tabs
    categories.forEach(category => {
        const categoryBtn = document.createElement("button");
        categoryBtn.className = "list-group-item list-group-item-action";
        categoryBtn.textContent = category.categoryName;
        categoryBtn.addEventListener("click", function() {
            setActiveTab(this);
            fetchPlans(category.categoryName);
        });
        tabContainer.appendChild(categoryBtn);
    });
}

// Function to set active tab
function setActiveTab(clickedTab) {
    // Remove 'active' class from all tabs
    const tabs = document.querySelectorAll("#plans-list .list-group-item");
    tabs.forEach(tab => {
        tab.classList.remove("active");
    });
    
    // Add 'active' class to clicked tab
    clickedTab.classList.add("active");
}

// Function to fetch plans
async function fetchPlans(category) {
    try {
        selectedCategory = category;
        let url;
        
        if (category === "all") {
            url = "http://localhost:8083/api/plans";
        } else {
            url = `http://localhost:8083/api/plans/category/${encodeURIComponent(category)}`;
        }
        
        console.log("Fetching plans from:", url);
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch plans");
        }
        
        const data = await response.json();
        allPlans = data;
        
        // Display the plans
        displayPlans(allPlans);
    } catch (error) {
        console.error("Error fetching plans:", error);
        showToast("Failed to load plans. Please try again later.", "error");
    }
}

// Function to display plans
function displayPlans(plans) {
    const container = document.getElementById("plans-container");
    if (!container) return;
    
    // Clear existing plans
    container.innerHTML = "";
    
    // Show message if no plans
    if (plans.length === 0) {
        container.innerHTML = `<div class="col-12"><p class="text-center">No plans available for this category.</p></div>`;
        return;
    }
    
    // Create plan cards
    plans.forEach(plan => {
        const planCard = createPlanCard(plan);
        container.innerHTML += planCard;
    });
    
    // Add event listeners to buttons
    addPlanCardEventListeners();
}

// Function to create a plan card
function createPlanCard(plan) {
    // Check if the plan has a bestseller property
    const bestsellerBadge = plan.bestseller ? '<span class="bestseller-badge">Bestseller</span>' : '';
    const bestsellerClass = plan.bestseller ? 'bestseller' : '';
    
    return `
        <div class="col-md-6 col-lg-4 mb-3">
            <div class="card ${bestsellerClass}" data-id="${plan.id || plan.planId}">
                ${bestsellerBadge}
                <div class="card-body">
                    <p class="price">₹${plan.price}</p>
                    <p><strong>Data:</strong> ${plan.data}</p>
                    <p><strong>Validity:</strong> ${plan.validity}</p>
                    <p><small>${plan.benefits || plan.voice || ''}</small></p>
                    <div class="card-buttons">
                        <button class="btn view-details-btn" data-plan-id="${plan.id || plan.planId}">View</button>
                        <button class="btn recharge-btn" data-plan-id="${plan.id || plan.planId}" data-price="${plan.price}">Recharge</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to add event listeners to plan cards
function addPlanCardEventListeners() {
    // Add event listeners to view details buttons
    document.querySelectorAll(".view-details-btn").forEach(button => {
        button.addEventListener("click", function() {
            const planId = this.getAttribute("data-plan-id");
            viewPlanDetails(planId);
        });
    });
    
    // Add event listeners to recharge buttons
    document.querySelectorAll(".recharge-btn").forEach(button => {
        button.addEventListener("click", function() {
            const planId = this.getAttribute("data-plan-id");
            const price = this.getAttribute("data-price");
            storeSelectedPlan(planId, price);
        });
    });
}

// Function to view plan details
function viewPlanDetails(planId) {
    // Find the plan
    const plan = findPlanById(planId);
    if (!plan) return;
    
    // Create modal
    const modal = document.getElementById("plan-details-modal");
    if (!modal) return;
    
    // Populate modal
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal('plan-details-modal')">&times;</span>
            <h2>${plan.bestseller ? '<span class="bestseller-tag">Bestseller</span>' : ''}</h2>
            <div class="plan-details">
                <div class="detail-row">
                    <span class="detail-label">Price:</span>
                    <span class="detail-value">₹${plan.price}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Data:</span>
                    <span class="detail-value">${plan.data}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Validity:</span>
                    <span class="detail-value">${plan.validity}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Benefits:</span>
                    <span class="detail-value">${plan.benefits || plan.voice || 'N/A'}</span>
                </div>
                <div class="detail-row description">
                    <span class="detail-label">Description:</span>
                    <span class="detail-value">${plan.description || 'No description available'}</span>
                </div>
            </div>
            <div class="modal-buttons">
                <button class="btn recharge-btn" onclick="storeSelectedPlan('${planId}', ${plan.price})">Recharge Now</button>
                <button class="btn exit-btn" onclick="closeModal('plan-details-modal')">Close</button>
            </div>
        </div>
    `;
    
    // Show modal
    modal.style.display = "block";
}

// Function to close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

// Update the storeSelectedPlan function to handle plan ID properly
function storeSelectedPlan(planId, price) {
    // Check if the user is logged in first
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn) {
        // Use SweetAlert for better user experience
        Swal.fire({
            title: "Login Required",
            text: "Please log in to continue with the recharge.",
            icon: "warning",
            confirmButtonColor: "#d9534f",
            confirmButtonText: "OK"
        }).then(() => {
            window.location.href = "phone.html";
        });
        return;
    }
    
    // Find the complete plan details from allPlans
    const selectedPlan = findPlanById(planId);
    
    if (!selectedPlan) {
        showToast("Error: Plan details not found.", "error");
        return;
    }
    
    // Store complete plan details in localStorage
    localStorage.setItem("selectedPlanId", planId);
    localStorage.setItem("selectedPlanPrice", selectedPlan.price);
    localStorage.setItem("selectedPlanData", selectedPlan.data);
    localStorage.setItem("selectedPlanValidity", selectedPlan.validity);
    localStorage.setItem("selectedPlanBenefits", selectedPlan.benefits || selectedPlan.voice || "");
    localStorage.setItem("selectedPlanDescription", selectedPlan.description || "");
    
    console.log("Redirecting to payment page with plan:", selectedPlan);
    
    // Redirect to payment page with query parameters for better fallback
    window.location.href = `./payment.html?planId=${encodeURIComponent(planId)}&price=${encodeURIComponent(selectedPlan.price)}`;
}

// Add event listeners to recharge buttons
function addPlanCardEventListeners() {
    // Add event listeners to view details buttons
    document.querySelectorAll(".view-details-btn").forEach(button => {
        button.addEventListener("click", function() {
            const planId = this.getAttribute("data-plan-id");
            viewPlanDetails(planId);
        });
    });
    
    // Add event listeners to recharge buttons
    document.querySelectorAll(".recharge-btn").forEach(button => {
        button.addEventListener("click", function() {
            const planId = this.getAttribute("data-plan-id");
            const price = this.getAttribute("data-price");
            storeSelectedPlan(planId, price);
        });
    });
}

// Add SweetAlert library 
document.addEventListener("DOMContentLoaded", function() {
    // Check if SweetAlert is already loaded
    if (typeof Swal === 'undefined') {
        // Create script element to load SweetAlert
        const sweetAlertScript = document.createElement('script');
        sweetAlertScript.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
        document.head.appendChild(sweetAlertScript);
    }
});

// Function to find a plan by ID
function findPlanById(planId) {
    return allPlans.find(plan => (plan.id || plan.planId) == planId);
}

// Function to search plans
function searchPlans() {
    const searchQuery = document.getElementById("search-bar").value.toLowerCase();
    
    if (!searchQuery) {
        // If search is empty, show all plans for the current category
        fetchPlans(selectedCategory);
        return;
    }
    
    // Filter plans based on search query
    const filteredPlans = allPlans.filter(plan => 
        (plan.name && plan.name.toLowerCase().includes(searchQuery)) ||
        (plan.benefits && plan.benefits.toLowerCase().includes(searchQuery)) ||
        (plan.description && plan.description.toLowerCase().includes(searchQuery)) ||
        (plan.voice && plan.voice.toLowerCase().includes(searchQuery)) ||
        (plan.data && plan.data.toLowerCase().includes(searchQuery)) ||
        String(plan.price).includes(searchQuery)
    );
    
    // Display filtered plans
    displayPlans(filteredPlans);
}

// Function to open filter modal
function openFilterModal() {
    const filterModal = document.getElementById("filter-modal");
    if (!filterModal) return;
    
    // Populate filter modal
    filterModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal('filter-modal')">&times;</span>
            <h2>Filter Plans</h2>
            <div class="filter-form">
                <div class="form-group">
                    <label for="max-price">Maximum Price (₹):</label>
                    <input type="number" id="max-price" placeholder="Any price" min="0">
                </div>
                <div class="form-group">
                    <label for="min-data">Minimum Data (GB):</label>
                    <input type="number" id="min-data" placeholder="Any data" min="0" step="0.5">
                </div>
                <div class="form-group">
                    <label for="min-validity">Minimum Validity (days):</label>
                    <input type="number" id="min-validity" placeholder="Any validity" min="1">
                </div>
            </div>
            <div class="modal-buttons">
                <button class="btn primary-btn" onclick="applyFilters()">Apply Filters</button>
                <button class="btn secondary-btn" onclick="closeModal('filter-modal')">Cancel</button>
            </div>
        </div>
    `;
    
    // Show modal
    filterModal.style.display = "block";
}

// Function to apply filters
function applyFilters() {
    const maxPrice = document.getElementById("max-price").value;
    const minData = document.getElementById("min-data").value;
    const minValidity = document.getElementById("min-validity").value;
    
    // Start with all plans for the current category
    let filteredPlans = [...allPlans];
    
    // Apply price filter
    if (maxPrice) {
        filteredPlans = filteredPlans.filter(plan => plan.price <= parseInt(maxPrice));
    }
    
    // Apply data filter
    if (minData) {
        filteredPlans = filteredPlans.filter(plan => {
            const dataValue = parseDataValue(plan.data);
            return dataValue >= parseFloat(minData);
        });
    }
    
    // Apply validity filter
    if (minValidity) {
        filteredPlans = filteredPlans.filter(plan => {
            const validityDays = parseValidityDays(plan.validity);
            return validityDays >= parseInt(minValidity);
        });
    }
    
    // Close filter modal
    closeModal('filter-modal');
    
    // Display filtered plans
    displayPlans(filteredPlans);
}

// Helper function to parse data values
function parseDataValue(dataStr) {
    if (!dataStr) return 0;
    
    const match = dataStr.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
}

// Helper function to parse validity days
function parseValidityDays(validityStr) {
    if (!validityStr) return 0;
    
    const match = validityStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

// Function to show toast notification
function showToast(message, type = "success") {
    const toastContainer = document.getElementById("toast-container");
    if (!toastContainer) return;
    
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = message;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.classList.add("fade-out");
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}

