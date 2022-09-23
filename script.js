var startButton = document.querySelector(".start-button");
var timer = document.querySelector("#timer")
var timerEl = document.querySelector(".timer-count");;
var questionEl = document.querySelector("#question");
var questionButtons = document.querySelector('#question-buttons');
var firstButtonEl = document.createElement("button");
var secondButtonEl = document.createElement("button");
var thirdButtonEl = document.createElement("button");
var fourthButtonEl = document.createElement("button");

var answerButtons = [firstButtonEl, secondButtonEl, thirdButtonEl, fourthButtonEl]; 
var i = 0;
var score = 0;
var quizDone = false;
var questions = [
    "How would you store the string variable 'userName' to a local storage variable named 'user'?",
    "How would you create a button element named 'button' in JavaScript?",
    "How would you create a click event handler for a button variable named startButton if its callback function is named startQuiz?",
    "What do you add to the block of an event handler's callback function to prevent event bubbling?",
    "What function is typically used for timer intervals?"
];
var answers = [
    "localStorage.setItem('user', JSON.stringify(userName))",
    "var button = document.createElement('button')",
    "startButton.addEventListener('click', startQuiz)",
    "event.preventDefault()",
    "setInterval()"
];
var user = {
    intials: "",
    score: ""
};
var buttonChoices = [
    ["localStorage.Item('user', JSON.stringify(userName))", "localStorage.setItem('user', JSON.stringify(userName))", "localStorage.set('user', JSON.stringify(userName))", "localStorage.setItem('user', stringify(userName))"],
    ["var button = document.createEl('button')", "var button = createElement('button')", "var button = document.createElement('button')", "var button = document.create('button')"],
    ["startButton.addEventListener('click', startQuiz)", "startButton.addEvent('click', startQuiz)", "startButton.addEventListener(startQuiz)", "startButton.addListener('click', startQuiz)"],
    ["event.prevent()", "event.preventDefault(event)", "event.Default()", "event.preventDefault()"],
    ["set.Interval()", "Interval()", "setinterval()", "setInterval()"]
];
var timerCount = 99;
var verified = false;

// This is the function that starts the program after the event listener for the start button triggers it
function startQuiz() {
    timerEl.textContent = timerCount + 1; // Sets the count to 100. Setting timerCount created a delay of 1 second for the start of the clock
    startButton.disabled = true; // Stops the start button from being clicked after the quiz starts
    startButton.setAttribute("style", "display:none;"); // Makes the start button disappear after the quiz starts 
    timer.setAttribute("style", "display:flex;"); // Makes the timer visiable after the quiz starts
    presentQuestion();
    startcountDown();
}

function startcountDown() {
    var timer = setInterval(() => {
        timerEl.textContent = timerCount; // Time is displayed on page
        if (quizDone === true) { // If the quiz is done the clock stops in place
            timerEl.textContent = timerCount;
            clearInterval(timer);
        }
        else if (timerCount >= 0) { // Timer counts down by one second every second
            timerCount--;
        }
        else {
            timerEl.textContent = 0; // Countdown stops at 0 and quiz is over
            clearInterval(timer);
            endOfQuiz();
        }
    }, 1000);
}

function presentQuestion() {
    questionEl.textContent = questions[i]; // Question at index i is displayed
    
    for (var j = 0; j < answerButtons.length; j++) { // For loop creates answers for each answer button
        answerButtons[j].textContent = buttonChoices[i][j]
    }
   
    for (var k = 0; k < answerButtons.length; k++){ // For loop displays answer buttons on page
        questionButtons.appendChild(answerButtons[k]);
    }
}

function endOfQuiz() {
    quizDone = true; // setInterval() will read this and stop
    percentRight = score / questions.length * 100;
    alert("Quiz is over. You got " + percentRight + "% of the questions right.");
    var saveScore = confirm("Would you like to save your score?");
    if (saveScore) {
        while (!verified) {
            userInt = prompt("Enter your intials (max 3 letters):");
            
            if(userInt.length < 4) {
                user.intials = userInt;
                user.score = score;
                localStorage.setItem("user", JSON.stringify(user));
                alert("Your score was saved");
                verified = true;
            }
            else {
                alert("Too many letters. Try again.");
            }
         }
    }

    /* Attempted to allow the user to take the quiz again, but the timer would run twice as fast. I think setInterval() is still running, but I was
    // unable to fix it.
    // var playAgain = confirm("Would you like to take the quiz again?")
    // if (playAgain) {
    //     i = 0;
    //     score = 0;
    //     quizDone = false;
    //     timerCount = 99;
    //     verified = false;
    //     startQuiz();
    // } */
}

function answerClick(event) {
    event.preventDefault(); // Stops event bubbling
    var userAnswer = event.target.textContent; // Answer text from the button that was clicked
    
    if (userAnswer === answers[i]) { // Compares the answer clicked to the current answer
        console.log("correct");
        score++;
        if (i + 1 < questions.length) { // Is there one more question?
            i++;
            presentQuestion();
        }
        else {
            endOfQuiz();
        }
    }
    else {
        console.log("incorrect");
        if (i + 1 < questions.length && timerCount > 10) { // Is there one more question and is there enough time left after the 10 second reduction?
            timerCount -= 10;
            i++;
            presentQuestion();
        }
        else {
            timerCount = 0; // If not, end the quiz now
            endOfQuiz();
        }
    }
}

startButton.addEventListener("click", startQuiz);
questionButtons.addEventListener("click", answerClick);