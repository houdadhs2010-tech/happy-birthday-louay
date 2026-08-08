const PASSWORD ="270126";
const passwordGate = document.getElementById("passwordGate");
const passwordInput = document.getElementById("passwordInput");
const passwordBtn = document.getElementById("passwordBtn");
const passwordError = document.getElementById("passwordError");
const intro = document.getElementById("intro");

let siteUnlocked = false;

function revealFirstScreen() {
    const firstScreen = document.getElementById("screen1");
    firstScreen.classList.add("active");
    updateProgress(1);
    
}

function unlockSite() {
    if (siteUnlocked) return;

    if (passwordInput.value === PASSWORD) {
        siteUnlocked = true;
        passwordError.textContent = "";
        passwordBtn.disabled = true;
        passwordInput.disabled = true;

        // Fade the password screen out first.
        passwordGate.classList.add("unlocked");

        setTimeout(() => {
            passwordGate.remove();

            // Show the welcome screen exactly once.
            intro.classList.remove("hide");
            intro.classList.add("welcome-visible");

            // After the welcome animation finishes, reveal screen 1.
            setTimeout(() => {
                intro.classList.remove("welcome-visible");
                intro.classList.add("hide");
                setTimeout(revealFirstScreen, 250);
            }, 3200);
        }, 650);
    } else {
        passwordError.textContent = "That isn't the right password. ♡";
        passwordInput.classList.remove("shake");
        requestAnimationFrame(() => passwordInput.classList.add("shake"));
        passwordInput.value = "";
    }
}

passwordBtn.addEventListener("click", unlockSite);
passwordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") unlockSite();
});

const screens = [...document.querySelectorAll(".screen")];
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const background = document.getElementById("background");

let current = 1;

function createStars(number, type) {
    for (let i = 0; i < number; i++) {
        const star = document.createElement("div");
        star.className = `star ${type}`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${2 + Math.random() * 4}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        background.appendChild(star);
    }
}
createStars(150, "small");
createStars(55, "medium");
createStars(18, "big");

function updateProgress(number) {
    current = number;
    progressText.textContent = `0${number} / 07`;
    progressFill.style.width = `${((number - 1) / 6) * 100}%`;
}

function showScreen(number) {
    const old = document.querySelector(".screen.active");
    const next = document.getElementById(`screen${number}`);
    if (!next || old === next) return;

    old?.classList.remove("active");
    old?.classList.add("leaving");

    setTimeout(() => {
        old?.classList.remove("leaving");
        next.classList.add("active");
        updateProgress(number);
        window.scrollTo(0, 0);

        if (number === 7) startCelebration();
    }, 350);
}

document.querySelectorAll("[data-next]").forEach(btn => {
    btn.addEventListener("click", () => showScreen(Number(btn.dataset.next)));
});

/* THREE LITTLE THINGS */
const thingButtons = document.querySelectorAll(".thing");
const thingMessage = document.getElementById("thingMessage");
const thingsContinue = document.getElementById("thingsContinue");
let openedThings = 0;

thingButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.classList.contains("opened")) return;
        button.classList.add("opened");
        openedThings++;

        thingMessage.textContent = button.dataset.message;
        thingMessage.classList.remove("show");
        requestAnimationFrame(() => thingMessage.classList.add("show"));

        burstAt(button);
        if (openedThings === 3) thingsContinue.classList.remove("hidden");
    });
});

/* QUESTION */
document.querySelectorAll(".choice").forEach(choice => {
    choice.addEventListener("click", () => {
        document.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
        choice.classList.add("selected");

        const answer = document.getElementById("answer");
        answer.textContent = choice.dataset.answer;
        answer.classList.add("show");
        document.getElementById("answerContinue").classList.remove("hidden");
        burstAt(choice);
    });
});

/* WISHES */
const wishes = [
    ["A First Wish", "I hope today brings you more smiles than yesterday."],
    ["A Second Wish", "I hope life always finds a way to be gentle with you, even on the harder days."],
    ["A Last Wish", "I hope this year brings you happiness, peace, good health, and beautiful moments."]
];

let wishIndex = 0;
const wishCount = document.getElementById("wishCount");
const wishTitle = document.getElementById("wishTitle");
const wishText = document.getElementById("wishText");
const wishNext = document.getElementById("wishNext");
const wishCard = document.getElementById("wishCard");

wishNext.addEventListener("click", () => {
    wishIndex++;
    if (wishIndex < wishes.length) {
        wishCard.classList.add("swap");
        setTimeout(() => {
            wishCount.textContent = `0${wishIndex + 1} / 03`;
            wishTitle.textContent = wishes[wishIndex][0];
            wishText.textContent = wishes[wishIndex][1];
            wishCard.classList.remove("swap");
        }, 250);
    }

    if (wishIndex === wishes.length - 1) {
        wishNext.textContent = "Continue →";
        wishNext.onclick = () => showScreen(6);
    }
});

/* LETTER */
const text = `Happy birthday to the person who stole my heart without me even realizing how it happened.

I don’t want to write you a long confession because I feel like I’ve already told you so many things... but there’s one thing I could never say enough: I’m truly happy to have you in my life.

I hope this new year of your life brings you everything your heart deserves, that you achieve everything you wish for, and that you always remain the best, even though you already are in my eyes.

And among all the things I could wish for you today, there’s one selfish wish I’m keeping for myself: I hope I get to stay by your side for many more of your birthdays to come.

Enjoy your day babe. Today, you’re the one we’re celebrating... although personally, I see it above all as the day life decided to put someone very special in my path.

Happy birthday honey. I love you soooo muchhh 💝

And I’m still waiting for the day when I’ll finally get to talk to you face to face 😚`;

const finalLetter = document.getElementById("finalLetter");
const finalBtn = document.getElementById("finalBtn");
let letterIndex = 0;
let letterStarted = false;

function typeLetter() {
    if (letterIndex < text.length) {
        finalLetter.textContent += text.charAt(letterIndex);
        letterIndex++;
        setTimeout(typeLetter, 26);
    } else {
        finalBtn.classList.remove("hidden");
        setTimeout(() => {
            finalBtn.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 120);
    }
}

function startLetter() {
    if (!letterStarted) {
        letterStarted = true;
        typeLetter();
    }
}

const originalShowScreen = showScreen;
showScreen = function(number) {
    originalShowScreen(number);
    if (number === 6) setTimeout(startLetter, 450);
};

finalBtn.addEventListener("click", () => showScreen(7));

/* SMALL PARTICLE BURST */
function burstAt(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 12; i++) {
        const p = document.createElement("span");
        p.className = "click-particle";
        p.style.left = `${rect.left + rect.width / 2}px`;
        p.style.top = `${rect.top + rect.height / 2}px`;
        p.style.setProperty("--x", `${(Math.random() - .5) * 100}px`);
        p.style.setProperty("--y", `${(Math.random() - .5) * 100}px`);
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 700);
    }
}

/* CELEBRATION */
const confettiContainer = document.getElementById("confetti-container");
const sparkles = document.getElementById("sparkles");
const balloons = document.getElementById("balloons");

const confettiColors = [
    "#ff4f81", "#ffcf33", "#5ee7df", "#7c5cff",
    "#ff7a45", "#6ee7b7", "#ff5c5c", "#ffffff"
];

function launchConfetti() {
    confettiContainer.innerHTML = "";
    for (let i = 0; i < 220; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti";
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        piece.style.width = `${5 + Math.random() * 7}px`;
        piece.style.height = `${8 + Math.random() * 13}px`;
        piece.style.animationDuration = `${3.5 + Math.random() * 4}s`;
        piece.style.animationDelay = `${Math.random() * 2.2}s`;
        piece.style.borderRadius = Math.random() > .5 ? "2px" : "50%";
        piece.style.setProperty("--rotation", `${360 + Math.random() * 720}deg`);
        confettiContainer.appendChild(piece);
    }
}

function createCelebrationSparkles() {
    sparkles.innerHTML = "";
    for (let i = 0; i < 55; i++) {
        const s = document.createElement("span");
        s.className = "sparkle";
        s.textContent = Math.random() > .5 ? "✦" : "✧";
        s.style.left = `${Math.random() * 100}%`;
        s.style.top = `${Math.random() * 100}%`;
        s.style.animationDelay = `${Math.random() * 3}s`;
        s.style.animationDuration = `${1.5 + Math.random() * 2.5}s`;
        sparkles.appendChild(s);
    }
}

function createBalloons() {
    balloons.innerHTML = "";
    const colors = ["#ff4f81", "#7c5cff", "#5ee7df", "#ffcf33", "#ff7a45"];
    for (let i = 0; i < 10; i++) {
        const b = document.createElement("span");
        b.className = "balloon";
        b.style.left = `${Math.random() * 100}%`;
        b.style.background = colors[i % colors.length];
        b.style.animationDelay = `${Math.random() * 3}s`;
        b.style.animationDuration = `${7 + Math.random() * 5}s`;
        balloons.appendChild(b);
    }
}

function startCelebration() {
    launchConfetti();
    createCelebrationSparkles();
    createBalloons();
    document.body.classList.add("celebrating");
}

/* RESTART */
document.getElementById("restart").addEventListener("click", () => location.reload());

/* INTRO */


updateProgress(1);


