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

const DisplayController = function () {
    const displayGameBoard = document.querySelector("#game-board");
    
    const initBoard = (gameEvent) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const button = document.createElement('button');
                button.classList.add('cell');
                button.setAttribute('id', `cell-${i}-${j}`)
                button.textContent = ' ';
                displayGameBoard.appendChild(button);

                button.addEventListener('click', () => {
                    gameEvent(i, j);
                    button.disabled = true;
                });
            }
        }
    }

    const updateCell = (mark, x, y) => {
        const cell = document.querySelector(`#cell-${x}-${y}`);
        cell.textContent = mark;
    }

    const disableCells = () => {
        const buttons = displayGameBoard.childNodes;
        buttons.forEach((button) => {
            button.disabled = true;
        })
    }

    return { initBoard, updateCell, disableCells }

}();


const GameController = function (display, board) {
    let players = [];
    let currentPlayerIndex = Math.round(Math.random());
    let currentPlayer = players[currentPlayerIndex];

    const newRound = (player1, player2) => {
        board.newBoard();
        display.initBoard(playTurn)
        players = [player1, player2];
        currentPlayerIndex = Math.round(Math.random());
    }

    const playTurn = (xstr, ystr) => {
        const x = Number.parseInt(xstr);
        const y = Number.parseInt(ystr);
        currentPlayer = players[currentPlayerIndex];

        board.markPosition(currentPlayer.mark, x, y);
        display.updateCell(currentPlayer.mark, x, y);

        if (board.isWon(currentPlayer.mark, x, y)) {
            display.disableCells();
            console.log(`${currentPlayer.name} (${currentPlayer.mark}) wins`);
        }

        currentPlayerIndex = (currentPlayerIndex + 1) % 2;
    }

    return { newRound, playTurn }
}(DisplayController, Gameboard);

function createPlayer (name, mark) {
    let score = 0;
    
    const getScore = () => { return score };

    const increaseScore = () => {
        score += 1;
    }

    return { name, increaseScore, getScore, mark }
};

GameController.newRound(createPlayer('p1', 'x'), createPlayer('p2', 'o'));