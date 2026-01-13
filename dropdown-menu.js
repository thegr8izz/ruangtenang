document.addEventListener('DOMContentLoaded', function() {
    // Get all dropdown links
    const dropdownLinks = document.querySelectorAll('.navmenu .dropdown ul li a');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the text from the link (e.g., "Coffee", "Non Coffee", etc.)
            const linkText = this.textContent.trim();
            
            // Map dropdown items to menu tab IDs
            let tabId = '';
            
            if (linkText === 'Coffee') {
                tabId = 'menu-starters';
            } else if (linkText === 'Non Coffee') {
                tabId = 'menu-breakfast';
            } else if (linkText === 'Beverages') {
                tabId = 'menu-lunch';
            } else if (linkText === 'Dessert') {
                tabId = 'menu-dinner';
            }
            
            if (tabId) {
                // Scroll to menu section
                const menuSection = document.getElementById('menu');
                if (menuSection) {
                    menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                
                // Activate the corresponding tab
                setTimeout(() => {
                    const tabButton = document.querySelector(`[data-bs-target="#${tabId}"]`);
                    if (tabButton) {
                        const tab = new bootstrap.Tab(tabButton);
                        tab.show();
                    }
                }, 500); // Wait for scroll to complete
            }
        });
    });
    
    // Close dropdown after clicking
    const navMenu = document.getElementById('navmenu');
    if (navMenu) {
        const dropdownToggle = navMenu.querySelector('.dropdown a');
        const navLinks = navMenu.querySelectorAll('a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Close mobile menu if open
                const mobileToggle = document.querySelector('.mobile-nav-toggle');
                if (mobileToggle && window.getComputedStyle(mobileToggle).display !== 'none') {
                    mobileToggle.classList.remove('bi-x');
                    mobileToggle.classList.add('bi-list');
                    navMenu.classList.remove('mobile-nav-active');
                }
            });
        });
    }
});