
import Character from './character.js';
import * as gameRules from './game.js';

var menu = document.getElementById("start");
var debug = false;
menu.onclick = function() {
    console.log("Clicked")
    menu.style.visibility  = "hidden";
    gameRules.newGame();
}
export default debug;