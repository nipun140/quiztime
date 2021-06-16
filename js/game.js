const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const scoretext = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const progressText = document.querySelector("#progressText");

//these values will change so they are let
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;

let availableQuestions = [];

let questions = [
  {
    question: "what is 2+2?",
    choice1: "2",
    choice2: "1",
    choice3: "3",
    choice4: "4",
    answer: 4,
  },
  {
    question: "what is 1+1?",
    choice1: "2",
    choice2: "3",
    choice3: "2",
    choice4: "1",
    answer: 1,
  },
  {
    question: "what is 5-5?",
    choice1: "0",
    choice2: "3",
    choice3: "3",
    choice4: "4",
    answer: 1,
  },
  {
    question: "what is 10/2?",
    choice1: "10",
    choice2: "10",
    choice3: "5",
    choice4: "6",
    answer: 3,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

//set all values to initial Zero for new game and load the new question
let startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

let getNewQuestion = () => {
  //if we exceed the no of questions in game -end the game
  if (availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("end.html"); //redirect to end page
  } else {
    questionCounter++;
    progressText.innerHTML = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    //current question index
    // let questionIndex = 0; //order main questions ayenge
    let questionIndex = Math.floor(Math.random() * availableQuestions.length); //random order main questions ayenge

    //current question we are on..it is in object
    currentQuestion = availableQuestions[questionIndex];

    //setting the text inside the question element in DOM
    question.innerHTML = currentQuestion.question;

    //seting the choices
    choices.forEach((choice) => {
      const number = choice.dataset.number; //from the data- attribute of thst choice
      choice.innerHTML = currentQuestion["choice" + number]; //fill the data according to multiple choices data in the question object
    });

    availableQuestions.splice(questionIndex, 1); //remove the question from the availablequestions array once it is displayed

    acceptingAnswers = true; //after displaying the data in DOM ,we can accept answers
  }
};

//adding event listeners on each choice element when clicked
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) {
      return; //do nothing if we are not acceptiong answers once one answer is submitted,maybe the user clicks the submitted answer again or any other answer we dont want anything to happen simply return
    }
    acceptingAnswers = false; //acepting answer will become false once clicked i.e when one answer is submitted

    const selectedChoice = e.target; //the elementid which was clicked
    const selectedAnswer = selectedChoice.dataset.number; //the value of data-number attribute of selected choice

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; //checking which class to apply to the choice clicked to show green or red color(== operator checks only value )

    if (classToApply == "correct") {
      incrementScore(SCORE_POINTS); //increase the score
    }
    selectedChoice.parentElement.classList.add(classToApply); //selected choice element ke parent(choice-container) ko class add karni hai

    //after some time after answering the ques we need to change the question and remove the class applied
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply); //remove the added class from that choice-container
      getNewQuestion();
    }, 1000);
  });
});

const incrementScore = (num) => {
  score += num;
  scoretext.innerHTML = score; //score display in DOM
};

startGame();
