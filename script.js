var startButton = document.querySelector(".start-button");
var timerEl = document.querySelector(".timer-count");;
var questionEl = document.querySelector("#question");
var firstButtonEl = document.createElement("button");
var secondButtonEl = document.createElement("button");
var thirdButtonEl = document.createElement("button");
var fourthButtonEl = document.createElement("button");

var answerButtons = [firstButtonEl, secondButtonEl, thirdButtonEl, fourthButtonEl];

var questions = ["question1", "question2"];
var answers = ["answer1", "answer2"];

var buttonChoices = [["A", "B", "C", "D"], ["E", "F", "G", "H"]];
var timerCount = 99;

function startQuiz() {
    timerEl.textContent = 100;
    startButton.disabled = true;
    startcountDown();
    presentQuestions();
}

function startcountDown() {
    var timer = setInterval(() => {
        timerEl.textContent = timerCount;
        if (timerCount > 0) {
            timerCount--;
        }
        else {
            clearInterval(timer);
        }
    }, 1000);
}

function presentQuestions() {
    questionEl.textContent = questions[0];
    
    for (var i = 0; i < answerButtons.length; i++) {
        answerButtons[i].textContent = buttonChoices[0][i]
    }
   
    for (var i = 0; i < answerButtons.length; i++){
        questionEl.appendChild(answerButtons[i]);
    }
}

startButton.addEventListener("click", startQuiz);