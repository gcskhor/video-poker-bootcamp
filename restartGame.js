/* eslint-disable max-len */
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
  const payoutAmount = updatedPayoutArray[indexToGet];
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

  // const displayMessage = document.getElementById('display-message');
  // displayMessage.innerText = 'Place your bet!';

  // initGame();
};
