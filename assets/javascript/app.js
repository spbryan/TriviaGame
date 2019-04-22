/***********************************************
*  Sean Bryan
*  2019-04-20
*  JavaScript for Triva Game Project
************************************************/

$(document).ready(function () {
    // Global Variables
    var trivium1 = {
        isSelected: false,
        question: "Who was the 16th President of the United States?",
        answers: ["James Buchanan", "Abraham Lincoln", "Franklin Pierce", "Ulysses S. Grant"],
        answerKey: 2,
        image: "./assets/images/lincoln.jpg"
    };

    var trivium2 = {
        isSelected: false,
        question: "Which US President puchased the Lousiana Territory from France?",
        answers: ["Thomas Jefferson", "George Washington", "John Adams", "John Quincy Adams"],
        answerKey: 1,
        image: "./assets/images/jefferson.jpg"
    };

    var allTriviaList = [trivium1, trivium2];
    var triviaIndex = 0;
    var trivium = "";
    var correctCtr = 0;
    var incorrectCtr = 0;
    var unansweredCtr = 0;
    var answerCountdown = 29;
    var answerIntervalId;
    var gameOver = false;

    $("#trivia-page").hide();
    $("#trivia-answer").hide();
    $("#countdown-timer").hide();
    $("#summary").hide();

    /**
     * On-Click function to start game
     */
    $("#start-game").on("click", function () {
        $("#start-game").empty();
        askNextQuestion();
    })

    /**
     * On-Click function to select answer
     */
    $(".answer").on("click", function () {
        stopAnswerTimer();
        $("#trivia-page").hide();
        var id = $(this).attr("id");
        var selectedAnswer = parseInt(id.charAt(id.length - 1));
        if (selectedAnswer === trivium.answerKey) {
            correctCtr++;
            displayResult("Correct!");
        }
        else {
            incorrectCtr++;
            displayResult("Wrong!");
        }
        transitionToNextQuestion();
    })

    /**
     * If there are more trivium this function sets a three second timer
     * to transition to the next "askNextQuestion".  Otherwise it sets a 
     * value to indicate the game is over
     */
    function transitionToNextQuestion() {
        triviaIndex++;
        $("#trivia-question").empty();
        $(".answer").empty();

        setTimeout(function () {
            transitionDelay();
        }, 3000);

        if (triviaIndex < allTriviaList.length) {
            answerCountdown = 29;
        }
        else {
            gameOver = true;
        }
    }

    /**
     * Ask the next question
     */
    function askNextQuestion() {
        $("#trivia-answer").empty();
        trivium = allTriviaList[triviaIndex];
        displayTrivium();
        answerIntervalId = setInterval(answerTimer, 1000);
    }

    /**
     * Display a decrementing timer that counts down the time remaining
     * for the user to answer the question
     */
    function answerTimer() {
        answerCountdown--;
        $("#countdown-timer").html("<h2>" + "Timer: " + answerCountdown + "</h2>");

        if (answerCountdown === 0) {
            stopAnswerTimer();
            $("#trivia-page").hide();
            displayResult("Time's Up!!!")
            unansweredCtr++;
            transitionToNextQuestion();
        }
    }

    /**
     * Action that occurs following a delay
     */
    function transitionDelay() {
        $("#trivia-answer").hide();
        if (gameOver) {
            debugger;
            displayFinalResults();
            stopNextQuestionTimer();
        }
        else {
            askNextQuestion();
        }
    }

    /**
     * Stops the answer timer in the event that the user selects an answer
     */
    function stopAnswerTimer() {
        clearInterval(answerIntervalId);  //stops the interval
    }

    /**
     * Display the question and the list of possible answers
     */
    function displayTrivium() {
        $("#countdown-timer").show();
        $("#trivia-page").show();
        //Display Question
        var questionElement = $("<h1/>");
        questionElement.attr("id", "question-element");
        questionElement.text(trivium.question);
        $("#trivia-question").append(questionElement);

        //Display  Multiple Choice
        for (var i = 0; i < trivium.answers.length; i++) {
            var answer = $("<h2/>");
            answer.attr("class", "answer");
            answer.text((i + 1) + ") " + trivium.answers[i]);
            $("#answer-" + (i + 1)).append(answer);
        }
    }

    /**
     * Display the right or wrong status of the answer
     * @param message 
     */
    function displayResult(message) {
        $("#countdown-timer").hide();
        $("#trivia-answer").show();
        var correctAnswer = getCorrectAnswer();
        var answerMessage = $("<h1/>");
        answerMessage.attr("id", "answer-message");
        answerMessage.text(message);
        $("#trivia-answer").append(answerMessage);

        var answerReveal = $("<h2/>");
        answerReveal.attr("id", "answer-reveal");
        answerReveal.text("(Answer: " + correctAnswer + ")");
        $("#trivia-answer").append(answerReveal);

        var answerImage = $("<img/>");
        answerImage.attr("src", trivium.image);
        answerImage.attr("class", "img-fluid");
        answerImage.attr("id", "trivium-image");
        answerImage.attr("alt", correctAnswer);
        $("#trivia-answer").append(answerImage);
    }

    /**
     * Display the final results at the end of the quiz
     */
    function displayFinalResults() {
        $("#summary").show();
        var gameOver = $("<h1/>");
        gameOver.attr("id", "game-over");
        gameOver.text("Game Over!");
        $("#summary").append(gameOver);

        var correctAnswers = $("<h2/>");
        correctAnswers.attr("id", "correct-answers");
        correctAnswers.text("Correct Answers: " + correctCtr);
        $("#summary").append(correctAnswers);

        var incorrectAnswers = $("<h2/>");
        incorrectAnswers.attr("id", "incorrect-answers");
        incorrectAnswers.text("Incorrect Answers: " + incorrectCtr);
        $("#summary").append(incorrectAnswers);

        var unanswered = $("<h2/>");
        unanswered.attr("id", "unanswered");
        unanswered.text("Unanswered Questions: " + unansweredCtr);
        $("#summary").append(unanswered);

        var finalGrade = $("<h2/>");
        finalGrade.attr("id", "final-grade");
        finalGrade.text("Final Grade: " + determineFinalGrade());
        $("#summary").append(finalGrade);
    }

    /**
     * Retrieve the correct answer from the answers array on the object
     */
    function getCorrectAnswer() {
        for (var i = 0; i < trivium.answers.length; i++) {
            var indexValue = trivium.answerKey - 1;
            return trivium.answers[indexValue];
        }
    }

    function determineFinalGrade() {
        if (correctCtr > 9) {
            return "A";
        }
        else if (correctCtr === 8) {
            return "B";
        }
        else if (correctCtr === 7) {
            return "C";
        }
        else if (correctCtr === 6) {
            return "D";
        }
        else {
            return "F";
        }
    }
});