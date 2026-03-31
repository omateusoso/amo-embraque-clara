// =============================================
// Clara LP — Main Script
// =============================================

// -- Intersection Observer: reveal all animation classes --
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
  // Observe all animated elements
  document.querySelectorAll('.animate, .reveal-up, .reveal-left').forEach((el) => {
    revealObserver.observe(el);
  });

  // Hero content: trigger immediately (above fold)
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    requestAnimationFrame(() => {
      setTimeout(() => heroContent.classList.add('visible'), 100);
    });
  }

  // Nav: glass + scrolled class
  const nav = document.getElementById('main-nav');
  const onScroll = () => {
    if (window.scrollY > 20) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Smooth anchor scroll
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

  // Parallax on hero BG
  const heroBg = document.querySelector('.hero-bg-img') as HTMLElement | null;
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }

  console.log('Clara LP — AMO Embarque ✓');
});
