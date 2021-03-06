// DOM Elements
const dealerHand = document.querySelector('.dealer-hand');
const dealerOption = document.querySelector('.dealer-option')
const dealerScoreSpan = document.querySelector('.dealer-score');
const dealerWins = document.querySelector('.dealer-wins');
const playerWins = document.querySelector('.player-wins');

const playerHand = document.querySelector('.player-hand');
const playerOption = document.querySelector('.player-option');
const playerScoreSpan = document.querySelector('.player-score');

const cardBackStyle = document.querySelector('.card-back');
const cardIcon = document.querySelectorAll('.icon');
const shuffleBtn = document.querySelector('.btn-shuffle');
const hitBtn = document.querySelector('.btn-hit');
const btnStand = document.querySelector('.btn-stand');

const cardValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];

const cardBack = ['svg/CardBack.svg'];
const suitsSvg = ['svg/Suits_Vectors_Diamond.svg',
                    'svg/Suits_Vectors_Club.svg',
                    'svg/Suits_Vectors_Heart.svg',
                    'svg/Suits_Vectors_Spade.svg'];

const suits = ['Diamond', 'Club', 'Heart', 'Spade'];
const deck = [];

let playerTotalValue = [];
let playerCardValue = 0;

let dealerTotalValue = [];
let dealerCardValue = 0;

let playerWinScore = 0;
let dealerWinScore = 0;

let playerMove = 0; // 0 = default, 1 = Hit, 2 = Stand

let ds = JSON.parse(localStorage.getItem('Dealer'));
let ps = JSON.parse(localStorage.getItem('Player'));

// Shuffle Button
shuffleBtn.addEventListener('click', function () {

    init();

});

// Hit Button
hitBtn.addEventListener('click', function () {
    
    // console.log(playerTotalValue);

    if (playerMove === 0) {
        shuffle(deck);
        dealCard(1, playerHand);
    };
    
});

// Stand Button
btnStand.addEventListener('click', function () {
    playerMove = 2;
    btnStand.classList.add('btn-active');

    if (dealerCardValue < 20 && playerMove === 2) {
        shuffle(deck);
        dealCard(1, dealerHand);
    };
});

// Initialize the game
function init () {

    location.reload();
    playerWinScore = ps;
    dealerWinScore = ds;
    playerMove = 0;
    playerTotalValue = [];
    dealerTotalValue = [];
    playerOption.innerHTML = '';
    playerHand.innerHTML = '';
    dealerHand.innerHTML = '';
    startGame();

};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    // Randomizes the array values that are input into the shuffle function
    return array;
};

// Add cards to the deck
const generateDeck = function () {

    for (let i = 0; deck.length < 57; i++) {

        suitsSvg.forEach(function (suit) {

            cardValue.forEach(function (value) {
        
                const card = {value: value, suit: suit};
                deck.push(card);
            });
        });
    };
};



// Start the game
function startGame () {
    playerOption.classList.remove('show');
    dealerOption.classList.remove('show');
    generateDeck();
    shuffle(deck);
    shuffle(deck);
    shuffle(deck);
    shuffle(deck);
    dealCard(2, dealerHand);
    shuffle(deck);
    dealCard(2, playerHand);

};

// Deal 2 cards
function dealCard (lastCard, user) {

    
    // If there are 2 cards left then create a new deck
    if (deck.length <= 2) {
        console.log('Generating a new deck');
        generateDeck();
    };

    // Player Cards
    
        for (let i = 0; i < lastCard; i++) {

            if (user === playerHand) {

            const divElement = document.createElement('div');
            const html = `<div class="card"><img class="svg-icon" src="${deck[i].suit}" width="50" height="50"><p>${deck[i].value}</p></div>`;
            const cardBackHtml = `<div class="${cardBackStyle}">
                                    <img class="svg-icon-back" src="${deck[i].suit = cardBack}" width="120" height="180"><p>
                                    </p>
                                    </div>`;
            
            

            coverCards(deck[i], divElement, cardBackHtml, html);
            
            if (deck[i].value === 'Jack' || deck[i].value === 'Queen' || deck[i].value === 'King') {
                playerCardValue += 10;
                playerTotalValue.push(playerCardValue);
                deck.pop();
            }else if (deck[i].value === 'Ace'){
                playerCardValue += 11;

                if (playerCardValue > 21) {
                    playerCardValue -= 10;
                    playerTotalValue.push(playerCardValue);
                    playerScoreSpan.textContent = playerCardValue + "Ace (1)";
                    deck.pop();
                }else {
                    playerScoreSpan.textContent = playerCardValue + "Ace (11)";
                    playerTotalValue.push(playerCardValue);
                    deck.pop();
                };
                
            }else {
                playerTotalValue.push(playerCardValue);
                playerCardValue += deck[i].value;
                deck.pop();
                // console.log("Player Deck: ", deck);
            };

            // Dealer Cards
        }else if (user === dealerHand) {

            const divElement = document.createElement('div');
            const html = `<div class="card"><img class="svg-icon" src="${deck[i].suit}" width="50" height="50"><p>${deck[i].value}</p></div>`;
            const cardBackHtml = `<div class="${cardBackStyle}">
                                    <img class="svg-icon-back" src="${deck[i].suit = cardBack}" width="120" height="180"><p>
                                    </p>
                                    </div>`;
            
            

            coverCards(deck[i], divElement, cardBackHtml, html);
    
            if (deck[i].value === 'Jack' || deck[i].value === 'Queen' || deck[i].value === 'King') {
                dealerCardValue += 10;
                dealerTotalValue.push(dealerCardValue);
                deck.pop();
            }else if (deck[i].value === 'Ace'){
                dealerCardValue += 11;

                if (dealerCardValue > 21) {
                    dealerCardValue -= 10;
                    dealerTotalValue.push(dealerCardValue);
                    dealerScoreSpan.textContent = dealerCardValue + "Ace (1)";
                    deck.pop();
                }else {
                    dealerTotalValue.push(dealerCardValue);
                    dealerScoreSpan.textContent = dealerCardValue + "Ace (11)";
                    deck.pop();
                };

            }else {
                dealerTotalValue.push(deck[i].value);
                dealerCardValue += deck[i].value;
                deck.pop();
                // console.log("Dealer Deck: ", deck);
            };        
        };
        
        // Covers Dealer Cards
        function coverCards (cardIndex, card, cardBackHtml, html) {
            this.cardIndex = cardIndex;
            this.card = card;
            this.cardBackHtml = cardBackHtml;
            this.html = html;

            //console.log(card);
            if (dealerTotalValue.length < 2) {
                card.innerHTML = cardBackHtml;
                card.classList.add('rotate-l');
                user.appendChild(card);
                //console.log(`Index of cards is: ${cardIndex.suit}`);    
            }else {
                card.innerHTML = html;
                card.classList.add('rotate-l');
                user.appendChild(card);
            };  
        };
    };
    playerScore();
    dealerScore();
};

function revealCards () {
    if (playerMove === 2) {
        dealerTotalValue[0];
    };
};

// Player score function for total value of hand
function playerScore () {

    if (playerCardValue < 21) {
        playerScoreSpan.textContent = playerCardValue;
        playerOption.classList.add('show');
        playerOption.textContent = 'Hit?';
    
    }else if (playerCardValue >= 22) {
        playerScoreSpan.textContent = playerCardValue;
        playerOption.classList.add('show');
        playerOption.classList.add('bust');
        playerOption.textContent = 'Bust!';
        dealerWins.textContent = `Wins: ${dealerWinScore++}`;

        playerMove = 2;

    }else if (playerCardValue === 21) {
        playerScoreSpan.textContent = playerCardValue;
        playerOption.classList.add('show');
        playerOption.classList.add('blackjack');
        playerOption.textContent = 'BLACK JACK';
        playerWins.textContent = `Wins: ${playerWinScore++}`;

        playerMove = 2;
    };

    compareScore();
    return playerCardValue;
};
// Player score function for total value of hand
function dealerScore () {

    if (dealerCardValue < 21) {
        dealerScoreSpan.textContent = dealerCardValue;
        dealerOption.classList.add('show');
        dealerOption.textContent = '...';
    
    }else if (dealerCardValue >= 22) {
        dealerScoreSpan.textContent = dealerCardValue;
        dealerOption.classList.add('show');
        dealerOption.classList.add('bust');
        dealerOption.textContent = 'Bust!';
        playerWins.textContent = `Wins: ${playerWinScore++}`;

    }else if (dealerCardValue === 21) {
        dealerScoreSpan.textContent = dealerCardValue;
        dealerOption.classList.add('show');
        dealerOption.classList.add('blackjack');
        dealerOption.textContent = 'BLACK JACK';
        dealerWins.textContent = `Wins: ${dealerWinScore++}`;
    };

    compareScore();
    return dealerCardValue;
};

function compareScore () {

    
    console.log('Dealer Score is: ', ds);
    console.log('Player Score is: ', ps);
    if (dealerCardValue > playerCardValue && !dealerCardValue > 21 || dealerCardValue === 21) {
        dealerWins.textContent = `Wins: ${localStorage.setItem('Dealer', JSON.stringify(dealerWinScore++))}`;
        

    }else if (playerCardValue > dealerCardValue && !playerCardValue > 21 || playerCardValue === 21){
        playerWins.textContent = `Wins: ${playerWinScore++}`;
        localStorage.setItem('Player', playerWinScore);

    }else {

    };
};


startGame();
