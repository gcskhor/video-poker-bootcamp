/* eslint-disable no-loop-func */
/**
 * A function that rebuilds the five card container after discarding and replacing cards.
 */
const rebuild5CardContainer = () => {
  const fiveCardContainer = document.getElementById('five-card-container');
  fiveCardContainer.innerHTML = ''; // reset card containers

  let cardContainer;
  for (let i = 0; i < hand.length; i += 1) {
    cardContainer = document.createElement('div');
    // cardContainer.innerHTML = `${hand[i].name}${hand[i].suitSymbol}`;
    cardContainer.classList.add('card-container');
    cardContainer.setAttribute('id', `card-${i}`);
    cardContainer.classList.add('face-down');
    fiveCardContainer.appendChild(cardContainer);
    // if (hand[i].suit === 'diamonds' || hand[i].suit === 'hearts') {
    //   cardContainer.classList.add('red');
    // }
    // cardContainer.addEventListener('click', () => { discardCardSelect(i); });
  }
};

// FUNCTION TO REVEAL CARDS FROM FACE DOWN
const revealCards = () => {
  let dealInterval = 0; // for looping the interval deal delay
  for (let i = 0; i < hand.length; i += 1) {
    dealInterval += 300; // dealing delay
    setTimeout(() => {
      const cardContainer = document.getElementById(`card-${i}`);
      cardContainer.innerHTML = `${hand[i].name}${hand[i].suitSymbol}`;
      cardContainer.classList.add('card-container');
      cardContainer.classList.remove('face-down');
      if (hand[i].suit === 'diamonds' || hand[i].suit === 'hearts') {
        cardContainer.classList.add('red');
      }
      // add eventlistener for discarding
      cardContainer.addEventListener('click', () => { discardCardSelect(i); });
    }, dealInterval);
  }
};

/**
 * A function that builds the UI interface of the video poker game;
 * limits the number of elements in html
 */
const buildUI = () => {
  // CREATE UI DIV
  const uiDiv = document.createElement('div');
  uiDiv.setAttribute('id', 'ui-div');
  document.body.appendChild(uiDiv);
  uiDiv.style = 'display:none';

  // CREATE 5-CARD CONTAINER
  const fiveCardContainer = document.createElement('div');
  // fiveCardContainer.innerHTML = '5-card container here';
  fiveCardContainer.setAttribute('id', 'five-card-container');
  uiDiv.appendChild(fiveCardContainer);

  // build the 5-card container
  rebuild5CardContainer();

  // // CREATE DISPLAY MESSAGE DIV
  const displayMessage = document.createElement('div');
  displayMessage.innerText = 'best combo: ';
  displayMessage.setAttribute('id', 'display-message');
  uiDiv.appendChild(displayMessage);

  // CREATE BUTTON DIV
  const buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('id', 'button-container');
  uiDiv.appendChild(buttonContainer);

  // CREATE BET INCREASE div
  const betIncreaseDiv = document.createElement('div');
  betIncreaseDiv.setAttribute('id', 'bet-increase-div');
  buttonContainer.appendChild(betIncreaseDiv);
  // Add BET +1 and BET -1 buttons;
  const betPlus1Button = document.createElement('button');
  betPlus1Button.innerText = 'BET +1';
  betPlus1Button.setAttribute('id', 'bet-plus-1');
  betIncreaseDiv.appendChild(betPlus1Button);
  betPlus1Button.addEventListener('click', increaseBet);
  //
  const betMinus1Button = document.createElement('button');
  betMinus1Button.innerText = 'BET -1';
  betMinus1Button.setAttribute('id', 'bet-minus-1');
  betIncreaseDiv.appendChild(betMinus1Button);
  betMinus1Button.addEventListener('click', decreaseBet);

  // YOUR BET
  const yourBet = document.createElement('div');
  yourBet.setAttribute('id', 'your-bet-div');
  yourBet.innerHTML = 'YOUR BET:';
  const xCredits = document.createElement('div');
  xCredits.innerHTML = `<span class="bold-text">${currentBet}</span> CREDITS`;
  xCredits.setAttribute('id', 'x-credits');
  // yourBet.style = 'display:span,align-items:center, flex-direction:column,justify-content:center';
  yourBet.appendChild(xCredits);

  buttonContainer.appendChild(yourBet);

  // CREATE MAX BET BUTTON;
  const maxBetButton = document.createElement('button');
  maxBetButton.innerText = 'MAX BET';
  maxBetButton.setAttribute('id', 'max-bet-button');
  buttonContainer.appendChild(maxBetButton);

  // CREATE CREDIT BALANCE DIV;
  const creditBalance = document.createElement('div');
  creditBalance.setAttribute('id', 'credit-balance-div');
  creditBalance.innerHTML = '<span class="bold-text">100</span> CREDITS REMAINING';
  uiDiv.appendChild(creditBalance);

  // CREATE DEAL BUTTON;
  const dealButton = document.createElement('button');
  dealButton.innerText = 'DEAL';
  dealButton.setAttribute('id', 'deal-button');
  uiDiv.appendChild(dealButton);
};

buildUI();
