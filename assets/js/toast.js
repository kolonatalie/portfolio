export function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

export function showNotFoundToast() {
  let toast = document.querySelector('.not-found-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'not-found-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <div>
      <h2>404</h2>
      <p>Oops! The post you’re looking for doesn’t exist.</p>
      <button class="btn-home"><a href="../blog/">Take me Home</a></button>
    </div>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}
