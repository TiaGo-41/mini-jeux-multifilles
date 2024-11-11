
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const box = 20; // Taille d'un bloc
        let score = 0;
        let snake = [{x: 10 * box, y: 10 * box}]; // Position initiale du serpent
        let food = generateFood();
        let direction = "RIGHT"; // Direction initiale
        let game;

        // Contrôle de la direction avec les touches du clavier
        document.addEventListener("keydown", directionControl);

        function directionControl(event) {
            if (event.keyCode === 37 && direction !== "RIGHT") {
                direction = "LEFT";
            } else if (event.keyCode === 38 && direction !== "DOWN") {
                direction = "UP";
            } else if (event.keyCode === 39 && direction !== "LEFT") {
                direction = "RIGHT";
            } else if (event.keyCode === 40 && direction !== "UP") {
                direction = "DOWN";
            }
        }

        // Fonction pour dessiner le jeu
        function drawGame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer l'écran
            moveSnake();
            checkCollisions();
            drawSnake();
            drawFood();
            updateScore();
            game = setTimeout(drawGame, 200); // Vitesse réduite (200 ms)
        }

        // Déplacer le serpent
        function moveSnake() {
            let head = Object.assign({}, snake[0]); // Créer une copie de la tête du serpent

            if (direction === "LEFT") head.x -= box;
            if (direction === "UP") head.y -= box;
            if (direction === "RIGHT") head.x += box;
            if (direction === "DOWN") head.y += box;

            // Si le serpent touche la nourriture, il grandit et score augmente
            if (head.x === food.x && head.y === food.y) {
                score++;
                food = generateFood();
            } else {
                snake.pop(); // Si il ne mange pas, on retire la queue
            }

            // Ajoute la nouvelle tête à la position
            snake.unshift(head);
        }

        // Dessiner le serpent avec un dégradé de couleur
        function drawSnake() {
            for (let i = 0; i < snake.length; i++) {
                // Le dégradé de couleur de la tête à la queue
                let gradient = ctx.createLinearGradient(snake[i].x, snake[i].y, snake[i].x + box, snake[i].y + box);
                gradient.addColorStop(0, i === 0 ? "green" : "#33cc33");  // Tête verte
                gradient.addColorStop(1, i === snake.length - 1 ? "yellow" : "#66ff66");  // Queue jaune

                ctx.fillStyle = gradient;
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
            }
        }


        // Dessiner la nourriture
        function drawFood() {
            ctx.fillStyle = "red";
            ctx.fillRect(food.x, food.y, box, box);
        }

        // Générer une position aléatoire pour la nourriture
        function generateFood() {
            let x = Math.floor(Math.random() * (canvas.width / box)) * box;
            let y = Math.floor(Math.random() * (canvas.height / box)) * box;
            return {x: x, y: y};
        }

        // Vérifier les collisions (avec soi-même ou les bords)
        function checkCollisions() {
            // Si le serpent touche un bord, il se téléporte de l'autre côté
            if (snake[0].x < 0) snake[0].x = canvas.width - box;
            if (snake[0].x >= canvas.width) snake[0].x = 0;
            if (snake[0].y < 0) snake[0].y = canvas.height - box;
            if (snake[0].y >= canvas.height) snake[0].y = 0;

            // Vérifier si le serpent se mange lui-même
            for (let i = 1; i < snake.length; i++) {
                if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                    gameOver();
                    return;
                }
            }
        }

        // Afficher le score
        function updateScore() {
            document.getElementById("score").textContent = score;
        }

        // Fin du jeu avec un joli message
        function gameOver() {
            clearTimeout(game);

            // Créer le message de fin de jeu
            let gameOverMessage = document.createElement("div");
            gameOverMessage.className = "game-over-message";
            gameOverMessage.innerHTML = `
                <p>Game Over!</p>
                <p>Votre score est : ${score}</p>
                <button onclick="restartGame()">Recommencer</button>
            `;
            document.body.appendChild(gameOverMessage);
        }

        // Fonction pour recommencer le jeu
        function restartGame() {
            score = 0;
            snake = [{x: 10 * box, y: 10 * box}];
            food = generateFood();
            direction = "RIGHT";
            document.getElementById("score").textContent = score;
            let gameOverMessage = document.querySelector(".game-over-message");
            gameOverMessage.remove();  // Retirer le message de fin
            drawGame();  // Relancer le jeu
        }

        // Lancer le jeu
        drawGame();
