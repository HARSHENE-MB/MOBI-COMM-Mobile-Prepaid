// Fetch subscribers from JSON file
let subscribers = [];
let rechargePlans = {
    "recharge_plans": [
        { "category": "Family Plan",
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

let selectedCategory = null;
let selectedUser = null;
let currentPage = 1;
let itemsPerPage = 10;

// Initialize sidebar toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile sidebar toggle
    const sidebarToggle = document.getElementById('mobileSidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
    
    // Handle sidebar collapse button
    const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
    const mainContent = document.getElementById('main-content');
    
    if (sidebarCollapseBtn) {
        sidebarCollapseBtn.addEventListener('click', function() {
            sidebar.classList.toggle('sidebar-collapsed');
            mainContent.classList.toggle('main-content-expanded');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickInsideToggle = sidebarToggle && sidebarToggle.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickInsideToggle && window.innerWidth < 992 && sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
        }
    });
    
    // Load data
    fetchSubscribers();
});

// Fetch subscribers from JSON file
function fetchSubscribers() {
    fetch('/Mobile-Pepaid-Capstone I/admin/js/Subscribers.json')
        .then(response => response.json())
        .then(data => {
            subscribers = data.subscribers;
            sortSubscribers();
            updateDashboard();
            loadUsers();
            loadCategories();
            setupPagination();
        })
        .catch(error => console.error('Error loading subscribers:', error));
}

// Sort subscribers by expiry date
function sortSubscribers() {
    subscribers.sort((a, b) => new Date(a.expiry) - new Date(b.expiry));
}

// Update Dashboard Stats
function updateDashboard() {
    let totalSubscribers = subscribers.length;
    let expiringSoon = subscribers.filter(s => isExpiringSoon(s.expiry)).length;
    let activePlans = subscribers.filter(s => isActivePlan(s.expiry) && s.status === "active").length;

    document.getElementById("totalSubscribers").textContent = totalSubscribers;
    document.getElementById("expiringSoon").textContent = expiringSoon;
    document.getElementById("activePlans").textContent = activePlans;
}

// Check if subscriber expires in 3 days
function isExpiringSoon(expiry) {
    let expiryDate = new Date(expiry);
    let today = new Date();
    let diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 3;
}

// Check if the plan is active
function isActivePlan(expiry) {
    let expiryDate = new Date(expiry);
    let today = new Date();
    return expiryDate >= today;
}

// Load Categories function
function loadCategories() {
    // Implementation would go here
    // This is a placeholder for the function called in the fetch callback
    console.log("Categories loaded");
}

// Load Subscribers Table with pagination
function loadUsers() {
    let tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = "";
    
    // Calculate pagination parameters
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = Math.min(startIndex + itemsPerPage, subscribers.length);
    let paginatedSubscribers = subscribers.slice(startIndex, endIndex);
    
    paginatedSubscribers.forEach(subscriber => {
        let statusBadge = subscriber.status === "active" ? 
            '<span class="badge bg-success">Active</span>' :
            '<span class="badge bg-danger">Inactive</span>';
        
        let rowClass = isExpiringSoon(subscriber.expiry) ? 'table-warning' : '';
        
        let row = `
            <tr class="${rowClass}">
                <td>${subscriber.id}</td>
                <td>${subscriber.name}</td>
                <td>${subscriber.phone}</td>
                <td>${subscriber.expiry}</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="viewUser(${subscriber.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm ${subscriber.status === 'active' ? 'btn-outline-warning' : 'btn-outline-success'}" 
                        onclick="toggleStatus(${subscriber.id})">
                        <i class="fas ${subscriber.status === 'active' ? 'fa-toggle-on' : 'fa-toggle-off'}"></i>
                    </button>
                </td>
            </tr>`;
        tableBody.innerHTML += row;
    });
}

// Setup pagination UI
function setupPagination() {
    const totalPages = Math.ceil(subscribers.length / itemsPerPage);
    let paginationElement = document.getElementById("pagination");
    
    // If the pagination element doesn't exist, create it
    if (!paginationElement) {
        const tableContainer = document.querySelector(".table-responsive");
        paginationElement = document.createElement("nav");
        paginationElement.id = "pagination";
        paginationElement.setAttribute("aria-label", "Page navigation");
        paginationElement.classList.add("d-flex", "justify-content-center", "mt-3");
        tableContainer.after(paginationElement);
    }
    
    paginationElement.innerHTML = `
        <ul class="pagination">
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" aria-label="Previous" onclick="changePage(${currentPage - 1})">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
    `;
    
    for (let i = 1; i <= totalPages; i++) {
        paginationElement.querySelector('ul').innerHTML += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }
    
    paginationElement.querySelector('ul').innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" aria-label="Next" onclick="changePage(${currentPage + 1})">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    `;
}

// Change page function
function changePage(page) {
    // Validate page number
    const totalPages = Math.ceil(subscribers.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    loadUsers();
    setupPagination();
    
    // Scroll to top of table
    document.querySelector(".table-responsive").scrollIntoView({ behavior: 'smooth' });
    
    // Prevent default link action
    event.preventDefault();
}

// Toggle user activation status from table
function toggleStatus(id) {
    const user = subscribers.find(u => u.id === id);
    if (user) {
        user.status = user.status === "active" ? "inactive" : "active";
        loadUsers();
        updateDashboard();
        setupPagination();
    }
}

// Toggle user status from modal
function toggleUserStatus() {
    if (selectedUser) {
        selectedUser.status = selectedUser.status === "active" ? "inactive" : "active";
        
        // Update UI elements
        const statusBadge = document.getElementById("userStatus");
        const toggleBtn = document.getElementById("toggleStatusBtn");
        
        if (selectedUser.status === "active") {
            statusBadge.className = "badge bg-success mb-2";
            statusBadge.textContent = "Active";
            toggleBtn.className = "btn btn-warning";
            toggleBtn.textContent = "Deactivate";
        } else {
            statusBadge.className = "badge bg-danger mb-2";
            statusBadge.textContent = "Inactive";
            toggleBtn.className = "btn btn-success";
            toggleBtn.textContent = "Activate";
        }
        
        // Refresh the users table to reflect changes
        loadUsers();
        updateDashboard();
    }
} 

// Show user details in modal
function viewUser(id) {
    selectedUser = subscribers.find(u => u.id === id);
    if (!selectedUser) return alert("Subscriber not found!");

    // Update profile information
    document.getElementById("userName").textContent = selectedUser.name;
    document.getElementById("userPhone").textContent = selectedUser.phone;
    document.getElementById("userPlanExpiry").textContent = selectedUser.expiry;
    document.getElementById("userFullName").textContent = selectedUser.name;
    document.getElementById("userDOB").textContent = selectedUser.dob || 'N/A';
    document.getElementById("userGender").textContent = selectedUser.gender || 'N/A';
    document.getElementById("cardType").textContent = selectedUser.cardType || 'N/A';
    document.getElementById("cardHolder").textContent = selectedUser.cardHolder || 'N/A';
    document.getElementById("cardLastFour").textContent = selectedUser.cardLastFour || 'N/A';
    document.getElementById("cardExpiry").textContent = selectedUser.cardExpiry || 'N/A';

    // Set user status
    const statusBadge = document.getElementById("userStatus");
    const toggleBtn = document.getElementById("toggleStatusBtn");
    
    if (selectedUser.status === "active") {
        statusBadge.className = "badge bg-success mb-2";
        statusBadge.textContent = "Active";
        toggleBtn.className = "btn btn-warning";
        toggleBtn.textContent = "Deactivate";
    } else {
        statusBadge.className = "badge bg-danger mb-2";
        statusBadge.textContent = "Inactive";
        toggleBtn.className = "btn btn-success";
        toggleBtn.textContent = "Activate";
    }

    // Populate transaction history
    let transactionTable = document.getElementById("transactionHistory");
    transactionTable.innerHTML = "";
    
    selectedUser.transactions.forEach(tx => {
        let statusClass = tx.status === "Successful" ? "text-success" : "text-danger";
        let row = `
            <tr>
                <td>${tx.date}</td>
                <td>₹${tx.amount}</td>
                <td>${tx.method}</td>
                <td class="${statusClass}">${tx.status}</td>
            </tr>
        `;
        transactionTable.innerHTML += row;
    });

    // Show modal
    new bootstrap.Modal(document.getElementById("userDetailsModal")).show();
}

// Add Subscriber
function addUser() {
    // This would typically open a form modal to add a new user
    alert("This feature is under development.");
}

// Function to send notification to user
function sendNotification() {
    if (selectedUser) {
        // Display a confirmation message
        const statusMessage = document.createElement("div");
        statusMessage.className = "alert alert-success alert-dismissible fade show mt-3";
        statusMessage.innerHTML = `
            <strong>Success!</strong> Notification sent to ${selectedUser.name} at ${selectedUser.email}.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Add the message to the modal
        const modalBody = document.querySelector("#userDetailsModal .modal-body");
        modalBody.appendChild(statusMessage);
        
        // Auto-dismiss after 3 seconds
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(statusMessage);
            if (bsAlert) bsAlert.close();
        }, 3000);
    }
}

// Logout function
function logout() {
    alert("Logging out...");
}