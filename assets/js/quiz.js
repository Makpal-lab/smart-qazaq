const questions = [
  {
    question: "«Адамның күні адаммен» деген сөз нені білдіреді?",
    answers: [
      { text: "Адам адамға көмектесуі керек", correct: true },
      { text: "Адам жалғыз өмір сүреді", correct: false },
      { text: "Ақша бәрінен маңызды", correct: false }
    ]
  },
  {
    question: "Қайсысы ұлттық құндылыққа жатады?",
    answers: [
      { text: "Тіл мен дәстүр", correct: true },
      { text: "Компьютер ойыны", correct: false },
      { text: "Телефон", correct: false }
    ]
  },
  {
    question: "«Өмір — өткінші, өнер — мәңгі» дегеннің мағынасы?",
    answers: [
      { text: "Өнер ешқашан өлмейді", correct: true },
      { text: "Өмір ұзақ", correct: false },
      { text: "Өнер қажет емес", correct: false }
    ]
  }
];

let currentQuestion = 0;
let score = 0;

function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("quizScreen").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.className = "btn";
    btn.onclick = () => selectAnswer(answer.correct);
    answersDiv.appendChild(btn);
  });

  document.getElementById("progress").innerText =
    `Сұрақ ${currentQuestion + 1} / ${questions.length}`;
}

function selectAnswer(correct) {
  if (correct) score++;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "block";

  document.getElementById("scoreText").innerText =
    `Сен ${questions.length} сұрақтың ${score}-іне дұрыс жауап бердің!`;
}
