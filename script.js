// script.js
let timeLeft = 25 * 60; // 25 minutes in seconds
let timerInterval;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('status');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Add leading zero if seconds < 10 (e.g., 09)
    const displayString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timerDisplay.textContent = displayString;
}

function startTimer() {
    if (isRunning) return; // Prevent multiple clicks

    isRunning = true;
    statusDisplay.textContent = "Focus in progress...";

    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            isRunning = false;
            statusDisplay.textContent = "Time's up! Take a break.";
            alert("Time's up!");
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    statusDisplay.textContent = "Timer paused.";
}

function resetTimer() {
    stopTimer();
    timeLeft = 25 * 60;
    updateDisplay();
    statusDisplay.textContent = "Ready to focus?";
}

// Initialize
updateDisplay();