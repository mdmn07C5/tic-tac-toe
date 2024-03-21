const Gameboard = function () {
    let board = [
        ['t','t','t'],
        ['m','m','m'],
        ['b','b','b']
    ];

    const printToConsole = () => {
        board.forEach((row) => {
            console.log(row.join(' | '));
        });
    }

    return { printToConsole }
}();

const Gameloop = function () {
    
}();

function createPlayer () {

};

Gameboard.printToConsole();