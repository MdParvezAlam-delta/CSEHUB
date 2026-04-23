const state = {
  cards: [],
};

function initApp() {
  state.cards = Array.from(document.querySelectorAll('.subject-card'));

  const searchInput = document.querySelector('.search-box input');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  const signInBtn = document.querySelector('.hero-actions .btn-secondary');
  const getStartedBtn = document.querySelector('.hero-actions .btn-primary');

  if (signInBtn) {
    signInBtn.addEventListener('click', (event) => {
      event.preventDefault();
      showToast('Sign in is not configured yet.');
    });
  }

  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', (event) => {
      event.preventDefault();
      showToast('Getting started... Redirecting soon.');
    });
  }
}

function handleSearch(event) {
  const query = event.target.value.trim().toLowerCase();

  state.cards.forEach((card) => {
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const description = card.querySelector('p')?.textContent.toLowerCase() || '';
    const isVisible = title.includes(query) || description.includes(query);

    card.style.display = isVisible || query.length === 0 ? 'block' : 'none';
  });
}

function showToast(message) {
  const existingToast = document.querySelector('.toast-message');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  setTimeout(() => {
    toast.classList.remove('visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 2200);
}

window.addEventListener('DOMContentLoaded', initApp);