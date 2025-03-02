let turnMusic = new Audio("assets/ting.mp3");
let gameMusic = new Audio("assets/music.mp3");
let gameOver = new Audio("assets/gameover.mp3");

let turnIndicator = document.getElementById("turn-indicator");

const gameOverImage = document.getElementsByClassName("game-over-image");

let isGameOver = false;

let turn = "X";

//Check turn
const changeTurn = () => {
    return turn = (turn === "X") ? "O" : "X";
}

//Check winner
const checkWinner = () => {
    let cellText = document.getElementsByClassName("cell-text");

    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135]
    ]

    wins.forEach(win => {
        if ((cellText[win[0]].innerText === cellText[win[1]].innerText) && (cellText[win[2]].innerText === cellText[win[1]].innerText) && (cellText[win[0]].innerText !== "")) {
            turnIndicator.innerHTML = `${cellText[win[0]].innerText} <span>Won</span>`;

            isGameOver = true;            

            gameMusic.play();

            gameOverImage[0].style.width = "200px";
            document.querySelector(".gameover-line").style.width = `20vw`;
            document.querySelector(".gameover-line").style.transform = `translate(${win[3]}vw, ${win[4]}vw) rotate(${win[5]}deg)`;
        }
    });
};

//Game Logic
let cells = document.getElementsByClassName("cell");

Array.from(cells).forEach(element => {
    let cellText = element.querySelector(".cell-text");

    element.addEventListener("click", () => {
        if (isGameOver) return;

        if (cellText.innerText === "") {
            cellText.innerText = turn;
        } else {
            return;
        }
        
        changeTurn();

        turnMusic.play();

        checkWinner();

        if (!isGameOver) {
            turnIndicator.innerHTML = `<span>Turn for:</span> ${turn}`;
        }
    });
});

//Cell reset
const reset = () => {
    
    Array.from(cells).forEach(element => {
        let cellText = element.querySelector(".cell-text");
    
        cellText.innerText = "";
    });

    isGameOver = false;

    turn = "X";

    turnIndicator.innerHTML = `<span>Turn for:</span> X`;

    gameMusic.pause();
    gameMusic.currentTime = 0;

    gameOverImage[0].style.width = "0";
    document.querySelector(".gameover-line").style.width = `0`;
    document.querySelector(".gameover-line").style.transform = `translate(0vw, 0vw) rotate(0deg)`;
};