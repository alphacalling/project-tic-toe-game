const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]
];

//lets create function to initialise game

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    
    //make UI empty
    boxes.forEach((box, index)  => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        
        //initialise css property again
        box.classList = `box box-${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    //UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
function checkGameOver(){
    // newGameBtn.classList.add("active");
    let answer = "";

    winningPosition.forEach((position) => {
        //if 3 boxes are not empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]]))  {
            
            //check if winner is X
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "0";

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            
            //x or 0 may winner

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    
    //if we have winner
    if(answer !== ""){
        gameInfo.innerText = `Winnner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //when there is no winner  (TIE GAME)
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });

    //board is filled and Game is Tie
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !"
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap turn
        swapTurn();

        // check someone won ??
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);