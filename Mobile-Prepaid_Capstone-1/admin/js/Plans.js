let rechargePlans = {
    "recharge_plans": [
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
let selectedCategory = null;
let planModal = null;
let categoryModal = null;
let deleteConfirmModal = null;
let currentDeleteId = null;
let currentDeleteType = null;

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Bootstrap components
    planModal = new bootstrap.Modal(document.getElementById('planModal'));
    categoryModal = new bootstrap.Modal(document.getElementById('categoryModal'));
    deleteConfirmModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    
    // Initialize sidebar toggle functionality
    initSidebar();
    
    // Initialize event listeners
    initEventListeners();
    
    // Load plans from local storage
    loadPlansFromStorage();
    
    // Initialize categories in filter dropdown
    populateCategoryDropdowns();
    
    // Initialize the category tabs
    renderCategoryTabs();
    
    // Render plans (all plans initially)
    renderPlans();
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Initialize sidebar functionality
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
    const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
    
    // Sidebar toggle for mobile
    if (sidebarCollapseBtn) {
        sidebarCollapseBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    if (mobileSidebarToggle) {
        mobileSidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggleButton = mobileSidebarToggle && mobileSidebarToggle.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnToggleButton && window.innerWidth < 992 && sidebar.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
        }
    });
    
    // Reset sidebar state on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            sidebar.classList.remove('mobile-open');
            sidebar.classList.remove('collapsed');
        }
    });
}

// Initialize all event listeners
function initEventListeners() {
    // Search and filter listeners
    document.getElementById('search-bar').addEventListener('input', renderPlans);
    document.getElementById('category-filter').addEventListener('change', handleCategoryFilter);
    document.getElementById('validity-filter').addEventListener('change', renderPlans);
    document.getElementById('bestseller-filter').addEventListener('change', renderPlans);
    document.getElementById('price-filter').addEventListener('input', renderPlans);
    
    // Modal action buttons
    document.getElementById('savePlanBtn').addEventListener('click', savePlan);
    document.getElementById('saveCategoryBtn').addEventListener('click', saveCategory);
    document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDelete);
    
    // Reset form on modal close
    document.getElementById('planModal').addEventListener('hidden.bs.modal', function() {
        document.getElementById('planForm').reset();
    });
    
    document.getElementById('categoryModal').addEventListener('hidden.bs.modal', function() {
        document.getElementById('categoryForm').reset();
    });
}

// Populate category dropdowns
function populateCategoryDropdowns() {
    const categoryFilter = document.getElementById('category-filter');
    const planCategory = document.getElementById('planCategory');
    
    // Clear existing options first (except for the default one)
    while (categoryFilter.options.length > 1) {
        categoryFilter.remove(1);
    }
    
    while (planCategory.options.length > 0) {
        planCategory.remove(0);
    }
    
    // Add categories to filter dropdown
    rechargePlans.recharge_plans.forEach(category => {
        const option = document.createElement('option');
        option.value = category.category;
        option.textContent = category.category;
        categoryFilter.appendChild(option.cloneNode(true));
        planCategory.appendChild(option);
    });
}

// Render category tabs
function renderCategoryTabs() {
    const categoriesNav = document.getElementById('categories-nav');
    categoriesNav.innerHTML = '';
    
    // Add "All Categories" tab
    const allTab = document.createElement('li');
    allTab.className = 'nav-item';
    allTab.innerHTML = `
        <a class="nav-link ${selectedCategory ? '' : 'active'}" 
           id="all-tab" 
           data-bs-toggle="tab" 
           href="#" 
           role="tab" 
           onclick="selectCategory(null)">
            All Categories
        </a>
    `;
    categoriesNav.appendChild(allTab);
    
    // Add tab for each category
    rechargePlans.recharge_plans.forEach(category => {
        const tab = document.createElement('li');
        tab.className = 'nav-item';
        tab.innerHTML = `
            <a class="nav-link ${selectedCategory === category.category ? 'active' : ''}" 
               id="${category.category.replace(/\s+/g, '-').toLowerCase()}-tab" 
               data-bs-toggle="tab" 
               href="#" 
               role="tab" 
               onclick="selectCategory('${category.category}')">
                ${category.category}
                <span class="badge bg-primary ms-1">${category.plans.length}</span>
            </a>
        `;
        categoriesNav.appendChild(tab);
    });
}

// Handle category filter change
function handleCategoryFilter() {
    const categoryFilter = document.getElementById('category-filter');
    const selectedValue = categoryFilter.value;
    
    if (selectedValue) {
        selectCategory(selectedValue);
        
        // Also update the tabs to show the active category
        document.querySelectorAll('#categories-nav .nav-link').forEach(tab => {
            tab.classList.remove('active');
            if (tab.textContent.includes(selectedValue) || 
                (selectedValue === '' && tab.id === 'all-tab')) {
                tab.classList.add('active');
            }
        });
    } else {
        selectCategory(null);
        document.getElementById('all-tab').classList.add('active');
    }
}

// Select a category
function selectCategory(category) {
    selectedCategory = category;
    
    // Update the category filter dropdown if needed
    const categoryFilter = document.getElementById('category-filter');
    categoryFilter.value = category || '';
    
    // Update active tab
    document.querySelectorAll('#categories-nav .nav-link').forEach(tab => {
        tab.classList.remove('active');
        if (category === null && tab.id === 'all-tab') {
            tab.classList.add('active');
        } else if (category && tab.textContent.includes(category)) {
            tab.classList.add('active');
        }
    });
    
    // Render plans for the selected category
    renderPlans();
    
    // Show notification
    if (category) {
        showToast(`Category: ${category} selected`);
    } else {
        showToast('Showing all categories');
    }
}

// Render plans based on current filters
function renderPlans() {
    const container = document.getElementById('plans-container');
    if (!container) return;
    
    // Get filter values
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const categoryFilter = selectedCategory || document.getElementById('category-filter').value;
    const validityFilter = document.getElementById('validity-filter').value;
    const bestsellerFilter = document.getElementById('bestseller-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    
    // Clear the container
    container.innerHTML = '';
    
    // Create a categorized view
    if (categoryFilter) {
        // Single category view
        const category = rechargePlans.recharge_plans.find(c => c.category === categoryFilter);
        if (category) {
            renderCategoryTable(container, category, searchQuery, validityFilter, bestsellerFilter, priceFilter);
        }
    } else {
        // All categories view
        rechargePlans.recharge_plans.forEach(category => {
            renderCategoryTable(container, category, searchQuery, validityFilter, bestsellerFilter, priceFilter);
        });
    }
}

// Render a table for a single category
function renderCategoryTable(container, category, searchQuery, validityFilter, bestsellerFilter, priceFilter) {
    // Filter plans based on search and filters
    let filteredPlans = category.plans.filter(plan => {
        // Apply search filter
        const matchesSearch = plan.name.toLowerCase().includes(searchQuery) || 
                             plan.data.toLowerCase().includes(searchQuery) ||
                             plan.benefits.toLowerCase().includes(searchQuery);
        
        // Apply validity filter
        const matchesValidity = !validityFilter || plan.validity.includes(validityFilter);
        
        // Apply bestseller filter
        const matchesBestseller = bestsellerFilter === '' || 
                                 (bestsellerFilter === 'true' && plan.bestseller) || 
                                 (bestsellerFilter === 'false' && !plan.bestseller);
        
        // Apply price filter
        const matchesPrice = !priceFilter || plan.price <= parseInt(priceFilter);
        
        return matchesSearch && matchesValidity && matchesBestseller && matchesPrice;
    });
    
    // Sort bestsellers first
    filteredPlans.sort((a, b) => b.bestseller - a.bestseller);
    
    // Skip empty categories unless we're specifically viewing this category
    if (filteredPlans.length === 0 && !selectedCategory) {
        return;
    }
    
    // Create category section
    const categorySection = document.createElement('div');
    categorySection.className = 'category-section mb-4';
    
    // Create category header with edit/delete buttons
    const categoryHeader = document.createElement('div');
    categoryHeader.className = 'd-flex justify-content-between align-items-center mb-2 bg-light p-2 rounded';
    categoryHeader.innerHTML = `
        <h5 class="mb-0">${category.category} <span class="badge bg-secondary">${filteredPlans.length}</span></h5>
        <div class="category-actions">
            <button class="btn btn-sm btn-outline-primary me-2" onclick="editCategory('${category.category}')">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteCategory('${category.category}')">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    categorySection.appendChild(categoryHeader);
    
    // Create plans table
    if (filteredPlans.length > 0) {
        const tableResponsive = document.createElement('div');
        tableResponsive.className = 'table-responsive';
        
        const table = document.createElement('table');
        table.className = 'table table-striped table-hover';
        
        // Table header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price (₹)</th>
                <th>Data</th>
                <th>Validity</th>
                <th>Benefits</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        `;
        table.appendChild(thead);
        
        // Table body
        const tbody = document.createElement('tbody');
        filteredPlans.forEach(plan => {
            const tr = document.createElement('tr');
            tr.className = plan.bestseller ? 'table-success' : '';
            tr.innerHTML = `
                <td>${plan.id}</td>
                <td>${plan.name}</td>
                <td>${plan.price}</td>
                <td>${plan.data}</td>
                <td>${plan.validity}</td>
                <td>${plan.benefits}</td>
                <td>${plan.bestseller ? '<span class="badge bg-success">Bestseller</span>' : '<span class="badge bg-secondary">Regular</span>'}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editPlan(${plan.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deletePlan(${plan.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        
        table.appendChild(tbody);
        tableResponsive.appendChild(table);
        categorySection.appendChild(tableResponsive);
    } else {
        // No plans found message
        const noPlans = document.createElement('div');
        noPlans.className = 'alert alert-info';
        noPlans.innerHTML = 'No plans found matching the current filters.';
        categorySection.appendChild(noPlans);
    }
    
    container.appendChild(categorySection);
}

// Add a new plan - Opens the modal
function addPlan() {
    // Reset the form
    document.getElementById('planForm').reset();
    
    // Reset modal title and button text for add operation
    document.getElementById('planModalLabel').textContent = 'Add New Plan';
    document.getElementById('savePlanBtn').textContent = 'Save Plan';
    
    // Clear any stored plan ID
    document.getElementById('savePlanBtn').removeAttribute('data-plan-id');
    
    // Show the modal
    planModal.show();
}

// Edit an existing plan
function editPlan(planId) {
    let plan = null;
    let planCategory = null;
    
    // Find the plan and its category
    for (const category of rechargePlans.recharge_plans) {
        const foundPlan = category.plans.find(p => p.id === planId);
        if (foundPlan) {
            plan = foundPlan;
            planCategory = category.category;
            break;
        }
    }
    
    if (!plan) {
        showToast('Plan not found', 'error');
        return;
    }
    
    // Populate the form with existing plan details
    document.getElementById('planName').value = plan.name;
    document.getElementById('planCategory').value = planCategory;
    document.getElementById('planPrice').value = plan.price;
    document.getElementById('planData').value = plan.data;
    document.getElementById('planValidity').value = plan.validity;
    document.getElementById('planBenefits').value = plan.benefits;
    document.getElementById('planDescription').value = plan.description || '';
    document.getElementById('planBestseller').checked = plan.bestseller;
    
    // Change modal title and button text to reflect edit operation
    document.getElementById('planModalLabel').textContent = 'Edit Plan';
    const saveButton = document.getElementById('savePlanBtn');
    saveButton.textContent = 'Update Plan';
    
    // Store the plan ID in the button's dataset for retrieval during save
    saveButton.setAttribute('data-plan-id', planId);
    
    // Show the modal
    planModal.show();
}

// Save or update a plan
function savePlan() {
    // Get values from form
    const name = document.getElementById('planName').value;
    const categoryName = document.getElementById('planCategory').value;
    const price = parseInt(document.getElementById('planPrice').value);
    const data = document.getElementById('planData').value;
    const validity = document.getElementById('planValidity').value;
    const benefits = document.getElementById('planBenefits').value;
    const description = document.getElementById('planDescription').value;
    const bestseller = document.getElementById('planBestseller').checked;
    
    // Basic validation
    if (!name || !categoryName || isNaN(price) || !data || !validity || !benefits) {
        showToast('Please fill all required fields', 'error');
        return;
    }
    
    const saveButton = document.getElementById('savePlanBtn');
    const planId = saveButton.getAttribute('data-plan-id');
    
    if (planId) {
        // We're updating an existing plan
        let updated = false;
        let oldCategory = null;
        
        // Find the plan to update
        for (const category of rechargePlans.recharge_plans) {
            const planIndex = category.plans.findIndex(p => p.id === parseInt(planId));
            if (planIndex !== -1) {
                // If category has changed, we need to move the plan
                if (category.category !== categoryName) {
                    oldCategory = category.category;
                    const plan = category.plans.splice(planIndex, 1)[0];
                    
                    // Update plan details
                    plan.name = name;
                    plan.price = price;
                    plan.data = data;
                    plan.validity = validity;
                    plan.benefits = benefits;
                    plan.description = description;
                    plan.bestseller = bestseller;
                    
                    // Find new category and add the plan
                    const newCategory = rechargePlans.recharge_plans.find(c => c.category === categoryName);
                    if (newCategory) {
                        newCategory.plans.push(plan);
                        updated = true;
                    }
                } else {
                    // Update plan in the same category
                    const plan = category.plans[planIndex];
                    plan.name = name;
                    plan.price = price;
                    plan.data = data;
                    plan.validity = validity;
                    plan.benefits = benefits;
                    plan.description = description;
                    plan.bestseller = bestseller;
                    updated = true;
                }
                break;
            }
        }
        
        if (updated) {
            savePlansToStorage();
            planModal.hide();
            renderCategoryTabs();
            renderPlans();
            
            if (oldCategory) {
                showToast(`Plan updated and moved from ${oldCategory} to ${categoryName}`, 'success');
            } else {
                showToast('Plan updated successfully', 'success');
            }
        } else {
            showToast('Failed to update plan', 'error');
        }
    } else {
        // We're adding a new plan
        const categoryObj = rechargePlans.recharge_plans.find(c => c.category === categoryName);
        if (!categoryObj) {
            showToast('Category not found', 'error');
            return;
        }
        
        // Create new plan object
        const newPlan = {
            id: Date.now(), // Using timestamp as ID
            name,
            price,
            data,
            validity,
            benefits,
            description,
            bestseller
        };
        
        // Add to the selected category
        categoryObj.plans.push(newPlan);
        savePlansToStorage();
        planModal.hide();
        renderCategoryTabs();
        renderPlans();
        showToast('New plan added successfully', 'success');
    }
}

// Delete a plan (shows confirmation dialog)
function deletePlan(planId) {
    currentDeleteId = planId;
    currentDeleteType = 'plan';
    
    // Find plan details for confirmation message
    let planName = '';
    for (const category of rechargePlans.recharge_plans) {
        const plan = category.plans.find(p => p.id === planId);
        if (plan) {
            planName = plan.name;
            break;
        }
    }
    
    document.getElementById('deleteConfirmText').textContent = `Are you sure you want to delete the plan "${planName}"?`;
    deleteConfirmModal.show();
}

// Confirm delete action (for both plans and categories)
function confirmDelete() {
    if (currentDeleteType === 'plan') {
        // Delete plan
        let deleted = false;
        for (const category of rechargePlans.recharge_plans) {
            const initialLength = category.plans.length;
            category.plans = category.plans.filter(plan => plan.id !== currentDeleteId);
            if (initialLength > category.plans.length) {
                deleted = true;
                break;
            }
        }
        
        if (deleted) {
            showToast('Plan deleted successfully', 'success');
            savePlansToStorage();
            renderCategoryTabs();
            renderPlans();
        } else {
            showToast('Plan not found', 'error');
        }
    } else if (currentDeleteType === 'category') {
        // Delete category
        const initialLength = rechargePlans.recharge_plans.length;
        rechargePlans.recharge_plans = rechargePlans.recharge_plans.filter(category => 
            category.category !== currentDeleteId
        );
        
        if (initialLength > rechargePlans.recharge_plans.length) {
            showToast(`Category "${currentDeleteId}" deleted successfully`, 'success');
            
            // If the deleted category was selected, reset selection
            if (selectedCategory === currentDeleteId) {
                selectedCategory = null;
            }
            
            savePlansToStorage();
            populateCategoryDropdowns();
            renderCategoryTabs();
            renderPlans();
        } else {
            showToast('Category not found', 'error');
        }
    }
    
    deleteConfirmModal.hide();
    currentDeleteId = null;
    currentDeleteType = null;
}

// Add a new category - Opens the modal
function addCategory() {
    // Reset the form
    document.getElementById('categoryForm').reset();
    
    // Reset modal title and button text for add operation
    document.getElementById('categoryModalLabel').textContent = 'Add New Category';
    document.getElementById('saveCategoryBtn').textContent = 'Save Category';
    
    // Clear any stored category name
    document.getElementById('saveCategoryBtn').removeAttribute('data-category-name');
    
    // Show the modal
    categoryModal.show();
}

// Edit an existing category
function editCategory(categoryName) {
    const category = rechargePlans.recharge_plans.find(c => c.category === categoryName);
    if (!category) {
        showToast('Category not found', 'error');
        return;
    }
    
    // Populate the form with existing category details
    document.getElementById('categoryName').value = category.category;
    document.getElementById('categoryDescription').value = category.description || '';
    
    // Change modal title and button text to reflect edit operation
    document.getElementById('categoryModalLabel').textContent = 'Edit Category';
    const saveButton = document.getElementById('saveCategoryBtn');
    saveButton.textContent = 'Update Category';
    
    // Store the category name in the button's dataset for retrieval during save
    saveButton.setAttribute('data-category-name', categoryName);
    
    // Show the modal
    categoryModal.show();
}

// Delete a category (shows confirmation dialog)
function deleteCategory(categoryName) {
    currentDeleteId = categoryName;
    currentDeleteType = 'category';
    
    const category = rechargePlans.recharge_plans.find(c => c.category === categoryName);
    if (!category) {
        showToast('Category not found', 'error');
        return;
    }
    
    document.getElementById('deleteConfirmText').textContent = 
        `Are you sure you want to delete the category "${categoryName}" and its ${category.plans.length} plans?`;
    deleteConfirmModal.show();
}

// Save or update a category
function saveCategory() {
    // Get values from form
    const newCategoryName = document.getElementById('categoryName').value;
    const description = document.getElementById('categoryDescription').value;
    
    // Basic validation
    if (!newCategoryName) {
        showToast('Category name is required', 'error');
        return;
    }
    
    const saveButton = document.getElementById('saveCategoryBtn');
    const oldCategoryName = saveButton.getAttribute('data-category-name');
    
    if (oldCategoryName) {
        // We're updating an existing category
        const category = rechargePlans.recharge_plans.find(c => c.category === oldCategoryName);
        if (!category) {
            showToast('Category not found', 'error');
            return;
        }
        
        // Check if new name already exists (except for the current category)
        if (newCategoryName !== oldCategoryName && 
            rechargePlans.recharge_plans.some(c => c.category === newCategoryName)) {
            showToast('A category with this name already exists', 'error');
            return;
        }
        
        // Update category
        category.category = newCategoryName;
        category.description = description;
        
        // If this was the selected category, update selection
        if (selectedCategory === oldCategoryName) {
            selectedCategory = newCategoryName;
        }
        
        savePlansToStorage();
        categoryModal.hide();
        populateCategoryDropdowns();
        renderCategoryTabs();
        renderPlans();
        showToast('Category updated successfully', 'success');
    } else {
        // We're adding a new category
        // Check if name already exists
        if (rechargePlans.recharge_plans.some(c => c.category === newCategoryName)) {
            showToast('A category with this name already exists', 'error');
            return;
        }
        
        // Create new category
        const newCategory = {
            category: newCategoryName,
            description: description,
            plans: []
        };
        
        rechargePlans.recharge_plans.push(newCategory);
        savePlansToStorage();
        categoryModal.hide();
        populateCategoryDropdowns();
        renderCategoryTabs();
        renderPlans();
        showToast('New category added successfully', 'success');
    }
}

// Save plans to localStorage
function savePlansToStorage() {
    localStorage.setItem('rechargePlans', JSON.stringify(rechargePlans));
}

// Load plans from localStorage
function loadPlansFromStorage() {
    const savedPlans = localStorage.getItem('rechargePlans');
    if (savedPlans) {
        rechargePlans = JSON.parse(savedPlans);
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    // Check if a toast container exists, if not create one
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Create a unique ID for this toast
    const toastId = 'toast-' + Date.now();
    
    // Determine toast background color based on type
    let bgColor = 'bg-info';
    if (type === 'success') bgColor = 'bg-success';
    if (type === 'error') bgColor = 'bg-danger';
    if (type === 'warning') bgColor = 'bg-warning';
    
    // Create the toast HTML
    const toastHtml = `
        <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header ${bgColor} text-white">
                <strong class="me-auto">Notification</strong>
                <small>Just now</small>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    // Add the toast to the container
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    
    // Initialize and show the toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();
    
    // Remove the toast element after it's hidden
    toastElement.addEventListener('hidden.bs.toast', function () {
        toastElement.remove();
    });
}

// Logout function
function logout() {
    // In a real application, you would invalidate the session here
    window.location.href = './admin-login.html';
}


