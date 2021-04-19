
import Character from './character.js';
import * as gameRules from './game.js';

var menu = document.getElementById("start");
var dsStart = document.getElementById("start0");
var ffStart = document.getElementById("start1");
var ngeStart = document.getElementById("start2");
var debug = false;
/*
document.addEventListener("DOMContentLoaded", ()=>{
    dsStart.onclick = function() {
        console.log("Clicked")
        menu.style.visibility  = "hidden";
        gameRules.newGame(1);//start world 0/1
    }
})
*/
dsStart.onclick = function() {gameRules.newGame(0)};
ffStart.onclick = function() {gameRules.newGame(1)};
ngeStart.onclick = function() {gameRules.newGame(2)};

export default debug;