// Fonction pour charger les composants
async function loadComponents() {
    try {
        // Chargement de l'equalizer
        const equalizerResponse = await fetch('../components/equalizer.html');
        const equalizerHtml = await equalizerResponse.text();
        
        // Insertion avant le footer
        const footer = document.querySelector('.footer');
        footer.insertAdjacentHTML('beforebegin', equalizerHtml);
        
    } catch (error) {
        console.error('Erreur lors du chargement des composants:', error);
    }
}

// Chargement des composants quand le DOM est prêt
document.addEventListener('DOMContentLoaded', loadComponents);