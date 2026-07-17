/* ==========================================
   THE TOOTH STORY DENTAL CLINIC - CORE LOGIC
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------
     1. Sticky Navigation & Header Scrolled
     ----------------------------------------- */
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once in case page starts scrolled

  /* -----------------------------------------
     2. Active Navigation Section Link Highlighter
     ----------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // Offset for sticky navbar
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav);

  /* -----------------------------------------
     3. Mobile Navigation Menu Toggle
     ----------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuLinks = document.querySelectorAll('.nav-links a');

  const toggleMenu = () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  };

  mobileToggle.addEventListener('click', toggleMenu);

  // Close mobile menu when clicking a link
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  /* -----------------------------------------
     4. Service / Treatment Category Tabs Filter
     ----------------------------------------- */
  const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
  const serviceCards = document.querySelectorAll('.service-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from other buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-tab');

      serviceCards.forEach(card => {
        // Simple scaling fade animation on filter
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });

  /* -----------------------------------------
     5. Gallery Category Tabs Filter
     ----------------------------------------- */
  const galleryTabBtns = document.querySelectorAll('.tab-btn[data-gallery-tab]');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-gallery-tab');

      galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';

        setTimeout(() => {
          if (filterValue === 'all' || item.getAttribute('data-gallery-category') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.display = 'none';
          }
        }, 300);
      });
    });
  });

  /* -----------------------------------------
     6. Gallery Lightbox Modal
     ----------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      const captionText = item.querySelector('.gallery-overlay h4').textContent;
      
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = captionText;
      
      lightbox.classList.add('active');
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
  };

  lightboxClose.addEventListener('click', closeLightbox);
  
  // Close lightbox clicking on overlay background
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close lightbox on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  /* -----------------------------------------
     7. Testimonial Carousel / Slider
     ----------------------------------------- */
  const track = document.getElementById('carousel-track');
  const slides = Array.from(track.children);
  const nextBtn = document.getElementById('carousel-next');
  const prevBtn = document.getElementById('carousel-prev');
  const dotsNav = document.getElementById('carousel-dots');
  
  let currentIndex = 0;
  let autoSlideTimer;

  // Create DOT navigation items dynamically
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to review slide ${index + 1}`);
    dotsNav.appendChild(dot);
  });

  const dots = Array.from(dotsNav.children);

  const updateCarousel = (targetIndex) => {
    // Translate the track horizontally
    track.style.transform = `translateX(-${targetIndex * 100}%)`;
    
    // Update active classes on dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[targetIndex].classList.add('active');
    
    currentIndex = targetIndex;
  };

  const nextSlide = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= slides.length) {
      nextIndex = 0;
    }
    updateCarousel(nextIndex);
  };

  const prevSlide = () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = slides.length - 1;
    }
    updateCarousel(prevIndex);
  };

  // Nav button listeners
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });

  // Dots navigation click listener
  dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;
    
    const targetIndex = dots.indexOf(targetDot);
    updateCarousel(targetIndex);
    resetAutoSlide();
  });

  // Automated sliding loop
  const startAutoSlide = () => {
    autoSlideTimer = setInterval(nextSlide, 5000);
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  };

  // Pause sliding when user is hovering over testimonials
  const carouselOuter = document.querySelector('.carousel-outer');
  carouselOuter.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
  carouselOuter.addEventListener('mouseleave', startAutoSlide);

  startAutoSlide(); // Launch slider

  /* -----------------------------------------
     8. Appointment Booking Form Interactive Simulation
     ----------------------------------------- */
  const appointmentForm = document.getElementById('appointment-form');
  const formSuccess = document.getElementById('form-success');
  const successName = document.getElementById('success-name');
  const successDateTime = document.getElementById('success-datetime');

  // Set min date to today's date so patients cannot choose past dates
  const dateInput = document.getElementById('booking-date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;

  appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Extract inputs
    const patientName = document.getElementById('patient-name').value.trim();
    const patientPhone = document.getElementById('patient-phone').value.trim();
    const bookingDate = document.getElementById('booking-date').value;
    const bookingTime = document.getElementById('booking-time').value;
    const bookingService = document.getElementById('booking-service').value;
    const patientMsg = document.getElementById('patient-message').value.trim();

    // Mock API delay with spinner/state transition
    const submitBtn = appointmentForm.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing Request...';

    setTimeout(() => {
      // Hide all input fields smoothly
      Array.from(appointmentForm.children).forEach(child => {
        if (child !== formSuccess) {
          child.style.display = 'none';
        }
      });

      // Construct clean date formatting
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Date(bookingDate).toLocaleDateString('en-US', dateOptions);

      // Populate success message details
      successName.textContent = patientName;
      successDateTime.textContent = `${formattedDate} during the ${bookingTime}`;
      
      // Render beautiful confirmation box
      formSuccess.style.display = 'flex';

      // Log receipt in console (simulating API callback)
      console.log('--- NEW APPOINTMENT REQUEST RECEIVED ---');
      console.log({
        patientName,
        patientPhone,
        appointmentDateTime: `${bookingDate} (${bookingTime})`,
        serviceRequested: bookingService,
        message: patientMsg || 'None'
      });
      console.log('---------------------------------------');
      
    }, 1500);
  });

  /* -----------------------------------------
     9. FAQ Accordion Toggle Interaction
     ----------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other open accordion panels
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-body').style.maxHeight = null;
      });

      // Toggle active status of clicked panel
      if (!isActive) {
        item.classList.add('active');
        // Set max-height to scrollHeight dynamically for smooth transitions
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

});
