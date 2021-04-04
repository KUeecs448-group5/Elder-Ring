//overall game function
import Character from './character.js';
    const playerArray = []; //player character array
    const enemyArray = []; //enemy character array
    
function newGame(){
    playerArray[0] = new Character(80,100,0,"Spear Knight",3);
    playerArray[1] = new Character(100,100,0,"Shield Knight",4);
    playerArray[2] = new Character(100,100,0,"Sword Knight",5);

    enemyArray[0] = new Character(100,100,100,"Skeleton 1",0);
    enemyArray[1] = new Character(200,100,100,"Boss Skeleton",1);
    enemyArray[2] = new Character(100,100,100,"Skeleton 2",2);
    setOwnPlayer(0);
}

function enemyAttack(){
    for(let i = 0; i < enemyArray.length; i++){
             console.log("\n\n");
             enemyAction(enemyArray, playerArray, enemyArray[i]);
             /*if(checkWin(enemyArray) || checkWin(playerAction)){ check win condition -> return from newGame function if true
                 return;
             }*/
         }
}

function setOwnPlayer(player){
    playerAction(playerArray,enemyArray, player);
}

function playerAction(playerArray,enemyArray,player){
    console.log("BEGIN PLAYER " + player + " ACTION");
    document.getElementById("name"+(player+1)).style.borderBottom = "solid yellow";
    document.getElementById("MP"+(player+1)).style.borderBottom = "solid blue";
    var attack = document.getElementById("Attack");
    var aoe = document.getElementById("AOE");
    var heal = document.getElementById("Heal");
    var item = document.getElementById("Item");
    attack.onclick = function(){
        console.clear();
        //var select = parseInt(prompt("who would you like to attack (0-2)?:"));
        var select = verifyTarget(enemyArray, 0, "attack");
        playerArray[player].singlePlayer(playerArray[player],enemyArray[select]);
        document.getElementById("name"+(player+1)).style.borderBottom = "none";
        document.getElementById("MP"+(player+1)).style.borderBottom = "none";
        player++;
        if(player == playerArray.length){
            console.log("Enemy's turn.");
            enemyAttack();
            if(!playerArray || playerArray.length == 0){
                alert("Team is dead");
            }
            else{
                setOwnPlayer(0);
            }
        }else{
            setOwnPlayer(player);
        }

        
    }

    aoe.onclick = function(){
        console.clear();
        playerArray[player].aoePlayer(playerArray[player],enemyArray);
        document.getElementById("name"+(player+1)).style.borderBottom = "none";
        document.getElementById("MP"+(player+1)).style.borderBottom = "none";
        player++;
        if(player == playerArray.length){
            console.log("Enemy's turn.");
            enemyAttack();
            if(!playerArray || playerArray.length == 0){
                alert("Team is dead");
            }
            else{
                setOwnPlayer(0);
            }
        }else{
            setOwnPlayer(player);
        }
    }

    heal.onclick = function(){
        console.clear();
        var select = verifyTarget(playerArray, 100, "heal");
        playerArray[player].healPlayer(playerArray[player],playerArray[select]);
        document.getElementById("name"+(player+1)).style.borderBottom = "none";
        document.getElementById("MP"+(player+1)).style.borderBottom = "none";
        player++;
        if(player == playerArray.length){
            console.log("Enemy's turn.");
            enemyAttack();
            if(!playerArray || playerArray.length == 0){
                alert("Team is dead");
            }
            else{
                setOwnPlayer(0);
            }
        }else{
            setOwnPlayer(player);
        }
        
        
    }
    item.onclick = function(){
        console.clear();
        var select = verifyTarget(enemyArray, 0, "attack");
        playerArray[player].useBomb(playerArray[player],enemyArray[select]);
        document.getElementById("name"+(player+1)).style.borderBottom = "none";
        document.getElementById("MP"+(player+1)).style.borderBottom = "none";
        player++;
        if(player == playerArray.length){
            console.log("Enemy's turn.");
            enemyAttack();
            if(!playerArray || playerArray.length == 0){
                alert("Team is dead");
            }
            else{
                setOwnPlayer(0);
            }
        }else{
            setOwnPlayer(player);
        }

    }
}

function verifyTarget(group, invalidVal, action){
    var retSelect = parseInt(prompt("Who would you like to " + action + "?:"));
    if(retSelect >= group.length){
        alert("Target " + retSelect + " is an invalid target. Please try again.");
        return verifyTarget(group, invalidVal, action);
    }
    else if(group[retSelect].health == invalidVal){
        alert("Cannot " + action + " " + group[retSelect].getName() + ". Please try again.");
        return verifyTarget(group, invalidVal, action);
    }
    else {
        return retSelect;
    }
}

function enemyAction(enemyArray, playerArray, toAct){
    var action = Math.floor(Math.random() * (checkHeal(enemyArray) ? 4 : 3));
    var target = Math.floor(Math.random() * playerArray.length);
    
    console.log("BEGIN ENEMY " + toAct.getNumberValue() + " ATTACK. action = " + action);
    if(action === 0){
        toAct.singleEnemy(toAct, playerArray[target]);
    } else if(action === 1){
        toAct.aoeEnemy(toAct, playerArray);
        console.log("Enemy does AOE.");
    } else if(action === 2){
        toAct.useBomb(toAct ,playerArray[target]);
        console.log("Enemy item action.");
    } else if(action === 3){ //heal MUST be last to remove possibility of AI choosing to heal when impossible (all allys are at full heath)
        target = retLowestHealth(enemyArray);
        console.log(toAct.getName() + " heals " + enemyArray[target].getName());
        toAct.healEnemy(toAct, enemyArray[target]);
        console.log("Enemy " + target + " health: " + enemyArray[target].health);
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
    var minGap = 0;
    var retNum;
    for(let i = 0; i < array.length; i++){
        if(array[i].max_health - array[i].health > minGap && array[i].health != 0){
            retNum = i; //set return value to lowest heath value in index
            minGap = array[i].max_health - array[i].health;
        }
    }
    return(retNum);
}

export {newGame,playerAction,checkHeal,retLowestHealth}; //add checkwin
