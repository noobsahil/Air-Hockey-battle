var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["433dc7e0-9fba-4f3e-95a8-6e11b984bbdd","a2e77182-8599-4592-aa02-de4ec750c954","d9722f8e-e120-404d-910c-20268d9b1b63"],"propsByKey":{"433dc7e0-9fba-4f3e-95a8-6e11b984bbdd":{"name":"goal1","sourceUrl":null,"frameSize":{"x":250,"y":202},"frameCount":1,"looping":true,"frameDelay":12,"version":"ckhHHtctLViutwyxbazIbGOpPA3tnvMx","loadedFromSource":true,"saved":true,"sourceSize":{"x":250,"y":202},"rootRelativePath":"assets/433dc7e0-9fba-4f3e-95a8-6e11b984bbdd.png"},"a2e77182-8599-4592-aa02-de4ec750c954":{"name":"goal2","sourceUrl":null,"frameSize":{"x":250,"y":202},"frameCount":1,"looping":true,"frameDelay":12,"version":"38Nxu6fC_4.U471.FnT0w1nX8vxgwfLU","loadedFromSource":true,"saved":true,"sourceSize":{"x":250,"y":202},"rootRelativePath":"assets/a2e77182-8599-4592-aa02-de4ec750c954.png"},"d9722f8e-e120-404d-910c-20268d9b1b63":{"name":"striker","sourceUrl":"assets/api/v1/animation-library/gamelab/KAKckB.0WJDP55kNGzIZIfW5wf7Rk5mG/category_sports/soccer_bw.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"KAKckB.0WJDP55kNGzIZIfW5wf7Rk5mG","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/KAKckB.0WJDP55kNGzIZIfW5wf7Rk5mG/category_sports/soccer_bw.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var gameState="serve"
var playerMallet;

var goal1=createSprite(200,18,100,20);
goal1.shapeColor=("yellow");
goal1.setAnimation("goal1");
 goal1.scale=0.3
   
var goal2=createSprite(200,382,100,20);
goal2.shapeColor=("yellow");
goal2.setAnimation("goal2");
goal2.scale=0.3

var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";

var striker = createSprite(200,200,10,10);
striker.shapeColor = "white";
striker.setAnimation("striker");
striker.scale=0.1


var playerMallet = createSprite(200,50,50,10);
playerMallet.shapeColor = "black";

var computerMallet = createSprite(200,350,50,10);
computerMallet.shapeColor = "black";


var playerScore=0;
var compScore=0;

function draw() {
  
  background("rgb(128,255,0)");
  paddleMovement()
  if(gameState==="serve"){
    
    textSize(18);
    fill("black");
    text("Press Space to strike",120,180);
    
    if(keyDown("space")){
      serve();
      gameState="play"
    }
  }
 
 
  textSize(18);
  fill("black");
  text(compScore, 25,225);
  text(playerScore,25,185);
  
     if(striker.isTouching(goal1))
      { 
        compScore = compScore + 1;
        striker.x=200;
        striker.y=200;
        striker.velocityX=0;
        striker.velocityY=0;
        gameState="serve"
      }
      
      if(striker.isTouching(goal2))
      {
        playerScore = playerScore + 1;
        striker.x=200;
        striker.y=200;
        striker.velocityX=0;
        striker.velocityY=0;
          gameState="serve"
      }
   
      if(playerScore===5 || compScore===5)
      {
        fill("black");
        textSize(18);
        text("Game Over!",170,160);
        text("Click R to restart",100,120);
        gameState="end"
      }
 if(keyDown("R")&&gameState==="end"){
   gameState="serve"
   compScore=0
   playerScore=0
   }
 
  computerMallet.x = striker.x;

  
  
   for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
  
  createEdgeSprites();
  
  striker.bounceOff(edges);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  playerMallet.bounceOff(edges);
  computerMallet.bounceOff(edges);

  
  
 
  drawSprites();
}

function serve() {
  striker.velocityX = 10;
  striker.velocityY = 5;
 
}

function paddleMovement()
{
  if(keyDown("left")){
    playerMallet.x = playerMallet.x-10;
    
  }
  
  if(keyDown("right")){
    playerMallet.x = playerMallet.x+10;
    
  }
  
  
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
