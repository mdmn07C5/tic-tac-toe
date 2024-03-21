const Gameboard = function () {
    let board = [
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ];

    const printToConsole = () => {
        board.forEach((row) => {
            console.log(row.join(' | '));
        });
    }

    const markPosition = (mark, x, y) => {
        if (board[x][y] === ' ') board[x][y] = mark;
    }

    return { printToConsole, markPosition }
}();

const Gameloop = function () {
    
}();

function createPlayer () {

};

Gameboard.markPosition('x', 1, 1);
Gameboard.markPosition('o', 1, 1);
Gameboard.printToConsole();