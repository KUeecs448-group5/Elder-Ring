//overall game function
import Character from './character.js';
    const playerArray = []; //player character array
    const enemyArray = []; //enemy character array
    
function newGame(){
    playerArray[0] = new Character(100,100,"Spear Knight",3);
    playerArray[1] = new Character(100,100,"Shield Knight",4);
    playerArray[2] = new Character(100,100,"Sword Knight",5);

    enemyArray[0] = new Character(100,100,"Skeleton 1",0);
    enemyArray[1] = new Character(200,100,"Boss Skeleton",1);
    enemyArray[2] = new Character(100,100,"Skeleton 2",2);
    
    setOwnPlayer(0);
}

var values = [
    [15,10],//single attack player 0
    [5,5],//aoe player 1
    [10,15],//heal player 2
    [20,0],//item 3
    [20,10],//single attack enemy 4
    [5,5],//aoe enemy 5
    [10,15]//heal enemy 6
]

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
    attack.addEventListener("mouseover",function(){
        document.getElementById("infoBox").innerHTML = "Single attack. Moderate damage(10-25). Mana cost: 10";
    })
    var aoe = document.getElementById("AOE");
    aoe.addEventListener("mouseover",function(){
        document.getElementById("infoBox").innerHTML = "AoE attack. Low damage(5-15) but damages all enemies. Mana cost:15";
    })
    var heal = document.getElementById("Heal");
    heal.addEventListener("mouseover",function(){
        document.getElementById("infoBox").innerHTML = "Heal target from 10-20 health. Mana cost: 10";
    })
    var item = document.getElementById("Item");
    item.addEventListener("mouseover",function(){
        document.getElementById("infoBox").innerHTML = "Throw a bomb at a single enemy. Mana cost:0, but only 3 uses";
    })
    attack.onclick = function(){
        console.clear();
        //var select = parseInt(prompt("who would you like to attack (0-2)?:"));
        var select = verifyTarget(enemyArray, 0, "attack");
        playerArray[player].damage_single(enemyArray[select],values[0]);
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
        playerArray[player].damage(enemyArray,values[1]);
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
        playerArray[player].heal_single(playerArray[select],values[2]);
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
        playerArray[player].useItem(enemyArray[select],values[3]);
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
        toAct.damage_single(playerArray[target],values[4]);
    } else if(action === 1){
        toAct.damage(playerArray,values[5]);
    } else if(action === 2){
        toAct.useItem(playerArray[target],values[3]);
    } else if(action === 3){ //heal MUST be last to remove possibility of AI choosing to heal when impossible (all allys are at full heath)
        target = retLowestHealth(enemyArray);
        toAct.heal_single(enemyArray[target],values[6]);
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
