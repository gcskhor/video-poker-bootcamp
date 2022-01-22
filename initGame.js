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
  starterWindow.appendChild(buttonYes);

  starterWindow.addEventListener('click', () => {
    const uiDiv = document.getElementById('ui-div');
    setTimeout(() => {
      uiDiv.style = 'display:show'; // reveal UI
      starterWindow.style = 'display:none'; // close starter window.
    }, 500);
  });

  // create button no
  const buttonNo = document.createElement('button');
  buttonNo.innerText = 'NO I HATE FUN';
  starterWindow.appendChild(buttonNo);
  buttonNo.addEventListener('click', () => {
    setTimeout(() => {
      window.close(); // closes entire tab
    }, 500);
  });
};

const initGame = () => {
  rebuildDeck();
  buildUI();
  if (round === 0) {
    createStarterWindow();
  }
  round += 1;
  console.log(calcHandScore(hand));
};

initGame();
