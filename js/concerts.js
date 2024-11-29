const maxCapacity = 1000;

// Fonction pour charger les données JSON
async function loadConcerts() {
    try {
        console.log('Chargement des concerts depuis : json/festival.json');
        const response = await fetch('json/festival.json');
        if (!response.ok) { // Vérifie si la réponse est correcte
            throw new Error('Erreur réseau : ' + response.status);
        }
        const data = await response.json();
        console.log('Concerts chargés avec succès:', data); // Affiche les données chargées
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement des concerts:', error); // Affiche l'erreur
        return [];
    }
}

// Fonction pour filtrer les concerts par date
function filterConcerts(concerts, date = null) {
    if (!date) return concerts; // Si pas de date, retourne tous les concerts
    return concerts.filter(concert => concert.date.includes(date));
}

// Fonction pour créer une carte de concert
function createConcertCard(concert) {
    const percentageSold = ((concert.ticketsSold / maxCapacity) * 100).toFixed(1);
    const defaultImage = 'img/default-artist.jpg';
    
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = concert.image || defaultImage;
    img.alt = concert.artist;
    img.classList.add("card-image");
    img.style.border = "2px solid transparent"; // Bordure transparente par défaut
    img.style.backgroundImage = "linear-gradient(/* Dégradé que vous utilisez pour le fond de la page */)"; // Dégradé
    img.style.backgroundClip = "padding-box"; // Pour que le dégradé soit visible à l'intérieur de la bordure
    img.style.padding = "2px"; // Pour créer l'effet de bordure
    img.onerror = () => { img.src = defaultImage; }; // Gestion de l'erreur

    card.innerHTML = `
        <h3 class="card-title">${concert.artist}</h3>
        <p class="description">${concert.description}</p>
        <div class="card-content">
            <div class="card-info">
                <p class="price">Prix : ${concert.price}€</p>
                <p class="date">Date : ${concert.date}</p>
                <p class="horaire">Horaire : ${concert.time}</p>
            </div>
            <div class="card-image-container">
                ${img.outerHTML} <!-- Ajout de l'image ici -->
            </div>
        </div>
        <div class="places-vendues-container">
            <h4>Places vendues</h4>
        </div>
        <div class="progress-bar">
            <div class="progress" style="width:${percentageSold}%; 
                                      background-color: ${percentageSold > 90 ? '#FF0000' : '#15acff'};">
                <span>${percentageSold}%</span>
            </div>
        </div>
    `;

    return card;
}

// Fonction pour mettre à jour l'affichage
function updateDisplay(concerts, selectedDate = null) {
    const container = document.getElementById("concerts-container");
    container.innerHTML = ''; // Vide le container

    const filteredConcerts = filterConcerts(concerts, selectedDate);
    filteredConcerts.forEach(concert => {
        const card = createConcertCard(concert);
        container.appendChild(card);
    });
}

// Fonction principale pour initialiser la page
async function initConcertsPage() {
    const concerts = await loadConcerts();
    
    // Gestion des boutons de filtre
    const filterButtons = document.querySelectorAll('.programmation__filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retire la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajoute la classe active au bouton cliqué
            button.classList.add('active');

            // Détermine la date en fonction du bouton
            let selectedDate;
            switch(button.textContent) {
                case 'Jour 1':
                    selectedDate = '2025-06-15';
                    break;
                case 'Jour 2':
                    selectedDate = '2025-06-16';
                    break;
                case 'Jour 3':
                    selectedDate = '2025-06-17';
                    break;
                default:
                    selectedDate = null; // Pour le bouton "Tous"
            }

            // Met à jour l'affichage
            updateDisplay(concerts, selectedDate);
        });
    });

    // Affiche tous les concerts au chargement initial
    updateDisplay(concerts);
}

// Lancer l'initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initConcertsPage);