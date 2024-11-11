
    const levels = [
        { name: "Ordinateur portable", minPrice: 900, maxPrice: 1500, correctPrice: 1200 },
        { name: "Télévision 4K", minPrice: 500, maxPrice: 1000, correctPrice: 700 },
        { name: "Smartphone", minPrice: 500, maxPrice: 1000, correctPrice: 800 },
        { name: "Machine à café", minPrice: 50, maxPrice: 250, correctPrice: 150 },
        { name: "Vélo de course", minPrice: 900, maxPrice: 1900, correctPrice: 1300 },
        { name: "Montre connectée", minPrice: 100, maxPrice: 450, correctPrice: 250 },
        { name: "Appareil photo", minPrice: 500, maxPrice: 1200, correctPrice: 900 },
        { name: "Tablette", minPrice: 200, maxPrice: 800, correctPrice: 500 },
        { name: "Hoverboard", minPrice: 200, maxPrice: 600, correctPrice: 400 },
        { name: "Casque de réalité virtuelle", minPrice: 200, maxPrice: 600, correctPrice: 350 },
        { name: "Drone", minPrice: 100, maxPrice: 1000, correctPrice: 700 },
        { name: "Lave-vaisselle", minPrice: 300, maxPrice: 1200, correctPrice: 850 },
        { name: "Réfrigérateur", minPrice: 400, maxPrice: 1500, correctPrice: 1100 },
        { name: "Home cinéma", minPrice: 150, maxPrice: 1000, correctPrice: 750 },
        { name: "Système audio", minPrice: 100, maxPrice: 800, correctPrice: 550 },
        { name: "Four à micro-ondes", minPrice: 50, maxPrice: 300, correctPrice: 200 },
        { name: "Aspirateur robot", minPrice: 100, maxPrice: 700, correctPrice: 450 },
        { name: "Console de jeux", minPrice: 200, maxPrice: 600, correctPrice: 500 },
        { name: "Imprimante 3D", minPrice: 300, maxPrice: 2000, correctPrice: 1500 },
        { name: "Chaîne hi-fi", minPrice: 100, maxPrice: 600, correctPrice: 350 }
    ];

    let currentLevel = 0;
    let attempts = 0;

    function updateLevel() {
        const level = levels[currentLevel];
        document.getElementById("article-name").innerText = `Article : ${level.name}`;
        document.getElementById("min-price").innerText = level.minPrice;
        document.getElementById("max-price").innerText = level.maxPrice;
        document.getElementById("guess").value = '';
        document.getElementById("result").innerText = '';
        updateProgressBar();
    }

    function updateProgressBar() {
        const progress = document.getElementById("progress");
        const percentage = ((currentLevel + 1) / levels.length) * 100;
        progress.style.width = percentage + "%";
    }

    function checkGuess() {
        const guess = parseInt(document.getElementById("guess").value);
        const level = levels[currentLevel];
        attempts++;

        if (guess === level.correctPrice) {
            document.getElementById("result").innerText = `Bravo ! Vous avez trouvé le juste prix en ${attempts} tentatives !`;
            currentLevel++;
            attempts = 0;

            if (currentLevel < levels.length) {
                updateLevel();
            } else {
                document.getElementById("result").innerText = "Félicitations ! Vous avez terminé tous les niveaux.";
                document.querySelector(".confetti-container").style.display = "block";
                document.querySelector("button").disabled = true;
            }
        } else if (guess < level.correctPrice) {
            document.getElementById("result").innerText = "C'est plus ! Essayez encore.";
        } else {
            document.getElementById("result").innerText = "C'est moins ! Essayez encore.";
        }
    }

    // Initialisation
    updateLevel();
