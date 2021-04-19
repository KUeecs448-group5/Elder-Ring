//overall game function
import debug from './Executive.js';
import Character from './character.js';
    const playerArray = []; //player character array
    const enemyArray = []; //enemy character array
function newGame(world){
    var menu = document.getElementById("start");
    menu.style.visibility = "hidden";
    gameMode = world;
    if(gameMode != 0){
        worldChange(gameMode);
    }
    //document.getElementById(music[gameMode]).play();
    playerArray[0] = new Character(100,100,"Spear Knight",3);
    playerArray[1] = new Character(100,100,"Solaire",4);
    playerArray[2] = new Character(100,100,"Artorias",5);

    enemyArray[0] = new Character(100,100,"Skeleton 1",0);
    enemyArray[1] = new Character(200,100,"Boss Skeleton",1);
    enemyArray[2] = new Character(100,100,"Skeleton 2",2);
    
    setOwnPlayer(0);
}

let gameMode = 0;

let actionBox = document.getElementById("infoBox2");

let music = [
    "PPP",
    "OWA"
];

let playerIdleGifs = [
    [
        "assets/spear.gif",
        "assets/solaire.gif",
        "assets/artorias.gif"
    ],
    [
        "assets/FFGirlIdle.gif",
        "assets/cloudStrifeIdle.gif",
        "assets/barretWallaceIdle.gif"
    ]
];

let enemyIdleGifs = [
    [
        "assets/skeleton.gif",
        "assets/nito.gif",
        "assets/skeleton.gif"
    ],
    [
        "assets/skeleton.gif",
        "assets/SephirothIdle.gif",
        "assets/skeleton.gif"
    ]
];

let background = [
    "assets/Battle.jpeg",
    "assets/Battle2.jpg"
];


var charId = [
    document.getElementById("enemy1Click"),
    document.getElementById("enemy2Click"),
    document.getElementById("enemy3Click"),
    document.getElementById("player1Click"),
    document.getElementById("player2Click"),
    document.getElementById("player3Click"),
];

var values = [
    [15,10],//single attack player 0
    [5,5],//aoe player 1
    [10,15],//heal player 2
    [20,0],//item 3
    [20+(gameMode*5),10],//single attack enemy 4
    [5+(gameMode*5),5],//aoe enemy 5
    [10+(gameMode*5),15]//heal enemy 6
];

function worldChange(i){
    console.log("Changing things");
    document.getElementById("background").src = background[i];
    charId[0].src = enemyIdleGifs[i][0];
    charId[1].src = enemyIdleGifs[i][1];
    charId[2].src = enemyIdleGifs[i][2];
    charId[3].src = playerIdleGifs[i][0];
    charId[4].src = playerIdleGifs[i][1];
    charId[5].src = playerIdleGifs[i][2];
    if(gameMode == 1){
        charId[3].style.transform = "scale(0.85)";
        charId[4].style.width = "200px";
        charId[5].style.transform = "scale(0.85)";
        //document.getElementById("player1").style.border = "solid 1px transparent"
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
async function enemyAttack(){
    await sleep(2000)
    actionBox.innerHTML = "Enemy's Turn."
    await sleep(2000)
    for(let i = 0; i < enemyArray.length; i++){
        console.log("\n\n");
        if(enemyArray[i].health !== 0){
            enemyAction(enemyArray, playerArray, enemyArray[i])
            await sleep(3000)
        }
        if(checkWin(playerArray)){
            alert("You Lost. Press the banner to play again.");
            document.getElementById("youDW").src = "assets/youdied.png";
            document.getElementById("loseLink").style.visibility = "visible";
        }
    }
    await sleep(2000)
    actionBox.innerHTML = "It is now Spear Knight's turn"
}

function setOwnPlayer(player){
    playerAction(playerArray,enemyArray, player);
}

function playerAction(playerArray,enemyArray,player){
    //actionBox.innerHTML = "BEGIN " + playerArray[player].getName() + " ACTION"
    //actionBox.innerHTML = "It is now " + playerArray[player].getName() + "'s turn"
    document.getElementById("name"+(player+1)).style.borderBottom = "solid yellow";
    document.getElementById("MP"+(player+1)).style.borderBottom = "solid blue";
    if(player === 0){
        document.getElementById("weapon icon").src = "assets/halberd.png";
        document.getElementById("spell icon").src = "assets/aoe.png";
        document.getElementById("item icon").src = "assets/bomb.png";
    } else if (player === 1){
        document.getElementById("weapon icon").src = "assets/solaire-sword.png";
        document.getElementById("spell icon").src = "assets/lightning_storm.png";
        document.getElementById("item icon").src = "assets/lightning_urn.png";
    } else {
        document.getElementById("weapon icon").src = "assets/sword.png";
        document.getElementById("spell icon").src = "assets/affinity.png";
        document.getElementById("item icon").src = "assets/throwing_knife.png";
    }
    var attack = document.getElementById("Attack");
    attack.addEventListener("mouseover",function(){
        if(player === 0){
            document.getElementById("action").innerHTML = "<strong>Halberd</strong>";
        } else if (player === 1) {
            document.getElementById("action").innerHTML = "<strong>Sunlight Sword</strong>";
        } else if (player === 2) {
            document.getElementById("action").innerHTML = "<strong>Wolf Knight Sword</strong>";
        }
        document.getElementById("infoBox").innerHTML = "Single attack. Moderate damage(10-25). Mana cost: 10";
    })
    var aoe = document.getElementById("AOE");
    aoe.addEventListener("mouseover",function(){
        if(player === 0){
            document.getElementById("action").innerHTML = "<strong>Fire Storm</strong>";
        } else if (player === 1) {
            document.getElementById("action").innerHTML = "<strong>Lightning Strike</strong>";
        } else if (player === 2) {
            document.getElementById("action").innerHTML = "<strong>Dark Affinity</strong>";
        }
        document.getElementById("infoBox").innerHTML = "Area of Effect attack. Low damage(5-15) but damages all enemies. Mana cost:15";
    })
    var heal = document.getElementById("Heal");
    heal.addEventListener("mouseover",function(){
        document.getElementById("action").innerHTML = "<strong>Estus Flask</strong>";
        document.getElementById("infoBox").innerHTML = "Heal target from 10-20 health. Mana cost: 10";
    })
    var item = document.getElementById("Item");
    item.addEventListener("mouseover",function(){
        if(player === 0){
            document.getElementById("action").innerHTML = "<strong>Fire Bomb</strong>";
        } else if (player === 1) {
            document.getElementById("action").innerHTML = "<strong>Lightning Urn</strong>";
        } else if (player === 2) {
            document.getElementById("action").innerHTML = "<strong>Throwing Knife</strong>";
        }
        document.getElementById("infoBox").innerHTML = "Throw a bomb at a single enemy. Mana cost:0, but only 3 uses";
    })
    attack.onclick =  function(){
        console.clear();
        //var select = parseInt(prompt("who would you like to attack (0-2)?:"));
        //var select = verifyTarget(enemyArray, 0, "attack");
        for(let i = 0; i <= 2; i++){
            charId[i].onclick = async function(){
                if(preVerifyTarget(i,enemyArray, 0, "attack")){
                    for(let i = 0; i <= 5; i++){//disable buttons
                            charId[i].onclick = function(){};
                        }
                    playerArray[player].damage_single(enemyArray[i],values[0]);
                    await sleep(4000)
                    document.getElementById("name"+(player+1)).style.borderBottom = "none";
                    document.getElementById("MP"+(player+1)).style.borderBottom = "none";
                    //actionBox.innerHTML = "BEGIN " + playerArray[player].getName() + " ACTION"
                    var next = getNext(player, playerArray, enemyArray);
                    if(next === -1){
                        console.log("Enemy's turn")
                        enemyAttack();
                        if(!playerArray || playerArray.length == 0){
                            alert("Team is dead");
                        }
                        else{
                            setOwnPlayer(getNext(-1,playerArray,enemyArray));
                        }
                    }
                    else{
                        actionBox.innerHTML = "It is now " + playerArray[next].getName() + "'s turn"
                        setOwnPlayer(next);
                    }
                }
            }
        }  
    }

    aoe.onclick = async function(){
        console.clear();
        playerArray[player].damage(enemyArray,values[1]);
        await sleep(4000)
        document.getElementById("name"+(player+1)).style.borderBottom = "none";
        document.getElementById("MP"+(player+1)).style.borderBottom = "none";
        var next = getNext(player, playerArray, enemyArray);
        if(next === -1){
            console.log("Enemy's turn")
            enemyAttack();
            if(!playerArray || playerArray.length == 0){
                alert("Team is dead");
            }
            else{
                setOwnPlayer(getNext(-1,playerArray,enemyArray));
            }
        }else{
            actionBox.innerHTML = "It is now " + playerArray[next].getName() + "'s turn"
            setOwnPlayer(next);
        }
    }

    heal.onclick =  function(){
        console.clear();
        for(let i = 3; i <= 5; i++){
            charId[i].onclick = async function(){
                if(preVerifyTarget((i-3),playerArray, 100, "heal")){
                    for(let i = 0; i <= 5; i++){//disable buttons
                            charId[i].onclick = function(){};
                        }
                    playerArray[player].heal_single(playerArray[i-3],values[2]);
                    await sleep(4000)
                    document.getElementById("name"+(player+1)).style.borderBottom = "none";
                    document.getElementById("MP"+(player+1)).style.borderBottom = "none";
                    var next = getNext(player, playerArray, enemyArray);
                    if(next === -1){
                        console.log("Enemy's turn")
                        enemyAttack();
                        if(!playerArray || playerArray.length == 0){
                            alert("Team is dead");
                        }
                        else{
                            setOwnPlayer(getNext(-1,playerArray,enemyArray));
                        }
                    }
                    else{
                        actionBox.innerHTML = "It is now " + playerArray[next].getName() + "'s turn"
                        setOwnPlayer(next);
                    }
                }
            }
        }
    }
    item.onclick = function(){
        console.clear();
        for(let i = 0; i <= 2; i++){
            charId[i].onclick = async function(){
                console.log("Help");
                if(preVerifyTarget(i,enemyArray, 0, "attack")){
                    for(let i = 0; i <= 5; i++){//disable buttons
                            charId[i].onclick = function(){};
                        }
                        console.log("Help");
                    playerArray[player].useItem(enemyArray[i],values[3]);
                    await sleep(4000)
                    document.getElementById("name"+(player+1)).style.borderBottom = "none";
                    document.getElementById("MP"+(player+1)).style.borderBottom = "none";
                    var next = getNext(player, playerArray, enemyArray);
                    if(next === -1){
                        console.log("Enemy's turn")
                        enemyAttack();
                        if(!playerArray || playerArray.length == 0){
                            alert("Team is dead");
                        }
                        else{
                            setOwnPlayer(getNext(-1,playerArray,enemyArray));
                        }
                    }
                    else{
                        actionBox.innerHTML = "It is now " + playerArray[next].getName() + "'s turn"
                        setOwnPlayer(next);
                    }
                }
            }
        }
    }
}

/*function verifyTarget(group, invalidVal, action){
    var retSelect = parseInt(prompt("Who would you like to " + action + "?:"));
    if(retSelect >= group.length || retSelect < 0){
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
*/

function preVerifyTarget(retSelect,group, invalidVal, action){
    if(retSelect >= group.length || retSelect < 0){
        alert("Target " + retSelect + " is an invalid target. Please try again.");
        return false;
    }
    else if(group[retSelect].health == invalidVal ||(group[retSelect].health === 0 && action === "heal")){
        alert("Cannot " + action + " " + group[retSelect].getName() + ". Please try again.");
        return false;
    }
    else {
        return true;
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
