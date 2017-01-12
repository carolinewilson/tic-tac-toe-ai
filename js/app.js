var tiles = document.getElementsByClassName("tile");
var players = document.getElementById('players');
var clearBoard = document.getElementById('resetBoardBtn');
var clearScores = document.getElementById('resetScoresBtn');
var scoreX = document.getElementById('scoreX');
var scoreO = document.getElementById('scoreO');
var diffOptions = document.getElementsByClassName('diff');
var easy = document.getElementById('easy');
var hard = document.getElementById('hard');

var diffLevel ="";
var currentPlayer = "x";
var currentPlayerTiles = [];
var playerXTiles = [];
var compTiles = [];
var playerXScore = 0;
var compScore = 0;
var playerDisplay = "You";
var winnerFound = "";
var winner = "";
var gameActive;
var playAgain = "";
var availableTiles =[0,1,2,3,4,5,6,7,8];
var randNum;

// Set display on page load
players.textContent = playerDisplay;

// Button triggers
clearBoard.addEventListener('click', resetBoard);
clearScores.addEventListener('click', resetScores);

// Add click listener to difficulty options
for(var i = 0; i < diffOptions.length; i ++){
  diffOptions[i].addEventListener('click', setDiff);
}

// Add click listener to all tiles
for(var i = 0; i < tiles.length; i ++){
  tiles[i].addEventListener('click', runGame);
}

// Set game difficulty
function setDiff(){
  if (this.id === 'easy'){
    hard.textContent = "";
    diffLevel = 'easy';
  } else if (this.id === 'hard'){
    easy.textContent = "";
    diffLevel = 'hard';
  }
  this.className="active";
}

// Update text on tile and toggle user
function runGame() {
  if (gameActive === false) {
    resetBoard(); // clear board if game is finished
  } else if (diffLevel){
    var currentClass = this.className;
    var claimedTile = currentClass.includes("claimed");
    if (!claimedTile) {
      // claim tile for current player
      this.textContent = currentPlayer; // print player on tile
      this.className = "tile claimed " +currentPlayer; // disable tile

      var id = parseFloat(this.id);
      // Remove tile id from availableTiles array
      var tileToRemove = availableTiles.indexOf(id);
      availableTiles.splice(tileToRemove,1);

      // Add tile id to current players array
      playerXTiles.push(id);

      // Set currentPlayerTiles equal to currentPlayer
      currentPlayerTiles = playerXTiles;

      // Check if winning array
      checkCurrentPlayerArray();
    } else {
      alert("Tile already claimed. Pick another one.");
    }
  } else {
    alert("Select a difficulty level to play.");
  }
}
function checkCurrentPlayerArray(){
  // Check if winning array
  if (currentPlayerTiles.length > 2){ // Only run when there could be a winner
    checkForWin();
    if (winnerFound){
      updateScores();
      // winner = currentPlayer;
      currentPlayer === "x" ? winner = "You" : winner = "Computer";
      setTimeout(function(){
        var str ="";
        winner === "You" ? str =  " win" : str = " wins";
        playAgain = prompt(winner + str +"! Play again? Y/ N").toUpperCase();
        if (playAgain === "Y"){
          resetBoard();
        }
      }, 100);
    } else if (currentPlayerTiles.length === 5) { // Finds draw
      winner = "draw";
      setTimeout(function(){
        playAgain = prompt("It's a draw. Play again? Y / N").toUpperCase();
        if (playAgain === "Y"){
          resetBoard();
        }
      }, 100);
    }
  }
  if (currentPlayerTiles.length > 0){
    // Toggle user if game in play & no winner
    if (!winnerFound && winner != "draw"){
      toggleUser();
    }
  }
}

function checkForWin(){
  // Check if current player has won
  if (currentPlayerTiles.includes(0) && currentPlayerTiles.includes(1) && currentPlayerTiles.includes(2) || currentPlayerTiles.includes(3) && currentPlayerTiles.includes(4) && currentPlayerTiles.includes(5) || currentPlayerTiles.includes(6) && currentPlayerTiles.includes(7) && currentPlayerTiles.includes(8) || currentPlayerTiles.includes(0) && currentPlayerTiles.includes(3) && currentPlayerTiles.includes(6) || currentPlayerTiles.includes(1) && currentPlayerTiles.includes(4) && currentPlayerTiles.includes(7) || currentPlayerTiles.includes(2) && currentPlayerTiles.includes(5) && currentPlayerTiles.includes(8) || currentPlayerTiles.includes(0) && currentPlayerTiles.includes(4) && currentPlayerTiles.includes(8) || currentPlayerTiles.includes(2) && currentPlayerTiles.includes(4) && currentPlayerTiles.includes(6)) {
    winnerFound = true;
  }
}

function toggleUser() {
  if (currentPlayer === "x"){
    currentPlayer = "o";
    players.textContent = "Computer";
    diffLevel === 'easy' ? setTimeout(compEasy, 1000) : setTimeout(compHard, 1000);
  } else {
    currentPlayer = "x";
    players.textContent = "You";
  }
}

function resetBoard(){
  currentPlayer = "x";
  currentPlayerTiles = [];
  playerXTiles = [];
  playerDisplay = "You";
  compTiles = [];
  winnerFound = "";
  winner = "";
  playAgain = "";
  gameActive = true;
  availableTiles =[0,1,2,3,4,5,6,7,8];
  players.textContent = playerDisplay;
  // clear display value from all tiles
  for(var i = 0; i < tiles.length; i ++){
    tiles[i].textContent = "";
    tiles[i].className = "tile";
  }
}
function resetScores(){
  playerXScore = 0;
  compScore = 0;
  scoreX.textContent=playerXScore;
  scoreO.textContent=compScore;
  resetBoard();
}
function updateScores(){
  gameActive = false;
  if(currentPlayer === "x") {
    playerXScore += 1;
    scoreX.textContent= playerXScore;
  } else {
    compScore += 1;
    scoreO.textContent= compScore;
  }
}

function compEasy(){
  // claim a random available tile
  var numAvailable = availableTiles.length;
  randNum = Math.floor((Math.random() * (numAvailable - 1)));
  compChoice = availableTiles[randNum];
  compChoiceElem = tiles[compChoice];

  // Remove tile from available tiles
  var tileToRemove = availableTiles.indexOf(compChoice);
  availableTiles.splice(tileToRemove,1);

  // Update visual board
  compChoiceElem.textContent = currentPlayer; // print player on tile
  compChoiceElem.className = "tile claimed " +currentPlayer; // disable tile

  // Update computer tile array
  compTiles.push(compChoice);
  currentPlayerTiles = compTiles;

  // Check current array for win
  checkCurrentPlayerArray();
}


function compHard() {
  var numAvailable;
  var tileToRemove;

  if (playerXTiles.length >=2){
    // Pick 0
    if (playerXTiles.includes(1)&&(playerXTiles.includes(2))&&availableTiles.includes(0) || playerXTiles.includes(3)&&(playerXTiles.includes(6)&&availableTiles.includes(0))|| playerXTiles.includes(4)&&(playerXTiles.includes(8))&&availableTiles.includes(0)) {
      compChoice = 0;
      tileToRemove = availableTiles.indexOf(0);
      compChoiceElem = tiles[compChoice];
    }
    // Pick 1
    else if (playerXTiles.includes(0)&&(playerXTiles.includes(2)&&availableTiles.includes(1)) || playerXTiles.includes(4)&&(playerXTiles.includes(7))&&availableTiles.includes(1)){
      compChoice = 1;
      tileToRemove = availableTiles.indexOf(1);
      compChoiceElem = tiles[compChoice];
    }

    // Pick 2
    else if (playerXTiles.includes(0)&&(playerXTiles.includes(1))&&availableTiles.includes(2) || playerXTiles.includes(4)&&(playerXTiles.includes(6))&&availableTiles.includes(2) || playerXTiles.includes(5)&&(playerXTiles.includes(8))&&availableTiles.includes(2)) {
      compChoice = 2;
      tileToRemove = availableTiles.indexOf(2);
      compChoiceElem = tiles[compChoice];
    }
    // Pick 3
    else if (playerXTiles.includes(0)&&(playerXTiles.includes(6))&&availableTiles.includes(3) || playerXTiles.includes(4)&&(playerXTiles.includes(5))&&availableTiles.includes(3)){
      compChoice = 3;
      tileToRemove = availableTiles.indexOf(3);
      compChoiceElem = tiles[compChoice];
    }

    // Pick 4
    else if (playerXTiles.includes(0)&&(playerXTiles.includes(8))&&availableTiles.includes(4) || playerXTiles.includes(1)&&(playerXTiles.includes(7))&&availableTiles.includes(4) || playerXTiles.includes(2)&&(playerXTiles.includes(6))&&availableTiles.includes(4) || playerXTiles.includes(3)&&(playerXTiles.includes(5))&&availableTiles.includes(4)) {
      compChoice = 4;
      tileToRemove = availableTiles.indexOf(4);
      compChoiceElem = tiles[compChoice];
    }

    // Pick 5
    else if (playerXTiles.includes(2)&&(playerXTiles.includes(8))&&availableTiles.includes(5) || playerXTiles.includes(3)&&(playerXTiles.includes(4))&&availableTiles.includes(5)) {
      compChoice = 5;
      tileToRemove = availableTiles.indexOf(5);
      compChoiceElem = tiles[compChoice];
    }

    // Pick 6
    else if (playerXTiles.includes(0)&&(playerXTiles.includes(3))&&availableTiles.includes(6) || playerXTiles.includes(2)&&(playerXTiles.includes(4))&&availableTiles.includes(6) || playerXTiles.includes(7)&&(playerXTiles.includes(8))&&availableTiles.includes(6)){
      if (availableTiles.includes(6)){
        compChoice = 6;
        tileToRemove = availableTiles.indexOf(6);
        compChoiceElem = tiles[compChoice];
      }
    }

    // Pick 7
    else if (playerXTiles.includes(1)&&(playerXTiles.includes(4))&&availableTiles.includes(7) || playerXTiles.includes(6)&&(playerXTiles.includes(8))&&availableTiles.includes(7)){
      if (availableTiles.includes(7)){
        compChoice = 7;
        tileToRemove = availableTiles.indexOf(7);
        compChoiceElem = tiles[compChoice];
      }
    }

    // Pick 8
    else if (playerXTiles.includes(0)&&(playerXTiles.includes(4))&&availableTiles.includes(8) || playerXTiles.includes(2)&&(playerXTiles.includes(5))&&availableTiles.includes(8) || playerXTiles.includes(6)&&(playerXTiles.includes(7))&&availableTiles.includes(8)){
      compChoice = 8;
      tileToRemove = availableTiles.indexOf(8);
      compChoiceElem = tiles[compChoice];
    }
    else {
      numAvailable = availableTiles.length;
      randNum = Math.floor((Math.random() * (numAvailable - 1)));
      compChoice = availableTiles[randNum];
      compChoiceElem = tiles[compChoice];
      tileToRemove = availableTiles.indexOf(compChoice);
    }
  }
  // Pick Random
  else {
    numAvailable = availableTiles.length;
    randNum = Math.floor((Math.random() * (numAvailable - 1)));
    compChoice = availableTiles[randNum];
    compChoiceElem = tiles[compChoice];
    tileToRemove = availableTiles.indexOf(compChoice);
  }


  // If only 2 tiles left
  if (playerXTiles.length === 4 && !tileToRemove) {
    numAvailable = availableTiles.length;
    randNum = Math.floor((Math.random() * (numAvailable - 1)));
    compChoice = availableTiles[randNum];
    compChoiceElem = tiles[compChoice];
    tileToRemove = availableTiles.indexOf(compChoice);
  }
  // Remove tile from available tiles
  // var tileToRemove = availableTiles.indexOf(compChoice);
  availableTiles.splice(tileToRemove,1);

  // Update visual board
  compChoiceElem.textContent = currentPlayer; // print player on tile
  compChoiceElem.className = "tile claimed " +currentPlayer; // disable tile

  // Update computer tile array
  compTiles.push(compChoice);
  currentPlayerTiles = compTiles;

  // Check current array for win
  checkCurrentPlayerArray();
}
