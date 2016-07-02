var XBlocks = [];
var OBlocks = [];
var XWins = 0;
var OWins = 0;
var XTurn = 0;
var OTurn = 0;
var Winner = false;
var turnNum = 0;
var playing = true
var XPlayer
var OPlayer
var firstPlay = 0
var prompt = require('readline-sync');
var board = [1,2,3,4,5,6,7,8,9];
var pcount=2

function getnames() {
    var pcount = prompt.question("How many people are playing?");
    pcount = parseInt(pcount);
    var XPlayer = prompt.question("X Player, enter your name: ");
    if (pcount === 2) {
        var OPlayer = prompt.question("O Player, enter your name: ");
    } else {
        OPlayer = "Computer";
    };
    return { xname: XPlayer, oname: OPlayer, players: pcount };
};

function moveCheck(move, array) {
  return array.indexOf(move) > -1;
};

function turn(player,count) {
    if (count === 1 && player === "O") {
        var block = Math.floor(Math.random()*9+1);
         while (moveCheck(block,board) === false) {
            block = Math.floor(Math.random()*9+1);
        };
        
    } else {
        var block = prompt.question(player + " player, make your move: ");
        block = parseInt(block);
         while (moveCheck(block,board) === false) {
            block = prompt.question("Please try again: ");
            block = parseInt(block);
        };  
    };
    return block;
};

function AIturn() {
    var block = Math.floor(Math.random()*9+1)
     while (moveCheck(block,board) === false) {
        block = Math.floor(Math.random()*9+1);
    };  
    return block;
};

function fillBoard (move,who) {
    if (who === "X") {
        return board[board.indexOf(move)] = "X"
    } else {
        return board[board.indexOf(move)] = "O"
    }
};

function printBoard() {
    console.log(board[0] + "|" + board[1] +"|"+ board[2])
    console.log(board[3] + "|" + board[4] + "|" + board[5])
    console.log(board[6] + "|" + board[7] + "|" + board[8])
};

function winCheck (array) {
    if (moveCheck(1,array) && moveCheck(2,array) && moveCheck(3,array)) {
        console.log("Game Over");
        return Winner = true;
    };
    if (moveCheck(4,array) && moveCheck(5,array) && moveCheck(6,array)) {
        console.log("Game Over");
        return Winner = true
    };
    if (moveCheck(7,array) && moveCheck(8,array) && moveCheck(9,array)) {
        console.log("Game Over");
        return Winner = true;
    };
    if (moveCheck(1,array) && moveCheck(4,array) && moveCheck(7,array)) {
        console.log("Game Over");
        return Winner = true;
    };
    if (moveCheck(2,array) && moveCheck(5,array) && moveCheck(8,array)) {
        console.log("Game Over");
        return Winner = true;
    };
    if (moveCheck(3,array) && moveCheck(6,array) && moveCheck(9,array)) {
        console.log("Game Over");
        return Winner = true;
    };
    if (moveCheck(1,array) && moveCheck(5,array) && moveCheck(9,array)) {
        console.log("Game Over");
        return Winner = true;
    };
    if (moveCheck(3,array) && moveCheck(5,array) && moveCheck(7,array)) {
        console.log("Game Over");
        return Winner = true;
    };
};

function XPlay(XPlayer,pcount) {
    XTurn = turn("X",pcount);
    XBlocks.push(XTurn);
    winCheck(XBlocks);
    fillBoard(XTurn,"X");
    printBoard();
    turnNum++;
        if (Winner===true) {
            console.log("Player " + XPlayer + " Wins!");
            XWins = XWins+1;
        };
};

function OPlay(OPlayer,pcount) {
      OTurn = turn("O",pcount);
    OBlocks.push(OTurn);
    winCheck(OBlocks);
    fillBoard(OTurn,"O");
    printBoard();
    turnNum++;
    if (Winner===true) {
        console.log("Player " + OPlayer + " Wins!");
        OWins = OWins+1;
    }; 
};

function playGame(XPlayer, OPlayer, pcount) {
    while (playing) {
        Winner=false;
        turnNum=0;
        board = [1,2,3,4,5,6,7,8,9]
        XBlocks=[];
        OBlocks=[];
        if (Math.random() >=.5) {
            OPlay(OPlayer,pcount);
        };
        while (Winner===false && turnNum<9) {
            XPlay(XPlayer,pcount);
            if(Winner===false) {
            OPlay(OPlayer,pcount);
                }; 
            }; 
        if (Winner===false) {
            console.log("Tie!")
        };
            console.log(OPlayer + " Won " + OWins + " times.")
            console.log(XPlayer + " Won " + XWins + " times.")
        if (prompt.question("Do you want to play again? y/n: ") === "n") {
            playing = false
        };
    };
    process.exit()
};
    var playerNames = getnames();
    playGame(playerNames.xname, playerNames.oname,playerNames.players); 