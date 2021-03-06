//overall game function
import debug from './Executive.js';
import Character from './character.js';
import {FFwinAnimate, FFhealAnimate, enemyAnimate, words, names, enames, music, playerIdleGifs, enemyIdleGifs, background, charId, nameId, values, bAattack, bAaoe, bAitem, bAheal, bTattack, bTaoe, bTitem, bTheal, bANattack, bANdamage, healthId, manaId, deathId} from './data.js';
    const playerArray = []; //player character array
    const enemyArray = []; //enemy character array
/**
Pre: 
Post: Characters are created and game is started
Param: world, the world id set by the level select
**/

function newGame(world){
    var menu = document.getElementById("start");
    menu.style.visibility = "hidden";
    gameMode = world;
    worldChange();
    document.getElementById(music[gameMode]).play();
    playerArray[0] = new Character(100,100,names[gameMode][0],3);
    playerArray[1] = new Character(100,100,names[gameMode][1],4);
    playerArray[2] = new Character(100,100,names[gameMode][2],5);

    enemyArray[0] = new Character(100,100,enames[gameMode][0],0);
    enemyArray[1] = new Character(200,100,enames[gameMode][1],1);
    enemyArray[2] = new Character(100,100,enames[gameMode][2],2);
    
    actionBox.innerHTML = "Welcome to Elder Ring. To take an action press one of the buttons to the left then click on your target. If you lack the mana to complete an action your character will rest and recover a small amount";

    setOwnPlayer(0);
}

let gameMode = 0;


var heal = document.getElementById("Heal");
var item = document.getElementById("Item");
var attack = document.getElementById("Attack");
var aoe = document.getElementById("AOE");

let actionBox = document.getElementById("infoBox2");

/**
Pre: gameMode is set
Post: assets are changed to match the world
Param: 
**/
function worldChange(){
    console.log("Changing worlds");
    document.getElementById("background").src = background[gameMode];
    for(let i=0;i<=2;i++){//loop for changing the enemies
        charId[i].src = enemyIdleGifs[gameMode][i];
    }
    for(let i=0;i<=2;i++){//loop for changing the players
        charId[i+3].src = playerIdleGifs[gameMode][i];
    }
    for(let i=0;i<=2;i++){//loop for changing player names
        nameId[i].innerHTML = names[gameMode][i];
        nameId[i+3].innerHTML = enames[gameMode][i];
    }
    for(let i=4;i<=6;i++){//loop for changing enemy damage values
        values[i][1] = values[i][1] + (gameMode*5);
    }
    if(gameMode == 1){//conditional for adjusting some image scales
        charId[3].style.transform = "scale(0.85)";
        charId[4].style.width = "200px";
        charId[5].style.transform = "scale(0.85)";
        //document.getElementById("player1").style.border = "solid 1px transparent"
    }
    if(gameMode == 2){//conditional for adjusting some image scales
        charId[2].style.marginTop = "3%";
    }
    document.getElementById("heal icon").src = bAheal[gameMode];//heal button has to be changed here}
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  
/**
Pre: all players have taken their turn 
Post: all enemies have taken their turn
Param: 
**/  
async function enemyAttack(playerArray,enemyArray){
    //disable action buttons
    attack.disabled = true;
    aoe.disabled = true;
    heal.disabled = true;
    item.disabled = true;
    await sleep(2000)
    actionBox.innerHTML = "Enemy's Turn."
    await sleep(2000)
    for(let i = 0; i < enemyArray.length; i++){
        if(enemyArray[i].health !== 0){
            document.getElementById("name"+(4+i)).style.borderBottom = "solid yellow";
            enemyAction(enemyArray, playerArray, enemyArray[i])
            await sleep(3000);
            document.getElementById("name"+(4+i)).style.borderBottom = "none";
        }
        if(checkWin(playerArray)){
            //alert("You Lost. Press the banner to play again.");
            actionBox.innerHTML = "Oh dear... It appears you have lost... May I advise Getting Good? Press the banner to try again.";
            document.getElementById("youDW").src = "assets/youdied.png";
            document.getElementById("loseLink").style.visibility = "visible";
        }
    }
    await sleep(2000)
        //enable buttons
        attack.disabled = false;
        aoe.disabled = false;
        heal.disabled = false;
        item.disabled = false;
    for(let i=0; i<playerArray.length; i++){
        if(playerArray[i].health !== 0){
            actionBox.innerHTML = "It is now "+names[gameMode][i]+"'s turn";
        }
        i=playerArray.length;
    }
}

function setOwnPlayer(player){
    playerAction(playerArray,enemyArray, player);
}


/**
Pre: 
Post: player buttons are set to the correct functions relative to that player
Param:
**/
function playerAction(playerArray,enemyArray,player){
    //actionBox.innerHTML = "BEGIN " + playerArray[player].getName() + " ACTION"	
    //actionBox.innerHTML = "It is now " + playerArray[player].getName() + "'s turn"
    document.getElementById("name"+(player+1)).style.borderBottom = "solid yellow";
    //change button assets
    document.getElementById("weapon icon").src = bAattack[gameMode][player];
    document.getElementById("spell icon").src = bAaoe[gameMode][player];
    document.getElementById("item icon").src = bAitem[gameMode][player];

    attack.addEventListener("mouseover",function(){
        document.getElementById("action").innerHTML = bTattack[gameMode][player];
        document.getElementById("infoBox").innerHTML = "Attack a single enemy with your "+bTattack[gameMode][player]+".<br />Damage: 10-25<br />Mana cost: 10";
    })
    
    aoe.addEventListener("mouseover",function(){
        document.getElementById("action").innerHTML = bTaoe[gameMode][player];
        document.getElementById("infoBox").innerHTML = "Attack all enemies with "+bTaoe[gameMode][player]+".<br />Damage: 5-15 (per enemy)<br />Mana cost: 15";
    })
    
    heal.addEventListener("mouseover",function(){
        document.getElementById("action").innerHTML = bTheal[gameMode];
        document.getElementById("infoBox").innerHTML = "Heal ally with "+bTheal[gameMode]+"<br />Heal: 10-20<br />Mana cost: 15";
    })
    
    item.addEventListener("mouseover",function(){
        document.getElementById("action").innerHTML = bTitem[gameMode][player];
        document.getElementById("infoBox").innerHTML = "Use "+bTitem[gameMode][player]+" on a single enemy.<br />Damage: 20-30<br />Mana cost: 0<br />Inventory: "+playerArray[player].item;
    })
    attack.onclick =  function(){
        for(let i = 0; i <= 5; i++){//disable character buttons
            charId[i].onclick = function(){};
            charId[i].onmouseover = function(){};
        }
        console.clear();
        actionBox.innerHTML = "Click the enemy you wish to attack";
        //var select = parseInt(prompt("who would you like to attack (0-2)?:"));
        //var select = verifyTarget(enemyArray, 0, "attack");
        for(let i = 0; i <= 2; i++){
            charId[i].onmouseover = function(){this.style.border = "dashed red 2.5px"}; //highlight potential target
            charId[i].onmouseleave = function(){this.style.border = "none"}; //remove highlight
            charId[i].onclick = async function(){
                this.style.border = "solid red 2.5px"; //highlight target
                if(preVerifyTarget(i,enemyArray, 0, "attack")){
                    for(let i = 0; i <= 5; i++){//disable buttons
                            charId[i].onclick = function(){};
                            charId[i].onmouseover = function(){};
                        }
                    attack.onclick = function(){};
                    aoe.onclick = function(){};
                    heal.onclick = function(){};
                    item.onclick = function(){}; 
                    if(playerArray[player].getMana()<values[0][1]){
                        actionBox.innerHTML = playerArray[player].getName() + " is too tired and must rest.";   
                        playerArray[player].magic= playerArray[player].magic+10;
                        if(playerArray[player].getNumberValue()>2){
                            document.getElementById(manaId[playerArray[player].getNumberValue()]).innerHTML = playerArray[player].magic;
                            document.getElementById(manaId[playerArray[player].getNumberValue()-3]).value = playerArray[player].magic;
                    }
                    await sleep(2000);
                }// recharge mana
                else{
                    actionBox.innerHTML = playerArray[player].getName() + randomWord(0) + enemyArray[i].getName();            
                    playerArray[player].damage_single(enemyArray[i],values[0]);
                    if(gameMode==1){//scaling for final fantasy single attacks
                        if(player==0){
                            charId[player+3].src = "assets/FF-dir/animations/ACTifaAttack.png";
                            charId[3].style.transform = "scale(2) translate(-300%, "+(-10+i*60)+"%)"; 
                        }
                        if(player==1){
                            charId[player+3].src = "assets/FF-dir/animations/CloudSwipe.gif";
                            charId[4].style.transform = "scale(2) translate(-300%, "+(-60+i*60)+"%)";
                        }
                        if(player==2){
                            charId[player+3].src = "assets/FF-dir/animations/BarretAttack.png";
                            charId[5].style.transform = "translate(-600%, "+(-240+i*120)+"%)";
                        }
                    }
                    else {
                        charId[player+3].src = bANattack[gameMode][player];
                    }
                    for(let j = 0; j < 4; j++){
                        charId[i].src = enemyAnimate[gameMode][i];
                        await sleep(450);
                        charId[i].src = enemyIdleGifs[gameMode][i];
                        await sleep(450);
                    }
                    this.style.border = "none"; //remove highlight from target
                    charId[player+3].style.transform="";
                    charId[player+3].src = playerIdleGifs[gameMode][player];
                }
                    document.getElementById("name"+(player+1)).style.borderBottom = "none";
                    document.getElementById("MP"+(player+1)).style.borderBottom = "none";
                    //actionBox.innerHTML = "BEGIN " + playerArray[player].getName() + " ACTION";
                    var next = getNext(player, playerArray, enemyArray);
                    if(next === -1){
                        console.log("Enemy's turn");
                        enemyAttack(playerArray,enemyArray);
                        if(!playerArray || playerArray.length == 0){
                            //I think this code is redundant
                            alert("Team is dead");
                        }
                        else{
                            setOwnPlayer(getNext(-1,playerArray,enemyArray));
                        }
                    }
                    else{
                        actionBox.innerHTML = "It is now " + playerArray[next].getName() + "'s turn";
                        setOwnPlayer(next);
                    }
                }
            }
        }  
    }

    aoe.onclick = async function(){
        /*for(let i = 0; i < 3; i++){ //highlight targets
            charId[i].style.border = "solid red 2.5px";
        }*/
        attack.onclick = function(){};//disable buttons to prevent spam click
        aoe.onclick = function(){};
        heal.onclick = function(){};
        item.onclick = function(){};
        for(let i = 0; i <= 5; i++){//disable buttons
            charId[i].onclick = function(){};
        } 
        if(playerArray[player].getMana()<3*(values[1][1])){
            actionBox.innerHTML = playerArray[player].getName() + " is to tired and must rest.";   
            playerArray[player].magic= playerArray[player].magic+10;
            if(playerArray[player].getNumberValue()>2){
                document.getElementById(manaId[playerArray[player].getNumberValue()]).innerHTML = playerArray[player].magic;
                document.getElementById(manaId[playerArray[player].getNumberValue()-3]).value = playerArray[player].magic;
            }
            await sleep(2500);
        }
        else{    
            actionBox.innerHTML = playerArray[player].getName() + randomWord(1);      
            playerArray[player].damage(enemyArray,values[1]);
            charId[player+3].src = bANattack[gameMode][player];
            if(gameMode==1){//scaling for final fantasy aoe attacks
                if(player==0){
                    charId[3].style.transform = "scale(4) translate(-100%, 20%)"; 
                }
                if(player==1){
                    charId[4].style.transform = "scale(4) translate(-100%, -10%)";
                }
                if(player==2){
                    charId[5].style.transform = "scale(4) translate(-125%, -30%)";
                    await sleep(2000)
                }
            }
            for(let i = 0; i < 3; i++){
                await sleep(300);
                charId[0].src = enemyAnimate[gameMode][0];
                charId[1].src = enemyAnimate[gameMode][1];
                charId[2].src = enemyAnimate[gameMode][2];
                await sleep(300);
                charId[0].src = enemyIdleGifs[gameMode][0];
                charId[1].src = enemyIdleGifs[gameMode][1];
                charId[2].src = enemyIdleGifs[gameMode][2];
                }
        //await sleep(4000);
        for(let i = 0; i < 3; i++){  //remove highlight from targets
            charId[i].style.border = "none";
        }
        charId[player+3].style.transform="";
        charId[player+3].src = playerIdleGifs[gameMode][player];
    }
        document.getElementById("name"+(player+1)).style.borderBottom = "none";
        document.getElementById("MP"+(player+1)).style.borderBottom = "none";
        var next = getNext(player, playerArray, enemyArray);
        if(next === -1){
            console.log("Enemy's turn");
            enemyAttack(playerArray,enemyArray);
            if(!playerArray || playerArray.length == 0){
                //I think this code is redundant
                alert("Team is dead");
            }
            else{
                setOwnPlayer(getNext(-1,playerArray,enemyArray));
            }
        }else{
            actionBox.innerHTML = "It is now " + playerArray[next].getName() + "'s turn";
            setOwnPlayer(next);
        }
    }

    heal.onclick = async function(){
        for(let i = 0; i <= 5; i++){//disable buttons
            charId[i].onclick = function(){};
            charId[i].onmouseover = function(){};
        }
        console.clear();
        actionBox.innerHTML = "Click the ally you wish to heal";
        for(let i = 3; i <= 5; i++){
            charId[i].onmouseover = function(){this.style.border = "dashed orange 2.5px"}; //highlight potential target
            charId[i].onmouseleave = function(){this.style.border = "none"}; //remove highlight
            charId[i].onclick = async function(){
                if(preVerifyTarget((i-3),playerArray, 100, "heal")){
                    for(let i = 0; i <= 5; i++){//disable buttons
                            charId[i].onclick = function(){};
                            charId[i].onmouseover = function(){};
                        }
                    attack.onclick = function(){};
                    aoe.onclick = function(){};
                    heal.onclick = function(){};
                    item.onclick = function(){};
                    if(playerArray[player].getMana()<values[2][1]){   
                        playerArray[player].magic= playerArray[player].magic+10;
                        if(playerArray[player].getNumberValue()>2){
                            document.getElementById(manaId[playerArray[player].getNumberValue()]).innerHTML = playerArray[player].magic;
                            document.getElementById(manaId[playerArray[player].getNumberValue()-3]).value = playerArray[player].magic;
                        }// get every turn heal
                        await sleep(2500);
                    }
                    else{            
                        playerArray[player].heal_single(playerArray[i-3],values[2]);
                        actionBox.innerHTML = playerArray[player].getName() + randomWord(2) + playerArray[i-3].getName();
                        if(gameMode == 1){
                            charId[i].src = FFhealAnimate[i-3];
                            await sleep(2500);
                            charId[i].src = playerIdleGifs[gameMode][i-3];
                            await sleep(500);
                        } else {
                            for(let j = 0; j < 4; j++){
                                charId[i].src = bAheal[gameMode];
                                await sleep(500);
                                charId[i].src = playerIdleGifs[gameMode][i-3];
                                await sleep(500);
                            }
                        }
                    }
                    document.getElementById("name"+(player+1)).style.borderBottom = "none";
                    document.getElementById("MP"+(player+1)).style.borderBottom = "none";
                    var next = getNext(player, playerArray, enemyArray);
                    if(next === -1){
                        console.log("Enemy's turn");
                        enemyAttack(playerArray,enemyArray);
                        if(!playerArray || playerArray.length == 0){
                            //I think this code is redundant
                            alert("Team is dead");
                        }
                        else{
                            setOwnPlayer(getNext(-1,playerArray,enemyArray));
                        }
                    }
                    else{
                        actionBox.innerHTML = "It is now " + playerArray[next].getName() + "'s turn";
                        setOwnPlayer(next);
                    }
                }
            }
        }
    }

    item.onclick = async function(){
        for(let i = 0; i <= 5; i++){//disable buttons
            charId[i].onclick = function(){};
            charId[i].onmouseover = function(){};
        }
        actionBox.innerHTML = "Click the enemy you wish to attack";
        if(playerArray[player].getInv()>0){
        for(let i = 0; i <= 2; i++){
            charId[i].onmouseover = function(){this.style.border = "dashed red 2.5px"}; //highlight potential target
            charId[i].onmouseleave = function(){this.style.border = "none"}; //remove highlight
            charId[i].onclick = async function(){
                this.style.border = "solid red 2.5px"; //highlight target
                if(preVerifyTarget(i,enemyArray, 0, "attack")){
                    for(let i = 0; i <= 5; i++){//disable buttons
                            charId[i].onclick = function(){};
                            charId[i].onmouseover = function(){};
                        }
                    attack.onclick = function(){};
                    aoe.onclick = function(){};
                    heal.onclick = function(){};
                    item.onclick = function(){};
                    actionBox.innerHTML = playerArray[player].getName() + " uses an item on " + enemyArray[i].getName();  
                    playerArray[player].useItem(enemyArray[i],values[3]);
                    
                    if(gameMode==1){//scaling for final fantasy
                        if(player==0){
                            charId[player+3].src = "assets/FF-dir/animations/TifaAttack.png";
                            charId[player+3].style.transform = "scale(1.75) translate(-250%, "+(i*70)+"%)";
                        }
                        if(player==1){
                            charId[player+3].src = "assets/FF-dir/animations/CloudCombo.png";
                            charId[player+3].style.transform = "scale(3) translate(-150%, "+(-60+i*40)+"%)";
                        }
                        if(player==2){
                            charId[player+3].src = "assets/FF-dir/animations/BarretMagic.gif";
                            charId[player+3].style.transform = "translate(-500%, "+(-240+i*120)+"%)";
                        }
                    }
                    else {
                        charId[player+3].src = bANattack[gameMode][player];
                    }
                    for(let j = 0; j < 4; j++){
                        charId[i].src = enemyAnimate[gameMode][i];
                        await sleep(500);
                        charId[i].src = enemyIdleGifs[gameMode][i];
                        await sleep(500);
                    }
                    this.style.border = "none"; //remove highlight from target
                    charId[player+3].style.transform="";
                    charId[player+3].src = playerIdleGifs[gameMode][player];
                    document.getElementById("name"+(player+1)).style.borderBottom = "none";
                    var next = getNext(player, playerArray, enemyArray);
                    if(next === -1){
                        console.log("Enemy's turn");
                        enemyAttack(playerArray,enemyArray);
                        if(!playerArray || playerArray.length == 0){
                            //I think this code is redundant
                            alert("Team is dead");
                        }
                        else{
                            setOwnPlayer(getNext(-1,playerArray,enemyArray));
                        }
                    }
                    else{
                        actionBox.innerHTML = "It is now " + playerArray[next].getName() + "'s turn";
                        setOwnPlayer(next);
                    }
                }
            }
        }
        }
        else{
            actionBox.innerHTML = "Out of Items!";
        }
    }
}


/**
Pre: attack target has been selected
Post: ensures that this was a valid selection
Param: retSelect, the enemy
    group, enemy array
    invalidVal, 0 if damaging 100 if healing
    action, "attack" or "heal"
**/
function preVerifyTarget(retSelect,group, invalidVal, action){
    if(retSelect >= group.length || retSelect < 0){
        //this code should be redundent now
        alert("Target " + retSelect + " is an invalid target. Please try again.");
        return false;
    }
    else if(group[retSelect].health == invalidVal ||(group[retSelect].health === 0 && action === "heal")){
        actionBox.innerHTML = "Cannot"+randomWord(2).replace("s "," ")+group[retSelect].getName()+" , health already full.";
        //alert("Cannot " + action + " " + group[retSelect].getName() + ". Please try again.");
        return false;
    }
    else {
        return true;
    }
}


/**
Pre: enemy's turn has begun 
Post: enemy has ended turn
Param: enemyArray, enemyArray
    playerArray, playerArray
    toAct, current enemy
**/
async function enemyAction(enemyArray, playerArray, toAct){
    var action = Math.floor(Math.random() * (checkHeal(enemyArray) ? 4 : 3));
    var target = Math.floor(Math.random() * playerArray.length);
    if(toAct.getInv<=0){
        while (action==2){
            action = Math.floor(Math.random() * (checkHeal(enemyArray) ? 4 : 3));
        }
    }
    while(!playerArray[target].isAlive()){
        target = Math.floor(Math.random() * playerArray.length); 
    }
   
    

    if(action === 0){
        if(toAct.getMana()<values[4][1]){
            actionBox.innerHTML = toAct.getName() + " must rest";
            toAct.magic = toAct.magic + 10;
            await sleep(2500);
        }
        else{
            actionBox.innerHTML = toAct.getName() + randomWord(0) + playerArray[target].getName();
            toAct.damage_single(playerArray[target],values[4]);
            if(toAct.name == "Sephiroth"){
                charId[1].src = "assets/FF-dir/animations/SephirothAttack.gif"
                if(target == 2){
                    charId[1].style.transform = "scale(2.5) translate(150%, "+(-90+target*60)+"%)";
                    }
                    else{
                         charId[1].style.transform = "scale(2.5) translate(150%, "+(-58+target*60)+"%)";
                        }
                    }
        }
    } else if(action === 1){
        if(toAct.getMana()<(3*values[5][1]))
        {
            actionBox.innerHTML = toAct.getName() + " must rest";
            toAct.magic = toAct.magic + 10;
            await sleep(2500);
        }
        else{
            actionBox.innerHTML = toAct.getName() + randomWord(1);
            toAct.damage(playerArray,values[5]);
            if(toAct.name == "Sephiroth"){
                console.log(target)
                charId[1].src = "assets/FF-dir/animations/SephirothAOE.gif"
                charId[1].style.transform = "scale(7.5) translate(100%, -30%)";
            }

            if(gameMode==1){
                for(let i = 0; i < 3; i++){
                    charId[3].src = bANdamage[gameMode][0];
                    charId[4].src = bANdamage[gameMode][1];
                    charId[5].src = bANdamage[gameMode][2];
                    await sleep(300);
                    charId[3].src = playerIdleGifs[gameMode][0];
                    charId[4].src = playerIdleGifs[gameMode][1];
                    charId[5].src = playerIdleGifs[gameMode][2];
                    await sleep(300);
                }
            } 
            else{
                for(let i=3;i<=5;i++)
                {
                    charId[i].src=bANdamage[gameMode][i-3];
                }
                await sleep(2000);
                for(let i=3;i<=5;i++)
                {
                    charId[i].src=playerIdleGifs[gameMode][i-3];
                }
            }
        }
    } else if(action === 2){
        actionBox.innerHTML = toAct.getName() + " uses an item on " + playerArray[target].getName();
        toAct.useItem(playerArray[target],values[3]);
        if(toAct.name == "Sephiroth"){
            charId[1].src = "assets/FF-dir/animations/SephirothItem2.gif"
            if(target ==0){
                charId[1].style.transform = "scale(2.5) translate(30%, "+(-50+target*60)+"%)";
            }
            else{
                charId[1].style.transform = "scale(2.5) translate(30%, "+(-90+target*60)+"%)";
            }
            //await sleep(1200)
        }
    } else if(action === 3){ //heal MUST be last to remove possibility of AI choosing to heal when impossible (all allys are at full heath)
        if(toAct.getMana()<values[6][1])
        {
            actionBox.innerHTML = toAct.getName() + " must rest";
            toAct.magic = toAct.magic + 10;
            await sleep(2500);
        }
        else{
        target = retLowestHealth(enemyArray);
        actionBox.innerHTML = toAct.name + randomWord(2) + enemyArray[target].name;
        toAct.heal_single(enemyArray[target],values[6]);
        if(gameMode == 1){
            if(enemyArray[target].name =="Sephiroth"||toAct.name =="Sephiroth"){
                charId[1].src = "assets/FF-dir/animations/SephirothHeal.gif";
                await sleep(1000);
            }
            else{
                charId[target].src = bAheal[gameMode];
                await sleep(1000);
                charId[target].src = enemyIdleGifs[gameMode][target];
            }
        }
        else{
            for(let i = 0; i < 3; i++){
                 charId[target].src = bAheal[gameMode];
                 await sleep(400);
                charId[target].src = enemyIdleGifs[gameMode][target];
                 await sleep(400);
            }
        }
        }
    }
    if(gameMode==1){
        if(action==0|| action==2){
            for(let i = 0; i < 3; i++){
                charId[target+3].src = bANdamage[gameMode][target];
                await sleep(300);
                charId[target+3].src = playerIdleGifs[gameMode][target];
                await sleep(300);
            }
        }
    }
    else{
        if(action==0||action==2){
            charId[target+3].src = bANdamage[gameMode][target];
            await sleep(2000);
            charId[target+3].src = playerIdleGifs[gameMode][target]; 
        } 
    }
    if(toAct.name =="Sephiroth" ||enemyArray[target].name =="Sephiroth"){
        charId[1].style.transform="";
        charId[1].src = enemyIdleGifs[gameMode][1];
    }
}
/**
Pre: 
Post: checks if every character in array is dead 
Param: array, the team you are checking
**/
function checkWin(array){
    for( let i = 0; i < array.length; i++){
        if(array[i].isAlive()){ 
            return(false);
        }  
    }
    return(true);
}

/**
Pre: end of a character turn
Post: returns an id identifying the next character
Param: current, current character id
    group, the current teams array
    oppGroup, opposite groups array
**/
function getNext(current, group, oppGroup){
    if(checkWin(oppGroup)){
        actionBox.innerHTML = "Congratulations! You Won! Press the banner to play again!";
        //alert("You won! Press the banner to play again.");
        if(gameMode == 1){
            for(let i = 0; i < 3; i++){
                document.getElementById("player"+(i+1)+"Click").src = FFwinAnimate[i];
            }
        }
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

//returns false if whole team has full health
function checkHeal(array) { 
    for(let i = 0; i < array.length; i++){
        if(array[i].health !== array[i].max_health && array[i].health !== 0){
            return(true);
        }
    }
    return(false);
}

//can be used in special enemy attack AI. necessary for enemy healing AI
function retLowestHealth(array) { 
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

function randomWord(type){
    return words[type][Math.trunc(Math.random()*3)];
}

export {newGame,playerAction,checkHeal,retLowestHealth,getNext,enemyAttack,sleep,checkWin}; //add checkwin reset a new game
