const questions = [
  {
    options: ["12345678", "password123", "P@ssword!", "blue-coffee-sunset-99"],
    correct: 3,
    explanation: "Passphrases with multiple random words and numbers are extremely long, easy to remember, and virtually impossible to crack!"
  },
  {
    options: ["Admin2024", "Tr0ub4dou&3", "correct-horse-battery", "ilovecats"],
    correct: 2,
    explanation: "Longer passphrases (16+ chars) beat short complex codes because brute-force attacks scale exponentially with length."
  },
  {
    options: ["Qwerty12345", "9$kM#2pL!1xZ", "MyNameIsAlex99", "dog123456"],
    correct: 1,
    explanation: "High entropy with mixed symbols, uppercase, lowercase, and numbers prevents dictionary and lookup table attacks."
  },
  {
    options: ["Summer2023!", "coffee-mug-desk-lamp", "Welcome123", "1122334455"],
    correct: 1,
    explanation: "Avoid seasonal or common terms like 'Summer2023'. Unique passphrases keep accounts secure."
  },
  {
    options: ["password", "letmein123", "xK9#vP2!mL9Q$", "12341234"],
    correct: 2,
    explanation: "Completely randomized character sequences offer high security against automated guessers."
  }
];

let currentIndex = 0;
let totalScore = 0;

const gameScreen = document.getElementById('gameScreen');
const resultScreen = document.getElementById('resultScreen');
const currentQEl = document.getElementById('currentQ');
const scoreEl = document.getElementById('score');
const optionsGrid = document.getElementById('optionsGrid');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const finalScoreEl = document.getElementById('finalScore');
const rankTextEl = document.getElementById('rankText');
const restartBtn = document.getElementById('restartBtn');

function loadQuestion() {
  const q = questions[currentIndex];
  currentQEl.textContent = currentIndex + 1;
  feedbackEl.classList.add('hidden');
  nextBtn.classList.add('hidden');
  optionsGrid.innerHTML = '';

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleSelect(idx));
    optionsGrid.appendChild(btn);
  });
}

function handleSelect(selectedIndex) {
  const q = questions[currentIndex];
  const buttons = optionsGrid.querySelectorAll('.opt-btn');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) {
      btn.classList.add('correct');
    } else if (idx === selectedIndex) {
      btn.classList.add('wrong');
    }
  });

  feedbackEl.classList.remove('hidden', 'correct', 'wrong');

  if (selectedIndex === q.correct) {
    totalScore += 10;
    scoreEl.textContent = totalScore;
    feedbackEl.classList.add('correct');
    feedbackEl.innerHTML = `<strong>✅ Correct!</strong> ${q.explanation}`;
  } else {
    feedbackEl.classList.add('wrong');
    feedbackEl.innerHTML = `<strong>❌ Incorrect.</strong> ${q.explanation}`;
  }

  nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  gameScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  finalScoreEl.textContent = totalScore;

  if (totalScore === 50) {
    rankTextEl.textContent = "🏆 Master Defender! You know your password security inside and out.";
  } else if (totalScore >= 30) {
    rankTextEl.textContent = "🛡️ Cyber Guard! Good job, but remember length beats complexity!";
  } else {
    rankTextEl.textContent = "⚠️ Rookie! Review password rules to protect your accounts.";
  }
}

restartBtn.addEventListener('click', () => {
  currentIndex = 0;
  totalScore = 0;
  scoreEl.textContent = '0';
  resultScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  loadQuestion();
});

// Initialize game
loadQuestion();
