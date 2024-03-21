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

function createPlayer (name, mark) {
    let score = 0;
    
    const getScore = () => { return score };

    const increaseScore = () => {
        score += 1;
    }

    return { name, increaseScore, getScore, mark }
};

p1 = createPlayer('peepee', 'x');
p2 = createPlayer('poopoo', 'o');
p1.increaseScore();
p1.increaseScore();
p2.increaseScore();
console.log(`${p1.name}'s (${p1.mark}) score: ${p1.getScore()}`);
console.log(`${p2.name}'s (${p2.mark}) score: ${p2.getScore()}`);
