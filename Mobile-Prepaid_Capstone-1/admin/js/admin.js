// Redirect if not logged in
if (!localStorage.getItem("adminLoggedIn")) {
    window.location.href = "./admin-login.html";
}

// Store and display admin profile info
function loadAdminProfile() {
    const adminName = localStorage.getItem("adminName") || "Admin";
    const adminImage = localStorage.getItem("adminAvatar") || "./sign in.png";
    
    document.getElementById("adminName").textContent = adminName;
    document.getElementById("adminAvatar").src = adminImage;
}

// Logout function
function logout() {
    localStorage.clear();
    window.location.href = "./admin-login.html";
}

// Fetch subscriber data and update dashboard
function updateDashboard() {
    fetch('subscribers.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('totalSubscribers').textContent = data.totalSubscribers;
            document.getElementById('expiringSoon').textContent = data.expiringSoon;
            document.getElementById('growthRate').textContent = data.growthRate + '%';
            updateCharts(data);
        })
        .catch(error => console.error('Error fetching dashboard data:', error));
}

// Update subscriber analytics charts
function updateCharts(data) {
    new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: ['Family Plan', 'Data Plan', 'Study Plan', 'Other'],
            datasets: [{
                label: 'Subscribers per Plan',
                data: data.planDistribution,
                backgroundColor: ['blue', 'green', 'red', 'orange']
            }]
        }
    });

    new Chart(document.getElementById('lineChart'), {
        type: 'line',
        data: {
            labels: data.months,
            datasets: [{
                label: 'Growth Rate Over Months',
                data: data.monthlyGrowth,
                borderColor: 'blue',
                fill: false
            }]
        }
    });
}

// Ensure profile is loaded on all pages
document.addEventListener("DOMContentLoaded", function () {
    loadAdminProfile();
    updateDashboard();
    document.getElementById("logoutBtn").addEventListener("click", logout);
});
