var bg;
var blast;
var squareImg;
var square;
var gameOver;
var bgSound;
var platformGroup;
var bulletGroup1, bulletGroup2;
var gameState = "play";

function preload() {
bg = loadImage("Background.jpg");
squareImg = loadImage("Square.png");
blast = loadImage("BLAST.png");
gameOver = loadImage("gameOver.png");
bgSound = loadSound("inOrbit.mp3");
}

function setup() {
createCanvas(600,600);

bgSound.loop();

bgSprite = createSprite(300, 300, 10, 10);
bgSprite.addImage(bg);
bgSprite.velocityY = + 1

square = createSprite(120, 300, 20, 20);
square.addImage(squareImg);
square.scale = 0.2;

gameOverSprite = createSprite(300, 300, 200, 200);
gameOverSprite.addImage(gameOver);
gameOverSprite.visible = false;

platformGroup = new Group();
bulletGroup1 = new Group();
bulletGroup2 = new Group();

//square.y = camera.position.y
}

function draw() {
background("black");

if(gameState === "play") {
    if(keyDown("space")) {
        square.velocityY = -5
    }
    
    if(keyIsDown(RIGHT_ARROW)) {
        square.x = square.x + 2;
    }
    
    if(keyIsDown(LEFT_ARROW)) {
        square.x = square.x - 2;
    }
    
    if(bgSprite.y > height-100) {
        bgSprite.y = 300;
    }
    
    square.velocityY = square.velocityY + 0.1
    
    if(platformGroup.isTouching(square)) {
        square.collide(platformGroup);
    }
    
    if(bulletGroup1.isTouching(platformGroup)) {
        bulletGroup1.destroyEach();
    }
    
    if(bulletGroup2.isTouching(platformGroup)) {
        bulletGroup2.destroyEach();
    }

    spawnBullets2();
    spawnBullets1();
    spawnPlatforms();

    if(bulletGroup1.isTouching(square) || bulletGroup2.isTouching(square)) {
        gameState = "end";

        bulletGroup1.destroyEach();
        bulletGroup2.destroyEach();
        platformGroup.destroyEach();

        bgSprite.velocityY = 0;
        square.velocityY = 0;

        square.addImage(blast);

        gameOverSprite.visible = true;
    }
}

drawSprites();
}

function spawnPlatforms() {
    if(frameCount % 110 === 0) {
        var platform = createSprite(300, 0, 90, 10)
        platform.velocityY = +2
        platform.shapeColor = "white"
        platform.x = Math.round(random(10, 590))

        platformGroup.add(platform);
    }
}

function spawnBullets1() {
    if(frameCount % 50 === 0) {
        var bullet1 = createSprite(300, 0, 6, 40)
        bullet1.velocityY = +8
        bullet1.shapeColor = "black"
        bullet1.x = Math.round(random(10, 590))

        //platformGroup.add(platform);
        bulletGroup1.add(bullet1);
    }
}

function spawnBullets2() {
    if(frameCount % 50 === 0) {
        var bullet2 = createSprite(300, 600, 6, 40)
        bullet2.velocityY = -8
        bullet2.shapeColor = "black"
        bullet2.x = Math.round(random(10, 590))

        //platformGroup.add(platform);
        bulletGroup2.add(bullet2);
    }
}