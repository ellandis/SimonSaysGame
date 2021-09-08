var audio;
var randomNumber;
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var correctPattern = true;

// $("body").click(function(){nextSequence()});



function nextSequence() {
     userClickedPattern = [];
     randomNumber = Math.floor(Math.random() * 4);

     randomChosenColor = buttonColors[randomNumber];
     gamePattern.push(randomChosenColor);

     $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

     var i = 0;
     while (i < gamePattern.length) {
          playSound(randomChosenColor);
          animatePress(randomChosenColor);
          i++;
     }

     level++;
     $("#level-title").text("Level " + level);


}

$(".btn").click(function() {
     var userChosenColor = $(this).attr("id");
     userClickedPattern.push(userChosenColor);

     playSound(userChosenColor);
     animatePress(userChosenColor);
     checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
     audio = new Audio("sounds/" + name + ".mp3");
     audio.play();
}

function animatePress(currentColor) {
     $("#" + currentColor).addClass("pressed");
     setTimeout(function() {
          $("#" + currentColor).removeClass("pressed");
     }, 100);
}

$("body").keydown(function() {
     if (started == false) {
          started = true;
          $("body").toggleClass("started");
          nextSequence();
     }
});


function checkAnswer(currentlevel) {
     if (userClickedPattern[currentlevel] === gamePattern[currentlevel]) {
          if (userClickedPattern.length == gamePattern.length) {
               setTimeout(function() {
                    nextSequence();
               }, 1000);
          }
     } else {
          //correctPattern = false;
          playSound("wrong");
          $("body").addClass("game-over");
          setTimeout(function(){
               $("body").removeClass("game-over");
          }, 200);
          $("#level-title").text("Game Over!! Press any key to restart");
          startOver();

     }
}

function startOver(){
     level = 0;
     gamePattern = [];
     started = false;
     $("body").toggleClass("started");
}
