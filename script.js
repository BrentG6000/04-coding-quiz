var startButton = document.querySelector(".start-button");
var timerEl = document.querySelector(".timer-count");;
var questionEl = document.querySelector("#question");
var firstButtonEl = document.createElement("button");
var secondButtonEl = document.createElement("button");
var thirdButtonEl = document.createElement("button");
var fourthButtonEl = document.createElement("button");

var answerButtons = [firstButtonEl, secondButtonEl, thirdButtonEl, fourthButtonEl];
var i = 0;
var quizDone = false;
var questions = ["question1", "question2"];
var answers = ["answer1", "answer2"];

var buttonChoices = [["A", "answer1", "C", "D"], ["E", "F", "answer2", "H"]];
var timerCount = 99;

function startQuiz() {
    timerEl.textContent = 100;
    startButton.disabled = true;
    startcountDown();
    presentQuestion();
}

function startcountDown() {
    var timer = setInterval(() => {
        timerEl.textContent = timerCount;
        if (quizDone === true) {
            timerEl.textContent = timerCount;
        }
        else if (timerCount > 0) {
            timerCount--;
        }
        else {
            clearInterval(timer);
        }
    }, 1000);
}

function presentQuestion() {
    questionEl.textContent = questions[i];
    
    for (var j = 0; j < answerButtons.length; j++) {
        answerButtons[j].textContent = buttonChoices[i][j]
    }
   
    for (var k = 0; k < answerButtons.length; k++){
        questionEl.appendChild(answerButtons[k]);
    }
}

function endOfQuiz() {
    quizDone = true;
    alert("Quiz is over.");
}

function answerClick(event) {
    //event.preventDefault()
    var userAnswer = event.target.textContent;
    console.log(userAnswer);
    console.log(answers[i]);
    
    if (userAnswer === answers[i]) {
        console.log("Correct");
    }
    else {
        console.log("incorrect");
        if (i + 1 < questions.length && timerCount >= 10) { 
            timerCount -= 10;
            presentQuestion();
        }
        else if (i + 1 >= questions.length) {
            endOfQuiz();
        }
        else {
            timerCount = 0;
            endOfQuiz();
        }
    }
    
    i++

    // if (i < questions.length) {
    //     presentQuestion();
    // }
    // else {
    //     timerEl.textContent = timerCount;
    //     endOfQuiz();
    // }
}



startButton.addEventListener("click", startQuiz);
questionEl.addEventListener("click", answerClick);