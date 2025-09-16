// ===============
// NavBar
// ===============

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  links.classList.toggle("show-links");
  navToggle.classList.toggle("active");
});

// ===============
// Anchor links
// ===============

const navLinks = document.querySelectorAll('a[href^="#"]');
const offset = 80;

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);

    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const rect = targetSection.getBoundingClientRect();

      const finalPosition = window.scrollY + rect.top - offset;

      window.scrollTo({
        top: finalPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===============
// Back To Top
// ===============

window.addEventListener('scroll', () => {
  const backToTopButton = document.getElementById('back-to-top');
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (scrollPosition > 900) {
    backToTopButton.style.display = 'flex';
  } else {
    backToTopButton.style.display = 'none';
  }
});

document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});