document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const setupDynamicContent = () => {
    document.querySelectorAll('.animate-in').forEach(el => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  };

  fetch('content.html')
    .then(r => r.text())
    .then(h => {
      document.getElementById('dynamic-content').innerHTML = h;
      setupDynamicContent();
    });
});
