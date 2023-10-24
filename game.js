let Player = 'X';
let cells = document.querySelectorAll('.cell');
let resultDisplay = document.getElementById('res'); // Change Display to resultDisplay
let winningCells = null;

function makeMove(cell) {
    if (!cell.textContent && resultDisplay.textContent === '') {
        cell.textContent = Player;
        if (checkWin()) {
            resultDisplay.textContent = `Player ${Player} wins!`;
            if (winningCells) {
                winningCells.forEach(cell => cell.classList.add('strike'));
            }
            disableCellClicks();
        } else if (checkDraw()) {
            resultDisplay.textContent = 'It\'s a draw!';
        } else {
            Player = Player === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent) {
            winningCells = [cells[a], cells[b], cells[c]];
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function disableCellClicks() {
    cells.forEach(cell => cell.onclick = null);
}

function enableCellClicks() {
    cells.forEach(cell => {
        if (!cell.textContent) {
            cell.onclick = () => makeMove(cell);
        }
    });
}

function resetgame() {
    Player = 'X';
    cells.forEach(cell => cell.textContent = '');
    resultDisplay.textContent = '';
    if (winningCells) {
        winningCells.forEach(cell => cell.classList.remove('strike'));
    }
    winningCells = null;
    enableCellClicks();
}
