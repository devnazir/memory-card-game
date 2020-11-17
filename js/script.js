const cardContainer = document.querySelectorAll(".card-container");
const score = document.querySelector(".score span span");
const start = document.querySelector(".start-game");
let audio = new Audio();

let lockBoard, hasFlippedCard = false;
let firstPick, secondPick;
let scoreText = 0;

start.addEventListener("click", removeStyle);

function removeStyle() {
    this.style.transform = "translateY(100vh)";
    card();
    audio.src = "../audio/acak-kartu.mp3";
    audio.play();
}


cardContainer.forEach(card => card.addEventListener("click", flipCard));
function flipCard() {
    if (lockBoard) return;
    if (this === firstPick) return;

    this.classList.add("flip");
    
    audio.src = "../audio/buka-kartu.mp3";
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstPick = this;
        
        audio.play();
        return;
    }

    secondPick = this;
    audio.play();

    check();
}

function check() {
    let isMatch = firstPick.dataset.card === secondPick.dataset.card;
    let scoreCheck = firstPick.dataset.card != secondPick.dataset.card && scoreText >= 1;

    isMatch ? disableEvent() : unflip();
    scoreCheck ? scoreText-- : scoreText;

    score.innerHTML = scoreText;
}

function disableEvent() {
    firstPick.removeEventListener("click", flipCard);
    secondPick.removeEventListener("click", flipCard);
    scoreText +=2;

    score.innerHTML = scoreText;

    reset();
    winOrLose();
}

function unflip() {
    lockBoard = true;

    setTimeout(() => {
        firstPick.classList.remove("flip");
        secondPick.classList.remove("flip");
        reset();
    }, 1000)

}

function reset() {
    [lockBoard, hasFlippedCard] = [false, false];
    [firstPick, secondPick] = [null, null];
}

function card() {
    cardContainer.forEach((card, index) => {
        let randomOrder = Math.floor(Math.random() * 12);
        setTimeout(() => {
            card.style.opacity = 1;
            card.style.order = randomOrder;
        }, index * 100)
    });
}

function winOrLose() {
    if(scoreText >= 10) {
        alert("You Win!!")
    }
}



