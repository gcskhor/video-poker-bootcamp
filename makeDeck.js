/* eslint-disable max-len */
// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

// creates deck like A,A,2,2,3,3,4,4,etc
const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitsEmoji = ['♥', '♦', '♣', '♠'];
  const cardColor = ['red', 'red', 'black', 'black'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    const currentSuitSymbol = suitsEmoji[suitIndex];
    const currentColor = cardColor[suitIndex];

    // console.log(`current suit: ${currentSuit}`);

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }

      // make a single card object variable
      const card = {
        name: cardName,
        suit: currentSuit,
        suitSymbol: currentSuitSymbol,
        rank: rankCounter,
        color: currentColor,
      };

      // console.log(`rank: ${rankCounter}`);

      // add the card to the deck
      newDeck.push(card);
    }
  }

  return newDeck;
};

const rebuildDeck = () => {
  deck = shuffleCards(makeDeck());
  for (let i = 0; i < 5; i += 1) {
    hand[i] = deck.pop();
  }
  console.log(hand);
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

  // if the card is to be deselected from the discard array
  if (selectedDiscardCardArray.includes(cardIndex)) {
    const repeatIndex = selectedDiscardCardArray.indexOf(cardIndex);
    if (repeatIndex > -1) { // index exists in array
      selectedDiscardCardArray.splice(repeatIndex, 1);
    }
    console.log('removed!');
    const cardForDiscard = document.getElementById(`card-${cardIndex}`);
    cardForDiscard.classList.remove('discard');
  }

  // if the card is to be selected in the discard array
  else {
    selectedDiscardCardArray.push(cardIndex);
    console.log('added!');
    // add class of "DISCARD" to the card
    const cardForDiscard = document.getElementById(`card-${cardIndex}`);
    cardForDiscard.classList.add('discard');
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
