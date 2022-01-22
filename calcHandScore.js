/* eslint-disable max-len */

/**
 * Function that takes 5 cards in the hand array and determines the strongest combo that the cards form.
 * Returns results in the form of an object which contains the highest combo and a boolean of whether there is a high card present.
 *
 * @param {*} fiveCards
 * @returns result object
 */
const calcHandScore = (fiveCards) => {
  const playerHand = fiveCards;

  // variables for checking pairs/3-kinds/house
  let pair1Rank = 0;
  let pair2Rank = 0;
  let threeOfAKindRank = 0;
  let fourOfAKindRank = 0;

  // variables for checking flush
  let flushSuit = '';

  // variables for determining hand strength
  let twoPairFound = false;
  let threeOfAKindFound = false;
  let houseFound = false;
  let fourOfAKindFound = false;
  let flushFound = false;
  let straightFound = false;
  let straightFlushFound = false;
  let highAceStraightFound = false;
  let royalFlushFound = false;

  // variable for determining strongest available combo
  let bestCombo;
  let highCardPresent = false;

  // tally by ranks
  const cardRankTally = {};
  // eslint-disable-next-line no-undef
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardRank = playerHand[i].rank;
    // if we've seen this rank before, then incerement.
    if (cardRank in cardRankTally) {
      cardRankTally[cardRank] += 1;
    }
    else {
      cardRankTally[cardRank] = 1;
    }
  }

  // list out the rank tally object keys as an array
  const rankTallyKeys = Object.keys(cardRankTally);
  // check for pairs/3-kinds/4-kinds/house
  for (let i = 0; i < rankTallyKeys.length; i += 1) {
    // check if high card (jack or higher) exists
    if (Number(rankTallyKeys[i]) === 11 || Number(rankTallyKeys[i]) === 12 || Number(rankTallyKeys[i]) === 13) {
      highCardPresent = true;
    }
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
      // reset currentCard and subsequentCard variables;
      currentCard = null;
      subsequentCard = null;
      highAceStraightFound = true;
      for (let i = 1; i < rankTallyKeys.length - 1; i += 1) {
        currentCard = Number(rankTallyKeys[i]);
        subsequentCard = Number(rankTallyKeys[i + 1]);
        if (currentCard !== subsequentCard - 1) {
          highAceStraightFound = false;
          break; // end the loop early. Efficient siol
        }
      }
    }
  }

  // tally by suit
  const cardSuitTally = {};
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardSuit = playerHand[i].suit;
    // if we've seen this suit before, then incerement.
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    else {
      cardSuitTally[cardSuit] = 1;
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
  // determine greatest hand strength.

  // TWO PAIR
  if (pair1Rank !== 0 && pair2Rank !== 0) {
    twoPairFound = true;
    bestCombo = 'TWO PAIR';
    console.log(`2 pairs found! ${pair1Rank} and ${pair2Rank}`);
  }
  // 3 OF A KIND
  if (threeOfAKindRank !== 0 && pair1Rank === 0) {
    threeOfAKindFound = true;
    bestCombo = 'THREE OF A KIND';
    console.log(`three of a kind found! ${threeOfAKindRank}`);
  }
  // STRAIGHT
  if (straightFound && !flushFound) {
    bestCombo = 'STRAIGHT';
    console.log('straight found!');
  }
  // FLUSH
  if ((flushFound && !straightFound) || (highAceStraightFound && !straightFound)) {
    bestCombo = 'FLUSH';
    console.log('flush found!');
  }
  // FULL HOUSE
  if (pair1Rank !== 0 && threeOfAKindRank !== 0) {
    houseFound = true;
    bestCombo = 'FULL HOUSE';
    console.log(`house found! ${threeOfAKindRank} with ${pair1Rank} pair`);
  }
  // 4 OF A KIND
  if (fourOfAKindRank !== 0) {
    fourOfAKindFound = true;
    bestCombo = 'FOUR OF A KIND';
    console.log(`four of a kind found! ${fourOfAKindRank}`);
  }
  // STRAIGHT FLUSH
  if (straightFound === true && flushFound === true) {
    straightFlushFound = true;
    bestCombo = 'STRAIGHT FLUSH';
    console.log('straight flush found!');
  }
  // ROYAL FLUSH
  if (highAceStraightFound && flushFound) {
    royalFlushFound = true;
    bestCombo = 'ROYAL FLUSH';
    console.log(`royal flush found ${royalFlushFound}! WOW`);
  }

  if (bestCombo === undefined) {
    bestCombo = 'none';
  }

  console.log(`best combo:  ${bestCombo}`);
  console.log(`high card? ${highCardPresent}`);

  // wrap results in an object so that it can be returned out
  const results = {
    highestcombo: bestCombo,
    highcard: true,
  };
  return results;
};
