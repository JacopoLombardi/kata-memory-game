import { cardArray } from './card.js';


const gameBoard = document.querySelector('.game_board');


// Creiamo un array con due copie di ogni carta e includiamo l'ID originale
const cardsArrayDuplicated = [];
for (const key in cardArray) {
    if (cardArray.hasOwnProperty(key)) {
        const card = cardArray[key];
        // Aggiungi due copie della carta con l'ID originale
        cardsArrayDuplicated.push({ ...card, originalId: key });
        cardsArrayDuplicated.push({ ...card, originalId: key });
    }
}


// Funzione per mescolare l'array di carte duplicate utilizzando l'algoritmo di Fisher-Yates
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const x = Math.floor(Math.random() * (i + 1));
        // Scambia gli elementi dell'array in posizioni casuali
        [array[i], array[x]] = [array[x], array[i]];
    }
    return array;
}


// Mescola l'array di carte duplicate
const shuffledCards = shuffle(cardsArrayDuplicated);


// Crea le carte e aggiungile al tabellone di gioco
shuffledCards.forEach(cardData => {
    const card = createCard(cardData);
    gameBoard.append(card);
});


// Funzione per creare una singola carta
function createCard(cardData) {
    // Creo l'elemento retro della carta (div) e gli assegno le classi e l'immagine di sfondo
    const backElement = document.createElement('div');
    backElement.classList.add('_card', 'position-relative', 'm-3');
    backElement.innerHTML = '<img src="./image/back.png" alt="">';

    // Aggiungo l'ID originale della carta come attributo data-id
    backElement.dataset.id = cardData.originalId;


    // Aggiungo l'evento di clic per gestire l'interazione con la carta
    backElement.addEventListener('click', () => {
        console.log(`Hai cliccato sulla carta con ID ${cardData.originalId}`);
        // Qui puoi aggiungere la logica per gestire il clic sulla carta


    });

    // Creo l'elemento frontale della carta (div) e gli assegno le classi e l'immagine frontale
    const frontElement = document.createElement('div');
    frontElement.classList.add('card_hidden', 'z_-1', 'm-3');
    frontElement.innerHTML = `<img src="${cardData.src}" alt="${cardData.name}">`;

    // Aggiungo l'elemento frontale come figlio dell'elemento retro della carta
    backElement.appendChild(frontElement);

    return backElement;
}
