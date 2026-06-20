/* =========================================================================
   MENTORHUB — GLOBAL INTERACTION LOGIC
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenuDrawer();
    initScrollToTopSystem();
    initWorkflowLoopTracker();
});


function initMobileMenuDrawer() {
    const toggleBtn = document.getElementById('mobileMenuBtn'); // Targets the unified toggle button ID
    const menuDrawer = document.getElementById('mobileMenuDrawer');

    if (!toggleBtn || !menuDrawer) return;

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBtn.classList.toggle('is-open');
        menuDrawer.classList.toggle('is-open');
    });

    // Auto-close menu when clicking any inner option link
    const mobileLinks = menuDrawer.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('is-open');
            menuDrawer.classList.remove('is-open');
        });
    });
}

function closeMobileMenu(menuElement) {
    menuElement.style.opacity = '0';
    menuElement.style.height = '0';
    setTimeout(() => {
        menuElement.style.display = 'none';
    }, 200);
}

function initScrollToTopSystem() {
    let scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.id = 'scrollTopBtn';
        scrollTopBtn.title = 'Go to top';
        scrollTopBtn.innerHTML = `<img src="scrollup.svg" alt="Scroll Up" style="width: 22px; height: 22px; display: block; margin: auto;" />`;
        document.body.appendChild(scrollTopBtn);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('is-visible');
        } else {
            scrollTopBtn.classList.remove('is-visible');
        }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* =========================================================================
   PRELOADER TIMELINE SYSTEM
   ========================================================================= */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const loaderText = document.getElementById('loader-text');
    const loaderLogo = document.getElementById('loader-logo-image');
    
    if (preloader && loaderText && loaderLogo) {
        
        setTimeout(() => {
            loaderText.classList.add('visible');
        }, 200);
        
        setTimeout(() => {
            loaderText.classList.add('move-down');
            loaderLogo.classList.add('reveal');
        }, 400);
        

        setTimeout(() => {
            preloader.classList.add('fade-out');
            
            setTimeout(() => {
                preloader.remove();
            }, 300);
        }, 1700); 
    }
});


/* =========================================================================
   WORKFLOW CROSS-STEP STATE HIGHLIGHT LOOP SYSTEM
   ========================================================================= */
function initWorkflowLoopTracker() {
    const counsellingCard = document.getElementById('step-counselling');
    const demoCard = document.getElementById('step-demo');

    if (!counsellingCard || !demoCard) return;

    // --- DESKTOP BEHAVIOR: Hover Triggers Cross-Highlight ---
    demoCard.addEventListener('mouseenter', () => {
        // Only fire if viewport width is desktop landscape size
        if (window.innerWidth > 1024) {
            counsellingCard.classList.add('highlight-loop');
        }
    });

    demoCard.addEventListener('mouseleave', () => {
        if (window.innerWidth > 1024) {
            counsellingCard.classList.remove('highlight-loop');
        }
    });

    // --- MOBILE BEHAVIOR: Scroll-Into-View Intersection Observer ---
    const mobileObserverOptions = {
        root: null, // Scans native viewport window parameters
        threshold: 0.6 // Fires exactly when 60% of the Demo card is visible on center screen
    };

    const mobileScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (window.innerWidth <= 1024) {
                if (entry.isIntersecting) {
                    // Turn on the soft green flash highlight up on Step 2
                    counsellingCard.classList.add('highlight-loop');
                } else {
                    counsellingCard.classList.remove('highlight-loop');
                }
            }
        });
    }, mobileObserverOptions);

    // Lock target tracking anchor focus onto Step 4
    mobileScrollObserver.observe(demoCard);
}