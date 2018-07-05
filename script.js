//////////////////////////////////////////////////////////ONLOAD FUNCTION///////////////////////////////////////////
window.onload = function () {
  document.getElementById("start-button").onclick = function () {
  //  window.location.href="game.html"
   
    var opened = window.open("");
    opened.document.write("<!DOCTYPE html>"
      + "<html lang=\"en\">  <head>"
      + "<meta charset=\"UTF-8\">"
      + "<link rel=\"stylesheet\" href=\"style.css\">"
      + "<title>Game</title>"
      + "</head> <body class=\"game-page\">"
      + "<div id=\"game-board\">"
      + "<canvas id='cvx-game' width='1220' height='580'></canvas>"
      + "<div> <span class='hide'>Score </span>"
      // + "<button class='hide'> Start Game </button>"
      + "</div></div>"
      + "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>"
      // + "<script type='text/javascript' src='script.js'></script>"
      + "<script type='text/javascript' src='script_game.js'></script>"
      + "</body></html>"
    );
  }
}