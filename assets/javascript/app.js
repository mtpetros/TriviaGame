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
    } else {
        console.log("wrong!");
        $("#trivia-container").css("background-color", "rgba(255,0,0,0.75)").effect("pulsate", {times:3}, "slow");
        //setTimeout($("#trivia-container").css("background-color", "rgba(255,255,255,0.75)");, 4000};
    }
});
