document.addEventListener('DOMContentLoaded', () => {
    
    /* -------------------------------------------------------------
       THEME TOGGLER
    ------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Default is Light Purple Theme. Check local storage or system preference for dark mode.
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.remove('dark-theme');
        themeIcon.className = 'fa-solid fa-moon';
    }
    
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        if (isDark) {
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });

    /* -------------------------------------------------------------
       MOBILE DRAWER MENU
    ------------------------------------------------------------- */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    const openDrawer = () => {
        mobileDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        mobileMenuBtn.classList.add('open'); // hamburger animation
        document.body.style.overflow = 'hidden'; // Disable background scroll
    };
    
    const closeDrawer = () => {
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        mobileMenuBtn.classList.remove('open'); // hamburger animation
        document.body.style.overflow = 'auto'; // Enable scroll
    };

    const toggleDrawer = () => {
        const isOpen = mobileDrawer.classList.contains('open');
        if (isOpen) {
            closeDrawer();
        } else {
            openDrawer();
        }
    };
    
    mobileMenuBtn.addEventListener('click', toggleDrawer);
    mobileMenuCloseBtn.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    /* -------------------------------------------------------------
       DYNAMIC TYPING EFFECT
    ------------------------------------------------------------- */
    const typingElement = document.querySelector('.typing-text');
    const words = [
        "Java Full Stack Developer"
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const typeEffect = () => {
        if (!typingElement) return;
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeEffect, typingSpeed);
    };
    
    setTimeout(typeEffect, 1000);

    /* -------------------------------------------------------------
       ANIMATED JAVA CODE EDITOR
       ------------------------------------------------------------- */
    const codeContainer = document.getElementById('typing-java-code');
    const javaCodeString = `public class Developer {

    private String name = "Lajitha";
    private String role = "Java Full Stack Developer";

    public void code() {
        System.out.println("Building scalable applications...");
    }
}`;

    let javaCharIndex = 0;
    
    const highlightJava = (text) => {
        return text
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/\b(public|class|private|void|new|return)\b/g, '<span class="code-keyword">$1</span>')
            .replace(/\b(String|System|Developer)\b/g, '<span class="code-class">$1</span>')
            .replace(/(System\.out\.println)/g, '<span class="code-method">System.out.println</span>')
            .replace(/(code)(?=\s*\()/g, '<span class="code-method">code</span>')
            .replace(/(".*?")/g, '<span class="code-string">$1</span>');
    };

    const typeJavaCode = () => {
        if (!codeContainer) return;
        
        if (javaCharIndex <= javaCodeString.length) {
            const currentSub = javaCodeString.substring(0, javaCharIndex);
            codeContainer.innerHTML = highlightJava(currentSub) + '<span class="code-cursor">|</span>';
            javaCharIndex++;
            
            // Adjust typing speed slightly dynamically for carriage returns / periods
            let currentSpeed = 35;
            const lastChar = javaCodeString.charAt(javaCharIndex - 1);
            if (lastChar === '\n') currentSpeed = 150;
            else if (lastChar === ';') currentSpeed = 250;
            
            setTimeout(typeJavaCode, currentSpeed);
        } else {
            // Finished typing, keep cursor blinking for 6 seconds, then clear and restart
            setTimeout(() => {
                javaCharIndex = 0;
                typeJavaCode();
            }, 6000);
        }
    };

    setTimeout(typeJavaCode, 1500);

    /* -------------------------------------------------------------
       SCROLL-TO-TOP & SCROLL PROGRESS INDICATOR
    ------------------------------------------------------------- */
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // 1. Progress Bar
        const scrollPercent = (scrollPosition / documentHeight) * 100;
        scrollProgressBar.style.width = `${scrollPercent}%`;
        
        // 2. Scroll-to-Top Button visibility
        if (scrollPosition > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
        
        // 3. Header Scrolled Effect
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* -------------------------------------------------------------
       GSAP SCROLL TRIGGER ANIMATIONS & SKILL BARS
    ------------------------------------------------------------- */
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Fade-up entrance scroll animations for sections and cards
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(elem => {
        gsap.fromTo(elem,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Animating Skill Progress Bars on Scroll
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        gsap.fromTo(bar,
            { width: '0%' },
            {
                width: targetWidth,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Parallax on Floating Tech Icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach(icon => {
        gsap.to(icon, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    /* -------------------------------------------------------------
       ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
    ------------------------------------------------------------- */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobLinks = document.querySelectorAll('.mobile-nav-link');
    
    const highlightActiveNav = () => {
        let scrollY = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Offsetting scroll padding
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Set desktop navbar active
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                
                // Set mobile navbar active
                mobLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightActiveNav);

    /* -------------------------------------------------------------
       PROJECTS FILTERING & DETAIL MODAL
    ------------------------------------------------------------- */
    
    // Project Category Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Toggle active buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle active panes with smooth fade-in
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `${targetTab}-pane`) {
                    pane.classList.add('active');
                    
                    // Fade in the pane elements smoothly
                    gsap.fromTo(pane, 
                        { opacity: 0, y: 15 },
                        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
                    );
                    
                    // Refresh ScrollTrigger to recalculate layout positions
                    ScrollTrigger.refresh();
                }
            });
        });
    });

    // UI/UX Design Projects Data
    const uiuxProjectsData = {
        "1": {
            title: "Apple Website Replica",
            category: "UI/UX Design",
            description: "A pixel-perfect redesign of Apple's official website focusing on modern layouts, typography, spacing, and responsive user interface design. This mock project replicates Apple's signature aesthetic style, clean spacing, high-contrast typography, and intuitive component structures.",
            highlights: [
                "Clean and minimal interface",
                "Responsive landing page",
                "Modern typography",
                "Interactive component design"
            ],
            tool: "Figma",
            image: "assets/apple_replica.png",
            figmaLink: "#"
        },
        "2": {
            title: "Divine Foods Website",
            category: "UI/UX Design",
            description: "Designed a modern food delivery and restaurant website with an attractive interface, intuitive navigation, and visually engaging product sections. The design highlights meal selections, displays dynamic promotions, and maps out a clean, seamless menu browsing experience.",
            highlights: [
                "Food menu layout",
                "Promotional banners",
                "Responsive UI",
                "User-friendly navigation"
            ],
            tool: "Figma",
            image: "assets/divine_foods.png",
            figmaLink: "#"
        },
        "3": {
            title: "E-Commerce Website",
            category: "UI/UX Design",
            description: "Designed a complete online shopping experience with product listings, shopping cart, checkout flow, and user profile screens. The layout focuses on conversion optimization, guiding users seamlessly from product search to final secure payment screens.",
            highlights: [
                "Product catalog",
                "Shopping cart",
                "Checkout process",
                "Mobile-friendly design"
            ],
            tool: "Figma",
            image: "assets/ecommerce.png",
            figmaLink: "#"
        },
        "4": {
            title: "Primary Health Care Center",
            category: "UI/UX Design",
            description: "Designed a healthcare management platform for doctors and patients to manage appointments, medical records, and health reports. The dashboard design offers simple scheduling layouts, patient status indicators, and clean charts to show health trends.",
            highlights: [
                "Patient dashboard",
                "Doctor dashboard",
                "Appointment booking",
                "Medical record management"
            ],
            tool: "Figma",
            image: "assets/healthcare_dashboard.png",
            figmaLink: "#"
        },
        "5": {
            title: "Love Nest Dating App",
            category: "UI/UX Design",
            description: "Designed a modern dating application with a clean interface focused on user profiles, matching, chatting, and secure onboarding. Features card-based profiles with vibrant overlays, elegant gradients, and a welcoming micro-interaction system.",
            highlights: [
                "User profile screens",
                "Match interface",
                "Chat UI",
                "Modern mobile experience"
            ],
            tool: "Figma",
            image: "assets/love_nest.png",
            figmaLink: "#"
        },
        "6": {
            title: "Jobringer Company Website",
            category: "UI/UX Design",
            description: "Designed a professional corporate website for a recruitment platform featuring job listings, employer services, and company information. Features search components, category filter boards, and clear job description layouts.",
            highlights: [
                "Job search interface",
                "Company profile pages",
                "Career listings",
                "Responsive design"
            ],
            tool: "Figma",
            image: "assets/jobringer.png",
            figmaLink: "#"
        },
        "7": {
            title: "Tamil Nadu Serial App",
            category: "UI/UX Design",
            description: "Designed a streaming application for Tamil television serials with an intuitive interface for discovering, watching, and managing favorite shows. Focuses on content grids, catalog searching, watchlist controls, and video player UI designs.",
            highlights: [
                "Home screen",
                "Category browsing",
                "Video player UI",
                "Favorites & Watchlist"
            ],
            tool: "Figma",
            image: "assets/tamil_nadu_serial.png",
            figmaLink: "#"
        }
    };

    // Modal Control Elements
    const projectModal = document.getElementById('project-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    
    // Modal Details Elements
    const modalImg = document.getElementById('modal-project-img');
    const modalCategory = document.getElementById('modal-project-category');
    const modalTitle = document.getElementById('modal-project-title');
    const modalDescription = document.getElementById('modal-project-description');
    const modalHighlights = document.getElementById('modal-project-highlights');
    const modalFigmaBtn = document.getElementById('modal-figma-btn');

    // Function to Open Modal with Project Data
    const openProjectModal = (projectId) => {
        const data = uiuxProjectsData[projectId];
        if (!data) return;
        
        // Populate modal contents
        modalImg.src = data.image;
        modalImg.alt = data.title;
        modalCategory.textContent = data.category;
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        
        // Populate highlights
        modalHighlights.innerHTML = '';
        data.highlights.forEach(highlight => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fa-solid fa-circle-check text-gradient"></i> ${highlight}`;
            modalHighlights.appendChild(li);
        });
        
        // Update Figma link
        modalFigmaBtn.href = data.figmaLink;
        
        // Display Modal
        projectModal.classList.add('active');
        document.body.classList.add('modal-open');
        projectModal.setAttribute('aria-hidden', 'false');
    };

    // Function to Close Modal
    const closeProjectModal = () => {
        projectModal.classList.remove('active');
        document.body.classList.remove('modal-open');
        projectModal.setAttribute('aria-hidden', 'true');
    };

    // Attach Event Listeners to UI/UX Cards (they are now class .project-card and have data-project-id)
    const uiuxCards = document.querySelectorAll('.project-card[data-project-id]');
    uiuxCards.forEach(card => {
        const projectId = card.getAttribute('data-project-id');
        
        // Trigger on card button click
        const detailsBtn = card.querySelector('.view-details-btn');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openProjectModal(projectId);
            });
        }
        
        // Trigger on "Learn More" text link if it exists
        const detailsLink = card.querySelector('.view-details-link');
        if (detailsLink) {
            detailsLink.addEventListener('click', (e) => {
                e.stopPropagation();
                openProjectModal(projectId);
            });
        }
    });

    // Close modal triggers
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);
    
    // Close modal on Escape key press
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });

    /* -------------------------------------------------------------
       CONTACT FORM VALIDATION & SUBMISSION
    ------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const successBanner = document.getElementById('form-success-banner');
    
    // Input Fields
    const formName = document.getElementById('form-name');
    const formEmail = document.getElementById('form-email');
    const formSubject = document.getElementById('form-subject');
    const formMessage = document.getElementById('form-message');
    
    // Error Elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');
    
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    
    const checkField = (field, errorElem, condition) => {
        if (condition) {
            field.parentElement.classList.remove('invalid');
            return true;
        } else {
            field.parentElement.classList.add('invalid');
            return false;
        }
    };
    
    // Form Input Event Listeners for real-time validation clearing
    formName.addEventListener('input', () => checkField(formName, nameError, formName.value.trim() !== ''));
    formEmail.addEventListener('input', () => checkField(formEmail, emailError, validateEmail(formEmail.value.trim())));
    formSubject.addEventListener('input', () => checkField(formSubject, subjectError, formSubject.value.trim() !== ''));
    formMessage.addEventListener('input', () => checkField(formMessage, messageError, formMessage.value.trim() !== ''));
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Run validations
        const isNameValid = checkField(formName, nameError, formName.value.trim() !== '');
        const isEmailValid = checkField(formEmail, emailError, validateEmail(formEmail.value.trim()));
        const isSubjectValid = checkField(formSubject, subjectError, formSubject.value.trim() !== '');
        const isMessageValid = checkField(formMessage, messageError, formMessage.value.trim() !== '');
        
        const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;
        
        if (isFormValid) {
            // Disable Submit Button to prevent multiple clicks
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnContent = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            
            // Mocking asynchronous API call
            setTimeout(() => {
                // Success actions
                successBanner.style.display = 'flex';
                contactForm.reset();
                
                // Clear validation borders
                document.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('invalid'));
                
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                
                // Hide banner after 5 seconds
                setTimeout(() => {
                    successBanner.style.display = 'none';
                }, 5000);
            }, 1500);
        }
    });

    /* -------------------------------------------------------------
       PRELOADER & ENTRANCE TIMELINE
    ------------------------------------------------------------- */
    const preloader = document.getElementById('preloader');
    const progress = document.querySelector('.preloader-progress');
    
    const startEntranceAnimation = () => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (preloader) {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                }
            }
        });

        // Animate loading progress bar
        tl.to(progress, {
            width: '100%',
            duration: 1.0,
            ease: 'power2.out'
        });

        // Fade out preloader content
        tl.to('.preloader-content', {
            opacity: 0,
            y: -20,
            duration: 0.3
        });

        // Slide preloader screen away
        tl.to(preloader, {
            opacity: 0,
            duration: 0.5
        }, '-=0.1');

        // Entrance animations for Hero components
        tl.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.4 }, '-=0.2');
        tl.from('.hero-title', { opacity: 0, y: 20, duration: 0.4 }, '-=0.3');
        tl.from('.hero-typing-container', { opacity: 0, y: 20, duration: 0.4 }, '-=0.3');
        tl.from('.hero-description', { opacity: 0, y: 20, duration: 0.4 }, '-=0.3');
        tl.from('.hero-buttons', { opacity: 0, y: 20, duration: 0.4 }, '-=0.3');
        tl.from('.hero-code-editor', { opacity: 0, y: 30, scale: 0.95, duration: 0.5 }, '-=0.3');
        tl.from('.avatar-container', { opacity: 0, scale: 0.85, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.6');
        tl.from('.floating-icon', { opacity: 0, scale: 0.5, stagger: 0.05, duration: 0.5, ease: 'back.out(2)' }, '-=0.4');
    };

    if (preloader && progress) {
        // Trigger preloader transition on window load
        window.addEventListener('load', startEntranceAnimation);
        // Fallback in case load event already fired
        if (document.readyState === 'complete') {
            startEntranceAnimation();
        }
    }

    /* -------------------------------------------------------------
       CUSTOM CURSOR & CARD MOUSE GLOW
    ------------------------------------------------------------- */
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
        // Show cursor on pointer activity
        window.addEventListener('mousemove', () => {
            cursor.style.opacity = '1';
        }, { once: true });

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

        window.addEventListener('mousemove', (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        });

        // Adding hovering classes
        const hoverElements = document.querySelectorAll('a, button, .card, .project-card, .tab-btn');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    // Card Mouse Coordinates Tracking for Spotlight radial glow
    const glowCards = document.querySelectorAll('.card, .project-card, .skills-card, .education-card, .achievement-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
