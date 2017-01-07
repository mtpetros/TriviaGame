var intervalId;
var game = {

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

    time: 8,

    ques: 0,

    numberRight: 0,

    numberWrong: 0,

    gameIntro: function() {
        var playButton = '<button type="button" id="play-button">Play</button>'

        $("#question").append('<h1 id="game-intro" >Stargate SG-1 Trivia</h1>' +
                                '<h2 id="instructions">Press play to begin</h2>' +
                                playButton);
        $("#play-button").on("click", game.gameStart);
    },    

    decrement: function() {
        game.time--;
        console.log(game.time);
        $("#timer").html(game.time);
        if (game.time <= 0) {
            console.log("time's up");
            clearInterval(intervalId);
            game.timeOut();
        }
    },

    gameStart: function() {
        intervalId = setInterval(game.decrement, 1000);

        var choiceA = '<p>a. <span id="choice1" class="pick"></span></p>';
        var choiceB = '<p>b. <span id="choice2" class="pick"></span></p>';
        var choiceC = '<p>c. <span id="choice3" class="pick"></span></p>';
        $("#choices").html(choiceA + choiceB + choiceC);

        //choice1 = game.trivia[ques].choices[0];
        //choice2 = game.trivia[ques].choices[1];
        //choice3 = game.trivia[ques].choices[2];

        $("#question").html('<p>' + game.trivia[game.ques].question + '</p>');
        $("#choice1").html(game.trivia[game.ques].choices[0]);
        $("#choice2").html(game.trivia[game.ques].choices[1]);
        $("#choice3").html(game.trivia[game.ques].choices[2]);

        $(".pick").on('click', function() {
            if( $(this).text() === game.trivia[game.ques].correctAnswer) {
                console.log("correct!");
                game.numberRight++;
                $("#trivia-container").css("background-color", "rgba(200,200,255,0.75)").effect("pulsate", {times:3}, "slow");
                $("#timer ,#question ,#choices").addClass("hide");
                $("#congrats").removeClass("hide");
                setTimeout(game.nextQuestion, 3000);
                clearInterval(intervalId);
            } else {
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

    showAnswer: function() {
        $("#trivia-container").css("background-color", "rgba(255,255,255,0.75)");
        $("#wrong").addClass("hide");
        $("#answer").removeClass("hide").html('<h1>The correct Answer is</h1><h2>' + game.trivia[game.ques].correctAnswer + '</h2>');

    },

    nextQuestion: function() {
        game.ques++;
        game.time = 8;
        intervalId = setInterval(game.decrement, 1000);
        if (!$("#answer").hasClass("hide")) {
            $("#answer").addClass("hide");
        } else if (!$("#congrats").hasClass("hide")) {
            $("#congrats").addClass("hide");
        }

        if (game.ques >= game.trivia.length) {
            clearInterval(intervalId);
            game.gameOver();
        } else {
            $("#timer ,#question ,#choices").removeClass("hide");
            $("#question").html('<p>' + game.trivia[game.ques].question + '</p>');
            $("#choice1").html(game.trivia[game.ques].choices[0]);
            $("#choice2").html(game.trivia[game.ques].choices[1]);
            $("#choice3").html(game.trivia[game.ques].choices[2]);
        }

    },

    timeOut: function() {
        $("#trivia-container").css("background-color", "rgba(255,0,0,0.75)").effect("pulsate", {times:3}, "slow");
        $("#timer ,#question ,#choices").addClass("hide");
        $("#timeout").removeClass("hide");
        setTimeout(function() {
            $("#timeout").addClass("hide");
            $("#trivia-container").css("background-color", "rgba(255,255,255,0.75)");
        }, 3000);
        setTimeout(game.nextQuestion, 3000);
    },

    gameOver: function() {
        var answeredRight = '<p># Correct: ' + game.numberRight + '</p>';
        var answeredWrong = '<p># Wrong: ' + game.numberWrong + '</p>';
        var resetButton = '<p><button type="button" id="reset-button">Start Over</button>';
        $("#timer").addClass("hide");
        $("#game-over").removeClass("hide").html('<h1>Game Over</h1>' + answeredRight + answeredWrong + resetButton);
        $("#reset-button").on("click", game.reset);
    },

    reset: function() {
        $("#game-over").addClass("hide");
        $("#timer ,#question ,#choices").html("").removeClass("hide");
        game.time = 8;
        game.ques = 0;
        game.numberRight = 0;
        game.numberWrong = 0;
        game.gameIntro();
    }
        
    
}


game.gameIntro();


