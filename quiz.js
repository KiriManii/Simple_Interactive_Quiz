// Quiz Questions
const quizData = [
    { question: "What is 2 + 2?", choices: ["3", "4", "5"], correct: "4" },
    { question: "Which planet is known as the Red Planet?", choices: ["Earth", "Mars", "Venus"], correct: "Mars" },
    { question: "Who wrote 'To Kill a Mockingbird'?", choices: ["Harper Lee", "Mark Twain", "J.K. Rowling"], correct: "Harper Lee" }
];

let currentQuestionIndex = 0;
let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
let quizProgress = JSON.parse(localStorage.getItem("quizProgress")) || { index: 0, score: 0 };

// DOM Elements
const questionEl = document.getElementById("quiz-question");
const choicesContainer = document.getElementById("choices-container");
const submitBtn = document.getElementById("submit-answer");
const feedbackEl = document.getElementById("feedback");
const progressBar = document.getElementById("progress-bar");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("best-score");
const retryBtn = document.getElementById("retry-quiz");
const leaderboardEl = document.getElementById("leaderboard");

// Load Sounds
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

// Load Saved Progress
if (quizProgress.index < quizData.length) {
    currentQuestionIndex = quizProgress.index;
    score = quizProgress.score;
}

// Display Best Score
bestScoreEl.textContent = `Best Score: ${bestScore}`;

// Function to Load a Question
function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        endQuiz();
        return;
    }

    let currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    choicesContainer.innerHTML = "";

    currentQuestion.choices.forEach(choice => {
        let label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="quiz" value="${choice}"> ${choice}`;
        choicesContainer.appendChild(label);
    });

    // Update Progress Bar
    let progress = ((currentQuestionIndex / quizData.length) * 100);
    progressBar.value = progress;

    // Save Progress
    localStorage.setItem("quizProgress", JSON.stringify({ index: currentQuestionIndex, score: score }));
}

// Function to Check Answer
function checkAnswer() {
    let selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (!selectedOption) {
        feedbackEl.textContent = "Please select an answer.";
        return;
    }

    let userAnswer = selectedOption.value;
    let correctAnswer = quizData[currentQuestionIndex].correct;

    if (userAnswer === correctAnswer) {
        feedbackEl.textContent = "Correct! Well done.";
        score++;
        correctSound.play();
        navigator.vibrate?.(100); // Haptic Feedback
    } else {
        feedbackEl.textContent = "That's incorrect. Try again!";
        wrongSound.play();
        navigator.vibrate?.([200, 100, 200]); // Haptic Feedback
    }

    // Update Score Display
    scoreEl.textContent = `Score: ${score}`;

    // Move to Next Question
    currentQuestionIndex++;
    setTimeout(loadQuestion, 1000);
}

// Function to End Quiz
function endQuiz() {
    questionEl.textContent = "Quiz Completed!";
    choicesContainer.innerHTML = "";
    submitBtn.style.display = "none";
    retryBtn.style.display = "block";

    // Update Best Score
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
        bestScoreEl.textContent = `Best Score: ${bestScore}`;
    }

    // Save Score to Leaderboard
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    // Display Leaderboard
    leaderboardEl.innerHTML = leaderboard.slice(0, 5).map(s => `<li>Score: ${s}</li>`).join("");
    
    // Clear Progress
    localStorage.removeItem("quizProgress");
}

// Retry Quiz
retryBtn.addEventListener("click", () => {
    score = 0;
    currentQuestionIndex = 0;
    retryBtn.style.display = "none";
    submitBtn.style.display = "block";
    feedbackEl.textContent = "";
    scoreEl.textContent = "Score: 0";
    localStorage.removeItem("quizProgress");
    loadQuestion();
});

// Submit Answer Button
submitBtn.addEventListener("click", checkAnswer);

// Load First Question
loadQuestion();
