/* ============================================
   COMPLEXE SCOLAIRE LA GRÂCE - JAVASCRIPT
   ============================================ */

// Navigation mobile - Menu burger
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle menu mobile
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('active');
    });
  }

  // Fermer le menu au clic sur un lien
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Fermer le menu si on clique en dehors
  document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
      const isClickInsideNav = nav.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Navigation active au scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinksArray = Array.from(navLinks);

  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinksArray.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // Smooth scroll pour les ancres
  navLinksArray.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Gestion des formulaires
  const admissionForm = document.getElementById('admissionForm');
  const contactForm = document.getElementById('contactForm');

  // Formulaire d'admission
  if (admissionForm) {
    admissionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Récupération des données
      const formData = new FormData(admissionForm);
      const data = Object.fromEntries(formData);
      
      // Validation basique
      if (!data.nom || !data.email || !data.telephone || !data.niveau) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
      }

      // Simulation d'envoi (à remplacer par un vrai envoi)
      console.log('Données du formulaire d\'admission:', data);
      
      // Message de confirmation
      alert('Merci pour votre demande ! Nous vous contacterons sous peu.');
      admissionForm.reset();
    });
  }

  // Formulaire de contact
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Récupération des données
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Validation basique
      if (!data.nom || !data.email || !data.sujet || !data.message) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
      }

      // Simulation d'envoi (à remplacer par un vrai envoi)
      console.log('Données du formulaire de contact:', data);
      
      // Message de confirmation
      alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
      contactForm.reset();
    });
  }

  // Gestion du redimensionnement de la fenêtre
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Fermer le menu mobile si on passe en desktop
      if (window.innerWidth > 768) {
        nav.classList.remove('active');
        if (menuToggle) {
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    }, 250);
  });

  // Scroll Reveal Effect
  const revealElements = document.querySelectorAll('.reveal');
  
  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150; // Distance du bas de l'écran pour déclencher l'animation

    revealElements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }

  // Compteur animé pour les statistiques - Synchronisé
  const statBlobs = document.querySelectorAll('.stat-blob[data-target]');
  const animatedStats = new Set();
  let statsAnimationStarted = false;

  function animateCounter(statBlob, startTime, duration) {
    const target = parseInt(statBlob.getAttribute('data-target'));
    const suffix = statBlob.getAttribute('data-suffix') || '';
    const statNumber = statBlob.querySelector('.stat-number');
    
    if (!statNumber || isNaN(target)) return;

    function updateCounter() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Utiliser une fonction d'easing pour un effet plus fluide
      const easedProgress = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      const current = Math.floor(easedProgress * target);
      statNumber.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        statNumber.textContent = target + suffix;
      }
    }

    updateCounter();
  }

  // Observer pour déclencher l'animation quand la section des stats est visible
  function checkAndAnimateStats() {
    if (statsAnimationStarted) return;
    
    // Vérifier si au moins une bulle est visible (la section est dans le viewport)
    const statsContainer = document.querySelector('.about-stats');
    if (!statsContainer) return;
    
    const containerRect = statsContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const isVisible = containerRect.top < windowHeight - 100 && containerRect.bottom > 0;
    
    if (isVisible && statBlobs.length > 0) {
      statsAnimationStarted = true;
      
      // Démarrer tous les compteurs en même temps avec le même timing
      const startTime = Date.now();
      const duration = 2000; // 2 secondes pour tous - synchronisé
      
      statBlobs.forEach((statBlob) => {
        animatedStats.add(statBlob);
        animateCounter(statBlob, startTime, duration);
      });
    }
  }

  // Vérifier au chargement de la page
  revealOnScroll();
  setTimeout(checkAndAnimateStats, 100);
  
  // Vérifier au scroll
  window.addEventListener('scroll', () => {
    revealOnScroll();
    checkAndAnimateStats();
  });
  
  // Vérifier au redimensionnement
  window.addEventListener('resize', () => {
    revealOnScroll();
    checkAndAnimateStats();
  });

  // Carousel Activités
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');
  const carouselIndicators = document.getElementById('carouselIndicators');
  
  if (carouselTrack && carouselPrev && carouselNext) {
    const cards = carouselTrack.querySelectorAll('.activity-card');
    let currentIndex = 0;
    const totalCards = cards.length;

    // Créer les indicateurs
    if (carouselIndicators && totalCards > 0) {
      for (let i = 0; i < totalCards; i++) {
        const indicator = document.createElement('button');
        indicator.classList.add('carousel-indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.setAttribute('aria-label', `Aller à la slide ${i + 1}`);
        indicator.addEventListener('click', () => goToSlide(i));
        carouselIndicators.appendChild(indicator);
      }
    }

    function updateCarousel() {
      const offset = -currentIndex * 100;
      carouselTrack.style.transform = `translateX(${offset}%)`;
      
      // Mettre à jour les indicateurs
      if (carouselIndicators) {
        const indicators = carouselIndicators.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
          if (index === currentIndex) {
            indicator.classList.add('active');
          } else {
            indicator.classList.remove('active');
          }
        });
      }
    }

    function goToSlide(index) {
      currentIndex = index;
      if (currentIndex < 0) currentIndex = totalCards - 1;
      if (currentIndex >= totalCards) currentIndex = 0;
      updateCarousel();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalCards;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      updateCarousel();
    }

    carouselNext.addEventListener('click', nextSlide);
    carouselPrev.addEventListener('click', prevSlide);

    // Auto-play
    let autoPlayInterval = setInterval(nextSlide, 5000);
    
    // Pause au survol
    const carouselWrapper = carouselTrack.closest('.carousel-wrapper');
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
      });
      carouselWrapper.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
      });
    }

    // Pause quand la fenêtre n'est pas visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(autoPlayInterval);
      } else {
        autoPlayInterval = setInterval(nextSlide, 5000);
      }
    });

    // Initialisation
    updateCarousel();
  }
});

// Animation Typewriter pour "Grâce" avec va-et-vient
function typeWriter(element, text, speed = 100, deleteSpeed = 50) {
  let i = 0;
  let isDeleting = false;
  element.textContent = '';
  element.classList.add('typing');
  
  function type() {
    if (!isDeleting && i < text.length) {
      // Écriture
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (!isDeleting && i >= text.length) {
      // Pause avant d'effacer
      isDeleting = true;
      setTimeout(type, 2000); // Pause de 2 secondes avant d'effacer
    } else if (isDeleting && i > 0) {
      // Effacement
      element.textContent = text.substring(0, i - 1);
      i--;
      setTimeout(type, deleteSpeed);
    } else {
      // Recommencer
      isDeleting = false;
      element.textContent = '';
      i = 0;
      setTimeout(type, 500); // Pause de 0.5 seconde avant de recommencer
    }
  }
  
  type();
}

// Démarrer l'animation typewriter au chargement
// Animation Typewriter pour "La Grâce"
function initTypewriter() {
  const typewriterElement = document.querySelector('.typewriter-text');
  if (typewriterElement) {
    const text = 'La Grâce';
    typeWriter(typewriterElement, text, 150, 75);
  }
}

// Appeler l'animation typewriter après le chargement
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTypewriter);
} else {
  initTypewriter();
}

