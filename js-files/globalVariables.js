/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-empty */
/* eslint-disable prefer-const */

let combos = ['ROYAL FLUSH', 'STRAIGHT FLUSH', 'FOUR OF A KIND', 'FULL HOUSE', 'FLUSH', 'STRAIGHT', 'THREE OF A KIND', 'TWO PAIR', 'JACK OR HIGHER BONUS'];
const minPayout = [500, 150, 60, 10, 7, 5, 3, 2, 1];
let updatedPayoutArray = [];
let payoutAmount;

const revealCardDelay = 300;

let round = 1;
let creditBalance = 100;
const maxBet = 42;
let currentBet = 0;
let storedCurrentBet = 0;
let gameState = 'bet';
const hand = [];
let deck;

let audioMute = false;

// SELECT CARDS TO DISCARD BEFORE DISCARDING
const selectedDiscardCardArray = [];

// delay for timer so that action occurs only after selected discarded cards have been flipped over
let variableCardDelay = revealCardDelay * selectedDiscardCardArray.length;
