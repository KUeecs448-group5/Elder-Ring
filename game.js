//overall game function
function newGame(){
    const characterArray = []; //player character array
    const enemyArray = []; //enemy character array
    for(let i = 0; i < 4; i++){
        characterArray[i] = new character(100, 100, 50);
    }
    for(let i = 0; i < 4; i++){
        enemyArray[i] = new character(80, 80, 80);
    }
    
    do {
        for(let i = 0; i < 4; i++){
            playerAction(/*parameters*/);
            //check win condition
        }
        for(let i = 0; i < 4; i++){
            enemyAction(enemyArray[i]);
            //check win condition
        }
    } while(1);
}

function playerAction(/*parameters*/){

}

function enemyAction(/*parameters*/){
    
}

function checkWin(/*parameters*/){

}