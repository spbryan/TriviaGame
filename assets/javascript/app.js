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

    $("#trivia-page").hide();

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
        console.log("BOOM");
    })

    function askNextQuestion() {
        trivium = allTriviaList[triviaIndex];
        displayTrivium();
        // startTimer();
    }

    function displayTrivium() {
        debugger;
        $("#trivia-page").show();
        //Display Question
        var questionElement = $("<h1/>");
        questionElement.attr("id", "question-element");
        questionElement.text(trivium.question);
        $("#trivia-question").append(questionElement);

        //Display  Multiple Choice
        for(var i = 0; i < trivium.answers.length; i++) {
            var answer = $("<h2/>");
            answer.attr("class", "answer");
            // answer.attr("id", "answer-" + (i+1));
            answer.text((i+1) + ") " + trivium.answers[i]);
            $("#answer-" + (i+1)).append(answer);
        }

    }


});