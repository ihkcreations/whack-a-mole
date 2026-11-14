const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');  
const resetBtn = document.getElementById('reset-btn');
const messageDisplay = document.getElementById('message');
let lastHole = null;
let score = 0;
let time = 30;
let timerId = null;
let moleTimer = null;  
let isPlaying = false;
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];  
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}
function peep() {  
  const timeOut = randomTime(400, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  moleTimer = setTimeout(() => {
    hole.classList.remove('up');
    if (isPlaying) {
      peep();  
    }
  }, timeOut);
}
function startGame() {
  score = 0;
  time = 30;
  scoreDisplay.textContent = score;  
  timerDisplay.textContent = time;
  messageDisplay.textContent = 'Game in progress';
  startBtn.disabled = true;
  resetBtn.disabled = false;
  isPlaying = true;
  peep();
  timerId = setInterval(() => {  
    time--;
    timerDisplay.textContent = time;
    if (time <= 0) {
      stopGame();
    }
  }, 1000);
}  
function stopGame() {
  isPlaying = false;
  clearInterval(timerId);
  clearTimeout(moleTimer);
  holes.forEach(hole => hole.classList.remove('up'));
  startBtn.disabled = false;
  resetBtn.disabled = true;  
  messageDisplay.textContent = 'Final score: ' + score;
}
function whack(e) {
  if (!isPlaying) {
    return;
  }
  if (!this.classList.contains('up')) {  
    return;
  }
  score++;
  this.classList.remove('up');
  scoreDisplay.textContent = score;
}
startBtn.addEventListener('click', startGame);  
resetBtn.addEventListener('click', stopGame);
holes.forEach(hole => hole.addEventListener('click', whack));


