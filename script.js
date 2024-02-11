const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resumeBtn = document.getElementById("resume");
const resetBtn = document.getElementById("reset");
const timerDisplay = document.getElementById("timer");
const warningToneReference = document.getElementById("warning-tone");
const savedData = JSON.parse(localStorage.getItem('seconds'));
const audioNotification = new Audio('audio-notification.mp3');
let display;
let countdown;
let secondsLeft;

function processInputedTime() {
    const timeChosenByUser = document.getElementById("time").value.trim();
    let num;

    if (savedData) {
        num = +savedData;
        timer(num);
    } else {
        num = parseInt(timeChosenByUser);
        if (isNaN(num)) {
            timerDisplay.textContent = "Please enter a number";
            timerDisplay.classList.add("error");
            document.getElementById("time").value = 240;
            return;
        } timer(num * 60);
    }

    timerDisplay.classList.remove("error");
    startBtn.classList.toggle("display-none");
    pauseBtn.classList.toggle("display-none");
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
            handleTimerFinish();
            return;
        }
        updateDisplay(secondsLeft);
    }, 1000); 
}

function updateDisplay(seconds) {
    display = formatTime(seconds);    
    document.title = display;
    timerDisplay.innerHTML = display;
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const remainderSecondsAfterHours = seconds % 3600;
    const minutes = Math.floor(remainderSecondsAfterHours / 60);
    const remainderSeconds = remainderSecondsAfterHours % 60;

    return `${hours}h: ${minutes}m: ${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}s`;
}

function pauseCountdown(){
    pauseBtn.classList.toggle("display-none");
    resumeBtn.classList.toggle("display-none");

    clearInterval(countdown);
    localStorage.setItem('seconds', JSON.stringify(secondsLeft));
}

function resumeCountdown(){
    timer(secondsLeft);
    resumeBtn.classList.toggle("display-none");
    pauseBtn.classList.toggle("display-none");
    localStorage.removeItem('seconds');
}

function reset() {
    pauseBtn.classList.add("display-none");
    resumeBtn.classList.add("display-none");
    startBtn.classList.remove("display-none");

    clearInterval(countdown);

    document.getElementById("time").value = 240;
    timerDisplay.textContent = "00h: 00m: 00s";
    timerDisplay.classList.remove("error");
    localStorage.removeItem('seconds');
}

function handleTimerFinish() {
    audioNotification.play();
    document.title = "Timer reached 0";
    reset();
}

startBtn.addEventListener("click", function(e) {
    e.preventDefault();
    processInputedTime();
});

pauseBtn.addEventListener("click", function(e) {
    pauseCountdown();
});

resumeBtn.addEventListener("click", function(e) {
    resumeCountdown();
});

resetBtn.addEventListener("click", function(e) {
    reset();
});

warningToneReference.addEventListener("click", function() {
    audioNotification.play();
});

window.addEventListener("load", function(e) {
    if (savedData) {
        updateDisplay(savedData);
    } else {
        display = "00h: 00m: 00s";
        timerDisplay.innerHTML = display;
    }
});