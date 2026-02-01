// 1. GLOBAL VARIABLES & PRE-LOADING
let isExperienceStarted = false;

// Initialize audio objects immediately so they start buffering
const bgMusic = new Audio("background.mp3");
const rizzSound = new Audio("rizz.mp3");
const goodGirlSound = new Audio("goodgirl.mp3");

// Optimization: Set preload to 'auto' for all files
bgMusic.preload = "auto";
bgMusic.loop = true;
bgMusic.volume = 0.4;

rizzSound.preload = "auto";
goodGirlSound.preload = "auto";

// 2. CORE FUNCTIONS
function startExperience() {
    if (isExperienceStarted) return;
    isExperienceStarted = true;
    
    // Play audio immediately upon interaction (crucial for mobile)
    bgMusic.play().catch(e => console.log("Background music blocked or loading"));
    goodGirlSound.play().catch(e => console.log("Greeting audio blocked or loading"));

    const btn = document.getElementById('start-btn');
    if (btn) {
        btn.disabled = true;
        btn.innerText = "Opening...";
    }

    // Go to "Good Girl" flash screen almost instantly
    goToPage(2);

    // Stay on Page 2 for 2.2 seconds then move to Page 3
    setTimeout(() => goToPage(3), 2200);
}

function goToPage(pageNum) {
    const pages = document.querySelectorAll('.page');
    pages.forEach((p, idx) => {
        p.classList.remove('active');
        if (idx === pageNum - 1) p.classList.add('active');
    });

    // Handle the auto-transition for Page 4 (The "Tell me about you" screen)
    if (pageNum === 4) {
        setTimeout(() => goToPage(5), 1800);
    }

    // Haptic feedback for mobile users
    if (window.navigator.vibrate) window.navigator.vibrate(20);
}

function playRizzThenNext(nextPage) {
    // Reset and play Rizz sound effect
    rizzSound.currentTime = 0; 
    rizzSound.play().catch(e => console.log("Rizz sound blocked"));
    
    autoNext(nextPage);
}

// 3. SELECTION LOGIC
function setChaoticChoice(choice, next) {
    const display = document.getElementById('crazy-choice-display');
    if (display) display.innerText = choice;
    autoNext(next);
}

function setRealChoice(choice, next) {
    const questionEl = document.getElementById('val-question');
    if (questionEl) {
        questionEl.innerHTML = `Since we're going for <span class="text-[#ff003c]">${choice}</span>, you might as well be my Valentine?`;
    }
    autoNext(next);
}

function handleNo() {
    if (window.navigator.vibrate) window.navigator.vibrate(100);
    
    const alertBox = document.getElementById('custom-alert');
    if (alertBox) {
        alertBox.classList.add('active');
        
        // Hide it automatically after 2 seconds
        setTimeout(() => {
            alertBox.classList.remove('active');
        }, 2000);
    }
}
// 4. VISUAL EFFECTS
function createHearts() {
    const container = document.getElementById('heart-container');
    if (!container) return;
    
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

// 5. INITIALIZATION
window.onload = createHearts;

// Prevent zooming/bouncing on mobile devices
document.addEventListener('touchmove', (e) => { 
    if(e.touches.length > 1) e.preventDefault(); 
}, { passive: false });

function makeFullScreen() {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
}

