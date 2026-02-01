let bgMusic = null;
let rizzSound = null;
let goodGirlSound = null;
let isExperienceStarted = false;

const RIZZ_FILE = "rizz.mp3";
const BACKGROUND_FILE = "background.mp3";
const GOOD_GIRL_FILE = "goodgirl.mp3";

function startExperience() {
    if (isExperienceStarted) return;
    isExperienceStarted = true;
    
    const btn = document.getElementById('start-btn');
    btn.disabled = true;
    btn.innerText = "One sec...";

    bgMusic = new Audio(BACKGROUND_FILE);
    bgMusic.loop = true;
    bgMusic.volume = 0.4;
    
    rizzSound = new Audio(RIZZ_FILE);
    goodGirlSound = new Audio(GOOD_GIRL_FILE);

    bgMusic.play().catch(e => console.log("Music blocked"));

    goToPage(2);
    goodGirlSound.play().catch(e => console.log("Good girl audio missing"));

    setTimeout(() => goToPage(3), 2200);
}

function goToPage(pageNum) {
    document.querySelectorAll('.page').forEach((p, idx) => {
        p.classList.remove('active');
        if (idx === pageNum - 1) p.classList.add('active');
    });

    if (pageNum === 4) {
        setTimeout(() => goToPage(5), 1800);
    }

    if (window.navigator.vibrate) window.navigator.vibrate(20);
}

function setChaoticChoice(choice, next) {
    document.getElementById('crazy-choice-display').innerText = choice;
    autoNext(next);
}

function setRealChoice(choice, next) {
    const questionEl = document.getElementById('val-question');
    questionEl.innerHTML = `Since we're going for <span class="text-[#ff003c]">${choice}</span>, you might as well be my Valentine?`;
    autoNext(next);
}

function playRizzThenNext(nextPage) {
    if (rizzSound) {
        rizzSound.currentTime = 0;
        rizzSound.play().catch(e => console.log("Sound play error"));
    }
    autoNext(nextPage);
}

function handleNo() {
    if (window.navigator.vibrate) window.navigator.vibrate(100);
    alert("This button is strictly for decorative purposes.");
}

function autoNext(next) {
    setTimeout(() => goToPage(next), 400);
}

function createHearts() {
    const container = document.getElementById('heart-container');
    if(!container) return;
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 4 + 3) + 's';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(heart);
    }
}

window.onload = createHearts;
document.addEventListener('touchmove', (e) => { if(e.touches.length > 1) e.preventDefault(); }, { passive: false });
