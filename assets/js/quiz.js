// assets/js/quiz.js

const QUESTIONS = [
  {
    q: "Қазақ халқының дәстүрлі баспанасы қалай аталады?",
    a: ["Киіз үй", "Сарай", "Көпқабатты үй", "Керуен-сарай"],
    correct: 0,
    hint: "Көшпелі өмір салтына арналған баспана."
  },
  {
    q: "Ұлттық тағамға қайсысы жатады?",
    a: ["Пицца", "Бешбармақ", "Суши", "Бургер"],
    correct: 1,
    hint: "Ет пен қамырдан жасалады."
  },
  {
    q: "Домбыра қандай музыкалық аспап?",
    a: ["Үрмелі", "Ысқышты", "Ішекті", "Ұрмалы"],
    correct: 2,
    hint: "Екі ішегі бар."
  },
  {
    q: "Наурыз мерекесі қай мезгілде тойланады?",
    a: ["Қыс", "Көктем", "Жаз", "Күз"],
    correct: 1,
    hint: "Жыл басы ретінде аталады."
  },
  {
    q: "Қазақтың ұлттық ойыны қайсы?",
    a: ["Көкпар", "Хоккей", "Футбол", "Баскетбол"],
    correct: 0,
    hint: "Ат үстінде ойналады."
  },
  {
    q: "Қонақ күту мәдениетінде ең негізгі ұстаным?",
    a: ["Қонақты күтпеу", "Қонаққа құрмет көрсету", "Қонақтан қашу", "Тек сыйлық сұрау"],
    correct: 1,
    hint: "«Қонақ келсе — құт» деген сөз бар."
  },
  {
    q: "Қазақта үлкенге құрмет белгісі ретінде не істейді?",
    a: ["Сәлем салу", "Айғайлау", "Күлу", "Елемеу"],
    correct: 0,
    hint: "Әсіресе келіндер жасайды."
  },
  {
    q: "Шаңырақ нені білдіреді?",
    a: ["Тек ағаш", "Үйдің төбесі ғана", "Отбасы, бірлік белгісі", "Киім атауы"],
    correct: 2,
    hint: "Елтаңбада да бар символ."
  },
  {
    q: "Қазақтың дәстүрлі сусындарының бірі?",
    a: ["Кока-кола", "Қымыз", "Лимонад", "Энергетик"],
    correct: 1,
    hint: "Жылқы сүтінен ашытылады."
  },
  {
    q: "«Жеті ата» дәстүрі не үшін маңызды?",
    a: ["Ойын ойнау үшін", "Туыстықты білу, тектілікті сақтау үшін", "Сауда жасау үшін", "Сурет салу үшін"],
    correct: 1,
    hint: "Тектілік пен туыстық байланысқа қатысты."
  },
];

let idx = 0;
let score = 0;
let locked = false;

const startBtn = document.getElementById("startQuiz");
const quizBox = document.getElementById("quiz");
const resultBox = document.getElementById("result");

const qTitle = document.getElementById("qTitle");
const qText = document.getElementById("qText");
const answers = document.getElementById("answers");
const progress = document.getElementById("progress");
const hint = document.getElementById("hint");

const nextBtn = document.getElementById("nextBtn");
const scoreText = document.getElementById("scoreText");
const restartBtn = document.getElementById("restartBtn");

function renderQuestion() {
  locked = false;
  nextBtn.style.display = "none";
  answers.innerHTML = "";

  const item = QUESTIONS[idx];
  qTitle.textContent = `Сұрақ ${idx + 1}`;
  qText.textContent = item.q;
  progress.textContent = `${idx + 1}/${QUESTIONS.length}`;
  hint.textContent = item.hint ? `💡 Көмек: ${item.hint}` : "";

  item.a.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.style.textAlign = "left";
    btn.style.width = "100%";
    btn.textContent = text;

    btn.addEventListener("click", () => chooseAnswer(i, btn));
    answers.appendChild(btn);
  });
}

function chooseAnswer(choiceIndex, btnEl) {
  if (locked) return;
  locked = true;

  const item = QUESTIONS[idx];
  const allButtons = answers.querySelectorAll("button");

  // дұрыс жауапты бояу
  allButtons[item.correct].style.border = "2px solid #3ee18f";

  if (choiceIndex === item.correct) {
    score++;
    btnEl.style.border = "2px solid #3ee18f";
  } else {
    btnEl.style.border = "2px solid #ff6b6b";
  }

  nextBtn.style.display = "inline-block";
}

function next() {
  if (idx < QUESTIONS.length - 1) {
    idx++;
    renderQuestion();
  } else {
    finish();
  }
}

function finish() {
  quizBox.style.display = "none";
  resultBox.style.display = "block";

  scoreText.textContent = `Сіз ${QUESTIONS.length} сұрақтың ${score}-іне дұрыс жауап бердіңіз.`;
}

function start() {
  idx = 0;
  score = 0;
  resultBox.style.display = "none";
  quizBox.style.display = "block";
  renderQuestion();
}

function restart() {
  start();
}

if (startBtn) startBtn.addEventListener("click", start);
if (nextBtn) nextBtn.addEventListener("click", next);
if (restartBtn) restartBtn.addEventListener("click", restart);
