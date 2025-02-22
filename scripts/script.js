// global elements
const startButton = document.getElementById("start-button");
const submitAnswerButton = document.getElementById("submit-answer-button");
const menuView = document.getElementById("menu-view");
const gameView = document.getElementById("game-view");
const gameOverView = document.getElementById("game-over-view-container");
const answerField = document.getElementById("answer-field");

// global variables
let gameMode;
let number1;
let number2;
let correctAnswer;
let score = 0;
let numberOfAnsweredQuestions = 0;

// innitially hide these
gameView.classList.add("hidden");
gameOverView.classList.add("hidden");

startButton.addEventListener("click", start);

// user can use either the submit button or enter key to submit their answer
submitAnswerButton.addEventListener("click", checkAnswer);
answerField.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
})

// disable this initially so player can't start without a mode. enable when mode selected
startButton.disabled = true;
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("click", () => {
        startButton.disabled = false;
    });
});

// Start function that checks which radio button is toggled
function start() {
    // unhide game view
    menuView.classList.add("hidden");
    gameView.classList.remove("hidden");

    // check which mode is selected, add color specific classes to views.
    if (document.getElementById("addition-radio-button").checked) {
        gameMode = "addition";
        gameView.classList.add("addition");
        gameOverView.classList.add("addition");
    } else if (document.getElementById("subtraction-radio-button").checked) {
        gameMode = "subtraction";
        gameView.classList.add("subtraction");
        gameOverView.classList.add("subtraction");
    }
    else if (document.getElementById("multiplication-radio-button").checked) {
        gameMode = "multiplication";
        gameView.classList.add("multiplication");
        gameOverView.classList.add("multiplication");
    }
    else if (document.getElementById("division-radio-button").checked) {
        gameMode = "division";
        gameView.classList.add("division");
        gameOverView.classList.add("division");
    }
    // start the selected gamemode
    startTimer();
    generateQuestion();
}

// Function to generate a questions, checks which gamemode is toggled
function generateQuestion() {
    // gets two random integers from 1 to 10:
    number1 = Math.floor(Math.random() * 10) + 1;
    number2 = Math.floor(Math.random() * 10) + 1;

    let gameModeSymbol = "";

    // generate correct answers depending on gamemode
    if (gameMode == "addition") {
        correctAnswer = number1 + number2;
        gameModeSymbol = " + ";
    }
    else if (gameMode == "subtraction") {
        correctAnswer = number1 - number2;
        gameModeSymbol = " - ";
    }
    else if (gameMode == "multiplication") {
        correctAnswer = number1 * number2;
        gameModeSymbol = " * ";
    }
    else if (gameMode == "division") {
        correctAnswer = number1 / number2;
        gameModeSymbol = " / ";
    }

    // Display the question on screen, focus on inputfield
    document.getElementById("question").textContent = number1 + gameModeSymbol + number2;
    answerField.focus();
}

// Function to check user answer vs correct answer
function checkAnswer() {
    const userAnswer = answerField.value;
    if (userAnswer == correctAnswer) {
        score++; // increase score by one
        numberOfAnsweredQuestions++; // increase answered questions by one
    }
    else {
        numberOfAnsweredQuestions++; // increase answered questions by one
    }
    answerField.value = ""; // reset input field
    document.getElementById("score").textContent = score + "/" + numberOfAnsweredQuestions + " correct"
    // new question
    generateQuestion();
}

// Function for the minute-timer
function startTimer() {
    let startTime = 60; // 1 minute / 60 seconds

    const countDown = document.getElementById("countdown");
    // setInterval(), every 1 second.
    const interval = setInterval(function () {
        startTime--;
        // below is done to show minute like this: 0:03, 0:23 instead of 0:3, 0:23
        if (startTime > 9) {
            countDown.textContent = "0:" + startTime;
        }
        else if (startTime <= 9) {
            countDown.textContent = "0:0" + startTime;
        }
        if (startTime <= 0) { // time is up
            clearInterval(interval);
            gameOver();
        }
    }, 1000); // once every second
}

// Function that triggers when timer runs out, game is over
function gameOver() {
    gameView.classList.add("hidden");
    gameOverView.classList.remove("hidden");
    document.getElementById("final-score").textContent = "You got " + score + "/" + numberOfAnsweredQuestions + " correct!"
}

// Return to menu, reset score etc.
document.getElementById("return-to-menu-button").addEventListener("click", () => {
    score = 0;
    numberOfAnsweredQuestions = 0;
    number1 = 0;
    number2 = 0;
    correctAnswer = 0;
    answerField.value = "";
    document.getElementById("score").textContent = "0/0 correct"
    menuView.classList.remove("hidden");
    gameOverView.classList.add("hidden");
})