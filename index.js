var buttonColor = ["red","blue","green","yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    var level = 0;
    var started=false;

$(".btn").click(function(){             //doubt
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

    $(document).keypress(function(){
        if (!started){
            $("#level-title").text("Level " + level);
            nextSequence();
            started=true;
        }
    });

function nextSequence() {
    userClickedPattern = [];
    level+=1;
    $("#level-title").text("LEVEL "+level);
    var randumNumber =  Math.floor(Math.random()*4);
    var randomChosenColour = buttonColor[randumNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("correct");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");        //doubt-body & document
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver() {
    level=0;
    gamePattern = [];
    started=false;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(key){
    $("#"+key).addClass("pressed");
    setTimeout(function(){
        $("#"+key).removeClass("pressed");
    },100);
}