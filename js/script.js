'use strict';

// We need to add a class .hidden in the css file to use to hide the dice.

// BUTTONS...
const rollDiceBtn = document.querySelector('.btn--roll');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');

// Counters, Variables, etc...
let diceValue = 0;
let player = 0;
const playersScores = [0, 0];
const playersCurrents = [0, 0];
const message = ['', ''];
let gameOn = false;

// CSS ELEMENTS...
const diceEl = document.querySelector('.dice');

const playersEl = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];

// FUNCTIONS...
const hideDice = () => diceEl.classList.add('hidden');
const showDice = () => diceEl.classList.remove('hidden');

// Reset Game
const reset = function () {
  // Set Scores at Zeroes
  playersScores[0] = 0;
  playersScores[1] = 0;
  playersCurrents[0] = 0;
  playersCurrents[1] = 0;

  //Remove Messages
  message[0] = 'COUCOU!';
  message[1] = 'HELLO !!!';

  // Make player 1 active
  playersEl[player].classList.remove('player--winner');
  playersEl[1].classList.remove('player--active');
  playersEl[0].classList.add('player--active');

  // Player 0 starts first
  player = 0;

  showValues();
  hideDice();
  gameOn = true;
};

// Display all Elements
const showValues = function () {
  document.querySelector('#score--0').textContent = playersScores[0];
  document.getElementById('score--1').textContent = playersScores[1];
  document.querySelector('#current--0').textContent = playersCurrents[0];
  document.getElementById('current--1').textContent = playersCurrents[1];
  document.getElementById(`message--0`).textContent = message[0];
  document.getElementById(`message--1`).textContent = message[1];
};

// Switch Players
const playerSwitch = function () {
  playersCurrents[player] = 0;
  playersEl[0].classList.toggle('player--active');
  playersEl[1].classList.toggle('player--active');
  player = player === 0 ? 1 : 0;

  diceValue = 0;
};

// GAME LOGIC...

reset();

newGameBtn.addEventListener('click', function () {
  reset();
});

rollDiceBtn.addEventListener('click', function () {
  if (gameOn) {
    diceValue = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `./images/dice-${diceValue}.png`;
    showDice();
    if (diceValue > 1) {
      playersCurrents[player] += diceValue;
    } else {
      playerSwitch();
    }
    showValues();
  }
});

holdBtn.addEventListener('click', function () {
  if (gameOn && playersCurrents[player] !== 0) {
    playersScores[player] += playersCurrents[player];
    if (playersScores[player] >= 20) {
      playersEl[player].classList.add('player--winner');
      playersCurrents[player] = 0;
      message[player] = '🎉 You Won! 🎉';
      gameOn = false;
    } else {
      playerSwitch();
    }
    hideDice();
    showValues();
  }
});
