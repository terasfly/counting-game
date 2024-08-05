// Šios eilutės nustato kintamuosius, kurie susieja JavaScript kodą su HTML elementais.
const firstNumber = document.getElementById('firstNumber');
const secondNumber = document.getElementById('secondNumber');
const answerInput = document.getElementById('answerInput');
const checkButton = document.getElementById('checkButton');
const stars = document.querySelectorAll('.star');
const gameLevels = document.querySelector('.game__levels');
const topStage = document.querySelector('.top__stage');
const resetButton = document.getElementById('resetButton');
const game = document.querySelector('.game');

// const digit = document.querySelectorAll('.digit')

// Čia nustatomi pradiniai kintamieji žaidimo logikai.
let first = 0; // Pirmas skaičius sudėčiai
let second = 0; // Antras skaičius sudėčiai
let correctAnswers = 0; // Teisingų atsakymų skaičius
let level = 1; // Dabartinis žaidimo lygis
const levelUp = 4; // Naudojamas apskaičiuoti skaičių diapazoną kiekviename lygyje

// Šis objektas susieja kiekvieną lygį su fono paveikslėliu.
const backgroundImages = {
    1: 'backgroundWebP.webp',
    2: 'loly.png',
    3: 'dolphins.png',
    4: 'unicorn.png',
    5: 'rainbow.png',
    6: 'planets.png'
};

// Gauna aukščiausią pasiektą lygį iš naršyklės atminties (localStorage) ir atvaizduoja jį.
const maxLevel = localStorage.getItem('maxLevel') || 1;
topStage.textContent = maxLevel;

// Ši funkcija išsaugo naują aukščiausią pasiektą lygį, jei jis yra didesnis už ankstesnį.
function saveMaxLevel(newLevel) {
    const maxLevel = localStorage.getItem('maxLevel') || 1;
    if (newLevel > maxLevel) {
        localStorage.setItem('maxLevel', newLevel);
        topStage.textContent = newLevel;
    }
}

// Ši funkcija keičia žaidimo lygį, atnaujina vartotojo sąsają ir iškviečia kitas funkcijas žaidimo būsenai atnaujinti.
function changeLevel(newLevel) {
    level = newLevel;
    document.body.className = `level-${level}`;
    gameLevels.textContent = `Level-${level}`;
    saveMaxLevel(newLevel);
    resetGame();
    updateBackgroundImage();
}

// Ši funkcija generuoja atsitiktinį pirmą skaičių pagal dabartinį lygį.
function randomFirstNumber() {
    let min = (level - 1) * levelUp + 1;
    let max = level * levelUp;
    let num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    first = num1;
    firstNumber.value = first;
}

// Ši funkcija generuoja atsitiktinį antrą skaičių pagal dabartinį lygį.
function randomSecondNumber() {
    let min = (level - 1) * levelUp + 1;
    let max = level * levelUp;
    let num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    second = num2;
    secondNumber.value = second;
}

// Ši funkcija iškviečia abi ankstesnes funkcijas, kad sugeneruotų du skaičius.
function generateNumbers() {
    randomFirstNumber();
    randomSecondNumber();
}

// Iškviečiama iš karto, kad pradėtų žaidimą.
generateNumbers();

// Ši funkcija tikrina vartotojo atsakymą. Jei atsakymas teisingas, ji atnaujina žaidimą ir prideda žvaigždutę. 
// Jei neteisingas, ji pakeičia mygtuko spalvą į raudoną.



const digitElements = document.querySelectorAll('.digit');

digitElements.forEach(element => {
    element.addEventListener('click', (event) => {
        const number = event.target.textContent.trim()
        answerInput.value +=number
    })
});




function checkAnswer() {
    let userAnswer = parseInt(answerInput.value);
    let correctAnswer = first + second;
    if (userAnswer === correctAnswer) {
        generateNumbers();
        answerInput.value = '';
        checkButton.style.background = 'green';
        addStar();
        checkButton.style.color = 'yellow';
    } else {
        checkButton.style.background = 'red';
        checkButton.style.color = 'white';
        answerInput.value = '';
    }
}

// function addAnswer(event) {
//     const digit = document.querySelectorAll('.digit')

//     const clickNumber = Number(event.target)
//     digit.forEach(element => {
//         const text = Number(element.textContent.trim())
//         console.log(text)


//     });

// }
// addAnswer()
// Ši funkcija prideda žvaigždutę už kiekvieną teisingą atsakymą. 
// Kai surenkamos visos žvaigždutės, ji perkelia žaidėją į kitą lygį arba baigia žaidimą.
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

// Ši funkcija atstato žaidimą į pradinę būseną: išvalo žvaigždutes, sugeneruoja naujus skaičius ir atnaujina vartotojo sąsają.
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

// Ši funkcija atnaujina žaidimo fono paveikslėlį pagal dabartinį lygį.
function updateBackgroundImage() {
    game.style.backgroundImage = `url('${backgroundImages[level]}')`;
    game.style.width = '100%'
    game.style.height = '100%'
}

// Šis įvykių klausytojas užtikrina, kad į atsakymo laukelį būtų įvedami tik skaičiai.
answerInput.addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// Šis įvykių klausytojas iškviečia checkAnswer funkciją, kai paspaudžiamas tikrinimo mygtukas.
checkButton.addEventListener('click', checkAnswer);

// Šis įvykių klausytojas visiškai atstato žaidimą ir išvalo išsaugotą aukščiausią lygį, kai paspaudžiamas atstatymo mygtukas.
resetButton.addEventListener('click', function() {
    localStorage.removeItem('maxLevel');
    topStage.textContent = 1;
    level = 1;
    changeLevel(level);
});
