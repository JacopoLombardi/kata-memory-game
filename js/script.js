
import { cardArray } from './card.js';


// Seleziona gli elementi dal DOM
const gameBoard = document.querySelector('.game_board');
const overlayEndGame = document.querySelector('.overlay_end_game');
const playAgain = document.querySelector('.play_again');


// Crea un array con due copie di ogni carta
const cardsArrayDuplicated = createDuplicatedCardArray(cardArray);


// Variabili di stato del gioco
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
let errorCount = 0;


// Funzione per creare un array duplicato di carte
function createDuplicatedCardArray(cardArray) {
    const duplicatedArray = [];
    for (const key in cardArray) {
        const card = cardArray[key];
        duplicatedArray.push({ ...card, originalIdName: key });
        duplicatedArray.push({ ...card, originalIdName: key });
    }
    return duplicatedArray;
}


// Funzione per mescolare l'array usando l'algoritmo di Fisher-Yates
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const x = Math.floor(Math.random() * (i + 1));
        [array[i], array[x]] = [array[x], array[i]];
    }
    return array;
}


// Funzione per creare un elemento carta
function createCard(cardData) {
    const backElement = document.createElement('div');
    backElement.classList.add('_card', 'position-relative', 'm-3');
    backElement.innerHTML = '<img src="./image/back.png" alt="">';
    backElement.dataset.id = cardData.originalIdName;

    const frontElement = document.createElement('div');
    frontElement.classList.add('card_hidden', 'z_-1', 'm-3');
    frontElement.innerHTML = `<img src="${cardData.src}" alt="${cardData.name}">`;

    backElement.appendChild(frontElement);
    backElement.addEventListener('click', cardClick);

    return backElement;
}


// Funzione per avviare il gioco
function startGame() {
    resetGameBoard();
    const shuffledCards = shuffle([...cardsArrayDuplicated]);
    shuffledCards.forEach(cardData => gameBoard.append(createCard(cardData)));
}


// Funzione per gestire il clic sulla carta
function cardClick(event) {
    // Ottiene l'elemento che ha scatenato l'evento clic
    const backElement = event.currentTarget;
    
    // Ottiene l'elemento frontale della carta, che è il secondo div figlio
    const frontElement = backElement.querySelector('.card_hidden');

    // Se il tabellone è bloccato o se la stessa carta viene cliccata due volte, esci dalla funzione
    if (lockBoard || backElement === firstCard) return;

    // Mostra il fronte della carta (rimuove la classe che lo nasconde)
    frontElement.classList.remove('z_-1');

    // Se la prima carta non è stata ancora selezionata, memorizza questa carta come 'firstCard'
    if (!firstCard) {
        firstCard = backElement;
        return;
    }

    secondCard = backElement;
    lockBoard = true;

    checkForMatch();
}



// Funzione per controllare se le due carte selezionate sono uguali
function checkForMatch() {
    const isMatch = (firstCard.dataset.id === secondCard.dataset.id);
    isMatch ? disableCards() : unflipCards();
}


// Funzione per disabilitare le carte abbinate
function disableCards() {
    firstCard.removeEventListener('click', cardClick);
    secondCard.removeEventListener('click', cardClick);
    resetBoard();
    matchesFound++;

    if (matchesFound === cardsArrayDuplicated.length / 2) {
        console.log('Hai trovato tutte le coppie! Gioco finito!');
        overlayEndGame.classList.remove('d-none');
    }
}


// Funzione per girare di nuovo le carte non abbinate
function unflipCards() {
    errorCount++;
    document.getElementById("errors").innerHTML = errorCount;

    setTimeout(() => {
        firstCard.querySelector('.card_hidden').classList.add('z_-1');
        secondCard.querySelector('.card_hidden').classList.add('z_-1');
        resetBoard();
    }, 1000);
}


// Funzione per resettare lo stato delle variabili
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}


// Listener per il pulsante "Gioca ancora"
playAgain.addEventListener('click', function () {
    overlayEndGame.classList.add('d-none');
    startGame();
});


// Funzione per resettare il tabellone di gioco
function resetGameBoard() {
    gameBoard.innerHTML = '';
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchesFound = 0;
    errorCount = 0;
    document.getElementById("errors").innerHTML = errorCount;
}


// Avvia il gioco alla prima esecuzione
startGame();
