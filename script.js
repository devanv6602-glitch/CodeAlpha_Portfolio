const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('nav-menu');
const themeButton = document.getElementById('theme-button');
const scrollTop = document.getElementById('scroll-top');
const loader = document.getElementById('loader');
const typingElement = document.getElementById('typing');
const progressBars = document.querySelectorAll('.skill__progress');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav__link');

const roles = ['Responsive Interfaces', 'Modern Web Animations', 'Performance-first UI', 'Clean Frontend Code'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];
  const updateText = isDeleting
    ? currentRole.slice(0, charIndex - 1)
    : currentRole.slice(0, charIndex + 1);

  typingElement.textContent = updateText;

  if (!isDeleting && updateText === currentRole) {
    setTimeout(() => (isDeleting = true), 1200);
  } else if (isDeleting && updateText === '') {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
  const speed = isDeleting ? 80 : 130;
  setTimeout(typeRole, speed);
}

typeRole();

menuButton.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

function handleScroll() {
  const scrollY = window.pageYOffset;
  if (scrollY > 450) {
    scrollTop.classList.add('show');
  } else {
    scrollTop.classList.remove('show');
  }

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${sectionId}`
        );
      });
    }
  });
}

window.addEventListener('scroll', handleScroll);

scrollTop.addEventListener('click', event => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function loadTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    document.body.classList.remove('dark-theme');
    themeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  themeButton.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

themeButton.addEventListener('click', toggleTheme);
loadTheme();

window.addEventListener('load', () => {
  if (loader) {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
    setTimeout(() => loader.remove(), 600);
  }
});

const revealElements = document.querySelectorAll('.section, .home__content, .about__card, .about__stats, .skill, .timeline__item, .project, .service, .testimonial, .certification, .contact__info, .contact__form');
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

const progressObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const progress = bar.dataset.progress;
        bar.style.width = `${progress}%`;
        progressObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.3 }
);

progressBars.forEach(bar => progressObserver.observe(bar));

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for your message! I will review it and get back to you soon.');
    contactForm.reset();
  });
}
