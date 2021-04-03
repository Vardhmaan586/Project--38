var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5;
var gameOver, restart;

function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight/2+218);
  
  trex = createSprite(50,displayHeight/2+100,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(displayWidth+100,displayHeight/2+100,5000,10);
  
  gameOver = createSprite(displayWidth/2,displayHeight/2);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(displayWidth/2,displayHeight/2+30);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.6;
  restart.scale = 0.6;

  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup = new Group();
  
}

function draw() {
  background(255);
  
  //console.log(trex.position.x);
 
  if (gameState===PLAY){
     if(keyDown("space") ) {
     trex.velocityY = -12;
    }
    trex.velocityX = 5;
  
  trex.velocityY = trex.velocityY + 0.8

  trex.collide(ground);
 
  spawnObstacles();

  if(obstaclesGroup.isTouching(trex)){
     gameState = END;
    }

  }
  
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    trex.velocityY = 0;
    trex.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    trex.changeAnimation("collided",trex_collided);
  
    obstaclesGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)) {
      reset();
    }

  }
  
  camera.position.x = trex.x;
  camera.position.y = displayHeight/2+5;
  
  drawSprites();
}

function spawnObstacles() {

  if(frameCount % 60 === 0) {
   //for(var i = displayWidth/2; i<displayWidth; i=i+displayWidth/3){
      var obstacle = createSprite(displayWidth/2+displayWidth/3,displayHeight/2+80,10,40);
      var rand = Math.round(random(1,5))

      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        case 4: obstacle.addImage(obstacle4);
                break;
        case 5: obstacle.addImage(obstacle5);
                break;
        default: break;
      }

      obstacle.scale = 0.6;
    obstacle.lifetime = 1000;
    obstaclesGroup.add(obstacle);
    }
    

    
} 



function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();

  trex.changeAnimation("running",trex_running); 
}

  