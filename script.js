// script.js
let timeLeft = 25 * 60; // Default
let timerInterval;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('status');
const durationInput = document.getElementById('duration');
const presetButtons = document.querySelectorAll('.preset');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const displayString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timerDisplay.textContent = displayString;

    // Visual warning for last 10 seconds
    if (timeLeft <= 10 && timeLeft > 0) {
        timerDisplay.classList.add('warning');
        statusDisplay.textContent = '⏰ Finishing soon! Hurry up!';
    } else {
        timerDisplay.classList.remove('warning');
    }
}

function setDuration(minutes) {
    const min = Math.max(1, Math.min(60, parseInt(minutes) || 25));
    timeLeft = min * 60;
    durationInput.value = min;
    updateDisplay();
    statusDisplay.textContent = `Set to ${min} minutes. Ready to focus?`;

    // Clear warning
    timerDisplay.classList.remove('warning');

    // Update active preset
    presetButtons.forEach(btn => btn.classList.remove('active'));
    if (presetButtons[0].dataset.minutes == min) presetButtons[0].classList.add('active');
    else if (presetButtons[1].dataset.minutes == min) presetButtons[1].classList.add('active');
    else if (presetButtons[2].dataset.minutes == min) presetButtons[2].classList.add('active');
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    statusDisplay.textContent = "Focus in progress...";
    timerDisplay.classList.remove('warning');
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
    timerDisplay.classList.remove('warning');
}

function resetTimer() {
    stopTimer();
    setDuration(durationInput.value); // Use current selected
}

// Event listeners
presetButtons.forEach(btn => {
    btn.addEventListener('click', () => setDuration(btn.dataset.minutes));
});

durationInput.addEventListener('input', () => setDuration(durationInput.value));

// Initialize
updateDisplay();

