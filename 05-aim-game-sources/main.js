const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;

const colors = ['#052649', '#014874', '#008E8F', '#00A682', '#01B778', '#12C466', '#45D14A', '#61D93B'];

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up')
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    startGame();
  }
});

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  screens[1].classList.add('up');
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
};

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;

    if (current < 10) {
      current = `0${current}`
    };

    setTime(current);
  };
};

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
};

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`
};

function createRandomCircle() {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  const size = getRandomNumber(10, 60);

  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  const color = getRandomColor();
  circle.style.background = color;
  circle.style.boxShadow = `0 0 2px ${color}, 0 0 5px ${color}`

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
};

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};