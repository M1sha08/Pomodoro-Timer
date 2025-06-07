// THEME-TOGGLE BUTTON
const themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", () => {
  const dataTheme = document.documentElement.getAttribute("data-theme");
  
  if(dataTheme === "dark"){
    document.documentElement.setAttribute("data-theme", "light");
  }
  else{
    document.documentElement.setAttribute("data-theme", "dark");
  };
});

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


// TIME-CONTROL BUTTONS
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
 document.body.style.backgroundColor = "hsla(120, 100%, 20%, 0.5)";
});
startBtn.addEventListener('mouseleave', () =>{
 document.body.style.backgroundColor = "var(--light-color)";
});

pauseBtn.addEventListener('mouseenter', () =>{
 document.body.style.backgroundColor = "hsla(60, 100%, 20%, 0.5)";
});
pauseBtn.addEventListener('mouseleave', () =>{
 document.body.style.backgroundColor = "var(--light-color)";
});

stopBtn.addEventListener('mouseenter', () =>{
 document.body.style.backgroundColor = "hsla(0, 100%, 20%, 0.5)";
});
stopBtn.addEventListener('mouseleave', () =>{
 document.body.style.backgroundColor = "var(--light-color)";
});


//TASKS-CONTENT
const addTaskInput = document.getElementById("add-task-input");
const addTaskBtn = document.getElementById("add-task-button");


const maxInputChars = 50;
const maxTasks = 10;

const noTasksYetText = document.querySelector(".no-tasks-text");


addTaskBtn.addEventListener('click', () => {
  const addTaskInputValue = addTaskInput.value.trim();

  
  if (addTaskInputValue.length === 0) {
    addTaskInput.setAttribute("placeholder",
    "Input can't be empty!");
    return;
  } 
  else if (addTaskInputValue.length > maxInputChars) {
    addTaskInput.value = "";
    addTaskInput.setAttribute(
      "placeholder",
      `Input can't be longer than a ${maxInputChars} characters!`
    );
    return;
  }
  else{
    const tasksCount = document.querySelectorAll(".task").length;

    if(tasksCount >= maxTasks){
      addTaskInput.value = "";
      addTaskInput.setAttribute("placeholder", 
        `You can't have more then a ${maxTasks} Tasks`
      )
      return;
    };  
  }


  const taskContainer = document.querySelector(".task-container");
  const task = document.createElement('div');
  const taskText = document.createElement('p');
  const taskActions = document.createElement("div");
  const taskCheckbox = document.createElement('input');
  const taskDelete = document.createElement('button');

  
  task.classList.add('task');
  taskText.classList.add("task-text");
  taskActions.classList.add("task-actions");
  taskCheckbox.classList.add("task-checkbox");
  taskDelete.classList.add("task-delete");


  taskText.textContent = addTaskInputValue;
  taskCheckbox.type = "checkbox";
  taskDelete.textContent = "X";

  taskContainer.appendChild(task);
  task.appendChild(taskText);
  task.appendChild(taskActions);
  taskActions.appendChild(taskCheckbox);
  taskActions.appendChild(taskDelete);

  addTaskInput.value = "";
  noTasksYetText.style.display = "none";

  taskCheckbox.addEventListener("change", () => {
    taskText.classList.toggle("checked", taskCheckbox.checked);
  });

  taskDelete.addEventListener("click", () => {
    task.remove();
    if(document.querySelectorAll(".task").length === 0){
      noTasksYetText.style.display = "block";
    };
  });
});

addTaskInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    addTaskBtn.click();
  };
});