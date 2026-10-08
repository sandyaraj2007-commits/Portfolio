/**
 * Sandya K B - Portfolio Interactive Scripts
 * Handles: Loader, Theme Toggle, Mobile Navigation, Scroll Reveals,
 * Project Modal, and Contact Form Validation.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ================= 1. PAGE LOADER ================= */
    const loader = document.getElementById('loader');
    
    const dismissLoader = () => {
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600);
        }
    };

    // Hide loader when window finishes loading or after maximum 1.2s timeout
    window.addEventListener('load', dismissLoader);
    setTimeout(dismissLoader, 1200);


    /* ================= 2. THEME TOGGLE (DARK / LIGHT) ================= */
    const themeBtn = document.getElementById('themeBtn');
    const savedTheme = localStorage.getItem('skb-portfolio-theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('skb-portfolio-theme', isDark ? 'dark' : 'light');
        });
    }


    /* ================= 3. MOBILE NAVIGATION ================= */
    const menuBtn = document.getElementById('menuBtn');
    const navbar = document.getElementById('navbar');

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuBtn.textContent = navbar.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when a link is clicked
        const navLinks = navbar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuBtn.textContent = '☰';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && !menuBtn.contains(e.target) && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuBtn.textContent = '☰';
            }
        });
    }


    /* ================= 4. SCROLL SPY (ACTIVE NAV LINK) ================= */
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNavOnScroll = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.navbar a[href*="${sectionId}"]`);

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNavOnScroll);


    /* ================= 5. SCROLL REVEAL ANIMATIONS ================= */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('visible'));
    }


    /* ================= 6. PROJECT MODAL DATA & HANDLERS ================= */
    const projectData = {
        waste: {
            category: 'AI / IoT / HARDWARE',
            title: 'Smart Waste Dustbin Using AI',
            description: 'An intelligent automated waste-management academic project created to improve hygiene and automate waste disposal.',
            details: `
                <h4>Key Features & Mechanics:</h4>
                <ul>
                    <li><strong>Touchless Automation:</strong> Uses an Ultrasonic distance sensor to detect hand gestures and trigger the servo motor for contactless opening.</li>
                    <li><strong>Hardware Architecture:</strong> Powered by an Arduino Uno board connected with ultrasonic sensor, servo motor, and power regulation module.</li>
                    <li><strong>AI / Logic Exploration:</strong> Explored Python scripts for algorithmic sorting logic and sensor trigger thresholds.</li>
                    <li><strong>Development Environment:</strong> Written and tested using Arduino IDE with real-time serial debugging.</li>
                </ul>
                <p><strong>Learning Takeaway:</strong> Gained hands-on experience in microcontroller programming, pin mapping, circuit assembly, and hardware-software interaction.</p>
            `
        },
        solar: {
            category: 'RENEWABLE ENERGY / HARDWARE',
            title: 'Solar Mobile Charging System',
            description: 'A sustainable green-energy project delivering a working off-grid mobile charging station utilizing solar power.',
            details: `
                <h4>Key Features & Mechanics:</h4>
                <ul>
                    <li><strong>Renewable Power Capture:</strong> Utilizes a high-efficiency solar panel to convert solar radiation into direct electrical energy.</li>
                    <li><strong>Charge Controller Regulation:</strong> Integrated voltage regulation circuitry protects mobile batteries against voltage spikes and overcharging.</li>
                    <li><strong>Battery Energy Storage:</strong> Employs rechargeable battery storage to supply stable 5V output even under intermittent sunlight.</li>
                    <li><strong>Standardized USB Output:</strong> Includes USB step-down module compatible with standard smartphone charging protocols.</li>
                </ul>
                <p><strong>Learning Takeaway:</strong> Built a clear understanding of renewable energy harvesting, DC voltage stabilization, and electrical safety standards for consumer gadgets.</p>
            `
        }
    };

    const modal = document.getElementById('projectModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalDetails = document.getElementById('modalDetails');

    const openModal = (projectId) => {
        const data = projectData[projectId];
        if (!data || !modal) return;

        modalCategory.textContent = data.category;
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalDetails.innerHTML = data.details;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }


    /* ================= 7. CONTACT FORM SUBMISSION ================= */
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                formMessage.textContent = 'Please fill out all fields.';
                formMessage.className = 'error';
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            setTimeout(() => {
                formMessage.textContent = `Thank you, ${name}! Your message has been received.`;
                formMessage.className = 'success';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = '';
                }, 5000);
            }, 800);
        });
    }


    /* ================= 8. SELF INTRODUCTION VIDEO HANDLER ================= */
    const introVideo = document.getElementById('introVideo');
    const placeholderBanner = document.getElementById('videoPlaceholderBanner');

    if (introVideo && placeholderBanner) {
        introVideo.addEventListener('play', () => {
            placeholderBanner.style.opacity = '0.6';
        });

        introVideo.addEventListener('pause', () => {
            placeholderBanner.style.opacity = '1';
        });
    }

});
