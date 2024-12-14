document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function () {
      const value = this.getAttribute('data-value');
      document.querySelectorAll('.star').forEach(s => {
        s.classList.toggle('filled', s.getAttribute('data-value') <= value);
      });
    });
  });
  