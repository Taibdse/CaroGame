let arr_O = [];
let arr_X = [];
let size = 20;
let $gameBoard = $('#gameBoard');
let xIsNext = true;
let isWinGame = false;

$(() => {
  $('#btnPlayGame').click(newGame);
  newGame();
})

function createGameBoard() {
  $gameBoard.html('');
  for (let i = 0; i < Math.pow(size, 2); i++) {
    let $square = $(`<div class="square-board"><div>`);
    $gameBoard.append($square);
    $square.click(e => handleClickOnSquare(e, i));
  }
}

function handleClickOnSquare(e, i) {
  if(isWinGame) return;
  let $ele = $(e.target);
  let val = $ele.text();
  if (val != '') return;
  if (xIsNext) {
    $ele.text('X').addClass('text-success');
    arr_X.push(i);
    if (checkWinGame(arr_X)) {
      isWinGame = true;
      showAlertWinGame('X');
    }
  } else {
    $ele.text('O').addClass('text-danger');
    arr_O.push(i);
    if (checkWinGame(arr_O)) {
      isWinGame = true;
      showAlertWinGame('O');
    }
  }
  if(checkDraw()) return showAlertDrawGame();
  xIsNext = !xIsNext;
}

function checkDraw(){
  let halfNum = Math.pow(size, 2)
  if(arr_O.length == halfNum && arr_X.length == halfNum) return true;
  return false;
}

function showAlertWinGame(side){
  swal({
    title: "Good job!",
    text: `${side} has won the game`,
    icon: "success",
    timer: 4000
  });
}

function showAlertDrawGame(){
  swal({
    title: "You Drew Game!!!",
    text: `Please press button new game to play again`,
    icon: "error",
    timer: 4000
  });
}

function showContentOnSquare($ele, val){
  $ele.text(val);
}

function newGame() {
  arr_O.length = 0;
  arr_X.length = 0;
  xIsNext = true;
  isWinGame = false;
  createGameBoard();
}

function checkWinGame(arr) {
  let check = false;
  for(let i = 0; i < Math.pow(size, 2); i++){
    let item = arr[i];
    let cond_1 = (arr.indexOf(item + 1) > -1) && (arr.indexOf(item + 2) > -1) && (arr.indexOf(item + 3) > -1) && (arr.indexOf(item + 4) > -1);
    
    let cond_2 = arr.indexOf(item + size) > -1 && arr.indexOf(item + 2 * size) > -1 && arr.indexOf(item + 3 * size) > -1 && arr.indexOf(item + 4 * size) > -1;

    let cond_3 = arr.indexOf(item + size + 1) > -1 && arr.indexOf(item + 2 * size + 2) > -1 && arr.indexOf(item + 3 * size + 3) > -1 && arr.indexOf(item + 4 * size + 4) > -1;

    let cond_4 = arr.indexOf(item + size - 1) > -1 && arr.indexOf(item + 2 * size - 2) > -1 && arr.indexOf(item + 3 * size - 3) > -1 && arr.indexOf(item + 4 * size - 4) > -1;
    
    if (cond_1 || cond_2 || cond_3 || cond_4) {
      check = true;
      break;          
    }
  }
  return check;
}