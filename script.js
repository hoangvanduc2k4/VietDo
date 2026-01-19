document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed header height
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu if open
                const nav = document.querySelector('.main-nav');
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });

    // 2. Sticky Header Effect (Optional polish)
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(47, 49, 49, 1)'; // Solid background
            header.style.padding = '10px 0'; // Compact padding
        } else {
            header.style.background = 'rgba(47, 49, 49, 0.95)';
            header.style.padding = '15px 0';
        }
    });

    // 3. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');

            if (nav.classList.contains('active')) {
                nav.style.display = 'block';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = 'rgba(47, 49, 49, 0.98)';
                nav.style.textAlign = 'center';
                nav.style.padding = '20px 0';
                nav.style.borderBottom = '2px solid #CD7F32';

                // Fix ul layout for mobile
                const ul = nav.querySelector('ul');
                if (ul) {
                    ul.style.flexDirection = 'column';
                    ul.style.gap = '20px';
                }
            } else {
                nav.style.display = 'none';
                nav.style.position = '';
                nav.style.top = '';
                nav.style.width = '';
                nav.style.background = '';

                const ul = nav.querySelector('ul');
                if (ul) {
                    ul.style.flexDirection = '';
                    ul.style.gap = '';
                }
            }
        });
    }

    // 4. Reset Nav on Window Resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.style.display = ''; // Clear inline styles
            const ul = nav.querySelector('ul');
            if (ul) ul.style.flexDirection = '';
            nav.classList.remove('active');
        }
    });

    // 5. Product Image Carousel
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let slideInterval;

    function showSlides(n) {
        if (n >= slides.length) slideIndex = 0;
        if (n < 0) slideIndex = slides.length - 1;

        // Hide all
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Show current
        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');
    }

    function nextSlide() {
        slideIndex++;
        showSlides(slideIndex);
    }

    function prevSlide() {
        slideIndex--;
        showSlides(slideIndex);
    }

    function currentSlide(n) {
        slideIndex = n;
        showSlides(slideIndex);
    }

    // Event Listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide(index);
            resetTimer();
        });
    });

    // Auto Play
    function startTimer() {
        slideInterval = setInterval(nextSlide, 5000); // 5 seconds
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    // Initialize if carousel exists
    if (slides.length > 0) {
        showSlides(slideIndex);
        startTimer();
    }
});