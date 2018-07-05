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
var myBaby = {
  x:100,
  y:100,
  height:100,
  width:100,
  imgBaby:imgBabyRight,
  draw: function() {
    ctx.drawImage(this.imgBaby, this.x, this.y, this.width, this.height);
  },
  moveUp: function(){
    this.y-=10;
    this.imgBaby=imgBabyUp;
  },
  moveDown: function(){
    this.y+=10;
    this.imgBaby=imgBabyDown;
  },
  moveRight: function(){
    this.x+=10;
    this.imgBaby=imgBabyRight;
  },
  moveLeft: function(){
    this.x-=10;
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
    if((obs.x-this.x) <-110 && (obs.y-this.y)<-20 && (obs.y-this.y)>-550){
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
    i * 600,200,50
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

// function endGame(){
//   localStorage.setItem('score',0)
// }

/////////////////////////////////////////////////////////////////////////Canvas Update///////////////////////////////
function updateCanvas(tetineOK) {
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  mybackgroundImage.move();
  mybackgroundImage.draw();
  myBaby.draw();

  // drawObstacle();

  bottles.forEach(elem => {
    elem.x -= 2;
    elem.draw(imgBottle2,100,50);
  });

  canapes.forEach(elem => {
    elem.x -= 3;
    elem.draw(imgCanape,150,200);
  });

  canapesObs.forEach(elem => {
    elem.x -= 2;
    elem.draw(imgCanapeObs,500,550)
  });

  if(tetineOK===1) {
    tetines.forEach(elem => {
      elem.y += 1;
      elem.draw(imgTetine,60,60)
    });
  
  }

  // bottles2.forEach(elem => {
  //   elem.x -= 4;
  //   elem.draw(imgBottle2,100,50);
  // });


  var myreq;
  myreq = requestAnimationFrame(updateCanvas);

  var collusion_baby_bottle=bottles.findIndex(obst => {
    return myBaby.babyVsBottleCollusion(obst);
  })
  
  if (collusion_baby_bottle != -1) {
    stop(myreq); 
    // var index_bottle= bottles.findIndex((o)=> {return o.x === bottledrink.x});
    bottles.splice(collusion_baby_bottle,1);
    // ctx.drawImage(imgHappyBaby, myBaby.x, myBaby.y, myBaby.width, myBaby.height); 
    score+=5;
    localStorage.setItem('score',score);
    setTimeout(function(){
      updateCanvas();
    },300); 
  }

  var collusion_baby_mom=canapes.findIndex(obst => {
    return myBaby.babyVsMomCollusion(obst);
  })

  if (collusion_baby_mom!=-1) {
    stop(myreq); 
    // ctx.drawImage(imgBabySmile, myBaby.x, myBaby.y, myBaby.width, myBaby.height); 
    canapes.splice(collusion_baby_mom,1);
    score+=10;
    localStorage.setItem('score',score);
    setTimeout(function(){
      // window.location.href = "game.html";
      updateCanvas(1);
    },300); 
    

  };
  
  var collusion_baby_canape=canapesObs.some(obst => {
    return myBaby.babyVsCanapeCollusion(obst);
  })

  if (collusion_baby_canape) {
    stop(myreq); 
    // endGame(); 
  };
  scoreFill(score);
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
  