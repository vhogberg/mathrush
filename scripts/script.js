// elements
const startButton = document.getElementById("start-button");
const submitAnswerButton = document.getElementById("submit-answer-button");
const menuView = document.getElementById("menu-view");
const gameView = document.getElementById("game-view");
const gameOverView = document.getElementById("game-over-view-container");
const answerField = document.getElementById("answer-field");

//menuView.classList.add("hidden");
//gameOverView.classList.add("hidden");

gameView.classList.add("hidden");
gameOverView.classList.add("hidden");


// global variables
let gameMode;
let number1;
let number2;
let correctAnswer;
let score = 0;
let numberOfAnsweredQuestions = 0;

startButton.addEventListener("click", start);
submitAnswerButton.addEventListener("click", checkAnswer);
answerField.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
})

startButton.disabled = true;

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("click", () => {
        startButton.disabled = false;
    });
});


// Start function that checks which radio button is toggled
function start() {
    menuView.classList.add("hidden");
    gameView.classList.remove("hidden");
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
    startTimer();
    generateQuestion();
}

// Function to generate a questions, checks which gamemode is toggled
function generateQuestion() {
    // gets two random integers from 1 to 10:
    number1 = Math.floor(Math.random() * 10) + 1;
    number2 = Math.floor(Math.random() * 10) + 1;

    let gameModeSymbol = "";

    if (gameMode == "addition") {
        correctAnswer = number1 + number2;
        console.log(number1);
        console.log(number2);
        console.log(correctAnswer);
        gameModeSymbol = " + ";
    }
    else if (gameMode == "subtraction") {
        correctAnswer = number1 - number2;
        console.log(number1);
        console.log(number2);
        console.log(correctAnswer);
        gameModeSymbol = " - ";
    }
    else if (gameMode == "multiplication") {
        correctAnswer = number1 * number2;
        console.log(number1);
        console.log(number2);
        console.log(correctAnswer);
        gameModeSymbol = " * ";
    }
    else if (gameMode == "division") {
        correctAnswer = number1 / number2;
        console.log(number1);
        console.log(number2);
        console.log(correctAnswer);
        gameModeSymbol = " / ";
    }

    // Display the question on screen
    document.getElementById("question").textContent = number1 + gameModeSymbol + number2;
    answerField.focus();
}

// Function to check user answer vs correct answer
function checkAnswer() {
    const userAnswer = answerField.value;
    if (userAnswer == correctAnswer) {
        score++;
        numberOfAnsweredQuestions++;
    }
    else {
        numberOfAnsweredQuestions++;
    }
    answerField.value = "";
    document.getElementById("score").textContent = score + "/" + numberOfAnsweredQuestions + " correct"
    // new questions
    generateQuestion();
}

function startTimer() {
    let startTime = 60;

    const countDown = document.getElementById("countdown");
    const interval = setInterval(function () {
        startTime--;
        if (startTime > 9) {
            countDown.textContent = "0:" + startTime;
        }
        else if (startTime <= 9) {
            countDown.textContent = "0:0" + startTime;
        }
        if (startTime <= 0) {
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