window.onload = function(e) {
    document.querySelector(".nav--toggle").onclick = function(e) {
      document.querySelector("nav.main").classList.toggle("open");
    }
    document.querySelectorAll(".menu--expand-collapse").forEach(function(el) {
      el.onclick = function(e) {
        e.preventDefault();
        this.parentElement.classList.toggle("open");
      }
    });
    showModal();
  }

document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('nav.main li');
    
    menuItems.forEach(item => {
      const link = item.querySelector('a');
      const submenu = item.querySelector('ul');
      
      if (submenu) {
        // Handle click events
        link.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          // Remove active class from all other items
          menuItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });
          
          // Toggle active class on clicked item
          item.classList.toggle('active');
        });
        
        // Close submenu when clicking outside
        document.addEventListener('click', (e) => {
          if (!item.contains(e.target)) {
            item.classList.remove('active');
          }
        });
      }
    });
  });
  
  const searchIcon = document.querySelector('.search-icon');
  const closeIcon = document.querySelector('.close-icon');
  const searchOverlay = document.querySelector('.search-overlay');
  
  searchIcon.addEventListener('click', (e) => {
    e.preventDefault();
    searchOverlay.classList.add('active'); // Show search overlay
  });
  
  closeIcon.addEventListener('click', (e) => {
    e.preventDefault();
    searchOverlay.classList.remove('active'); // Hide search overlay
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-container input');
    const clearButton = document.querySelector('.clear-text');
    const searchButton = document.querySelector('.search-container .search-icon');
  
    // Show/hide clear button based on input content
    searchInput.addEventListener('input', function() {
      clearButton.style.display = this.value ? 'block' : 'none';
    });
  
    // Clear input when X is clicked
    clearButton.addEventListener('click', function() {
      searchInput.value = '';
      this.style.display = 'none';
      searchInput.focus();
    });
  
    // Handle search submission function
    function handleSearch() {
      const searchValue = searchInput.value.trim();
      if (searchValue) {
        window.location.href = `https://www.thecirculateinitiative.org/?s=${encodeURIComponent(searchValue)}`;
      }
    }
  
    // Submit search when search button is clicked
    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      handleSearch();
    });
  
    // Submit search when Enter key is pressed
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    });
  
    // Close overlay and clear input when ESC key is pressed
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        clearButton.style.display = 'none';
      }
    });
  
    // Close overlay when clicking outside the search container
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        clearButton.style.display = 'none';
      }
    });
  });
  
  // responsive search
  document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.querySelector('.search-icon');
    const searchOverlay = document.querySelector('.search-overlay');
    const closeSearch = document.querySelector('.close-icon');
    const searchInput = document.querySelector('.search-container input');
    const clearText = document.querySelector('.clear-text');
    const menuWrapper = document.querySelector('.menu--wrapper');
    const navToggle = document.querySelector('.nav--toggle');
  
    // Toggle the menu collapse
    navToggle.addEventListener('click', function() {
      menuWrapper.classList.toggle('collapsed'); // Toggle the 'collapsed' class to hide/show the menu
    });
  
    // Display the search overlay and collapse the menu
    searchIcon.addEventListener('click', function(e) {
      e.preventDefault();
      menuWrapper.classList.add('collapsed'); // Collapse the menu when the search icon is clicked
      searchOverlay.classList.add('active');  // Display the search overlay
      searchInput.focus();                    // Focus on the search input
    });
  
    // Close the search overlay
    closeSearch.addEventListener('click', function() {
      searchOverlay.classList.remove('active'); // Hide the search overlay
      searchInput.value = '';                   // Clear search input
      clearText.style.display = 'none';         // Hide the clear text button
    });
  
    // Close the search overlay with ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active'); // Hide search overlay
        searchInput.value = '';                   // Clear search input
        clearText.style.display = 'none';         // Hide clear text button
      }
    });
  
    // Show/hide clear text button based on input
    searchInput.addEventListener('input', function() {
      clearText.style.display = this.value ? 'block' : 'none';
    });
  
    // Clear search input
    clearText.addEventListener('click', function() {
      searchInput.value = '';
      this.style.display = 'none';
      searchInput.focus();
    });
  
    // Close the overlay when clicking outside the search container
    searchOverlay.addEventListener('click', function(e) {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active'); // Hide search overlay
        searchInput.value = '';                   // Clear search input
        clearText.style.display = 'none';         // Hide clear text button
      }
    });
  });
  
  $(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        navText: ['<span>‹</span>','<span>›</span>'],
        dots: false,
        autoplay: false,
        responsive:{
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });
});

const carousel = document.querySelector('.carousel-slide');
const cards = document.querySelectorAll('.carousel-slide .col');
const prevBtn = document.querySelector('.prev-arrow');
const nextBtn = document.querySelector('.next-arrow');

let currentIndex = 0;
const cardWidth = 100 / 3; // Show 3 cards at a time

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
    
    // Show/hide arrows based on position
    prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
    nextBtn.style.display = currentIndex >= cards.length - 3 ? 'none' : 'flex';
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 3) {
        currentIndex++;
        updateCarousel();
    }
});

// Initial setup
updateCarousel();
