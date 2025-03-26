// Constants
const API_BASE_URL = 'http://localhost:8083/api';
const PLANS_PER_PAGE = 10;

// State variables
let allPlans = [];
let allCategories = [];
let currentPage = 1;
let filteredPlans = [];
let selectedPlanId = null;
let selectedCategoryId = null;
let currentCategoryTab = null;

// DOM Elements
const planModal = document.getElementById('planModal') ? new bootstrap.Modal(document.getElementById('planModal')) : null;
const deleteModal = document.getElementById('deleteModal') ? new bootstrap.Modal(document.getElementById('deleteModal')) : null;
const categoryModal = document.getElementById('categoryModal') ? new bootstrap.Modal(document.getElementById('categoryModal')) : null;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    setupSidebarToggle();
    
    // Initial data fetch
    fetchCategories();
    fetchPlans();
    
    // Search and filter functionality
    document.getElementById('search-input')?.addEventListener('input', filterPlans);
    document.getElementById('category-filter')?.addEventListener('change', filterPlans);
    document.getElementById('validity-filter')?.addEventListener('change', filterPlans);
    document.getElementById('bestseller-filter')?.addEventListener('change', filterPlans);
    document.getElementById('price-filter')?.addEventListener('input', filterPlans);
    
    // Add plan button
    document.getElementById('add-plan-btn')?.addEventListener('click', () => {
        addPlan();
    });
    
    // Add category button
    document.getElementById('add-category-btn')?.addEventListener('click', () => {
        addCategory();
    });
    
    // Save plan button
    document.getElementById('savePlanBtn')?.addEventListener('click', savePlan);

    // Save category button
    document.getElementById('saveCategoryBtn')?.addEventListener('click', saveCategory);
    
    // Confirm delete button
    document.getElementById('confirmDeleteBtn')?.addEventListener('click', deletePlan);
});

function setupSidebarToggle() {
    const sidebarToggle = document.getElementById('mobileSidebarToggle');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('show');
        });
    }

    const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
    const mainContent = document.getElementById('main-content');

    if (sidebarCollapseBtn && sidebar && mainContent) {
        sidebarCollapseBtn.addEventListener('click', function () {
            sidebar.classList.toggle('sidebar-collapsed');
            mainContent.classList.toggle('main-content-expanded');
        });
    }

    document.addEventListener('click', function (event) {
        if (sidebar && sidebarToggle && !sidebar.contains(event.target) && !sidebarToggle.contains(event.target) && window.innerWidth < 992) {
            sidebar.classList.remove('show');
        }
    });
}

// Fetch all categories
async function fetchCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        
        const categories = await response.json();
        allCategories = categories;
        
        // Populate category dropdowns
        populateCategoryDropdowns(categories);
        
        // Create category tabs
        createCategoryTabs(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        showToast('Failed to load categories', 'error');
    }
}

// Populate category dropdowns
function populateCategoryDropdowns(categories) {
    const categoryFilter = document.getElementById('category-filter');
    const categorySelect = document.getElementById('planCategory');
    
    if (categoryFilter) {
        // Clear existing options except the first one
        categoryFilter.innerHTML = '<option value="">All Categories</option>';
        
        categories.forEach(category => {
            // Add to filter dropdown
            const filterOption = document.createElement('option');
            filterOption.value = category.categoryId;
            filterOption.textContent = category.categoryName;
            categoryFilter.appendChild(filterOption);
        });
    }
    
    if (categorySelect) {
        // Clear existing options except the first one
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        
        categories.forEach(category => {
            // Add to modal dropdown
            const modalOption = document.createElement('option');
            modalOption.value = category.categoryId;
            modalOption.textContent = category.categoryName;
            categorySelect.appendChild(modalOption);
        });
    }
}

// Create category tabs
function createCategoryTabs(categories) {
    const categoriesNav = document.getElementById('categories-nav');
    if (!categoriesNav) return;
    
    // Clear existing tabs
    categoriesNav.innerHTML = '';
    
    // Create "All Categories" tab
    const allCategoriesTab = document.createElement('li');
    allCategoriesTab.className = 'nav-item';
    allCategoriesTab.innerHTML = `
        <a class="nav-link ${currentCategoryTab === null ? 'active' : ''}" href="#" data-category-id="">
            All Categories <span class="badge bg-secondary rounded-pill">${countPlansInCategory()}</span>
        </a>
    `;
    allCategoriesTab.addEventListener('click', (e) => {
        e.preventDefault();
        currentCategoryTab = null;
        updateCategoryTabs();
        filterPlans();
    });
    categoriesNav.appendChild(allCategoriesTab);
    
    // Create tab for each category
    categories.forEach(category => {
        const categoryTab = document.createElement('li');
        categoryTab.className = 'nav-item';
        categoryTab.innerHTML = `
            <a class="nav-link ${currentCategoryTab === category.categoryId ? 'active' : ''}" href="#" data-category-id="${category.categoryId}">
                ${category.categoryName} <span class="badge bg-secondary rounded-pill">${countPlansInCategory(category.categoryId)}</span>
                <span class="ms-2">
                    <button class="btn btn-sm btn-outline-primary edit-category-btn" data-id="${category.categoryId}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-category-btn" data-id="${category.categoryId}">
                        <i class="fas fa-trash"></i>
                    </button>
                </span>
            </a>
        `;
        categoryTab.querySelector('.nav-link').addEventListener('click', (e) => {
            if (e.target.closest('.edit-category-btn') || e.target.closest('.delete-category-btn')) {
                e.preventDefault();
                return;
            }
            e.preventDefault();
            currentCategoryTab = category.categoryId;
            updateCategoryTabs();
            filterPlans();
        });
        
        // Add event listener for edit button
        categoryTab.querySelector('.edit-category-btn').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            editCategory(category.categoryId);
        });
        
        // Add event listener for delete button
        categoryTab.querySelector('.delete-category-btn').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            confirmDeleteCategory(category.categoryId);
        });
        
        categoriesNav.appendChild(categoryTab);
    });
}

// Update category tabs (mark active tab)
function updateCategoryTabs() {
    const categoriesNav = document.getElementById('categories-nav');
    if (!categoriesNav) return;
    
    const tabs = categoriesNav.querySelectorAll('.nav-link');
    tabs.forEach(tab => {
        const tabCategoryId = tab.getAttribute('data-category-id');
        if ((tabCategoryId === '' && currentCategoryTab === null) || 
            (tabCategoryId === currentCategoryTab?.toString())) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// Count plans in a category
function countPlansInCategory(categoryId = null) {
    if (!categoryId) {
        return allPlans.length;
    }
    
    return allPlans.filter(plan => plan.category.categoryId.toString() === categoryId.toString()).length;
}

// Fetch all plans
async function fetchPlans() {
    try {
        const response = await fetch(`${API_BASE_URL}/plans`);
        if (!response.ok) throw new Error('Failed to fetch plans');
        
        allPlans = await response.json();
        filteredPlans = [...allPlans];
        
        // Update category tabs with plan counts
        if (allCategories.length > 0) {
            createCategoryTabs(allCategories);
        }
        
        renderPlans();
        updatePaginationInfo();
        setupPagination();
    } catch (error) {
        console.error('Error fetching plans:', error);
        showToast('Failed to load plans', 'error');
    }
}

// Filter plans based on search and filter criteria
function filterPlans() {
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const categoryId = document.getElementById('category-filter')?.value || '';
    const validity = document.getElementById('validity-filter')?.value || '';
    const bestseller = document.getElementById('bestseller-filter')?.value || '';
    const price = document.getElementById('price-filter')?.value || '';
    
    // If a category tab is selected, filter by that category
    const selectedCategoryId = currentCategoryTab || categoryId;
    
    filteredPlans = allPlans.filter(plan => {
        // Match search term
        const matchesSearch = 
            plan.planId.toString().includes(searchTerm) ||
            plan.category.categoryName.toLowerCase().includes(searchTerm) ||
            plan.validity.toString().includes(searchTerm) ||
            plan.price.toString().includes(searchTerm) ||
            plan.data.toLowerCase().includes(searchTerm) ||
            plan.benefits.toLowerCase().includes(searchTerm) ||
            (plan.description && plan.description.toLowerCase().includes(searchTerm));
        
        // Match category filter
        const matchesCategory = selectedCategoryId === '' || plan.category.categoryId.toString() === selectedCategoryId.toString();
        
        // Match validity filter
        const matchesValidity = validity === '' || plan.validity.toString() === validity;

        // Match bestseller filter
        const matchesBestseller = bestseller === '' || (bestseller === 'true' && plan.bestseller) || (bestseller === 'false' && !plan.bestseller);

        // Match price filter
        const matchesPrice = price === '' || plan.price <= parseInt(price, 10);
        
        return matchesSearch && matchesCategory && matchesValidity && matchesBestseller && matchesPrice;
    });
    
    currentPage = 1;
    renderPlans();
    updatePaginationInfo();
    setupPagination();
}

// Add a new plan - Opens the modal
function addPlan() {
    resetPlanForm();
    document.getElementById('planModalLabel').textContent = 'Add New Plan';
    document.getElementById('savePlanBtn').textContent = 'Save Plan';
    selectedPlanId = null;
    planModal.show();
}

// Add a new category - Opens the modal
function addCategory() {
    resetCategoryForm();
    selectedCategoryId = null;
    document.getElementById('categoryModalLabel').textContent = 'Add New Category';
    document.getElementById('saveCategoryBtn').textContent = 'Save Category';
    categoryModal.show();
}

// Edit a category
function editCategory(categoryId) {
    const category = allCategories.find(cat => cat.categoryId.toString() === categoryId.toString());
    if (!category) return;
    
    selectedCategoryId = category.categoryId;
    document.getElementById('categoryName').value = category.categoryName || '';
    document.getElementById('categoryDescription').value = category.description || '';
    
    document.getElementById('categoryModalLabel').textContent = 'Edit Category';
    document.getElementById('saveCategoryBtn').textContent = 'Update Category';
    categoryModal.show();
}

// Confirm delete category
function confirmDeleteCategory(categoryId) {
    const category = allCategories.find(cat => cat.categoryId.toString() === categoryId.toString());
    if (!category) return;
    
    selectedCategoryId = category.categoryId;
    document.getElementById('deleteConfirmText').textContent = `Are you sure you want to delete the category "${category.categoryName}"? This will also delete all plans in this category.`;
    document.querySelector('#deleteModal .modal-title').textContent = 'Delete Category';
    document.querySelector('#deleteModal .btn-danger').onclick = deleteCategory;
    deleteModal.show();
}

// Delete a category
async function deleteCategory() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories/${selectedCategoryId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete category');
        
        // Refresh categories and plans after deletion
        await fetchCategories();
        await fetchPlans();
        
        deleteModal.hide();
        showToast('Category deleted successfully', 'success');
        
        // Reset current category tab if it was deleted
        if (currentCategoryTab === selectedCategoryId) {
            currentCategoryTab = null;
            updateCategoryTabs();
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        showToast('Failed to delete category', 'error');
    }
}

// Save category
async function saveCategory() {
    const nameElement = document.getElementById('categoryName');
    const descriptionElement = document.getElementById('categoryDescription');

    if (!nameElement) {
        console.error('Category name element not found');
        showToast('Error: Form elements not found', 'error');
        return;
    }

    const categoryName = nameElement.value.trim();
    const description = descriptionElement ? descriptionElement.value.trim() : '';

    if (!categoryName) {
        showToast('Please enter a category name', 'error');
        return;
    }

    const category = {
        categoryName,
        description
    };

    if (selectedCategoryId) {
        category.categoryId = selectedCategoryId;
    }

    const method = selectedCategoryId ? 'PUT' : 'POST';
    const url = selectedCategoryId ? `${API_BASE_URL}/categories/${selectedCategoryId}` : `${API_BASE_URL}/categories`;

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`Failed to save category: ${response.status} ${response.statusText}`);
        }

        // Refresh categories after saving
        await fetchCategories();
        categoryModal.hide();
        showToast(selectedCategoryId ? 'Category updated successfully' : 'Category added successfully', 'success');
    } catch (error) {
        console.error('Error saving category:', error);
        showToast('Failed to save category', 'error');
    }
}

// Save plan
async function savePlan() {
    const categoryElement = document.getElementById('planCategory');
    const validityElement = document.getElementById('planValidity');
    const priceElement = document.getElementById('planPrice');
    const dataElement = document.getElementById('planData');
    const benefitsElement = document.getElementById('planBenefits');
    const descriptionElement = document.getElementById('planDescription');
    const bestsellerElement = document.getElementById('planBestseller');

    if (!categoryElement || !validityElement || !priceElement || !dataElement || !benefitsElement) {
        console.error('Plan form elements not found in DOM');
        showToast('Error: Form elements not found', 'error');
        return;
    }

    const categoryId = categoryElement.value.trim();
    const validity = parseInt(validityElement.value) || 0;
    const price = parseFloat(priceElement.value) || 0;
    const data = dataElement.value.trim();
    const benefits = benefitsElement.value.trim();
    const description = descriptionElement ? descriptionElement.value.trim() : '';
    const bestseller = bestsellerElement ? bestsellerElement.checked : false;

    if (!categoryId) {
        showToast('Please select a category', 'error');
        return;
    }
    if (validity <= 0) {
        showToast('Please enter a valid validity period', 'error');
        return;
    }
    if (price <= 0) {
        showToast('Please enter a valid price', 'error');
        return;
    }
    if (!data) {
        showToast('Please enter data details', 'error');
        return;
    }
    if (!benefits) {
        showToast('Please enter benefits', 'error');
        return;
    }

    const plan = {
        validity,
        price,
        data,
        benefits,
        description,
        bestseller,
        category: { categoryId }
    };

    if (selectedPlanId) {
        plan.planId = selectedPlanId;
    }

    const method = selectedPlanId ? 'PUT' : 'POST';
    const url = selectedPlanId ? `${API_BASE_URL}/plans/${selectedPlanId}` : `${API_BASE_URL}/plans`;

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(plan)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`Failed to save plan: ${response.status} ${response.statusText}`);
        }

        // Refresh plans after saving
        await fetchPlans();
        planModal.hide();
        showToast(selectedPlanId ? 'Plan updated successfully' : 'Plan added successfully', 'success');
    } catch (error) {
        console.error('Error saving plan:', error);
        showToast('Failed to save plan', 'error');
    }
}

// Edit plan
function editPlan(planId) {
    const plan = allPlans.find(p => p.planId.toString() === planId.toString());
    if (!plan) return;

    selectedPlanId = plan.planId;
    document.getElementById('planCategory').value = plan.category.categoryId;
    document.getElementById('planValidity').value = plan.validity;
    document.getElementById('planPrice').value = plan.price;
    document.getElementById('planData').value = plan.data;
    document.getElementById('planBenefits').value = plan.benefits;
    document.getElementById('planDescription').value = plan.description || '';
    document.getElementById('planBestseller').checked = plan.bestseller || false;

    document.getElementById('planModalLabel').textContent = 'Edit Plan';
    document.getElementById('savePlanBtn').textContent = 'Update Plan';
    planModal.show();
}

// Confirm delete plan
function confirmDeletePlan(planId) {
    const plan = allPlans.find(p => p.planId.toString() === planId.toString());
    if (!plan) return;
    
    selectedPlanId = plan.planId;
    document.getElementById('deleteConfirmText').textContent = `Are you sure you want to delete the plan "${plan.data}"?`;
    document.querySelector('#deleteModal .modal-title').textContent = 'Delete Plan';
    document.querySelector('#deleteModal .btn-danger').onclick = deletePlan;
    deleteModal.show();
}

// Delete plan
async function deletePlan() {
    try {
        const response = await fetch(`${API_BASE_URL}/plans/${selectedPlanId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete plan');

        // Refresh plans after deleting
        await fetchPlans();
        deleteModal.hide();
        showToast('Plan deleted successfully', 'success');
    } catch (error) {
        console.error('Error deleting plan:', error);
        showToast('Failed to delete plan', 'error');
    }
}

// Reset plan form
function resetPlanForm() {
    const form = document.getElementById('planForm');
    if (form) form.reset();
}

// Reset category form
function resetCategoryForm() {
    const form = document.getElementById('categoryForm');
    if (form) form.reset();
}

// Render plans to the table
function renderPlans() {
    const tableBody = document.getElementById('plansTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    // Calculate start and end indices for current page
    const startIndex = (currentPage - 1) * PLANS_PER_PAGE;
    const endIndex = Math.min(startIndex + PLANS_PER_PAGE, filteredPlans.length);
    
    // If no plans found
    if (filteredPlans.length === 0) {
        const noDataRow = document.createElement('tr');
        noDataRow.innerHTML = `<td colspan="9" class="text-center">No plans found</td>`;
        tableBody.appendChild(noDataRow);
        return;
    }
    
    // Display plans for current page
    for (let i = startIndex; i < endIndex; i++) {
        const plan = filteredPlans[i];
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${plan.planId}</td>
            <td>${plan.category.categoryName}</td>
            <td>${plan.validity} days</td>
            <td>₹${plan.price}</td>
            <td>${plan.data}</td>
            <td>${plan.benefits}</td>
            <td>${plan.bestseller ? '<span class="badge bg-success">Yes</span>' : '<span class="badge bg-secondary">No</span>'}</td>
            <td>${plan.description || '-'}</td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-primary edit-btn" data-id="${plan.planId}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger delete-btn" data-id="${plan.planId}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    }
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => editPlan(button.dataset.id));
    });
    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => confirmDeletePlan(button.dataset.id));
    });
}

// Update pagination info
function updatePaginationInfo() {
    const showingRecords = document.getElementById('showing-records');
    const totalRecords = document.getElementById('total-records');
    
    if (showingRecords && totalRecords) {
        const startIndex = filteredPlans.length > 0 ? (currentPage - 1) * PLANS_PER_PAGE + 1 : 0;
        const endIndex = Math.min(startIndex + PLANS_PER_PAGE - 1, filteredPlans.length);
        
        showingRecords.textContent = `${startIndex}-${endIndex}`;
        totalRecords.textContent = filteredPlans.length;
    }
}

// Setup pagination
function setupPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    pagination.innerHTML = '';

    const totalPages = Math.ceil(filteredPlans.length / PLANS_PER_PAGE);
    
    // Add previous button
    const prevItem = document.createElement('li');
    prevItem.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevItem.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>`;
    prevItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderPlans();
            updatePaginationInfo();
            setupPagination();
        }
    });
    pagination.appendChild(prevItem);

    // Add page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            renderPlans();
            updatePaginationInfo();
            setupPagination();
        });
        pagination.appendChild(pageItem);
    }
    
    // Add next button
    const nextItem = document.createElement('li');
    nextItem.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextItem.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>`;
    nextItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderPlans();
            updatePaginationInfo();
            setupPagination();
        }
    });
    pagination.appendChild(nextItem);
}

// Show toast notification
function showToast(message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) return;

    const toastId = 'toast-' + Date.now();
    const bgColor = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-info';

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

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();

    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

// Init
function init() {
    setupSidebarToggle();
    
    // Add event listeners to global objects
    document.getElementById('add-plan-btn')?.addEventListener('click', addPlan);
    document.getElementById('savePlanBtn')?.addEventListener('click', savePlan);
    document.getElementById('add-category-btn')?.addEventListener('click', addCategory);
    document.getElementById('saveCategoryBtn')?.addEventListener('click', saveCategory);
}

// Call init when document is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}