// POMODORO TIMER
const timeDisplay = document.querySelector(".time");

const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const stopBtn = document.querySelector(".stopBtn");

const timeControlButtons = document.querySelectorAll(".time-controls button")
const pomodoroTime = document.querySelector(".pomodoro-time");
const shortBreakTime = document.querySelector(".short-break-time");
const longBreakTime = document.querySelector(".long-break-time");

let intervalId;
let isRunning = false;
let time = 25;
let totalSeconds = time * 60;

function formatTime(minutes){
  const mins = String(minutes).padStart(2, 0)
  return `${mins}:00`;
};

/* Time button controls */

timeControlButtons.forEach(button => {
  button.addEventListener('click', () => {
    
    timeControlButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');

    if(pomodoroTime.classList.contains('selected')){
      time = 25;
    }
    else if(shortBreakTime.classList.contains('selected')){
      time = 5;
    }
    else if(longBreakTime.classList.contains('selected')){
      time = 15;
    }

    totalSeconds = time * 60;
    clearInterval(intervalId);
    isRunning = false;
    timeDisplay.textContent = formatTime(time);
  });
});

function startTime(){
  if(isRunning) return;
  isRunning = true;

  
  intervalId = setInterval( () => {
    if(totalSeconds <= 0){
      clearInterval(intervalId);
      isRunning = false;
      timeDisplay.textContent = formatTime(time);
    }

    totalSeconds--;

    const mins = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    timeDisplay.textContent = 
    `${String(mins).padStart(2, 0)}:${String(seconds).padStart(2, 0)}`;

  },1000);

};

startBtn.addEventListener('click', startTime);

pauseBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  isRunning = false;
});

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  isRunning = false;
  timeDisplay.textContent = formatTime(time);
});


/* BG Color of Body Switches on hovering the buttons */
startBtn.addEventListener('mouseenter', () =>{
 document.body.style.backgroundColor = "hsla(120, 100%, 40%, 0.3)";
});
startBtn.addEventListener('mouseleave', () =>{
 document.body.style.backgroundColor = "var(--light-color)";
});

pauseBtn.addEventListener('mouseenter', () =>{
 document.body.style.backgroundColor = "hsla(60, 100%, 40%, 0.3)";
});
pauseBtn.addEventListener('mouseleave', () =>{
 document.body.style.backgroundColor = "var(--light-color)";
});

stopBtn.addEventListener('mouseenter', () =>{
 document.body.style.backgroundColor = "hsla(0, 100%, 40%, 0.3)";
});
stopBtn.addEventListener('mouseleave', () =>{
 document.body.style.backgroundColor = "var(--light-color)";
});