/* eslint-disable prefer-const */

let creditBalance = 100;
const maxBet = 5;
let currentBet = 0;
let gameState = 'bet';

// INCREASE BET +1 on click
const increaseBet = () => {
  if (currentBet !== 5) {
    currentBet += 1;
    creditBalance -= 1;

    // grab and update credit balance
    const creditBalanceDiv = document.getElementById('credit-balance-div');
    creditBalanceDiv.innerHTML = `<span class='bold-text'>${creditBalance}</span> CREDITS REMAINING`;

    // grab and update current bet
    const xCredits = document.getElementById('x-credits');
    xCredits.innerHTML = `<span class="bold-text">${currentBet}</span> CREDITS`;
  }
  console.log(currentBet);
};

// DECREASE BET -1 on click
const decreaseBet = () => {
  if (currentBet !== 0) {
    currentBet -= 1;
    creditBalance += 1;

    // grab and update credit balance
    const creditBalanceDiv = document.getElementById('credit-balance-div');
    creditBalanceDiv.innerHTML = `<span class="bold-text">${creditBalance}</span> CREDITS REMAINING`;

    // grab and update current bet
    const xCredits = document.getElementById('x-credits');
    xCredits.innerHTML = `<span class="bold-text">${currentBet}</span> CREDITS`;
  }
  console.log(currentBet);
};

// const deal = () => {
//   if (gameState === 'bet') {
//     if (currentBet !== 0) { // reveal cards

//     }
//   }
// };
