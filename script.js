let cardsArray = [
    {
        name: "amongus",
        url: "images/amongus.png"
    },
    {
        name: "SpongeBob SquarePants",
        url: "images/jerry.png"
    },
    {
        name: "mickey",
        url: "images/mickey.png"
    },
    {
        name: "Tom",
        url: "images/tom.png"
    },
    {
        name: "spiderman",
        url: "images/spiderman.jpeg"
    },
    {
        name: "penguin",
        url: "images/penguin.jpeg"
    }
];

// Duplicate the cards
const parentDiv = document.querySelector('#card-section');
const gamecard = cardsArray.concat(cardsArray);

// Shuffle the images
let shuffledchild = Array.from(gamecard).sort(() => 0.5 - Math.random());

let clickcount = 0;
let firstcard = null;
let secondcard = null;

const card_matches = () => {
    let card_selected = document.querySelectorAll('.card_selected');

    card_selected.forEach((curelem) => {
        curelem.classList.add('card_match');
    });
}

// Play continues until ends
const resetgame = () => {
    firstcard = null;
    secondcard = null;
    clickcount = 0;

    let card_selected = document.querySelectorAll('.card_selected');

    card_selected.forEach((curelem) => {
        curelem.classList.remove('card_selected');
    });
}

// Event listener to select the clicked card
parentDiv.addEventListener('click', (event) => {
    let curcard = event.target.closest('.card'); // Ensure clicked element is within a .card
    if (!curcard || clickcount >= 2) return; // Exit if already clicked twice or not a card

    clickcount++;
    if (clickcount === 1) {
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
