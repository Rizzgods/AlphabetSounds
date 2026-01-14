// Alphabet Adventure Game JavaScript
// Game State
let playerPosition = -1; // -1 = start position
let totalSteps = 0;
let isRolling = false;

// DOM Elements
const diceBtn = document.getElementById('diceBtn');
const diceIcon = document.getElementById('diceIcon');
const diceResult = document.getElementById('diceResult');
const currentLetter = document.getElementById('currentLetter');
const totalStepsEl = document.getElementById('totalSteps');
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const winModal = document.getElementById('winModal');
const playAgainBtn = document.getElementById('playAgainBtn');

// Alphabet data
const alphabet = [
    { letter: 'A', word: 'Alligator', emoji: '🐊' },
    { letter: 'B', word: 'Bear', emoji: '🐻' },
    { letter: 'C', word: 'Cat', emoji: '🐈' },
    { letter: 'D', word: 'Dog', emoji: '🐕' },
    { letter: 'E', word: 'Elephant', emoji: '🐘' },
    { letter: 'F', word: 'Fox', emoji: '🦊' },
    { letter: 'G', word: 'Giraffe', emoji: '🦒' },
    { letter: 'H', word: 'Hippo', emoji: '🦛' },
    { letter: 'I', word: 'Iguana', emoji: '🦎' },
    { letter: 'J', word: 'Jaguar', emoji: '🐆' },
    { letter: 'K', word: 'Koala', emoji: '🐨' },
    { letter: 'L', word: 'Lion', emoji: '🦁' },
    { letter: 'M', word: 'Monkey', emoji: '🐒' },
    { letter: 'N', word: 'Newt', emoji: '🦎' },
    { letter: 'O', word: 'Owl', emoji: '🦉' },
    { letter: 'P', word: 'Parrot', emoji: '🦜' },
    { letter: 'Q', word: 'Quail', emoji: '🐦' },
    { letter: 'R', word: 'Rabbit', emoji: '🐰' },
    { letter: 'S', word: 'Snake', emoji: '🐍' },
    { letter: 'T', word: 'Tiger', emoji: '🐅' },
    { letter: 'U', word: 'Unicorn', emoji: '🦄' },
    { letter: 'V', word: 'Vulture', emoji: '🦅' },
    { letter: 'W', word: 'Wolf', emoji: '🐺' },
    { letter: 'X', word: 'X-ray fish', emoji: '🐟' },
    { letter: 'Y', word: 'Yak', emoji: '🐃' },
    { letter: 'Z', word: 'Zebra', emoji: '🦓' }
];

// Dice faces for animation
const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

// Roll dice function
function rollDice() {
    if (isRolling || playerPosition >= 26) return;
    isRolling = true;

    // Disable button during roll
    diceBtn.disabled = true;
    diceBtn.classList.add('opacity-75');

    // Animate dice
    diceIcon.classList.add('animate-dice-roll');
    
    // Show rolling animation
    let rollCount = 0;
    const rollInterval = setInterval(() => {
        diceResult.textContent = diceFaces[Math.floor(Math.random() * 6)];
        rollCount++;
        if (rollCount >= 10) {
            clearInterval(rollInterval);
            finishRoll();
        }
    }, 100);
}

function finishRoll() {
    // Get final dice value (1-6)
    const roll = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = roll;
    
    // Remove dice animation
    diceIcon.classList.remove('animate-dice-roll');
    
    // Update total steps
    totalSteps += roll;
    totalStepsEl.textContent = totalSteps;
    
    // Move player
    movePlayer(roll);
}

function movePlayer(steps) {
    const oldPosition = playerPosition;
    const targetPosition = Math.min(playerPosition + steps, 26); // Max is finish (26)

    // Animate movement step by step
    let currentStep = oldPosition;
    const moveInterval = setInterval(() => {
        currentStep++;
        if (currentStep > targetPosition) {
            clearInterval(moveInterval);
            playerPosition = targetPosition;
            showMessage();
            
            // Re-enable button
            setTimeout(() => {
                diceBtn.disabled = false;
                diceBtn.classList.remove('opacity-75');
                isRolling = false;
            }, 300);
            return;
        }
        updatePlayerVisual(currentStep);
    }, 250);
}

function updatePlayerVisual(pos) {
    // Hide all player markers
    document.querySelectorAll('.player-marker').forEach(marker => {
        marker.classList.add('hidden');
    });

    // Remove highlight from all tiles
    document.querySelectorAll('.letter-tile').forEach(tile => {
        tile.classList.remove('current-tile', 'animate-wiggle');
    });

    // Show current position marker
    let markerId, tileId;
    if (pos === -1) {
        markerId = 'player-start';
        tileId = 'tile-start';
        currentLetter.textContent = 'START 🏁';
    } else if (pos >= 26) {
        markerId = 'player-finish';
        tileId = 'tile-finish';
        currentLetter.textContent = '🏆 WINNER!';
    } else {
        markerId = `player-${pos}`;
        tileId = `tile-${pos}`;
        currentLetter.textContent = `${alphabet[pos].letter} - ${alphabet[pos].emoji}`;
    }

    const marker = document.getElementById(markerId);
    if (marker) {
        marker.classList.remove('hidden');
    }

    const currentTile = document.getElementById(tileId);
    if (currentTile) {
        currentTile.classList.add('current-tile', 'animate-wiggle');
        // Scroll tile into view on mobile
        currentTile.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

// Letter Modal Elements
const letterModal = document.getElementById('letterModal');
const letterEmoji = document.getElementById('letterEmoji');
const letterTitle = document.getElementById('letterTitle');
const letterWord = document.getElementById('letterWord');
const closeLetterModal = document.getElementById('closeLetterModal');
const sayAgainBtn = document.getElementById('sayAgainBtn');
let currentLetterData = null;

function showLetterPopup(letterData) {
    currentLetterData = letterData;
    
    // Update modal content
    letterEmoji.textContent = letterData.emoji;
    letterTitle.textContent = letterData.letter;
    letterWord.textContent = `${letterData.letter} is for ${letterData.word}!`;
    
    // Show modal
    letterModal.classList.remove('hidden');
    
    // Speak the letter
    speakLetter(letterData);
}

function speakLetter(letterData) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(`${letterData.letter} is for ${letterData.word}`);
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        speechSynthesis.speak(utterance);
    }
}

function closeLetterPopup() {
    letterModal.classList.add('hidden');
    currentLetterData = null;
}

function showMessage() {
    if (playerPosition >= 26) {
        // Player won!
        setTimeout(() => {
            winModal.classList.remove('hidden');
            createConfetti();
        }, 300);
    } else if (playerPosition >= 0) {
        const letterData = alphabet[playerPosition];
        // Show letter popup instead of simple message
        showLetterPopup(letterData);
    }
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da', '#fcbad3'];
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.width = (8 + Math.random() * 8) + 'px';
            confetti.style.height = (8 + Math.random() * 8) + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            document.body.appendChild(confetti);

            // Animate falling
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: 2500 + Math.random() * 1500,
                easing: 'ease-out'
            });

            animation.onfinish = () => confetti.remove();
        }, i * 30);
    }
}

function resetGame() {
    playerPosition = -1;
    totalSteps = 0;
    totalStepsEl.textContent = '0';
    diceResult.textContent = '-';
    winModal.classList.add('hidden');
    messageBox.classList.add('hidden');
    updatePlayerVisual(-1);
    isRolling = false;
    diceBtn.disabled = false;
    diceBtn.classList.remove('opacity-75');
}

// Event Listeners
diceBtn.addEventListener('click', rollDice);
playAgainBtn.addEventListener('click', resetGame);

// Letter Modal Event Listeners
closeLetterModal.addEventListener('click', closeLetterPopup);
sayAgainBtn.addEventListener('click', () => {
    if (currentLetterData) {
        speakLetter(currentLetterData);
    }
});

// Close modal when clicking outside
letterModal.addEventListener('click', (e) => {
    if (e.target === letterModal) {
        closeLetterPopup();
    }
});

// Click on tiles to hear the letter and show popup
document.querySelectorAll('.letter-tile[data-letter]').forEach(tile => {
    tile.addEventListener('click', () => {
        const letter = tile.dataset.letter;
        const letterData = alphabet.find(a => a.letter === letter);
        if (letterData) {
            // Show popup with pronunciation
            showLetterPopup(letterData);
            
            // Visual feedback on tile
            tile.classList.add('animate-pop');
            setTimeout(() => tile.classList.remove('animate-pop'), 300);
        }
    });
});

// Keyboard support - press space or enter to roll, Escape to close modal
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
        closeLetterPopup();
    } else if ((e.code === 'Space' || e.code === 'Enter') && !letterModal.classList.contains('hidden')) {
        // If modal is open, say again on Space/Enter
        e.preventDefault();
        if (currentLetterData) {
            speakLetter(currentLetterData);
        }
    } else if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        rollDice();
    }
});

// Initialize game
updatePlayerVisual(-1);
