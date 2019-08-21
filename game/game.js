
/*
    The "Sweet Alert" 3rd library js is used 
    for displaying customized alerts
    using the 'swal' function
 */

// ignores all characters but 1-9 digits
const onInput = (el) => {
    return el.value.replace(/[^1-9]/, '');
}

// display board in HTML
const populateHTML = (board) => {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let input = table.rows[r].cells[c].getElementsByTagName('input')[0];
            input.value = board[r][c];
        }
    }
}

// fetches a new board and hides cells based on chosen difficulty level
const initGame = (board, level) => {
    let table = document.getElementById('table');
    let amountToHide = calcAmountToHide(level);

    // populate HTML table
    populateHTML(board);

    // copy board content to store its initial value
    initialBoard = board.map(row => row.slice());

    // hide cells based on chosen difficulty 
    for (let i = 0; i < amountToHide;) {
        let rand_row = Math.floor(Math.random() * 9);
        let rand_col = Math.floor(Math.random() * 9);
        if (initialBoard[rand_row][rand_col] !== '') {
            initialBoard[rand_row][rand_col] = '';
            let input = table.rows[rand_row].cells[rand_col].getElementsByTagName('input')[0];
            input.value = '';
            input.disabled = false;
            i++;
        }
    }
}

// calculates amount of cells to hide based on level
const calcAmountToHide = (level) => {
    let elementsToHide = 0;
    switch (level) {
        case 'easy': elementsToHide = 20; break;
        case 'intermediate': elementsToHide = 40; break;
        case 'hard': elementsToHide = 60; break;
        default: break;
    }
    return elementsToHide;
}

// represents an array of sudoku boards to fetch a board from
const fetchRandomBoard = () => {
    let boardsArray = [
        [
            [4, 5, 2, 7, 1, 8, 9, 3, 6],
            [9, 1, 3, 6, 2, 5, 8, 7, 4],
            [6, 7, 8, 9, 3, 4, 1, 5, 2],
            [5, 6, 9, 8, 4, 3, 7, 2, 1],
            [3, 2, 7, 1, 9, 6, 4, 8, 5],
            [8, 4, 1, 2, 5, 7, 6, 9, 3],
            [1, 3, 5, 4, 7, 9, 2, 6, 8],
            [2, 9, 6, 5, 8, 1, 3, 4, 7],
            [7, 8, 4, 3, 6, 2, 5, 1, 9]
        ],
        [
            [5, 9, 8, 3, 4, 6, 7, 1, 2],
            [2, 3, 1, 7, 8, 9, 4, 6, 5],
            [7, 4, 6, 5, 1, 2, 8, 9, 3],
            [9, 1, 7, 4, 2, 3, 6, 5, 8],
            [6, 8, 2, 1, 7, 5, 3, 4, 9],
            [3, 5, 4, 6, 9, 8, 2, 7, 1],
            [1, 6, 5, 8, 3, 4, 9, 2, 7],
            [4, 2, 3, 9, 5, 7, 1, 8, 6],
            [8, 7, 9, 2, 6, 1, 5, 3, 4]
        ],
        [
            [8, 2, 3, 4, 1, 7, 5, 6, 9],
            [5, 4, 9, 6, 3, 2, 7, 1, 8],
            [6, 1, 7, 8, 5, 9, 4, 3, 2],
            [3, 8, 6, 2, 4, 5, 9, 7, 1],
            [9, 7, 1, 3, 6, 8, 2, 5, 4],
            [4, 5, 2, 9, 7, 1, 6, 8, 3],
            [2, 3, 8, 5, 9, 6, 1, 4, 7],
            [7, 9, 5, 1, 8, 4, 3, 2, 6],
            [1, 6, 4, 7, 2, 3, 8, 9, 5]
        ]
    ];

    return boardsArray[Math.floor(Math.random() * boardsArray.length)];
}

// checks whether the user has successfully finished a game and displays an alert
const finish = () => {
    if (!checkSolution()) {
        swal({
            title: "Game Over!",
            text: "You've lost...",
            icon: "error",
            buttons: false
        }).then(() => {
            redirect('../level/level.html');
        });
    }
    else {
        swal({
            title: "Success!",
            text: "You've completed the game!",
            icon: "success",
            buttons: false
        }).then(() => {
            redirect('../level/level.html');
        });
    }
}

// checks if the solution is correct
// every board is assumed to have a single unique solution  
const checkSolution = () => {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let input = table.rows[r].cells[c].getElementsByTagName('input')[0];
            if (parseInt(input.value) !== board[r][c])
                return false;
        }
    }
    return true;
}

// allows the user to reset the board to its initial state
const resetBoard = () => {
    swal({
        title: "Restart game?",
        text: "The board will be reset.",
        icon: "warning",
        buttons: true
    })
        .then((confirm) => {
            if (confirm) {
                populateHTML(initialBoard);
            }
        });
}

// allows the user to start a new game based on the same difficulty level
const newGame = () => {
    swal({
        title: "New game?",
        text: "A new board will be generated.",
        icon: "warning",
        buttons: true
    })
        .then((confirm) => {
            if (confirm) {
                // reloads page from cache
                //document.location.reload();
                redirect('');
            }
        });
}

// redirects the user to a new game
const redirect = (path) => {
    location.href = path;
}

// display the title
let level = localStorage.getItem('level');
document.getElementById('lvl').innerHTML = 'Level chosen - ' + level;

// get a random board
let board = fetchRandomBoard();

// store initial state of board
let initialBoard;

// initialize game
initGame(board, level);