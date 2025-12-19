document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect - Adding glass background on scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.top = '12px';
            header.querySelector('nav').style.background = 'rgba(15, 23, 42, 0.8)';
            header.querySelector('nav').style.padding = '12px 24px';
        } else {
            header.style.top = '24px';
            header.querySelector('nav').style.background = 'rgba(15, 23, 42, 0.4)';
            header.querySelector('nav').style.padding = '16px 32px';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars-staggered');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Close mobile menu when link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars-staggered');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // Scroll Spy for active nav items
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href').substring(1) === entry.target.id) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Dynamic Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Three.js 3D Background Implementation ---
    const initThreeJS = () => {
        const container = document.getElementById('three-canvas-container');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Particle Geometry
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // Particle Material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: '#a855f7',
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        // Particle Mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 3;

        // Mouse Interaction
        let mouseX = 0;
        let mouseY = 0;

        const animateParticles = (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        };

        window.addEventListener('mousemove', animateParticles);

        // Animation Loop
        const tick = () => {
            const elapsedTime = Date.now() * 0.0001;

            particlesMesh.rotation.y = elapsedTime * 0.5;

            if (mouseX > 0) {
                particlesMesh.rotation.x = -mouseY * 0.0001;
                particlesMesh.rotation.y = mouseX * 0.0001;
            }

            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        };

        tick();

        // Handle Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };

    initThreeJS();
});
