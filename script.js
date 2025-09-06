// ===== VARIABLES GLOBALES =====
let isDarkMode = false;
let scrollPosition = 0;

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les fonctionnalités
    initTheme();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initTypingEffect();
    initSkillsAnimation();
    initSkillsTabs();
    initProjectFilter();
    initContactForm();
    initBackToTop();
    initScrollReveal();
    initParticles();
    initCounterAnimation();
    initImageHoverEffects();
    initDownloadCV();
});

// ===== GESTION DU THÈME =====
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('span');
    
    // Vérifier le thème sauvegardé ou la préférence système
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
    
    // Écouter le clic sur le bouton de changement de thème
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    if (isDarkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    
    const themeIcon = document.querySelector('.theme-toggle i');
    const themeText = document.querySelector('.theme-toggle span');
    
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    themeText.textContent = 'Mode clair';
    
    isDarkMode = true;
    localStorage.setItem('theme', 'dark');
}

function disableDarkMode() {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    
    const themeIcon = document.querySelector('.theme-toggle i');
    const themeText = document.querySelector('.theme-toggle span');
    
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    themeText.textContent = 'Mode sombre';
    
    isDarkMode = false;
    localStorage.setItem('theme', 'light');
}

// ===== NAVIGATION =====
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu mobile
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Empêcher le défilement lorsque le menu est ouvert
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Fermer le menu en cliquant sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Changement de style de la navbar au scroll
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.style.background = isDarkMode ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'transparent';
            header.style.boxShadow = 'none';
        }
    });
}

// ===== EFFETS DE DÉFILEMENT =====
function initScrollEffects() {
    // Highlight de la section active dans la navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Animation des éléments au défilement
    const animatedElements = document.querySelectorAll('.skill-progress, .stat-number, .project-card, .education-card, .timeline-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== EFFET DE TAPAGE =====
function initTypingEffect() {
    const typedText = document.querySelector('.typed-text');
    const cursor = document.querySelector('.cursor');
    
    const textArray = ['Développeur Web', 'Designer', 'Étudiant en Informatique', 'Passionné de High-Tech'];
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let erasingDelay = 50;
    let newTextDelay = 2000;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length && !isDeleting) {
            typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else if (charIndex > 0 && isDeleting) {
            typedText.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, erasingDelay);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
            }
            setTimeout(type, newTextDelay);
        }
    }
    
    // Démarrer l'animation après un délai initial
    setTimeout(type, 1000);
}

// ===== ANIMATION DES COMPÉTENCES =====
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = width + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(bar);
    });
}

// ===== GESTION DES ONGLETS DES COMPÉTENCES =====
function initSkillsTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Récupérer la valeur de l'onglet
            const tabValue = this.getAttribute('data-tab');
            
            // Masquer tous les panneaux
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Afficher le panneau correspondant
            const targetPane = document.getElementById(tabValue);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

// ===== FILTRAGE DES PROJETS =====
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Récupérer la valeur du filtre
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrer les projets
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== FORMULAIRE DE CONTACT =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Afficher l'indicateur de chargement
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitButton.disabled = true;
            
            // Envoyer le formulaire via Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showNotification('Votre message a été envoyé avec succès !', 'success');
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (data.errors) {
                            showNotification('Veuillez corriger les erreurs dans le formulaire.', 'error');
                        } else {
                            showNotification('Une erreur s\'est produite. Veuillez réessayer.', 'error');
                        }
                    }).catch(() => {
                        showNotification('Une erreur s\'est produite. Veuillez réessayer.', 'error');
                    });
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                showNotification('Erreur de connexion. Veuillez vérifier votre connexion internet.', 'error');
            })
            .finally(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Afficher l'indicateur de chargement
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalIcon = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;
            
            // Envoyer le formulaire newsletter via Formspree
            fetch(newsletterForm.action, {
                method: 'POST',
                body: new FormData(newsletterForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showNotification('Merci pour votre inscription à la newsletter !', 'success');
                    newsletterForm.reset();
                } else {
                    showNotification('Une erreur s\'est produite. Veuillez réessayer.', 'error');
                }
            })
            .catch(error => {
                showNotification('Une erreur s\'est produite. Veuillez réessayer.', 'error');
            })
            .finally(() => {
                submitButton.innerHTML = originalIcon;
                submitButton.disabled = false;
            });
        });
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showNotification(message, type) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Ajouter au body
    document.body.appendChild(notification);
    
    // Afficher avec animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Cacher après 3 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== BOUTON RETOUR EN HAUT =====
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== RÉVÉLATION AU DÉFILEMENT =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.skill-category, .project-card, .education-card, .timeline-item, .contact-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// ===== PARTICULES D'ARRIÈRE-PLAN =====
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    // Créer des particules supplémentaires pour l'animation
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Position aléatoire
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Taille aléatoire
        const size = Math.random() * 4 + 1;
        
        // Animation aléatoire
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;
        
        // Appliquer les styles
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;
        
        // Ajouter au conteneur
        particlesContainer.appendChild(particle);
    }
}

// ===== ANIMATION DES COMPTEURS =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-count');
                const duration = 2000; // Durée en ms
                const step = target / (duration / 16); // Calculer l'incrément par frame
                
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, 16);
                
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== EFFETS AU SURVOL DES IMAGES =====
function initImageHoverEffects() {
    const images = document.querySelectorAll('.project-image, .about-image img');
    
    images.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ===== TÉLÉCHARGEMENT DU CV =====
function initDownloadCV() {
    const downloadButtons = document.querySelectorAll('#download-cv, #download-cv-about');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulation de téléchargement
            showNotification('Téléchargement de votre CV...', 'success');
            
            // Créer un lien de téléchargement vers le vrai CV
            const link = document.createElement('a');
            link.href = 'image/cv manampy.pdf'; // CHEMIN VERS VOTRE CV
            link.download = 'CV_Amedee_Fortunat.pdf';
            link.target = '_blank'; // Ouvrir dans un nouvel onglet
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
}

// ===== OBSERVATEUR D'INTERSECTION POUR L'ANIMATION =====
function createIntersectionObserver(threshold, callback) {
    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
            }
        });
    }, {
        threshold: threshold
    });
}

// ===== EFFET DE FLOTTEMENT POUR LES ÉLÉMENTS =====
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.element');
    
    floatingElements.forEach((element, index) => {
        // Animation aléatoire pour chaque élément
        const duration = 3 + Math.random() * 2;
        const delay = index * 0.5;
        
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
}

// Initialiser les éléments flottants après le chargement
window.addEventListener('load', initFloatingElements);

// ===== GESTIONNAIRE D'ERREURS =====
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
});

// ===== OPTIMISATION DES PERFORMANCES =====
// Désactiver les animations lorsque l'utilisateur préfère les réduire
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mediaQuery.matches) {
    document.documentElement.style.setProperty('--transition', 'none');
    document.body.classList.add('reduce-motion');
}