var canvas;
var background;
var btn1,btn2,btn3,btn4,btn5;
var player,obs;
var sL1,sL2,house;
var r;
var heart1,heart2;
var life = 2;
var gameState = 0;
var score = 0;

function preload()
{
    backgroundImg = loadImage("./images/background.png")
    houseImg = loadImage("./images/house.png");
    obstacleImg = loadImage("./images/obstacle.png");
    playerImg  = loadImage("./images/player.png");
    player1 = loadImage("./images/player1.png");
    player2 = loadImage("./images/player2.jfif");
    player3 = loadImage("./images/player3.png");
    player4 = loadImage("./images/player4.jfif");
    player5 = loadImage("./images/player5.jfif");
    player1Run = loadImage("./images/player1running.png");
    player2Run = loadImage("./images/player2running.png");
    solarImg1 = loadImage("./images/solarLight.png");
    solarImg2= loadImage("./images/solarPanel.png");
    lifeImg= loadImage("./images/heart.png");
    trackImg= loadImage("./images/track.jpg");
    titleImg= loadImage("./images/title.jpeg");
}
function setup()
{
    canvas = createCanvas(windowWidth,windowHeight);

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

    player = createSprite(width/2-20,height-100,50,50);
    player.addImage("running",playerImg);
    player.addImage("moving",player1Run);
    player.addImage("walking",player2Run);
    player.addImage("cycling",player4);
    player.addImage("jumping",player5);
    player.scale=0.7;

    
    for(var i=0;i<7;i++)
    {
        var rX = random(width/2-230,width/2+200);
        var rY = random(height-250,height-3300)
        obs = createSprite(rX,rY,50,50);
        obs.addImage("placing",obstacleImg);
        obs.scale=0.5;
    }
    for(var j=0;j<2;j++)
    {
        var rX = random(width/2-250,width/2+200);
        var rY = random(height-600,height-3800)
        house = createSprite(rX,rY,50,50);
        house.addImage("placing",houseImg);
        house.scale=0.2;
    }
    for(var k=0;k<6;k++)
    {
        var rX = random(width/2-225,width/2+200);
        var rY = random(height-400,height-3300)
        sL1 = createSprite(rX,rY,50,50);
        sL1.addImage("placing",solarImg1);
        sL1.scale=0.5;
    }
    for(var l=0;l<6;l++)
    {
        var rX = random(width/2-260,width/2+200);
        var rY = random(height-300,height-3300)
        sL2 = createSprite(rX,rY,50,50);
        sL2.addImage("placing",solarImg2);
        sL2.scale=0.5;
    }

}

function draw()
{
    background(backgroundImg);

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

        image(player1,width/2-500,height/2-100,150,200);
        image(player2,width/2-340,height/2-100,150,200);
        image(player3,width/2-180,height/2-100,150,200)
        image(player4,width/2-20,height/2-100,150,200);
        image(player5,width/2+140,height/2-100,150,200);

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

       
        heart1 = createSprite(width/2-450,camera.position.y-250,50,50);
        heart1.addImage("living",lifeImg);
        heart1.scale = 0.3;

        heart2 = createSprite(width/2-380,camera.position.y-250,50,50);
        heart2.addImage("living",lifeImg);
        heart2.scale = 0.3;

        //if(player.position.y>=-3208)
        //{
         //   gameState===2;
        //}

        if(player.isTouching(obs) && life<0)
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
    player.changeImage("moving",player1Run);
    gameState = 1;
    console.log("yess")
}
function press2()
{
    player.changeImage("walking",player2Run);
    gameState = 1;
    console.log("yess")
}
function press3()
{
    player.changeImage("running",playerImg);
    gameState = 1;
    console.log("yess")
}
function press4()
{
    player.changeImage("cycling",player4);
    gameState = 1;
    console.log("yess")
}
function press5()
{
    player.changeImage("jumping",player5);
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
}
