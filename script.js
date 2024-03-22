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
        if (rowWin) console.log("row");
        const colWin = board[0][y] === mark && board[1][y] === mark && board[2][y] === mark;
        if (colWin) console.log("col");
        const diagLWin = board[0][0] === mark && board[1][1] === mark && board[2][2] === mark;
        if (diagLWin) console.log("diagL");    
        const diagRWin = board[0][2] === mark && board[1][1] === mark && board[2][0] === mark;
        if (diagRWin) console.log("diagR");
        
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

    const playTurn = (x, y) => {
        const x = Number.parseInt(x);
        const y = Number.parseInt(y);

        Gameboard.markPosition(currentPlayer.mark, x, y);
        
        if (Gameboard.isWon(currentPlayer.mark, x, y)) {
            
            console.log(`${currentPlayer} (${currentPlayer.mark}) wins`);
        }

        currentPlayerIndex = (currentPlayerIndex + 1) % 2;
    }

    return { newRound, playTurn }
}();

function createPlayer (name, mark) {
    let score = 0;
    
    const getScore = () => { return score };

    const increaseScore = () => {
        score += 1;
    }

    return { name, increaseScore, getScore, mark }
};

Game.newRound(createPlayer('p1', 'x'), createPlayer('p2', 'o'));