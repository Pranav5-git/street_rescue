// Animal Rescue Website JavaScript

// Application Data
const appData = {
  quotes: [
    "The greatness of a nation can be judged by the way its animals are treated. - Mahatma Gandhi",
    "Until one has loved an animal, a part of one's soul remains unawakened. - Anatole France",
    "Animals are such agreeable friends—they ask no questions; they pass no criticisms. - George Eliot",
    "The purity of a person's heart can be quickly measured by how they regard animals. - Anonymous",
    "Compassion for animals is intimately associated with goodness of character. - Arthur Schopenhauer",
    "The love for all living creatures is the most noble attribute of man. - Charles Darwin"
  ],
  pets: [
    {
      id: 1,
      name: "Buddy",
      species: "Dog",
      breed: "Golden Retriever",
      age: "2 years",
      gender: "Male",
      size: "Large",
      health: "Healthy",
      location: "Mumbai",
      description: "Friendly and energetic dog looking for a loving home",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Whiskers",
      species: "Cat",
      breed: "Persian",
      age: "1 year",
      gender: "Female",
      size: "Medium",
      health: "Healthy",
      location: "Delhi",
      description: "Calm and affectionate cat, perfect for apartments",
      image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Max",
      species: "Dog",
      breed: "Labrador",
      age: "3 years",
      gender: "Male",
      size: "Large",
      health: "Recovering",
      location: "Bangalore",
      description: "Rescued from streets, very loyal and protective",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Luna",
      species: "Cat",
      breed: "Siamese",
      age: "6 months",
      gender: "Female",
      size: "Small",
      health: "Healthy",
      location: "Chennai",
      description: "Playful kitten who loves to cuddle",
      image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=300&h=300&fit=crop"
    }
  ],
  videos: [
    {
      id: 1,
      title: "Basic Pet Care for New Owners",
      category: "Basic Care",
      duration: "12:45",
      views: 15420,
      description: "Learn the fundamentals of caring for your new pet",
      thumbnail: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "First Aid for Street Animals",
      category: "First Aid",
      duration: "8:30",
      views: 8950,
      description: "Emergency care techniques for injured animals",
      thumbnail: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Proper Nutrition for Dogs",
      category: "Nutrition",
      duration: "15:20",
      views: 12340,
      description: "Understanding dietary needs and feeding schedules",
      thumbnail: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Grooming Your Cat at Home",
      category: "Grooming",
      duration: "10:15",
      views: 7680,
      description: "Step-by-step guide to keeping your cat clean",
      thumbnail: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=300&h=200&fit=crop"
    }
  ]
};

// Application State
let currentUser = null;
let currentQuoteIndex = 0;
let currentSection = 'home';
let selectedPet = null;
let likedVideos = new Set();

// Global function declarations for onclick handlers
window.showSection = showSection;
window.openModal = openModal;
window.closeModal = closeModal;
window.showLoginForm = showLoginForm;
window.showSignupForm = showSignupForm;
window.nextQuote = nextQuote;
window.previousQuote = previousQuote;
window.showPetDetails = showPetDetails;
window.showAdoptionForm = showAdoptionForm;
window.filterPets = filterPets;
window.filterVideos = filterVideos;
window.toggleLike = toggleLike;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing application...');
  initializeApp();
  setupEventListeners();
  showSection('home');
});

function initializeApp() {
  console.log('App initialized');
  // Check if user is logged in (simulate with session storage)
  const savedUser = sessionStorage.getItem('currentUser');
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      updateAuthUI(true);
    } catch (e) {
      console.error('Error parsing saved user:', e);
      sessionStorage.removeItem('currentUser');
    }
  }
  
  renderPets();
  renderVideos();
  initializeQuotes();
}

function setupEventListeners() {
  // Auth buttons
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (loginBtn) {
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openModal('authModal');
    });
  }
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }
  
  // Auth forms
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }
  
  // Mobile menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  
  // Donation form
  const donationForm = document.getElementById('donationForm');
  if (donationForm) {
    donationForm.addEventListener('submit', handleDonation);
    setupDonationForm();
  }
  
  // Adoption form
  const adoptionForm = document.getElementById('adoptionForm');
  if (adoptionForm) {
    adoptionForm.addEventListener('submit', handleAdoptionApplication);
  }
  
  // Close modals when clicking outside
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      closeModal(e.target.id);
    }
  });
  
  console.log('Event listeners set up');
}

// Authentication Functions
function handleLogin(e) {
  e.preventDefault();
  console.log('Login form submitted');
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const rememberMe = document.getElementById('rememberMe').checked;
  
  if (!email || !password) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  // Simulate login (in real app, this would be an API call)
  const user = {
    id: 1,
    name: email.split('@')[0],
    email: email
  };
  
  currentUser = user;
  sessionStorage.setItem('currentUser', JSON.stringify(user));
  
  updateAuthUI(true);
  closeModal('authModal');
  showNotification('Login successful!', 'success');
  showSection('dashboard');
}

function handleSignup(e) {
  e.preventDefault();
  console.log('Signup form submitted');
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  if (!name || !email || !password || !confirmPassword) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  if (password !== confirmPassword) {
    showNotification('Passwords do not match', 'error');
    return;
  }
  
  // Simulate signup
  const user = {
    id: Date.now(),
    name: name,
    email: email
  };
  
  currentUser = user;
  sessionStorage.setItem('currentUser', JSON.stringify(user));
  
  updateAuthUI(true);
  closeModal('authModal');
  showNotification('Account created successfully!', 'success');
  showSection('dashboard');
}

function logout() {
  console.log('Logging out');
  currentUser = null;
  sessionStorage.removeItem('currentUser');
  updateAuthUI(false);
  showSection('home');
  showNotification('Logged out successfully', 'success');
}

function updateAuthUI(isLoggedIn) {
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const userWelcome = document.getElementById('userWelcome');
  
  if (isLoggedIn && currentUser) {
    if (loginBtn) loginBtn.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.remove('hidden');
    if (userWelcome) {
      userWelcome.classList.remove('hidden');
      userWelcome.textContent = `Welcome, ${currentUser.name}`;
    }
    
    // Update dashboard name
    const dashboardUserName = document.getElementById('dashboardUserName');
    if (dashboardUserName) {
      dashboardUserName.textContent = currentUser.name;
    }
  } else {
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
    if (userWelcome) userWelcome.classList.add('hidden');
  }
}

function showLoginForm() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const authTitle = document.getElementById('authTitle');
  
  if (loginForm) loginForm.classList.remove('hidden');
  if (signupForm) signupForm.classList.add('hidden');
  if (authTitle) authTitle.textContent = 'Login';
}

function showSignupForm() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const authTitle = document.getElementById('authTitle');
  
  if (loginForm) loginForm.classList.add('hidden');
  if (signupForm) signupForm.classList.remove('hidden');
  if (authTitle) authTitle.textContent = 'Sign Up';
}

// Section Navigation
function showSection(sectionName) {
  console.log('Showing section:', sectionName);
  
  // Hide all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.add('hidden'));
  
  // Show selected section
  const targetSection = document.getElementById(sectionName + 'Section');
  if (targetSection) {
    targetSection.classList.remove('hidden');
    console.log('Section shown:', sectionName);
  } else {
    console.error('Section not found:', sectionName + 'Section');
  }
  
  // Special handling for dashboard - require login
  if (sectionName === 'dashboard' && !currentUser) {
    openModal('authModal');
    return;
  }
  
  // Special handling for donate and adoption - require login
  if ((sectionName === 'donate' || sectionName === 'adoption') && !currentUser) {
    openModal('authModal');
    return;
  }
  
  // Show dashboard if logged in and trying to access home
  if (sectionName === 'home' && currentUser) {
    const dashboardSection = document.getElementById('dashboardSection');
    if (dashboardSection) {
      dashboardSection.classList.remove('hidden');
      if (targetSection) {
        targetSection.classList.add('hidden');
      }
      currentSection = 'dashboard';
      return;
    }
  }
  
  currentSection = sectionName;
}

// Modal Functions
function openModal(modalId) {
  console.log('Opening modal:', modalId);
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    if (modalId === 'authModal') {
      showLoginForm();
    }
  } else {
    console.error('Modal not found:', modalId);
  }
}

function closeModal(modalId) {
  console.log('Closing modal:', modalId);
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Quote Management
function initializeQuotes() {
  displayQuote();
  // Auto-rotate quotes every 10 seconds
  setInterval(nextQuote, 10000);
}

function displayQuote() {
  const quoteElement = document.getElementById('currentQuote');
  if (quoteElement && appData.quotes.length > 0) {
    quoteElement.textContent = appData.quotes[currentQuoteIndex];
  }
}

function nextQuote() {
  currentQuoteIndex = (currentQuoteIndex + 1) % appData.quotes.length;
  displayQuote();
}

function previousQuote() {
  currentQuoteIndex = currentQuoteIndex === 0 ? appData.quotes.length - 1 : currentQuoteIndex - 1;
  displayQuote();
}

// Pet Management
function renderPets() {
  const petsGrid = document.getElementById('petsGrid');
  if (!petsGrid) return;
  
  console.log('Rendering pets');
  petsGrid.innerHTML = '';
  
  appData.pets.forEach(pet => {
    const petCard = createPetCard(pet);
    petsGrid.appendChild(petCard);
  });
}

function createPetCard(pet) {
  const card = document.createElement('div');
  card.className = 'pet-card';
  card.innerHTML = `
    <div class="pet-image">
      <img src="${pet.image}" alt="${pet.name}" loading="lazy">
    </div>
    <div class="pet-info">
      <h3 class="pet-name">${pet.name}</h3>
      <div class="pet-details-grid">
        <div class="pet-detail"><strong>Species:</strong> ${pet.species}</div>
        <div class="pet-detail"><strong>Age:</strong> ${pet.age}</div>
        <div class="pet-detail"><strong>Gender:</strong> ${pet.gender}</div>
        <div class="pet-detail"><strong>Size:</strong> ${pet.size}</div>
      </div>
      <p class="pet-description">${pet.description}</p>
      <button class="btn btn--primary btn--full-width" onclick="showPetDetails(${pet.id})">
        Learn More
      </button>
    </div>
  `;
  return card;
}

function showPetDetails(petId) {
  console.log('Showing pet details for:', petId);
  const pet = appData.pets.find(p => p.id === petId);
  if (!pet) return;
  
  selectedPet = pet;
  
  // Populate modal
  const elements = {
    petModalName: pet.name,
    petModalImage: pet.image,
    petModalSpecies: pet.species,
    petModalBreed: pet.breed,
    petModalAge: pet.age,
    petModalGender: pet.gender,
    petModalSize: pet.size,
    petModalHealth: pet.health,
    petModalLocation: pet.location,
    petModalDescription: pet.description
  };
  
  Object.keys(elements).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      if (id === 'petModalImage') {
        element.src = elements[id];
        element.alt = pet.name;
      } else {
        element.textContent = elements[id];
      }
    }
  });
  
  openModal('petModal');
}

function showAdoptionForm() {
  console.log('Showing adoption form');
  if (!currentUser) {
    closeModal('petModal');
    openModal('authModal');
    return;
  }
  
  closeModal('petModal');
  openModal('adoptionModal');
}

function handleAdoptionApplication(e) {
  e.preventDefault();
  console.log('Processing adoption application');
  
  // Simulate form submission
  setTimeout(() => {
    closeModal('adoptionModal');
    showNotification('Adoption application submitted successfully! We will contact you soon.', 'success');
    e.target.reset();
  }, 1000);
}

function filterPets() {
  const speciesFilter = document.getElementById('speciesFilter').value;
  const ageFilter = document.getElementById('ageFilter').value;
  const sizeFilter = document.getElementById('sizeFilter').value;
  
  console.log('Filtering pets:', { speciesFilter, ageFilter, sizeFilter });
  
  let filteredPets = appData.pets;
  
  if (speciesFilter) {
    filteredPets = filteredPets.filter(pet => pet.species === speciesFilter);
  }
  
  if (ageFilter) {
    filteredPets = filteredPets.filter(pet => pet.age === ageFilter);
  }
  
  if (sizeFilter) {
    filteredPets = filteredPets.filter(pet => pet.size === sizeFilter);
  }
  
  const petsGrid = document.getElementById('petsGrid');
  if (!petsGrid) return;
  
  petsGrid.innerHTML = '';
  
  if (filteredPets.length === 0) {
    petsGrid.innerHTML = '<p class="text-center">No pets found matching your criteria.</p>';
  } else {
    filteredPets.forEach(pet => {
      const petCard = createPetCard(pet);
      petsGrid.appendChild(petCard);
    });
  }
}

// Video Management
function renderVideos() {
  const videosGrid = document.getElementById('videosGrid');
  if (!videosGrid) return;
  
  console.log('Rendering videos');
  videosGrid.innerHTML = '';
  
  appData.videos.forEach(video => {
    const videoCard = createVideoCard(video);
    videosGrid.appendChild(videoCard);
  });
}

function createVideoCard(video) {
  const card = document.createElement('div');
  card.className = 'video-card';
  card.innerHTML = `
    <div class="video-thumbnail">
      <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
      <div class="play-button">▶</div>
    </div>
    <div class="video-info">
      <h3 class="video-title">${video.title}</h3>
      <div class="video-meta">
        <span class="video-duration">${video.duration}</span>
        <span class="video-views">${video.views.toLocaleString()} views</span>
      </div>
      <p class="video-description">${video.description}</p>
      <div class="video-actions">
        <button class="like-btn ${likedVideos.has(video.id) ? 'liked' : ''}" onclick="toggleLike(${video.id})">
          ❤ Like
        </button>
      </div>
    </div>
  `;
  return card;
}

function filterVideos(category) {
  console.log('Filtering videos by category:', category);
  
  // Update active category button
  const categoryBtns = document.querySelectorAll('.category-btn');
  categoryBtns.forEach(btn => btn.classList.remove('active'));
  
  // Find and activate the clicked button
  const clickedBtn = Array.from(categoryBtns).find(btn => 
    btn.textContent.trim() === (category || 'All')
  );
  if (clickedBtn) {
    clickedBtn.classList.add('active');
  }
  
  let filteredVideos = appData.videos;
  
  if (category) {
    filteredVideos = filteredVideos.filter(video => video.category === category);
  }
  
  const videosGrid = document.getElementById('videosGrid');
  if (!videosGrid) return;
  
  videosGrid.innerHTML = '';
  
  filteredVideos.forEach(video => {
    const videoCard = createVideoCard(video);
    videosGrid.appendChild(videoCard);
  });
}

function toggleLike(videoId) {
  console.log('Toggling like for video:', videoId);
  
  if (likedVideos.has(videoId)) {
    likedVideos.delete(videoId);
  } else {
    likedVideos.add(videoId);
  }
  
  // Re-render videos to update like buttons
  renderVideos();
}

// Donation Management
function setupDonationForm() {
  // Amount preset buttons
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customAmountInput = document.getElementById('customAmount');
  
  if (!customAmountInput) return;
  
  amountBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      // Remove selected class from all buttons
      amountBtns.forEach(b => b.classList.remove('selected'));
      // Add selected class to clicked button
      this.classList.add('selected');
      // Set custom amount
      customAmountInput.value = this.dataset.amount;
    });
  });
  
  // Custom amount input
  customAmountInput.addEventListener('input', function() {
    amountBtns.forEach(btn => btn.classList.remove('selected'));
  });
}

function handleDonation(e) {
  e.preventDefault();
  console.log('Processing donation');
  
  if (!currentUser) {
    openModal('authModal');
    return;
  }
  
  const customAmount = document.getElementById('customAmount').value;
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'UPI';
  const donorName = document.getElementById('donorName').value;
  const donorEmail = document.getElementById('donorEmail').value;
  const donorPhone = document.getElementById('donorPhone').value;
  
  if (!customAmount || !donorName || !donorEmail || !donorPhone) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }
  
  if (parseInt(customAmount) < 1) {
    showNotification('Minimum donation amount is ₹1', 'error');
    return;
  }
  
  // Simulate payment processing
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  
  if (submitBtn) {
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
  }
  
  setTimeout(() => {
    if (submitBtn) {
      submitBtn.textContent = 'Donate Now';
      submitBtn.disabled = false;
    }
    
    // Simulate random success/failure
    const success = Math.random() > 0.1; // 90% success rate
    
    if (success) {
      showNotification(`Thank you! Your donation of ₹${customAmount} has been processed successfully.`, 'success');
      form.reset();
      
      // Show receipt
      showDonationReceipt(customAmount, paymentMethod, donorName);
    } else {
      showNotification('Payment failed. Please try again.', 'error');
    }
  }, 2000);
}

function showDonationReceipt(amount, method, name) {
  const receiptId = 'PAH' + Date.now();
  const receiptText = `
Donation Receipt

Receipt ID: ${receiptId}
Donor: ${name}
Amount: ₹${amount}
Payment Method: ${method}
Date: ${new Date().toLocaleDateString()}

Thank you for your generous donation!
  `;
  
  setTimeout(() => {
    alert(receiptText);
  }, 500);
}

// Mobile Menu
function toggleMobileMenu() {
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    mainNav.classList.toggle('mobile-open');
  }
}

// Notification System
function showNotification(message, type = 'success') {
  console.log('Showing notification:', message, type);
  
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(n => n.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
  // Close modals with Escape key
  if (e.key === 'Escape') {
    const openModals = document.querySelectorAll('.modal:not(.hidden)');
    openModals.forEach(modal => {
      modal.classList.add('hidden');
    });
  }
});

console.log('JavaScript loaded successfully');