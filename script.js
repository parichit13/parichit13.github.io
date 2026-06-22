// ─── EXPERIENCE TABS ───
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const panel = document.getElementById('tab-' + btn.dataset.tab);
    if (panel) panel.classList.add('active');
  });
});

// ─── MOBILE MENU ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');

function openMenu() {
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});

mobileClose.addEventListener('click', closeMenu);

mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
});

// ─── NAVBAR SCROLL HIDE/SHOW ───
const navbar = document.getElementById('navbar');
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const current = window.scrollY;
      if (current > 80) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');

      if (current > lastScroll && current > var_navHeight()) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      lastScroll = Math.max(current, 0);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

function var_navHeight() {
  return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 70;
}


// ─── ACTIVE NAV HIGHLIGHT ON SCROLL ───
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links ol li a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + id ? 'var(--green)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => sectionObserver.observe(s));
