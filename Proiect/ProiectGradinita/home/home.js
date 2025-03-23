const messages = [
    'Pentru început, haideți să ne întrebăm:Ce știți despre copaci?Această întrebare ne introduce în lumea copacilor, acești prieteni ai naturii care ne ajută în atât de multe moduri. „Copăcelul de hârtie”v-a fii pentru noi legătura directă cu natura și prin el vom învăța importanța copacilor în viața noastră.',
    'Copacii sunt mai mult decât simple plante – ei au un ciclu de viață fascinant. Totul începe de la o mică sămânță plantată în pământ, care cu timpul devine un mic vlăstar. Acest vlăstar crește și se transformă într-un copac tânăr, urmat de un copac adult care produce semințe. Spre finalul vieții, copacul îmbătrânește, devenind un copac bătrân și, în cele din urmă, își încheie viața.',
    'Deși creșterea unui copac necesită zeci sau chiar sute de ani, putem identifica șase etape principale în viața sa: sămânța, mugurii, puietul, vlăstarul, copacul adult și copacul mort. Fiecare etapă ne arată cât de fascinantă este natura.',
    'De ce sunt atât de importanți copacii? Ei ne oferă lemn pentru clădiri și structuri, sursa de energie pentru incalzire dar și hârtia pe care scriem. Sunt indispensabili pentru viața noastră de zi cu zi și pentru dezvoltarea societății.',
    'Pentru a produce hârtie, copacii trebuie tăiați și prelucrați prin procese complexe. Reciclarea hârtiei reduce nevoia de a tăia copaci noi și ajută la conservarea pădurilor.',
    'Reciclarea este un proces simplu dar important: colectăm, sortăm, transportăm, curățăm și transformăm hârtia veche în hârtie nouă. Acest proces ajută la protejarea mediului.',
    'Copacii sunt cei mai mari producători de oxigen. Ei curăță aerul, eliminând particulele nocive, și ne oferă un mediu mai sănătos.',
    'Cum putem proteja copacii? Curățând pădurile, replantând copaci, evitând defrișările excesive, reciclând hârtia și controlând incendiile.',
    'Fără copaci, pădurile riscă să dispară complet. Defrișarea și incendiile necontrolate reduc calitatea aerului, spațiile verzi și cresc riscul de inundații.',
    'Haideți să protejăm copacii împreună! Un viitor mai verde și mai sănătos depinde de noi toți!'
];


let currentMessageIndex = 0;
let openedScrolls = 0;
const totalScrolls = messages.length;
let currentAudio = null;

function showPopup(scrollId) {
    if (openedScrolls >= totalScrolls) {
        startCelebration();
        return;
    }

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(`./sounds/${currentMessageIndex + 1}.mp3`);
    currentAudio.play();

    document.getElementById('popup-text-container').innerText = messages[currentMessageIndex];
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';

    currentMessageIndex++;
    openedScrolls++;
    document.getElementById(scrollId).style.display = 'none';

    currentAudio.onended = closePopup;
    setTimeout(() => {
        if (!currentAudio.paused) return;
        closePopup();
    }, 1000);
}

function closePopup() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    if (openedScrolls === totalScrolls) {
        startCelebration();
    }
}

function startCelebration() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    const celebrationSound = document.getElementById('celebration-sound');
    celebrationSound.play();

    const messageElement = document.getElementById('celebration-message');
    messageElement.style.display = 'block';

    setTimeout(() => {
        messageElement.style.display = 'none';
        window.location.href = '../joc1/joc1.html';
    }, 3000);
}
