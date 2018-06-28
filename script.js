var imgBackground = new Image();
imgBackground.src = "./images/parquet.jpg";

var imgBaby = new Image();
imgBaby.src = "./images/baby_right.jpg";

var imgBottle2 = new Image();
imgBottle2.src = "./images/bottle.jpg";

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
    ctx.drawImage(imgBackground, this.x, 0, 900, 400);
    ctx.drawImage(imgBackground, this.x+canvas.width, 0, 900,400);
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

function Bottle() {
  this.x=500;
  this.y=100;
}

Bottle.prototype.draw=function() {
  ctx.drawImage(imgBottle2, this.x, this.y, 150, 100);
}


var bottles=[];
for (var i = 1; i < 100; i++) {
  var bottle = new Bottle(
    i * 150,i*100

  );
bottles.push(bottle);
}

function updateCanvas () {
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  mybackgroundImage.move();
  mybackgroundImage.draw();
  myBaby.draw();

  bottles.forEach(elem => {
    elem.x -= 2;
    elem.draw();
  });

  var myreq;
  myreq = requestAnimationFrame(updateCanvas);

};


function stop(myreq) {
  cancelAnimationFrame(myreq);
}

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
    document.getElementById("start-button").blur();
  };
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
