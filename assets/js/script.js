let whoPlays = Math.random() < 0.5 ? 'x' : 'o';
let occupied = {};
let vsComputer = false;

document.addEventListener('DOMContentLoaded', function() {

    let mainMenu = document.getElementById('main-menu');
    let mainMenuBtn = document.getElementById('main-menu-btn');
    let gameSection = document.getElementById('game-section');
    let startBtn = document.getElementById('start-btn');
    let settingsSection = document.getElementById('settings-section');

    startBtn.addEventListener('click', function(){
        if (mainMenu.style.display === 'block' && occupied !== {}){
            console.log(gameSection.id);
            mainMenu.style.display = 'none';
            mainMenuBtn.style.display = 'block';
            gameSection.style.display = 'flex';
            settingsSection.style.display = 'block';
            document.getElementById('game-heading').innerHTML = `${whoPlays.toUpperCase()} plays!`;
            startBtn.innerHTML = 'reset';
        }
        else {
            runGame();
        }
    })
    gameSection.style.display = 'none';
    mainMenuBtn.style.display = 'none';

    mainMenuBtn.addEventListener('click', function(){
        mainMenu.style.display = 'block';
        gameSection.style.display = 'none';
        mainMenuBtn.style.display = 'none';
        settingsSection.style.display = 'none';
        document.getElementById('game-heading').innerHTML = 'Tic Tac Toe';
        startBtn.innerHTML = 'continue';
    })

    document.getElementById('two-player-btn').style.border = '1px solid black';
    document.getElementById('vs-computer-btn').addEventListener('click', function(){
        this.style.border = '1px solid black'
        document.getElementById('two-player-btn').style.border = 'none'
        vsComputer = true;
        resetScore();
        runGame();
    });

    document.getElementById('two-player-btn').addEventListener('click', function(){
        this.style.border = '1px solid black'
        document.getElementById('vs-computer-btn').style.border = 'none'
        vsComputer = false;
        resetScore();
        runGame();
    });
});

function resetScore(){
    document.getElementById('x-score').innerHTML = '0';
    document.getElementById('x-score').style.color = 'black';
    document.getElementById('o-score').innerHTML = '0';
    document.getElementById('o-score').style.color = 'black';
}

function runGame(){
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('main-menu-btn').style.display = 'block';
    document.getElementById('game-section').style.display = 'flex';
    document.getElementById('settings-section').style.display = 'block';
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

    if (checkWin() === true){
        if (vsComputer === true){
            whoPlays = whoPlays === 'x' ? 'o' : 'x';
        }
        return;
    }

    if (vsComputer === true){
        computerPlays();
    }
}

function computerPlays(){
    let occupiedArray = [];
    let cellToPlace;

    for (let cell in occupied){
        occupiedArray.push(parseInt((cell[cell.length - 1])));
    }
    console.log(occupiedArray);
    while(true){

        if (occupiedArray.length === 9){
            break;
        }

        cellToPlace = Math.floor(Math.random() * 9) + 1;
        console.log(cellToPlace);
        if (!occupiedArray.includes(cellToPlace)){
            console.log('true')
            break;
        }
    }

        document.getElementById(`index-${cellToPlace}`).innerHTML = whoPlays;
        occupied[document.getElementById(`index-${cellToPlace}`).id] = whoPlays;
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
            alert('X won this game! :D');
            incrementScore('x');

            let grid = document.getElementsByClassName('cell');
            
            for(let cell of grid){
                cell.removeEventListener('click', placePawn)
            }
            document.getElementById('game-heading').innerHTML = 'Tic Tac Toe';

            return true;
        }
    }
    for (let combo of winCombos){
        let result = combo.every(num => o.includes(num));
        if (result === true) {
            alert('O won this game! :D');
            incrementScore('o');

            let grid = document.getElementsByClassName('cell');
            
            for(let cell of grid){
                cell.removeEventListener('click', placePawn)
            }
            document.getElementById('game-heading').innerHTML = 'Tic Tac Toe';

            return true;
        }
    }
    if(x.length + o.length === 9){
        alert("It's a Draw! D:");
        document.getElementById('game-heading').innerHTML = 'Tic Tac Toe';
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