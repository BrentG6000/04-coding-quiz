var startButton = document.querySelector(".start-button");
var timerEl = document.querySelector(".timer-count");;
var questionEl = document.querySelector("#question");
var firstButtonEl = document.createElement("button");
var secondButtonEl = document.createElement("button");
var thirdButtonEl = document.createElement("button");
var fourthButtonEl = document.createElement("button");

var answerButtons = [firstButtonEl, secondButtonEl, thirdButtonEl, fourthButtonEl];
var i = 0;
var score = 0;
var quizDone = false;
var questions = ["question1", "question2"];
var answers = ["answer1", "answer2"];

var buttonChoices = [["A", "answer1", "C", "D"], ["E", "F", "answer2", "H"]];
var timerCount = 29;

function startQuiz() {
    timerEl.textContent = timerCount + 1;
    startButton.disabled = true;
    
    presentQuestion();
    startcountDown();
}

function startcountDown() {
    var timer = setInterval(() => {
        timerEl.textContent = timerCount;
        if (quizDone === true) {
            timerEl.textContent = timerCount;
        }
        else if (timerCount >= 0) {
            timerCount--;
        }
        else {
            timerEl.textContent = 0;
            endOfQuiz();
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
    percentRight = score / questions.length * 100;
    alert("Quiz is over. You got " + percentRight + "% of the questions right.");
}

function answerClick(event) {
    //event.preventDefault()
    var userAnswer = event.target.textContent;
    console.log(userAnswer);
    console.log(answers[i]);
    
    if (userAnswer === answers[i]) {
        console.log("correct");
        score++;
        if (i + 1 < questions.length) {
            i++;
            presentQuestion();
        }
        else {
            endOfQuiz();
        }
    }
    else {
        console.log("incorrect");
        if (i + 1 < questions.length && timerCount > 10) { 
            timerCount -= 10;
            i++;
            presentQuestion();
        }
        else {
            timerCount = 0;
            endOfQuiz();
        }
    }
}



startButton.addEventListener("click", startQuiz);
questionEl.addEventListener("click", answerClick);