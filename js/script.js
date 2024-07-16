import { cardArray } from './card.js';


const gameBoard = document.querySelector('.game_board');


// Creiamo un array con due copie di ogni carta e includiamo l'ID NAME originale
const cardsArrayDuplicated = [];
for (const key in cardArray) {
    const card = cardArray[key];
    // Aggiungi due copie con l'ID NAME originale
    cardsArrayDuplicated.push({ ...card, originalIdName: key });
    cardsArrayDuplicated.push({ ...card, originalIdName: key });
}






// Funzione per mescolare l'array duplicato
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const x = Math.floor(Math.random() * (i + 1));
        // Scambia gli elementi dell'array in posizioni casuali
        [array[i], array[x]] = [array[x], array[i]];
    }
    return array;
}


// Mescola l'array duplicato
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

    // Aggiungo l'ID NAME originale della carta come attributo 'data-id'
    // aggiunge un attributo 'data-id' al div
    backElement.dataset.id = cardData.originalIdName;
    console.log(backElement.dataset)

    // evento di clic per gestire l'interazione con la carta
    backElement.addEventListener('click', () => {
        console.log(`Hai cliccato sulla carta con ID ${cardData.originalIdName}`);

        //logica per gestire il clic sulla carta
        frontElement.classList.remove('z_-1');


    });

    // Creo l'elemento frontale della carta (div) e gli assegno le classi e l'immagine frontale
    const frontElement = document.createElement('div');
    frontElement.classList.add('card_hidden', 'z_-1', 'm-3');
    frontElement.innerHTML = `<img src="${cardData.src}" alt="${cardData.name}">`;

    // Aggiungo l'elemento frontale come figlio dell'elemento retro della carta
    backElement.appendChild(frontElement);

    return backElement;
}
