let isExperienceStarted = false;
        
        // Mocking Audio for preview environment if files don't exist
        const bgMusic = new Audio("background.mp3");
        const rizzSound = new Audio("rizz.mp3");
        const goodGirlSound = new Audio("goodgirl.mp3");

        bgMusic.preload = "auto";
        bgMusic.loop = true;
        bgMusic.volume = 0.4;
        rizzSound.preload = "auto";
        goodGirlSound.preload = "auto";

        function startExperience() {
            if (isExperienceStarted) return;
            isExperienceStarted = true;
            bgMusic.play().catch(e => console.log("Music blocked"));
            goodGirlSound.play().catch(e => console.log("Greeting blocked"));
            goToPage(2);
            setTimeout(() => goToPage(3), 2200);
        }

        function goToPage(pageNum) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            
            let target;
            if (typeof pageNum === 'string') {
                target = document.getElementById(pageNum);
            } else {
                target = document.getElementById('page' + pageNum);
            }

            if (target) target.classList.add('active');

            if (pageNum === 4) setTimeout(() => goToPage(5), 1800);
        }

        function handleDescription(choice) {
            const splashText = document.getElementById('splash-desc-text');
            if (choice === 'sweetheart') splashText.innerHTML = `Ooohooo<br><span class="text-[#ff003c]">Sweetu.</span>`;
            else if (choice === 'trouble') splashText.innerHTML = `I like<br><span class="text-[#ff003c]">Trouble.</span>`;
            else if (choice === 'main') splashText.innerHTML = `Iconic<br><span class="text-[#ff003c]">Energy.</span>`;

            goToPage('page-desc-splash');
            setTimeout(() => goToPage(6), 2000);
        }

        function handleCuteResponse() {
            goToPage('page-cute-splash');
            setTimeout(() => goToPage(8), 2500);
        }

        function handleBestMoveResponse() {
            goToPage('page-final-splash');
            setTimeout(() => goToPage(13), 2000);
        }

        function playRizzThenNext(nextPage) {
            rizzSound.currentTime = 0; 
            rizzSound.play().catch(e => console.log("Rizz blocked"));
            autoNext(nextPage);
        }

        function setChaoticChoice(choice, next) {
            document.getElementById('crazy-choice-display').innerText = choice;
            autoNext(next);
        }

        function setRealChoice(choice, next) {
            document.getElementById('val-question').innerHTML = `Since we're doing <span class="text-[#ff003c]">${choice}</span>, will you be my Valentine?`;
            autoNext(next);
        }

        function autoNext(next) {
            setTimeout(() => goToPage(next), 400);
        }

        function toggleFullScreen() {
            const img = document.getElementById('pookie-img');
            if (img) {
                img.classList.add('shake');
                setTimeout(() => img.classList.remove('shake'), 500);
            }
        }

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

        window.onload = () => createHearts();
