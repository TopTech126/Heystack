const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.classList.add('visible');
} else {
    backToTopBtn.classList.remove('visible');
}
});

backToTopBtn.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});