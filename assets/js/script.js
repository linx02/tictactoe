let whoPlays = Math.random() < 0.5 ? 'x' : 'o';
let occupied = {};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('start-btn').addEventListener('click', function(){
        runGame();
    })
    document.getElementById('game-section').style.display = 'none';
});

function runGame(){
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('game-section').style.display = 'flex';
    occupied = {};

    let grid = document.getElementsByClassName('cell');
    document.getElementById('game-heading').innerHTML = `${whoPlays.toUpperCase()} starts!`

    document.getElementById('start-btn').innerHTML = 'reset';

    for(let cell of grid){

        cell.innerHTML = '';

        cell.removeEventListener('click', placePawn);
        cell.addEventListener('click', placePawn);
    }
}

function placePawn(){
    if (this.innerHTML === 'x' || this.innerHTML === 'o'){
        alert('That cell is busy! Please pick another one');
        return;
    }
    this.innerHTML = whoPlays;

    occupied[this.id] = whoPlays;

    whoPlays = whoPlays === 'x' ? 'o' : 'x';

    document.getElementById('game-heading').innerHTML = `${whoPlays.toUpperCase()} plays!`;

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
    let oppScore = winner === 'x' ? document.getElementById('o-score') : document.getElementById('x-score');
    scoreNum = parseInt(score.innerHTML);
    oppScoreNum = parseInt(oppScore.innerHTML);
    scoreNum += 1;
    score.innerHTML = scoreNum;

    if (scoreNum > oppScoreNum){
        score.style.color = 'green';
        oppScore.style.color = 'red';
    } else if (scoreNum < oppScoreNum){
        score.style.color = 'red';
        oppScore.style.color = 'green';
    } else {
        score.style.color = 'black';
        oppScore.style.color = 'black';
    }
}