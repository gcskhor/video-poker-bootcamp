/* eslint-disable max-len */
// Click Mute
const clickMute = () => {
  const muteButton = document.getElementById('mute-button');
  if (!audioMute) {
    // audioCardFlip.muted = true;
    // audioBloop.muted = true;
    // bloops and flips not included because i couldn't figure out how to make them overlap.
    audioWin.muted = true;
    audioBg.muted = true;

    audioMute = true;
    muteButton.classList.add('muted');
  }
  else {
    // audioCardFlip.muted = false;
    // audioBloop.muted = false;
    // bloops and flips not included because i couldn't figure out how to make them overlap.

    audioWin.muted = false;
    audioBg.muted = false;

    audioMute = false;
    muteButton.classList.remove('muted');
  }
};

// INCREASE BET +1 on click
const increaseBet = () => {
  // lose message if you run out of credits
  if (currentBet + creditBalance === 0) {
    const displayMessage = document.getElementById('display-message');
    displayMessage.innerText = 'No more credits! Go back to the bank :(';

    // add a little button to restart
    const restartButton = document.createElement('button');
    restartButton.innerText = 'RESTART?';
    displayMessage.appendChild(restartButton);
    restartButton.addEventListener('click', () => { location.reload(); });
  }

  if (gameState === 'restart') {
    gameState = 'bet';
    round += 1;

    const roundCounter = document.getElementById('round-counter');
    roundCounter.innerHTML = roundCounter.innerHTML = `ROUND <span class="bold-text">${round}</span>`;
    initGame();
  }

  if (currentBet !== maxBet && creditBalance !== 0) {
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
  // add sound effect
  playBloopSound();
  updatePayout();
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

    if (currentBet === 0) {
    // disable deal button
      const dealButton = document.getElementById('deal-button');
      dealButton.disabled = true;
    }
  }
  // add sound effect
  playBloopSound();
  updatePayout();
};

// CLICK MAX BET
const maxBetClick = () => {
  if (currentBet + creditBalance === 0) {
    const displayMessage = document.getElementById('display-message');
    displayMessage.innerText = 'No more credits! Go back to the bank :(';

    // add a little button to restart
    const restartButton = document.createElement('button');
    restartButton.innerText = 'RESTART?';
    displayMessage.appendChild(restartButton);
    restartButton.addEventListener('click', () => { location.reload(); });
  }
  if (gameState === 'restart') {
    gameState = 'bet';
    round += 1;

    const roundCounter = document.getElementById('round-counter');
    roundCounter.innerHTML = roundCounter.innerHTML = `ROUND <span class="bold-text">${round}</span>`;
    initGame();
  }
  if (currentBet !== maxBet) {
    // if credits bet is 1, credits remaining 99.
    // max bet, then credits bet +4 , credits remaining -4
    const difference = maxBet - currentBet;
    currentBet += difference;
    creditBalance -= difference;

    if (currentBet !== 0) {
    // enable deal button
      const dealButton = document.getElementById('deal-button');
      dealButton.disabled = false;
    }
  }
  if (creditBalance + currentBet <= maxBet) {
    const newMaxBet = creditBalance + currentBet;
    const difference = newMaxBet - currentBet;
    currentBet += difference;
    creditBalance -= difference;
  }
  // add sound effect
  playBloopSound();
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
  const dealButton = document.getElementById('deal-button');

  // CHOOSE DISCARD STAGE
  if (gameState === 'discard') {
    if (selectedDiscardCardArray.length === 0) { // no cards to discard, then move to next mode
      setTimeout(() => {
        if (calcHandScore(hand).highestcombo === 'none') {
          displayMessage.innerText = 'Well we already knew you would lose.\nBet again?';
        }
        if (calcHandScore(hand).highestcombo !== 'none') {
          updateRewardAmount();
          displayMessage.innerText = `EZ ${calcHandScore(hand).highestcombo}. You win ${payoutAmount} credits.\nBet again?`;
          playAnnoyingWinSound();
        }
      }, revealCardDelay * selectedDiscardCardArray.length);
    }
    // discard cards, replace and calculate score;
    else {
      discard(selectedDiscardCardArray);
      replaceDiscards(); // function to loop just the new cards in
      // calc hand score again to determine new result
      dealButton.disabled = true; // disable deal until all cards revealed
      setTimeout(() => {
        if (calcHandScore(hand).highestcombo === 'none') {
          displayMessage.innerText = 'Whoops, no prize.\nBet again?';
        }
        if (calcHandScore(hand).highestcombo !== 'none') {
          updateRewardAmount();
          displayMessage.innerText = `A ${calcHandScore(hand).highestcombo}! Such skill! Claim your prize of ${payoutAmount} credits!\nBet again?`;
          playAnnoyingWinSound();
        }
        dealButton.disabled = false;
      }, revealCardDelay * selectedDiscardCardArray.length); // text to appear after all discards are replaced
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
    }, revealCardDelay * selectedDiscardCardArray.length);
    // buttons to be enabled only after all discards are replaced

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
      // reset selectedDiscardCardArray in case of edge case where user clicks face up card before adding new bet
      selectedDiscardCardArray.length = 0;

      // disable bet buttons
      document.getElementById('bet-plus-1').disabled = true;
      document.getElementById('bet-minus-1').disabled = true;
      document.getElementById('max-bet-button').disabled = true;

      // disable bet button during card reveal
      dealButton.disabled = true;
      console.log(dealButton.disabled);

      // calchandscore to determine if any hand present.
      if (calcHandScore(hand).highestcombo !== 'none') {
        setTimeout(() => { displayMessage.innerText = `Wow, a ${calcHandScore(hand).highestcombo} already! Still don't like what you see? Click on the cards you want to chuck in the bin.`;
          dealButton.disabled = false;
        }, revealCardDelay * hand.length); // delay message appear to after cards are out
      }
      else {
        setTimeout(() => { displayMessage.innerText = "Don't like what you see? Click on the cards you want to chuck in the bin.";
          dealButton.disabled = false;
        }, revealCardDelay * hand.length); // delay message appear to after cards are out
      }

      revealCards(); // flips back-faced cards to show card
      gameState = 'discard';
    }
  }
};
