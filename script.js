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

const Gameloop = function () {
    // temporary
    p1 = createPlayer('p1', 'x');
    p2 = createPlayer('p2', 'o');
    const players = [ p1, p2 ];
    let idx = Math.round(Math.random());

    Gameboard.printToConsole();

    for (let i = 0; i < 10; i++) {
        const currentPlayer = players[idx];
        let input = prompt(`${currentPlayer.name}'s turn,
enter x, y coordinate: `);
        let [ x, y ] = input.split(' ');
        x = Number.parseInt(x);
        y = Number.parseInt(y);
        console.log(x, y);
        Gameboard.markPosition(currentPlayer.mark, x, y);

        if (Gameboard.isWon(currentPlayer.mark, x, y)) {
            console.log('Game Over');
            currentPlayer.increaseScore();
            break;
        }

        console.log('=========')
        Gameboard.printToConsole();
        idx = (idx + 1) % 2;
    }

    console.log(`p1: ${p1.getScore()}, p2: ${p1.getScore()}`)
    
}();

function createPlayer (name, mark) {
    let score = 0;
    
    const getScore = () => { return score };

    const increaseScore = () => {
        score += 1;
    }

    return { name, increaseScore, getScore, mark }
};
