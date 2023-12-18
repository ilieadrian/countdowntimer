// import items
let startBtn = document.getElementById("start");
let pauseBtn = document.getElementById("pause");
let resumeBtn = document.getElementById("resume");
let resetBtn = document.getElementById("reset");
let hours;
let minutes;
let seconds = 60;
let countDownIsDone = false;

// take input from the user an split it in minutes / and seconds
function processInputedTime() {
    let timeChosenByUser = document.getElementById("time").value.trim();
    let num = +timeChosenByUser;
    let intialHours = num / 60;
    hours = Math.floor(intialHours);
    let intialMinutes = (intialHours - hours) * 60;
    minutes = Math.round(intialMinutes);

    countDown()
}

// countdown the time
function countDown() {
    console.table([hours, minutes, seconds])
    // https://stackoverflow.com/questions/20618355/how-to-write-a-countdown-timer-in-javascript
    // https://medium.com/geekculture/23-javascript-countdown-timer-for-website-273efc2f5618
}

// update display with the count down

// pause/resume function

// reset function

// set audio alert when time is done

// store set time in local host and retrive it if is there





startBtn.addEventListener("click", function(e) {
    processInputedTime();
});