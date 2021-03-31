//overall game function
import Character from './character.js';
var playerAction=setInterval(playerAction,3000);
var enemyAction=setInterval(enemyAction,3000);
function newGame(){
    static const playerArray = []; //player character array
    static const enemyArray = []; //enemy character array
    for(let i = 0; i < 4; i++){ //create 3 player characters
        playerArray[i] = new Character(100, 100, 50);
    }
    for(let i = 0; i < 4; i++){ //create 3 enemy characters
        enemyArray[i] = new Character(80, 100, 100);
    }
    
    do {
        for(let i = 0; i < playerArray.length(); i++){
            playerAction(/*parameters*/);
            updateArray(enemyArray); //if an enemy character dies, they will be removed from the enemy array
            //check win condition -> return from newGame function if true
        }
        for(let i = 0; i < enemyArray.length(); i++){
            enemyAction(enemyArray[i]);
            updateArray(playerArray); //if a player charater dies, they will be removed from the player array
            //check win condition -> return from newGame function if true
        }
    } while(1);
}

function playerAction(playerSelection,action,enemySelection){
    if(action == 0){
        playerArray[input].applyDamage(playerArray[playerSelection],enemyArray[enemySelection],10);
    } else if(action == 1){
        playerArray[input].applyHeal(playerArray[playerSelection],enemyArray[enemySelection],10);
    } else if(action == 2){
        playerArray[input].applyMagic(playerArray[playerSelection],enemyArray[enemySelection],10);
    } else if(action == 3){

    }
}

function enemyAction(toAct){
    var action = Math.floor(Math.random() * (checkHeal(enemyArray) ? 4 : 3));
    var target = Math.floor(Math.random() * playerArray.length());
    //need to validate target - cannot attack dead player or heal an ally at full health
    pseudoMultiplier = Math.random() * 10;
    if(action === 0){
        //toAct.single(toAct, playerArray[target], 25 + pseudoMultiplier, 10);
	toAct.singleEnemy(toAct, playerArray[target]);
    } else if(action === 1){
        //toAct.aoe(toAct, playerArray, 10 + pseudoMultiplier, 15);
	toAct.aoeEnemy(toAct, playerArray);
    } else if(action === 2){
        //item ?
    } else if(action === 3){ //heal MUST be last to remove possibility of AI choosing to heal when impossible (all allys are at full heath)
        target = retLowestHealth(enemyArray);
        //toAct.heal(toAct, enemyArray[target], 5 + pseudoMultiplier, 15);
	    toAct.healEnemy(toAct, enemyArray[target]);
    } else {
        console.log("Random enemy action selection failure");
    }
}

function checkWin(/*parameters*/){

}

//will need to be removed
function updateArray(array) { //splicing function for dead characters
    for(let i = array.length() - 1; i >= 0; i--){
        if(array[i].health === 0){
            array.splice(i, 1); //remove dead character from array
        }
        //edit health bars
    }
}

function checkHeal(array) { //returns false if whole team has full health
    for(let i = 0; i < array.length(); i++){
        if(array[i].health !== array[i].max_health){
            return(true);
        }
    }
    return(false);
}

function retLowestHealth(array) { //can be used in special enemy attack AI. necessary for enemy healing AI
    var retNum = Math.floor(Math.random() * array.length()); //set initial return value to random character index
    for(let i = 0; i < array.length(); i++){
        if(array[i].health < retNum){
            retNum = array[i].health; //set return value to lowest heath value in index
        }
    }
    return(retNum);
}

export {newGame,playerAction,enemyAction,checkWin};