/**
 * EPICMINE Animations & Cursor Effects
 * AOS-like scroll animations and custom cursor implementation
 */

class EpicMineAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.cursor = null;
    this.cursorOutline = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorTrails = [];
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupAnimations();
        this.setupCursor();
        this.setupParallax();
      });
    } else {
      this.setupAnimations();
      this.setupCursor();
      this.setupParallax();
    }
  }
  
  // AOS-like scroll animations
  setupAnimations() {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    
    // Setup intersection observer for scroll animations
    this.animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Handle stagger animations
          if (entry.target.classList.contains('stagger-children')) {
            this.handleStaggeredAnimation(entry.target);
          }
        }
      });
    }, this.observerOptions);
    
    // Observe all elements with animation classes
    this.observeAnimationElements();
    
    // Setup automatic animation classes
    this.setupAutoAnimations();
  }
  
  observeAnimationElements() {
    const animationSelectors = [
      '.animate-on-scroll',
      '.fade-up',
      '.fade-down',
      '.fade-left',
      '.fade-right',
      '.fade-in',
      '.zoom-in',
      '.zoom-out',
      '.flip-left',
      '.flip-right',
      '.flip-up',
      '.flip-down',
      '.slide-up',
      '.slide-down',
      '.slide-left',
      '.slide-right',
      '.stagger-children'
    ];
    
    animationSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.classList.add('animate-on-scroll');
        this.animationObserver.observe(el);
      });
    });
  }
  
  setupAutoAnimations() {
    // Auto-add animation classes to common elements
    const autoAnimations = [
      { selector: '.server-mode-card', class: 'fade-up', delay: true },
      { selector: '.feature-card', class: 'fade-up', delay: true },
      { selector: '.stat-card', class: 'zoom-in', delay: true },
      { selector: '.hero-content', class: 'fade-up' },
      { selector: '.server-modes-title', class: 'fade-down' },
      { selector: '.features-title', class: 'fade-down' },
      { selector: '.stats-title', class: 'fade-down' },
      { selector: '.cta-title', class: 'fade-down' }
    ];
    
    autoAnimations.forEach(({ selector, class: className, delay }) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        el.classList.add(className, 'animate-on-scroll');
        
        if (delay) {
          el.style.setProperty('--stagger-delay', `${index * 0.1}s`);
          el.classList.add(`delay-${(index + 1) * 100}`);
        }
        
        this.animationObserver.observe(el);
      });
    });
  }
  
  handleStaggeredAnimation(parent) {
    const children = parent.children;
    Array.from(children).forEach((child, index) => {
      setTimeout(() => {
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }
  
  // Custom cursor implementation
  setupCursor() {
    // Check if device supports hover (not touch device)
    if (!window.matchMedia('(hover: hover)').matches) {
      return;
    }
    
    // Create cursor elements
    this.createCursorElements();
    
    // Setup mouse tracking
    this.setupMouseTracking();
    
    // Setup cursor interactions
    this.setupCursorInteractions();
    
    // Setup cursor trail
    this.setupCursorTrail();
  }
  
  createCursorElements() {
    // Main cursor dot
    this.cursor = document.createElement('div');
    this.cursor.className = 'cursor';
    document.body.appendChild(this.cursor);
    
    // Cursor outline
    this.cursorOutline = document.createElement('div');
    this.cursorOutline.className = 'cursor-outline';
    document.body.appendChild(this.cursorOutline);
  }
  
  setupMouseTracking() {
    let cursorX = 0;
    let cursorY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      
      cursorX = e.clientX;
      cursorY = e.clientY;
    });
    
    // Animate cursor with easing
    const animateCursor = () => {
      // Main cursor follows immediately
      if (this.cursor) {
        this.cursor.style.left = `${cursorX}px`;
        this.cursor.style.top = `${cursorY}px`;
      }
      
      // Outline follows with easing
      if (this.cursorOutline) {
        outlineX += (cursorX - outlineX) * 0.15;
        outlineY += (cursorY - outlineY) * 0.15;
        
        this.cursorOutline.style.left = `${outlineX}px`;
        this.cursorOutline.style.top = `${outlineY}px`;
      }
      
      requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
  }
  
  setupCursorInteractions() {
    // Interactive elements
    const interactiveElements = [
      'a', 'button', '[role="button"]', '.clickable',
      'input', 'textarea', '[contenteditable]'
    ];
    
    interactiveElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.addEventListener('mouseenter', () => this.activateCursor());
        el.addEventListener('mouseleave', () => this.deactivateCursor());
      });
    });
    
    // Special hover effects
    document.addEventListener('mouseenter', (e) => {
      if (e.target.classList.contains('glow-cursor')) {
        this.cursor?.classList.add('glow');
        this.cursorOutline?.classList.add('glow');
      }
    });
    
    document.addEventListener('mouseleave', (e) => {
      if (e.target.classList.contains('glow-cursor')) {
        this.cursor?.classList.remove('glow');
        this.cursorOutline?.classList.remove('glow');
      }
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
      this.cursor?.classList.add('active');
      this.cursorOutline?.classList.add('active');
    });
    
    document.addEventListener('mouseup', () => {
      this.cursor?.classList.remove('active');
      this.cursorOutline?.classList.remove('active');
    });
  }
  
  activateCursor() {
    this.cursor?.classList.add('active');
    this.cursorOutline?.classList.add('active');
  }
  
  deactivateCursor() {
    this.cursor?.classList.remove('active');
    this.cursorOutline?.classList.remove('active');
  }
  
  setupCursorTrail() {
    // Create trail dots
    for (let i = 0; i < 10; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      document.body.appendChild(trail);
      this.cursorTrails.push({
        element: trail,
        x: 0,
        y: 0
      });
    }
    
    // Animate trail
    setInterval(() => {
      if (this.cursorTrails.length === 0) return;
      
      // Update trail positions
      this.cursorTrails.forEach((trail, index) => {
        const delay = index * 20;
        
        setTimeout(() => {
          trail.x += (this.mouseX - trail.x) * 0.3;
          trail.y += (this.mouseY - trail.y) * 0.3;
          
          trail.element.style.left = `${trail.x}px`;
          trail.element.style.top = `${trail.y}px`;
          trail.element.style.opacity = Math.max(0, 1 - (index * 0.1));
        }, delay);
      });
    }, 16); // 60fps
  }
  
  // Parallax scrolling effects
  setupParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    
    const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    const updateParallax = () => {
      const scrollY = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = el.classList.contains('parallax-slow') ? 0.5 :
                     el.classList.contains('parallax-medium') ? 0.8 : 1.2;
        
        const yPos = -(scrollY * speed);
        el.style.setProperty('--parallax-offset', `${yPos}px`);
      });
      
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }
  
  // Card hover effects with mouse position
  setupCardHoverEffects() {
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    });
  }
  
  // Loading states
  setLoading(element, isLoading = true) {
    if (isLoading) {
      this.cursor?.classList.add('loading');
      this.cursorOutline?.classList.add('loading');
      element?.classList.add('loading');
    } else {
      this.cursor?.classList.remove('loading');
      this.cursorOutline?.classList.remove('loading');
      element?.classList.remove('loading');
    }
  }
  
  // Cleanup method
  destroy() {
    if (this.animationObserver) {
      this.animationObserver.disconnect();
    }
    
    // Remove cursor elements
    this.cursor?.remove();
    this.cursorOutline?.remove();
    this.cursorTrails.forEach(trail => trail.element.remove());
  }
  
  // Public methods for manual control
  animateElement(element, animationType = 'fade-up') {
    if (!element) return;
    
    element.classList.add('animate-on-scroll', animationType);
    this.animationObserver?.observe(element);
  }
  
  triggerAnimation(element) {
    if (!element) return;
    element.classList.add('animate');
  }
  
  resetAnimation(element) {
    if (!element) return;
    element.classList.remove('animate');
  }
}

// Auto-initialize when script loads
let epicAnimations;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    epicAnimations = new EpicMineAnimations();
  });
} else {
  epicAnimations = new EpicMineAnimations();
}

// Export for manual use
window.EpicMineAnimations = EpicMineAnimations;
window.epicAnimations = epicAnimations;

// Additional utility functions
window.epicUtils = {
  // Smooth scroll to element
  scrollTo(element, offset = 80) {
    if (!element) return;
    
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  },
  
  // Add loading state to any element
  setLoading(element, isLoading = true) {
    epicAnimations?.setLoading(element, isLoading);
  },
  
  // Animate element manually
  animate(element, type = 'fade-up') {
    epicAnimations?.animateElement(element, type);
  },
  
  // Show/hide elements with animation
  show(element, animationType = 'fade-in') {
    if (!element) return;
    
    element.style.display = 'block';
    element.classList.add('animate-on-scroll', animationType);
    
    requestAnimationFrame(() => {
      element.classList.add('animate');
    });
  },
  
  hide(element, callback) {
    if (!element) return;
    
    element.classList.remove('animate');
    
    setTimeout(() => {
      element.style.display = 'none';
      callback?.();
    }, 300);
  }
};

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when tab is hidden
    epicAnimations?.cursor?.classList.add('hidden');
    epicAnimations?.cursorOutline?.classList.add('hidden');
  } else {
    // Resume animations when tab is visible
    epicAnimations?.cursor?.classList.remove('hidden');
    epicAnimations?.cursorOutline?.classList.remove('hidden');
  }
});

// Export for CommonJS/ES6 modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EpicMineAnimations;
}
