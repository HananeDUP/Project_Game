////////////////////////////////////////////////////////////////////////////IMAGES///////////////////////////////////////

var imgBackground = new Image();
imgBackground.src = "./images/parquet_1.jpg";

var imgBabyRight = new Image();
imgBabyRight.src = "./images/baby_right_transp.png";

var imgBabyLeft = new Image();
imgBabyLeft.src = "./images/baby_left_transp.png";

var imgBabyUp = new Image();
imgBabyUp.src = "./images/baby_up_transp.png";

var imgBabyDown = new Image();
imgBabyDown.src = "./images/baby_down_transp.png";

var imgHappyBaby = new Image();
imgHappyBaby.src = "./images/happy_baby_transp.png";

var imgBabySmile = new Image();
imgBabySmile.src = "./images/baby_sourire_transp.png";

var imgBottle2 = new Image();
imgBottle2.src = "./images/baby_bottle_2_transp.png";

var imgCanape = new Image();
imgCanape.src = "./images/canape_transp.png";

var imgCanapeObs = new Image();
imgCanapeObs.src = "./images/canape_obs_transp.png";

var imgTetine = new Image();
imgTetine.src = "./images/tetine_transp.png";

var canvas=document.getElementById("cvx-game");
var ctx = canvas.getContext("2d");


////////////////////////////////////////////////////////////////////////BACKGROUND IMAGE/////////////////////////////////
var mybackgroundImage = {
  speed:-2,
  x:0,
  move: function() {
    this.x += this.speed;
    this.x %= canvas.width;
  },
  draw: function() {
    ctx.drawImage(imgBackground, this.x, 0, canvas.width, canvas.height);
    ctx.drawImage(imgBackground, this.x+canvas.width, 0, canvas.width, canvas.height);
  }
}

///////////////////////////////////////////////////////////////////////BABY//////////////////////////////////////////////
// var speedB=10;
var myBaby = {
  x:100,
  y:100,
  speedB:10,
  height:100,
  width:100,
  imgBaby:imgBabyRight,
  draw: function() {
    ctx.drawImage(this.imgBaby, this.x, this.y, this.width, this.height);
  },
  moveUp: function(){
    this.y-=this.speedB;
    this.imgBaby=imgBabyUp;
  },
  moveDown: function(){
    this.y+=this.speedB;
    this.imgBaby=imgBabyDown;
  },
  moveRight: function(){
    this.x+=this.speedB;
    this.imgBaby=imgBabyRight;
  },
  moveLeft: function(){
    this.x-=this.speedB;
    this.imgBaby=imgBabyLeft;
  },
  babyVsBottleCollusion: function(obs){
    if((obs.x-this.x) <this.width-20 && ((obs.y-this.y)<90 && (obs.y-this.y)>-45)){
      return "collusion";
    }
  },
  babyVsMomCollusion: function(obs){
    if((obs.x-this.x) <this.width-20 && ((obs.y-this.y<90 && (obs.y-this.y)>-160))){
      return "collusion";
    }
  },
  babyVsCanapeCollusion: function(obs){
    if((obs.x-this.x) <-120 && (obs.x-this.x) >-300 && (obs.y-this.y)<-20 && (obs.y-this.y)>-400){
      return "collusion";
    }
  }
}

///////////////////////////////////////////////////////////////////////OBSTACLES////////////////////////////////////
function Obstacle(x,maxHeight,minHeight) {
// function Obstacle(x,y) {
  this.x=x;
  this.maxHeight=maxHeight;
  this.minHeight=minHeight;
  this.y=Math.floor(Math.random()*(this.maxHeight-this.minHeight+1)+this.minHeight);
  // this.y=y;
}

Obstacle.prototype.draw=function(img,obs_width,obs_height) {
  ctx.drawImage(img, this.x, this.y, obs_width, obs_height);
}

function ObstacleVert(y,maxWidth,minWidth) {
  // function Obstacle(x,y) {
    this.maxWidth=maxWidth;
    this.minWidth=minWidth;
    this.x=Math.floor(Math.random()*(this.maxWidth-this.minWidth+1)+this.minWidth);
    this.y=y;
    // this.y=y;
  }
  
  ObstacleVert.prototype.draw=function(img,obs_width,obs_height) {
    ctx.drawImage(img, this.x, this.y, obs_width, obs_height);
  }

//Creation Obstacles: Bottle, Bottle2, Canape
var bottles=[];
for (var i = 1; i < 100; i++) {
  var bottle = new Obstacle(
    i * 400,550,50
  );
bottles.push(bottle);
}

var bottles2=[];
for (var i = 1; i < 100; i++) {
  var bottle = new Obstacle(
    i * 50,550,50
  );
bottles2.push(bottle);
}

var canapes=[];
for (var i = 1; i < 100; i++) {
  var canape = new Obstacle(
    i * 500,500,50
  );
  canapes.push(canape);
}

var canapesObs=[];
for (var i = 1; i < 100; i++) {
  var canapeObs = new Obstacle(
    i * 800,200,50
  );
  canapesObs.push(canapeObs);
}

var tetines=[];
for (var i = 1; i < 100; i++) {
  var tetine = new ObstacleVert(
    i * 100,500,300
  );
  tetines.push(tetine);
}
var tetineOK=0;
var show=true;
///////////////////////////////////////////////////////////////////OTHERS//////////////////////////////////////////

function findObs(obs,x,y) {
  obs.x=x;
  obs.y=y;
  return obs;
}
// var score=parseInt(localStorage.getItem('score'));
var score=0;

function scoreFill(score) {
  ctx.font="50px serif";
  ctx.fillStyle="black";
  ctx.fillText('Score: '+score, 50,50);
}

function stop(myreq) {
  cancelAnimationFrame(myreq);
}


function showStartButton(score){
  $(".start-stop").show();
  $(".hide").css({
    display:"flex",
    flexDirection:'column'
  });
  // $(".hide span, .hide button").css("display","inline-block");
  $("#score").html(score);
  $(".hide").css({
    position: 'absolute',
    top:'30vh',
    left:'70vh',
    'font-size':'2em',
    backgroundColor: 'gray',
    padding: '20px',
    borderRadius: '5px',
    color: 'white'
  });
  $('.hide span').css('margin-bottom','20px'),
  $('.hide button').css({
    'font-size':'0.8em',
    'width':'250px'
  }),
  document.getElementById("start-button").onclick = function () {
    window.close();
    var opened = window.open("");
    opened.document.write(htmlBody);
  }
  document.getElementById("stop-button").onclick = function () {
    window.close();
  }
}

function newLevelShow(LevelName){
  $('#showLevel').html(LevelName);
  $('#showLevel').show();
  $('#showLevel').css({
    position: 'absolute',
    top:'10vh',
    left:'40vw',
    height: '50px',
    width: '150px',
    backgroundColor: 'gray',
    fontSize: '1.8em',
    paddingTop:'40px',
    color:'white',
    borderRadius: '5px',
  });
  level=0;
  show=false;
  setTimeout(()=>{
    $('#showLevel').hide();
  },300)

}

//////////////////////////////////////////////////SPEED VARIABLES//////////////////////////////////////////////////
var speedX=2;
var speedY=1;
var level=0;

//////////////////////////////////////////////////Canvas Update////////////////////////////////////////////////////
function updateCanvas() {
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  mybackgroundImage.move();
  mybackgroundImage.draw();
  myBaby.draw();

  // drawObstacle();

  bottles.forEach(elem => {
    elem.x -= speedX;
    elem.draw(imgBottle2,100,50);
  });

  canapes.forEach(elem => {
    elem.x -= speedX+1;
    elem.draw(imgCanape,150,200);
  });

  canapesObs.forEach(elem => {
    elem.x -= speedX;
    elem.draw(imgCanapeObs,500,550)
  });

  if(tetineOK===1) {
    tetines.forEach(elem => {
      elem.y += speedY;
      elem.draw(imgTetine,60,60)
    });
  
  }

  var collusion_baby_bottle=bottles.findIndex(obst => {
    return myBaby.babyVsBottleCollusion(obst);
  })
  
  if (collusion_baby_bottle != -1) {
    stop(myreq); 
    bottles.splice(collusion_baby_bottle,1);
    score+=5;
  }

  var collusion_baby_mom=canapes.findIndex(obst => {
    return myBaby.babyVsMomCollusion(obst);
  })

  if (collusion_baby_mom!=-1) {
    stop(myreq); 
    canapes.splice(collusion_baby_mom,1);
    score+=10;
    localStorage.setItem('score',score);
    setTimeout(function(){
      for (var i = 1; i < 100; i++) {
        var tetine = new ObstacleVert(
          i * 100,500,300
        );
        tetines.push(tetine);
      }
      // window.location.href = "game.html";
      tetineOK=1;
      // updateCanvas();
    },300); 
  };
  
  var collusion_baby_canape=canapesObs.some(obst => {
    return myBaby.babyVsCanapeCollusion(obst);
  })
 
  scoreFill(score);
  if( score >=30 && score <=35 && show){

    level=1;
  }else if( score >=50 && score <=55  && show){
    level=2;
  }else if( score >=70 && score <=75  && show){
    level=3;
  }else if( score >=90 && score <=95  && show){
    level=4;
  }

  if(level===1){
    speedX=4;
    speedY=2;
    myBaby.speedB=20;
    newLevelShow("LEVEL 1")

  }else if(level === 2){
    speedX=6;
    speedY=3;
    myBaby.speedB=30;
    newLevelShow("LEVEL 2")
  }else if(level === 3){
    speedX=8;
    speedY=4;
    myBaby.speedB=40;
    newLevelShow("LEVEL 3")
  }else if(level === 4){
    speedX=10;
    speedY=5;
    myBaby.speedB=50;
    newLevelShow("LEVEL 4")
  }
  var myreq;
  myreq = requestAnimationFrame(updateCanvas);

  if (collusion_baby_canape) {
    stop(myreq);
    showStartButton(score);
    // endGame(); 
  };

};

// $(document).ready(function() {
    $(".hide").hide();
    startGame();
  
//   });
  
  
  ////////////////////////////////////////////////////////////START GAME & KEY CODE////////////////////////////////////////
  function startGame() { 
    imgBackground.onload = updateCanvas();
    // myboard.faby.draw();
    document.onkeydown = function(e) {
      switch (e.keyCode) {
        case 38:
          myBaby.moveUp();
          break;
        case 40:
          myBaby.moveDown();
          break;
        case 37:
          myBaby.moveLeft();
          break;
        case 39:
          myBaby.moveRight();
          break;
      }
    };
  }
  