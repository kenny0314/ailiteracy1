// --- クイズデータ ---
const quiz = [
  {
    question: "1. Which clue often reveals an AI-generated image?",
    choices: [
      "Odd reflections in eyes or glasses",
      "Perfectly even skin textures",
      "Visible camera model in EXIF data",
      "High contrast highlights"
    ],
    answer: 0
  },
  {
    question: "2. Which writing pattern hints at AI-generated text?",
    choices: [
      "Short, concise sentences",
      "Repetitive filler phrases",
      "Use of personal anecdotes",
      "Frequent hyperlinks"
    ],
    answer: 1
  },
  {
    question: "3. What metadata helps verify an article’s authenticity?",
    choices: [
      "Author name and publish date",
      "File’s byte size",
      "Font family",
      "Number of images"
    ],
    answer: 0
  },
  {
    question: "4. Which tool can assist in detecting AI-written text?",
    choices: [
      "OpenAI AI Text Classifier",
      "Google Docs Grammar Check",
      "Mendeley Reference Manager",
      "YouTube Auto-caption"
    ],
    answer: 0
  },
  {
    question: "5. A headline reads “Miracle cure—100% guaranteed!” What’s your first step?",
    choices: [
      "Share on social media",
      "Search fact-check sites like Snopes",
      "Trust because it sounds confident",
      "Ignore entire article"
    ],
    answer: 1
  }
];

let current = 0, score = 0, timeLeft = 15, timerId;

// --- DOM 要素取得 ---
const splash       = document.getElementById('splash');
const startBtn     = document.getElementById('startBtn');
const quizDiv      = document.getElementById('quiz');
const timerEl      = document.getElementById('time');
const questionEl   = document.getElementById('question');
const choicesEl    = document.getElementById('choices');
const nextBtn      = document.getElementById('next');
const resultDiv    = document.getElementById('result');
const scoreEl      = document.getElementById('scoreText');
const restartBtn   = document.getElementById('restart');
const backToStart  = document.getElementById('backToStart');

// --- イベントリスナ設定 ---
// スプラッシュ → クイズ
startBtn.addEventListener('click', () => {
  splash.classList.add('hidden');
  quizDiv.classList.remove('hidden');
  showQuestion();
});

// 再挑戦
restartBtn.addEventListener('click', () => {
  current = 0; score = 0;
  resultDiv.classList.add('hidden');
  quizDiv.classList.add('hidden');
  splash.classList.remove('hidden');
});

// スプラッシュに戻る
backToStart.addEventListener('click', () => {
  current = 0; score = 0;
  resultDiv.classList.add('hidden');
  splash.classList.remove('hidden');
});

// --- タイマー起動 ---
function startTimer() {
  timeLeft = 15;
  timerEl.textContent = timeLeft;
  timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerId);
      lockChoices();
    }
  }, 1000);
}

// --- 問題表示 ---
function showQuestion() {
  clearInterval(timerId);
  startTimer();
  nextBtn.disabled = true;
  const item = quiz[current];
  questionEl.textContent = item.question;
  choicesEl.innerHTML = '';
  item.choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.onclick = () => selectAnswer(idx);
    choicesEl.appendChild(btn);
  });
}

// --- 回答処理 ---
function selectAnswer(idx) {
  clearInterval(timerId);
  lockChoices();
  if (idx === quiz[current].answer) score++;
  nextBtn.disabled = false;
}

// --- 選択肢ロック & 色付け ---
function lockChoices() {
  Array.from(choicesEl.children).forEach((btn, idx) => {
    btn.disabled = true;
    btn.style.background = (idx === quiz[current].answer)
      ? '#c8e6c9' : '#ffcdd2';
  });
}

// --- 次へ or 結果表示 ---
nextBtn.addEventListener('click', () => {
  current++;
  if (current < quiz.length) showQuestion();
  else showResult();
});

// --- 結果画面表示 ---
function showResult() {
  quizDiv.classList.add('hidden');
  resultDiv.classList.remove('hidden');
  scoreEl.textContent = `${score} / ${quiz.length}`;
}
