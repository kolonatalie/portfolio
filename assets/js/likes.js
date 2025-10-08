// ===============
// Likes in Local Storage
// ===============

export function getLikes(id, reaction) {
  return parseInt(localStorage.getItem(`likes-${id}-${reaction}`), 10) || 0;
}

export function addLike(id, oldReaction, newReaction) {
  if (oldReaction) {
    const currentOldCount = getLikes(id, oldReaction);
    if (currentOldCount > 0) {
      localStorage.setItem(`likes-${id}-${oldReaction}`, String(currentOldCount - 1));
    }
  }
  const currentNewCount = getLikes(id, newReaction);
  localStorage.setItem(`likes-${id}-${newReaction}`, String(currentNewCount + 1));
}

export function getSavedReaction(id) {
  return localStorage.getItem(`reacted-on-post-${id}`);
}

export function saveReaction(id, reaction) {
  localStorage.setItem(`reacted-on-post-${id}`, reaction);
}

// ===============
// HTML Generation
// ===============

export function createReactionButtonHTML(id, reaction, savedReaction) {
  const count = getLikes(id, reaction);
  const isVisible = count > 0 ? '' : 'hidden';
  const isReacted = savedReaction === reaction ? ' reacted' : '';
  return `
    <button class="like-btn${isReacted}" data-id="${id}" data-reaction="${reaction}">
      ${reaction} <span class="reaction-count ${isVisible}">${count}</span>
    </button>
  `;
}
