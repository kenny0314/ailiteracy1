document.addEventListener('DOMContentLoaded', () => {
  // --- 質問データ ---
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
  const splash      = document.getElementById('splash');
  const startBtn    = document.getElementById('startBtn');
  const quizScreen  = document.getElementById('quiz');
  const resultScreen= document.getElementById('result');
  const questionEl  = document.getElementById('question');
  const choicesEl   = document.getElementById('choices');
  const timerEl     = document.getElementById('time');
  const nextBtn     = document.getElementById('next');
  const restartBtn  = document.getElementById('restart');
  const backBtn     = document.getElementById('backToStart');
  const scoreEl     = document.getElementById('scoreText');

  // --- スプラッシュ → クイズ開始 ---
  startBtn.addEventListener('click', () => {
    splash.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
  });

  // --- 再挑戦 ---
  restartBtn.addEventListener('click', () => {
    resetAll();
    quizScreen.classList.remove('hidden');
  });

  // --- スプラッシュへ戻る ---
  backBtn.addEventListener('click', () => {
    resetAll();
    splash.classList.remove('hidden');
  });

  // --- Nextボタン ---
  nextBtn.addEventListener('click', () => {
    current++;
    if (current < quiz.length) loadQuestion();
    else showResult();
  });

  // --- 全リセット関数 ---
  function resetAll() {
    clearInterval(timerId);
    current = 0; score = 0;
    quizScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    nextBtn.disabled = true;
  }

  // --- タイマー開始 ---
  function startTimer() {
    timeLeft = 15;
    timerEl.textContent = timeLeft;
    clearInterval(timerId);
    timerId = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerId);
        selectAnswer(null); // タイムアウト扱い
      }
    }, 1000);
  }

  // --- 問題ロード ---
  function loadQuestion() {
    nextBtn.disabled = true;
    choicesEl.innerHTML = '';
    const q = quiz[current];
    questionEl.textContent = q.question;
    q.choices.forEach((text, idx) => {
      const btn = document.createElement('button');
      btn.textContent = text;
      btn.addEventListener('click', () => selectAnswer(idx));
      choicesEl.appendChild(btn);
    });
    startTimer();
  }

  // --- 回答処理 ---
  function selectAnswer(idx) {
    clearInterval(timerId);
    Array.from(choicesEl.children).forEach((btn, i) => {
      btn.disabled = true;
      btn.style.background = (i === quiz[current].answer)
        ? '#c8e6c9' : '#ffcdd2';
    });
    if (idx === quiz[current].answer) score++;
    nextBtn.disabled = false;
  }

  // --- 結果表示 ---
  function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreEl.textContent = `${score} / ${quiz.length}`;
  }
});
