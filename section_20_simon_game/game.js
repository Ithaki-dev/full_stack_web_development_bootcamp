var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = []
var userClickedPattern = [];
var level = 0;
var started = false;

// Array to keep track of user clicked patterns
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Function to play sound based on the color name
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function nextSequence() {
    // create a random number between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4);
    // use that number to select a color from the buttonColors array
    var randomChosenColor = buttonColors[randomNumber];
    // add the chosen color to the gamePattern array
    gamePattern.push(randomChosenColor);
    // console.log(randomChosenColor)
    // animate the button
    animatePress(randomChosenColor);
    // play the sound for the chosen color
    playSound(randomChosenColor);
}

$(document).on("keydown", function() {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
        var userChosenColor = $(this).attr("id");
        // Add the user's choice to the userClickedPattern array
        userClickedPattern.push(userChosenColor);

        animatePress(userChosenColor);
        playSound(userChosenColor);
        // Check the user's answer
        checkAnswer(userClickedPattern.length - 1);
        
    });

// Check the user's answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        // If the user has completed the sequence, move to the next level
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
                level++;
                $("h1").text("Level " + level);
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
// Reset the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}