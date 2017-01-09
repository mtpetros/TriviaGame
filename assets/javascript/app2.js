var intervalId; //Sets the interval for the timer
var game = { //The game object

//These are the trivia questions
    trivia: [{
            question: "What actor made the most episode appearances in SG-1?",
            choices: ["Michael Shanks", "Christopher Judge", "Don Davis"],
            correctAnswer: "Christopher Judge"
        }, {
            question: "What is the name of Daniel's wife?",
            choices: ["Sha\'re", "Te\'alc", "Shakira"],
            correctAnswer: "Sha\'re"
        }, {
            question: "Where is the second Stargate found?",
            choices: ["Egypt", "Norway", "Antarctica"],
            correctAnswer: "Antarctica"
    }],

    time: 10,

    ques: 0,

    numberRight: 0,

    numberWrong: 0,

//This function controls the start page
    gameIntro: function() {
        var playButton = '<button type="button" id="play-button">Play</button>'

        $("#question").append('<h1 id="game-intro" >Stargate SG-1 Trivia</h1>' +
                                '<h2 id="instructions">Press play to begin</h2>' +
                                playButton);
        $("#play-button").on("click", game.gameStart);
    },    

//This function controls the counter as well as what happen when time runs out
    decrement: function() {
        game.time--;
        console.log(game.time);
        $("#timer").html(game.time);

        if (game.time <=5) {//If time runs down to 5, the timer turns red
            $("#timer").css("color", "rgb(255,0,0)");
        } else {
            $("#timer").css("color", "rgb(0,0,0");
        }

        if (game.time <= 0) {//If time runs out, the timeOut function runs
            console.log("time's up");
            clearInterval(intervalId);
            game.timeOut();
        }
    },

//This function controls what happens after the user presses start
    gameStart: function() {
        intervalId = setInterval(game.decrement, 1000);
        
        //This writes the possible choices to the DOM
        var choiceA = '<p>a. <span id="choice1" class="pick"></span></p>';
        var choiceB = '<p>b. <span id="choice2" class="pick"></span></p>';
        var choiceC = '<p>c. <span id="choice3" class="pick"></span></p>';
        $("#choices").html(choiceA + choiceB + choiceC);     

        //This pulls the possible choices from the array
        $("#question").html('<p>' + game.trivia[game.ques].question + '</p>');
        $("#choice1").html(game.trivia[game.ques].choices[0]);
        $("#choice2").html(game.trivia[game.ques].choices[1]);
        $("#choice3").html(game.trivia[game.ques].choices[2]);           

        //When you choose an answer...
        $(".pick").on('click', function() {
            if( $(this).text() === game.trivia[game.ques].correctAnswer) {//...this will happen if right
                console.log("correct!");
                game.numberRight++;
                $("#trivia-container").css("background-color", "rgba(200,200,255,0.75)").effect("pulsate", {times:3}, "slow");
                $("#timer ,#question ,#choices").addClass("hide");
                $("#congrats").removeClass("hide");
                setTimeout(game.nextQuestion, 3000);
                clearInterval(intervalId);
            } else {//...this will happen if wrong
                console.log("wrong!");
                game.numberWrong++;
                $("#trivia-container").css("background-color", "rgba(255,0,0,0.75)").effect("pulsate", {times:3}, "slow");
                $("#timer ,#question ,#choices").addClass("hide");
                $("#wrong").removeClass("hide");
                setTimeout(game.showAnswer, 3000);
                setTimeout(game.nextQuestion, 6000);
                clearInterval(intervalId);
            }
        });
    },

//This function will show the answer when a user selects the wrong one or when time runs out
    showAnswer: function() {
        $("#trivia-container").css("background-color", "rgba(255,255,255,0.75)");
        if (!$("#wrong").hasClass("hide")) {
            $("#wrong").addClass("hide");
        }
        $("#answer").removeClass("hide").html('<h1>The correct Answer is</h1><h2>' + game.trivia[game.ques].correctAnswer + '</h2>');

    },
//This function will cause the next question to appear
    nextQuestion: function() {
        game.time = 10;
        game.ques++;
        intervalId = setInterval(game.decrement, 1000);
        if (!$("#answer").hasClass("hide")) {
            $("#answer").addClass("hide");
        } else if (!$("#congrats").hasClass("hide")) {
            $("#congrats").addClass("hide");
        }

        if (game.ques >= game.trivia.length) {//If you run out of questions in the array, the game ends
            clearInterval(intervalId);
            game.gameOver();
        } else {//If you still have questions in the array, the next question will be written to the DOM
            $("#timer ,#question ,#choices").removeClass("hide");
            $("#question").html('<p>' + game.trivia[game.ques].question + '</p>');
            $("#choice1").html(game.trivia[game.ques].choices[0]);
            $("#choice2").html(game.trivia[game.ques].choices[1]);
            $("#choice3").html(game.trivia[game.ques].choices[2]);
        }

    },

//This function controls what happens when time runs out
    timeOut: function() {
        game.numberWrong++;
        $("#trivia-container").css("background-color", "rgba(255,0,0,0.75)").effect("pulsate", {times:3}, "slow");
        $("#timer ,#question ,#choices").addClass("hide");
        $("#timeout").removeClass("hide");
        setTimeout(function() {
            $("#timeout").addClass("hide");
            $("#trivia-container").css("background-color", "rgba(255,255,255,0.75)");
        }, 3000);
        setTimeout(game.showAnswer, 3000);
        setTimeout(game.nextQuestion, 6000);
    },

//This function controls what happen when the game ends
    gameOver: function() {
        var answeredRight = '<p># Correct: ' + game.numberRight + '</p>';
        var answeredWrong = '<p># Wrong: ' + game.numberWrong + '</p>';
        var resetButton = '<p><button type="button" id="reset-button">Start Over</button>';
        $("#timer").addClass("hide");
        $("#game-over").removeClass("hide").html('<h1>Game Over</h1>' + answeredRight + answeredWrong + resetButton);
        $("#reset-button").on("click", game.reset);
    },

//This function resents the game to the intro screen
    reset: function() {
        $("#game-over").addClass("hide");
        $("#timer ,#question ,#choices").html("").removeClass("hide");
        game.time = 10;
        game.ques = 0;
        game.numberRight = 0;
        game.numberWrong = 0;
        game.gameIntro();
    }
        
    
}


game.gameIntro();


