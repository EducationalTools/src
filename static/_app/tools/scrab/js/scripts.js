//BUSINESS LOGIC
var initialBag = JSON.parse(bag);
var dictionary = JSON.parse(words);
console.log("JSON dict length ", dictionary.length);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
return Math.floor(Math.random() * (max - min)) + min;
};

function sortNumber(a,b) {
    return a - b;
};

function sortPartialWord(partialWord, isHorizontal) {
  var arrayOfCoords =[];
  var result = [];
  for (var i = 0; i < partialWord.length; i++) {
    if (isHorizontal) {
      arrayOfCoords.push(partialWord[i].x);
    } else {
      arrayOfCoords.push(partialWord[i].y);
    }
  }

  arrayOfCoords = arrayOfCoords.sort(sortNumber);
  for (var i = 0; i < arrayOfCoords.length; i++) {
    for (var j = 0; j < partialWord.length; j++) {
      if (isHorizontal) {
        if (partialWord[j].x === arrayOfCoords[i]) {
          result.push(partialWord[j]);
        }
      } else {
        if (partialWord[j].y === arrayOfCoords[i]) {
          result.push(partialWord[j]);
        }
      }
    }
  };
  return result;
};

//SOUND EFFECTS
function PlaySound() {
  var sound = document.getElementById("audio");
  sound.play();
}

function checkPlayerCount(playerID){
  return playerID;
}

function Bag() {
  this.bagTiles = initialBag;
};

function Game() {
  this.board = [];
  this.currentPlayer = {};
  this.players = [];
};

function Player(name) {
  this.name = name;
  this.score = 0;
  this.rack = [];
  this.partialWord = [];
  this.currentWord = [];
};

function Tile() {
  this.id;
  this.letter;
  this.letterValue;
};

function Cell(y, x) {
  this.y = y;
  this.x = x;
  this.pointMultiplier;
  this.occupied = false;
  this.tile = {};
}

Player.prototype.getTilebyId = function (tileId) {
  for (var i = 0; i < this.rack.length; i++) {
   if (this.rack[i].id === tileId) {
     return this.rack[i];
   }
  }
};

Game.prototype.turn = function () {
  if (this.checkVerticalPosition()) {
    this.currentPlayer.currentWord = this.completeVerticalWord(this.currentPlayer.partialWord);
    // console.log(this.currentPlayer.currentWord);
  }
  if (this.checkHorizontalPosition()) {
    this.currentPlayer.currentWord = this.completeHorizontalWord(this.currentPlayer.partialWord);
    // console.log(this.currentPlayer.currentWord);
  }
  if (this.checkValidWord()) {
    console.log(this.currentPlayer.getTurnScore());
    this.updatePlayerScore(this.currentPlayer.getTurnScore());
    console.log("current player score", this.currentPlayer.score);
  } else {
    this.backTilesToRackFromBoard();
    console.log("Partial Word:", this.currentPlayer.partialWord);
  }
};

Game.prototype.backTilesToRackFromBoard = function () {
  for (var i = 0; i < this.currentPlayer.partialWord.length; i++) {
    var x = this.currentPlayer.partialWord[i].x;
    var y = this.currentPlayer.partialWord[i].y;
    this.currentPlayer.rack.unshift(this.currentPlayer.partialWord[i].tile);
    this.board[y][x].tile = {};
  }
};

Game.prototype.switchPlayer = function () {
  for (var i = 0; i < this.players.length; i++) {
    if (this.currentPlayer.name === this.players[this.players.length-1].name) {
      this.currentPlayer = this.players[0];
    } else if (this.currentPlayer.name === this.players[i].name) {
      this.currentPlayer = this.players[i+1];
      break;
    }
  }
};

Game.prototype.generateBoard = function () {
  this.board = [];
  for (var i = 0; i < 15; i++) {
    var array = [];
    for (var j = 0; j < 15; j++) {
      var cell = new Cell (i, j)
      array.push(cell);
    }
    this.board.push(array);
  }
};

Game.prototype.completeHorizontalWord = function (partialWord) {

  var completeWord = [];
  partialWord = sortPartialWord(partialWord, true)
  var horizontal = this.board[partialWord[0].y];// take whole horizontal array from board with y coord
  var firstX = partialWord[0].x;
  var lastX = partialWord[partialWord.length-1].x;

  for (var i = partialWord[0].x; i <= partialWord[partialWord.length-1].x; i++) {
    if (typeof horizontal[i].tile !== 'undefined') {
      completeWord.push(horizontal[i]);
    } else {
      return false;
    }
  }
  // Check the beginning of horiz array to see if empty
  // also check if we're at the edge of the board
  while ((firstX-1)>=0 && (typeof horizontal[firstX-1].tile.id !== 'undefined')) {
    completeWord.unshift(horizontal[firstX-1]);
    firstX--;
  }
  // Check the end of horiz array to see if empty
  while ((lastX+1<=14)&& (typeof horizontal[lastX+1].tile.id !== 'undefined')) {
    completeWord.push(horizontal[lastX+1]);
    lastX++;
  }
  console.log("Completed Horizontal Word ", completeWord);
  return completeWord;
};

Game.prototype.completeVerticalWord = function (partialWord) {
  var completeWord = [];
  partialWord = sortPartialWord(partialWord, false);
  var xCoord = partialWord[0].x;
  var firstY = partialWord[0].y;
  var lastY = partialWord[partialWord.length-1].y;

  for (var i = firstY; i <= lastY; i++) {
    if (typeof this.board[i][xCoord].tile !== 'undefined') {
      completeWord.push(this.board[i][xCoord]);
    } else {
      return false;
    }
  }

  while ( (firstY-1)>=0 && (typeof this.board[firstY-1][xCoord].tile.id !== 'undefined')) {
    completeWord.unshift(this.board[firstY-1][xCoord]);
    firstY--;
  }
  while ( (lastY+1<=14) && (typeof this.board[lastY+1][xCoord].tile.id !== 'undefined')) {
    completeWord.push(this.board[firstY+1][xCoord]);
    lastY++;
  }
  console.log("Completed Vertical Word ", completeWord);
  return completeWord;
};

Player.prototype.buildPartialWord = function (cell) {
  this.partialWord.push(cell);
  console.log("Partial word: ",  this.partialWord);
  this.removeTilefromRack(cell);

};

Player.prototype.removeTilefromRack = function (cell) {
  var index = this.rack.indexOf(this.getTilebyId(cell.tile.id));
  if (index >= 0) {
  this.rack.splice(index, 1);
  }
};

Game.prototype.updatePlayerScore = function (wordScore) {
  this.currentPlayer.score += wordScore;

};

Player.prototype.refillRack = function (initialBag) {
  var needNumber = 7-this.rack.length;
  for (var i = 0; i < needNumber; i++) {
    var currentRandomInt = getRandomInt(0, initialBag.length-1);
    this.rack.push(initialBag[currentRandomInt]);
    initialBag.splice(currentRandomInt, 1);

  };
}

Game.prototype.checkVerticalPosition = function () {
  var checkVertical;
  for (var i = 0; i < this.currentPlayer.partialWord.length-1; i++) {

    if (this.currentPlayer.partialWord[i].x === this.currentPlayer.partialWord[i+1].x) {
      checkVertical = true;
      console.log("checkVerticalPosition ", checkVertical);
    } else {
      checkVertical = false;
      console.log("checkVerticalPosition ", checkVertical);

    }
  }
  return checkVertical;
};

Game.prototype.checkHorizontalPosition = function () {
  var checkHorizontal;
  for (var i = 0; i < this.currentPlayer.partialWord.length-1; i++) {

    if (this.currentPlayer.partialWord[i].y === this.currentPlayer.partialWord[i+1].y) {
      checkHorizontal = true;
      console.log("checkHorizontalPosition ", checkHorizontal);

    } else {
      checkHorizontal = false;
      console.log("checkHorizontalPosition", checkHorizontal);
    }
  }
  return checkHorizontal;
};

Game.prototype.checkValidWord = function () {
  var wordString ="";
  for (var i = 0; i < this.currentPlayer.currentWord.length; i++) {
    wordString+=this.currentPlayer.currentWord[i].tile.letter;
  }
  wordString = wordString.toLowerCase();

  console.log("Is word valid", dictionary.includes(wordString));
  return dictionary.includes(wordString);
};

Player.prototype.getTurnScore = function() {

  var wordScoreMultiplier = 1;
  var currentWordScore = 0;
  for (var i = 0; i <= this.currentWord.length-1; i++) {
    if (typeof this.currentWord[i].pointMultiplier === 'undefined') {
      currentWordScore += parseInt(this.currentWord[i].tile.letterValue);
    } else if (this.currentWord[i].pointMultiplier === "2L") {
      currentWordScore += parseInt(this.currentWord[i].tile.letterValue) * 2;
    } else if (this.currentWord[i].pointMultiplier === "3L") {
      currentWordScore += parseInt(this.currentWord[i].tile.letterValue) * 3;
    } else if (this.currentWord[i].pointMultiplier === "2W") {
      currentWordScore += parseInt(this.currentWord[i].tile.letterValue);
      wordScoreMultiplier = 2;
    } else if (this.currentWord[i].pointMultiplier === "3W") {
      currentWordScore += parseInt(this.currentWord[i].tile.letterValue);
      wordScoreMultiplier = 3;
    }
  };
  var score = currentWordScore *= wordScoreMultiplier;
  console.log("Turn score: ", score);
  return score;
};

Game.prototype.startNewGame = function (numberOfPlayers) {
  this.generateBoard();
  for (var i = 0; i <numberOfPlayers; i++) {
    this.players.push(new Player ("Player" + (i+1)));
  }
  this.currentPlayer = this.players[0];
  console.log("Current player is:", this.currentPlayer);
};

Game.prototype.fillAllPlayersRack = function () {
  for (var i = 0; i < this.players.length; i++) {
    this.players[i].refillRack(initialBag);
    console.log("Player" + i + "rack", this.players[i].rack);
  }
};

Game.prototype.checkEndGame = function () {
  var emptyRack;
  for (var i = 0; i < this.players.length; i++) {
    if (this.players[i].rack.length<=0) {
      emptyRack = true;
    }
  }
  if (initialBag.length<=0 && emptyRack) {
    console.log("End of game: ", true);
    return true;
  } else {
    console.log("End of game: ", false);

    return false;
  }
};

Game.prototype.findWinner = function () {
  for (var i = 0; i < this.players.length; i++) {
    // cycle through all players
    var tempHighestScore = "";
    var winner = [];
    // if current player score is higher than var tempWInner
    if (this.players[i].score > tempHighestScore ) {
      winner[i] = this.players[i].name;
    }
    else if (this.players[i].score === tempHighestScore ) {
      winner.push(this.players[i].name);
    }
  }
  console.log("Winner is", winner);
  return winner;
};

//===========================================================================


//POPULATE RACK WITH TILES
Game.prototype.increasePlayerRackDivID = function(idString){
    for(i=0; i <= this.currentPlayer.rack.length-1; i++){
      $("#" + idString + "-0" + i).append("<div class='draggable tile letter" + this.currentPlayer.rack[i].letter + "' id='" + this.currentPlayer.rack[i].id + "'><audio id='audio' src='audio/tile.mp3' autostart='false'></audio><a onclick='PlaySound()'>" + this.currentPlayer.rack[i].letter + "<span class='subscript'>" + this.currentPlayer.rack[i].letterValue.sub() + "</span></a></div></div>");
    }

}






////////////////////// USER INTERFACE

$(document).ready(function(){
  var number;
  var scrabbleGame = new Game();


//NUMBER OF PLAYERS
  function checkPlayerCount(playerID){
    return playerID;
  }
  for(i=1; i <=4; i++){
    $("button#" + i + "player").click(function(){
      number = checkPlayerCount(parseInt($(this).attr("val")));
      $("#playerNumbers").hide();
      $("#start").show();
    });
  }

//TILE BAG USER INTERFACE
  $("#start").click(function(){
    $(this).hide();
    $(".showDuringGamePlay").show();
    $("#refill").show();
    $("#player1Rack").show();
    scrabbleGame.startNewGame(number);
    scrabbleGame.fillAllPlayersRack(initialBag);

    var currentPlayer = scrabbleGame.currentPlayer;
    scrabbleGame.increasePlayerRackDivID(15);
    $(".draggable").draggable();
  });
  //DRAG AND DROP SQUARES
  $("div.draggable").draggable( {
    opacity: .4,
    create: function(){
      $(this).data('position',$(this).position())
    },
    cursorAt: {left:15},
    cursor: 'move',
    start: function(){
      $(this).stop(true,true);
    }
  });

  $('div.row').find('.cell').droppable({
    drop:function(event, ui, sound){
      snapToMiddle(ui.draggable,$(this));

      console.log(ui.draggable);
      sound = document.getElementById(scrabbleGame.currentPlayer.rack[0].id);
      var inputCellTileString = $(this).droppable(0).attr('id').split('-');


      var cellYAxis = parseInt(inputCellTileString[0]);
      var cellXAxis = parseInt(inputCellTileString[1]);
      var cellScoreVariant = inputCellTileString[2];
      var tileId = $(ui.draggable)[0].id;

      var chosenTile = scrabbleGame.currentPlayer.getTilebyId(tileId);

      if ((cellYAxis <= 14) && (cellXAxis <= 14)) {
        scrabbleGame.board[cellYAxis][cellXAxis].tile = chosenTile;
        scrabbleGame.board[cellYAxis][cellXAxis].pointMultiplier = cellScoreVariant;
        scrabbleGame.currentPlayer.buildPartialWord(scrabbleGame.board[cellYAxis][cellXAxis]);
        ui.draggable.removeClass("ui-draggable-dragging");
        ui.draggable.draggable('destroy');
      }
      else{
        console.log("failing xomg");
      }
    }
  });

  function snapToMiddle(dragger, target){
    var offset = target.offset();
    var topMove = (target.outerHeight(true) - dragger.outerHeight(true)) / 2;
    var leftMove= (target.outerWidth(true) - dragger.outerWidth(true)) / 2;
    dragger.offset({ top: topMove + offset.top, left: leftMove + offset.left });
  };

//CLICKABLE BAG
$("#refill").click(function () {
  scrabbleGame.currentPlayer.refillRack(initialBag);
  console.log("Refilled rack ", scrabbleGame.currentPlayer.rack);
  if (scrabbleGame.checkEndGame()) {
    scrabbleGame.findWinner();
  } else  {
    scrabbleGame.switchPlayer();
    console.log("Switch player to ", scrabbleGame.currentPlayer.name);
  }
});

//NUMBER OF PLAYERS
  for(i=1; i <=4; i++){
    $("button#" + i + "player").click(function(){
      checkPlayerCount(parseInt($(this).attr("val")));
      $("#playerNumbers").hide();
      $("#start").show();
    });
  }

  $("button#score").click(function(){
    scrabbleGame.turn();
    $("#playerScore").append("<p>" + scrabbleGame.currentPlayer.name + ", your score is: " + scrabbleGame.currentPlayer.score + "</p>");
  });

  $("button#reset").click(function(){
    console.log("RESET");
    $("#player1Rack").empty("div.draggable");
  });

  $("button#pass").click(function(){
    scrabbleGame.switchPlayer();
    console.log(scrabbleGame.currentPlayer.name);
    //RECURSE THIS PLZZZZZZZZ DAVID
    if (scrabbleGame.currentPlayer.name === ("Player1")) {
      $("div.tile").remove("");
      scrabbleGame.increasePlayerRackDivID(15);
      $("#player1Rack").show();
      $("#player2Rack").hide();
      $("#player3Rack").hide();
      $("#player4Rack").hide();
    }
    if (scrabbleGame.currentPlayer.name === ("Player2")) {
      $("div.tile").remove("");
      scrabbleGame.increasePlayerRackDivID(16);
      $("#player1Rack").hide();
      $("#player2Rack").show();
      $("#player3Rack").hide();
      $("#player4Rack").hide();
    }
    if (scrabbleGame.currentPlayer.name === ("Player3")) {
      $("div.tile").remove("");
      scrabbleGame.increasePlayerRackDivID(17);
      $("#player1Rack").hide();
      $("#player2Rack").hide();
      $("#player3Rack").show();
      $("#player4Rack").hide();
    }
    if (scrabbleGame.currentPlayer.name === ("Player4")) {
      $("div.tile").remove("");
      scrabbleGame.increasePlayerRackDivID(18);
      $("#player1Rack").hide();
      $("#player2Rack").hide();
      $("#player3Rack").hide();
      $("#player4Rack").show();
    }
  });
});
