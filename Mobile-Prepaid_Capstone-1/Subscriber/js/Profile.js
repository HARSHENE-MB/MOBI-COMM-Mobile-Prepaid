 // Load user data from JSON
 async function loadUserData() {
    try {
        const response = await fetch('./Subscriber.json');
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error loading user data:', error);
        return null;
    }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", async function() {
    // Check if user is logged in
    let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    let userData = null;
    let userPhone = localStorage.getItem("phone") || "";
    
    // Redirect to login if not logged in
    if (!isLoggedIn) {
        window.location.href = "phone.html";
        return;
    }
    
    // Try to load user data
    try {
        userData = await loadUserData();
    } catch (error) {
        console.log("Could not load user data, using defaults");
    }
    
    // Update UI based on login status
    updateAuthUI(isLoggedIn);
    
    // Load default content (profile)
    loadContent('profile');
    
    // Attach event listener for logout
    document.getElementById("logout-btn").addEventListener("click", logout);
    
    // Setup FAQ toggle functionality
    setupFAQToggle();
});

// Load the user profile with actual data
function loadUserProfile(phoneNumber, userData) {
    let user = null;
    
    if (userData && Array.isArray(userData)) {
        user = userData.find(u => u.phoneNumber === phoneNumber);
    }
    
    // Default user if not found in data
    if (!user) {
        user = {
            name: "Harshene",
            phoneNumber: phoneNumber || localStorage.getItem("phone") || "9876543210",
            joinDate: "January 2023"
        };
    }
    
    // Update displayed user name
    const userProfileInfo = document.getElementById("user-profile-info");
    if (userProfileInfo) {
        userProfileInfo.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Number:</strong> ${user.phoneNumber}</p>
            <p><strong>Account Type:</strong> Prepaid</p>
            <p><strong>Status:</strong> <span class="badge bg-success">Active</span></p>
            <p><strong>Joined:</strong> ${user.joinDate || "January 2023"}</p>
        `;
    }
}

// Update Authentication UI
function updateAuthUI(isLoggedIn) {
    const loginBtn = document.getElementById("login-btn");
    const profileDropdown = document.getElementById("profile-dropdown");

    if (loginBtn) {
        loginBtn.style.display = isLoggedIn ? "none" : "block";
    }
    
    if (profileDropdown) {
        profileDropdown.style.display = isLoggedIn ? "inline-block" : "none";
    }
}

// Toggle the dropdown menu
function toggleDropdown() {
    const dropdown = document.getElementById("dropdown-menu");
    if (dropdown) {
        dropdown.classList.toggle("show");
        
        // Close dropdown when clicking outside
        if (dropdown.classList.contains("show")) {
            document.addEventListener('click', function closeDropdown(e) {
                if (!e.target.closest('#profile-dropdown')) {
                    dropdown.classList.remove('show');
                    document.removeEventListener('click', closeDropdown);
                }
            });
        }
    }
}

// Logout functionality
function logout() {
    // Clear all authentication data
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("phone");
    localStorage.removeItem("otp");
    
    // Redirect to login page
    window.location.href = "index.html";
}

// Setup FAQ toggle functionality
function setupFAQToggle() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('faq-question') || e.target.closest('.faq-question')) {
            const question = e.target.classList.contains('faq-question') ? e.target : e.target.closest('.faq-question');
            const answer = question.nextElementSibling;
            
            // Toggle active class on question
            question.classList.toggle('active');
            
            // Toggle show class on answer
            if (answer && answer.classList.contains('faq-answer')) {
                if (answer.classList.contains('show')) {
                    answer.classList.remove('show');
                } else {
                    // Close any open answers first
                    document.querySelectorAll('.faq-answer.show').forEach(a => {
                        a.classList.remove('show');
                        a.previousElementSibling.classList.remove('active');
                    });
                    answer.classList.add('show');
                }
            }
        }
    });
}

// Highlight the active sidebar link
function highlightActiveLink(section) {
    // Get all sidebar links
    const links = document.querySelectorAll('.sidebar a');
    
    // Remove active class from all links
    links.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to the clicked link
    const linkId = section + '-link';
    const activeLink = document.getElementById(linkId);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Generate and download invoice PDF
function downloadInvoice() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add header
        doc.setFontSize(22);
        doc.setTextColor(220, 53, 69);
        doc.text("Your Telecom", 105, 20, { align: 'center' });
        
        doc.setFontSize(16);
        doc.setTextColor(100, 100, 100);
        doc.text("Invoice Receipt", 105, 30, { align: 'center' });
        
        // Add separator line
        doc.setDrawColor(220, 53, 69);
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);
        
        // Add customer info
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("Invoice To:", 20, 50);
        
        let userName = "Harshene";
        let userPhone = localStorage.getItem("phone") || "9876543210";
        
        doc.setTextColor(80, 80, 80);
        doc.text(userName, 20, 60);
        doc.text("Phone: " + userPhone, 20, 70);
        
        // Add invoice details
        doc.setTextColor(0, 0, 0);
        doc.text("Invoice Details:", 120, 50);
        
        let invoiceNum = "INV-" + Math.floor(10000000 + Math.random() * 90000000);
        let date = new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        
        doc.setTextColor(80, 80, 80);
        doc.text("Invoice Number: " + invoiceNum, 120, 60);
        doc.text("Date: " + date, 120, 70);
        
        // Add invoice table header
        doc.setFillColor(240, 240, 240);
        doc.rect(20, 85, 170, 10, 'F');
        doc.setTextColor(0, 0, 0);
        doc.text("Description", 25, 92);
        doc.text("Price", 160, 92);
        
        // Add invoice items
        doc.setTextColor(80, 80, 80);
        doc.text("Mobile Plan (28 days)", 25, 105);
        doc.text("₹500", 160, 105);
        
        doc.setTextColor(80, 80, 80);
        doc.text("Total", 25, 120);
        doc.text("₹500", 160, 120);
        
        // Save the PDF
        doc.save("Invoice.pdf");
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert("Could not generate PDF. Please try again later.");
    }
}

function loadContent(section) {
    // Get the content element
    let content = document.getElementById("content");
    if (!content) return;
    
    // Highlight the active link in sidebar
    highlightActiveLink(section);
    
    // Fade out effect
    content.style.opacity = "0";

    setTimeout(() => {
        if (section === "profile") {
            content.innerHTML = `
                <div class="profile-card">
                    <h5><i class="fas fa-user-circle"></i> User Profile</h5>
                    <div id="user-profile-info">
                        <p><strong>Name:</strong> Harshene</p>
                        <p><strong>Number:</strong> ${localStorage.getItem("phone") || "9876543210"}</p>
                        <p><strong>Account Type:</strong> Prepaid</p>
                        <p><strong>Status:</strong> <span class="badge bg-success">Active</span></p>
                    </div>
                </div>

                <div class="profile-card">
                    <h5><i class="fas fa-chart-pie"></i> Data Usage</h5>
                    <p><strong>Used:</strong> <span id="data-used">1.99 GB</span></p>
                    <p><strong>Total:</strong> <span id="data-total">2 GB</span></p>
                    <div class="progress-bar">
                        <div class="progress-fill" id="data-progress" style="width: 99%;"></div>
                    </div>
                    <p class="text-muted" id="data-renewal">Renews in 11 hours</p>
                </div>

                <div class="profile-card plan-card">
                    <h5><i class="fas fa-table"></i> Current Plan</h5>
                    <p><strong>Plan:</strong> <span id="current-plan">1GB/day - 28 days</span></p>
                    <p><strong>Calls:</strong> <span id="call-info">Unlimited - 56 min</span></p>
                    <button class="btn btn-danger" onclick="window.location.href='./Prepaid.html'"><i class="fas fa-plus-circle"></i> Additional Plans</button>
                </div>
            `;
            // Update user profile after content is loaded
            const userPhone = localStorage.getItem("phone") || "9876543210";
            loadUserProfile(userPhone, null);
        } else if (section === "settings") {
            content.innerHTML = `
                <div class="profile-card">
                    <h5><i class="fas fa-cog"></i> Profile Management</h5>
                    <form id="settings-form">
                        <div class="mb-2">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" id="name" class="form-control" value="Harshene" disabled>
                        </div>
                        <div class="mb-2">
                            <label for="number" class="form-label">Mobile Number</label>
                            <input type="text" id="number" class="form-control" value="${localStorage.getItem("phone") || "9876543210"}" disabled>
                        </div>
                        <div class="mb-2">
                            <label for="address" class="form-label">Address</label>
                            <textarea id="address" class="form-control" rows="2" disabled>123 Street, City, Country</textarea>
                        </div>
                        <div class="mb-2">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" id="email" class="form-control" placeholder="Enter your email" value="${sessionStorage.getItem("email") || ''}">
                        </div>
                        <div class="mb-2">
                            <label for="alt-number" class="form-label">Alternate Contact Number</label>
                            <input type="text" id="alt-number" class="form-control" placeholder="Enter alternate number" value="${sessionStorage.getItem("altNumber") || ''}">
                        </div>
                        <div class="mb-2">
                            <label for="language" class="form-label">Preferred Communication Language</label>
                            <select id="language" class="form-select">
                                <option value="english">English</option>
                                <option value="hindi">Hindi</option>
                                <option value="tamil">Tamil</option>
                                <option value="telugu">Telugu</option>
                                <option value="kannada">Kannada</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-danger w-100">Save Changes</button>
                    </form>
                </div>
        
                <!-- Toast Notification -->
                <div id="toast" style="position: fixed; bottom: 20px; right: 20px; background-color: #333; color: #fff; padding: 12px 20px; border-radius: 8px; display: none; z-index: 9999;">
                    Changes saved successfully!
                </div>
            `;
        
            setTimeout(() => {
                const savedLanguage = sessionStorage.getItem("language");
                if (savedLanguage) {
                    document.getElementById("language").value = savedLanguage;
                }
        
                document.getElementById("settings-form").addEventListener("submit", function (e) {
                    e.preventDefault();
        
                    const email = document.getElementById("email").value;
                    const altNumber = document.getElementById("alt-number").value;
                    const language = document.getElementById("language").value;
        
                    sessionStorage.setItem("email", email);
                    sessionStorage.setItem("altNumber", altNumber);
                    sessionStorage.setItem("language", language);
        
                    showToast();
                });
        
                function showToast() {
                    const toast = document.getElementById("toast");
                    toast.style.display = "block";
                    setTimeout(() => {
                        toast.style.opacity = "1";
                    }, 100); // slight delay for fade-in effect
                    setTimeout(() => {
                        toast.style.opacity = "0";
                        setTimeout(() => {
                            toast.style.display = "none";
                        }, 500); // match fade-out duration
                    }, 3000); // show for 3 seconds
                }
            }, 100);
        }
        else if (section === "transactions") {
            const invoices = [
                { number: "#INV-" + Math.floor(10000000 + Math.random() * 90000000), date: "18th February 2025", total: "₹500" },
                { number: "#INV-" + Math.floor(10000000 + Math.random() * 90000000), date: "5th January 2025", total: "₹299" },
                { number: "#INV-" + Math.floor(10000000 + Math.random() * 90000000), date: "20th December 2024", total: "₹199" }
            ];
        
            let invoiceCards = invoices.map((invoice, index) => `
                <div class="profile-card">
                    <h5><i class="fas fa-receipt"></i> Invoice ${index + 1}</h5>
                    <div class="invoice-container">
                        <h6>Invoice Details</h6>
                        <p>Invoice Number: ${invoice.number}</p>
                        <p>Date: ${invoice.date}</p>
                        <p>Total: ${invoice.total}</p>
                        <button class="download-button" onclick="downloadInvoice('${invoice.number}', '${invoice.date}', '${invoice.total}')">
                            <i class="fas fa-download"></i> Download PDF
                        </button>
                    </div>
                </div>
            `).join('');
        
            content.innerHTML = `
                <div class="profile-card plan-card">
                    <h5><i class="fas fa-table"></i> Plan</h5>
                    <div class="plan-details">
                        <span class="price">₹299</span>
                        <span class="expiry-label">EXPIRING IN <span id="expiry-days">3</span> DAYS</span>
                    </div>
                    <p>Expires on <strong id="expiry-date">06 March, 2025</strong></p>
                    <div class="button-container">
                        <button class="recharge-btn" onclick="window.location.href='./index.html#zen'">Recharge</button>
                        <button class="view-plan-btn" onclick="window.location.href='./Prepaid.html'">View plan</button>
                    </div>
                </div>
        
                ${invoiceCards}
            `;
        }
         else if (section === "recharge") {
            content.innerHTML = `
                <div class="profile-card">
                    <h5><i class="fas fa-history"></i> Recharge History</h5>
                    <ul class="history-list">
                        <li class="history-item">
                            <span class="history-date">01 Feb 2025</span>
                            <span class="history-amount">₹500</span>
                            <span class="history-status status-success">Successful</span>
                        </li>
                        <li class="history-item">
                            <span class="history-date">15 Jan 2025</span>
                            <span class="history-amount">₹300</span>
                            <span class="history-status status-success">Successful</span>
                        </li>
                        <li class="history-item">
                            <span class="history-date">05 Jan 2025</span>
                            <span class="history-amount">₹200</span>
                            <span class="history-status status-failed">Failed</span>
                        </li>
                        <li class="history-item">
                            <span class="history-date">20 Dec 2024</span>
                            <span class="history-amount">₹400</span>
                            <span class="history-status status-success">Successful</span>
                        </li>
                        <li class="history-item">
                            <span class="history-date">10 Dec 2024</span>
                            <span class="history-amount">₹250</span>
                            <span class="history-status status-success">Successful</span>
                        </li>
                    </ul>
                </div>
                <div class="profile-card">
                    <h5><i class="fas fa-credit-card"></i> Payment Details</h5>
                    <div class="payment-method">
                        <i class="fas fa-credit-card"></i>
                        <div>
                            <p>Card: **** **** **** 1234</p>
                            <p>Expiry: 08/26</p>
                            <p>Payment Method: Credit Card</p>
                            <p>Last Transaction: ₹500 on 01 Feb 2025</p>
                        </div>
                    </div>
                </div>
            `;
        }  else if (section === "support") {
    content.innerHTML = `
        <div class="faq-container">
            <h5>Frequently Asked Questions</h5>
            <div class="faq-box">
                <div class="faq-question">1. How can I check my balance?</div>
                <div class="faq-answer">You can check your balance by dialing *123# or using the mobile app.</div>
            </div>
            <div class="faq-box">
                <div class="faq-question">2. How do I recharge my prepaid number?</div>
                <div class="faq-answer">You can recharge using online banking, UPI apps, retailer shops, or by dialing *123*Recharge Code#.</div>
            </div>
            <div class="faq-box">
                <div class="faq-question">3. How can I check my data usage?</div>
                <div class="faq-answer">To check data usage, dial *121# or visit the operator's website or mobile app.</div>
            </div>

            <h5>Ask a Question</h5>
            <form class="ask-form">
                <input type="text" id="question" placeholder="Enter your question here..." required>
                <textarea id="questionDetail" rows="3" placeholder="Provide more details..." required></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    `;
    // Re-initialize FAQ toggle functionality
    setupFAQToggle();
}

content.style.opacity = "1"; // Fade in effect

// Update active link after content is loaded
setTimeout(highlightActiveLink, 100);
}, 300); // Delay to match transition effect
}