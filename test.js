import Character from './character.js';
import {enemyAnimate, words, names, enames, music, playerIdleGifs, enemyIdleGifs, background, charId, nameId, values, bAattack, bAaoe, bAitem, bAheal, bTattack, bTaoe, bTitem, bTheal, bANattack, bANdamage, healthId, manaId, deathId} from './data.js';
export {testAll}

const testplayerArray = []
const testenemyArray = []

function testAll(){
    testplayerArray[0] = new Character(100,100,names[0][0],3);
    testplayerArray[1] = new Character(100,100,names[0][1],4);
    testplayerArray[2] = new Character(100,100,names[0][2],5);

    testenemyArray[0] = new Character(100,100,enames[0][0],0);
    testenemyArray[1] = new Character(200,100,enames[0][1],1);
    testenemyArray[2] = new Character(100,100,enames[0][2],2);
    testSingleAttack()
    testAoE()
    testHeal()
    testItem()

}
function testSingleAttack(){
   
    testplayerArray[0].damage_single(testenemyArray[0],values[0])
    let status = "Failed"
    if(testenemyArray[0].health != 100 && testplayerArray[0].magic < 100){
        status = "Passed"
    }
    console.log("Single Attack Test(enemy damaged and player's mana reduced): " + status)
}


function testAoE(){
    testplayerArray[0].damage(testenemyArray,values[1]);
    status = "Failed"
    if(testenemyArray[0].health < 100 && testenemyArray[1].health < 200 && testenemyArray[2].health < 100 && testplayerArray[0].magic < 100){
        status = "Passed"
    }
    console.log("AoE Attack Test(damaged enemy and player's mana reduced): " + status)
}

function testHeal(){
    testplayerArray[0].heal_single(testplayerArray[0],values[2]);
    status = "Failed"
    if(testplayerArray[0].health >90 && testplayerArray[0].magic <100){
        status = "Passed"
    }
    console.log("Heal Test(party member healed and player's mana reduced): " + status)
}

function testItem(){
    testplayerArray[0].useItem(testenemyArray[0],values[3]);
    status = "Failed"
    if(testenemyArray[0].health !=100 && testplayerArray[0].item == 2){
        status = "Passed"
    }
    console.log("Item Test(enemy damaged and player inventory reduced by 1): " + status)
}