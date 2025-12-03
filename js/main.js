/**
 * Amin Heyrani Nobari - Personal Website
 * Main JavaScript
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initMobileNav();
        initSmoothScroll();
        initScrollSpy();
    }

    /**
     * Mobile Navigation Toggle
     */
    function initMobileNav() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    /**
     * Smooth Scroll for anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Scroll Spy - Highlight current section in nav
     */
    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id], header[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        if (!sections.length || !navLinks.length) return;

        const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
        
        function updateActiveLink() {
            const scrollPos = window.scrollY + navHeight + 100;
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            // If at the very top, highlight first section
            if (window.scrollY < 100) {
                currentSection = sections[0]?.getAttribute('id') || '';
            }
            
            // If near bottom, highlight last section
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                currentSection = sections[sections.length - 1]?.getAttribute('id') || '';
            }
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }

        // Throttle scroll events
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateActiveLink();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial call
        updateActiveLink();
    }

})();
