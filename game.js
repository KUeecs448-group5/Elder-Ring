//overall game function
import debug from './Executive.js';
import Character from './character.js';
    const playerArray = []; //player character array
    const enemyArray = []; //enemy character array
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
    
    setOwnPlayer(0);
}

let gameMode = 0;

let names = [//names of allies
    [
        "Hodir",
        "Solaire",
        "Artorias"
    ],
    [
        "Tifa Lockhart",
        "Cloud Strife",
        "Barret Wallace"
    ],
    [
        "Unit 00, Rei",
        "Unit 01, Shinji",
        "Unit 02, Asuka"
    ]
];

let enames = [//names of enemies
    [
        "Skeleton 1",
        "Skeleton Boss",
        "Skeleton 2"
    ],
    [
        "Skeleton 1",
        "Sephiroth",
        "Skeleton 2"
    ],
    [
        "Mass Produced Eva 1",
        "Angel",
        "Mass Produced Eva 2"
    ]
]

let actionBox = document.getElementById("infoBox2");

let music = [//id tag for audio
    "PPP",
    "OWA",
    "NGE"
];

let playerIdleGifs = [//default player animation
    [
        "assets/DS-dir/characters/spear.gif",
        "assets/DS-dir/characters/solaire.gif",
        "assets/DS-dir/characters/artorias.gif"
    ],
    [
        "assets/FF-dir/characters/FFGirlIdle.gif",
        "assets/FF-dir/characters/cloudStrifeIdle.gif",
        "assets/FF-dir/characters/barretWallaceIdle.gif"
    ],
    [
        "assets/NGE-dir/characters/unit00.png",
        "assets/NGE-dir/characters/unit01.gif",
        "assets/NGE-dir/characters/unit02.png"
    ]
];

let enemyIdleGifs = [//default enemy animation
    [
        "assets/DS-dir/characters/skeleton.gif",
        "assets/DS-dir/characters/nito.gif",
        "assets/DS-dir/characters/skeleton.gif"
    ],
    [
        "assets/FF-dir/characters/skeleton.gif",
        "assets/FF-dir/characters/SephirothIdle.gif",
        "assets/FF-dir/characters/skeleton.gif"
    ],
    [
        "assets/NGE-dir/characters/massProducedEva2.png",
        "assets/NGE-dir/characters/angel.gif",
        "assets/NGE-dir/characters/massProducedEva1flip.png"
    ]
];

let background = [//background image
    "assets/DS-dir/Battle.jpeg",
    "assets/FF-dir/Battle2.jpg",
    "assets/NGE-dir/Battle3.jpg"
];


var charId = [//character images
    document.getElementById("enemy1Click"),
    document.getElementById("enemy2Click"),
    document.getElementById("enemy3Click"),
    document.getElementById("player1Click"),
    document.getElementById("player2Click"),
    document.getElementById("player3Click"),
];

var nameId = [//front end name plates
    document.getElementById("name1"),
    document.getElementById("name2"),
    document.getElementById("name3")
];

var values = [//values for attacks [damage, mana cost]
    [15,10],//single attack player 0
    [5,5],//aoe player 1
    [10,15],//heal player 2
    [20,0],//item 3
    [20+(gameMode*5),10],//single attack enemy 4
    [5+(gameMode*5),5],//aoe enemy 5
    [10+(gameMode*5),15]//heal enemy 6
];

function worldChange(){
    console.log("Changing worlds");
    document.getElementById("background").src = background[gameMode];
    for(let i=0;i<=2;i++){
        charId[i].src = enemyIdleGifs[gameMode][i];
    }
    for(let i=0;i<=2;i++){
        charId[i+3].src = playerIdleGifs[gameMode][i];
    }
    for(let i=0;i<=2;i++){
        nameId[i].innerHTML = names[gameMode][i];
    }
    if(gameMode == 1){
        charId[3].style.transform = "scale(0.85)";
        charId[4].style.width = "200px";
        charId[5].style.transform = "scale(0.85)";
        //document.getElementById("player1").style.border = "solid 1px transparent"
    }
    if(gameMode == 2){
        charId[2].style.marginTop = "3%";
    }
    document.getElementById("heal icon").src = bAheal[gameMode];
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
    actionBox.innerHTML = "It is now "+names[gameMode][0]+"'s turn"
}

function setOwnPlayer(player){
    playerAction(playerArray,enemyArray, player);
}


let bAattack =[//button Asset attack
    [//all sword button images
        "assets/DS-dir/single/halberd.png",
        "assets/DS-dir/single/solaire-sword.png",
        "assets/DS-dir/single/sword.png"
    ],
    [//attack button
        "assets/FF-dir/single/LeatherGlove.png",
        "assets/FF-dir/single/busterSword.png",
        "assets/FF-dir/single/GatlingGun.png"
    ],
    [//replace with progressive knife png
        "assets/NGE-dir/single/spear_of_longinus.png",
        "assets/NGE-dir/single/vibroKnife.png",
        "assets/NGE-dir/single/kensara.png"
    ]
];

let bAaoe=[//aoe button assets
    [//all aoe button images
        "assets/DS-dir/aoe/aoe.png",
        "assets/DS-dir/aoe/lightning_storm.png",
        "assets/DS-dir/aoe/affinity.png"
    ],
    [//aoe
        "assets/FF-dir/aoe/DragonClaw.png",
        "assets/FF-dir/aoe/UltimaWeapon.png",
        "assets/FF-dir/aoe/rocketPunch.png"
    ],
    [//replace with neon genesis aoe
        "assets/NGE-dir/aoe/sniper.png",
        "assets/NGE-dir/aoe/berserk.png",
        "assets/NGE-dir/aoe/beast.png"
    ]
];

let bAitem=[//item button assets
    [//all item button images
        "assets/DS-dir/item/bomb.png",
        "assets/DS-dir/item/lightning_urn.png",
        "assets/DS-dir/item/throwing_knife.png"
    ],
    [
        "assets/FF-dir/item/SpiderSilk.png",
        "assets/FF-dir/item/VampireFang.png",
        "assets/FF-dir/item/NitroPowder.png"
    ],
    [ //neon genesis items
        "assets/NGE-dir/item/cannon.png",
        "assets/NGE-dir/item/rifle.png",
        "assets/NGE-dir/item/bazooka.png"
    ]
];

let bAheal=[//heal button assets
    "assets/DS-dir/heal.png",
    "assets/FF-dir/cure.png",
    "assets/NGE-dir/engine-charge.png"
];

let bTattack =[//button Text attack
    [//all sword button images
        "<strong>Halberd</strong>",
        "<strong>Sunlight Sword</strong>",
        "<strong>Wolf Knight Sword</strong>"
    ],
    [//attack button
        "<strong>Knuckles</strong>",
        "<strong>Buster Sword</strong>",
        "<strong>Gatling Gun</strong>"
    ],
    [//attack button
        "<strong>Spear of Longinus</strong>",
        "<strong>Progressive Knife</strong>",
        "<strong>Kensara</strong>"
    ]
];

let bTaoe=[//aoe text
    [//all aoe button images
        "<strong>Fire Storm</strong>",
        "<strong>Lightning Strike</strong>",
        "<strong>Dark Affinity</strong>"
    ],
    [//aoe
        "<strong>Dragon Claw</strong>",
        "<strong>Ultima Weapon</strong>",
        "<strong>Rocket Punch</strong>"
    ],
    [//aoe
        "<strong>Sniper Rifle</strong>",
        "<strong>Berserk</strong>",
        "<strong>Beast Mode</strong>"
    ]
];

let bTitem=[//item text
    [//all item button images
        "<strong>Fire Bomb</strong>",
        "<strong>Lightning Urn</strong>",
        "<strong>Throwing Knife</strong>"
    ],
    [
        "<strong>Spider Silk</strong>",
        "<strong>Vampire Fang</strong>",
        "<strong>Nitro Powder</strong>"
    ],
    [
        "<strong>Positron Cannon</strong>",
        "<strong>Pallet Rifle</strong>",
        "<strong>Bazooka</strong>"
    ]
];

let bTheal=[//heal text
    "<strong>Estus Flask</strong>",
    "<strong>Cure</strong>",
    "<strong>S2 Engine Charge</strong>"
];

let bANattack=[
    [
        "unit00attack.gif",
        "unit01attack.gif",
        "unit02attack.gif"
    ],
    [
        "unit00attack.gif",
        "unit01attack.gif",
        "unit02attack.gif"
    ],
    [
        "assets/NGE-dir/animations/unit02attack.gif",
        "assets/NGE-dir/animations/unit02attack.gif",
        "assets/NGE-dir/animations/unit02attack.gif"
    ],
];

function playerAction(playerArray,enemyArray,player){
    //actionBox.innerHTML = "BEGIN " + playerArray[player].getName() + " ACTION"	
    //actionBox.innerHTML = "It is now " + playerArray[player].getName() + "'s turn"
    document.getElementById("name"+(player+1)).style.borderBottom = "solid yellow";
    //change button assets
    document.getElementById("weapon icon").src = bAattack[gameMode][player];
    document.getElementById("spell icon").src = bAaoe[gameMode][player];
    document.getElementById("item icon").src = bAitem[gameMode][player];
    var attack = document.getElementById("Attack");
    attack.addEventListener("mouseover",function(){
        document.getElementById("action").innerHTML = bTattack[gameMode][player];
        document.getElementById("infoBox").innerHTML = "Attack a single enemy with your "+bTattack[gameMode][player]+".<br />Damage: 10-25<br />Mana cost: 10";
    })
    var aoe = document.getElementById("AOE");
    aoe.addEventListener("mouseover",function(){
        document.getElementById("action").innerHTML = bTaoe[gameMode][player];
        document.getElementById("infoBox").innerHTML = "Attack all enemies with "+bTaoe[gameMode][player]+".<br />Damage: 5-15 (per enemy)<br />Mana cost: 15";
    })
    var heal = document.getElementById("Heal");
    heal.addEventListener("mouseover",function(){
        document.getElementById("action").innerHTML = bTheal[gameMode];
        document.getElementById("infoBox").innerHTML = "Heal ally with "+bTheal[gameMode]+"<br />Heal: 10-20<br />Mana cost: 10";
    })
    var item = document.getElementById("Item");
    item.addEventListener("mouseover",function(){
        document.getElementById("action").innerHTML = bTitem[gameMode][player];
        document.getElementById("infoBox").innerHTML = "Use "+bTitem[gameMode][player]+" on a single enemy.<br />Damage: 20-30<br />Mana cost: 0<br />Inventory: "+playerArray[player].item;
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
                    attack.onclick = function(){};
                    aoe.onclick = function(){};
                    heal.onclick = function(){};
                    item.onclick = function(){};
                    playerArray[player].damage_single(enemyArray[i],values[0]);
                    charId[i+3].src = bANattack[gameMode][i];
                    await sleep(4000);
                    charId[i+3].src = playerIdleGifs[gameMode][i];
                    document.getElementById("name"+(player+1)).style.borderBottom = "none";
                    document.getElementById("MP"+(player+1)).style.borderBottom = "none";
                    //actionBox.innerHTML = "BEGIN " + playerArray[player].getName() + " ACTION";
                    var next = getNext(player, playerArray, enemyArray);
                    if(next === -1){
                        console.log("Enemy's turn");
                        enemyAttack();
                        if(!playerArray || playerArray.length == 0){
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
        console.clear();
        attack.onclick = function(){};//disable buttons to prevent spam click
        aoe.onclick = function(){};
        heal.onclick = function(){};
        item.onclick = function(){};
        for(let i = 0; i <= 5; i++){//disable buttons
            charId[i].onclick = function(){};
        }
        playerArray[player].damage(enemyArray,values[1]);
        await sleep(4000);
        document.getElementById("name"+(player+1)).style.borderBottom = "none";
        document.getElementById("MP"+(player+1)).style.borderBottom = "none";
        var next = getNext(player, playerArray, enemyArray);
        if(next === -1){
            console.log("Enemy's turn");
            enemyAttack();
            if(!playerArray || playerArray.length == 0){
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
        console.clear();
        for(let i = 3; i <= 5; i++){
            charId[i].onclick = async function(){
                if(preVerifyTarget((i-3),playerArray, 100, "heal")){
                    for(let i = 0; i <= 5; i++){//disable buttons
                            charId[i].onclick = function(){};
                        }
                    attack.onclick = function(){};
                    aoe.onclick = function(){};
                    heal.onclick = function(){};
                    item.onclick = function(){};
                    playerArray[player].heal_single(playerArray[i-3],values[2]);
                    await sleep(4000);
                    document.getElementById("name"+(player+1)).style.borderBottom = "none";
                    document.getElementById("MP"+(player+1)).style.borderBottom = "none";
                    var next = getNext(player, playerArray, enemyArray);
                    if(next === -1){
                        console.log("Enemy's turn");
                        enemyAttack();
                        if(!playerArray || playerArray.length == 0){
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
        console.clear();
        for(let i = 0; i <= 2; i++){
            charId[i].onclick = async function(){
                console.log("Help");
                if(preVerifyTarget(i,enemyArray, 0, "attack")){
                    for(let i = 0; i <= 5; i++){//disable buttons
                            charId[i].onclick = function(){};
                        }
                    attack.onclick = function(){};
                    aoe.onclick = function(){};
                    heal.onclick = function(){};
                    item.onclick = function(){};
                    playerArray[player].useItem(enemyArray[i],values[3]);
                    await sleep(4000);
                    document.getElementById("name"+(player+1)).style.borderBottom = "none";
                    document.getElementById("MP"+(player+1)).style.borderBottom = "none";
                    var next = getNext(player, playerArray, enemyArray);
                    if(next === -1){
                        console.log("Enemy's turn");
                        enemyAttack();
                        if(!playerArray || playerArray.length == 0){
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
