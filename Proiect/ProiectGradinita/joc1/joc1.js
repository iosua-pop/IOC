const imagesData = [
    { image: './images/img1.jpg', correct: 'defrisare' },
    { image: './images/img2.jpg', correct: 'defrisare' },
    { image: './images/img3.jpg', correct: 'defrisare' },
    { image: './images/img4.jpg', correct: 'foc' },
    { image: './images/img5.jpg', correct: 'foc' },
    { image: './images/img6.jpg', correct: 'foc' },
    { image: './images/img7.jpg', correct: 'deseuri' },
    { image: './images/img8.jpg', correct: 'deseuri' },
    { image: './images/img9.jpg', correct: 'deseuri' },
    { image: './images/img10.jpg', correct: 'deseuri' }
];

const mainImage = document.getElementById('main-image');
const choices = document.querySelectorAll('.choices img');

const correctSound = new Audio('../sounds/correct.mp3');
const wrongSound = new Audio('../sounds/wrong.mp3');
const introSound = new Audio('../sounds/intro1.mp3');

let shuffledImages = [];
let currentImageIndex = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startRound() {
    if (currentImageIndex >= shuffledImages.length) {
        goToNextGame();
        return;
    }
    introSound.play();
    setTimeout(loadNewImage, 1000);
}

function loadNewImage() {
    const currentImage = shuffledImages[currentImageIndex];
    mainImage.src = currentImage.image;
    mainImage.dataset.correct = currentImage.correct;
}

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        if (choice.alt === mainImage.dataset.correct) {
            correctSound.play();
            document.body.style.backgroundColor = '#28a745';
            setTimeout(() => {
                document.body.style.backgroundColor = '';
                currentImageIndex++;
                startRound();
            }, 1000);
        } else {
            wrongSound.play();
            document.body.style.backgroundColor = '#dc3545';
            setTimeout(() => {
                document.body.style.backgroundColor = '';
            }, 500);
        }
    });
});

function goToNextGame() {
    window.location.href = '../joc2/joc2.html';
}

// Amestecăm imaginile și începem jocul
shuffledImages = shuffle([...imagesData]);
startRound();
