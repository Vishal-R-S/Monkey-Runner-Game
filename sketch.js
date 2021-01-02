var serve=1;
var play=2;
var over=0;
var gameState=serve;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup;
var ground, groundImage;
var backGround;
var score, bananasCollected;
var restart, restartImage;
var gameRestart, gameRestartImage;
var start, startImage;

function preload()
{  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("land.jpg");
  restartImage = loadImage("restart.jpg");
  startImage = loadImage("start.jpg");
  gameRestartImage = loadImage("res.jpg");
}

function setup() 
{
   createCanvas(600, 400); 
   
   obstacleGroup = createGroup();
   foodGroup = createGroup();
  
   backGround = createSprite(300, 100, 10, 10);
   backGround.addImage(groundImage);
   backGround.scale=3.8;
  
   monkey = createSprite(100,300,10,10);
   monkey.addAnimation("running",monkey_running);
   monkey.scale=0.2;
   monkey.setCollider("rectangle", 20, 20, 400, monkey.height);
  
   ground = createSprite(300, 400, 1000, 10);
   ground.visible=false;
  
   score=0;
   bananasCollected=0;
  
   start = createSprite(300, 200, 10, 10);
   start.addImage(startImage);
   restart = createSprite(300, 200, 10, 10);
   restart.addImage(restartImage);
   restart.visible=false;
   gameRestart = createSprite(50, 50, 10 ,10);
   gameRestart.addImage(gameRestartImage);
   gameRestart.scale=0.2;
}


function draw() 
{
   background("black");
   monkey.collide(ground);
  
   if(gameState==serve)
   {
      start.visible=true;
      if(mousePressedOver(start)) 
      {
         gameState=play;
         start.visible=false;
         frameCount=0;
      }
   }
  
   if(gameState==play)
   {
      spawnObstacles();
      spawnFood();
     
      backGround.velocityX=-(10+score/30);
      if(backGround.x < 0)
      {
         backGround.x = backGround.width/2;
      }
     
      if(keyDown("SPACE") && monkey.y>=329)
      {
         monkey.velocityY=-19;
      }
     
      if(foodGroup.isTouching(monkey))
      {    
         foodGroup.destroyEach();
         bananasCollected = bananasCollected+1;
      }
      if(obstacleGroup.isTouching(monkey))
      {
         gameState=over;
      }
     
      if(score==80)
      {
         monkey.scale=0.1;
      }
     
      if(mousePressedOver(gameRestart))
      {
         gameReset();
      }
     
      monkey.velocityY = monkey.velocityY+0.8; 
      score = Math.ceil(frameCount/frameRate());
     
   }
  
   else if(gameState==over)
   {
      
      backGround.velocityX=0;
      obstacleGroup.setVelocityEach(0,0);
      foodGroup.setVelocityEach(0,0);
      obstacleGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
      monkey.velocityY=0;
      restart.visible=true;
     
      if(mousePressedOver(restart))
      {
         reset();
      }
   }
  
   drawSprites();
   textSize(20);
   text("Survival Time : "+score, 400, 30);
   text("Bananas Collected : "+bananasCollected, 100,30);
}

function spawnObstacles ()
{
   if(frameCount%200==0)
   {
      obstacle = createSprite(500, 350, 10, 10);
      obstacle.addImage(obstacleImage);
      obstacle.scale=0.2;
      obstacle.velocityX=-(8+score/30); 
      obstacle.lifetime = 150;
      obstacleGroup.add(obstacle);
   }
}

function spawnFood ()
{
   if(frameCount%150==0)
   {
      banana = createSprite(570, 100, 10, 10);
      banana.addImage(bananaImage);
      banana.scale=0.1;
      banana.velocityX=-(8+score/30); 
      banana.lifetime = 150;
     
      foodGroup.add(banana);
   }
}

function reset()
{ 
   gameState=serve;
   score=0;
   bananasCollected=0;
   frameCount=0;
   obstacleGroup.destroyEach();
   foodGroup.destroyEach();
   restart.visible=false;
}
function gameReset()
{ 
   gameState=play;
   score=0;
   bananasCollected=0;
   frameCount=0;
   obstacleGroup.destroyEach();
   foodGroup.destroyEach();
   restart.visible=false;
}



