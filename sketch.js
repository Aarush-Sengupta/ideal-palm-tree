var bg,BGImg
var shooterImg,shootingImg
var player
var zombie,zombieIMG
var zombieGrp
var bullet , bulletGRP
var h1img , h2img ,h3img
var H1 , H2 ,H3

function preload(){
  BGImg= loadImage("assets/bg.jpeg")
  shooterImg= loadImage("assets/shooter_2.png")
  shootingImg= loadImage("assets/shooter_3.png")
  zombieIMG= loadImage("assets/zombie.png")
  h3img= loadImage("assets/heart_3.png")
  h2img= loadImage("assets/heart_2.png")
  h1img= loadImage("assets/heart_1.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  // adding BG image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(BGImg)
  bg.scale = 1.1
  //Creating Player
  player = createSprite(100,400)
  player.addImage(shooterImg)
  player.scale = 0.5
  player.setCollider("rectangle",0,0,200,300)
  player.debug=true
  //Creating Group
  zombieGrp = new Group();
  bulletGRP = new Group()
  //Hearts
  H1 = createSprite(20,20,100,20)
  H1.addImage(h1img)
  H1.scale = 0.3
  H2 = createSprite(60,20,100,20)
  H2.addImage(h2img)
  H2.scale = 0.3
  H3 = createSprite(100,20,100,20)
  H3.addImage(h3img)
  H3.scale = 0.3

  H1.visible=false
  H2.visible=false
  
}

function draw(){
  background(65)
  //Change
  if(keyWentDown("SPACE")){
    player.addImage(shootingImg)
    var bullet =createSprite(player.x,player.y-40,20,4)
    bullet.velocityX= 10
    bulletGRP.add(bullet)
      bullet.lifetime = 1000
      
  }

  if(keyWentUp("SPACE")){
    player.addImage(shooterImg)
  }

  if(keyDown("LEFT")){
    player.x -= 8

  }

  if(keyDown("Right")){
    player.x += 8

  }

  if(keyDown("UP")){
    player.y -= 8

  }

  if(keyDown("DOWN")){
    player.y += 8

  }
  Enemy()
  
  //checking Collsion
    if(zombieGrp.isTouching(player)){
      for(var i=0;i<zombieGrp.length;i++){
        if(zombieGrp[i].isTouching(player)){
          zombieGrp[i].destroy() 

        }
      }
      
    }

    if(bulletGRP.isTouching(zombieGrp)){
      for(var i=0;i<zombieGrp.length;i++){
        if(zombieGrp[i].isTouching(bulletGRP)){
          zombieGrp[i].destroy()
          bulletGRP.destroyEach() 
        }
    }
  }



  drawSprites()
}

function Enemy(){
  if(frameCount%50==0){
    zombie=createSprite(random(700,1100),random(100,500),40,40 )
      zombie.addImage(zombieIMG)
      zombie.scale = 0.15
      zombie.velocityX=-0.9
      zombieGrp.add(zombie)
      zombie.lifetime = 1000
      zombie.setCollider("rectangle",0,0,200,300)
      zombie.debug=true
  }
}