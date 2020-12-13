var car_green;
var car_yellow;
var boom;
var heart;
var playerSpeed = 20;
var opponents = [];
var roadMarkings = [];
var score = 0;
var lives = 3;



function preload() {
    car_green = loadImage('sprites/Car_Green.png');
    car_yellow = loadImage('sprites/Car_Yellow.png');
    Boom = loadImage('sprites/boom.png');
    heart = loadImage('sprites/heart.png');

    
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    

    //frameRate(50);

    roadMarkings.push(new roadMarking());
    opponents.push(new Opponent());
    player = new Player();



  
}

function draw() {
    
    background(103,104,112);

    


    // New road markings appear after certain number of frames
    if (frameCount % 15 === 0) {
        roadMarkings.push(new roadMarking());
    }

    // Show road markings
    for (var i = roadMarkings.length-1 ; i >= 0 ; i--) {
        roadMarkings[i].show();
        roadMarkings[i].update();

        // Remove road markings once the are off the screen
        if (roadMarkings[i].offscreen()) {
            roadMarkings.splice(i, 1);
        }
    }

    // New opponents appear after certain number of frames
    if (frameCount % 35 === 0) {
        opponents.push(new Opponent());
    }

    // Show opponents
    for (var i = opponents.length-1 ; i >= 0 ; i--) {
        opponents[i].show();
        opponents[i].update();

        if (opponents[i].overtakenBy(player) && opponents[i].isOvertakenBy === false) {
            score += 5;
            opponents[i].isOvertakenBy = true;
        }

        // If opponents collide with the player, they get destroyed
        if (opponents[i].hits(player)) {
            opponents[i].boom();
            opponents.splice(i,1);
            

            // Penalty for collision is -10, and you loose one life
            score = (score >= 10)?(score-10):0;
            lives--;
        }
        // Remove opponents once the are off the screen
        else if (opponents[i].offscreen()) {
            opponents.splice(i, 1);
        }
    }


    // Show the player
    player.show();

    // Game controls
    if (keyIsDown(LEFT_ARROW)) {
        player.turnLeft();
    }
    if (keyIsDown(RIGHT_ARROW)) {
        player.turnRight();
    }

    // Show player stats
    textSize(40);
    textFont("forte");
    textAlign(LEFT);
    fill(255);
    text('ⓈⒸⓄⓇⒺ: ' + score, 30, 60);

    for (var i = 0 ; i < lives ; i++) {
        image(heart, width-450 + (i*90), height-800);
        
        
    }


  

    
    // Check if game is over
    if (lives === 0) {
        noLoop();
        

        textSize(50);
        background("black")
        textFont("forte");
        textStyle(BOLD);
        textAlign(CENTER);
        fill(255);
        text('𝔾𝔸𝕄𝔼 𝕆𝕍𝔼ℝ',width/2,height/2)

        
        }
    
    
    if(score===100){
       
        noLoop();
        
        background("black");
        textSize(50);
        textFont("forte");
        textStyle(BOLD);
        textAlign(CENTER);
        fill(255);
        text('꧁༺ 𝓒𝓞𝓝𝓖𝓡𝓐𝓣𝓢 𝓨𝓞𝓤 𝓦𝓘𝓝!!! ༻꧂', width/2, height/2);
        text('🎉',width/4,height/4)
        
        
        }
    
        
    }

        
    
    
       
    



