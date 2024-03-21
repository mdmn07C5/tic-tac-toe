const Gameboard = function () {
    let board = [
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ]
    
    const newBoard = () => {
        board.forEach(row => {
            row.fill(' ', 0, 2);
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

    const isWon = (x, y) => {
        rowWin = board[x][0] === board[x][1] && board[x][1] === board[x][2];

        colWin = board[0][y] === board[1][y] && board[1][y] === board[2][y];

        diagLWin = board[0][0] === board[1][1] &&  board[1][1] ===  board[2][2];

        diagRWin = board[0][2] === board[1][1] && board[1][1] === board[2][0];

        return rowWin || colWin || diagLWin || diagRWin;
    }

    return { printToConsole, markPosition, isWon, newBoard }
}();

const Gameloop = function () {
    
}();

function createPlayer () {

};

Gameboard.markPosition('x', 0, 0);
Gameboard.markPosition('x', 1, 1);
Gameboard.markPosition('x', 2, 2);
Gameboard.markPosition('o', 1, 0);
Gameboard.printToConsole();
console.log(Gameboard.isWon(0, 2));