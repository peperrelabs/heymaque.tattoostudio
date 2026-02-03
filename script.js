document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('navbar-menu');
    const menuLinks = menu.querySelectorAll('a');

    function toggleMenu() {
        // Toggle active class on menu
        menu.classList.toggle('active');
        
        // Change icon
        const icon = menuBtn.querySelector('.material-symbols-outlined');
        if (menu.classList.contains('active')) {
            icon.textContent = 'close';
        } else {
            icon.textContent = 'menu';
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate closing if we had a document click listener
            toggleMenu();
        });
    }

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menu.classList.contains('active') && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
            toggleMenu();
        }
    });
});