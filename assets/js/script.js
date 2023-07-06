let whoPlays = Math.random() < 0.5 ? 'x' : 'o';
let occupied = {};

function runGame(){
    let grid = document.getElementsByClassName('cell');
    document.getElementById('game-heading').innerHTML = `${whoPlays.toUpperCase()} starts!`

    for(let cell of grid){
        cell.addEventListener('click', function(){
            placePawn(cell);
        });
    }
}

function placePawn(cell){
    if (cell.innerHTML === 'x' || cell.innerHTML === 'o'){
        alert('That cell is busy! Please pick another one');
        return;
    }
    cell.innerHTML = whoPlays;

    occupied[cell.id] = whoPlays;

    whoPlays = whoPlays === 'x' ? 'o' : 'x';

    checkWin();
}

function checkWin(){
    let winCombos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];
    
    let x = [];
    let o = [];

    for (let key in occupied){
        if (occupied[key] === 'x') {
            x.push(parseInt(key[key.length - 1]));
        }
        else if (occupied[key] === 'o') {
            o.push(parseInt(key[key.length - 1]));
        }
    }

    console.log(`X has : ${x} and O has : ${o}`);

    for (let combo of winCombos){
        let result = combo.every(num => x.includes(num));
        if (result === true) {
            alert('X won');
            incrementScore('x');
        }
    }
    for (let combo of winCombos){
        let result = combo.every(num => o.includes(num));
        if (result === true) {
            alert('O won');
            incrementScore('o');
        }
    }

}

function incrementScore(winner){
    let score = winner === 'x' ? document.getElementById('x-score') : document.getElementById('o-score');
    scoreNum = parseInt(score.innerHTML);
    scoreNum += 1;
    score.innerHTML = scoreNum;
}

runGame();