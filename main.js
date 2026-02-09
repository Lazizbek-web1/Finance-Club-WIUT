(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  var app = document.getElementById('app');
  var currentPage = 'home';

  // Route mapping
  var routes = {
    'home': 'page-home',
    'about': 'page-about',
    'about/club': 'page-about-club',
    'about/team': 'page-about-team',
    'about/testimonials': 'page-about-testimonials',
    'olympiad': 'page-olympiad',
    'olympiad/regulations': 'page-olympiad-regulations',
    'olympiad/stages': 'page-olympiad-stages',
    'olympiad/awards': 'page-olympiad-awards',
    'contacts': 'page-contacts'
  };

  // Get route from hash
  function getRoute() {
    var hash = window.location.hash.slice(1) || 'home';
    // Handle nested routes
    if (hash.startsWith('about/')) {
      return hash;
    }
    if (hash.startsWith('olympiad/')) {
      return hash;
    }
    // Map simple routes
    if (hash === 'about' || hash === 'club' || hash === 'team' || hash === 'testimonials') {
      if (hash === 'club') return 'about/club';
      if (hash === 'team') return 'about/team';
      if (hash === 'testimonials') return 'about/testimonials';
      return 'about';
    }
    if (hash === 'olympiad' || hash === 'regulations' || hash === 'stages' || hash === 'awards') {
      if (hash === 'regulations') return 'olympiad/regulations';
      if (hash === 'stages') return 'olympiad/stages';
      if (hash === 'awards') return 'olympiad/awards';
      return 'olympiad';
    }
    return hash;
  }

  // Navigate to page
  function navigate(route) {
    var pageId = routes[route] || routes['home'];
    var page = document.getElementById(pageId);
    
    if (!page) {
      console.warn('Page not found:', pageId);
      route = 'home';
      pageId = routes['home'];
      page = document.getElementById(pageId);
    }

    // Hide all pages
    document.querySelectorAll('.page').forEach(function (p) {
      p.classList.remove('active');
    });

    // Show target page
    if (page) {
      page.classList.add('active');
      currentPage = route;
      
      // Scroll to top
      window.scrollTo(0, 0);
      
      // Update title
      updateTitle(route);
    }
  }

  // Update page title
  function updateTitle(route) {
    var titles = {
      'home': 'Finance Club — Master Money. Build Wealth.',
      'about': 'About — Finance Club',
      'about/club': 'About the Club — Finance Club',
      'about/team': 'Our Team — Finance Club',
      'about/testimonials': 'Testimonials — Finance Club',
      'olympiad': 'Economics Olympiad 2026 — Finance Club',
      'olympiad/regulations': 'Regulations — Economics Olympiad',
      'olympiad/stages': 'Stages — Economics Olympiad',
      'olympiad/awards': 'Awards — Economics Olympiad',
      'contacts': 'Contact Us — Finance Club'
    };
    document.title = titles[route] || titles['home'];
  }

  // Handle scroll
  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Toggle mobile menu
  function toggleMenu() {
    var open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !open);
    nav.classList.toggle('open');
    document.body.style.overflow = open ? '' : 'hidden';
  }

  // Close menu on link click
  function closeMenuOnLink() {
    if (!nav.classList.contains('open')) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Handle dropdowns
  function initDropdowns() {
    var dropdowns = document.querySelectorAll('.nav-dropdown');
    var isMobile = window.matchMedia('(max-width: 700px)').matches;
    
    // On mobile, use click to toggle dropdown
    if (isMobile) {
      dropdowns.forEach(function (dropdown) {
        var toggle = dropdown.querySelector('.nav-dropdown-toggle');
        
        if (toggle) {
          toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var isOpen = dropdown.getAttribute('aria-expanded') === 'true';
            
            // Close all dropdowns
            dropdowns.forEach(function (d) {
              d.setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current
            dropdown.setAttribute('aria-expanded', !isOpen);
          });
        }
      });

      // Close dropdowns on outside click (mobile)
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-dropdown')) {
          dropdowns.forEach(function (d) {
            d.setAttribute('aria-expanded', 'false');
          });
        }
      });
    } else {
      // On desktop, clicking the toggle should navigate to overview
      dropdowns.forEach(function (dropdown) {
        var toggle = dropdown.querySelector('.nav-dropdown-toggle');
        
        if (toggle) {
          toggle.addEventListener('click', function (e) {
            // Let the route handler manage navigation
            // Don't prevent default here - let it navigate
          });
        }
      });
    }
  }

  // Handle route links
  function initRouteLinks() {
    var isMobile = window.matchMedia('(max-width: 700px)').matches;
    
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[data-route], a[href^="#"]');
      if (!link) return;

      var href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      // External links
      if (link.hasAttribute('target') && link.getAttribute('target') === '_blank') {
        return;
      }

      // On mobile, if clicking dropdown toggle, let dropdown handler manage it
      if (isMobile && link.classList.contains('nav-dropdown-toggle')) {
        return; // Let dropdown handler manage this
      }

      e.preventDefault();
      
      var route = link.getAttribute('data-route');
      if (!route) {
        route = getRouteFromHash(href);
      }

      navigate(route);
      closeMenuOnLink();
      
      // Close mobile dropdowns when navigating
      if (isMobile) {
        document.querySelectorAll('.nav-dropdown').forEach(function (d) {
          d.setAttribute('aria-expanded', 'false');
        });
      }
      
      // Update URL
      window.history.pushState({ route: route }, '', '#' + route);
    });
  }

  function getRouteFromHash(hash) {
    hash = hash.slice(1);
    if (hash === 'about' || hash === 'club' || hash === 'team' || hash === 'testimonials') {
      if (hash === 'club') return 'about/club';
      if (hash === 'team') return 'about/team';
      if (hash === 'testimonials') return 'about/testimonials';
      return 'about';
    }
    if (hash === 'olympiad' || hash === 'regulations' || hash === 'stages' || hash === 'awards') {
      if (hash === 'regulations') return 'olympiad/regulations';
      if (hash === 'stages') return 'olympiad/stages';
      if (hash === 'awards') return 'olympiad/awards';
      return 'olympiad';
    }
    return hash || 'home';
  }

  // Handle browser back/forward
  window.addEventListener('popstate', function () {
    var route = getRoute();
    navigate(route);
  });

  // Handle hash change
  window.addEventListener('hashchange', function () {
    var route = getRoute();
    navigate(route);
  });

  // Initialize
  if (header) {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', toggleMenu);
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenuOnLink);
    });
  }

  initDropdowns();
  initRouteLinks();
  initImageModal();

  // Initial navigation
  var initialRoute = getRoute();
  navigate(initialRoute);
  
  // Update URL if needed
  if (window.location.hash !== '#' + initialRoute) {
    window.history.replaceState({ route: initialRoute }, '', '#' + initialRoute);
  }

  // Image modal (lightbox)
  function initImageModal() {
    var modal = document.getElementById('image-modal');
    var modalImg = modal && modal.querySelector('.image-modal-img');
    var backdrop = modal && modal.querySelector('.image-modal-backdrop');
    var closeBtn = modal && modal.querySelector('.image-modal-close');

    if (!modal || !modalImg) return;

    function openModal(src, alt) {
      modalImg.src = src;
      modalImg.alt = alt || 'Image';
      modal.removeAttribute('hidden');
      modal.classList.add('image-modal-open');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove('image-modal-open');
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
      modalImg.src = '';
    }

    // Click on gallery or proof images
    document.addEventListener('click', function (e) {
      var img = e.target.closest('.olympiad-gallery img, .proof-visual img');
      if (!img) return;
      e.preventDefault();
      openModal(img.src, img.alt);
    });

    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('image-modal-open')) {
        closeModal();
      }
    });
  }
})();
