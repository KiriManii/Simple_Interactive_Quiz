// Function to check the selected answer
function checkAnswer() {
    // Define the correct answer
    let correctAnswer = "4";

    // Get the selected answer
    let selectedOption = document.querySelector('input[name="quiz"]:checked');

    // Get the feedback element
    let feedback = document.getElementById("feedback");

    // Check if an option is selected
    if (selectedOption) {
        let userAnswer = selectedOption.value;

        // Compare the answer and give feedback
        if (userAnswer === correctAnswer) {
            feedback.textContent = "Correct! Well done.";
            feedback.style.color = "green";
        } else {
            feedback.textContent = "That's incorrect. Try again!";
            feedback.style.color = "red";
        }
    } else {
        feedback.textContent = "Please select an answer.";
        feedback.style.color = "orange";
    }
}

// Attach the function to the button click event
document.getElementById("submit-answer").addEventListener("click", checkAnswer);
