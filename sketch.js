var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl, girlImage;
var ground, invisibleGround, groundImage;

var butterflyGroup, butterflyImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var clapsound, jumpsound;
var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){

 clapsound = loadSound("Audios/ClapSound.mp3");
 //jumpsound = loadSound("Audios/JumpSound.mp3");
  girlImage = loadImage("Girl Image.png");
  
  groundImage = loadImage("ground2.png");
  
 butterflyImage = loadImage("ButterflyImage.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  
}

function setup() {
  createCanvas(600, 200);
  
  //edge = createEdgeSprites();
  girl = createSprite(20,120,20,50);
  
  girl.addImage(girlImage);
  
  girl.scale = 0.1;
  
  
  
  
  
  
  
  

  
  
  invisibleGround = createSprite(200,190,500,10);
  invisibleGround.visible = false;
  
  
  butterflyGroup = new Group();
  

  
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background("lightBlue");
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    
    //ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && girl.y >= 100) {
      girl.velocityY = -10;
      //jumpsound.play();
    }
  
    girl.velocityY = girl.velocityY + 0.8
  
    
  
    girl.collide(invisibleGround);
    spawnbutterfly();

    if(butterflyGroup.isTouching(girl)){
      butterflyGroup.destroyEach();
      score = score +1;
      clapsound.play();
    }
    
  
    
  }
  else if (gameState === END) {
    
    
    //set velcity of each game object to 0
    //ground.velocityX = 0;
    girl.velocityY = 0;
    
    butterflyGroup.setVelocityXEach(0);
    
    //change the trex animation
    
    
    //set lifetime of the game objects so that they are never destroyed
    
    butterflyGroup.setLifetimeEach(-1);
    
    
  }
  
  
  drawSprites();
}

function spawnbutterfly() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var butterfly = createSprite(600,120,40,10);
    butterfly.y = Math.round(random(80,120));
    butterfly.addImage(butterflyImage);
    butterfly.scale = 0.05;
    butterfly.velocityX = -3;
    
     //assign lifetime to the variable
    butterfly.lifetime = 200;
    
    //adjust the depth
    butterfly.depth = girl.depth;
    girl.depth = girl.depth + 1;
    butterfly.velocityX = -(6+score/100);

    //add each cloud to the group
    butterflyGroup.add(butterfly);
  }
  
}



