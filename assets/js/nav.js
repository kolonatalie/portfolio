export function setupNavToggle() {
  const navToggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.links');

  if (navToggle && links) {
    navToggle.addEventListener('click', () => {
      links.classList.toggle('show-links');
      navToggle.classList.toggle('active');
    });
  }
}

export function setupSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const offset = 80;

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const rect = targetSection.getBoundingClientRect();
        const finalPosition = window.scrollY + rect.top - offset;
        window.scrollTo({
          top: finalPosition,
          behavior: 'smooth',
        });
      }
    });
  });
}

export function setupBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  if (!backToTopButton) return;

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 500) {
      backToTopButton.style.display = 'flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
