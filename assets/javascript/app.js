var trivia = [{
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
    }];


function gameIntro() {
    var playButton = '<button type="button" id="play-button">Play</button>'

    $("#question").append('<h1 id="game-intro" >Stargate SG-1 Trivia</h1>' +
                            '<h2 id="instructions">Press play to begin</h2>' +
                            playButton);
    $("#play-button").on("click", gameStart);
}


function gameStart() {
    var choiceA = '<p>a. <span id="choice1" class="pick"></span></p>';
    var choiceB = '<p>b. <span id="choice2" class="pick"></span></p>';
    var choiceC = '<p>c. <span id="choice3" class="pick"></span></p>';
    $("#choices").html(choiceA + choiceB + choiceC);

    var ques = 0;
    var choice1 = trivia[ques].choices[0];
    var choice2 = trivia[ques].choices[1];
    var choice3 = trivia[ques].choices[2];

    $("#question").html('<p>' + trivia[ques].question + '</p>');
    $("#choice1").html(choice1);
    $("#choice2").html(choice2);
    $("#choice3").html(choice3);

    $(".pick").on('click', function() {
        if( $(this).text() === trivia[ques].correctAnswer) {
            console.log("correct!");
             $("#trivia-container").css("background-color", "rgba(200,200,255,0.75)").effect("pulsate", {times:3}, "slow");
        } else {
            console.log("wrong!");
            $("#trivia-container").css("background-color", "rgba(255,0,0,0.75)").effect("pulsate", {times:3}, "slow");
            //setTimeout($("#trivia-container").css("background-color", "rgba(255,255,255,0.75)");, 4000};
        }
    });
}

gameIntro();
