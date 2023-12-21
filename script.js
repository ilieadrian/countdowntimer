const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resumeBtn = document.getElementById("resume");
const resetBtn = document.getElementById("reset");
const timerDisplay = document.getElementById("timer");
let countdown;
let secondsLeft;

function processInputedTime() {
    const timeChosenByUser = document.getElementById("time").value.trim();
    const num = parseInt(timeChosenByUser);

    if (isNaN(num)) {
        timerDisplay.textContent = "Please enter a number";
        timerDisplay.classList.add("error");
        document.getElementById("time").value = 180;
        return;
    }
    timerDisplay.classList.remove("error");
    startBtn.classList.toggle("display-none");
    pauseBtn.classList.toggle("display-none");

    timer(num * 60);
}

function timer(seconds) {
    clearInterval(countdown);

    const actualTime = Date.now();
    const setTime = actualTime + seconds * 1000;
    updateDisplay(seconds)

    countdown = setInterval(() => {
        secondsLeft = Math.round((setTime - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown)
            return;
        }
        updateDisplay(secondsLeft);
    }, 1000);
    
}

function updateDisplay(seconds) {
    const hours = Math.floor(seconds / 3600);
    const remainderSecondsAfterHours = seconds % 3600;
    const minutes = Math.floor(remainderSecondsAfterHours / 60);
    const remainderSeconds = remainderSecondsAfterHours % 60;

    const display = `${hours}h: ${minutes}m: ${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}s`;
    
    document.title = display;
    timerDisplay.innerHTML = display;
}


function pauseCountdown(){
    pauseBtn.classList.toggle("display-none");
    resumeBtn.classList.toggle("display-none");

    clearInterval(countdown);
    
    resumeBtn.addEventListener("click", function(){ 
        timer(secondsLeft);
        resumeBtn.classList.toggle("display-none");
        pauseBtn.classList.toggle("display-none");
    }); 
    
}

function reset() {
    pauseBtn.classList.add("display-none");
    resumeBtn.classList.add("display-none");
    startBtn.classList.remove("display-none");

    clearInterval(countdown);

    document.getElementById("time").value = 180;
    timerDisplay.textContent = "00h:00m:00s";
    timerDisplay.classList.remove("error");
}

// set audio alert when time is done

// store set time in local host and retrive it if is there




startBtn.addEventListener("click", function(e) {
    e.preventDefault();
    processInputedTime();
});

pauseBtn.addEventListener("click", function(e) {
    pauseCountdown();
});

resetBtn.addEventListener("click", function(e) {
    reset();
});
