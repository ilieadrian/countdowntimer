const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resumeBtn = document.getElementById("resume");
const resetBtn = document.getElementById("reset");
const timerDisplay = document.getElementById("timer");
let countdown;

function processInputedTime() {
    const timeChosenByUser = document.getElementById("time").value.trim();
    const num = parseInt(timeChosenByUser);

    timer(num * 60);
}

function timer(seconds) {
    clearInterval(countdown);

    const actualTime = Date.now();
    const setTime = actualTime + seconds * 1000;
    updateDisplay(seconds)

    countdown = setInterval(() => {
        const secondsLeft = Math.round((setTime - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown)
            return;
        }
        updateDisplay(secondsLeft);
    }, 1000);
    
}

// intelege modificarea de mai jos
// intelege modificarea de mai jos
// intelege modificarea de mai jos
// intelege modificarea de mai jos
// intelege modificarea de mai jos


// function updateDisplay(seconds) {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor(seconds / 60);
//     const remainderSeconds = seconds % 60;
//     const display = `${hours}h:${minutes}m:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}s`;
//     document.title = display;
//     timerDisplay.innerHTML = display;
// }


function updateDisplay(seconds) {
    const hours = Math.floor(seconds / 3600);
    const remainingSecondsAfterHours = seconds % 3600;
    const minutes = Math.floor(remainingSecondsAfterHours / 60);
    const remainderSeconds = remainingSecondsAfterHours % 60;

    const display = `${hours}h: ${minutes}m: ${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}s`;
    
    document.title = display;
    timerDisplay.innerHTML = display;
}



// pause/resume function

// reset function

// set audio alert when time is done

// store set time in local host and retrive it if is there

// https://stackoverflow.com/questions/20618355/how-to-write-a-countdown-timer-in-javascript
// https://medium.com/geekculture/23-javascript-countdown-timer-for-website-273efc2f5618





startBtn.addEventListener("click", function(e) {
    e.preventDefault();
    processInputedTime();
});