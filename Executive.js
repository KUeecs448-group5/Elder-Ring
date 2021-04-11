
import Character from './character.js';
import * as gameRules from './game.js';

var menu = document.getElementById("start");
menu.onclick = function() {
    console.log("Clicked")
    menu.style.visibility  = "hidden";
    gameRules.newGame();
}