let cardsArray = [
    { name: "amongus", url: "images/amongus.png" },
    { name: "SpongeBob SquarePants", url: "images/jerry.png" },
    { name: "mickey", url: "images/mickey.png" },
    { name: "Tom", url: "images/tom.png" },
    { name: "spiderman", url: "images/spiderman.jpeg" },
    { name: "penguin", url: "images/penguin.jpeg" }
];

// Duplicate the cards
const parentDiv = document.querySelector('#card-section');
const gamecard = cardsArray.concat(cardsArray);

// Shuffle the images
let shuffledchild = Array.from(gamecard).sort(() => 0.5 - Math.random());

let clickcount = 0;
let firstcard = null;
let secondcard = null;
let matchedPairs = 0;
let time = 0;
let moves = 0;
let timer;

// Modal elements
const modal = document.getElementById('game-over-modal');
const modalMessage = document.getElementById('game-over-message');
const playAgainBtn = document.getElementById('play-again-btn');
const closeBtn = document.querySelector('.close-btn');

const card_matches = () => {
    let card_selected = document.querySelectorAll('.card_selected');

    card_selected.forEach((curelem) => {
        curelem.classList.add('card_match');
    });
    matchedPairs++;
    if (matchedPairs === cardsArray.length) {
        stopTimer();
        showModal(`You won! Time: ${time}s, Moves: ${moves}`);
    }
}

const resetgame = () => {
    firstcard = null;
    secondcard = null;
    clickcount = 0;

    let card_selected = document.querySelectorAll('.card_selected');

    card_selected.forEach((curelem) => {
        curelem.classList.remove('card_selected');
    });
}

const startTimer = () => {
    timer = setInterval(() => {
        time++;
        document.getElementById('timer').innerText = `Time: ${time}s`;
    }, 1000);
};

const stopTimer = () => {
    clearInterval(timer);
};

const updateMoves = () => {
    moves++;
    document.getElementById('moves').innerText = `Moves: ${moves}`;
};

const showModal = (message) => {
    modalMessage.innerText = message;
    modal.style.display = 'block';
};

const hideModal = () => {
    modal.style.display = 'none';
    location.reload(); // Reload the page to reset the game
};

playAgainBtn.addEventListener('click', hideModal);
closeBtn.addEventListener('click', hideModal);
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        hideModal();
    }
});

parentDiv.addEventListener('click', (event) => {
    let curcard = event.target.closest('.card'); // Ensure clicked element is within a .card
    if (!curcard || curcard.classList.contains('card_selected') || curcard.classList.contains('card_match') || clickcount >= 2) return; // Exit if already clicked twice or not a card

    clickcount++;
    updateMoves();
    if (clickcount === 1) {
        if (time === 0) startTimer();
        firstcard = curcard.dataset.name;
        curcard.classList.add('card_selected');
    } else {
        secondcard = curcard.dataset.name;
        curcard.classList.add('card_selected');

        if (firstcard === secondcard) {
            setTimeout(() => {
                card_matches();
                resetgame();
            }, 1000);
        } else {
            setTimeout(() => {
                resetgame();
            }, 1000);
        }
    }
});

// Display cards
shuffledchild.forEach(cardData => {
    const childDiv = document.createElement('div');
    childDiv.classList.add('card');
    childDiv.dataset.name = cardData.name;

    const frontDiv = document.createElement('div');
    frontDiv.classList.add('front-card');

    const backDiv = document.createElement('div');
    backDiv.classList.add('back-card');
    backDiv.style.backgroundImage = `url(${cardData.url})`;

    childDiv.appendChild(frontDiv);
    childDiv.appendChild(backDiv);
    parentDiv.appendChild(childDiv);
});
