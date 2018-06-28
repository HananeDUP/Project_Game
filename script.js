var imgBackground = new Image();
imgBackground.src = "./images/parquet.jpg";

var imgBaby = new Image();
imgBaby.src = "./images/baby_right.jpg";

var imgBottle2 = new Image();
imgBottle2.src = "./images/bottle.jpg";

var imgCanape = new Image();
imgCanape.src = "./images/canape.jpg";

var canvas=document.getElementById("cvx-game");
var ctx = canvas.getContext("2d");

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

var myBaby = {
  x:100,
  y:100,
  draw: function() {
    ctx.drawImage(imgBaby, this.x, this.y, 100, 100);
  },
  moveUp: function(){
    this.y-=10;
  },
  moveDown: function(){
    this.y+=10;
  },
  moveRight: function(){
    this.x+=10;
  },
  moveLeft: function(){
    this.x-=10;
  }
}


function Obstacle(x,maxHeight,minHeight) {
  this.x=x;
  this.maxHeight=maxHeight;
  this.minHeight=minHeight;
  this.y=Math.floor(Math.random()*(this.maxHeight-this.minHeight+1)+this.minHeight);

}

Obstacle.prototype.draw=function(img,obs_width,obs_height) {
  ctx.drawImage(img, this.x, this.y, obs_width, obs_height);
}

// function Bottle(x) {
//   this.x=x;
//   this.maxHeight=350;
//   this.minHeight=50;
//   this.y=Math.floor(Math.random()*(this.maxHeight-this.minHeight+1)+this.minHeight);
// }

// Bottle.prototype.draw=function() {
//   ctx.drawImage(imgBottle2, this.x, this.y, 100, 50);
// }

// function ObstacleCanape()

var bottles=[];
for (var i = 1; i < 100; i++) {
  var bottle = new Obstacle(
    i * 400,350,50
  );
bottles.push(bottle);
}

var canapes=[];
for (var i = 1; i < 100; i++) {
  var canape = new Obstacle(
    i * 350,canvas.height-100,50
  );
  canapes.push(canape);
}

function updateCanvas () {
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  mybackgroundImage.move();
  mybackgroundImage.draw();
  myBaby.draw();

  bottles.forEach(elem => {
    elem.x -= 2;
    elem.draw(imgBottle2,100,50);
  });
  canapes.forEach(elem => {
    elem.x -= 2;
    elem.draw(imgCanape,150,200);
  });
  var myreq;
  myreq = requestAnimationFrame(updateCanvas);

};


function stop(myreq) {
  cancelAnimationFrame(myreq);
}

window.onload = function() {
  
    startGame();
};

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
