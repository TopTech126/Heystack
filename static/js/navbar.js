const navbarToggle = document.querySelector('.navbar-toggle');
const modalClose = document.querySelector('.modal-close');
const modal = document.querySelector('.modal');

navbarToggle.addEventListener('click', () => {
  modal.classList.add('show');
  modal.classList.remove('hide');
  modal.style.display = 'block';
});

modalClose.addEventListener('click', () => {
  modal.classList.add('hide');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.add('hide');
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
});