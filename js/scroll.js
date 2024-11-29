document.addEventListener('DOMContentLoaded', () => {
    // Bouton retour en haut
    const scrollTopButton = document.querySelector('.footer__scroll-top');
    
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Afficher/masquer le bouton en fonction du scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopButton.style.opacity = '1';
            scrollTopButton.style.pointerEvents = 'auto';
        } else {
            scrollTopButton.style.opacity = '0';
            scrollTopButton.style.pointerEvents = 'none';
        }
    });
});