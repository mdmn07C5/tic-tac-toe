const Gameboard = function () {
    const board = [
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ]
    let freeCells = 9;
    
    const newBoard = () => {
        board.forEach(row => {
            row.fill(' ');
        });
        freeCells = 9;
    }

    const printToConsole = () => {
        board.forEach((row) => {
            console.log(row.join(' | '));
        });
    }

    const markPosition = (mark, x, y) => {
        if (board[x][y] === ' ') {
            board[x][y] = mark;
            freeCells--;
        }
    }

    const isWon = (mark, x, y) => {
        const rowWin = board[x][0] === mark && board[x][1] === mark && board[x][2] === mark;
       
        const colWin = board[0][y] === mark && board[1][y] === mark && board[2][y] === mark;
       
        const diagLWin = board[0][0] === mark && board[1][1] === mark && board[2][2] === mark;

        const diagRWin = board[0][2] === mark && board[1][1] === mark && board[2][0] === mark;
        
        return rowWin || colWin || diagLWin || diagRWin;
    }

    const getFreeCells = () => {
        return freeCells;
    }

    return { printToConsole, markPosition, isWon, newBoard, getFreeCells }
}();

const DisplayController = function () {
    const displayGameBoard = document.querySelector("#game-board");
    const resultContainer = document.querySelector("#header");
    
    const initBoard = (gameEvent) => {
        displayGameBoard.innerHTML = '';
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

    const updateResult = (result) => {
        resultContainer.textContent = result;
    }

    return { initBoard, updateCell, disableCells, updateResult }

}();


const GameController = function (display, board) {
    let players = [];
    let currentPlayerIndex = Math.round(Math.random());
    let currentPlayer = players[currentPlayerIndex];

    const init = () => {
        const p1 = createPlayer('Player 1', 'X');
        const p2 = createPlayer('Player 2', 'O');
        document.querySelector('#p1 > .symbol').textContent = `${p1.mark}`;
        document.querySelector('#p2 > .symbol').textContent = `${p2.mark}`;
        document.querySelector('#p1-name').onchange = (e) => {
            p1.setName(e.target.value);
        };
        document.querySelector('#p2-name').onchange = (e) => {
            p2.setName(e.target.value);
        };
        document.querySelector('#new-game-button')
            .addEventListener('click', () => {
                newRound();
            });

        players = [p1, p2];
        display.initBoard(playTurn);
        display.updateResult(`${players[currentPlayerIndex].getName()} starts`);
    }

    const newRound = () => {
        board.newBoard();
        display.initBoard(playTurn);
        currentPlayerIndex = Math.round(Math.random());
        display.updateResult(`${players[currentPlayerIndex].getName()} starts`);
    }

    const playTurn = (xstr, ystr) => {
        const x = Number.parseInt(xstr);
        const y = Number.parseInt(ystr);

        currentPlayer = players[currentPlayerIndex];
        display.updateResult(`${currentPlayer.getName()}'s turn...`)

        board.markPosition(currentPlayer.mark, x, y);
        display.updateCell(currentPlayer.mark, x, y);

        if (board.isWon(currentPlayer.mark, x, y)) {
            display.disableCells();
            display.updateResult(`${currentPlayer.getName()} (${currentPlayer.mark}) wins!`);
        }

        if (board.getFreeCells() === 0) {
            display.updateResult(`It's a tie!`);
        }

        currentPlayerIndex = (currentPlayerIndex + 1) % 2;
    }

    return { newRound, playTurn, init }
}(DisplayController, Gameboard);


function createPlayer (initialName, mark) {
    let score = 0;
    let name = initialName;

    const getScore = () => { return score };

    const increaseScore = () => {
        score += 1;
    }

    const setName = (newName) => {
        name = newName;
    }

    const getName = () => {
        return name;
    }

    return { increaseScore, getScore, mark, setName, getName }
};


GameController.init();