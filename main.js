const section = document.querySelector('section');
const playerLivesCount = document.getElementsByClassName('playerLivesCount')[0];
const LIVE = 20;
let playerLives = LIVE;

playerLivesCount.textContent = playerLives

// generate data
function getData() {
  return [
    { imgSrc: './images/banana.png', name: 'banana' },
    { imgSrc: './images/cat.png', name: 'cat' },
    { imgSrc: './images/chicken.png', name: 'chicken' },
    { imgSrc: './images/jaguar.png', name: 'jaguar' },
    { imgSrc: './images/leaf.png', name: 'leaf' },
    { imgSrc: './images/mummy.png', name: 'mummy' },
    { imgSrc: './images/pig.png', name: 'pig' },
    { imgSrc: './images/sheep.png', name: 'sheep' },
    { imgSrc: './images/banana.png', name: 'banana' },
    { imgSrc: './images/cat.png', name: 'cat' },
    { imgSrc: './images/chicken.png', name: 'chicken' },
    { imgSrc: './images/jaguar.png', name: 'jaguar' },
    { imgSrc: './images/leaf.png', name: 'leaf' },
    { imgSrc: './images/mummy.png', name: 'mummy' },
    { imgSrc: './images/pig.png', name: 'pig' },
    { imgSrc: './images/sheep.png', name: 'sheep' }
  ]
}

function randomize() {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
}

function cardGenerator() {
  const carData = randomize();
  // generate html
  carData.forEach((item) => {
    const card = document.createElement('div');
    const face = document.createElement('img');
    const back = document.createElement('div');
    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';
    // attach the information card
    face.src = item.imgSrc;
    card.setAttribute('name', item.name);
     
    // attach the card to the section
    section.appendChild(card); 
    card.appendChild(face);
    card.appendChild(back);

    // add event click
    card.addEventListener('click', (e) => {
      card.classList.toggle('toggleCard');
      checkCards(e);
    })
  })
}

// check cards
function checkCards(e) {
  const clickedCard = e.target;
  clickedCard.classList.add('flipped');
  const flippedCards = document.querySelectorAll('.flipped');
  const toggleCard = document.querySelectorAll('.toggleCard');

  if(flippedCards.length === 2) {
    // matched
    if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'none'; 
      })
    } else {
      // not match
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        setTimeout(() => {
          card.classList.remove('toggleCard');
        }, 1000);
      });

      playerLives--;
      playerLivesCount.textContent = playerLives;
      if(playerLives === 0) {
        restartGame();
      }
    }
  }

  if(toggleCard.length === 16) {
   setTimeout(() => {
    alert('You won')
   }, 1000)
  }
}

// restart
function restartGame() {
  const cardData = randomize();
  const faces = document.querySelectorAll('.face');
  const cards = document.querySelectorAll('.card'); 
  section.style.pointerEvents = 'none';
  cardData.forEach((item, idx) => {
    cards[idx].classList.remove('toggleCard');
    // randomize
    setTimeout(() => {
        cards[idx].style.pointerEvents = 'all';
        faces[idx].src = item.imgSrc; 
        cards[idx].setAttribute('name', item.name);
        section.style.pointerEvents = 'all';
    }, 1000);
  });
  playerLives = LIVE;
  playerLivesCount.textContent = playerLives;
}

cardGenerator();