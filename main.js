const gameLogic = (function() {

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

        const switchPlayerTurn = () => {
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
        };

        const getActivePlayer = () => activePlayer;

        const printNewRound = () => {
            board.printBoard();
            console.log(`${getActivePlayer().name}'s turn`);
        }

        const playRound = (row, col) => {
            console.log(`${getActivePlayer().name} placed there piece at ${row} ${col}`);
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
                const player = getActivePlayer().number;
                const boardSate = board.getBoard();
                for (let i = 0; i < winPatterns.length; i++) {
                    const [[x1,y1], [x2,y2], [x3,y3]] = winPatterns[i];
                    if (boardSate[x1][y1].getValue() === player && boardSate[x2][y2].getValue() === player && boardSate[x3][y3].getValue() === player) {
                        console.log(`${player} wins!`);
                    }
                }
            }

            checkWinner();
            switchPlayerTurn();
            printNewRound();
        }

        printNewRound();

        return {
            playRound,
            getActivePlayer
        };
    };

    const game = GameController();

    game.playRound(0, 0);
    game.playRound(1, 1);
    game.playRound(2, 0);
    game.playRound(1, 2);
    game.playRound(1, 0);

})();