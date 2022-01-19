/* eslint-disable no-undef */
/* eslint-disable max-len */

const calcHandScore = () => {
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
    const cardrank = playerHand[i];
    // if we've seen this rank before, then incerement.
    if (cardrank in cardRankTally) {
      cardRankTally[cardrank] += 1;
    }
    else {
      cardRankTally[cardrank] = 1;
    }
  }

  console.log('test');

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
    const suit = playerHand[i];
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

  // log some consoles!
  // determine actual hand strength.
  if (pair1Rank !== 0 && pair2Rank !== 0) {
    twoPairFound = true;
    console.log(`2 pairs found! ${pair1Rank} and ${pair2Rank}`);
  }
  // FULL HOUSE
  if (pair1Rank !== 0 && threeOfAKindRank !== 0) {
    houseFound = true;
    console.log(`house found! ${threeOfAKindRank} with ${pair1Rank} pair`);
  }
  // 3 OF A KIND
  if (threeOfAKindRank !== 0 && pair1Rank === 0) {
    threeOfAKindFound = true;
    console.log(`three of a kind found! ${threeOfAKindRank}`);
  }
  // 4 OF A KIND
  if (fourOfAKindRank !== 0) {
    fourOfAKindFound = true;
    console.log(`four of a kind found! ${fourOfAKindRank}`);
  }
  // FLUSH
  if (flushFound && !straightFound) {
    console.log('flush found!');
  }
  // STRAIGHT
  if (straightFound && !flushFound) {
    console.log('straight found!');
  }
  // STRAIGHT FLUSH
  if (straightFound === true && flushFound === true) {
    straightFlushFound = true;
    console.log('straight flush found!');
  }
  // ROYAL FLUSH
  if (highAceStraightFound && flushFound) {
    royalFlushFound = true;
    console.log(`royal flush found ${royalFlushFound}! WOW`);
  }
  if (!twoPairFound && !threeOfAKindFound && !fourOfAKindFound && !straightFound && !flushFound && !highAceStraightFound) {
    console.log('no combo found');
  }
};
