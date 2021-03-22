var canvas, backgroundImage;

var car1, car2, car3, car4, cars;

var carImage1, carImage2, carImage3, carImage4;
var trackImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

function preload(){
  carImage1 = loadImage("sprites/car1.png");
  carImage2 = loadImage("sprites/car2.png");
  carImage3 = loadImage("sprites/car3.png");
  carImage4 = loadImage("sprites/car4.png");

  trackImage = loadImage("sprites/track.png");
}


function setup(){
  canvas = createCanvas(displayWidth-20,displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState === 2){
    game.end();
  }
}
