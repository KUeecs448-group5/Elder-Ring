//overall game function
import Character from './character.js';
//var playerAction2=setInterval(playerAction,3000);
//var enemyAction2=setInterval(enemyAction,3000);
function newGame(){
    const playerArray = []; //player character array
    const enemyArray = []; //enemy character array
    playerArray[0] = new Character(100,100,0,"Archer",0);
    playerArray[1] = new Character(100,100,0,"Barbarian",1);
    playerArray[2] = new Character(100,100,0,"Mage",2);
    enemyArray[0] = new Character(80,100,100,"Bad Guy",1);
    enemyArray[1] = new Character(80,100,100,"Bad Guy 2",2);
    enemyArray[2] = new Character(80,100,100,"Bad Guy 3",3);
    // for(let i = 0; i < 4; i++){ //create 3 player characters
    //     playerArray[i] = new Character(100, 100, 50);
    // }
    // for(let i = 0; i < 4; i++){ //create 3 enemy characters
    //     enemyArray[i] = new Character(80, 100, 100);
    // }

    //attack all players with 0 to get health bars started

    let playerSelection = prompt("who would you like to attack with?");
    let enemySelection = prompt("who would you like to attack?(For Heal,type 3)");
    let playerSelection2 = parseInt(playerSelection);
    let enemySelection2 = parseInt(enemySelection);
    if(enemySelection2 == 3){
        enemySelection = prompt("Who in your party would you like to heal?");
        enemySelection2 = parseInt(enemySelection);
    }
    //playerAction(playerArray,playerArray,playerSelection2,enemySelection2);
    do {
        for(let i = 0; i < playerArray.length; i++){
            playerAction(playerArray,playerArray,playerSelection2,enemySelection2);
            updateArray(enemyArray); //if an enemy character dies, they will be removed from the enemy array
            if(checkWin(enemyArray) || checkWin(playerAction)){ //check win condition -> return from newGame function if true
                return;
            }
        }
        for(let i = 0; i < enemyArray.length; i++){
            enemyAction(enemyArray[i]);
            updateArray(playerArray); //if a player charater dies, they will be removed from the player array
            if(checkWin(enemyArray) || checkWin(playerAction)){ //check win condition -> return from newGame function if true
                return;
            }
        }
    } while(1);
}

//figure out why this repeats
function playerAction(playerArray,enemyArray,player,enemy){
    document.getElementById("Attack").addEventListener
    ("click", () => 
    playerArray[player].singlePlayer(playerArray[player],enemyArray[enemy]));
    
    document.getElementById("AOE").addEventListener
    ("click", () => 
    playerArray[player].aoePlayer(playerArray[player],enemyArray));

    document.getElementById("Heal").addEventListener
    ("click", () => 
    playerArray[player].healPlayer(playerArray[player],playerArray[enemy]));
}

// function enemyAction(toAct){
//     var action = Math.floor(Math.random() * (checkHeal(enemyArray) ? 4 : 3));
//     var target = Math.floor(Math.random() * playerArray.length1);
//     //need to validate target - cannot attack dead player or heal an ally at full health
//     pseudoMultiplier = Math.random() * 10;
//     if(action === 0){
//         //toAct.single(toAct, playerArray[target], 25 + pseudoMultiplier, 10);
// 	toAct.singleEnemy(toAct, playerArray[target]);
//     } else if(action === 1){
//         //toAct.aoe(toAct, playerArray, 10 + pseudoMultiplier, 15);
// 	toAct.aoeEnemy(toAct, playerArray);
//     } else if(action === 2){
//         //item ?
//     } else if(action === 3){ //heal MUST be last to remove possibility of AI choosing to heal when impossible (all allys are at full heath)
//         target = retLowestHealth(enemyArray);
//         //toAct.heal(toAct, enemyArray[target], 5 + pseudoMultiplier, 15);
// 	    toAct.healEnemy(toAct, enemyArray[target]);
//     } else {
//         console.log("Random enemy action selection failure");
//     }
// }

function checkWin(array){
    for( let i =0; i <array.length; i++){
        if(array[i].health === 0){ 
            return(true);
        }  
    } 
    return(false);
}


//will need to be removed
function updateArray(array) { //splicing function for dead characters
    for(let i = array.length1 - 1; i >= 0; i--){
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

export {newGame,playerAction,checkWin,updateArray,checkHeal,retLowestHealth};
