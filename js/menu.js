document.addEventListener('DOMContentLoaded', function() {
  // Sélection des éléments
  const menuButton = document.querySelector('.nav-bar-mobile__button');
  const menuContainer = document.querySelector('.nav-bar-mobile__container');
  const menuIcon = document.querySelector('.nav-bar-mobile__icon');
  const allLinks = document.querySelectorAll('.nav-bar__link, .nav-bar-mobile__link');

  // Gestion du menu mobile et rotation de l'icône
  menuButton.addEventListener('click', function() {
      // Toggle du menu
      menuContainer.classList.toggle('nav-bar-mobile__container--hidden');
      
      // Rotation de l'icône
      if (menuContainer.classList.contains('nav-bar-mobile__container--hidden')) {
          menuIcon.style.transform = 'scaleX(-1)';
      } else {
          menuIcon.style.transform = 'scaleX(-1) rotate(90deg)';
      }
      
      // Animation fluide
      menuIcon.style.transition = 'transform 0.3s ease';
  });

  // Effets sur les liens (desktop et mobile)
  allLinks.forEach(link => {
      // Effet hover
      link.addEventListener('mouseenter', function() {
          this.style.backgroundColor = '#ff69b4'; // Rose plus foncé
      });

      link.addEventListener('mouseleave', function() {
          this.style.backgroundColor = 'pink'; // Rose normal
      });

      // Effet de clic avec ondulation
      link.addEventListener('click', function(e) {
          // Création de l'effet d'ondulation
          const ripple = document.createElement('span');
          ripple.classList.add('ripple');
          
          // Positionnement de l'effet
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;
          
          // Ajout et suppression de l'effet
          this.appendChild(ripple);
          setTimeout(() => ripple.remove(), 300);
      });
  });
});