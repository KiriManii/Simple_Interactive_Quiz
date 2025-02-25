// Array of quiz questions
const questions = [
    {
        question: "What is 2 + 2?",
        choices: ["4", "22", "3"],
        correct: "4"
    },
    {
        question: "Which is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris"],
        correct: "Paris"
    },
    {
        question: "What is the color of the sky?",
        choices: ["Blue", "Red", "Green"],
        correct: "Blue"
    }
];

let currentQuestionIndex = 0; // Track current question
let score = 0; // Track correct answers

const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("quiz-question");
const choicesContainer = document.getElementById("choices-container");
const feedbackElement = document.getElementById("feedback");
const submitButton = document.getElementById("submit-answer");
const nextButton = document.getElementById("next-question");
const prevButton = document.getElementById("prev-question");

// Function to load a question
function loadQuestion() {
    let currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    
    // Clear previous choices
    choicesContainer.innerHTML = "";

    // Create radio buttons for each choice
    currentQuestion.choices.forEach(choice => {
        let radioBtn = document.createElement("input");
        radioBtn.type = "radio";
        radioBtn.name = "quiz";
        radioBtn.value = choice;

        let label = document.createElement("label");
        label.textContent = choice;

        choicesContainer.appendChild(radioBtn);
        choicesContainer.appendChild(label);
        choicesContainer.appendChild(document.createElement("br"));
    });

    feedbackElement.textContent = ""; // Clear feedback
}

// Check the selected answer
function checkAnswer() {
    let selectedOption = document.querySelector('input[name="quiz"]:checked');

    if (!selectedOption) {
        feedbackElement.textContent = "Please select an answer!";
        return;
    }

    if (selectedOption.value === questions[currentQuestionIndex].correct) {
        feedbackElement.textContent = "Correct! 🎉";
        feedbackElement.style.color = "green";
        score++; // Increase score
    } else {
        feedbackElement.textContent = "Incorrect! ❌";
        feedbackElement.style.color = "red";
    }
}

// Move to the next question
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        quizContainer.innerHTML = `<h2>Quiz Completed! 🎉</h2><p>Your Score: ${score}/${questions.length}</p>`;
    }
}

// Move to the previous question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Add event listeners
submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);
prevButton.addEventListener("click", prevQuestion);

// Load the first question on page load
loadQuestion();
