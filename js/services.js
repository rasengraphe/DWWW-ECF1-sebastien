document.addEventListener('DOMContentLoaded', () => {
    const serviceHeaders = document.querySelectorAll('.services__item-header');
    
    serviceHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isAccessLayout = content.classList.contains('access-layout');
            
            // Ferme tous les autres éléments
            document.querySelectorAll('.services__item-content').forEach(item => {
                if (item !== content) {
                    item.style.display = 'none';
                    item.classList.remove('active');
                }
            });
            
            document.querySelectorAll('.services__item-header').forEach(item => {
                if (item !== header) {
                    item.classList.remove('active');
                    item.querySelector('.services__item-icon').textContent = '+';
                }
            });
            
            // Bascule l'état actif
            header.classList.toggle('active');
            content.classList.toggle('active');
            
            // Gère l'affichage selon le type de contenu
            if (content.classList.contains('active')) {
                content.style.display = isAccessLayout ? 'flex' : 'grid';
                header.querySelector('.services__item-icon').textContent = '×';
            } else {
                content.style.display = 'none';
                header.querySelector('.services__item-icon').textContent = '+';
            }
        });
    });
});