/* eslint-disable no-loop-func */
/* eslint-disable max-len */

const updateRewardAmount = () => {
  let indexToGet = null;
  if (calcHandScore(hand).highestcombo !== 'none') {
    indexToGet = combos.indexOf(calcHandScore(hand).highestcombo);
    // console.log(indexToGet);
  }
  else { return; }
  payoutAmount = updatedPayoutArray[indexToGet];
};

/**
 * A function for adding the reward into the user's credit balance.
 */
const creditReward = () => {
  // if (calcHandScore(hand).highestcombo === )
  // find index of highest combo from calchandscore
  let indexToGet = null;
  if (calcHandScore(hand).highestcombo !== 'none') {
    indexToGet = combos.indexOf(calcHandScore(hand).highestcombo);
    // console.log(indexToGet);
  }
  else { return; }
  payoutAmount = updatedPayoutArray[indexToGet];

  if (calcHandScore(hand).highcard) { // add bonus if jacks or higher
    payoutAmount += updatedPayoutArray[8];
  }
  console.log(payoutAmount);
  let amtPaid = 0;
  const creditBalanceDiv = document.getElementById('credit-balance-div');

  // set timeout so that it credits only after the cards have been displayed
  // create feature where the credit balance runs up by 1 every 10ms until all credits have been rewarded.
  const payoutRef = setInterval(() => {
    creditBalance += 1;
    amtPaid += 1;
    creditBalanceDiv.innerHTML = `<span class="bold-text">${creditBalance}</span> CREDITS REMAINING`;
    if (amtPaid === payoutAmount) {
      clearInterval(payoutRef);
    }
  }, 10);
};

/**
 * Function that resets all game states except for credit balance.
 * To be used at the end of the 'discard' cycle after rewards paid out to the user.
 */
const restartGame = () => {
  // discard card array // selectedDiscardCardArry = [] doesnt work
  selectedDiscardCardArray.length = 0;
  // current bet set to 0
  currentBet = 0; // ensure that right number of credits is reallocated into the balance
  // reset elements on screen
  // grab and update current bet
  const xCredits = document.getElementById('x-credits');
  xCredits.innerHTML = `<span class="bold-text">${currentBet}</span> CREDITS`;

  // disable deal button (default 0 currentBet)
  const dealButton = document.getElementById('deal-button');
  dealButton.disabled = true;
};

/**
 * A function that selects cards in the hand to be discarded if the user chooses.
 * Cards can also be deselected if needed.
 * Attached to eventlistener for each card to return cardIndex
 * @param {*} cardIndex
 */
const discardCardSelect = (cardIndex) => {
  console.log(hand[cardIndex]);
  // select the card to be discarded
  // const selectedDiscardCardArray = [];

  // // 'DISCARD' text element declarations
  // const discardTextDiv = document.createElement('div');
  // discardTextDiv.setAttribute('id', `discard-text-${cardIndex}`);

  // if the card is to be deselected from the discard array
  if (selectedDiscardCardArray.includes(cardIndex)) {
    const repeatIndex = selectedDiscardCardArray.indexOf(cardIndex);
    if (repeatIndex > -1) { // index exists in array
      selectedDiscardCardArray.splice(repeatIndex, 1);
    }
    console.log('removed!');
    const cardForDiscard = document.getElementById(`card-${cardIndex}`);
    cardForDiscard.classList.remove('discard');

    // // delete 'DisCard' element if unselected
    // const prevDiscardedTextDiv = document.getElementById(`discard-text-${cardIndex}`);
    // prevDiscardedTextDiv.innerText = '';
  }

  // if the card is to be selected in the discard array
  else {
    selectedDiscardCardArray.push(cardIndex);
    console.log('added!');
    // add class of "DISCARD" to the card
    const cardForDiscard = document.getElementById(`card-${cardIndex}`);
    cardForDiscard.classList.add('discard');

    // // create an element above this 'DISCARD'
    // discardTextDiv.innerText = 'DISCARD';
    // cardForDiscard.appendChild(discardTextDiv);
  }
};

/**
 * FUNCTION TAKES CARDS WHICH HAVE BEEN SELECTED FOR DISCARDING, AND DISCARDS THEM.
 * Activated when cards have been selected (or not) and deal button is hit.
 * Function name is also a pun
 * @param {*} discardedIndexes
 */
const discard = (discardedIndexes) => {
  if (selectedDiscardCardArray.length > 0) { // cards to discard exist
    for (let i = 0; i < discardedIndexes.length; i += 1) {
      // remove cards from hand and pop from deck
      hand.splice(discardedIndexes[i], 1, deck.pop());
    }
  }
};

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

      // // add eventlistener for hover effect
      // cardContainer.addEventListener('hover', () => { cardContainer.classList.add('hover'); });

      // add sound effect
      playCardflipSound();
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
    dealInterval += revealCardDelay; // dealing delay
    setTimeout(() => {
      const cardContainer = document.getElementById(`card-${selectedDiscardCardArray[i]}`);
      cardContainer.innerHTML = `${hand[selectedDiscardCardArray[i]].name}${hand[selectedDiscardCardArray[i]].suitSymbol}`; // only get the replaced indexes from the new cards
      cardContainer.classList.add('card-container');
      cardContainer.classList.remove('face-down');
      cardContainer.classList.remove('discard'); // remove discard selector class
      if (hand[selectedDiscardCardArray[i]].suit === 'diamonds' || hand[selectedDiscardCardArray[i]].suit === 'hearts') {
        cardContainer.classList.add('red');
      }
      if (hand[selectedDiscardCardArray[i]].suit === 'clubs' || hand[selectedDiscardCardArray[i]].suit === 'spades') {
        cardContainer.classList.remove('red');
      }
      // add sound effect
      playCardflipSound();
    }, dealInterval);
  }
};
