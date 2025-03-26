let selectedUser = null;
let currentPage = 1;
let itemsPerPage = 10;
let customers = [];
let plans = [];

const apiUrl = "http://localhost:8083/api/users";

document.addEventListener('DOMContentLoaded', async function () {
    setupSidebarToggle();
    await fetchCustomers();
    await fetchPlans();
    updateDashboard();
    loadUsers();
    setupPagination();
});

function setupSidebarToggle() {
    const sidebarToggle = document.getElementById('mobileSidebarToggle');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('show');
        });
    }

    const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
    const mainContent = document.getElementById('main-content');

    if (sidebarCollapseBtn) {
        sidebarCollapseBtn.addEventListener('click', function () {
            sidebar.classList.toggle('sidebar-collapsed');
            mainContent.classList.toggle('main-content-expanded');
        });
    }

    document.addEventListener('click', function (event) {
        if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target) && window.innerWidth < 992) {
            sidebar.classList.remove('show');
        }
    });
}

async function fetchCustomers() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch users');
        customers = await response.json();
        customers = customers.filter(user => user.role.roleName === "customer");
        sortCustomers();
    } catch (error) {
        console.error('Error fetching customers:', error);
    }
}

async function fetchPlans() {
    try {
        const response = await fetch('http://localhost:8083/api/plans');
        if (!response.ok) throw new Error('Failed to fetch plans');
        plans = await response.json();
    } catch (error) {
        console.error('Error fetching plans:', error);
    }
}

function sortCustomers() {
    customers.sort((a, b) => new Date(a.expiry) - new Date(b.expiry));
}

function updateDashboard() {
    document.getElementById("totalSubscribers").textContent = customers.length;
    document.getElementById("expiringSoon").textContent = customers.filter(s => isExpiringSoon(s.expiry)).length;
    document.getElementById("activePlans").textContent = customers.filter(s => isActivePlan(s.expiry) && s.status === "active").length;
}

function isExpiringSoon(expiry) {
    let expiryDate = new Date(expiry);
    let today = new Date();
    return (expiryDate - today) / (1000 * 60 * 60 * 24) <= 3;
}

function isActivePlan(expiry) {
    return new Date(expiry) >= new Date();
}

// Load users into table
function loadUsers() {
    let tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = "";

    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = Math.min(startIndex + itemsPerPage, customers.length);
    let paginatedCustomers = customers.slice(startIndex, endIndex);

    paginatedCustomers.forEach((customer) => {
        let isActive = customer.status === "active";
        let statusBadge = isActive ? '<span class="badge bg-success status-label">Active</span>' : '<span class="badge bg-danger status-label">Inactive</span>';
        let rowClass = isExpiringSoon(customer.expiry) ? "table-warning" : "";

        let row = `
            <tr class="${rowClass}">
                <td>${customer.userId}</td>
                <td>${customer.fullName}</td>
                <td>${customer.phoneNumber}</td>
                <td>${customer.email}</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1 view-more" data-user-id="${customer.userId}">
                        <i class="fas fa-eye"></i>
                    </button>
                    
                    <button class="btn btn-sm btn-warning toggle-status">
                        <i class="fas fa-toggle-${isActive ? "on" : "off"}"></i>
                    </button>
                   
                </td>
            </tr>`;
        tableBody.innerHTML += row;
    });

    setupEventListeners();
    setupPagination();
}


// Function to open the user details modal and populate data
function openModal(userId) {
    let user = customers.find(c => c.userId == userId);
    if (!user) return;

    document.getElementById("userProfileImage").src = user.profileImage || "./sign in.png";
    document.getElementById("userName").textContent = user.fullName;
    document.getElementById("userStatus").textContent = user.status;
    document.getElementById("userStatus").className = `badge ${user.status === "active" ? "bg-success" : "bg-danger"}`;
    document.getElementById("userPhone").textContent = user.phoneNumber;
    document.getElementById("userFullName").textContent = user.fullName;
    document.getElementById("userUsername").textContent = user.username || "-";
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userRegisteredAt").textContent = new Date(user.registeredAt).toLocaleDateString();
    document.getElementById("userAddress").textContent = 
    user.address ? `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.country}, ${user.address.pinCode}` 
                 : "Not Available";
    
    let toggleBtn = document.getElementById("toggleStatusBtn");
    toggleBtn.textContent = user.status === "active" ? "Deactivate" : "Activate";
    toggleBtn.onclick = function() { toggleUserStatus(userId); };

    let modal = new bootstrap.Modal(document.getElementById("userDetailsModal"));
    modal.show();
}

// Function to toggle user status
function toggleUserStatus(userId) {
    let user = customers.find(c => c.userId == userId);
    if (!user) return;

    user.status = user.status === "active" ? "Inactive" : "Active";
    loadUsers();
    openModal(userId);
}

// Function to send notification
function sendNotification() {
    alert("Notification sent successfully!");
}


// function sendNotification(userId) {
//     let user = customers.find(c => c.userId == userId);
//     if (!user) return alert("User not found!");

//     fetch("/api/users/send-email", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             email: user.email,
//             fullName: user.fullName,
//             phoneNumber: user.phoneNumber,
//         }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             alert("Recharge reminder email sent successfully!");
//         } else {
//             alert("Failed to send email.");
//         }
//     })
//     .catch(error => console.error("Error sending email:", error));
// }



function setupEventListeners() {
    document.querySelectorAll(".view-more").forEach((button) => {
        button.addEventListener("click", function () {
            let userId = this.getAttribute("data-user-id");
            openModal(userId);
        });
    });

    document.querySelectorAll(".toggle-status").forEach((button) => {
        button.addEventListener("click", function () {
            let row = this.closest("tr");
            let statusLabel = row.querySelector(".status-label");
            let icon = this.querySelector("i");

            if (statusLabel.textContent.trim() === "Active") {
                statusLabel.textContent = "Inactive";
                statusLabel.classList.replace("bg-success", "bg-danger");
                icon.classList.replace("fa-toggle-on", "fa-toggle-off");
            } else {
                statusLabel.textContent = "Active";
                statusLabel.classList.replace("bg-danger", "bg-success");
                icon.classList.replace("fa-toggle-off", "fa-toggle-on");
            }
        });
    });

    document.querySelectorAll(".soft-delete").forEach((button) => {
        button.addEventListener("click", function () {
            let userId = this.getAttribute("data-user-id");
            softDeleteUser(userId);
        });
    });
}


// Setup event listeners for buttons
function setupEventListeners() {
    document.querySelectorAll(".view-more").forEach((button) => {
        button.addEventListener("click", function () {
            let userId = this.getAttribute("data-user-id");
            openModal(userId);
        });
    });

    document.querySelectorAll(".toggle-status").forEach((button) => {
        button.addEventListener("click", function () {
            let row = this.closest("tr");
            let statusLabel = row.querySelector(".status-label");
            let icon = this.querySelector("i");

            if (statusLabel.textContent.trim() === "Active") {
                statusLabel.textContent = "Inactive";
                statusLabel.classList.replace("bg-success", "bg-danger");
                icon.classList.replace("fa-toggle-on", "fa-toggle-off");
            } else {
                statusLabel.textContent = "Active";
                statusLabel.classList.replace("bg-danger", "bg-success");
                icon.classList.replace("fa-toggle-off", "fa-toggle-on");
            }
        });
    });

    document.querySelectorAll(".soft-delete").forEach((button) => {
        button.addEventListener("click", function () {
            let userId = this.getAttribute("data-user-id");
            softDeleteUser(userId);
        });
    });
}


function setupPagination() {
    let pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    let totalPages = Math.ceil(customers.length / itemsPerPage);
    document.getElementById("total-records").textContent = customers.length;

    if (totalPages <= 1) return;

    let prevDisabled = currentPage === 1 ? "disabled" : "";
    let nextDisabled = currentPage === totalPages ? "disabled" : "";

    pagination.innerHTML = `
        <li class="page-item ${prevDisabled}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})"><</a>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        let activeClass = currentPage === i ? "active" : "";
        pagination.innerHTML += `
            <li class="page-item ${activeClass}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }

    pagination.innerHTML += `
        <li class="page-item ${nextDisabled}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">></a>
        </li>
    `;
}

function changePage(page) {
    let totalPages = Math.ceil(customers.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    loadUsers();
}


function logout() {
    alert("Logging out...");
}


