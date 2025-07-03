const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices-list");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: [
      "Charles Dickens",
      "Jane Austen",
      "William Shakespeare",
      "Mark Twain",
    ],
    answer: "William Shakespeare",
  },
];

let currentQuestion = 0;
let score = 0;
let currentlySelected = null;
let timerValue = undefined;

restartBtn.addEventListener('click',()=>{
    currentQuestion = 0;
    score = 0;
    currentlySelected = null;
    resultContainer.classList.add('hidden');
    startBtn.classList.remove('hidden');
})

nextBtn.addEventListener('click',()=>{
    clearInterval(timerValue);
    if(currentlySelected !==null){
        if(currentlySelected.textContent === questions[currentQuestion].answer)score++;
    }
    currentQuestion++;
    currentlySelected = null;
    if(currentQuestion < questions.length){
        if(nextBtn.classList.contains('hidden'))nextBtn.classList.add('hidden');
        RenderQuestion(currentQuestion);
    }
    else{
        questionContainer.classList.add('hidden');
        if (!nextBtn.classList.contains("hidden"))
          nextBtn.classList.add("hidden");
        resultContainer.classList.remove('hidden');
        scoreDisplay.textContent = `${score} out of ${questions.length}`;
    }
})

function RenderQuestion(number){
    if(number === 0){
        startBtn.classList.add('hidden');
        questionContainer.classList.remove('hidden');
    }

    questionText.innerText = questions[number].question;
    choicesList.innerHTML = "";
    questions[number].choices.forEach(choice => {
        const li = document.createElement('li');
        li.innerText = choice;
        choicesList.appendChild(li);
        li.addEventListener('click',()=>{
            if(currentlySelected === null){
                li.classList.add('selected');
                currentlySelected=li;
                nextBtn.classList.remove('hidden');
            }
            else{
                currentlySelected.classList.remove('selected');
                li.classList.add("selected");
                currentlySelected=li;
            }
        })
    });
    timerValue = setInterval(function () {
      nextBtn.click();
    }, 10000);
}


startBtn.addEventListener('click',()=>{
    RenderQuestion(currentQuestion);
})