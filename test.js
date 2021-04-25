import Character from './character.js';
import {enemyAnimate, words, names, enames, music, playerIdleGifs, enemyIdleGifs, background, charId, nameId, values, bAattack, bAaoe, bAitem, bAheal, bTattack, bTaoe, bTitem, bTheal, bANattack, bANdamage, healthId, manaId, deathId} from './data.js';
import { checkHeal, newGame, retLowestHealth } from './game.js';
export {testAll}

const testplayerArray = []
const testenemyArray = []
let status = "Failed"

function testAll(){
    testplayerArray[0] = new Character(100,100,names[0][0],3);
    testplayerArray[1] = new Character(100,100,names[0][1],4);
    testplayerArray[2] = new Character(100,100,names[0][2],5);

    testenemyArray[0] = new Character(100,100,enames[0][0],0);
    testenemyArray[1] = new Character(200,100,enames[0][1],1);
    testenemyArray[2] = new Character(100,100,enames[0][2],2);
    testHealthDepletion()
    testManaDepletion()
    testSingleAttack()
    testHeal()
    testItem()
    testAoE()
    testHealCheck()
    testAIHealSelect()
    testIsAlive()
    console.log("Test complete. Restart window to reload assets")
}

function testHealthDepletion(){
    testplayerArray[0].health = 100
    testenemyArray[0].health = 100
    testplayerArray[0].applyDamage(testenemyArray[0], 10)
    status = "Failed"
    if(testenemyArray[0].health < 100){
        status = "Passed"
    }
    console.log("Health Depletion Test: " + status)
}

function testManaDepletion(){
    testplayerArray[0].magic = 100
    testplayerArray[0].applyMagic(10)
    status = "Failed"
    if(testplayerArray[0].magic < 100){
        status = "Passed"
    }
    console.log("Mana Depletion Test: " + status)
}

function testSingleAttack(){
    testplayerArray[0].magic = 100
    testenemyArray[0].health = 100
    testplayerArray[0].damage_single(testenemyArray[0],values[0])
    if(testenemyArray[0].health != 100 && testplayerArray[0].magic < 100){
        status = "Passed"
    }
    console.log("Single Attack Test (enemy damaged and player's mana reduced): " + status)
}


function testHeal(){
    testplayerArray[1].magic = 100
    testplayerArray[1].health = 90
    testplayerArray[1].heal_single(testplayerArray[1],values[2]);
    status = "Failed"
    if(testplayerArray[1].health >90 && testplayerArray[1].magic <100){
        status = "Passed"
    }
    console.log("Heal Test (party member healed and player's mana reduced): " + status)
}

function testItem(){
    testenemyArray[0].health = 100
    testplayerArray[0].item = 3
    testplayerArray[0].useItem(testenemyArray[0],values[3]);
    status = "Failed"
    if(testenemyArray[0].health < 100 && testplayerArray[0].item == 2){
        status = "Passed"
    }
    console.log("Item Test (enemy damaged and player inventory reduced by 1): " + status)
}

function testAoE(){
    testenemyArray[0].health = 100
    testenemyArray[1].health = 200
    testenemyArray[2].health = 100
    testplayerArray[0].magic = 100
    testplayerArray[0].damage(testenemyArray,values[1]);
    status = "Failed"
    if(testenemyArray[0].health < 100 && testenemyArray[1].health < 200 && testenemyArray[2].health < 100 && testplayerArray[0].magic < 100){
        status = "Passed"
    }
    console.log("AoE Attack Test (damaged enemy and player's mana reduced): " + status)
}

function testWinCondition(){
    testenemyArray[0].health = 0
    testenemyArray[1].health = 0
    testenemyArray[2].health = 0
    status = "Failed"
    if(checkWin(enemyArray)){
        status = "Passed"
    }
    console.log("Win Condition Test (win condition returns true when all enemies have 0 health): ")
}

function testHealCheck(){
    testplayerArray[0].health = 100
    testplayerArray[1].health = 100
    testplayerArray[2].health = 100
    testenemyArray[0].health = 90
    testenemyArray[0].health = 100
    testenemyArray[0].health = 100
    status = "Failed"
    if(!checkHeal(testplayerArray) && checkHeal(testenemyArray)){
        status = "Passed"
    }
    console.log("Heal Check Test (Heal check returns false if team is all at full health and true otherwise): " + status)
}

function testAIHealSelect(){
    testenemyArray[0].health = 100
    testenemyArray[1].health = 150
    testenemyArray[2].health = 90
    status = "Failed"
    if(retLowestHealth(testenemyArray) == 1){
        status = "Passed"
    }
    console.log("Enemy AI Heal Selection Test (Selection function returns index of member with largest health depletion): " + status)
}

function testIsAlive(){
    testplayerArray[0].health = 0
    testplayerArray[1].health = 100
    status = "Failed"
    if(!testplayerArray[0].isAlive() && testplayerArray[1].isAlive()){
        status = "Passed"
    }
    console.log("Character Alive Check Test (Return true if character health is greater than 0, and false otherwise): "+status)
}