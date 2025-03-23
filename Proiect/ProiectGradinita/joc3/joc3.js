const bird = document.getElementById('bird');
const message = document.getElementById('message');
const positions = ['above', 'left', 'right', 'front'];
const introSound = new Audio('../sounds/intro3.mp3');
const correctSound = new Audio('../sounds/correct.mp3');
const wrongSound = new Audio('../sounds/wrong.mp3');
let currentPosition = '';
let matchCount = 0;
const totalMatches = 10;

let previousPosition = '';

function positionBird() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * positions.length);
    } while (positions[randomIndex] === previousPosition);

    currentPosition = positions[randomIndex];
    previousPosition = currentPosition;

    bird.style.top = '';
    bird.style.left = '';
    bird.style.right = '';
    bird.style.transform = '';
    bird.style.zIndex = '';

    switch (currentPosition) {
        case 'above':
            bird.style.top = '-50px';
            bird.style.left = '50%';
            bird.style.transform = 'translateX(-50%)';
            break;
        case 'left':
            bird.style.left = '-50px';
            bird.style.top = '50%';
            bird.style.transform = 'translateY(-50%)';
            break;
        case 'right':
            bird.style.right = '-50px';
            bird.style.top = '50%';
            bird.style.transform = 'translateY(-50%)';
            break;
        case 'front':
            bird.style.top = '150px';
            bird.style.left = '165px';
            bird.style.transform = 'scale(1.2)';
            break;
    }
}


function showFeedback(isCorrect) {
    document.body.style.backgroundColor = isCorrect ? '#28a745' : '#dc3545';
    setTimeout(() => {
        document.body.style.backgroundColor = '';
    }, isCorrect ? 1000 : 500);
}

function checkPosition(selectedPosition) {
    if (selectedPosition === currentPosition) {
        correctSound.play();
        showFeedback(true);
        matchCount++;
        if (matchCount >= totalMatches) {
            setTimeout(() => {
                goToHome();
            }, 1000);
        } else {
            setTimeout(() => {
                message.innerText = '';
                playIntro();
                positionBird();
            }, 1000);
        }
    } else {
        wrongSound.play();
        showFeedback(false);
    }
}

function playIntro() {
    introSound.play();
}

function goToHome() {
    window.location.href = '../final/final.html';
}

playIntro();
positionBird();
