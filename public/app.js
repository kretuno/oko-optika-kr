const range = document.querySelector('#visionRange');
const clearScene = document.querySelector('.scene.clear');
const handle = document.querySelector('#visionHandle');
const divider = document.querySelector('#visionDivider');
const blurLabel = document.querySelector('.label-blur');
const clearLabel = document.querySelector('.label-clear');

function setVision(value) {
  const position = Number(value);
  clearScene.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
  handle.style.left = `${position}%`;
  divider.style.left = `${position}%`;
  clearLabel.classList.toggle('is-hidden', position <= 2);
  blurLabel.classList.toggle('is-hidden', position >= 98);
  range.setAttribute('aria-valuetext', `${position}% чіткого зображення`);
}

range.addEventListener('input', (event) => setVision(event.target.value));
setVision(range.value);

const interestSelect = document.querySelector('#interestSelect');
document.querySelectorAll('.collection-link').forEach((button) => {
  button.addEventListener('click', () => {
    interestSelect.value = button.dataset.collection;
    document.querySelector('#booking').scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => interestSelect.focus({ preventScroll: true }), 650);
  });
});

const dateInput = document.querySelector('input[name="date"]');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localToday;

const form = document.querySelector('#bookingForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  document.querySelector('#formResult').textContent = `Дякуємо, ${data.get('name')}! Запит «${data.get('interest')}» на ${data.get('date')} о ${data.get('time')} підготовлено. Ми зателефонуємо для підтвердження.`;
  form.reset();
  dateInput.min = localToday;
});

const dialog = document.querySelector('#staffDialog');
document.querySelector('#staffOpen').addEventListener('click', () => dialog.showModal());
document.querySelector('#staffClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('#mainNav');
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add('is-visible'));
}
