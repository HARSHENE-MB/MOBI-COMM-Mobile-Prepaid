// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the mobile sidebar toggle button
    const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
    
    // Get the sidebar element
    const sidebar = document.querySelector('.sidebar');
    
    // Create overlay element for mobile
    let sidebarOverlay = document.createElement('div');
    sidebarOverlay.className = 'sidebar-overlay';
    document.body.appendChild(sidebarOverlay);
    
    // Function to toggle sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('show');
        sidebarOverlay.classList.toggle('show');
        
        // Prevent body scrolling when sidebar is open on mobile
        if (sidebar.classList.contains('show')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Add click event to toggle button
    if (mobileSidebarToggle) {
        mobileSidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Close sidebar when clicking the overlay
    sidebarOverlay.addEventListener('click', toggleSidebar);
    
    // Close sidebar when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992 && sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
            sidebarOverlay.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Dropdown toggle functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close all other dropdowns
            dropdownToggles.forEach(function(otherToggle) {
                if (otherToggle !== toggle) {
                    otherToggle.nextElementSibling.classList.remove('show');
                }
            });
            
            // Toggle current dropdown
            toggle.nextElementSibling.classList.toggle('show');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        dropdownToggles.forEach(function(toggle) {
            toggle.nextElementSibling.classList.remove('show');
        });
    });
    
    // Initialize notification badge
    updateNotificationBadge();
});

// Function to update notification badge
function updateNotificationBadge() {
    const notificationBadge = document.querySelector('.notification-badge');
    const notifications = document.querySelectorAll('.notification-item:not(.empty-notification)');
    
    if (notifications.length > 0) {
        notificationBadge.textContent = notifications.length;
        notificationBadge.classList.remove('d-none');
    } else {
        notificationBadge.classList.add('d-none');
    }
}

// Function to handle logout
function logout() {
    // You can add additional logout logic here
    localStorage.removeItem('authToken');
    window.location.href = 'admin-login.html';
}




document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar toggling
    initSidebar();
    
    // Initialize page navigation
    initPageNavigation();
    
    // Initialize chart visualizations
    initDashboardCharts();
    
    // Initialize analytics charts
    initAnalyticsCharts();
    
    // Initialize view details buttons
    initViewDetailsButtons();
    
    // Initialize notification system
    initNotifications();
    
    // Initialize logout functionality
    initLogout();
    
    // Update stats with random data for demo purposes
    updateRandomStats();
});

function initSidebar() {
    // Mobile sidebar toggle
    const mobileToggle = document.getElementById('mobileSidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Sidebar collapse button (for tablet view)
    const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
    
    if (sidebarCollapseBtn) {
        sidebarCollapseBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggleButton = mobileToggle && mobileToggle.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnToggleButton && window.innerWidth <= 768 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
}

function initPageNavigation() {
    const navLinks = document.querySelectorAll('.nav-links li a');
    const pageTitle = document.getElementById('pageTitle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => {
                navLink.parentElement.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Get the page id from data attribute
            const pageId = this.getAttribute('data-page');
            
            // Hide all pages
            document.querySelectorAll('.page-content').forEach(page => {
                page.classList.add('d-none');
            });
            
            // Show the selected page
            const selectedPage = document.getElementById(`${pageId}-page`);
            if (selectedPage) {
                selectedPage.classList.remove('d-none');
                
                // Update page title
                if (pageTitle) {
                    let titleText = this.querySelector('span').textContent;
                    if (pageId === 'dashboard') {
                        titleText += ' Overview';
                    }
                    pageTitle.textContent = titleText;
                }
                
                // Close sidebar on mobile after navigation
                if (window.innerWidth <= 768) {
                    document.getElementById('sidebar').classList.remove('active');
                }
            }
        });
    });
}

function initDashboardCharts() {
    // Revenue Trend Chart
    if (document.getElementById('revenueTrend')) {
        new Chart(document.getElementById('revenueTrend').getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue (₹)',
                    data: [38500, 42000, 40500, 41800, 42500, 45000],
                    borderColor: '#2196F3',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(33, 150, 243, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '₹' + context.raw.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value) {
                                return '₹' + (value / 1000) + 'K';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Plan Distribution Chart
    if (document.getElementById('planDistribution')) {
        new Chart(document.getElementById('planDistribution').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Family Plan', 'Data Booster', 'Student Pack', 'Basic'],
                datasets: [{
                    data: [35, 25, 20, 20],
                    backgroundColor: [
                        '#6f42c1',
                        '#2196F3',
                        '#4CAF50',
                        '#ff9800'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Payment Methods Chart
    if (document.getElementById('paymentMethods')) {
        new Chart(document.getElementById('paymentMethods').getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['UPI', 'Credit Card', 'Net Banking', 'Others'],
                datasets: [{
                    data: [45, 30, 15, 10],
                    backgroundColor: [
                        '#2196F3',
                        '#4CAF50',
                        '#ff9800',
                        '#f44336'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Data Usage Chart
    if (document.getElementById('dataUsage')) {
        new Chart(document.getElementById('dataUsage').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Basic', 'Standard', 'Premium', 'Family'],
                datasets: [{
                    label: 'Average Data Usage (GB)',
                    data: [25, 45, 65, 85],
                    backgroundColor: '#6f42c1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value + ' GB';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

function initAnalyticsCharts() {
    // Detailed Revenue Trend Chart
    if (document.getElementById('detailedRevenueTrend')) {
        new Chart(document.getElementById('detailedRevenueTrend').getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue (₹)',
                    data: [38500, 42000, 40500, 41800, 42500, 45000],
                    borderColor: '#2196F3',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(33, 150, 243, 0.1)'
                }, {
                    label: 'Expenses (₹)',
                    data: [25000, 26500, 27000, 26800, 27500, 28000],
                    borderColor: '#f44336',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(244, 67, 54, 0.1)'
                }, {
                    label: 'Profit (₹)',
                    data: [13500, 15500, 13500, 15000, 15000, 17000],
                    borderColor: '#4CAF50',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(76, 175, 80, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ₹' + context.raw.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value) {
                                return '₹' + (value / 1000) + 'K';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Detailed Plan Distribution Chart
    if (document.getElementById('detailedPlanDistribution')) {
        new Chart(document.getElementById('detailedPlanDistribution').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Family Plan', 'Data Booster', 'Student Pack', 'Basic'],
                datasets: [{
                    label: 'Number of Users',
                    data: [35, 25, 20, 20],
                    backgroundColor: [
                        '#6f42c1',
                        '#2196F3',
                        '#4CAF50',
                        '#ff9800'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Detailed Payment Methods Chart
    if (document.getElementById('detailedPaymentMethods')) {
        new Chart(document.getElementById('detailedPaymentMethods').getContext('2d'), {
            type: 'polarArea',
            data: {
                labels: ['UPI', 'Credit Card', 'Net Banking', 'Others'],
                datasets: [{
                    data: [45, 30, 15, 10],
                    backgroundColor: [
                        'rgba(33, 150, 243, 0.7)',
                        'rgba(76, 175, 80, 0.7)',
                        'rgba(255, 152, 0, 0.7)',
                        'rgba(244, 67, 54, 0.7)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Detailed Data Usage Chart
    if (document.getElementById('detailedDataUsage')) {
        new Chart(document.getElementById('detailedDataUsage').getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Basic Plan',
                    data: [20, 22, 24, 25, 27, 30],
                    borderColor: '#ff9800',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Standard Plan',
                    data: [40, 42, 43, 45, 48, 50],
                    borderColor: '#2196F3',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Premium Plan',
                    data: [60, 62, 64, 65, 67, 70],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Family Plan',
                    data: [80, 82, 83, 85, 87, 90],
                    borderColor: '#6f42c1',
                    backgroundColor: 'rgba(111, 66, 193, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw + ' GB';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value + ' GB';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

function initViewDetailsButtons() {
    const viewButtons = document.querySelectorAll('.view-analytics');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Navigate to analytics page
            document.querySelector('a[data-page="analytics"]').click();
            
            // Get the chart type
            const chartType = this.getAttribute('data-chart');
            
            // Hide all analytics sections
            document.querySelectorAll('.analytics-section').forEach(section => {
                section.classList.add('d-none');
            });
            
            // Show the corresponding analytics section
            const targetSection = document.getElementById(`${chartType}-analytics`);
            if (targetSection) {
                targetSection.classList.remove('d-none');
            }
        });
    });
}

function initNotifications() {
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    const notificationBadge = document.querySelector('.notification-badge');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    
    // Demo function to add a notification
    window.addNotification = function(message) {
        // Remove empty notification message
        const emptyNotif = document.querySelector('.empty-notification');
        if (emptyNotif) {
            emptyNotif.remove();
        }
        
        // Create new notification item
        const notifItem = document.createElement('li');
        notifItem.className = 'notification-item';
        notifItem.innerHTML = `
            <div class="d-flex align-items-center">
                <div class="me-3">
                    <i class="fas fa-bell text-primary"></i>
                </div>
                <div>
                    <p class="mb-0">${message}</p>
                    <small class="text-muted">Just now</small>
                </div>
            </div>
        `;
        
        // Add to dropdown
        notificationDropdown.insertBefore(notifItem, notificationDropdown.querySelector('.dropdown-divider').nextSibling);
        
        // Update badge
        notificationBadge.textContent = document.querySelectorAll('.notification-item:not(.empty-notification)').length;
        notificationBadge.classList.remove('d-none');
    };
    
    // Demo: Add a notification after 30 seconds
    setTimeout(() => {
        addNotification('New subscriber registered');
    }, 30000);
}

function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Demo logout - just show an alert
            if (confirm('Are you sure you want to logout?')) {
                alert('Logged out successfully. In a real application, you would be redirected to the login page.');
            }
        });
    }
}

function updateRandomStats() {
    // Update with some random variations for demo purposes
    const totalSubscribers = document.getElementById('totalSubscribers');
    const activePlans = document.getElementById('activePlans');
    const totalRevenue = document.getElementById('totalRevenue');
    const growthRate = document.getElementById('growthRate');
    
    if (totalSubscribers) {
        // Random number between 95 and 105
        let subscriberCount = Math.floor(Math.random() * 10) + 95;
        totalSubscribers.textContent = subscriberCount;
    }
    
    if (activePlans) {
        // Random number between 80 and 90
        let planCount = Math.floor(Math.random() * 10) + 80;
        activePlans.textContent = planCount;
    }
    
    if (totalRevenue) {
        // Random number between 40K and 45K
        let revenue = Math.floor(Math.random() * 5) + 40;
        totalRevenue.textContent = revenue + '.5K';
    }
    
    if (growthRate) {
        // Random number between 12 and 18
        let growth = Math.floor(Math.random() * 6) + 12;
        growthRate.textContent = '+' + growth + '%';
    }
}