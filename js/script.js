import { cardArray } from './card.js';

const gameBoard = document.querySelector('.game_board');

// Creiamo un array con due copie di ogni carta e includiamo l'ID NAME originale
const cardsArrayDuplicated = [];
for (const key in cardArray) {
    const card = cardArray[key];
    // Aggiungi due copie della carta con l'ID NAME originale
    cardsArrayDuplicated.push({ ...card, originalIdName: key });
    cardsArrayDuplicated.push({ ...card, originalIdName: key });
}

// Mescola l'array di carte duplicate utilizzando l'algoritmo di Fisher-Yates
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const x = Math.floor(Math.random() * (i + 1));
        [array[i], array[x]] = [array[x], array[i]];
    }
    return array;
}

// Mescola l'array di carte duplicate
const shuffledCards = shuffle(cardsArrayDuplicated);






// Stato del gioco
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0; // Conta le coppie trovate
let errorCount = 0;


// Crea le carte e aggiungile al tabellone di gioco
shuffledCards.forEach(cardData => gameBoard.append(createCard(cardData)));

// Funzione per creare una singola carta
function createCard(cardData) {
    // Creo l'elemento retro della carta (div) e gli assegno le classi e l'immagine di sfondo
    const backElement = document.createElement('div');
    backElement.classList.add('_card', 'position-relative', 'm-3');
    backElement.innerHTML = '<img src="./image/back.png" alt="">';

    // Aggiungo l'ID NAME originale della carta come attributo 'data-id'
    backElement.dataset.id = cardData.originalIdName;

    // Creo l'elemento frontale della carta (div) e gli assegno le classi e l'immagine frontale
    const frontElement = document.createElement('div');
    frontElement.classList.add('card_hidden', 'z_-1', 'm-3');
    frontElement.innerHTML = `<img src="${cardData.src}" alt="${cardData.name}">`;

    // Aggiungo l'elemento frontale come figlio dell'elemento retro della carta
    backElement.appendChild(frontElement);

    // Evento di clic per gestire l'interazione con la carta
    backElement.addEventListener('click', cardClick);

    return backElement;
}






// Funzione per gestire il clic sulla carta
function cardClick(event) {
    const backElement = event.currentTarget;
    const frontElement = backElement.querySelector('.card_hidden');

    // Se il tabellone è bloccato, ignora i clic
    if (lockBoard) return;

    // Se la stessa carta viene cliccata due volte, ignora il secondo clic
    if (backElement === firstCard) return;

    // Mostra la carta
    frontElement.classList.remove('z_-1');

    // Se la prima carta non è stata cliccata, memorizzala come 'firstCard'
    if (!firstCard) {
        firstCard = backElement;
        return;
    }

    // Memorizza la seconda carta e blocca il tabellone
    secondCard = backElement;
    lockBoard = true;

    // Controlla se le due carte selezionate sono uguali
    checkForMatch();
}






// Funzione per controllare se le due carte selezionate sono uguali
function checkForMatch() {
    // Verifica se le due carte hanno lo stesso ID NAME
    const isMatch = (firstCard.dataset.id === secondCard.dataset.id);

    // Se le carte sono uguali, disabilitale, altrimenti girale di nuovo
    isMatch ? disableCards() : unflipCards();
}





// Funzione per disabilitare le carte abbinate
function disableCards() {
    // Rimuovi l'evento di clic dalle carte abbinate
    firstCard.removeEventListener('click', cardClick);
    secondCard.removeEventListener('click', cardClick);

    // Resetta lo stato del tabellone e incrementa il contatore delle coppie trovate
    resetBoard();
    matchesFound++;

    // Controlla se tutte le coppie sono state trovate
    if (matchesFound === cardsArrayDuplicated.length / 2) {
        console.log('Hai trovato tutte le coppie! Gioco finito!');


    }
}





// Funzione per girare di nuovo le carte non abbinate
function unflipCards() {

    // incrementa il counter errori e lo stampa nell'HTML
    errorCount ++;
    document.getElementById("errors").innerHTML = errorCount;

    // aspetta 1s prima di rigirare le carte
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
