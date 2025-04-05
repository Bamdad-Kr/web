document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const primaryNav = document.querySelector('.primary-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        this.classList.toggle('active');
        primaryNav.classList.toggle('active');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Testimonial slider functionality
    // This would be replaced with a proper slider library like Swiper in production
    const testimonials = [
        {
            quote: "The best salon experience I've ever had! The stylists truly listen to what you want and deliver exceptional results every time.",
            author: "Sarah Johnson",
            rating: 5
        },
        {
            quote: "I've been coming to Avada for years and wouldn't trust anyone else with my hair. The team is professional and talented.",
            author: "Michael Chen",
            rating: 5
        },
        {
            quote: "The atmosphere is so relaxing and the results are always perfect. Highly recommend their coloring services!",
            author: "Emma Rodriguez",
            rating: 5
        }
    ];
    
    const testimonialContainer = document.querySelector('.testimonials-slider');
    
    if (testimonialContainer) {
        // Simple implementation - would use a proper slider in production
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            const testimonial = testimonials[index];
            testimonialContainer.innerHTML = `
                <div class="testimonial-item">
                    <div class="testimonial-content">
                        <div class="rating">
                            ${'<i class="fas fa-star" aria-hidden="true"></i>'.repeat(testimonial.rating)}
                        </div>
                        <blockquote>
                            <p>${testimonial.quote}</p>
                            <footer>
                                <cite>- ${testimonial.author}</cite>
                            </footer>
                        </blockquote>
                    </div>
                </div>
            `;
        }
        
        // Show first testimonial
        showTestimonial(currentTestimonial);
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers without native lazy loading
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }
});