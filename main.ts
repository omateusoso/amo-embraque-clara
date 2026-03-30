// -- Intersection Observer: reveal animations --
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

document.addEventListener('DOMContentLoaded', () => {
  // Animate elements on scroll
  document.querySelectorAll('.animate').forEach((el) => {
    revealObserver.observe(el);
  });

  // Nav: add scrolled class for background change
  const nav = document.getElementById('main-nav');
  const onScroll = () => {
    if (window.scrollY > 20) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // check on load

  // Smooth scroll for anchor links
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
        const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // FAQ: close others when one opens
  document.querySelectorAll<HTMLDetailsElement>('.faq-item').forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        document.querySelectorAll<HTMLDetailsElement>('.faq-item').forEach((other) => {
          if (other !== detail) other.open = false;
        });
      }
    });
  });

  console.log('Clara LP — AMO Embarque ✓');
});
