// Sample Data (Replace with actual API or Database fetch)
document.getElementById("totalSubscribers").innerText = "5000";
document.getElementById("activeUsers").innerText = "4500";
document.getElementById("expiringPlans").innerText = "150";
document.getElementById("newSubscriptions").innerText = "200";

// Subscriber Growth Chart
const ctx1 = document.getElementById('subscriberChart').getContext('2d');
new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Subscribers',
            data: [3000, 3500, 4000, 4500, 4800, 5000],
            borderColor: 'blue',
            backgroundColor: 'rgba(0,0,255,0.2)',
            fill: true
        }]
    }
});

// Expiring Plans Breakdown
const ctx2 = document.getElementById('expiringChart').getContext('2d');
new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: ['1 Day Left', '2 Days Left', '3 Days Left'],
        datasets: [{
            label: 'Expiring Plans',
            data: [50, 60, 40],
            backgroundColor: ['red', 'orange', 'yellow']
        }]
    }
});

// Expiring Plan Notifications (Mock Data)
const notifications = [
    { name: "User 1", daysLeft: 3 },
    { name: "User 2", daysLeft: 2 },
    { name: "User 3", daysLeft: 1 },
];

const notificationList = document.getElementById("notificationList");
notifications.forEach(user => {
    const li = document.createElement("li");
    li.innerText = `${user.name} - Plan expires in ${user.daysLeft} days`;
    notificationList.appendChild(li);
});


// Sample Data (Replace with actual API or Database fetch)
document.getElementById("totalSubscribers").innerText = "5000";
document.getElementById("activeUsers").innerText = "4500";
document.getElementById("expiringPlans").innerText = "150";
document.getElementById("newSubscriptions").innerText = "200";

;
