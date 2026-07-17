const range = document.querySelector('#visionRange');
const clear = document.querySelector('.scene.clear');
const handle = document.querySelector('#visionHandle');
function setVision(v) { clear.style.clipPath = `inset(0 0 0 ${100 - v}%)`; handle.style.left = `${v}%`; }
range.addEventListener('input', e => setVision(e.target.value)); setVision(50);
const form = document.querySelector('#bookingForm');
form.addEventListener('submit', (e) => { e.preventDefault(); const data = new FormData(form); document.querySelector('#formResult').textContent = `Дякуємо, ${data.get('name')}! Запит на ${data.get('date')} о ${data.get('time')} надіслано. Ми зателефонуємо для підтвердження.`; form.reset(); });
const dialog = document.querySelector('#staffDialog');
document.querySelector('#staffOpen').addEventListener('click', () => dialog.showModal());
document.querySelector('#staffClose').addEventListener('click', () => dialog.close());
document.querySelector('#menu').addEventListener('click', () => document.querySelector('nav').classList.toggle('open'));
