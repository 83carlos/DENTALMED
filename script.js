const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
const dropdownTriggers = [...document.querySelectorAll('.nav-trigger')];
const LINKTREE_URL = 'https://linktr.ee/mktgrupodentalmed';

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.querySelector('.material-symbols-rounded').textContent = isOpen ? 'close' : 'menu';
  });
}

dropdownTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const parent = trigger.closest('.has-dropdown');
    const isOpen = parent.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(isOpen));
  });
});

document.addEventListener('click', (event) => {
  if (event.target.closest('.has-dropdown')) return;
  document.querySelectorAll('.has-dropdown.open').forEach((item) => {
    item.classList.remove('open');
    item.querySelector('.nav-trigger')?.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('.has-dropdown.open').forEach((item) => {
    item.classList.remove('open');
    item.querySelector('.nav-trigger')?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    const icon = menuButton?.querySelector('.material-symbols-rounded');
    if (icon) icon.textContent = 'menu';
  });
});

const sections = [...document.querySelectorAll('main section[id], header[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];

if (sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55%', threshold: 0 });

  sections.forEach((section) => observer.observe(section));
}

const form = document.querySelector('.contact-form');
const status = document.querySelector('.form-status');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    status.textContent = 'Abrindo os canais de atendimento Dentalmed...';
    window.open(LINKTREE_URL, '_blank', 'noopener');
  });
}
