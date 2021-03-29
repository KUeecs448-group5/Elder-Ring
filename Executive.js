
import Character from './character.js';
import * as gameRules from './game.js';
let warrior = new Character(100,100,100);
let enemy =  new Character(100,100,100);
let playerSelection = prompt("who would you like to attack with?");
let enemySelection = prompt("who would you like to attack?");
gameRules.newGame();
gameRules.playerAction(playerSelection,enemySelection,10);




console.log("hello");








document.getElementById("Attack").addEventListener("click", () => warrior.applyDamage());
document.getElementById("AOE").addEventListener("click", () => console.log("Warrior uses AOE"));
document.getElementById("Heal").addEventListener("click", () => console.log("Warrior uses Heal"));
document.getElementById("Item").addEventListener("click", () => console.log("Warrior uses Item"));
