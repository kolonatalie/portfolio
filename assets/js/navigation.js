import { showNotFoundToast } from './toast.js';

// ===============
// Scroll to a specific post ID
// ===============

// Higlighting logic
function highlightPostOnScroll(postArticle) {
  const options = {
    root: null,
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries, cbObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('highlight');
        setTimeout(() => {
          entry.target.classList.remove('highlight');
        }, 2500);
        cbObserver.disconnect();
      }
    });
  }, options);

  observer.observe(postArticle);
}

export default async function handleHashNavigation(posts, currentIndex, renderPosts) {
  const { hash } = window.location;
  if (!hash) return;

  const postId = hash.replace('#post-', '');
  let el = document.querySelector(hash);

  if (!el) {
    const postIndex = posts.findIndex((post) => post.id === postId);
    if (postIndex === -1) {
      showNotFoundToast();
      console.warn(`Post with ID ${postId} not found.`);
      return;
    }
    /* eslint-disable no-await-in-loop */
    while (currentIndex <= postIndex) {
      await renderPosts();
      el = document.querySelector(hash);
      if (el) break;
    }
    /* eslint-enable no-await-in-loop */
  }

  if (el) {
    const viewportHeight = window.innerHeight;
    const targetOffsetFromTop = viewportHeight * 0.20;
    const elementAbsoluteTop = el.getBoundingClientRect().top + window.scrollY;
    const finalScrollPosition = elementAbsoluteTop - targetOffsetFromTop;

    window.scrollTo({
      top: finalScrollPosition,
      behavior: 'smooth',
    });

    const postArticle = el.closest('.post');
    if (postArticle) {
      highlightPostOnScroll(postArticle);
    }
  }
}
