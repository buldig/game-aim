const screens = document.querySelectorAll(".screen");
const startButton = document.querySelector(".start");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = [
  "red",
  "green",
  "blue",
  "white",
  "black",
  "yellow",
  "purple",
  "pink",
];
let score = 0;
let time = 5;
startButton.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = Number(e.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame(time);
  }
});

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    e.target.remove();
    score++;
    createRandomCircle();
  }
});

function startGame(time) {
  createRandomCircle(true);
  setInterval(decreaseTime, 1000);
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  board.innerHTML = `<h1>Счет: ${score}</h1>`;
  timeEl.parentNode.remove();
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const { width, height } = board.getBoundingClientRect();
  const size = getRandomNumber(10, 60);
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = getColor();
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getColor() {
  return colors[getRandomNumber(0, colors.length - 1)];
}
