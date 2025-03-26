// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.body.classList.toggle('sidebar-collapsed');
        });
    }

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Date range handling for custom date range selection
    const dateRangeSelect = document.getElementById('dateRange');
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                // Show custom date range picker (implementation would depend on your date picker library)
                showCustomDateRangePicker();
            }
        });
    }

    // Generate report button functionality
    const generateReportBtn = document.getElementById('generateReport');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', function() {
            // Show loading indicator
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Generating...';
            this.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Update report data (this would be replaced with actual API call)
                updateReportData();
                
                // Reset button state
                this.innerHTML = '<i class="fas fa-sync-alt me-2"></i>Generate Report';
                this.disabled = false;
                
                // Show success notification
                showNotification('Report generated successfully!');
            }, 1500);
        });
    }

    // Function to show custom date range picker
    function showCustomDateRangePicker() {
        // This would be implemented based on your chosen date picker library
        console.log('Custom date range picker would show here');
        // Example: $('#dateRangePicker').daterangepicker().show();
    }

    // Function to update report data
    function updateReportData() {
        // This would fetch data from your API and update the DOM
        console.log('Updating report data');
        
        // Example: Animate number changes in summary cards
        animateValue('totalRecharges', 4100, 4256, 1000);
        animateValue('revenue', 22750, 24850, 1000);
        animateValue('activeUsers', 3650, 3842, 1000);
        animateValue('avgTransaction', 5.97, 5.84, 1000);
    }

    // Function to show notification
    function showNotification(message) {
        // This could be implemented with a toast library or custom implementation
        console.log('Notification:', message);
        
        // Example: Create a toast element
        const toastEl = document.createElement('div');
        toastEl.className = 'toast position-fixed top-0 end-0 m-3';
        toastEl.setAttribute('role', 'alert');
        toastEl.setAttribute('aria-live', 'assertive');
        toastEl.setAttribute('aria-atomic', 'true');
        toastEl.innerHTML = `
            <div class="toast-header">
                <i class="fas fa-info-circle me-2 text-primary"></i>
                <strong class="me-auto">System Notification</strong>
                <small>Just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">${message}</div>
        `;
        
        document.body.appendChild(toastEl);
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
        
        // Remove toast after it's hidden
        toastEl.addEventListener('hidden.bs.toast', function() {
            document.body.removeChild(toastEl);
        });
    }

    // Function to animate value changes
    function animateValue(elementId, start, end, duration) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            // Format based on whether it's a currency value
            if (elementId === 'revenue') {
                element.textContent = '$' + value.toLocaleString();
            } else if (elementId === 'avgTransaction') {
                element.textContent = '$' + value.toFixed(2);
            } else {
                element.textContent = value.toLocaleString();
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Example chart initialization (if charts are needed)
    initializeCharts();
});

// Function to initialize charts (requires a chart library like Chart.js)
function initializeCharts() {
    // This is a placeholder for chart initialization
    // You would need to include a chart library like Chart.js
    console.log('Charts would be initialized here');
    
    /* Example implementation with Chart.js:
    
    const ctx = document.getElementById('rechargeChart').getContext('2d');
    const rechargeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Recharges',
                data: [650, 590, 800, 810, 760, 850, 796],
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                borderColor: '#0d6efd',
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
    */
}