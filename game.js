//overall game function
import Character from './character.js';
    const playerArray = []; //player character array
    const enemyArray = []; //enemy character array
    
function newGame(){
    playerArray[0] = new Character(100,100,0,"Spear Knight",3);
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
        if(enemyArray[i].health !== 0){
        enemyAction(enemyArray, playerArray, enemyArray[i]);
        }
        if(checkWin(playerArray)){
            alert("You Lost. Press the banner to play again.");
            document.getElementById("youDW").src = "assets/youdied.png";
            document.getElementById("loseLink").style.visibility = "visible";
        }
    }
}

function setOwnPlayer(player){
    playerAction(playerArray,enemyArray, player);
}

function playerAction(playerArray,enemyArray,player){
    console.log("BEGIN " + playerArray[player].getName() + " ACTION");
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
        var next = getNext(player, playerArray, enemyArray);
        if(next === -1){
            console.log("Enemy's turn.");
            enemyAttack();
            if(!playerArray || playerArray.length == 0){
                alert("Team is dead");
            }
            else{
                setOwnPlayer(getNext(-1,playerArray,enemyArray));
            }
        }else{
            setOwnPlayer(next);
        }
    }

    aoe.onclick = function(){
        console.clear();
        playerArray[player].aoePlayer(playerArray[player],enemyArray);
        document.getElementById("name"+(player+1)).style.borderBottom = "none";
        document.getElementById("MP"+(player+1)).style.borderBottom = "none";
        var next = getNext(player, playerArray, enemyArray);
        if(next === -1){
            console.log("Enemy's turn.");
            enemyAttack();
            if(!playerArray || playerArray.length == 0){
                alert("Team is dead");
            }
            else{
                setOwnPlayer(getNext(-1,playerArray,enemyArray));
            }
        }else{
            setOwnPlayer(next);
        }
    }

    heal.onclick = function(){
        console.clear();
        var select = verifyTarget(playerArray, 100, "heal");
        playerArray[player].healPlayer(playerArray[player],playerArray[select]);
        document.getElementById("name"+(player+1)).style.borderBottom = "none";
        document.getElementById("MP"+(player+1)).style.borderBottom = "none";
        var next = getNext(player, playerArray, enemyArray);
        if(next === -1){
            console.log("Enemy's turn.");
            enemyAttack();
            if(!playerArray || playerArray.length == 0){
                alert("Team is dead");
            }
            else{
                setOwnPlayer(getNext(-1,playerArray,enemyArray));
            }
        }else{
            setOwnPlayer(next);
        }
    }
    item.onclick = function(){
        console.clear();
        var select = verifyTarget(enemyArray, 0, "attack");
        playerArray[player].useBomb(playerArray[player],enemyArray[select]);
        document.getElementById("name"+(player+1)).style.borderBottom = "none";
        document.getElementById("MP"+(player+1)).style.borderBottom = "none";
        var next = getNext(player, playerArray, enemyArray);
        if(next === -1){
            console.log("Enemy's turn.");
            enemyAttack();
            if(!playerArray || playerArray.length == 0){
                alert("Team is dead");
            }
            else{
                setOwnPlayer(getNext(-1,playerArray,enemyArray));
            }
        }else{
            setOwnPlayer(next);
        }
    }
}

function verifyTarget(group, invalidVal, action){
    var retSelect = parseInt(prompt("Who would you like to " + action + "?:"));
    if(retSelect >= group.length){
        alert("Target " + retSelect + " is an invalid target. Please try again.");
        return verifyTarget(group, invalidVal, action);
    }
    else if(group[retSelect].health == invalidVal ||(group[retSelect].health === 0 && action === "heal")){
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
    
    if(action === 0){
        toAct.singleEnemy(toAct, playerArray[target]);
    } else if(action === 1){
        toAct.aoeEnemy(toAct, playerArray);
    } else if(action === 2){
        toAct.useBomb(toAct ,playerArray[target]);
    } else if(action === 3){ //heal MUST be last to remove possibility of AI choosing to heal when impossible (all allys are at full heath)
        target = retLowestHealth(enemyArray);
        toAct.healEnemy(toAct, enemyArray[target]);
    }
}

function checkWin(array){
    for( let i = 0; i < array.length; i++){
        if(array[i].isAlive()){ 
            return(false);
        }  
    }
    return(true);
}

function getNext(current, group, oppGroup){
    if(checkWin(oppGroup)){
        alert("You won! Press the banner to play again.");
        document.getElementById("youDW").src = "assets/victory.png";
            document.getElementById("loseLink").style.visibility = "visible";
    }else if(current + 1 === group.length){
        return(-1); //enemy turn
    }
    else if(group[current+1].health <= 0){
        return(getNext(current+1, group, oppGroup));
    }
    else{
        return(current+1);
    }
}

function checkHeal(array) { //returns false if whole team has full health
    for(let i = 0; i < array.length; i++){
        if(array[i].health !== array[i].max_health && array[i].health !== 0){
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
