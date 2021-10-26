var canvas;
var background;
var btn1,btn2,btn3,btn4,btn5;
var player,obs;
var sL1,sL2,house;
var r;
var life = 2;
var heart1,heart2;
var gameState = 0;
var score = 0;

function preload()
{
    //loading background
    bgImg = loadImage("./images/background.png");
    trackImg = loadImage("./images/track.png");
    
    //loading obstacles
    obstacleImg = loadImage("./images/obstacle.png");

    //loading rewards
    reward1Img = loadImage("./images/solarLight.png");
    reward2Img = loadImage("./images/solarPanel.png");
    reward3Img = loadImage("./images/house.png");

    //loading life 
    lifeImg = loadImage("./images/heart.png");

    //loading reset 
    resetImg = loadImage("./images/reset.png");

    //loading display player
    plyShw1Img = loadImage("./images/showImg1.png");
    plyShw2Img = loadImage("./images/showImg2.png");
    plyShw3Img = loadImage("./images/showImg3.png");
    plyShw4Img = loadImage("./images/showImg4.png");
    plyShw5Img = loadImage("./images/showImg5.png");

    //loading main player 
    plyMain1Img = loadImage("./images/mainImg1.png");
    plyMain2Img = loadImage("./images/mainImg2.png");
    plyMain3Img = loadImage("./images/mainImg3.png");
    plyMain4Img = loadImage("./images/mainImg4.png");
    plyMain5Img = loadImage("./images/mainImg5.png");

}
function setup()
{
    //creating canvas
    canvas = createCanvas(windowWidth,windowHeight);

    //creating button
    btn1 = createButton("SIZUKA");
    btn1.position(width/2-500,height/2+120);
    btn1.size(150);

    btn2 = createButton("NOBITA");
    btn2.position(width/2-340,height/2+120);
    btn2.size(150);

    btn3 = createButton("DORAEMON");
    btn3.position(width/2-180,height/2+120);
    btn3.size(150);

    btn4 = createButton("SUNEO");
    btn4.position(width/2-20,height/2+120);
    btn4.size(150);

    btn5 = createButton("GIAN");
    btn5.position(width/2+140,height/2+120);
    btn5.size(150);

    //creating player sprite
    player = createSprite(width/2-20,height-100,50,50);
    player.addImage("running",plyMain1Img);
    player.addImage("moving",plyMain2Img);
    player.addImage("walking",plyMain3Img);
    player.addImage("cycling",plyMain4Img);
    player.addImage("jumping",plyMain5Img);
    player.scale=0.7;
    
    //create loop for obstacles
    for(var i=0;i<7;i++)
    {
        var rX = random(width/2-230,width/2+200);
        var rY = random(height-250,height-3300)
        obs = createSprite(rX,rY,50,50);
        obs.addImage("placing",obstacleImg);
        obs.scale=0.5;
    }
    //creating loop for reward
    for(var j=0;j<2;j++)
    {
        var rX = random(width/2-250,width/2+200);
        var rY = random(height-600,height-3800)
        house = createSprite(rX,rY,50,50);
        house.addImage("placing",reward3Img);
        house.scale=0.2;
    }
    for(var k=0;k<6;k++)
    {
        var rX = random(width/2-225,width/2+200);
        var rY = random(height-400,height-3300)
        sL1 = createSprite(rX,rY,50,50);
        sL1.addImage("placing",reward1Img);
        sL1.scale=0.5;
    }
    for(var l=0;l<6;l++)
    {
        var rX = random(width/2-260,width/2+200);
        var rY = random(height-300,height-3300)
        sL2 = createSprite(rX,rY,50,50);
        sL2.addImage("placing",reward2Img);
        sL2.scale=0.5;
    }

}

function draw()
{
    background(bgImg);

    if(gameState===0)
    {
        btn1.mousePressed(press1);
        btn2.mousePressed(press2);
        btn3.mousePressed(press3);
        btn4.mousePressed(press4);
        btn5.mousePressed(press5);

        textSize(30);
        text("HELLO!!",width/2-100,height/2-250)
        text("SELECT A CHARACTER ",width/2-200,height/2-200);

        image(plyShw1Img,width/2-500,height/2-100,150,200);
        image(plyShw2Img,width/2-340,height/2-100,150,200);
        image(plyShw3Img,width/2-180,height/2-100,150,200)
        image(plyShw4Img,width/2-20,height/2-100,150,200);
        image(plyShw5Img,width/2+140,height/2-100,150,200);

    }
    if(gameState === 1)
    {
        
        
        image(trackImg,0,-height*5,width,height*6);
        textSize(30)
        fill(0)
        text("SCORE: "+score,width/2+450,camera.position.y-250)
        btn1.hide();
        btn2.hide();
        btn3.hide();
        btn4.hide();
        btn5.hide();
        camera.position.y=player.position.y-250;

        /*heart1 =  createSprite(width/2-450,camera.position.y-100,50,50);
        heart1.addImage("living",lifeImg);
        heart2.scale=0.2;*/

        if(player.collide(obs))
        {
            life-=1;
        }
       
        handlePlayerControl();
        drawSprites();
       
    }
    windowResized();
}
function windowResized() 
{
    resizeCanvas(windowWidth, windowHeight);
}
  
function press1()
{
    player.changeImage("moving",plyMain1Img);
    gameState = 1;
    console.log("yess")
}
function press2()
{
    player.changeImage("walking",plyMain2Img);
    gameState = 1;
    console.log("yess")
}
function press3()
{
    player.changeImage("running",plyMain3Img);
    gameState = 1;
    console.log("yess")
}
function press4()
{
    player.changeImage("cycling",plyMain4Img);
    gameState = 1;
    console.log("yess")
}
function press5()
{
    player.changeImage("jumping",plyMain5Img);
    gameState = 1;
    console.log("yess")
}

function handlePlayerControl()
{
    if(keyIsDown(UP_ARROW))
    {
        player.position.y-=5;
    }
    if(keyIsDown(RIGHT_ARROW) && player.position.x<width/2+200)
    {
        player.position.x+=5;
    }
    if(keyIsDown(LEFT_ARROW) && player.position.x>width/2-230)
    {
        player.position.x-=5;
    }

