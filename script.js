const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');
const favoriteButtons = document.querySelectorAll('.favorite-btn');
const revealItems = document.querySelectorAll('.reveal');
const form = document.querySelector('.newsletter-form');
const formMessage = document.getElementById('form-message');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

    menuItems.forEach((item) => {
      const matches = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !matches);
    });
  });
});

favoriteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('is-active');
    const label = button.getAttribute('aria-label');
    button.setAttribute(
      'aria-label',
      button.classList.contains('is-active') ? 'Remove favorite' : 'Add favorite'
    );
    button.textContent = button.classList.contains('is-active') ? '♥' : '♡';

    if (button.classList.contains('is-active')) {
      button.title = 'Saved to favorites';
    } else {
      button.title = 'Add to favorites';
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = form.querySelector('input');
  const email = input.value.trim();

  if (!email) {
    formMessage.textContent = 'Please enter your email first.';
    formMessage.style.color = '#ffd5a8';
    input.focus();
    return;
  }

  formMessage.textContent = `Thanks! ${email} is now on the chef list.`;
  formMessage.style.color = '#9ef6c5';
  form.reset();
});
