// POMODORO TIMER
const timeDisplay = document.querySelector(".time");

const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const resetBtn = document.querySelector(".resetBtn");

const timeControlButtons = document.querySelectorAll(".time-controls button")
const pomodoroTime = document.querySelector(".pomodoro-time");
const shortBreakTime = document.querySelector(".short-break-time");
const longBreakTime = document.querySelector(".long-break-time");

let time;

function formatTime(minutes) {  // < with the help of chatGPT
  const mins = String(minutes).padStart(2, '0');
  return `${mins}:00`;
}

/* TIME CONTROLS */
timeControlButtons.forEach(button => {
  button.addEventListener("click", () =>{

    timeControlButtons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");


    if(pomodoroTime.classList.contains("selected")){
      time = 25;
    }
    else if(shortBreakTime.classList.contains("selected")){
      time = 5;
    }
    else if(longBreakTime.classList.contains("selected")){
      time = 15;
    }

    timeDisplay.textContent = formatTime(time);
  });
});






/* Color Switches on hovering the buttons */
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

resetBtn.addEventListener('mouseenter', () =>{
 document.body.style.backgroundColor = "hsla(0, 100%, 40%, 0.3)";
});
resetBtn.addEventListener('mouseleave', () =>{
 document.body.style.backgroundColor = "var(--light-color)";
});