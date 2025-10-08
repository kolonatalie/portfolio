import {
  getLikes, addLike, getSavedReaction, saveReaction, createReactionButtonHTML,
} from './likes.js';
import { showToast } from './toast.js';
import handleHashNavigation from './navigation.js';
import { setupNavToggle, setupSmoothScroll, setupBackToTop } from './nav.js';

/*
===============
Messenger-like blog
===============
*/

const state = {
  posts: [],
  currentIndex: 0,
  batchSize: 3,
  isFetching: false,
};

async function renderPosts() {
  const feed = document.getElementById('feed');
  const loading = document.getElementById('loading');
  if (loading) loading.classList.remove('is-hidden');

  const nextPosts = state.posts.slice(state.currentIndex, state.currentIndex + state.batchSize);

  try {
    const fetchPromises = nextPosts.map((post) => fetch(post.file).then((res) => res.text()));
    const mdTexts = await Promise.all(fetchPromises);

    for (let i = 0; i < nextPosts.length; i += 1) {
      const post = nextPosts[i];
      const mdText = mdTexts[i];

      const htmlContent = marked.parse(mdText);
      const savedReaction = getSavedReaction(post.id);
      const shareUrl = `${window.location.origin + window.location.pathname}#post-${post.id}`;

      const { date } = post;

      const article = document.createElement('article');
      article.classList.add('post');
      article.innerHTML = `
        <h2 id="post-${post.id}">${post.title}</h2>
        <div class="content">${htmlContent}</div>
        <div class="post-footer">
          <div class="reaction-buttons">
            ${createReactionButtonHTML(post.id, '👍', savedReaction)}
            ${createReactionButtonHTML(post.id, '❤️', savedReaction)}
            ${createReactionButtonHTML(post.id, '🔥', savedReaction)}
          </div>
          <p class="meta">👁️  ${post.views} • ${date}</p>
          <a href="#post-${post.id}" class="share-link" data-id="${post.id}" aria-label="Share this post"></a>
        </div>
        <input type="text" class="manual-copy-input" id="${post.id}-shareIt" readonly value="${shareUrl}" aria-label="Shareable URL for this post">
      `;
      feed.appendChild(article);
    }
  } catch (err) {
    showToast('Failed to load the post. Please try again');
    console.error('Failed to load the post:', err);
  } finally {
    state.currentIndex += state.batchSize;
    if (loading && loading.parentNode) {
      loading.parentNode.removeChild(loading);
    }
  }
}

async function loadAndRenderInitialPosts() {
  try {
    const response = await fetch('../content/data/posts.json');
    state.posts = await response.json();
    await renderPosts();

    const { hash } = window.location;
    if (hash) {
      await handleHashNavigation(state.posts, state.currentIndex, renderPosts);
    }
  } catch (err) {
    showToast('Failed to load posts. Please try again');
    console.error('Failed to load posts.json:', err);
  }
}

async function handleLikeClick(e) {
  const { id } = e.target.dataset;
  const newReaction = e.target.dataset.reaction;
  const oldReaction = getSavedReaction(id);
  const postContainer = e.target.closest('.post');
  const allReactionButtons = postContainer.querySelectorAll('.like-btn');

  allReactionButtons.forEach((button) => button.classList.remove('reacted'));

  if (oldReaction === newReaction) {
    localStorage.removeItem(`reacted-on-post-${id}`);
    const currentCount = getLikes(id, oldReaction);
    if (currentCount > 0) {
      localStorage.setItem(`likes-${id}-${oldReaction}`, String(currentCount - 1));
    }
  } else {
    e.target.classList.add('reacted');
    addLike(id, oldReaction, newReaction);
    saveReaction(id, newReaction);
  }

  allReactionButtons.forEach((button) => {
    const reactionType = button.dataset.reaction;
    const countSpan = button.querySelector('.reaction-count');
    const currentCount = getLikes(id, reactionType);
    countSpan.textContent = currentCount;

    if (currentCount === 0) {
      countSpan.style.display = 'none';
    } else {
      countSpan.style.display = 'inline';
    }
  });
}

async function handleShareClick(e) {
  e.preventDefault();
  const postId = e.target.dataset.id;
  const shareUrl = `${window.location.origin + window.location.pathname}#post-${postId}`;
  const title = e.target.closest('.post').querySelector('h2').textContent;
  const isDesktop = !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isSafariOnMac = navigator.userAgent.includes('Macintosh') && navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');

  if (navigator.share && !isDesktop && !isSafariOnMac) {
    try {
      await navigator.share({
        title,
        text: 'Share this post',
        url: shareUrl,
      });
    } catch (err) {
      showToast('Couldn’t share. Please try again.');
      console.error('Share canceled or failed:', err);
    }
  } else {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('Link copied to clipboard');
    } catch (err) {
      showToast('Oops! Link didn’t copy, please copy it yourself.');
      console.error('Clipboard error:', err);

      const manualInput = e.target.closest('.post').querySelector('.manual-copy-input');
      if (manualInput) {
        manualInput.style.position = 'static';
        manualInput.style.opacity = '1';
        manualInput.focus();
        manualInput.select();
        setTimeout(() => {
          manualInput.style.position = 'absolute';
          manualInput.style.opacity = '0';
        }, 10000);
      }
    }
  }
}

function setupEventListeners() {
  window.addEventListener('scroll', () => {
    if (state.isFetching || state.currentIndex >= state.posts.length) return;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      state.isFetching = true;
      renderPosts().finally(() => {
        state.isFetching = false;
      });
    }
  });

  window.addEventListener('hashchange', () => handleHashNavigation(state.posts, state.currentIndex, renderPosts));

  document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('like-btn')) {
      await handleLikeClick(e);
      return;
    }

    if (e.target.classList.contains('share-link')) {
      await handleShareClick(e);
    }
  });
}

function initBlog() {
  setupNavToggle();
  setupSmoothScroll();
  setupBackToTop();

  loadAndRenderInitialPosts();
  setupEventListeners();
}

document.addEventListener('DOMContentLoaded', initBlog);
