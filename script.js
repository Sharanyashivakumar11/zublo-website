// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formMessage.style.display = 'none';
        
        try {
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Send form data as JSON (required for Google Apps Script)
            const response = await fetch(this.action, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                // Show success message
                formMessage.textContent = 'Thank you for your message! We will get back to you within 24 hours.';
                formMessage.className = 'form-message form-message-success';
                formMessage.style.display = 'block';
                
                // Reset form
                this.reset();
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                throw new Error(data.error || data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            // Show error message
            formMessage.textContent = error.message || 'There was an error sending your message. Please try again or contact us directly at hello@smartermarketing.com';
            formMessage.className = 'form-message form-message-error';
            formMessage.style.display = 'block';
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}

// Button press animation - handled by CSS :active state

// Card hover effects
document.querySelectorAll('.service-card, .pricing-card, .case-study-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.2s ease';
    });
});

// Squiggle animation is handled by CSS keyframes

// Add subtle scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.service-card, .pricing-card, .case-study-card, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Dropdown menu functionality - static positioning only
const navDropdown = document.querySelector('.nav-dropdown');
if (navDropdown) {
    const dropdownLink = navDropdown.querySelector('.nav-link-dropdown');
    const dropdownMenu = navDropdown.querySelector('.dropdown-menu');
    
    // Toggle dropdown on click (for mobile)
    dropdownLink.addEventListener('click', function(e) {
        // Only prevent default on mobile/touch devices
        if (window.innerWidth <= 768) {
            e.preventDefault();
            navDropdown.classList.toggle('active');
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!navDropdown.contains(e.target)) {
            navDropdown.classList.remove('active');
        }
    });
    
    // Close dropdown when clicking a dropdown item
    if (dropdownMenu) {
        dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function() {
                navDropdown.classList.remove('active');
            });
        });
    }
    
    // Ensure dropdown stays in place on hover (desktop)
    if (window.innerWidth > 768) {
        navDropdown.addEventListener('mouseenter', function() {
            navDropdown.classList.add('active');
        });
        
        navDropdown.addEventListener('mouseleave', function() {
            navDropdown.classList.remove('active');
        });
    }
}

// Aperture Lens Follow - Advanced Cursor Tracking with Parallax
(function() {
    const wrap = document.getElementById('aperture-lens');
    const lensGroup = document.getElementById('aperture-lens-group');
    const housing = document.getElementById('aperture-housing');
    const bladesContainer = document.getElementById('aperture-blades-container');
    const highlight = document.getElementById('aperture-highlight');
    const ticksContainer = document.querySelector('.aperture-ticks');
    
    if (!wrap || !lensGroup || !housing || !bladesContainer || !highlight) {
        console.error('Aperture lens elements not found');
        return;
    }
    
    // Utility functions
    function clamp(n, min, max) {
        return Math.max(min, Math.min(max, n));
    }
    
    function lerp(a, b, t) {
        return a + (b - a) * t;
    }
    
    // Create aperture blades (8 blades)
    const blades = Array.from({ length: 8 }, (_, i) => i);
    bladesContainer.innerHTML = '';
    blades.forEach((i) => {
        const blade = document.createElement('div');
        blade.className = 'aperture-blade';
        blade.style.transform = `rotate(${(360 / blades.length) * i}deg) translateX(2%)`;
        const bladeInner = document.createElement('div');
        bladeInner.className = 'aperture-blade-inner';
        blade.appendChild(bladeInner);
        bladesContainer.appendChild(blade);
    });
    
    // Create ticks (12 ticks)
    if (ticksContainer) {
        ticksContainer.innerHTML = '';
        
        // Calculate tick radius based on outer ring size (responsive)
        function getTickRadius() {
            const outerRing = document.querySelector('.aperture-outer-ring');
            if (outerRing) {
                const rect = outerRing.getBoundingClientRect();
                // Position ticks at the edge of the ring (radius - small offset)
                return (rect.width / 2) - 2;
            }
            // Fallback values based on screen size
            if (window.innerWidth <= 480) return 88; // 180px / 2 - 2
            if (window.innerWidth <= 768) return 98; // 200px / 2 - 2
            return 118; // 240px / 2 - 2 (default desktop)
        }
        
        const tickRadius = getTickRadius();
        Array.from({ length: 12 }).forEach((_, i) => {
            const tick = document.createElement('div');
            tick.className = 'aperture-tick';
            tick.style.transform = `rotate(${i * 30}deg) translateY(-${tickRadius}px)`;
            ticksContainer.appendChild(tick);
        });
        
        // Update tick positions on resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newRadius = getTickRadius();
                ticksContainer.querySelectorAll('.aperture-tick').forEach((tick, i) => {
                    tick.style.transform = `rotate(${i * 30}deg) translateY(-${newRadius}px)`;
                });
            }, 100);
        });
    }
    
    // State
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const offset = { x: 0, y: 0 };
    
    // Handle pointer movement
    function handleMove(e) {
        const r = wrap.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        
        const nx = clamp((e.clientX - cx) / (r.width / 2), -1, 1);
        const ny = clamp((e.clientY - cy) / (r.height / 2), -1, 1);
        
        target.x = nx;
        target.y = ny;
    }
    
    function handleLeave() {
        target.x = 0;
        target.y = 0;
    }
    
    window.addEventListener('pointermove', handleMove, { passive: true });
    wrap.addEventListener('pointerleave', handleLeave);
    
    // Animation loop
    let raf = 0;
    
    function tick() {
        // Smooth interpolation
        pos.x = lerp(pos.x, target.x, 0.065);
        pos.y = lerp(pos.y, target.y, 0.065);
        
        // Calculate offsets with parallax
        const tx = pos.x * 14;
        const ty = pos.y * 10;
        const parallax1x = pos.x * 8;
        const parallax1y = pos.y * 6;
        const parallax2x = pos.x * 4;
        const parallax2y = pos.y * 3;
        const highlightX = pos.x * 6;
        const highlightY = pos.y * 4;
        
        // Apply transforms
        lensGroup.style.transform = `translate(${tx}px, ${ty}px)`;
        housing.style.transform = `translate(${parallax2x}px, ${parallax2y}px)`;
        bladesContainer.style.transform = `translate(${parallax1x}px, ${parallax1y}px) rotate(8deg)`;
        highlight.style.transform = `translate(${highlightX}px, ${highlightY}px) rotate(-18deg)`;
        
        raf = requestAnimationFrame(tick);
    }
    
    raf = requestAnimationFrame(tick);
    
    // Cleanup
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', handleMove);
        wrap.removeEventListener('pointerleave', handleLeave);
    });
})();

// Case Study Read More Toggle (Mobile)
(function() {
    function initReadMore() {
        if (window.innerWidth > 768) {
            // Hide read more on desktop
            document.querySelectorAll('.case-study-read-more').forEach(rm => {
                rm.style.display = 'none';
            });
            document.querySelectorAll('.case-study-text').forEach(text => {
                text.style.webkitLineClamp = 'none';
                text.style.display = 'block';
            });
            return;
        }
        
        // Show read more on mobile
        document.querySelectorAll('.case-study-read-more').forEach(readMore => {
            readMore.style.display = 'inline-block';
            
            readMore.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const description = this.closest('.case-study-description');
                const text = description.querySelector('.case-study-text');
                
                if (text.classList.contains('expanded')) {
                    // Collapse
                    text.classList.remove('expanded');
                    this.textContent = 'Read more';
                } else {
                    // Expand
                    text.classList.add('expanded');
                    this.textContent = 'Read less';
                }
            });
        });
    }
    
    // Initialize on load
    initReadMore();
    
    // Re-initialize on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initReadMore, 100);
    });
})();
