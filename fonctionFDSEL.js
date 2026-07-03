
  document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const closeBtn = document.querySelector('.mobile-nav__close');
    const body = document.body;

    function openMenu() {
      hamburger.classList.add('active');
      mobileNav.classList.add('active');
      mobileNavOverlay.classList.add('active');
      body.classList.add('nav-open');
    }

    function closeMenu() {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
      body.classList.remove('nav-open');
    }

    if (hamburger) {
      hamburger.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
          closeMenu();
        } else {
          openMenu();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    if (mobileNavOverlay) {
      mobileNavOverlay.addEventListener('click', closeMenu);
    }

    const submenuLinks = document.querySelectorAll('.has-submenu > .mobile-nav__link');
    submenuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); 
        const parent = link.parentElement;
        parent.classList.toggle('open');
      });
    });
  });
