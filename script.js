let fighter1Name = "You", fighter2Name = "Computer";
let power1 = 100, power2 = 100;
const moves = {
    jab: { damage: 5, icon: '💥' },
    hammerfist: { damage: 10, icon: '👊' },
    kick: { damage: 15, icon: '🦵' },
    choke: { damage: 20, icon: '🪤' },
};
let turn = 1;
const moveSounds = {
    jab: new Audio('sounds/jab.mp3'),
    hammerfist: new Audio('sounds/hammerfist.mp3'),
    kick: new Audio('sounds/kick.mp3'),
    choke: new Audio('sounds/choke.mp3'),
};

function updatePowerBars() {
    document.getElementById('fighter1-power-bar').style.width = power1 + '%';
    document.getElementById('fighter2-power-bar').style.width = power2 + '%';
}

function logMessage(message) {
    const log = document.getElementById('log');
    log.innerHTML += `<p>${message}</p>`;
    log.scrollTop = log.scrollHeight;  // Auto-scroll to the latest message
}

function startGame() {
    fighter1Name = prompt("Enter your name:");
    fighter2Name = "Computer";

    if (!fighter1Name) {
        alert("Name is required. Please refresh the page to start over.");
        return;
    }

    document.getElementById('fighter1-name').innerText = fighter1Name;
    document.getElementById('fighter2-name').innerText = fighter2Name;

    power1 = 100;
    power2 = 100;
    turn = 1;
    
    document.getElementById('move-selection').style.display = 'block';
    document.getElementById('actions').querySelector('button').style.display = 'none';  // Hide Start button
    updatePowerBars();
    document.getElementById('log').innerHTML = '';  // Clear previous logs
}

function makeMove() {
    const move = document.getElementById('move-selector').value.split(' ')[0];  // Get move key from option value
    if (moves[move] !== undefined) {
        power2 -= moves[move].damage;
        logMessage(`${fighter1Name} uses ${moves[move].icon} ${move} on ${fighter2Name}. ${fighter2Name}'s new power is ${power2}.`);
        moveSounds[move].play();
        turn = 2;
        checkGameOver();
        if (power2 > 0) {
            setTimeout(computerMove, 1000);  // Delay computer's move
        }
    } else {
        logMessage("Invalid move. Try again.");
    }
}

function computerMove() {
    const movesArray = Object.keys(moves);
    const move = movesArray[Math.floor(Math.random() * movesArray.length)];
    power1 -= moves[move].damage;
    logMessage(`${fighter2Name} uses ${moves[move].icon} ${move} on ${fighter1Name}. ${fighter1Name}'s new power is ${power1}.`);
    moveSounds[move].play();
    turn = 1;
    updatePowerBars();
    checkGameOver();
}

function checkGameOver() {
    if (power1 <= 0) {
        logMessage(`${fighter1Name} is knocked out! ${fighter2Name} wins! 🎉`);
        endGame();
    } else if (power2 <= 0) {
        logMessage(`${fighter2Name} is knocked out! ${fighter1Name} wins! 🎉`);
        endGame();
    }
}

function endGame() {
    document.getElementById('move-selection').style.display = 'none';
    document.getElementById('actions').querySelector('button').style.display = 'block';  // Show Start button again

    const playAgain = confirm("Do you want to play again?");
    if (playAgain) {
        startGame();  // Restart the game
    } else {
        logMessage("Thanks for playing!");  // Final message
    }
}
