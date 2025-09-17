// ===============
// Messenger-like blog
// ===============

let posts = [];
let currentIndex = 0;
const batchSize = 3;

async function loadAndRenderInitialPosts() {
  try {
    const response = await fetch("../content/data/posts.json");
    posts = await response.json();
    await renderPosts();

    const hash = window.location.hash;
    if(hash) {
      await handleHashNavigation();
    }
    
  } catch (err) {
    showToast("Failed to load posts. Please try again");
    console.error("Failed to load posts.json:", err);
  }
}

function createReactionButtonHTML(id, reaction, savedReaction) {
  const count = getLikes(id, reaction);
  const isVisible = count > 0 ? '' : 'hidden';
  const isReacted = savedReaction === reaction ? ' reacted' : '';
  return `
    <button class="like-btn${isReacted}" data-id="${id}" data-reaction="${reaction}">
      ${reaction} <span class="reaction-count ${isVisible}">${count}</span>
    </button>
  `;
}

// ===============
// Posts
// ===============

async function renderPosts() {
  const feed = document.getElementById("feed");
  const loading = document.getElementById("loading");
  if (loading) loading.classList.remove('is-hidden');

  const nextPosts = posts.slice(currentIndex, currentIndex + batchSize);

  try {
    const fetchPromises = nextPosts.map(post => fetch(post.file).then(res => res.text()));
    const mdTexts = await Promise.all(fetchPromises);

    for (let i = 0; i < nextPosts.length; i++) {
      const post = nextPosts[i];
      const mdText = mdTexts[i];

      const htmlContent = marked.parse(mdText);
      const savedReaction = getSavedReaction(post.id);
      const shareUrl = window.location.origin + window.location.pathname + `#post-${post.id}`;

      const date = post.date;

      const article = document.createElement("article");
      article.classList.add("post");
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
        <input type="text" class="manual-copy-input" id="shareUrlInput-${post.id}" readonly value="${shareUrl}" aria-label="Shareable URL for this post">
      `;
      feed.appendChild(article);
    }
  } catch (err) {
    showToast("Failed to load the post. Please try again");
    console.error("Failed to load the post:", err);
  } finally {
    currentIndex += batchSize;
    if (loading && loading.parentNode) {
      loading.parentNode.removeChild(loading);
    }
  }
}

// ===============
// Infinite Scroll
// ===============

let isFetching = false;
window.addEventListener("scroll", () => {
  if (isFetching || currentIndex >= posts.length) return;
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    isFetching = true;
    renderPosts().finally(() => {
      isFetching = false;
    });
  }
});

// ===============
// Likes in Local Storage
// ===============

function getLikes(id, reaction) {
  return parseInt(localStorage.getItem(`likes-${id}-${reaction}`)) || 0;
}

function addLike(id, oldReaction, newReaction) {
  if (oldReaction) {
    let currentOldCount = getLikes(id, oldReaction);
    if (currentOldCount > 0) {
      localStorage.setItem(`likes-${id}-${oldReaction}`, String(currentOldCount - 1));
    }
  }
  let currentNewCount = getLikes(id, newReaction);
  localStorage.setItem(`likes-${id}-${newReaction}`, String(currentNewCount + 1));
}

function getSavedReaction(id) {
  return localStorage.getItem(`reacted-on-post-${id}`);
}

function saveReaction(id, reaction) {
  localStorage.setItem(`reacted-on-post-${id}`, reaction);
}

// ===============
// Toast Notifications
// ===============

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function showNotFoundToast() {
  let toast = document.querySelector(".notFound-toast");
  if (!toast) {
    toast = document.createElement('div');
    toast.className = "notFound-toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <div>
      <h2>404</h2>
      <p>Oops! The post you’re looking for doesn’t exist.</p>
      <button class="btn-home"><a href="../blog/">Take me Home</a></button>
    </div>
  `;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show")
  }, 5000);
}

// ===============
// Event Handlers
// ===============

document.addEventListener("click", async (e) => {

  if (e.target.classList.contains("like-btn")) {
    const id = e.target.dataset.id;
    const newReaction = e.target.dataset.reaction;
    const oldReaction = getSavedReaction(id);
    const postContainer = e.target.closest(".post");
    const allReactionButtons = postContainer.querySelectorAll(".like-btn");

    allReactionButtons.forEach(button => button.classList.remove('reacted'));

    if (oldReaction === newReaction) {
      localStorage.removeItem(`reacted-on-post-${id}`);
      let currentCount = getLikes(id, oldReaction);
      if (currentCount > 0) {
        localStorage.setItem(`likes-${id}-${oldReaction}`, String(currentCount - 1));
      }
    } else {
      e.target.classList.add('reacted');
      addLike(id, oldReaction, newReaction);
      saveReaction(id, newReaction);
    }

    allReactionButtons.forEach(button => {
      const reactionType = button.dataset.reaction;
      const countSpan = button.querySelector(".reaction-count");
      const currentCount = getLikes(id, reactionType);
      countSpan.textContent = currentCount;
      if (currentCount === 0) {
        countSpan.style.display = 'none';
      } else {
        countSpan.style.display = 'inline';
      }
    });
  }

  if (e.target.classList.contains("share-link")) {
    e.preventDefault();
    const postId = e.target.dataset.id;
    const shareUrl = window.location.origin + window.location.pathname + `#post-${postId}`;
    const title = e.target.closest(".post").querySelector("h2").textContent;
    const isDesktop = !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isSafariOnMac = navigator.userAgent.includes('Macintosh') && navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');

    if (navigator.share && !isDesktop && !isSafariOnMac) {
      try {
        await navigator.share({
          title: title,
          text: "Share this post",
          url: shareUrl
        });
      } catch (err) {
        showToast("Couldn’t share. Please try again.");
        console.error("Share canceled or failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        showToast("Link copied to clipboard");
      } catch (err) {
        showToast("Oops! Link didn’t copy, please copy it yourself.");
        console.error("Clipboard error:", err);

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
});

// ===============
// Scroll to a specific post ID
// ===============

async function handleHashNavigation() {
  const hash = window.location.hash;
  if (!hash) return;

  const postId = hash.replace('#post-', '');
  let el = document.querySelector(hash);

  if (!el) {
    const postIndex = posts.findIndex(post => post.id == postId);
    if (postIndex === -1) {
      showNotFoundToast();
      console.warn(`Post with ID ${postId} not found.`);
      return;
    }

    while (currentIndex <= postIndex) {
      await renderPosts();
      el = document.querySelector(hash);
      if (el) break;
    }
  }

  if (el) {
    const viewportHeight = window.innerHeight;
    const targetOffsetFromTop = viewportHeight * 0.20;
    const elementAbsoluteTop = el.getBoundingClientRect().top + window.scrollY;
    const finalScrollPosition = elementAbsoluteTop - targetOffsetFromTop;

    window.scrollTo({
      top: finalScrollPosition,
      behavior: "smooth"
    });

    // Higlighting logic
    function highlightPostOnScroll(postArticle) {
      const options = {
        root: null,
        threshold: 0.5,
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('highlight');
            setTimeout(() => {
              entry.target.classList.remove('highlight');
            }, 2500);
            observer.disconnect();
          }
        });
      }, options);

      observer.observe(postArticle);
    }

    const postArticle = el.closest('.post');
    if (postArticle) {
      highlightPostOnScroll(postArticle);
    }
  }
}

loadAndRenderInitialPosts();
window.addEventListener("hashchange", handleHashNavigation);