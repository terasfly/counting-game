const firstNumber = document.getElementById('firstNumber');
const secondNumber = document.getElementById('secondNumber');
const answerInput = document.getElementById('answerInput');
const checkButton = document.getElementById('checkButton');
const stars = document.querySelectorAll('.star');
const gameLevels = document.querySelector('.game__levels');
const topStage = document.querySelector('.top__stage');
const resetButton = document.getElementById('resetButton');
const game = document.querySelector('.game');

let first = 0;
let second = 0;
let correctAnswers = 0;
let level = 1;
const levelMultiplier = 3;

const backgroundImages = {
    1: 'backgroundNumbersGame.png',
    2: 'loly.png',
    3: 'dolphins.png',
    4: 'unicorn.png',
    5: 'rainbow.png',
    6: 'planets.png'

};

// Gauti ir nustatyti didžiausią pasiektą lygį iš localStorage
const maxLevel = localStorage.getItem('maxLevel') || 1;
topStage.textContent = maxLevel;

function saveMaxLevel(newLevel) {
    const maxLevel = localStorage.getItem('maxLevel') || 1;
    if (newLevel > maxLevel) {
        localStorage.setItem('maxLevel', newLevel);
        topStage.textContent = newLevel;
    }
}

function changeLevel(newLevel) {
    level = newLevel;
    document.body.className = `level-${level}`; // Pakeičia fono klasę
    gameLevels.textContent = `Level-${level}`;
    saveMaxLevel(newLevel);
    resetGame();
    updateBackgroundImage();
}

function randomFirstNumber() {
    let min = (level - 1) * levelMultiplier + 1;
    let max = level * levelMultiplier;
    let num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    first = num1;
    firstNumber.textContent = first;
}

function randomSecondNumber() {
    let min = (level - 1) * levelMultiplier + 1;
    let max = level * levelMultiplier;
    let num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    second = num2;
    secondNumber.textContent = second;
}

function generateNumbers() {
    randomFirstNumber();
    randomSecondNumber();
}

generateNumbers();

function checkAnswer() {
    let userAnswer = parseInt(answerInput.value);
    let correctAnswer = first + second;
    if (userAnswer === correctAnswer) {
        generateNumbers();
        answerInput.value = '';
        checkButton.style.background = 'green';
        addStar();
    } else {
        checkButton.style.background = 'red';
        checkButton.style.color = 'white';
        answerInput.value = '';
    }
}

function addStar() {
    if (correctAnswers < stars.length) {
        const starImage = document.createElement('img');
        starImage.src = 'star.png';
        starImage.alt = 'Star';
        starImage.width = 100;
        starImage.height = 100;
        starImage.style.borderRadius = '20px';
        stars[correctAnswers].appendChild(starImage);
        correctAnswers++;
        if (correctAnswers === stars.length) {
            if (level < 5) {
                // alert('Congratulations! Moving to level ' + (level + 1));
                changeLevel(level + 1);
            } else {
                alert('You Win the Game!');
                resetGame();
            }
        }
    }
}

function resetGame() {
    correctAnswers = 0;
    for (let i = 0; i < stars.length; i++) {
        stars[i].innerHTML = '';
    }
    generateNumbers();
    answerInput.value = '';
    checkButton.style.background = '';
    checkButton.style.color = '';
    updateBackgroundImage();
}

function updateBackgroundImage() {
    game.style.backgroundImage = `url('${backgroundImages[level]}')`;
    game.style.width = '100%'
    game.styel.height = '100%'
}

answerInput.addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

checkButton.addEventListener('click', checkAnswer);

resetButton.addEventListener('click', function() {
    localStorage.removeItem('maxLevel');
    topStage.textContent = 1; // Reset topStage display
    level = 1; // Reset current level
    changeLevel(level); // Reset the game to the initial level
});
