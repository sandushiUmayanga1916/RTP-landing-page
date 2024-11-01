// Navigation Menu Functionality
class NavigationManager {
  constructor() {
    this.init();
  }

  init() {
    // Mobile menu toggle
    document.querySelector(".nav--toggle")?.addEventListener('click', () => {
      document.querySelector("nav.main")?.classList.toggle("open");
    });

    // Submenu toggles
    document.querySelectorAll(".menu--expand-collapse").forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        el.parentElement?.classList.toggle("open");
      });
    });

    // Desktop menu navigation
    this.initDesktopMenu();
  }

  initDesktopMenu() {
    const menuItems = document.querySelectorAll('nav.main li');
    
    menuItems.forEach(item => {
      const link = item.querySelector('a');
      const submenu = item.querySelector('ul');
      
      if (submenu) {
        link?.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          menuItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });
          
          item.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
          if (!item.contains(e.target)) {
            item.classList.remove('active');
          }
        });
      }
    });
  }
}

// Search Functionality
class SearchManager {
  constructor() {
    this.searchOverlay = document.querySelector('.search-overlay');
    this.searchInput = document.querySelector('.search-container input');
    this.clearButton = document.querySelector('.clear-text');
    this.searchIcon = document.querySelector('.search-icon');
    this.closeIcon = document.querySelector('.close-icon');
    this.menuWrapper = document.querySelector('.menu--wrapper');
    
    this.init();
  }

  init() {
    this.initSearchToggle();
    this.initSearchInput();
    this.initKeyboardControls();
    this.initClickOutside();
  }

  initSearchToggle() {
    this.searchIcon?.addEventListener('click', (e) => {
      e.preventDefault();
      this.menuWrapper?.classList.add('collapsed');
      this.searchOverlay?.classList.add('active');
      this.searchInput?.focus();
    });

    this.closeIcon?.addEventListener('click', () => {
      this.closeSearch();
    });
  }

  initSearchInput() {
    this.searchInput?.addEventListener('input', () => {
      if (this.clearButton) {
        this.clearButton.style.display = this.searchInput.value ? 'block' : 'none';
      }
    });

    this.clearButton?.addEventListener('click', () => {
      if (this.searchInput) {
        this.searchInput.value = '';
        this.clearButton.style.display = 'none';
        this.searchInput.focus();
      }
    });

    this.searchInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleSearch();
      }
    });
  }

  initKeyboardControls() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.searchOverlay?.classList.contains('active')) {
        this.closeSearch();
      }
    });
  }

  initClickOutside() {
    this.searchOverlay?.addEventListener('click', (e) => {
      if (e.target === this.searchOverlay) {
        this.closeSearch();
      }
    });
  }

  closeSearch() {
    this.searchOverlay?.classList.remove('active');
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    if (this.clearButton) {
      this.clearButton.style.display = 'none';
    }
  }

  handleSearch() {
    const searchValue = this.searchInput?.value.trim();
    if (searchValue) {
      window.location.href = `https://www.thecirculateinitiative.org/?s=${encodeURIComponent(searchValue)}`;
    }
  }
}

// Carousel Functionality
class CarouselManager {
  constructor() {
    this.carousel = document.querySelector('.carousel-slide');
    this.cards = document.querySelectorAll('.carousel-slide .col');
    this.prevBtn = document.querySelector('.prev-arrow');
    this.nextBtn = document.querySelector('.next-arrow');
    this.currentIndex = 0;
    this.cardWidth = 100 / 3; // Show 3 cards at a time

    this.init();
  }

  init() {
    this.updateCarousel();
    this.initButtons();
  }

  updateCarousel() {
    if (this.carousel) {
      this.carousel.style.transform = `translateX(-${this.currentIndex * this.cardWidth}%)`;
    }
    
    if (this.prevBtn) {
      this.prevBtn.style.display = this.currentIndex === 0 ? 'none' : 'flex';
    }
    
    if (this.nextBtn) {
      this.nextBtn.style.display = this.currentIndex >= this.cards.length - 3 ? 'none' : 'flex';
    }
  }

  initButtons() {
    this.prevBtn?.addEventListener('click', () => {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.updateCarousel();
      }
    });

    this.nextBtn?.addEventListener('click', () => {
      if (this.currentIndex < this.cards.length - 3) {
        this.currentIndex++;
        this.updateCarousel();
      }
    });
  }
}

// Owl Carousel Configuration (jQuery)
function initOwlCarousel() {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    navText: ['<span>‹</span>', '<span>›</span>'],
    dots: false,
    autoplay: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 }
    }
  });
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new NavigationManager();
  new SearchManager();
  new CarouselManager();
  
  // Initialize Owl Carousel if jQuery is available
  if (typeof $ !== 'undefined') {
    initOwlCarousel();
  }
});