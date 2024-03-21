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
        row_win = board[x][0] === board[x][1] && board[x][1] === board[x][2];

        col_win = board[0][y] === board[1][y] && board[1][y] === board[2][y];

        return row_win || col_win;
    }

    return { printToConsole, markPosition, isWon, newBoard }
}();

const Gameloop = function () {
    
}();

function createPlayer () {

};

Gameboard.markPosition('x', 0, 0);
Gameboard.markPosition('x', 1, 0);
Gameboard.markPosition('x', 2, 0);
Gameboard.markPosition('o', 1, 1);
Gameboard.printToConsole();
Gameboard.newBoard()
Gameboard.printToConsole();
console.log(Gameboard.isWon(0, 2));