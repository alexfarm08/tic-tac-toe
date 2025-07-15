function Gameboard() {
    const row = 3;
    const col = 3;
    const board = [];

    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < col; j++) {
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const placeNumber = (row, col, players) => {
        const availableCells = board.flat().filter(cell => cell.getValue() === 0);

        if (availableCells.length === 0) {
            return;
        }
        
        if (board[row][col].getValue() === 1 || board[row][col].getValue() === 2) {
            console.log('invalid pick there is alread a piece there');
            return;
        }
        else {
            board[row][col].placePiece(players);
        }
    };

    // used to print board to consol in testing not needed in ui
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return{getBoard, placeNumber, printBoard};
}

function cell() {
    let value = 0;

    const placePiece = (playersNumber) => {
        value = playersNumber;
    };

    const getValue = () => value;

    return {
        placePiece,
        getValue
    };
};

function GameController() {
    const board = Gameboard();

    const players = [{
        name: 'player X', 
        number: 1, 
        score: 0
    },
    {
        name: 'player O', 
        number: 2, 
        score: 0
    }];

    let activePlayer = players[0];
    let gameOver = false;
    let winner = null;

    const getActivePlayer = () => activePlayer;
    const isGameOver = () => gameOver;
    const getWinner = () => winner;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    }

    const playRound = (row, col) => {
        const currentPlayer = getActivePlayer();
        board.placeNumber(row,col, getActivePlayer().number);

        const winPatterns = [
            //horizontal win patterns
            [[0,0], [0,1], [0,2]],
            [[1,0], [1,1], [1,2]],
            [[2,0], [2,1], [2,2]],
            //vertical win patterns
            [[0,0], [1,0], [2,0]],
            [[0,1], [1,1], [2,1]],
            [[0,2], [1,2], [2,2]],
            // diagonal win patterns
            [[0,0], [1,1], [2,2]],
            [[0,2], [1,1], [2,0]],
        ]

        const checkWinner = () => {
            const boardSate = board.getBoard();
            for (let i = 0; i < winPatterns.length; i++) {
                const [[x1,y1], [x2,y2], [x3,y3]] = winPatterns[i];
                if (boardSate[x1][y1].getValue() === currentPlayer.number && boardSate[x2][y2].getValue() === currentPlayer.number && boardSate[x3][y3].getValue() === currentPlayer.number) {
                    console.log(`${currentPlayer} wins!`);
                    gameOver = true;
                    winner = currentPlayer;
                    return true;
                }
            }
            return false;
        }

        const hasWinner = checkWinner();

        if (hasWinner) {
            printNewRound();
            return;
        }

        checkWinner();
        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
        isGameOver,
        getWinner
    };
};

function screenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const resetButton = document.querySelector('.reset');

    const updateScreen = () => {
        // clear the board
        boardDiv.textContent = "";

        // get the newest version of the board and player turn
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        const gameIsOver = game.isGameOver();

        const getSymbol = (value) => {
            if (value === 1) return "X";
            if (value === 2) return "O";
            return "";
        }

        //render board squares 
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = rowIndex; 
                cellButton.dataset.column = colIndex;
                cellButton.textContent = getSymbol(cell.getValue());
                boardDiv.appendChild(cellButton);
            });
        });

        resetButton.addEventListener('click', () => {
            boardDiv.textContent = '';
            playerTurnDiv.textContent = '';

            screenController();
        })

        if (gameIsOver) {
            const winner = game.getWinner();
            const winnerSymbol = getSymbol(winner.number);
            playerTurnDiv.textContent = `player ${winnerSymbol} wins!`;
        }
        else {
            playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
        }

    }

    function clickHandlerBoard(e) {
        if (game.isGameOver()) return;

        const selectedRow = parseInt(e.target.dataset.row);
        const selectedColumn = parseInt(e.target.dataset.column);

        if (isNaN(selectedRow) || isNaN(selectedColumn)) return;

        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }
    boardDiv.addEventListener("click", clickHandlerBoard);

    //inital render
    updateScreen();

}

screenController();