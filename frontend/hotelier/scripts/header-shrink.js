/* scripts/header-shrink.js */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-md');
      header.classList.remove('bg-white/80');
    } else {
      header.classList.add('bg-white/80');
      header.classList.remove('shadow-md', 'bg-white/95', 'backdrop-blur-md');
    }
  });
});
