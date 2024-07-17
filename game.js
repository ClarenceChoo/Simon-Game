let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];

let level = 0;
let gameStart = false;

//Start game (detect keyboard pressed)
$(document).keydown(function(){
    if(!gameStart){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStart = true;
    }
})

let numberOfButton = $(".btn").length;


//Game
function nextSequence(){
    //New level
    userClickedPattern = [];

    //Add levels
    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * numberOfButton);

    //Get colour for game
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //Animation
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    
    // let indexGame =  buttonColours[randomChosenColour];
    // checkAnswer(indexGame);

}

//User
$(".btn").click(function(){
    //Get user colour
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    //Array length = 1; so -1 to get the position of 0 in array
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    let audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
        }, 100)
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        $("#level-title").text("Game Over, Press Any key to Restart");
        let wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStart = false;
}



