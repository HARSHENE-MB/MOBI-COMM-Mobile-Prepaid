// Enhanced Recharge Plans Data
const rechargePlans = {
    "recharge_plans": [
        {
            "category": "Popular Plans",
            "plans": [
                { "id": 501, "name": "Super Value Pack", "price": 239, "data": "1.5GB/day", "validity": "28 days", "benefits": "Unlimited Calls, 100 SMS/day", "bestseller": true, "description": "Perfect for daily users with moderate data needs. Enjoy seamless streaming and browsing with consistent speeds throughout the day." },
                { "id": 502, "name": "Power Pack Premium", "price": 349, "data": "2GB/day", "validity": "28 days", "benefits": "Unlimited Calls, Amazon Prime", "bestseller": true, "description": "Our most popular plan for digital enthusiasts. Unlimited calling with no FUP limits and free access to Amazon Prime for one month." },
                { "id": 503, "name": "Ultra Data Pack", "price": 399, "data": "3GB/day", "validity": "28 days", "benefits": "Unlimited Calls, 100 SMS/day, Prime Video", "bestseller": false, "description": "High-speed data allocation with unlimited calling benefits and Prime Video access for heavy data users." }
            ]
        },
        {
            "category": "Family Plan",
            "plans": [
                { "id": 101, "name": "Family Pack - 4 Users", "price": 599, "data": "20GB/day per user", "validity": "28 days", "benefits": "Unlimited Calls, 100 SMS/day, OTT Subscription", "bestseller": false, "description": "Share data with up to 4 family members. Each member gets their own data allocation and unlimited calling benefits." },
                { "id": 102, "name": "Family Pack - 6 Users", "price": 799, "data": "30GB/day per user", "validity": "28 days", "benefits": "Unlimited Calls, 200 SMS/day, Netflix", "bestseller": true, "description": "Our premium family plan supporting up to 6 connections. Comes with complimentary Netflix Basic subscription for the validity period." },
                { "id": 103, "name": "Family Premium - 8 Users", "price": 999, "data": "40GB/day per user", "validity": "28 days", "benefits": "Unlimited Calls, Netflix + Disney+", "bestseller": false, "description": "Ultimate family plan with dual OTT benefits and generous data allocation for the entire family." }
            ]
        },
        {
            "category": "Data Validity Plan",
            "plans": [
                { "id": 201, "name": "Long-Term Data Plan", "price": 499, "data": "50GB total", "validity": "90 days", "benefits": "Unlimited Calls, 100 SMS/day", "bestseller": false, "description": "Extended validity data plan with flexible usage. Total data can be used anytime during the validity period with no daily limits." },
                { "id": 202, "name": "Super Data Saver", "price": 699, "data": "100GB total", "validity": "120 days", "benefits": "Unlimited Calls", "bestseller": true, "description": "Best value for long-term usage. Huge data allocation with the freedom to use it as needed throughout the validity period." },
                { "id": 203, "name": "Annual Value Pack", "price": 2999, "data": "365GB total", "validity": "365 days", "benefits": "Unlimited Calls, Weekend Data Bonus", "bestseller": false, "description": "Recharge once for the entire year. Get special double data allocation every weekend as a bonus." },
                { "id": 204, "name": "Semi-Annual Pack", "price": 1599, "data": "180GB total", "validity": "180 days", "benefits": "Unlimited Calls, Night Data Bonus", "bestseller": false, "description": "Six-month validity with bonus nighttime data. Perfect for users who need consistent connectivity with medium usage." }
            ]
        },
        {
            "category": "Study Plan",
            "plans": [
                { "id": 301, "name": "Student Internet Pack", "price": 299, "data": "3GB/day", "validity": "30 days", "benefits": "Free access to educational apps", "bestseller": true, "description": "Specially designed for students with extended data allocation for online classes and learning platforms." },
                { "id": 302, "name": "Online Class Pack", "price": 399, "data": "4GB/day", "validity": "45 days", "benefits": "Zoom, Google Meet Access", "bestseller": false, "description": "Optimized for video conferencing platforms with prioritized bandwidth for Zoom, Teams, and Google Meet." },
                { "id": 303, "name": "College Semester Pack", "price": 999, "data": "2GB/day", "validity": "120 days", "benefits": "Education Platform Access", "bestseller": false, "description": "Semester-long plan with special access to premium educational content platforms and consistent data allocation." }
            ]
        },
        {
            "category": "Budget Plans",
            "plans": [
                { "id": 401, "name": "Super Saver Pack", "price": 199, "data": "1GB/day", "validity": "28 days", "benefits": "Unlimited Calls", "bestseller": false, "description": "Economical plan for basic users. Sufficient data for essential communication and light browsing." },
                { "id": 402, "name": "Budget Data Pack", "price": 149, "data": "500MB/day", "validity": "28 days", "benefits": "Basic Calls & SMS", "bestseller": true, "description": "Our most affordable recharge pack. Perfect for users who primarily need calling benefits with minimal data usage." },
                { "id": 403, "name": "Mini Recharge", "price": 99, "data": "200MB/day", "validity": "14 days", "benefits": "100 mins calling", "bestseller": false, "description": "Short-term budget plan for occasional users or as a backup recharge option." },
                { "id": 404, "name": "Emergency Recharge", "price": 49, "data": "100MB", "validity": "7 days", "benefits": "50 mins calling", "bestseller": false, "description": "Emergency top-up for when you need minimal connectivity for a short period." }
            ]
        },
        {
            "category": "Entertainment",
            "plans": [
                { "id": 601, "name": "OTT Special", "price": 599, "data": "2.5GB/day", "validity": "28 days", "benefits": "Disney+ Hotstar, Prime Video", "bestseller": true, "description": "Ultimate entertainment pack with premium OTT subscriptions included for non-stop streaming." },
                { "id": 602, "name": "Weekend Binge", "price": 349, "data": "1.5GB/day + Unlimited Weekend", "validity": "28 days", "benefits": "Sony LIV subscription", "bestseller": false, "description": "Special weekend unlimited data allocation for binge-watching your favorite content without restrictions." },
                { "id": 603, "name": "Gaming Pack", "price": 499, "data": "2GB/day + Gaming Bonus", "validity": "28 days", "benefits": "Low Ping Gaming Network", "bestseller": false, "description": "Optimized for online gaming with reduced latency network paths and special nighttime gaming data bonus." },
                { "id": 604, "name": "Music Unlimited", "price": 299, "data": "1.5GB/day", "validity": "28 days", "benefits": "Spotify Premium", "bestseller": false, "description": "Special plan for music lovers with Spotify Premium subscription and optimized audio streaming." }
            ]
        },
        {
            "category": "Data Boosters",
            "plans": [
                { "id": 701, "name": "1-Day Booster", "price": 49, "data": "Unlimited Data for 24hrs", "validity": "1 day", "benefits": "Add-on to existing plan", "bestseller": true, "description": "Quick data boost for 24 hours. Perfect for days when you need extra data for downloads or streaming." },
                { "id": 702, "name": "Weekend Pass", "price": 89, "data": "15GB", "validity": "2 days", "benefits": "Valid Saturday-Sunday only", "bestseller": false, "description": "Weekend-only data pack with high-speed allocation for your entertainment needs." },
                { "id": 703, "name": "Work Week Booster", "price": 199, "data": "2GB/day extra", "validity": "5 days", "benefits": "Monday-Friday Only", "bestseller": false, "description": "Workweek data booster providing extra data allocation during business days for professionals." }
            ]
        }
    ]
};

// Global variables
let plansToShow = 8; // Initial number of plans to show
const plansIncrement = 4; // Number of plans to add when "View More" is clicked
let subscriberData = []; // Will store subscriber data from JSON
let selectedPlanDetails = null; // Store details of the plan being viewed

// Function to fetch subscriber data
async function fetchSubscriberData() {
    try {
        const response = await fetch("Subscriber.json");
        const data = await response.json();
        subscriberData = data.users;
        return data.users;
    } catch (error) {
        console.error("Error fetching subscriber data:", error);
        return [];
    }
}

// Function to check if a phone number exists in subscribers
function isValidSubscriber(phoneNumber) {
    // First ensure subscriberData is loaded
    if (!subscriberData || subscriberData.length === 0) {
        console.warn("Subscriber data not loaded yet");
        return false;
    }
    
    // Check if the number exists in subscriber data
    return subscriberData.some(user => user.phone === phoneNumber);
}


// Function to handle phone number input and verification
function setupPhoneNumberHandling() {
    const phoneInput = document.getElementById("phone-number");
    const changeButton = document.getElementById("change-number-btn");
    
    if (!phoneInput || !changeButton) return;
    
    // Check for quick recharge stored number first
    const quickRechargeNumber = localStorage.getItem("userPhone");
    const storedNumber = localStorage.getItem("phone");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const fromQuickRecharge = localStorage.getItem("fromQuickRecharge") === "true";
    
    // If quick recharge number exists, use it
    if (quickRechargeNumber && fromQuickRecharge) {
        phoneInput.value = quickRechargeNumber;
        phoneInput.readOnly = false; // Make it editable for quick recharge users
        phoneInput.classList.remove("text-muted");
        changeButton.style.display = "inline-block"; // Show the change button
    } 
    // Otherwise, use stored number if logged in
    else if (storedNumber && isLoggedIn) {
        phoneInput.value = storedNumber;
        phoneInput.readOnly = true;
        phoneInput.classList.remove("text-muted");
        changeButton.style.display = "inline-block";
    } 
    // If neither, show placeholder
    else {
        phoneInput.value = "Mobi Comm Number";
        phoneInput.classList.add("text-muted");
        changeButton.style.display = "none"; // Hide change button if not logged in
    }
    
    // Handle "Change" button click
    changeButton.addEventListener("click", function() {
        if (phoneInput.readOnly) {
            phoneInput.readOnly = false;
            phoneInput.focus();
            changeButton.textContent = "Save";
        } else {
            const newNumber = phoneInput.value.trim();
            
            // Verify the number exists in subscriber data
            if (isValidSubscriber(newNumber)) {
                // Update the appropriate storage based on where user came from
                if (fromQuickRecharge) {
                    localStorage.setItem("userPhone", newNumber);
                } else if (isLoggedIn) {
                    localStorage.setItem("phone", newNumber);
                }
                
                phoneInput.readOnly = true;
                changeButton.textContent = "Change";
                
                // Show confirmation toast
                showToast("Phone number updated successfully");
            } else {
                showToast("Invalid number! Please enter a registered Mobi Comm number", "error");
                // Restore original number
                phoneInput.value = fromQuickRecharge ? quickRechargeNumber : storedNumber;
            }
        }
    });
    
    // Handle focus/blur for placeholder text
    phoneInput.addEventListener("focus", function() {
        if (phoneInput.value === "Mobi Comm Number") {
            phoneInput.value = "";
            phoneInput.classList.remove("text-muted");
        }
    });
    
    phoneInput.addEventListener("blur", function() {
        if (phoneInput.value === "") {
            phoneInput.value = "Mobi Comm Number";
            phoneInput.classList.add("text-muted");
        }
    });
}

// Toast notification function (instead of alerts)
function showToast(message, type = "success") {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        toastContainer.className = "toast-container";
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = message;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.classList.add("fade-out");
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}

// Function to Render Plans (Improved filter by Category & Search Query)
function renderPlans(categoryFilter = null, searchQuery = "") {
    const container = document.getElementById("plans-container");
    if (!container) return;

    container.innerHTML = "";
    let matchedPlans = [];
    let searchLower = searchQuery.toLowerCase().trim();

    // If searching for a category name with "plan" keyword
    let searchingForCategory = false;
    let matchedCategory = null;
    
    if (searchLower) {
        // Check if search matches any category names
        rechargePlans.recharge_plans.forEach(category => {
            if (category.category.toLowerCase().includes(searchLower)) {
                searchingForCategory = true;
                matchedCategory = category.category;
            }
        });
    }
    
    // If searching for a category specifically, override category filter
    if (searchingForCategory && matchedCategory) {
        categoryFilter = matchedCategory;
        // Clear search query since we're using it as category filter
        searchLower = "";
    }

    // Get plans from all categories if no filter, or from the selected category
    rechargePlans.recharge_plans.forEach(category => {
        if (!categoryFilter || category.category === categoryFilter) {
            if (category.plans) {
                if (searchLower) {
                    // Filter by search query
                    const filteredPlans = category.plans.filter(plan => 
                        plan.name.toLowerCase().includes(searchLower) ||
                        plan.benefits.toLowerCase().includes(searchLower) ||
                        plan.description.toLowerCase().includes(searchLower) ||
                        // Add category as searchable field
                        category.category.toLowerCase().includes(searchLower)
                    );
                    matchedPlans = [...matchedPlans, ...filteredPlans];
                } else {
                    // No search query, include all plans from category
                    matchedPlans = [...matchedPlans, ...category.plans];
                }
            }
        }
    });

    // Sort bestsellers first
    matchedPlans.sort((a, b) => b.bestseller - a.bestseller);

    // Show "No results found" if no plans match
    if (matchedPlans.length === 0) {
        container.innerHTML = `<p class="no-results">No plans found matching your criteria. Try a different search or filter.</p>`;
        return;
    }

    // Determine how many plans to show (for View More functionality)
    const plansToDisplay = Math.min(plansToShow, matchedPlans.length);
    
    // Create plan cards for visible plans
    for (let i = 0; i < plansToDisplay; i++) {
        const plan = matchedPlans[i];
        addPlanCard(container, plan);
    }

    // Add "View More" button if there are more plans to show
    if (matchedPlans.length > plansToShow) {
        const viewMoreBtn = document.createElement("div");
        viewMoreBtn.className = "col-12 text-center mt-3";
        viewMoreBtn.innerHTML = `<button class="view-more-btn">View More Plans</button>`;
        
        viewMoreBtn.querySelector(".view-more-btn").addEventListener("click", function() {
            plansToShow += plansIncrement;
            renderPlans(categoryFilter, searchQuery);
        });
        
        container.appendChild(viewMoreBtn);
    }

    highlightSelectedPlan();
}

// Function to create a plan card
function addPlanCard(container, plan) {
    const card = document.createElement("div");
    card.classList.add("col-md-6", "col-lg-4", "mb-3");
    
    const cardContent = `
        <div class="card ${plan.bestseller ? 'bestseller' : ''}" data-id="${plan.id}">
            ${plan.bestseller ? '<span class="bestseller-badge">Bestseller</span>' : ''}
            <h3>${plan.name}</h3>
            <p class="price">₹${plan.price}</p>
            <p><strong>Data:</strong> ${plan.data}</p>
            <p><strong>Validity:</strong> ${plan.validity}</p>
            <p><small>${plan.benefits}</small></p>
            <div class="card-buttons">
                <button class="btn view-details-btn" onclick="viewPlanDetails(${plan.id})">View Details</button>
                <button class="btn recharge-btn" onclick="storeSelectedPlan(event, ${plan.id}, '${plan.name}', ${plan.price})">Recharge</button>
            </div>
        </div>
    `;
    
    card.innerHTML = cardContent;
    container.appendChild(card);
}

// Function to view plan details in a modal
function viewPlanDetails(planId) {
    // Find the plan details
    let planDetails = null;
    rechargePlans.recharge_plans.forEach(category => {
        if (category.plans) {
            const plan = category.plans.find(p => p.id === planId);
            if (plan) {
                planDetails = plan;
                selectedPlanDetails = plan;
            }
        }
    });
    
    if (!planDetails) return;
    
    // Create modal if it doesn't exist
    let modal = document.getElementById("plan-details-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "plan-details-modal";
        modal.className = "modal";
        document.body.appendChild(modal);
    }
    
    // Populate modal content
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal()">&times;</span>
            <h2>${planDetails.name} ${planDetails.bestseller ? '<span class="bestseller-tag">Bestseller</span>' : ''}</h2>
            <div class="plan-details">
                <div class="detail-row">
                    <span class="detail-label">Price:</span>
                    <span class="detail-value">₹${planDetails.price}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Data:</span>
                    <span class="detail-value">${planDetails.data}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Validity:</span>
                    <span class="detail-value">${planDetails.validity}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Benefits:</span>
                    <span class="detail-value">${planDetails.benefits}</span>
                </div>
                <div class="detail-row description">
                    <span class="detail-label">Description:</span>
                    <span class="detail-value">${planDetails.description}</span>
                </div>
            </div>
            <div class="modal-buttons">
                <button class="btn recharge-btn" onclick="storeSelectedPlan(event, ${planDetails.id}, '${planDetails.name}', ${planDetails.price})">Recharge Now</button>
                <button class="btn exit-btn" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    // Show the modal
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById("plan-details-modal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Function to Highlight the Selected Plan
function highlightSelectedPlan() {
    const selectedPlanId = localStorage.getItem("selectedPlan");

    document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("highlight");
    });

    if (selectedPlanId) {
        const selectedCard = document.querySelector(`.card[data-id="${selectedPlanId}"]`);
        if (selectedCard) {
            selectedCard.classList.add("highlight");
        }
    }
}

// Function to Store Selected Plan Details & proceed to payment
function storeSelectedPlan(event, planId, planName, planPrice) {
    event.preventDefault();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const fromQuickRecharge = localStorage.getItem("fromQuickRecharge") === "true";
    const quickRechargeNumber = localStorage.getItem("userPhone");

    // Allow recharge if user is logged in OR came from quick recharge with a valid number
    if (isLoggedIn || (fromQuickRecharge && quickRechargeNumber)) {
        localStorage.setItem("selectedPlan", planId);
        localStorage.setItem("selectedPlanName", planName);
        localStorage.setItem("selectedPlanPrice", planPrice);
        
        // Keep track of where user came from
        if (fromQuickRecharge) {
            localStorage.setItem("fromQuickRecharge", "true");
        }
        
        window.location.href = "./Payment.html";
    } else {
        // Show login prompt as a modal
        showLoginPrompt();
    }
}

// Function to show login prompt
function showLoginPrompt() {
    // Create login prompt modal if it doesn't exist
    let loginModal = document.getElementById("login-prompt-modal");
    if (!loginModal) {
        loginModal = document.createElement("div");
        loginModal.id = "login-prompt-modal";
        loginModal.className = "modal";
        document.body.appendChild(loginModal);
    }
    
    // Populate modal content
    loginModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="closeLoginPrompt()">&times;</span>
            <h2>Login Required</h2>
            <p>Please log in to proceed with the recharge.</p>
            <div class="modal-buttons">
                <button class="btn primary-btn" onclick="redirectToLogin()">Log In</button>
                <button class="btn secondary-btn" onclick="closeLoginPrompt()">Cancel</button>
            </div>
        </div>
    `;
    
    // Show the modal
    loginModal.style.display = "block";
}

// Function to close the login prompt
function closeLoginPrompt() {
    const loginModal = document.getElementById("login-prompt-modal");
    if (loginModal) {
        loginModal.style.display = "none";
    }
}

// Function to redirect to login page
function redirectToLogin() {
    window.location.href = "phone.html";
    closeLoginPrompt();
}

// Function to Filter Plans by Category
function filterPlans(category, buttonElement) {
    // Update active button
    if (buttonElement) {
        document.querySelectorAll(".list-group-item").forEach(btn => {
            btn.classList.remove("active");
        });
        buttonElement.classList.add("active");
    }
    
    // Reset plans to show counter when changing categories
    plansToShow = 8;
    
    // Render the filtered plans
    renderPlans(category, document.getElementById("search-bar").value || "");
    
    // Store selected category
    localStorage.setItem("selectedCategory", category);
}

// Function to handle search input
function searchPlans() {
    const searchQuery = document.getElementById("search-bar").value;
    const lastCategory = localStorage.getItem("selectedCategory") || null;
    
    // Reset plans to show counter when searching
    plansToShow = 8; // Increased from 4 to show more initial results
    
    // Check if search is for a category
    if (searchQuery.toLowerCase().includes("plan")) {
        // Reset category buttons
        document.querySelectorAll(".list-group-item").forEach(btn => {
            btn.classList.remove("active");
        });
        
        // Set "All Plans" as active if we're potentially searching for a category
        const allPlansBtn = document.getElementById("all-plans-btn");
        if (allPlansBtn) {
            allPlansBtn.classList.add("active");
        }
        
        localStorage.removeItem("selectedCategory");
        renderPlans(null, searchQuery);
    } else {
        renderPlans(lastCategory, searchQuery);
    }
}

// Function to check login status and handle display
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const fromQuickRecharge = localStorage.getItem("fromQuickRecharge") === "true";
    const quickRechargeNumber = localStorage.getItem("userPhone");
    const phoneDisplay = document.getElementById("phone-number");
    const changeButton = document.getElementById("change-number-btn");
    
    if (phoneDisplay) {
        if (isLoggedIn) {
            const userPhone = localStorage.getItem("phone");
            if (userPhone) {
                phoneDisplay.value = userPhone;
                phoneDisplay.readOnly = true;
                phoneDisplay.classList.remove("text-muted");
                if (changeButton) changeButton.style.display = "inline-block";
            }
        } else if (quickRechargeNumber && fromQuickRecharge) {
            phoneDisplay.value = quickRechargeNumber;
            phoneDisplay.readOnly = false; // Editable for quick recharge users
            phoneDisplay.classList.remove("text-muted");
            if (changeButton) changeButton.style.display = "inline-block";
        } else {
            phoneDisplay.value = "Mobi Comm Number";
            phoneDisplay.classList.add("text-muted");
            if (changeButton) changeButton.style.display = "none";
        }
    }
}

// Function to handle filter button click
function handleFilterClick() {
    const filterBtn = document.getElementById("filter-btn");
    if (!filterBtn) return;
    
    filterBtn.addEventListener("click", function() {
        // Create filter modal instead of alerts
        let filterModal = document.getElementById("filter-modal");
        if (!filterModal) {
            filterModal = document.createElement("div");
            filterModal.id = "filter-modal";
            filterModal.className = "modal";
            document.body.appendChild(filterModal);
        }
        
        // Populate filter modal
        filterModal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal" onclick="closeFilterModal()">&times;</span>
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
                    <button class="btn secondary-btn" onclick="closeFilterModal()">Cancel</button>
                </div>
            </div>
        `;
        
        // Show the modal
        filterModal.style.display = "block";
    });
}

// Function to close filter modal
function closeFilterModal() {
    const filterModal = document.getElementById("filter-modal");
    if (filterModal) {
        filterModal.style.display = "none";
    }
}

// Function to apply filters
function applyFilters() {
    const maxPrice = document.getElementById("max-price").value;
    const minData = document.getElementById("min-data").value;
    const minValidity = document.getElementById("min-validity").value;
    
    // Reset plans to show counter when filtering
    plansToShow = 8;
    
    // Get current category and search
    const lastCategory = localStorage.getItem("selectedCategory") || null;
    const searchQuery = document.getElementById("search-bar").value || "";
    
    // Filter plans based on criteria
    let filteredPlans = [];
    
    rechargePlans.recharge_plans.forEach(category => {
        if (category.category && (!lastCategory || category.category === lastCategory)) {
            if (category.plans) {
                // Apply filters
                const filtered = category.plans.filter(plan => {
                    // Price filter
                    if (maxPrice && plan.price > parseInt(maxPrice)) {
                        return false;
                    }
                    
                    // Data filter - need to parse data strings
                    if (minData) {
                        const dataValue = parseDataValue(plan.data);
                        if (dataValue < parseFloat(minData)) {
                            return false;
                        }
                    }
                    
                    // Validity filter - need to parse validity strings
                    if (minValidity) {
                        const validityDays = parseValidityDays(plan.validity);
                        if (validityDays < parseInt(minValidity)) {
                            return false;
                        }
                    }
                    
                    // Search filter
                    if (searchQuery.trim() !== "") {
                        if (!plan.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                            !plan.benefits.toLowerCase().includes(searchQuery.toLowerCase()) &&
                            !plan.description.toLowerCase().includes(searchQuery.toLowerCase())) {
                            return false;
                        }
                    }
                    
                    return true;
                });
                
                filteredPlans = [...filteredPlans, ...filtered];
            }
        }
    });
    
    
    // Render filtered plans
    const container = document.getElementById("plans-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    // Show "No results found" if no plans match
    if (filteredPlans.length === 0) {
        container.innerHTML = `<p class="no-results">No plans found matching your criteria. Try different filters.</p>`;
        closeFilterModal();
        return;
    }
    
    // Determine how many plans to show
    const plansToDisplay = Math.min(plansToShow, filteredPlans.length);
    
    // Create plan cards for visible plans
    for (let i = 0; i < plansToDisplay; i++) {
        const plan = filteredPlans[i];
        addPlanCard(container, plan);
    }
    
    // Add "View More" button if there are more plans to show
    if (filteredPlans.length > plansToShow) {
        const viewMoreBtn = document.createElement("div");
        viewMoreBtn.className = "col-12 text-center mt-3";
        viewMoreBtn.innerHTML = `<button class="view-more-btn">View More Plans</button>`;
        
        viewMoreBtn.querySelector(".view-more-btn").addEventListener("click", function() {
            plansToShow += plansIncrement;
            applyFilters();
        });
        
        container.appendChild(viewMoreBtn);
    }
    
    highlightSelectedPlan();
    closeFilterModal();
}

// Helper function to parse data values from strings like "1.5GB/day", "50GB total"
function parseDataValue(dataStr) {
    const match = dataStr.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
}

// Helper function to parse validity days from strings like "28 days"
function parseValidityDays(validityStr) {
    const match = validityStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

// Initialize everything when the DOM is loaded
document.addEventListener("DOMContentLoaded", async function() {
    // Fetch subscriber data first
    await fetchSubscriberData();
    
    // Setup phone number handling
    setupPhoneNumberHandling();
    
    // Check login status
    checkLoginStatus();
    
    // Setup event listeners for search
    const searchInput = document.getElementById("search-bar");
    if (searchInput) {
        searchInput.addEventListener("input", searchPlans);
    }
    
    // Setup event listener for filter button
    handleFilterClick();
    
    // Initialize plans display - default to "All Plans" if no category selected
    const lastCategory = localStorage.getItem("selectedCategory") || null;
    
    // Set the correct active button
    if (lastCategory) {
        const categoryButtons = document.querySelectorAll(".list-group-item");
        categoryButtons.forEach(button => {
            if (button.textContent === lastCategory) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    } else {
        // If no category selected, activate "All Plans" button
        const allPlansBtn = document.getElementById("all-plans-btn");
        if (allPlansBtn) {
            allPlansBtn.classList.add("active");
        }
    }
    
    // Render all plans by default
    renderPlans(lastCategory);
    
    // Add CSS for modals and toasts
    addCustomStyles();
});

// Function to add custom CSS

