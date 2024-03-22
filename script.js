const Gameboard = function () {
    const board = [
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ]
    
    const newBoard = () => {
        board.forEach(row => {
            row.fill(' ');
        });
    }

    const printToConsole = () => {
        board.forEach((row) => {
            console.log(row.join(' | '));
        });
    }

    const markPosition = (mark, x, y) => {
        if (board[x][y] === ' ') board[x][y] = mark;
    }

    const isWon = (mark, x, y) => {
        const rowWin = board[x][0] === mark && board[x][1] === mark && board[x][2] === mark;
       
        const colWin = board[0][y] === mark && board[1][y] === mark && board[2][y] === mark;
       
        const diagLWin = board[0][0] === mark && board[1][1] === mark && board[2][2] === mark;

        const diagRWin = board[0][2] === mark && board[1][1] === mark && board[2][0] === mark;
        
        return rowWin || colWin || diagLWin || diagRWin;
    }

    return { printToConsole, markPosition, isWon, newBoard }
}();

const GameController = function () {
    let players = [];
    let currentPlayerIndex = Math.round(Math.random());
    let currentPlayer = players[currentPlayerIndex];

    const newRound = (player1, player2) => {
        Gameboard.newBoard();
        players = [player1, player2];
        currentPlayerIndex = Math.round(Math.random());
    }

    const playTurn = (xstr, ystr, callback) => {
        const x = Number.parseInt(xstr);
        const y = Number.parseInt(ystr);
        currentPlayer = players[currentPlayerIndex];

        Gameboard.markPosition(currentPlayer.mark, x, y);
        callback(currentPlayer.mark);
        
        if (Gameboard.isWon(currentPlayer.mark, x, y)) {
            
            console.log(`${currentPlayer} (${currentPlayer.mark}) wins`);
        }

        currentPlayerIndex = (currentPlayerIndex + 1) % 2;
    }

    return { newRound, playTurn }
}();

const DisplayController = function (gameController) {
    const displayGameBoard = document.querySelector("#game-board");
    
    const initBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const button = document.createElement('button');
                button.classList.add('cell');
                button.setAttribute('id', `cell-${i}-${j}`)
                button.textContent = ' ';
                displayGameBoard.appendChild(button);

                button.addEventListener('click', () => {
                    gameController.playTurn(i, j, (mark) => {
                        updateCell(mark, i, j);
                    });
                });
            }
        }
    }

    const updateCell = (mark, x, y) => {
        const cell = document.querySelector(`#cell-${x}-${y}`);
        cell.textContent = mark;
    }

    return { initBoard, updateCell }

}(GameController);

function createPlayer (name, mark) {
    let score = 0;
    
    const getScore = () => { return score };

    const increaseScore = () => {
        score += 1;
    }

    return { name, increaseScore, getScore, mark }
};

DisplayController.initBoard();
GameController.newRound(createPlayer('p1', 'x'), createPlayer('p2', 'o'));