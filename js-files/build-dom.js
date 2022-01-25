// create starter window
const createStarterWindow = () => {
  // create starter window div
  const starterWindow = document.createElement('div');
  starterWindow.setAttribute('id', 'starter-window');
  document.body.appendChild(starterWindow);

  // create header
  const header = document.createElement('header');
  header.innerText = 'VIDEO\nPOKER';
  starterWindow.appendChild(header);

  // create subtext
  const subtext = document.createElement('h2');
  subtext.innerText = 'ARE YOU READY TO POKE SOME VIDEOS?';
  starterWindow.appendChild(subtext);

  // create button yes
  const buttonYes = document.createElement('button');
  buttonYes.innerText = 'YEAH!';
  buttonYes.setAttribute('id', 'button-yes');
  starterWindow.appendChild(buttonYes);

  buttonYes.addEventListener('click', () => {
    const uiDiv = document.getElementById('ui-div');
    setTimeout(() => {
      playBackgroundMusic();
      uiDiv.style = 'display:show'; // reveal UI
      starterWindow.style = 'display:none'; // close starter window.
    }, 500);
  });

  // create button no
  const buttonNo = document.createElement('button');
  buttonNo.innerText = 'NO, I DISAPROVE OF GAMBLING AWAY MY FAKE MONEY';
  buttonNo.setAttribute('id', 'button-no');

  starterWindow.appendChild(buttonNo);
  buttonNo.addEventListener('click', () => {
    setTimeout(() => {
      window.close(); // closes entire tab
    }, 500);
  });
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

  // BUILD MUTE BUTTON
  const muteButton = document.createElement('button');
  muteButton.setAttribute('id', 'mute-button');
  uiDiv.appendChild(muteButton);
  muteButton.addEventListener('click', clickMute);

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
  dealButton.disabled = true;
  dealButton.addEventListener('click', deal);

  // CREATE ROUND COUNTER;
  const roundCounter = document.createElement('div');
  roundCounter.innerHTML = `ROUND <span class="bold-text">${round}</span>`;
  roundCounter.setAttribute('id', 'round-counter');
  uiDiv.appendChild(roundCounter);
};
