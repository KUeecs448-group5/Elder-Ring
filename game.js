//overall game function
import Character from './character.js';
//var playerAction2=setInterval(playerAction,3000);
//var enemyAction2=setInterval(enemyAction,3000);
    const playerArray = []; //player character array
    const enemyArray = []; //enemy character array
    
function newGame(){
    
    // for(let i = 0; i < 4; i++){ //create 3 player characters
    //     playerArray[i] = new Character(100, 100, 50);
    // }
    // for(let i = 0; i < 4; i++){ //create 3 enemy characters
    //     enemyArray[i] = new Character(80, 100, 100);
    // }

    //attack all players with 0 to get health bars started
    playerArray[0] = new Character(80,100,0,"Archer",3);
    playerArray[1] = new Character(100,100,0,"Barbarian",4);
    playerArray[2] = new Character(100,100,0,"Mage",5);

    enemyArray[0] = new Character(100,100,100,"Bad Guy 1",0);
    enemyArray[1] = new Character(100,100,100,"Bad Guy 2",1);
    enemyArray[2] = new Character(100,100,100,"Bad Guy 3",2);
    do {
        
        for(let i = 0; i < playerArray.length; i++){
            playerAction(playerArray,enemyArray, i);
            updateArray(enemyArray); //if an enemy character dies, they will be removed from the enemy array
            /*if(checkWin(enemyArray) || checkWin(playerAction)){ //check win condition -> return from newGame function if true
                return;
            }*/
        }
        
        for(let i = 0; i < enemyArray.length; i++){
            enemyAction(enemyArray, playerArray, enemyArray[i]);
            updateArray(playerArray); //if a player charater dies, they will be removed from the player array
            /*if(checkWin(enemyArray) || checkWin(playerAction)){ //check win condition -> return from newGame function if true
                return;
            }*/
        }
    } while(1);
}
/*
function attackAction(){
    let playerSelection = parseInt(prompt("who would you like to attack with?"));
    let enemySelection = parseInt(prompt("who would you like to attack?(For Heal,type 3)"));
   
    if(enemySelection == 3){
        enemySelection = parseInt(prompt("Who in your party would you like to heal?"));
    }
    let randomEnemyIndex = Math.floor(Math.random() * playerArray.length);
    playerArray[playerSelection].singlePlayer(playerArray[playerSelection],enemyArray[enemySelection])
    //enemyAction(enemyArray, playerArray, enemyArray[randomEnemyIndex]);
    updateArray(playerArray);
    updateArray(enemyArray);

}

function aoeAction(){
    let playerSelection = parseInt(prompt("who would you like to attack with?"));
    let randomEnemyIndex = Math.floor(Math.random() * playerArray.length);
    playerArray[playerSelection].aoePlayer(playerArray[playerSelection],enemyArray)
    //enemyAction(enemyArray, playerArray, enemyArray[randomEnemyIndex]);
    updateArray(playerArray);
    updateArray(enemyArray);

}

function healAction(){
    let playerSelection = parseInt(prompt("who would you like to use heal?"));
    let allySelection = parseInt(prompt("who would you like heal to be used on?"));
    playerArray[playerSelection].healPlayer(playerArray[playerSelection],playerArray[allySelection]);
    //enemyAction(enemyArray, playerArray, enemyArray[randomEnemyIndex]);
    updateArray(playerArray);
    updateArray(enemyArray);
}
*/
//figure out why this repeats
function playerAction(playerArray,enemyArray,player){
    var attack = document.getElementById("Attack");
    var aoe = document.getElementById("AOE");
    var heal = document.getElementById("Heal");
    attack.onclick = function(){
        var select = parseInt(prompt("who would you like to attack (0-2)?:"));
        playerArray[player].singlePlayer(playerArray[player],enemyArray[select]);
    }
    aoe.onclick = function(){
        playerArray[player].aoePlayer(playerArray[player],enemyArray);
    }
    heal.onclick = function(){
        var select = parseInt(prompt("who would you like to use heal (0-2)?:"));
        playerArray[player].healPlayer(playerArray[player],enemyArray);
    }
}

function enemyAction(enemyArray, playerArray, toAct){
    var action = Math.floor(Math.random() * (checkHeal(enemyArray) ? 4 : 3));
    var target = Math.floor(Math.random() * playerArray.length);
    //need to validate target - cannot attack dead player or heal an ally at full health
    var pseudoMultiplier = Math.random() * 10;
    //console.log("Enemy health: " + toAct.health);
    
    console.log("playerArray.length: " + playerArray.length);
    if(action === 0){
        //toAct.single(toAct, playerArray[target], 25 + pseudoMultiplier, 10);
        toAct.singleEnemy(toAct, playerArray[target]);
        console.log("Player " + target + " health: " + playerArray[target].health);
    } else if(action === 1){
        //toAct.aoe(toAct, playerArray, 10 + pseudoMultiplier, 15);
        toAct.aoeEnemy(toAct, playerArray);
        console.log("Enemy does AOE.");
        console.log("Player 0 health: " + playerArray[0].health);
        console.log("Player 1 health: " + playerArray[1].health);
        console.log("Player 2 health: " + playerArray[2].health);
    } else if(action === 2){
        //item ?
    } else if(action === 3){ //heal MUST be last to remove possibility of AI choosing to heal when impossible (all allys are at full heath)
        target = retLowestHealth(enemyArray);
        console.log("Enemy is healing enemy " + target + ". Enemy " + target + " health = " + enemyArray[target].health);
        //toAct.heal(toAct, enemyArray[target], 5 + pseudoMultiplier, 15);
        toAct.healEnemy(toAct, enemyArray[target]);
        console.log("Enemy " + target + " health: " + enemyArray[target].health);
    } else {
        console.log("Random enemy action selection failure");
    }
}
/*
function checkWin(array){
    for( let i =0; i <array.length; i++){
        if(array.isAlive()){ 
            return(false);
        }  
    }
    return(true);
}
*/

//will need to be removed
function updateArray(array) { //splicing function for dead characters
    for(let i = array.length - 1; i >= 0; i--){
        if(array[i].health === 0){
            array.splice(i, 1); //remove dead character from array
        }
        //edit health bars
    }
}

function checkHeal(array) { //returns false if whole team has full health
    for(let i = 0; i < array.length; i++){
        if(array[i].health !== array[i].max_health){
            return(true);
        }
    }
    return(false);
}

function retLowestHealth(array) { //can be used in special enemy attack AI. necessary for enemy healing AI
    //var retNum = Math.floor(Math.random() * array.length); //set initial return value to random character index
    var minHealth = 100;
    var retNum;
    for(let i = 0; i < array.length; i++){
        if(array[i].health < minHealth){
            retNum = i; //set return value to lowest heath value in index
            minHealth = array[i].health;
        }
    }
    return(retNum);
}

export {newGame,playerAction,updateArray,checkHeal,retLowestHealth}; //add checkwin
