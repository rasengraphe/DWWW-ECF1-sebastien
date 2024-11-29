
document.addEventListener('DOMContentLoaded', function() {
    const audioElement = document.getElementById('audio'); // Assurez-vous que cet élément existe
    if (audioElement) {
        audioElement.addEventListener('play', function() {
            // ... votre code ...
        });
    } else {
        console.error('L\'élément audio n\'existe pas dans le DOM.');
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const bars = document.querySelectorAll('.bar');
    let isPlaying = false;

    // Fonction pour animer les barres
    function animateBars() {
        bars.forEach(bar => {
            const height = Math.random() * 100;
            bar.style.height = `${height}%`;
        });
    }

    // Variable pour stocker l'intervalle d'animation
    let animationInterval;

    // Fonction pour démarrer l'animation
    function startAnimation() {
        animationInterval = setInterval(animateBars, 100);
    }

    // Fonction pour arrêter l'animation
    function stopAnimation() {
        clearInterval(animationInterval);
        // Réinitialiser la hauteur des barres
        bars.forEach(bar => {
            bar.style.height = '50%';
        });
    }

    // Gestionnaire d'événements pour le bouton play/pause
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            audioPlayer.pause();
            playBtn.textContent = '▶';
            stopAnimation();
        } else {
            audioPlayer.play();
            playBtn.textContent = '⏸';
            startAnimation();
        }
        isPlaying = !isPlaying;
    });

    // Gestionnaire pour la fin de l'audio
    audioPlayer.addEventListener('ended', function() {
        isPlaying = false;
        playBtn.textContent = '▶';
        stopAnimation();
    });
});

const playBtn = document.getElementById('playBtn');
    const backgroundVideo = document.getElementById('backgroundVideo');

    playBtn.addEventListener('click', () => {
        if (backgroundVideo.paused) {
            backgroundVideo.play();
            playBtn.textContent = '❚❚'; // Change le texte du bouton pour indiquer "pause"
        } else {
            backgroundVideo.pause();
            playBtn.textContent = '▶'; // Change le texte du bouton pour indiquer "play"
        }
    });