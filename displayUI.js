/* eslint-disable max-len */
/* eslint-disable no-loop-func */

/**
 * FUNCTION THAT ADDS CREDITS TO USER'S BALANCE BASED ON THE BET PLACED AND THE BEST COMBO FOUND.
 */
const updatePayout = () => {
  // get new payout values
  updatedPayoutArray = minPayout.map((x) => x * currentBet);

  // rebuild payout cells
  const payoutColumn = document.getElementById('payout-column');
  payoutColumn.innerHTML = ''; // clear out payout Column html
  // loop to add payout cells to payout column
  updatedPayoutArray.forEach((updatedPayoutArray) => {
    const payoutCell = document.createElement('div');
    payoutCell.classList.add('payout-cell');
    payoutCell.innerText = `${updatedPayoutArray}`;
    payoutColumn.appendChild(payoutCell);
    console.log(updatedPayoutArray);
  });
};

/**
 * A function that builds the five card container after discarding and replacing cards.
 */
const build5CardContainer = () => {
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

/**
 * FUNCTION TO REVEAL CARDS FROM FACE DOWN
 */
const revealCards = () => {
  let dealInterval = 0; // for looping the interval deal delay
  for (let i = 0; i < hand.length; i += 1) {
    dealInterval += revealCardDelay; // dealing delay
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
 * FUNCTION TO REVEAL NEW CARDS AFTER DISCARDING
 */
const replaceDiscards = () => {
  // sort the selectedDiscardCardArray in acscending order before applying reveal to reveal in order of index
  selectedDiscardCardArray.sort((a, b) => a - b);
  let dealInterval = 0; // Initialiser for looping the interval deal delay
  for (let i = 0; i < selectedDiscardCardArray.length; i += 1) {
    dealInterval += 300; // dealing delay
    setTimeout(() => {
      const cardContainer = document.getElementById(`card-${selectedDiscardCardArray[i]}`);
      cardContainer.innerHTML = `${hand[selectedDiscardCardArray[i]].name}${hand[selectedDiscardCardArray[i]].suitSymbol}`; // only get the replaced indexes from the new cards
      cardContainer.classList.add('card-container');
      cardContainer.classList.remove('face-down');
      cardContainer.classList.remove('discard'); // remove discard selector class
      if (hand[i].suit === 'diamonds' || hand[i].suit === 'hearts') {
        cardContainer.classList.add('red');
      }
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
  uiDiv.innerHTML = '';
  document.body.appendChild(uiDiv);
  uiDiv.style = 'display:none';

  // BUILD PAYOUT TABLE
  const payoutTable = document.createElement('div');
  payoutTable.setAttribute('id', 'payout-table');
  uiDiv.appendChild(payoutTable);
  // build combo column
  const comboColumn = document.createElement('div');
  comboColumn.setAttribute('id', 'combo-column');
  payoutTable.appendChild(comboColumn);
  // loop to add hand combos to payout table;
  combos.forEach((combos) => {
    const comboCell = document.createElement('div');
    comboCell.classList.add('combo-cell');
    comboCell.innerText = `${combos}`;
    comboColumn.appendChild(comboCell);
  });
  // build payout column
  const payoutColumn = document.createElement('div');
  payoutColumn.setAttribute('id', 'payout-column');
  payoutTable.appendChild(payoutColumn);
  // loop to add payouts to payout table
  minPayout.forEach((minPayout) => {
    const payoutCell = document.createElement('div');
    payoutCell.classList.add('payout-cell');
    payoutCell.innerText = `${minPayout}`;
    payoutColumn.appendChild(payoutCell);
  });

  // CREATE 5-CARD CONTAINER
  const fiveCardContainer = document.createElement('div');
  // fiveCardContainer.innerHTML = '5-card container here';
  fiveCardContainer.setAttribute('id', 'five-card-container');
  uiDiv.appendChild(fiveCardContainer);

  // build the 5-card container
  build5CardContainer();

  // // CREATE DISPLAY MESSAGE DIV
  const displayMessage = document.createElement('div');
  displayMessage.innerText = 'Place your bet!!';
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
  maxBetButton.addEventListener('click', maxBetClick);

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
  dealButton.addEventListener('click', deal);
};

buildUI();
