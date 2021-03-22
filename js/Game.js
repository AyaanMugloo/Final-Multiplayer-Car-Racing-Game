class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200,20,20);
    car1.addImage(carImage1);
    car2 = createSprite(300,200,20,20);
    car2.addImage(carImage2);
    car3 = createSprite(500,200,20,20);
    car3.addImage(carImage3);
    car4 = createSprite(700,200,20,20);
    car4.addImage(carImage4);

    cars = [car1,car2,car3,car4]
  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(trackImage,0,-(displayHeight*4),displayWidth,displayHeight*5);

      var index = 0;
      var x = 300;
      var y;
      
      for(var plr in allPlayers){
        index += 1;
        x += 250;
        y = displayHeight-allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=250;
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
    }

    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
