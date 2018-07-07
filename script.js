var htmlBody="<!DOCTYPE html>"
+ "<html lang=\"en\">  <head>"
+ "<meta charset=\"UTF-8\">"
+ "<link rel=\"stylesheet\" href=\"style.css\">"
+ "<title>Game</title>"
+ "</head> <body class=\"game-page\">"
+ "<div id=\"game-board\">"
+ "<canvas id='cvx-game' width='1300' height=600'></canvas>"
+ "<div class='hide start-stop'> <span>Score: <span id='score'></span> </span>"
+ "<button id='start-button'> START AGAIN </button>"
+ "<button id='stop-button'> STOP </button>"
+ "</div></div>"
+"<div id='showLevel'></div>"
+ "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>"
+ "<script type='text/javascript' src='script.js'></script>"
+ "<script type='text/javascript' src='script_game.js'></script>"
+ "</body></html>"


/////////////////////////////////////////////////////////ONLOAD FUNCTION///////////////////////////////////////////
window.onload = function () {
  document.getElementById("start-button").onclick = function () {
  //  window.location.href="game.html"
  
    var opened = window.open("");
    opened.document.write(htmlBody);
  }
}