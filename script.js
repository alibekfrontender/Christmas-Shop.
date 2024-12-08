const sliderRow = document.querySelector(".slider__row");
const sliderCards = document.querySelectorAll(".slider-card");
const leftButton = document.querySelector(".btn-left");
const rightButton = document.querySelector(".btn-right");

let clickCount;
let visibleArea = sliderRow.clientWidth;
let totalWidth = Array.from(sliderCards).reduce(
    (acc, curr) => acc + curr.clientWidth,
    0
);

let offset;
let currentPosition = 0;

setClickCount();
setButtonState();

window.addEventListener("resize", () => {
    visibleArea = sliderRow.clientWidth;
    totalWidth = Array.from(sliderCards).reduce(
        (acc, curr) => acc + curr.clientWidth,
        0
    );
    setClickCount();
    setButtonState();
});

function setClickCount() {
    window.innerWidth >= 769 ? (clickCount = 3) : (clickCount = 6);
    offset = (totalWidth - visibleArea + 60) / clickCount;
}

function setButtonState() {
    if (currentPosition <= 0) {
        leftButton.disabled = true;
        leftButton.classList.remove("btn-active");
        leftButton.classList.add("btn-disabled");
    } else {
        leftButton.disabled = false;
        leftButton.classList.add("btn-active");
        leftButton.classList.remove("btn-disabled");
    }

    if (currentPosition >= totalWidth - visibleArea) {
        rightButton.disabled = true;
        rightButton.classList.remove("btn-active");
        rightButton.classList.add("btn-disabled");
    } else {
        rightButton.disabled = false;
        rightButton.classList.add("btn-active");
        rightButton.classList.remove("btn-disabled");
    }
}

function sliderMoveRight() {
    if (currentPosition < totalWidth - visibleArea) {
        currentPosition += offset;
        sliderCards.forEach((card) => {
            card.style.transform = `translateX(-${currentPosition}px)`;
        });
        setButtonState();
    }
}

function sliderMoveLeft() {
    if (currentPosition > 0) {
        currentPosition -= offset;
        sliderCards.forEach((card) => {
            card.style.transform = `translateX(-${currentPosition}px)`;
        });
        setButtonState();
    }
}

rightButton.addEventListener("click", sliderMoveRight);
leftButton.addEventListener("click", sliderMoveLeft);


// time

// Countdown target date (1st January 2025)
const targetDate = new Date("January 1, 2025 00:00:00").getTime();

// Function to update the countdown every second
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        clearInterval(timerInterval); // Stop the timer when the target date is reached
        document.querySelector('.timer-container').innerHTML = "Countdown finished!";
        return;
    }

    // Calculate time components
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the HTML elements with the new time values
    document.querySelector('.timer-day').textContent = days;
    document.querySelector('.timer-hour').textContent = hours;
    document.querySelector('.timer-minute').textContent = minutes;
    document.querySelector('.timer-second').textContent = seconds;
}

// Update the countdown every second
const timerInterval = setInterval(updateCountdown, 1000);
