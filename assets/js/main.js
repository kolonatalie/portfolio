import { setupNavToggle, setupSmoothScroll, setupBackToTop } from './nav.js';
import setupNowPlaying from './lastfm.js';
import { reviews, updateReviewsContent, showPerson } from './reviews-logic.js';
import initializeFormValidation from './formValidation.js';

function setupFadeInAnimation() {
  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    threshold: 0.05, // 5% of the element is visible
  });

  const animatedSections = document.querySelectorAll('.fade-in-section, .motion-effect, .fade-in-delay, .fade-in-delay-box');

  animatedSections.forEach((section) => {
    observer.observe(section);
  });
}

function setupReviewsCarousel() {
  const reviewsContainer = document.querySelector('.reviews');
  if (!reviewsContainer) return;

  const state = {
    currentItem: 0,
    isAnimating: false,
  };

  const reviewElements = [
    document.getElementById('author'),
    document.getElementById('country'),
    document.getElementById('info'),
  ];

  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  updateReviewsContent(state.currentItem, reviewElements);
  reviewElements.forEach((el) => el.classList.add('is-shown'));

  nextBtn.addEventListener('click', () => {
    state.currentItem += 1;
    if (state.currentItem > reviews.length - 1) {
      state.currentItem = 0;
    }
    showPerson(state.currentItem, reviewElements, state);
  });

  prevBtn.addEventListener('click', () => {
    state.currentItem -= 1;
    if (state.currentItem < 0) {
      state.currentItem = reviews.length - 1;
    }
    showPerson(state.currentItem, reviewElements, state);
  });
}

function initMain() {
  setupNowPlaying();

  setupNavToggle();
  setupSmoothScroll();
  setupBackToTop();

  setupFadeInAnimation();
  setupReviewsCarousel();
  initializeFormValidation();
}

document.addEventListener('DOMContentLoaded', initMain);
