/* eslint-disable no-trailing-spaces */
/* eslint-disable no-empty */
/* eslint-disable prefer-const */

let combos = ['ROYAL FLUSH', 'STRAIGHT FLUSH', 'FOUR OF A KIND', 'FULL HOUSE', 'FLUSH', 'STRAIGHT', 'THREE OF A KIND', 'TWO PAIR', 'JACK OR HIGHER BONUS'];
const minPayout = [500, 150, 60, 10, 7, 5, 3, 2, 1];
let updatedPayoutArray = [];

const revealCardDelay = 300;

let round = 0;
let creditBalance = 100;
const maxBet = 20;
let currentBet = 0;
let storedCurrentBet = 0;
let gameState = 'bet';
const hand = [];
let deck;

// SELECT CARDS TO DISCARD BEFORE DISCARDING
const selectedDiscardCardArray = [];

// delay for timer so that action occurs only after selected discarded cards have been flipped over
let variableCardDelay = revealCardDelay * selectedDiscardCardArray.length;

// INCREASE BET +1 on click
const increaseBet = () => {
  if (gameState === 'restart') {
    gameState = 'bet';
    initGame();
  }

  if (currentBet !== maxBet) {
    currentBet += 1;
    creditBalance -= 1;

    // grab and update credit balance
    const creditBalanceDiv = document.getElementById('credit-balance-div');
    creditBalanceDiv.innerHTML = `<span class='bold-text'>${creditBalance}</span> CREDITS REMAINING`;

    // grab and update current bet
    const xCredits = document.getElementById('x-credits');
    xCredits.innerHTML = `<span class="bold-text">${currentBet}</span> CREDITS`;
  
    if (currentBet !== 0) {
    // enable deal button
      const dealButton = document.getElementById('deal-button');
      dealButton.disabled = false;
    }
  }
  updatePayout();
  console.log(currentBet);
};

// DECREASE BET -1 on click
const decreaseBet = () => {
  // if (currentBet === 0) {
  //   // disable deal button
  //   const dealButton = document.getElementById('deal-button');
  //   dealButton.disabled = true;
  // }
  if (currentBet !== 0) {
    currentBet -= 1;
    creditBalance += 1;

    // grab and update credit balance
    const creditBalanceDiv = document.getElementById('credit-balance-div');
    creditBalanceDiv.innerHTML = `<span class="bold-text">${creditBalance}</span> CREDITS REMAINING`;

    // grab and update current bet
    const xCredits = document.getElementById('x-credits');
    xCredits.innerHTML = `<span class="bold-text">${currentBet}</span> CREDITS`;
  
    if (currentBet === 0) {
    // disable deal button
      const dealButton = document.getElementById('deal-button');
      dealButton.disabled = true;
    }
  }
  updatePayout();
  console.log(currentBet);
};

// CLICK MAX BET
const maxBetClick = () => {
  if (gameState === 'restart') {
    gameState = 'bet';
    initGame();
  }
  if (currentBet !== maxBet) {
    // if credits bet is 1, credits remaining 99.
    // max bet, then credits bet +4 , credits remaining -4
    let difference = maxBet - currentBet;
    currentBet += difference;
    creditBalance -= difference;

    if (currentBet !== 0) {
    // enable deal button
      const dealButton = document.getElementById('deal-button');
      dealButton.disabled = false;
    }
  }
  updatePayout();
  // grab and update credit balance
  const creditBalanceDiv = document.getElementById('credit-balance-div');
  creditBalanceDiv.innerHTML = `<span class="bold-text">${creditBalance}</span> CREDITS REMAINING`;
  // grab and update current bet
  const xCredits = document.getElementById('x-credits');
  xCredits.innerHTML = `<span class="bold-text">${currentBet}</span> CREDITS`;
};

// what happens when you hit the deal button

const deal = () => {
  // update display message
  const displayMessage = document.getElementById('display-message');

  // CHOOSE DISCARD STAGE
  if (gameState === 'discard') {
    if (selectedDiscardCardArray.length === 0) { // no cards to discard, then move to next mode
      setTimeout(() => {
        if (calcHandScore(hand).highestcombo === 'none') {
          displayMessage.innerText = 'Well we already knew you would lose.\nBet again?';
        }
        if (calcHandScore(hand).highestcombo !== 'none') {
          displayMessage.innerText = `EZ ${calcHandScore(hand).highestcombo}.\nBet again?`;
        }
      }, 300 * selectedDiscardCardArray.length); 
    }
    // discard cards, replace and calculate score;
    else {
      discard(selectedDiscardCardArray);
      replaceDiscards(); // function to loop just the new cards in
      // calc hand score again to determine new result
      setTimeout(() => {
        if (calcHandScore(hand).highestcombo === 'none') {
          displayMessage.innerText = 'Whoops, no prize.\nBet again?';
        } 
        if (calcHandScore(hand).highestcombo !== 'none') {
          displayMessage.innerText = `A ${calcHandScore(hand).highestcombo}! Such skill! Claim your prize!\nBet again?`;
        }
      }, 300 * selectedDiscardCardArray.length); // text to appear after all discards are replaced
    }

    // change game state and activate buttons
    setTimeout(() => {
      // gameState = 'bet';
      const betPlus1Button = document.getElementById('bet-plus-1');
      const betMinus1Button = document.getElementById('bet-minus-1');
      const maxBetButton = document.getElementById('max-bet-button');
      betPlus1Button.disabled = false;
      betMinus1Button.disabled = false;
      maxBetButton.disabled = false;
    }, 300 * selectedDiscardCardArray.length); 
    // buttons to be enabled only after all discards are replaced

    // Restart the game for the next round
    // ########## restartGame(); ##########

    // set timeout so that it credits only after the cards have been displayed
    setTimeout(() => {
      creditReward();
      restartGame();
      gameState = 'restart';
    }, revealCardDelay * selectedDiscardCardArray.length);
  }

  // BET STAGE
  if (gameState === 'bet') {
    if (currentBet !== 0) { // only reveal cards if there is at least 1 credit bet.
      // disable bet buttons
      document.getElementById('bet-plus-1').disabled = true;
      document.getElementById('bet-minus-1').disabled = true;
      document.getElementById('max-bet-button').disabled = true;

      // calchandscore to determine if any hand present.
      if (calcHandScore(hand).highestcombo !== 'none') {
        setTimeout(() => { displayMessage.innerText = `Wow, a ${calcHandScore(hand).highestcombo} already! Still don't like what you see? Click on the cards you want to chuck in the bin.`; }, 2000); // delay message appear to after cards are out
      }
      else {
        setTimeout(() => { displayMessage.innerText = "Don't like what you see? Click on the cards you want to chuck in the bin."; }, 2000); // delay message appear to after cards are out
      }

      revealCards(); // flips back-faced cards to show card
      gameState = 'discard';
    }
  }
};
