var board1;
var solution1;
let solution;
let board;

let sudoku = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  let sudoku2 = JSON.parse(JSON.stringify(sudoku));
  let changesMade = false;
  let fields = [];
  let counter = 0;
  let sudoku3;
    
  // solves a sudoku
  function solveSudoku() {
    fill_possible_fields();
  
    changesMade = false;
    counter = 0;
  
    while (!sudoku_complete()) {
      counter++;
      test_rows_and_cols();
      test_blocks();
      test_possible_fields();
      if (!changesMade) {
        break;
      } else {
        changesMade = false;
      }
      if (counter === 100) {
        break;
      }
    }
  }
  
  // returns true if there are two equal numbers in the same row
  function duplicateNumberInRow(s, fieldY) {
    numbers = new Array();
    for (var i = 0; i < 9; i++) {
      if (s[i][fieldY] !== 0) {
        if (numbers.includes(s[i][fieldY])) {
          return true;
        } else {
          numbers.push(s[i][fieldY]);
        }
      }
    }
    return false;
  }
  
  // returns true if there are two equal numbers in the same col
  function duplicateNumberInCol(s, fieldX) {
    numbers = new Array();
    for (var i = 0; i < 9; i++) {
      if (s[fieldX][i] !== 0) {
        if (numbers.includes(s[fieldX][i])) {
          return true;
        } else {
          numbers.push(s[fieldX][i]);
        }
      }
    }
    return false;
  }
  
  // returns true if there are two equal numbers in the same box
  function duplicateNumberInBox(s, fieldX, fieldY) {
    boxX = Math.floor(fieldX / 3);
    boxY = Math.floor(fieldY / 3);
    numbers = new Array();
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        x = i + 3 * boxX;
        y = j + 3 * boxY;
        if (s[x][y] !== 0) {
          if (numbers.includes(s[x][y])) {
            return true;
          } else {
            numbers.push(s[x][y]);
          }
        }
      }
    }
    return false;
  }
  
  // returns true if there are two equal numbers in the same row, col or box
  function duplicateNumberExists(s, fieldX, fieldY) {
    if (duplicateNumberInRow(s, fieldY)) {
      return true;
    }
    if (duplicateNumberInCol(s, fieldX)) {
      return true;
    }
    if (duplicateNumberInBox(s, fieldX, fieldY)) {
      return true;
    }
    return false;
  }
  
  // generates a random sudoku with a given amount of numbers in it
  function generateRandomSudoku(numbers) {
    while (!sudoku_complete() || sudoku_invalid(sudoku)) {
      // new empty sudoku
      sudoku3 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      sudoku = JSON.parse(JSON.stringify(sudoku3));
  
      // how many numbers are entered already?
      let numbersDone = 0;
  
      while (numbersDone < numbers) {
        let fieldX = Math.floor(Math.random() * 9);
        let fieldY = Math.floor(Math.random() * 9);
        let number = Math.floor(Math.random() * 9) + 1;
        //alert("" + fieldX + " " + fieldY + " " + number);
  
        if (sudoku3[fieldX][fieldY] === 0) {
          sudoku3[fieldX][fieldY] = number;
          if (duplicateNumberExists(sudoku3, fieldX, fieldY)) {
            sudoku3[fieldX][fieldY] = 0;
            continue;
          } else {
            numbersDone++;
          }
          //alert("" + numbersDone);
        }
      }
      sudoku = JSON.parse(JSON.stringify(sudoku3));
      solveSudoku();
    }
  }
  
  // fills the possible numbers for the fields
  function fill_possible_fields() {
    for (var i = 0; i < 9; i++) {
      fields[i] = [];
    }
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        fields[i][j] = [];
      }
    }
  
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        for (var k = 0; k < 9; k++) {
          fields[i][j][k] = k + 1;
        }
      }
    }
  }
  
  // show the sudoku as a table
  
  
  // tests the possible 9 numbers for a field, if only one is possible then it's entered to the field
  function test_possible_fields() {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (sudoku[i][j] === 0) {
          var numbers = 0;
          var number = 0;
          for (var k = 0; k < 9; k++) {
            if (fields[i][j][k] !== 0) {
              number = k + 1;
              numbers++;
            }
          }
          if (numbers === 1) {
            sudoku[i][j] = number;
            changesMade = true;
          }
        }
      }
    }
  }
  
  // tests the rows and cols
  function test_rows_and_cols() {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (sudoku[i][j] !== 0) {
          var number = sudoku[i][j];
          for (var k = 0; k < 9; k++) {
            if (sudoku[i][k] === 0) {
              if (fields[i][k][number - 1] !== 0) {
                changesMade = true;
              }
              fields[i][k][number - 1] = 0;
            }
          }
          var number = sudoku[i][j];
          for (var k = 0; k < 9; k++) {
            if (sudoku[k][j] === 0) {
              if (fields[k][j][number - 1] !== 0) {
                changesMade = true;
              }
              fields[k][j][number - 1] = 0;
            }
          }
        }
      }
    }
  }
  
  // tests the blocks
  function test_blocks() {
    for (var k = 0; k < 3; k++) {
      for (var l = 0; l < 3; l++) {
        for (var i = 0 + k * 3; i < 3 + k * 3; i++) {
          for (var j = 0 + l * 3; j < 3 + l * 3; j++) {
            if (sudoku[i][j] !== 0) {
              var number = sudoku[i][j];
              for (var a = 0 + k * 3; a < 3 + k * 3; a++) {
                for (var b = 0 + l * 3; b < 3 + l * 3; b++) {
                  if (sudoku[a][b] === 0) {
                    if (fields[a][b][number - 1] !== 0) {
                      changesMade = true;
                    }
                    fields[a][b][number - 1] = 0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  // tests if a sudoku is complete and returns eiter true or false
  function sudoku_complete() {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (sudoku[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }
  
  //Tests if there are any duplicate numbers in a sudoku
  function sudoku_invalid(s) {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (duplicateNumberExists(s, i, j)) {
          return true;
        }
      }
    }
    return false;
  }


  
generateRandomSudoku(25);
board1=sudoku3;
solution1=sudoku;
    

  // Array of arrays
let arrayOfArrays = board1;
let arrayOfArrays1 = solution1;

// Convert to an array of strings
let arrayOfStrings = arrayOfArrays.map(subArray => subArray.join(""));
let arrayOfStrings1 = arrayOfArrays1.map(subArray => subArray.join(""));

// Array of strings

// String to replace
let stringToReplace = '0';

// Symbol to replace with
let replacementSymbol = '-';

// Replace the string with the symbol
let replacedArray = arrayOfStrings.map(str => str.replace(new RegExp(stringToReplace, 'g'), replacementSymbol));
board=replacedArray;
solution=arrayOfStrings1;
var numSelected = null;
var tileSelected = null;

var errors = 0;




window.onload = function() {
    setGame();
    console.log("Randomly Generated Sudoku:");
    for (let r = 0; r < 9; r++) {
        console.log(board[r]);
    }

}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}
function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
       
        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            console.log("Solution for Row:", r, "Column:", c, "is", numSelected.id);
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

for (let i = 0; i < 9; i++) {
    console.log(solution[i]);
  }
