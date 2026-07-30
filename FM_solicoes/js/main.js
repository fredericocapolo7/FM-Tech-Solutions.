document.addEventListener('DOMContentLoaded', function () {
    // Toggle 'Saber mais' nos cards
    const toggles = document.querySelectorAll('.card-toggle');
    toggles.forEach(btn => {
        btn.addEventListener('click', function () {
            const card = btn.closest('.card');
            const expanded = card.classList.toggle('expanded');
            btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        });
    });

    // Menu Hamburguês
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        const hamburgerIcon = hamburger.querySelector('i');

        hamburger.addEventListener('click', function () {
            const isActive = hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            if (hamburgerIcon) {
                hamburgerIcon.classList.toggle('fa-bars');
                hamburgerIcon.classList.toggle('fa-times');
                hamburgerIcon.classList.toggle('rotate-90');
            }
        });

        // Fechar menu ao clicar num link e rolagem suave personalizada
        const navLinks = navMenu.querySelectorAll('a');
        const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const smoothScrollTo = (targetEl, duration = 800) => {
            const startY = window.scrollY || window.pageYOffset;
            const targetRect = targetEl.getBoundingClientRect();
            const targetY = startY + targetRect.top;
            const maxY = document.documentElement.scrollHeight - window.innerHeight;
            const destination = Math.min(targetY, maxY);
            const startTime = performance.now();

            const step = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeInOutCubic(progress);
                window.scrollTo(0, Math.round(startY + (destination - startY) * eased));
                if (elapsed < duration) requestAnimationFrame(step);
            };

            requestAnimationFrame(step);
        };

        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) smoothScrollTo(target, 900); // 900ms para rolagem muito suave
                }

                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                if (hamburgerIcon) {
                    hamburgerIcon.classList.add('fa-bars');
                    hamburgerIcon.classList.remove('fa-times');
                }
            });
        });
    }

    // Animação automática do carrossel sem paradas
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        // velocidade configurável via atributo `data-speed` (pixels por frame)
        const speed = parseFloat(carouselTrack.dataset.speed) || 2.8;
        const animate = () => {
            carouselTrack.scrollLeft += speed;
            const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth;
            if (carouselTrack.scrollLeft >= maxScroll - 1) {
                carouselTrack.scrollLeft = 0;
            }
            requestAnimationFrame(animate);
        };

        carouselTrack.style.scrollBehavior = 'auto';
        animate();
    }
});
