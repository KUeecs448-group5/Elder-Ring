
import Character from './character.js';
import * as gameRules from './game.js';
import * as testing from './test.js';

var menu = document.getElementById("start");
var dsStart = document.getElementById("start0");
var ffStart = document.getElementById("start1");
var ngeStart = document.getElementById("start2");
var test = document.getElementById("test")
var dsIcon = document.getElementById("DS-icon1");
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

dsStart.onmouseover = function(){appear(0)};
ffStart.onmouseover = function(){appear(1)};
ngeStart.onmouseover = function(){appear(2)};
dsStart.onmouseleave = function(){disappear(0)};
ffStart.onmouseleave = function(){disappear(1)};
ngeStart.onmouseleave = function(){disappear(2)};
dsStart.onclick = function() {gameRules.newGame(0)};
ffStart.onclick = function() {gameRules.newGame(1)};
ngeStart.onclick = function() {gameRules.newGame(2)};
test.onclick = function(){testing.testAll()}

function appear(index){
    if(index==0){
        document.getElementById("DS-icon1").style.visibility="visible";
        document.getElementById("DS-icon2").style.visibility="visible";
        dsStart.style.color="orange";
        ffStart.style.opacity="50%";
        ngeStart.style.opacity="50%";
    }
    else if(index==1){
        document.getElementById("FF-icon1").style.visibility="visible";
        document.getElementById("FF-icon2").style.visibility="visible";
        ffStart.style.color="rgb(129,165,255)";
        dsStart.style.opacity="50%";
        ngeStart.style.opacity="50%";
    }
    else if(index==2){
        document.getElementById("NGE-icon1").style.visibility="visible";
        document.getElementById("NGE-icon2").style.visibility="visible";
        ngeStart.style.color="red";
        dsStart.style.opacity="50%";
        ffStart.style.opacity="50%";
    }
}

function disappear(index){
    if(index==0){
        document.getElementById("DS-icon1").style.visibility="hidden";
        document.getElementById("DS-icon2").style.visibility="hidden";
        dsStart.style.color="white";
        ffStart.style.opacity="";
        ngeStart.style.opacity="";
    }
    else if(index==1){
        document.getElementById("FF-icon1").style.visibility="hidden";
        document.getElementById("FF-icon2").style.visibility="hidden";
        ffStart.style.color="white";
        dsStart.style.opacity="";
        ngeStart.style.opacity="";
    }
    else if(index==2){
        document.getElementById("NGE-icon1").style.visibility="hidden";
        document.getElementById("NGE-icon2").style.visibility="hidden";
        ngeStart.style.color="white";
        ffStart.style.opacity="";
        dsStart.style.opacity="";
    }
}

export default debug;