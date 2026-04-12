// ===== Initialize all functionality when DOM is ready =====
function initAll() {
  // ===== Gallery Filter Logic =====
  const filterButtons = document.querySelectorAll('.filter-buttons button');
  const projectItems = document.querySelectorAll('[data-category]');

  // Show only "views" projects on initial load (pro-1 and pro-2)
  const outerDivs = document.querySelectorAll('.outer-div');
  
  projectItems.forEach(item => {
    const category = item.getAttribute('data-category');
    if (category === 'views') {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  // Show outer-div containers for views on initial load
  outerDivs.forEach(div => {
    const project = div.querySelector('[data-category]');
    if (project && project.getAttribute('data-category') === 'views') {
      div.style.display = 'flex';
    } else {
      div.style.display = 'none';
    }
  });

  // Handle filter button clicks
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const activeBtn = document.querySelector('.filter-buttons button.active');
      if (activeBtn) activeBtn.classList.remove('active');
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // Get all outer-div containers
      const outerDivs = document.querySelectorAll('.outer-div');
      
      projectItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (category === filterValue) {
          // Use flex for pro-3, block for others
          if (item.classList.contains('pro-3')) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'block';
          }
        } else {
          item.style.display = 'none';
        }
      });

      // Hide/show outer-div containers based on filter
      if (filterValue === 'concepts') {
        // Hide all outer-div containers when concepts is selected
        outerDivs.forEach(div => {
          div.style.display = 'none';
        });
      } else {
        // Show outer-div containers for views and portfolio
        outerDivs.forEach(div => {
          const project = div.querySelector('[data-category]');
          if (project && project.getAttribute('data-category') === filterValue) {
            div.style.display = 'flex';
          } else {
            div.style.display = 'none';
          }
        });
      }
    });
  });

  // ===== Hamburger Menu Toggle =====
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinksA = document.querySelectorAll('.nav-links a');

  const setMenuOpen = (open) => {
    navLinks.classList.toggle('active', open);
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  hamburger.addEventListener('click', () => {
    const open = !navLinks.classList.contains('active');
    setMenuOpen(open);
  });

  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const open = !navLinks.classList.contains('active');
      setMenuOpen(open);
    }
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('active')) return;
    if (hamburger.contains(e.target) || navLinks.contains(e.target)) return;
    setMenuOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      setMenuOpen(false);
    }
  });

  // Smooth in-page navigation (works well with scroll-padding on html)
  const smoothScrollToHash = (hash) => {
    if (!hash || hash === '#') return;
    const target = document.querySelector(hash);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Close menu when clicking a link
  navLinksA.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        smoothScrollToHash(href);
        if (window.history.replaceState) {
          window.history.replaceState(null, '', href);
        }
      }
      setMenuOpen(false);
    });
  });

  // ===== Enquiry Form Handler =====
  const enquiryForm = document.getElementById('enquiry-form');
  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('enquiry-email').value;
    const subject = 'Enquiry from Pixel Bridge Website';
    const body = `Hello,\n\nI am interested in your services. Please contact me.\n\nFrom: ${email}`;
    window.location.href = `mailto:pixelbridge.tech@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initAll);

function activateCard(card) {
  document.querySelectorAll('.pricing-card').forEach((c) => c.classList.remove('active'));
  card.classList.add('active');
}

window.activateCard = activateCard;
