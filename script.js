/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// // Get a random index ranging from 0 (inclusive) to max (exclusive).
// const getRandomIndex = (max) => Math.floor(Math.random() * max);

// // Shuffle an array of cards
// const shuffleCards = (cards) => {
//   // Loop over the card deck array once
//   for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
//     // Select a random index in the deck
//     const randomIndex = getRandomIndex(cards.length);
//     // Select the card that corresponds to randomIndex
//     const randomCard = cards[randomIndex];
//     // Select the card that corresponds to currentIndex
//     const currentCard = cards[currentIndex];
//     // Swap positions of randomCard and currentCard in the deck
//     cards[currentIndex] = randomCard;
//     cards[randomIndex] = currentCard;
//   }
//   // Return the shuffled deck
//   return cards;
// };

// // creates deck like A,A,2,2,3,3,4,4,etc
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

let handHighestCategory; // start from the lowest, keep moving up if higher category is found.
const pair1 = null;
const pair2 = null;
const threeOfAKind = null;

const calcHandValue = () => {
  // tally for card ranks
  // pair1Rank = null;
  // pair2Rank = null;
  // threeOfAKind = null;

  // const cardRankTally = {};

  // for (let i = 0; i < playerHand.length; i += 1) {
  //   const { rank } = playerHand[i];
  //   // if we've seen this rank before, then incerement.
  //   if (rank in cardRankTally) {
  //     cardRankTally[rank] += 1;
  //   }
  //   else {
  //     cardRankTally[rank] = 1;
  //   }
  // }

  // for (x in cardRankTally) {
  //   console.log(`There are ${cardRankTally[x]} ${x} in hand`);
  // }
};
//   // check for jacks or better; (high card)
//   const highCardCheck = () => {
//     // use array filter
//     const highCardsFiltered = playerHand.filter((playerHand) => playerHand.rank >= 11);
//   };

// variables for checking pairs/3-kinds/house
let pair1Rank = 0;
let pair2Rank = 0;
let threeOfAKindRank = 0;
let fourOfAKindRank = 0;

// variables for checking flush
let flushSuit = '';

// variables for determining handStrength
let twoPairFound = false;
let threeOfAKindFound = false;
let houseFound = false;
let fourOfAKindFound = false;
let flushFound = false;
let straightFound = false;
let straightFlushFound = false;
let highAceStraightFound = false;
let royalFlushFound = false;

// tally by ranks
const cardRankTally = {};
// eslint-disable-next-line no-undef
for (let i = 0; i < playerHand.length; i += 1) {
  const { rank } = playerHand[i];
  // if we've seen this rank before, then incerement.
  if (rank in cardRankTally) {
    cardRankTally[rank] += 1;
  }
  else {
    cardRankTally[rank] = 1;
  }
}

// list out the rank tally object keys as an array
const rankTallyKeys = Object.keys(cardRankTally);
// check for pairs/3-kinds/4-kinds/house
for (let i = 0; i < rankTallyKeys.length; i += 1) {
  if (pair1Rank !== 0 && cardRankTally[rankTallyKeys[i]] === 2) {
    pair2Rank = rankTallyKeys[i];
  }
  else if (cardRankTally[rankTallyKeys[i]] === 2) {
    pair1Rank = rankTallyKeys[i];
  }
  else if (cardRankTally[rankTallyKeys[i]] === 3) {
    threeOfAKindRank = rankTallyKeys[i];
  }
  else if (cardRankTally[rankTallyKeys[i]] === 4) {
    fourOfAKindRank = rankTallyKeys[i];
  }
}

// check for straight
if (rankTallyKeys.length === 5) { // (only need to check for straight if 5 cards are different rank)
  // sort hand by rank
  // rankTallyKeys.sort((a, b) => a - b); // apparently already sorted so no need to sort

  let currentCard;
  let subsequentCard;
  straightFound = true; // set straightFound to be true before running the loop to eliminate

  for (let i = 0; i < rankTallyKeys.length - 1; i += 1) { // rankTallyKeys.length-1 so that subsequentCard !== null
    currentCard = Number(rankTallyKeys[i]);
    subsequentCard = Number(rankTallyKeys[i + 1]);
    if (currentCard !== subsequentCard - 1) {
      straightFound = false;
      // console.log('break detected in straight');
      break; // end the loop early. Efficient siol
    }
  }

  // check for high Ace straight
  if (Number(rankTallyKeys[0]) === 1 && !straightFound) { // if first card is A and no straight found
    console.log('checking for high ace straight');
    // reset currentCard and subsequentCard variables;
    currentCard = null;
    subsequentCard = null;
    highAceStraightFound = true;
    for (let i = 1; i < rankTallyKeys.length - 1; i += 1) {
      currentCard = Number(rankTallyKeys[i]);
      subsequentCard = Number(rankTallyKeys[i + 1]);
      console.log('a');
      if (currentCard !== subsequentCard - 1) {
        highAceStraightFound = false;
        console.log('break detected in high ace straight');
        break; // end the loop early. Efficient siol
      }
    }
  }
}

// tally by suit
const cardSuitTally = {};
for (let i = 0; i < playerHand.length; i += 1) {
  const { suit } = playerHand[i];
  // if we've seen this suit before, then incerement.
  if (suit in cardSuitTally) {
    cardSuitTally[suit] += 1;
  }
  else {
    cardSuitTally[suit] = 1;
  }
}

// list out the suit tally object keys as an array
const suitTallyKeys = Object.keys(cardSuitTally);
// check for flush
for (let i = 0; i < suitTallyKeys.length; i += 1) {
  if (cardSuitTally[suitTallyKeys[i]] === 5) {
    flushSuit = suitTallyKeys[i];
    flushFound = true;
  }
}

// determine actual hand strength.
if (pair1Rank !== 0 && pair2Rank !== 0) {
  twoPairFound = true;
  console.log(`2 pairs found! ${pair1Rank} and ${pair2Rank}`);
}
if (pair1Rank !== 0 && threeOfAKindRank !== 0) {
  houseFound = true;
  console.log(`house found! ${threeOfAKindRank} with ${pair1Rank} pair`);
}
if (threeOfAKindRank !== 0 && pair1Rank === 0) {
  threeOfAKindFound = true;
  console.log(`three of a kind found! ${threeOfAKindRank}`);
}
if (fourOfAKindRank !== 0) {
  fourOfAKindFound = true;
  console.log(`four of a kind found! ${fourOfAKindRank}`);
}
if (flushFound && !straightFound) {
  console.log('flush found!');
}
if (straightFound && !flushFound) {
  console.log('straight found!');
}
if (straightFound === true && flushFound === true) {
  straightFlushFound = true;
  console.log('straight flush found!');
}
if (highAceStraightFound && flushFound) {
  royalFlushFound = true;
  console.log(`royal flush found ${royalFlushFound}! WOW`);
}
if (!twoPairFound && !threeOfAKindFound && !fourOfAKindFound && !straightFound && !flushFound && !highAceStraightFound) {
  console.log('no combo found');
}
