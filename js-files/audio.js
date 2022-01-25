// AUDIO GLOBAL VARIABLES

// bg music
const audioBg = document.createElement('audio');
audioBg.setAttribute('id', 'bg-audio');
audioBg.loop = true;
audioBg.volume = 0.3;
audioBg.src = 'sounds/cool-background-music.mp3';

// bloops and flips not included because i couldn't figure out how to make them overlap.

// card flip
// const audioCardFlip = document.createElement('audio');
// audioCardFlip.src = 'sounds/cardflip.mp3';

// bloop
// const audioBloop = document.createElement('audio');
// audioBloop.src = 'sounds/bloop.mp3';

// win sound
const audioWin = document.createElement('audio');
audioWin.src = 'sounds/annoying-arcade-loop.wav';
audioWin.volume = 0.3;

/**
 * plays the card flip sound
 */
const playCardflipSound = () => {
  const src = 'sounds/cardflip.mp3';
  console.log(src);

  const audioCardFlip = document.createElement('audio');
  audioCardFlip.setAttribute('id', 'card-flip-audio');
  audioCardFlip.src = src;
  audioCardFlip.play();
};

/**
 * plays a bloop sound when a button is clicked
 */
const playBloopSound = () => {
  const src = 'sounds/bloop.mp3';
  console.log(src);

  const audioBloop = document.createElement('audio');
  audioBloop.setAttribute('id', 'bloop-audio');
  audioBloop.volume = 1;
  audioBloop.src = src;
  audioBloop.play();
};

/**
 * plays an annoying sound when you win a hand
 */
const playAnnoyingWinSound = () => {
  // const src = 'sounds/annoying-arcade-loop.wav';
  // console.log('win sound');

  // const audio = document.createElement('audio');
  // audio.setAttribute('id', 'win-audio');
  // audio.volume = 0.5;
  // audio.src = src;
  audioWin.play();

  // get bet button event listener;
  const increaseBetButton = document.getElementById('bet-plus-1');
  increaseBetButton.addEventListener('click', () => {
    if (audioWin.currentTime > 0) {
      audioWin.pause();
      audioWin.currentTime = 0;
    }
  });
  // get bet button event listener;
  const maxBetButton = document.getElementById('max-bet-button');
  maxBetButton.addEventListener('click', () => {
    if (audioWin.currentTime > 0) {
      audioWin.pause();
      audioWin.currentTime = 0;
    }
  });
};

/**
 * starts the background music playing.
 */
const playBackgroundMusic = () => {
  // const src = 'sounds/cool-background-music.mp3';
  // console.log(src);

  // const audio = document.createElement('audio');
  // audio.setAttribute('id', 'bg-audio');

  // audio.onloadeddata = (event) => {
  //   console.log('Yay!'); };

  // if (typeof audio.loop === 'boolean')
  // {
  //   audio.loop = true;
  // }
  // else
  // {
  //   audio.addEventListener('ended', () => {
  //     this.currentTime = 0;
  //     this.play();
  //   }, false);
  // }
  // audio.volume = 0.4;
  // audio.src = src;
  audioBg.play();
};
