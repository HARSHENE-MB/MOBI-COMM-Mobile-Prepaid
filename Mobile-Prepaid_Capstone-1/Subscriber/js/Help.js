document.addEventListener('DOMContentLoaded', function() {
    // Get the current page filename
    var path = window.location.pathname;
    var page = path.split("/").pop();
    
    // Select all nav links
    var navLinks = document.querySelectorAll('.navbar .nav-link');
    
    // Check each link and add active class based on current page
    navLinks.forEach(function(link) {
        var href = link.getAttribute('href');
        
        // For the home page
        if (page === "" || page === "/" || page === "index.html") {
            if (href === "./index.html") {
                link.classList.add('active');
            }
        }
        // For prepaid page
        else if (page === "Prepaid.html") {
            if (href === "./Prepaid.html") {
                link.classList.add('active');
            }
        }
        // For recharge section (if on the same page with #zen anchor)
        else if (window.location.hash === "#zen") {
            if (href === "#zen") {
                link.classList.add('active');
            }
        }
        // For help page
        else if (page === "help.html" || href === "#" && page !== "phone.html") {
            if (href === "#" && !link.querySelector('svg')) {
                link.classList.add('active');
            }
        }
        // For any other specific page match
        else if (href.includes(page)) {
            link.classList.add('active');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    let userDetails = JSON.parse(localStorage.getItem("userDetails")) || null;
    let profileDropdown = document.getElementById("profile-dropdown");
    let dropdownMenu = document.getElementById("dropdown-menu");

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
            dropdownMenu.classList.toggle("show");
        } else {
            window.location.href = "phone.html";
        }
    });

    document.getElementById("logout-btn")?.addEventListener("click", function () {
        logout();
    });

});

// Function to update profile dropdown with user's name
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

// Logout function
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
} 