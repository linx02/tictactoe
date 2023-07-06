let whoPlays = Math.random() < 0.5 ? 'x' : 'o';

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
    whoPlays = whoPlays === 'x' ? 'o' : 'x';

    checkWin();
}

function checkWin(){
}

function incrementScore(){
    
}

runGame();