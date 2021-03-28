//overall game function
function newGame(){
    const playerArray = []; //player character array
    const enemyArray = []; //enemy character array
    for(let i = 0; i < 4; i++){ //create 3 player characters
        playerArray[i] = new character(100, 100, 50);
    }
    for(let i = 0; i < 4; i++){ //create 3 enemy characters
        enemyArray[i] = new character(80, 100, 100);
    }
    
    do {
        for(let i = 0; i < 4; i++){
            playerAction(/*parameters*/);
            //check win condition -> return from newGame function if true
        }
        for(let i = 0; i < 4; i++){
            enemyAction(enemyArray[i]);
            //check win condition -> return from newGame function if true
        }
    } while(1);
}

function playerAction(/*parameters*/){

}

function enemyAction(toAct){
    action = Math.floor(Math.random() * 4);
    target = Math.floor(Math.random() * 3);
    //need to validate target - cannot attack dead player or heal an ally at full health
    pseudoMultiplier = Math.random() * 10;
    if(select === 0){
        toAct.single(toAct, playerArray[target], 25 + pseudoMultiplier, 10);
    } else if(select === 1){
        toAct.aoe(toAct, playerArray, 10 + pseudoMultiplier, 15);
    } else if(select === 2){
        toAct.heal(toAct, enemyArray[target], 5 + pseudoMultiplier, 15);
    } else if(select === 3){
    } else {
        console.log("Random enemy action selection failure");
    }
}

function checkWin(/*parameters*/){

}