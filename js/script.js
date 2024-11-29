document.addEventListener('DOMContentLoaded', function() {
    const equalizerContainer = document.querySelector('.equalizer');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const audio = document.getElementById('audio');
    const filterDateSelect = document.getElementById('filter-date');
    const filterAvailableSelect = document.getElementById('filter-available');
    const concertsContainer = document.querySelector('.concerts__list');
    const burgerMenu = document.getElementById('burger-menu');
    const nav = document.getElementById('nav');

    // Création des barres d'égaliseur
    for (let i = 0; i < 10; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.width = '6px';
        bar.style.backgroundColor = i % 2 === 0 ? '#ff2e92' : '#5dade2';
        equalizerContainer.appendChild(bar);
    }

    const bars = document.querySelectorAll('.bar');
    let isAnimating = false;
    let animationInterval;

    // Fonction pour démarrer l'animation
    const startAnimation = () => {
        isAnimating = true;
        playPauseBtn.textContent = 'Pause';
        audio.play();
        animationInterval = setInterval(() => {
            bars.forEach((bar) => {
                let randomHeight = Math.random() * 100 + 20;
                bar.style.height = randomHeight + 'px';
            });
        }, 500);
    };

    // Fonction pour arrêter l'animation
    const stopAnimation = () => {
        isAnimating = false;
        playPauseBtn.textContent = 'Play';
        clearInterval(animationInterval);
        audio.pause();
        audio.currentTime = 0;
        bars.forEach(bar => {
            bar.style.height = '20px';
        });
    };

    // Gestion du clic sur le bouton de lecture/pause
    playPauseBtn.addEventListener('click', function() {
        if (isAnimating) {
            stopAnimation();
        } else {
            startAnimation();
        }
    });

    // Fonction pour charger les concerts depuis le fichier JSON
    function loadConcerts() {
        fetch('json/concerts.json')
            .then(response => response.json())
            .then(data => {
                populateConcerts(data);
                populateDateFilter(data);
            })
            .catch(error => console.error('Erreur lors du chargement des concerts:', error));
    }

    // Fonction pour afficher les concerts
    function populateConcerts(concerts) {
        concertsContainer.innerHTML = '';

        concerts.forEach(concert => {
            const concertCard = document.createElement('div');
            concertCard.classList.add('concert-card');

            const availabilityClass = concert.place - concert.vendu > 0 ? 'disponible' : 'complet';
            concertCard.classList.add(availabilityClass);

            concertCard.innerHTML = `
                <img src="${concert.image}" alt="${concert.artiste}">
                <h3>${concert.artiste}</h3>
                <p>Date : ${concert.date}</p>
                <p>Places : ${concert.place - concert.vendu} disponibles</p>
            `;

            concertsContainer.appendChild(concertCard);
        });

        applyFilters();
    }

    // Fonction pour remplir le filtre des dates
    function populateDateFilter(concerts) {
        const dates = new Set(concerts.map(concert => concert.date));
        filterDateSelect.innerHTML = '<option value="">Toutes les dates</option>';

        dates.forEach(date => {
            const option = document.createElement('option');
            option.value = date;
            option.textContent = date;
            filterDateSelect.appendChild(option);
        });
    }

    // Fonction pour appliquer les filtres
    function applyFilters() {
        const selectedDate = filterDateSelect.value;
        const selectedAvailability = filterAvailableSelect.value;

        const filteredConcerts = document.querySelectorAll('.concert-card');
        filteredConcerts.forEach(card => {
            card.style.display = 'block';

            if (selectedDate && card.querySelector('p:nth-child(3)').textContent !== `Date : ${selectedDate}`) {
                card.style.display = 'none';
            }

            if (selectedAvailability === 'disponible' && card.classList.contains('complet')) {
                card.style.display = 'none';
            }

            if (selectedAvailability === 'complet' && card.classList.contains('disponible')) {
                card.style.display = 'none';
            }
        });
    }

    // Gestion du menu burger
    burgerMenu.addEventListener('click', function() {
        if (nav.classList.contains('nav-hidden')) {
            nav.classList.remove('nav-hidden');
            nav.classList.add('nav-visible');
        } else {
            nav.classList.remove('nav-visible');
            nav.classList.add('nav-hidden');
        }
    });

    loadConcerts();
});
