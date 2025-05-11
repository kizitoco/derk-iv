document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        backToTopBtn.classList.toggle('active', window.scrollY > 300);
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                item.style.display = (filterValue === 'all' || item.getAttribute('data-category') === filterValue) 
                    ? 'block' 
                    : 'none';
            });
        });
    });
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    let testimonialInterval;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    function startTestimonialInterval() {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        startTestimonialInterval();
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
            resetTestimonialInterval();
        });
    });
    
    prevBtn.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
        resetTestimonialInterval();
    });
    
    nextBtn.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
        resetTestimonialInterval();
    });
    
    startTestimonialInterval();
    
    // Project modal
    const portfolioItemsArray = document.querySelectorAll('.portfolio-item');
    const projectModal = document.getElementById('projectModal');
    const modalContent = document.querySelector('.modal-project-content');
    const closeModal = document.querySelector('.close-modal');
    
    const projects = [
        {
            title: "Derki Visuals Brand Identity",
            category: "Branding",
            description: "Complete brand identity design for Derki Visuals, including logo, color palette, typography, and brand guidelines. The design reflects the premium quality and artisanal approach of the Graphics Agency.",
            image: "derki_visuals_logo.jpg",
            client: "Derki Visuals",
            date: "June 2023"
        },
        {
            title: "Organic Farm Product Packaging",
            category: "Print",
            description: "Eco-friendly packaging design for Organic Farm's product line. The design emphasizes sustainability and natural ingredients while standing out on retail shelves.",
            image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
            client: "Organic Farm",
            date: "March 2023"
        },
        {
            title: "Tech Startup Social Media Campaign",
            category: "Digital",
            description: "Social media graphics and campaign design for a tech startup launching their new app. The visuals communicate innovation and user-friendly design.",
            image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
            client: "TechStart",
            date: "January 2023"
        },
        {
            title: "Luxe Apparel Visual Identity",
            category: "Branding",
            description: "Luxury fashion brand identity including logo design, patterns, and visual elements that convey elegance and exclusivity.",
            image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            client: "Luxe Apparel",
            date: "November 2022"
        },
        {
            title: "Financial Firm Corporate Stationery",
            category: "Print",
            description: "Professional corporate stationery design for a financial services firm, including business cards, letterheads, and presentation folders.",
            image: "finiancial.png",
            client: "Summit Financial",
            date: "September 2022"
        },
        {
            title: "Fitness App Website Graphics",
            category: "Digital",
            description: "Website graphics and UI elements for a fitness tracking app, creating an energetic and motivational visual experience.",
            image: "fitness_image.jpg",
            client: "FitTrack",
            date: "July 2022"
        }
    ];
    
    portfolioItemsArray.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const project = projects[index];
            modalContent.innerHTML = `
                <div class="modal-project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <div class="modal-project-details">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="modal-project-meta">
                        <div>
                            <h4>Client</h4>
                            <p>${project.client}</p>
                        </div>
                        <div>
                            <h4>Category</h4>
                            <p>${project.category}</p>
                        </div>
                        <div>
                            <h4>Date</h4>
                            <p>${project.date}</p>
                        </div>
                    </div>
                </div>
            `;
            
            projectModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', function() {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        alert(`Thank you for subscribing with ${emailInput.value}!`);
        emailInput.value = '';
    });
    
    // Form submission to Google Sheets - UPDATED SECTION
    document.getElementById('contactForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const formMessage = document.getElementById('formMessage');
        
        // Show loading state
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        formMessage.textContent = '';
        formMessage.className = 'form-message';
        
        try {
            // Prepare form data
            const formData = new FormData(form);
            const formDataObj = Object.fromEntries(formData.entries());
            
            // Use your Google Apps Script URL here
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbwhvmL0wtUWYZLv7jC9P91UukFksuj97Qc7WZsiU4NZdhLV9VpKCFqpAQUHWJ9Vj80I/exec';
            
            const response = await fetch(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObj)
            });
            
            // For no-cors mode, we can't read the response, so assume success
            formMessage.textContent = 'Thank you! Your request has been submitted.';
            formMessage.classList.add('success');
            form.reset();
            
            // Show success modal if exists
            const successModal = document.getElementById('successModal');
            if (successModal) {
                successModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        } catch (error) {
            console.error('Submission error:', error);
            formMessage.textContent = 'Error: Failed to submit form. Please try again.';
            formMessage.classList.add('error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
    
    // Initialize the first testimonial
    showTestimonial(0);
});