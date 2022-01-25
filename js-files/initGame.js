const initGame = () => {
  rebuildDeck();

  if (round === 1) { // only create starter window on round 1
    createStarterWindow();
  }
  buildUI();
  console.log(calcHandScore(hand));
};

initGame();
