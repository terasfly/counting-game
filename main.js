// These lines set variables that link the JavaScript code to HTML elements.
const firstNumber = document.getElementById('firstNumber');
const secondNumber = document.getElementById('secondNumber');
const answerInput = document.getElementById('answerInput');
const checkButton = document.getElementById('checkButton');
const stars = document.querySelectorAll('.star');
const gameLevels = document.querySelector('.game__levels');
const topStage = document.querySelector('.top__stage');
const resetButton = document.getElementById('resetButton');
const game = document.querySelector('.game');

const levelsColor = document.querySelector('.game__levels-color')

// These variables define the initial settings for game logic.
let first = 0; // First number for addition
let second = 0; // Second number for addition
let correctAnswers = 0; // Count of correct answers
let level = 1; // Current game level
const levelUp = 3; // Used to calculate the number range for each level

// This object associates each level with a background image.
const backgroundImages = {
    1: 'backgroundWebP.webp',
    2: 'loly.png',
    3: 'dolphins.png',
    4: 'unicorn.png',
    5: 'rainbow.png',
    6: 'planets.png'
};

// Retrieves the highest achieved level from browser memory (localStorage) and displays it.
const maxLevel = parseInt(localStorage.getItem('maxLevel')) || 1;

topStage.textContent = maxLevel;

// This function saves the new highest level achieved, if it is greater than the previous one.
function saveMaxLevel(newLevel) {
    const maxLevel = localStorage.getItem('maxLevel') || 1;
    if (newLevel > maxLevel) {
        localStorage.setItem('maxLevel', newLevel);
        topStage.textContent = newLevel;
    }
}

// This function changes the game level, updates the user interface, and calls other functions to update the game state.
function changeLevel(newLevel) {
    level = newLevel;
    document.body.className = `level-${level}`;
    gameLevels.textContent = `Level-${level}`;
    saveMaxLevel(newLevel);
    resetGame(); // Reset game state
    updateBackgroundImage(); // Update background based on new level
}

// This function generates a random first number according to the current level.
function randomFirstNumber() {
    let min = (level - 1) * levelUp + 1;
    let max = level * levelUp;
    let num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    first = num1;
    firstNumber.value = first;
}

// This function generates a random second number according to the current level.
function randomSecondNumber() {
    let min = (level - 1) * levelUp + 1;
    let max = level * levelUp;
    let num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    second = num2;
    secondNumber.value = second;
}

// This function calls both previous functions to generate two numbers.
function generateNumbers() {
    randomFirstNumber();
    randomSecondNumber();
}

// Called immediately to start the game.
generateNumbers();

// This function checks the user's answer. If the answer is correct, it updates the game and adds a star.
// If the answer is incorrect, it changes the button color to red.
const digitElements = document.querySelectorAll('.digit');

digitElements.forEach(element => {
    element.addEventListener('click', (event) => {
        const number = event.target.textContent.trim();
        answerInput.value += number;
    });
});

function checkAnswer() {
    let userAnswer = parseInt(answerInput.value);
    let correctAnswer = first + second;
    if (userAnswer === correctAnswer) {
        generateNumbers();
        answerInput.value = '';
        addStar();
        checkButton.style.backgroundColor = 'yellow';
    } else {
        checkButton.style.background = 'red';
        checkButton.style.color = 'white';
        answerInput.value = '';
    }
}

// This function adds a star for each correct answer.
// When all stars are collected, it moves the player to the next level or ends the game.
function addStar() {
    if (correctAnswers < stars.length) {
        const starImage = document.createElement('img');
        starImage.src = 'star.png';
        starImage.alt = 'Star';
        starImage.width = 10;
        starImage.height = 10;
        starImage.style.borderRadius = '20px';
        stars[correctAnswers].appendChild(starImage);
        correctAnswers++;
        if (correctAnswers === stars.length) {
            if (level < 5) {
                changeLevel(level + 1);
            } else {
                alert('You Win the Game!');
                resetGame();
            }
        }
    }
}

// This function resets the game to its initial state: clears stars, generates new numbers, and updates the user interface.
function resetGame() {
    correctAnswers = 0;
    for (let i = 0; i < stars.length; i++) {
        stars[i].innerHTML = '';
    }
    generateNumbers();
    answerInput.value = '';
    checkButton.style.background = '';
    checkButton.style.color = '';
}

// This function updates the game background image according to the current level.
function updateBackgroundImage() {
    game.style.backgroundImage = `url('${backgroundImages[level]}')`;
    game.style.width = '100%';
    game.style.height = '100vh';
}

// This event listener ensures that only numbers are entered in the answer input field.
answerInput.addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// This event listener calls the checkAnswer function when the check button is clicked.
checkButton.addEventListener('click', checkAnswer);

// This event listener completely resets the game and clears the saved highest level when the reset button is clicked.
resetButton.addEventListener('click', function() {
    localStorage.removeItem('maxLevel');
    topStage.textContent = 1;
    level = 1;
    changeLevel(level); // Resets everything and calls updateBackgroundImage based on level 1
});
