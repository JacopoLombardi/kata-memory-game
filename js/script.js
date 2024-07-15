import { card } from './card.js';

console.log( card ); 



const gameBoard = document.querySelector('.game_board');



for (let i = 0; i < 12; i++) {
   const card = createCard();
   gameBoard.append(card);
}




function createCard() {

   // creo element (div) e gli metto dentro la classe m-3 e in più scrivo dentro di lui il tag (img) 
   const element = document.createElement('div');
   element.classList.add('_card', 'm-3');
   element.innerHTML = '<img src="./image/back.png" alt="">';





   console.log(element)

   return element;
}
