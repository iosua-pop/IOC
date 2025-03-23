const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const answerButtons = document.querySelectorAll('.answer-btn');
const introSound = new Audio('../sounds/intro2.mp3');
const correctSound = new Audio('../sounds/correct.mp3');
const wrongSound = new Audio('../sounds/wrong.mp3');
// const icons = ['./images/frunza1.png', './images/frunza2.png', './images/frunza3.png', './images/frunza4.png', './images/frunza5.png'];
const icons = ['./images/circle.png', './images/hexagon.png', './images/romb.png', './images/square.png', './images/triangle.png'];
let correctAnswer;

let matchCount = 0;
const totalMatches = 10;

function playIntro() {
    introSound.play();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawObjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const objectCount = getRandomInt(1, 5);
    correctAnswer = objectCount;

    const positions = [];

    for (let i = 0; i < objectCount; i++) {
        let x, y;
        do {
            x = getRandomInt(10, canvas.width - 70);
            y = getRandomInt(10, canvas.height - 70);
        } while (positions.some(pos => Math.abs(pos.x - x) < 50 && Math.abs(pos.y - y) < 50));
        positions.push({ x, y });

        const iconIndex = getRandomInt(0, icons.length - 1);
        const img = new Image();
        img.src = icons[iconIndex];
        img.onload = () => ctx.drawImage(img, x, y, 60, 60);
    }
}

function showFeedback(isCorrect) {
    document.body.style.backgroundColor = isCorrect ? '#28a745' : '#dc3545';
    setTimeout(() => {
        document.body.style.backgroundColor = '';
    }, isCorrect ? 1000 : 500);
}

function goToNextGame() {
    window.location.href = '../joc3/joc3.html';
}

answerButtons.forEach(button => {
    button.addEventListener('click', () => {
        const userAnswer = parseInt(button.dataset.answer, 10);
        if (userAnswer === correctAnswer) {
            correctSound.play();
            showFeedback(true);
            matchCount++;

            if (matchCount >= totalMatches) {
                setTimeout(goToNextGame, 1000);
            } else {
                setTimeout(() => {
                    playIntro();
                    drawObjects();
                }, 1000);
            }
        } else {
            wrongSound.play();
            showFeedback(false);
        }
    });
});

playIntro();
drawObjects();
